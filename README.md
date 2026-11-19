# CarAdvisor

Recomendador de coches para gente que no sabe de coches.

Respondes un cuestionario sencillo y la app te recomienda modelos concretos
(por modelo y año), nuevos o de segunda mano, explicando por qué.
Es gratuita y no tiene backend: todos los datos salen de un archivo `cars.json`.

## Estructura

```
app/            Aplicación web (Next.js + TypeScript + Tailwind)
data-pipeline/  Scripts de Python que generan cars.json
CLAUDE.md       Contexto del proyecto para la IA (AGENTS.md es una copia)
```

## Cómo arrancar la app

Necesitas [Node.js](https://nodejs.org/) 20.9 o superior.

```bash
cd app
npm install     # solo la primera vez (o si cambian las dependencias)
npm run dev
```

Después abre <http://localhost:3000> en el navegador.
Para pararla, pulsa `Ctrl + C` en la terminal.
