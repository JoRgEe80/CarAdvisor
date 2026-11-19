# Notas sobre los datos de la EEA (2023, España)

Conclusiones de explorar `raw/eea_2023_es.csv`. Para repetir la exploración:

```
python scripts/descargar_eea.py            # descarga el CSV (si no lo tienes)
python scripts/explorar_eea.py             # imprime todos los números de estas notas
```

## Resumen rápido

- **974.231 filas, 43 columnas.** Cada fila es **un coche** matriculado en España en 2023.
  Para saber cuántos coches de un modelo se vendieron, basta con contar filas.
- **67 marcas** y **1.787 combinaciones marca + nombre** (`Mk` + `Cn`). Pero no son
  1.787 modelos de verdad: muchos nombres incluyen el acabado o el motor
  (p. ej. Peugeot tiene 33 "nombres" que son todos el 3008).
- El 80 % del trabajo de limpieza será **sacar el nombre del modelo de verdad** de la columna `Cn`.
- **Ojo con los híbridos:** un Toyota Corolla híbrido aparece como combustible `petrol`.
  Para saber si es híbrido hay que mirar la columna `Fm` (más abajo).

---

## 1. Marcas y modelos

| | Cantidad |
|---|---|
| Marcas distintas (`Mk`) | 67 |
| Combinaciones marca + nombre (`Mk` + `Cn`) | 1.787 |
| ... quitando diferencias de mayúsculas, espacios y guiones | 1.737 |
| Combinaciones con menos de 10 coches en todo el año | 546 |

Los 30 más matriculados (tal y como vienen escritos):

| # | Marca | Nombre en `Cn` | Coches |
|---|---|---|---|
| 1 | DACIA | SANDERO | 27.948 |
| 2 | SEAT | ARONA | 21.636 |
| 3 | TOYOTA | TOYOTA COROLLA | 20.320 |
| 4 | MG | MG ZS | 19.257 |
| 5 | HYUNDAI | TUCSON IX35 | 19.094 |
| 6 | TOYOTA | TOYOTA C-HR | 18.476 |
| 7 | KIA | SPORTAGE | 18.297 |
| 8 | VOLKSWAGEN | T-ROC | 17.238 |
| 9 | SEAT | IBIZA | 16.500 |
| 10 | NISSAN | NISSAN QASHQAI | 15.902 |
| 11 | TOYOTA | TOYOTA YARIS CROSS | 15.851 |
| 12 | RENAULT | CLIO | 14.143 |
| 13 | FIAT | FIAT 500 | 13.854 |
| 14 | DACIA | DUSTER | 12.303 |
| 15 | TOYOTA | TOYOTA YARIS | 11.884 |
| 16 | SEAT | SEAT ATECA | 11.842 |
| 17 | KIA | STONIC | 11.603 |
| 18 | HYUNDAI | KONA KAUAI | 11.573 |
| 19 | RENAULT | CAPTUR | 11.104 |
| 20 | FORD | PUMA | 9.997 |
| 21 | HYUNDAI | I20 | 9.989 |
| 22 | VOLKSWAGEN | T-CROSS | 9.663 |
| 23 | FORD | KUGA | 9.533 |
| 24 | CUPRA | FORMENTOR | 9.305 |
| 25 | VOLKSWAGEN | TIGUAN | 9.112 |
| 26 | KIA | NIRO | 8.990 |
| 27 | VOLKSWAGEN | TAIGO | 8.843 |
| 28 | KIA | XCEED | 8.711 |
| 29 | RENAULT | AUSTRAL | 8.291 |
| 30 | SKODA | KAMIQ | 8.140 |

Ojo: aquí faltan coches que sí son populares, como el Peugeot 3008 o el Seat León,
porque sus ventas están **repartidas entre muchos nombres distintos** (ver punto 2).
Cuando limpiemos los nombres, este ranking cambiará.

---

## 2. Nombres escritos de forma inconsistente

### Marcas (`Mk`): bastante limpias, con pocas excepciones
En 2023 no aparece el caso "VW / Volkswagen / VOLKSWAGEN" que esperábamos,
pero sí hay casos parecidos:

| Así viene | Debería ser |
|---|---|
| `MITSUBISHI` (1.572), `MITSUBISHI MOTORS CORPORATION` (1.294), `MITSUBISHI MOTORS THAILAND` (1.252) | MITSUBISHI |
| `MERCEDES AMG` (110) | MERCEDES-BENZ |
| `VOLKSWAGEN V W` (1) | VOLKSWAGEN |
| `AUTOMOBILI LAMBORGHINI SPA` (41) | LAMBORGHINI |
| `FORD-CNG-TECHNIK` (2, un "MONDEO HIBRIDO") | FORD |
| `SIN MARCA` (1, en realidad un Peugeot 5008) | se descarta |

Con una pequeña tabla de equivalencias de marcas lo arreglamos.
En el año 2021 el combustible venía en MAYÚSCULAS (`DIESEL`) y en 2023 en minúsculas
(`diesel`), así que **al juntar años habrá más diferencias de este tipo**.

### Modelos (`Cn`): aquí está el lío
Hemos encontrado varios tipos de problema:

**a) La marca va repetida dentro del nombre (solo algunas marcas)**
- `TOYOTA` → `TOYOTA COROLLA`, `TOYOTA C-HR`
- `NISSAN` → `NISSAN QASHQAI`
- `SEAT` → `SEAT LEON`, `SEAT ATECA`
- Pero `KIA` → `SPORTAGE` y `RENAULT` → `CLIO` (sin marca delante).

**b) El nombre incluye el acabado, el motor o el cambio**
- Peugeot 3008: **33 nombres distintos**, por ejemplo
  `3008 ALLURE PACK PURETECH 130 S&S 6 VEL MAN`, `3008 GT BLUEHDI 130 S&S EAT8`…
- Lo mismo pasa con Citroën, DS y Opel: `MOKKA GS 12 T MT6 S/S 136CV (100 KW)`.
- Algunos incluso llevan notas comerciales: `... (SOLO STOCK)`, cortadas a 60 letras.

**c) Lo mismo escrito con pequeñas diferencias** (47 casos)
- `MAZDA2 HYBRID` (612) / `MAZDA 2 HYBRID` (4)
- `C3 AIRCROSS ... C SERIES` (1.962) / `C3 AIRCROSS ... C-SERIES` (5)
- `MOKKA ... 136CV (100 KW)` / `MOKKA ... 136 CV (100KW)`
- `NUEVO DS 7  E-TENSE` (con dos espacios) / `NUEVO DS 7 E-TENSE`

**d) El híbrido o la carrocería como nombre aparte**
- `CLIO` (14.143) y `CLIO E-TECH HYBRID` (2.008)
- `GOLF` (6.056) y `GOLF GTE` (139)
- `SEAT LEON`, `SEAT LEON SP` (SP = familiar), `SEAT LEON E-HYBRID150`…

**e) Dos nombres pegados**
- `TUCSON IX35` (19.094) y `TUCSON` (1)
- `KONA KAUAI` (Kauai es el nombre del Kona en Portugal)

**f) Ojo: Cupra León y Seat León son coches casi iguales, pero de marcas distintas.**
Los dejaríamos como modelos separados.

Sobre "GOLF" vs "GOLF VIII": en 2023 no aparece, porque solo se vendía el Golf 8.
Es posible que aparezca al juntar varios años: lo revisaremos cuando descarguemos más.

**Idea para limpiar:** crear un archivo de equivalencias (`modelos_equivalencias.csv`)
que diga "todo lo que empiece por `3008` → Peugeot 3008", "`TUCSON IX35` → Hyundai Tucson",
etc. Solo hace falta hacerlo para los ~150–300 modelos populares, no para los 1.787.

---

## 3. ¿Cuántas versiones tiene un modelo? Ejemplo: Toyota Corolla

En 2023 hay 20.320 Corolla. Según **combustible + potencia + cilindrada** solo hay
**2 versiones**:

| Versión | Coches | Potencia (`Ep`) | Cilindrada | Peso | CO2 | Consumo |
|---|---|---|---|---|---|---|
| Corolla 1.8 híbrido | 18.315 | 72 kW | 1.798 cm³ | 1.430 kg | 101 g/km | 4,5 l |
| Corolla 2.0 híbrido | 2.005 | 112 kW | 1.987 cm³ | 1.515 kg | 104 g/km | 4,6 l |

Pero si miramos las columnas técnicas de homologación salen muchas más:
13 valores de `Va` (variante), **49 de `Ve`** (versión) y 11 de `TAN`.
Esas columnas distinguen detalles (llantas, carrocería, equipamiento) que **a un novato
no le importan**. Conclusión: agrupar por **combustible + potencia + cilindrada** es
lo adecuado para nuestra "versión principal".

Dos trampas que nos enseña el Corolla:
1. **`Ft` dice `petrol`, aunque es híbrido.** Hay que mirar `Fm` (ver punto 5).
2. **`Ep` es la potencia del motor de gasolina, no la del coche entero.**
   72 kW = 98 CV, pero Toyota anuncia el Corolla 1.8 con 140 CV (gasolina + eléctrico).
   En híbridos, la potencia de la EEA será **menor** que la que ve el usuario en los anuncios.

---

## 4. Columnas con muchos valores vacíos

| Columna | % vacío | Por qué |
|---|---|---|
| `MMS`, `At1`, `At2`, `W`, `Enedc`, `Ernedc`, `E`, `Er`, `De`, `Vf` | **100 %** | No se rellenan en 2023. (Ojo: `W`, la distancia entre ejes, sí venía en 2021.) |
| `RLFI` | 95,8 % | Código interno, no nos importa. |
| `Z` (consumo eléctrico) y `Zr` (autonomía eléctrica) | 87,9 % | **Normal**: solo los rellenan eléctricos e híbridos enchufables (118.022 coches). |
| `Erwltp` | 29,9 % | Ahorro por "ecoinnovaciones". No nos importa. |
| `IT` | 23,2 % | Código de ecoinnovaciones. No nos importa. |
| `Fc` (consumo l/100 km) | 16,6 % | Los eléctricos no tienen (normal), pero **faltan además 106.775 coches de combustión**. Se puede estimar a partir del CO2 (gasolina ≈ CO2 / 23,7; diésel ≈ CO2 / 26,4). |
| `Ech` (norma Euro) | 9,5 % | Además viene escrita de mil formas: `EURO 6AP`, `6AP`, `EURO 6(AP)`, `Euro 6 AP`… |
| `Mp` (grupo empresarial) | 7,4 % | No nos importa. |
| `Ec` (cilindrada) | 5,7 % | **Normal**: son los eléctricos, que no tienen cilindrada. |

Lo importante para la app (`Mk`, `Cn`, `Ft`, `Fm`, `Ep`, `M (kg)`, `Ewltp`) está prácticamente completo.

---

## 5. Qué columnas nos sirven y cuáles ignoramos

### Nos sirven

| Columna | Qué es | Para qué la usamos |
|---|---|---|
| `Mk` | Marca | Identificar el coche (hay que limpiarla un poco) |
| `Cn` | Nombre comercial | Identificar el modelo (hay que limpiarla mucho) |
| `Ft` | Combustible: `petrol`, `diesel`, `petrol/electric` (enchufable), `electric`, `lpg` (GLP), `ng` (gas natural), `hydrogen` | Filtro de combustible |
| `Fm` | Tipo de motorización: **`M`** normal, **`H`** híbrido (no enchufable), **`P`** híbrido enchufable, **`E`** eléctrico, **`B`** bifuel (gasolina + GLP/gas) | Saber si es híbrido. **Clave para la etiqueta DGT** (ver abajo) |
| `Ep (KW)` | Potencia del motor de combustión (× 1,36 = CV) | Potencia (ojo con los híbridos, ver punto 3) |
| `Ec (cm3)` | Cilindrada | Agrupar versiones; "modo friki" |
| `M (kg)` | Peso en orden de marcha | Peso; relación peso/potencia |
| `Ewltp (g/km)` | Emisiones de CO2 (WLTP) | Dato técnico; estimar consumo si falta `Fc` |
| `Fc` | Consumo (l/100 km) | Mostrar el consumo; puntuación "gasta poco" |
| `Z (Wh/km)` | Consumo eléctrico | Eléctricos y enchufables |
| `Zr` | Autonomía eléctrica (km) | Eléctricos y enchufables: "¿cuánto puedo hacer sin gasolina?" |
| `ID` | Identificador de fila | Solo para contar y comprobar duplicados |

**Truco para la etiqueta DGT** (en 2023 todos los coches cumplen Euro 6):
- `Fm` = `E` → etiqueta **0**
- `Fm` = `P` → **0** si la autonomía eléctrica (`Zr`) es de 40 km o más; si no, **ECO**
- `Fm` = `H`, o combustible `lpg`/`ng` → **ECO**
- El resto (gasolina y diésel normales) → **C**

Así la etiqueta no tiene que inventarla la IA. Un aviso: `H` incluye también los
"microhíbridos" (de 48 V), que no son híbridos completos como el Corolla. Por ejemplo,
hay 40.659 diésel con `H`. En España también llevan etiqueta ECO, así que para la
etiqueta da igual. Para la ficha del coche, en cambio, conviene distinguirlos si podemos.

### Podemos ignorarlas

| Columnas | Por qué |
|---|---|
| `MS`, `Year`, `Status`, `Version_file`, `R` | Tienen el mismo valor en todas las filas (España, 2023, Final, v28, 1). Solo sirven para comprobar. |
| `Mp`, `Mh`, `Man` | Grupo empresarial y fabricante legal (p. ej. "STELLANTIS AUTO SAS"). A un novato no le dicen nada. |
| `TAN`, `T`, `Va`, `Ve`, `VFN`, `IT`, `RLFI` | Códigos técnicos de homologación. Separan demasiado (49 versiones del Corolla). |
| `Ct`, `Cr` | Categoría del vehículo: todo es `M1` (turismo) o `M1G` (todoterreno). Como mucho, `M1G` sirve para saber si es todoterreno. |
| `Mt` | Masa usada en el ensayo. Con `M (kg)` nos basta. |
| `Erwltp`, `Ernedc`, `Enedc`, `E`, `Er` | Datos antiguos (NEDC) o de ecoinnovaciones. Vacíos o irrelevantes. |
| `MMS`, `W`, `At1`, `At2`, `De`, `Vf` | Vacíos en 2023. |
| `Dr` | Fecha de matriculación (2 ene – 29 dic 2023). Puede servir para estadísticas, pero no para la app. |
| `Ech` | Norma Euro. En 2023 todo es Euro 6, así que no aporta. **En años antiguos (2010–2015) sí importará** para la etiqueta DGT. |

---

## Próximos pasos para el script de limpieza

1. Quedarse solo con las columnas útiles (así el archivo pasa de 242 MB a mucho menos).
2. Unificar marcas con una tabla de equivalencias (Mitsubishi, Mercedes AMG…).
3. Limpiar `Cn`: quitar la marca del principio, espacios dobles y el texto de acabado/motor,
   empezando por los modelos más vendidos.
4. Agrupar por **marca + modelo + combustible + `Fm` + potencia + cilindrada** y
   guardar el número de coches y la mediana de peso, CO2 y consumo.
5. Calcular la etiqueta DGT con `Fm`, `Ft` y `Zr`.
6. Descargar otro año (p. ej. 2019) y comprobar si aparecen problemas nuevos
   ("GOLF VIII", combustibles en mayúsculas, columnas que en 2023 están vacías…).
