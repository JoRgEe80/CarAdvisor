# Proyecto: Recomendador de coches

## Qué es
App web que recomienda modelos de coche (nuevos y de segunda mano,
por modelo y año) a personas que no saben de coches, a partir de un
cuestionario sencillo. No muestra anuncios: enlaza a coches.net con
la búsqueda filtrada.

## Equipo y forma de trabajar
- Dos personas aprendiendo; 1 h/día cada una, ~1 mes en total.
- Explica siempre lo que haces y por qué, de forma sencilla.
- Cambios pequeños, una tarea por rama, pull request a main.
- Todo debe ser gratuito.

## Stack
- data-pipeline/: Python + pandas. Genera app/data/cars.json
- app/: Next.js + TypeScript + Tailwind. Sin backend.
- Despliegue: Vercel (gratis).

## Datos
- Base: EEA (CO2 de turismos nuevos, un archivo por año desde 2010).
- Popularidad: DGT (microdatos de matriculaciones).
- Fiabilidad: ADAC Pannenstatistik. Seguridad: Euro NCAP.
- Campos que no existen en las fuentes se generan con IA y se
  marcan en "campos_estimados".
- Los datos brutos (data-pipeline/raw/) no se suben a git.
- Precios y fiabilidad son orientativos; la app lo indica.

## Prioridades
1. Cuestionario para novatos + puntuación + top 5 con explicación.
2. Ficha del coche + enlace a coches.net.
3. Extras: filtros avanzados, comparador, coste anual.
