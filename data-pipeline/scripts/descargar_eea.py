"""
Descarga los datos de emisiones de CO2 de turismos nuevos de la EEA
(Agencia Europea de Medio Ambiente) para un año y un país, y los guarda en CSV.

Usa el servicio SQL público de la EEA (discodata):
    https://discodata.eea.europa.eu/sql

Uso (desde la carpeta data-pipeline, con el entorno virtual activado):
    python scripts/descargar_eea.py                  # 2023, España
    python scripts/descargar_eea.py --anio 2022
    python scripts/descargar_eea.py --anio 2021 --pais PT

Cosas que hemos aprendido de este servicio (por si algo falla):
- Cada fila es UN coche matriculado (la columna R vale 1).
- Los datos de cada año están en tablas con nombres como
  [CO2Emission].[latest].[co2cars_2023Fv28]  (año 2023, F = Final, versión 28).
  Los años antiguos (hasta 2022) están todos juntos en [CO2Emission].[latest].[co2cars].
- El cortafuegos de la EEA bloquea (error 403) las consultas que llevan
  "ORDER BY", los símbolos ">" o "<", o la palabra "AS". Por eso:
    * los alias se ponen sin AS:   COUNT(1) filas
    * los rangos se hacen con:     ID BETWEEN x AND y
- Las columnas calculadas (COUNT, MIN...) necesitan alias obligatoriamente.
"""

import argparse
import json
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

import pandas as pd

URL_EEA = "https://discodata.eea.europa.eu/sql"
BD = "[CO2Emission].[latest]"
CARPETA_RAW = Path(__file__).resolve().parent.parent / "raw"


def consultar(sql: str, filas_max: int = 1, intentos: int = 4) -> list[dict]:
    """Envía una consulta SQL a la EEA y devuelve la lista de filas (diccionarios)."""
    parametros = urllib.parse.urlencode({"query": sql, "p": 1, "nrOfHits": filas_max})
    peticion = urllib.request.Request(
        f"{URL_EEA}?{parametros}", headers={"User-Agent": "recomendador-coches-data-pipeline"}
    )
    for intento in range(1, intentos + 1):
        try:
            with urllib.request.urlopen(peticion, timeout=300) as respuesta:
                datos = json.loads(respuesta.read().decode("utf-8"))
            if "errors" in datos:
                raise RuntimeError(f"La EEA devolvió un error: {datos['errors']}")
            return datos["results"]
        except urllib.error.HTTPError as e:
            if e.code == 403:
                # Esto no se arregla reintentando: el cortafuegos rechaza la consulta.
                raise RuntimeError(
                    "Error 403: el cortafuegos de la EEA ha bloqueado la consulta "
                    "(¿lleva ORDER BY, '>', '<' o 'AS'?).\n" + sql
                ) from e
            error = e
        except (urllib.error.URLError, TimeoutError) as e:
            error = e
        espera = 5 * intento
        print(f"  Fallo de conexión ({error}). Reintento {intento}/{intentos} en {espera}s...")
        time.sleep(espera)
    raise RuntimeError(f"No se pudo conectar con la EEA tras {intentos} intentos.")


def tabla_existe(tabla: str, pais: str) -> bool:
    try:
        consultar(f"SELECT TOP 1 ID FROM {tabla} WHERE MS = '{pais}'")
        return True
    except RuntimeError as e:
        if "Invalid object name" in str(e):
            return False
        raise


def buscar_tabla(anio: int, pais: str) -> tuple[str, str]:
    """
    Busca la tabla de la EEA para ese año. Devuelve (tabla, filtro_extra).
    Prueba primero la versión Final (F) más reciente, luego la Provisional (P),
    y si no, la tabla antigua con todos los años juntos.
    """
    print(f"Buscando la tabla de la EEA para {anio}...")
    for estado in ("F", "P"):
        for version in range(40, 14, -1):
            tabla = f"{BD}.[co2cars_{anio}{estado}v{version}]"
            if tabla_existe(tabla, pais):
                if estado == "P":
                    print("  AVISO: solo hay datos PROVISIONALES para este año.")
                return tabla, ""
    tabla = f"{BD}.[co2cars]"
    filas = consultar(f"SELECT TOP 1 Status FROM {tabla} WHERE Year = {anio} AND MS = '{pais}'")
    if filas:
        if filas[0]["Status"] != "F":
            print("  AVISO: estos datos no son definitivos (Status distinto de F).")
        return tabla, f" AND Year = {anio}"
    sys.exit(f"No he encontrado datos de la EEA para {anio} y país {pais}.")


def main() -> None:
    parser = argparse.ArgumentParser(description="Descarga datos de CO2 de coches nuevos de la EEA.")
    parser.add_argument("--anio", type=int, default=2023, help="Año de matriculación (por defecto 2023)")
    parser.add_argument("--pais", default="ES", help="Código de país de 2 letras (por defecto ES)")
    parser.add_argument("--tabla", help="Nombre completo de la tabla, si no quieres que la busque sola")
    parser.add_argument("--trozo", type=int, default=20000, help="Filas por petición (por defecto 20000)")
    args = parser.parse_args()
    pais = args.pais.upper()

    if args.tabla:
        tabla, filtro = args.tabla, ""
    else:
        tabla, filtro = buscar_tabla(args.anio, pais)
    donde = f"WHERE MS = '{pais}'{filtro}"
    print(f"Tabla: {tabla}")

    # 1. Cuántas filas hay y qué rango de ID ocupan, para dividir la descarga en trozos.
    resumen = consultar(f"SELECT COUNT(1) filas, MIN(ID) idmin, MAX(ID) idmax FROM {tabla} {donde}")[0]
    total, id_min, id_max = resumen["filas"], resumen["idmin"], resumen["idmax"]
    if not total:
        sys.exit("La consulta no devuelve filas.")
    print(f"Filas a descargar: {total:,}".replace(",", "."))

    # 2. Descargar por trozos de ID y escribir en un archivo temporal.
    CARPETA_RAW.mkdir(parents=True, exist_ok=True)
    salida = CARPETA_RAW / f"eea_{args.anio}_{pais.lower()}.csv"
    temporal = salida.with_suffix(".csv.part")
    descargadas = 0
    primera = True
    desde = id_min
    while desde <= id_max:
        hasta = desde + args.trozo - 1
        filas = consultar(
            f"SELECT * FROM {tabla} {donde} AND ID BETWEEN {desde} AND {hasta}", filas_max=args.trozo
        )
        if filas:
            pd.DataFrame(filas).to_csv(
                temporal, mode="w" if primera else "a", header=primera, index=False, encoding="utf-8"
            )
            primera = False
            descargadas += len(filas)
        print(f"  {descargadas:>9,} / {total:,} filas ({descargadas / total:.0%})".replace(",", "."))
        desde = hasta + 1

    # 3. Comprobar que no falta nada antes de dar el archivo por bueno.
    if descargadas != total:
        sys.exit(f"ERROR: se esperaban {total} filas y llegaron {descargadas}. Archivo parcial: {temporal}")
    temporal.replace(salida)
    print(f"Listo: {salida} ({salida.stat().st_size / 1e6:.0f} MB)")


if __name__ == "__main__":
    main()
