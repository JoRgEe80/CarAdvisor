"""
Exploración del CSV de la EEA (un año, un país) para entender cómo son los datos
antes de limpiarlos. No modifica nada: solo lee el archivo e imprime resultados.

Uso (desde data-pipeline, con el entorno virtual activado):
    python scripts/explorar_eea.py                         # raw/eea_2023_es.csv
    python scripts/explorar_eea.py raw/eea_2022_es.csv
"""

import re
import sys
from pathlib import Path

import pandas as pd

# Para que las tildes y la ñ salgan bien en la consola de Windows.
sys.stdout.reconfigure(encoding="utf-8")
pd.set_option("display.width", 200)
pd.set_option("display.max_columns", 20)
pd.set_option("display.max_colwidth", 60)

CARPETA = Path(__file__).resolve().parent.parent
ARCHIVO = Path(sys.argv[1]) if len(sys.argv) > 1 else CARPETA / "raw" / "eea_2023_es.csv"

# Modelos populares en los que buscar variantes de nombre.
MODELOS_A_REVISAR = ["COROLLA", "GOLF", "LEON", "SPORTAGE", "CLIO", "3008", "QASHQAI", "TUCSON", "T-ROC", "C-HR"]


def titulo(texto: str) -> None:
    print("\n" + "=" * 80 + f"\n{texto}\n" + "=" * 80)


def clave(texto: str) -> str:
    """Versión 'limpia' de un nombre: mayúsculas y sin espacios, guiones ni puntos."""
    return re.sub(r"[^A-Z0-9]", "", str(texto).upper())


def variantes(df: pd.DataFrame, columnas: list[str], ejemplos: int) -> None:
    """Muestra nombres que solo se diferencian en mayúsculas, espacios o signos."""
    tmp = df[columnas].astype(str).copy()
    tmp["clave"] = tmp.apply(lambda fila: "|".join(clave(fila[c]) for c in columnas), axis=1)
    tmp["original"] = tmp[columnas].agg(" | ".join, axis=1)
    conteo = tmp.groupby(["clave", "original"]).size().reset_index(name="coches")
    grupos = conteo.groupby("clave").filter(lambda g: len(g) > 1)
    n = grupos["clave"].nunique()
    print(f"Grupos de nombres que son lo mismo escrito distinto: {n}")
    top = grupos.groupby("clave")["coches"].sum().sort_values(ascending=False).head(ejemplos).index
    for k in top:
        filas = grupos[grupos["clave"] == k].sort_values("coches", ascending=False)
        print("  " + "  /  ".join(f"'{o}' ({c})" for o, c in zip(filas["original"], filas["coches"])))


def main() -> None:
    print(f"Leyendo {ARCHIVO} ...")
    df = pd.read_csv(ARCHIVO, low_memory=False)
    print(f"{len(df):,} filas x {df.shape[1]} columnas".replace(",", "."))
    df["Mk"] = df["Mk"].fillna("(vacío)")
    df["Cn"] = df["Cn"].fillna("(vacío)")

    # ------------------------------------------------------------------ 1
    titulo("1. MARCAS Y MODELOS")
    print(f"Marcas distintas (tal cual vienen):            {df['Mk'].nunique()}")
    print(f"Marcas distintas (normalizando mayúsc./signos): {df['Mk'].map(clave).nunique()}")
    print(f"Modelos distintos Mk+Cn (tal cual):             {df.groupby(['Mk', 'Cn']).ngroups}")
    print(f"Modelos distintos Mk+Cn (normalizando):         "
          f"{df.assign(a=df['Mk'].map(clave), b=df['Cn'].map(clave)).groupby(['a', 'b']).ngroups}")
    modelos = df.groupby(["Mk", "Cn"]).size().sort_values(ascending=False)
    print(f"Modelos con menos de 10 coches matriculados:   {(modelos < 10).sum()}")
    print("\nLos 30 modelos (Mk + Cn) más matriculados:")
    print(modelos.head(30).reset_index(name="coches").to_string())

    # ------------------------------------------------------------------ 2
    titulo("2. NOMBRES INCONSISTENTES")
    print("Todas las marcas (Mk) con nº de coches:")
    print(df["Mk"].value_counts().to_string())

    print("\n-- Marcas iguales escritas distinto --")
    variantes(df, ["Mk"], 20)
    print("\n-- Modelos iguales escritos distinto (mayúsculas, espacios, guiones) --")
    variantes(df, ["Mk", "Cn"], 25)

    print("\n-- Mismo modelo con nombres distintos (Cn que contiene el nombre del modelo) --")
    for nombre in MODELOS_A_REVISAR:
        sub = df[df["Cn"].str.upper().str.contains(nombre, regex=False)]
        print(f"\n'{nombre}': {sub.groupby(['Mk', 'Cn']).ngroups} nombres distintos")
        print(sub.groupby(["Mk", "Cn"]).size().sort_values(ascending=False).head(12).to_string())

    print("\n-- Columna Mh (fabricante) vs Mk (marca): ejemplos --")
    print(df.groupby(["Mk", "Mh"]).size().sort_values(ascending=False).head(15).to_string())

    # ------------------------------------------------------------------ 3
    titulo("3. VERSIONES DE UN MODELO POPULAR: TOYOTA COROLLA")
    corolla = df[(df["Mk"].map(clave) == "TOYOTA") & df["Cn"].str.upper().str.contains("COROLLA")]
    print(f"Coches: {len(corolla):,}".replace(",", "."))
    print(f"Valores distintos -> Va (variante): {corolla['Va'].nunique()}, "
          f"Ve (versión): {corolla['Ve'].nunique()}, TAN (homologación): {corolla['TAN'].nunique()}")
    print("\nPor combustible:")
    print(corolla["Ft"].value_counts().to_string())
    print("\nPor combustible + potencia (kW) + cilindrada:")
    versiones = (corolla.groupby(["Cn", "Ft", "Ep (KW)", "Ec (cm3)"]).agg(
        coches=("ID", "size"),
        peso_kg=("M (kg)", "median"),
        co2=("Ewltp (g/km)", "median"),
        consumo=("Fc", "median"),
    ).sort_values("coches", ascending=False))
    print(versiones.to_string())

    # ------------------------------------------------------------------ 4
    titulo("4. VALORES VACÍOS POR COLUMNA")
    vacios = pd.DataFrame({
        "% vacío": (df.isna().mean() * 100).round(1),
        "valores distintos": df.nunique(),
        "ejemplo": df.apply(lambda c: c.dropna().iloc[0] if c.notna().any() else None),
    }).sort_values("% vacío", ascending=False)
    print(vacios.to_string())

    # ------------------------------------------------------------------ 5
    titulo("5. VALORES DE COLUMNAS CATEGÓRICAS")
    for col in ["Ft", "Fm", "Ct", "Cr", "Status", "IT", "Ech", "RLFI"]:
        if col in df.columns:
            print(f"\n{col}:")
            print(df[col].value_counts(dropna=False).head(10).to_string())
    print("\nRango de fechas de matriculación (Dr):", df["Dr"].min(), "->", df["Dr"].max())
    print("\nResumen numérico:")
    numericas = ["M (kg)", "Mt", "Ewltp (g/km)", "Ep (KW)", "Ec (cm3)", "Fc", "Z (Wh/km)", "W (mm)"]
    print(df[numericas].describe().round(1).to_string())


if __name__ == "__main__":
    main()
