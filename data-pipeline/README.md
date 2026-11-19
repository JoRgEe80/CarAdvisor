# data-pipeline

Aquí irán los scripts de Python (con pandas) que preparan los datos de los coches.

Su trabajo es leer los datos originales (EEA, DGT, ADAC, Euro NCAP), limpiarlos,
unirlos y generar el archivo `cars.json` que usa la aplicación web (`app/`).

## Carpetas

- `raw/`: los archivos descargados tal cual (CSV grandes). **No se suben a git**
  porque ocupan mucho; cada persona los descarga en su ordenador.
  Solo se sube un `.gitkeep` vacío para que la carpeta exista.
