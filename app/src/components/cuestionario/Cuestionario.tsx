"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowLeft, ArrowRight, Check, Pencil, RotateCcw, Sparkles } from "lucide-react";
import { preguntas } from "@/lib/preguntas";
import type { Opcion, Respuestas } from "@/types/cuestionario";

/** Tiempo que se ve la opción marcada antes de pasar a la siguiente pregunta */
const PAUSA_AL_ELEGIR_MS = 350;

export default function Cuestionario() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<Respuestas>({});
  const temporizador = useRef<ReturnType<typeof setTimeout>>(undefined);
  const titulo = useRef<HTMLHeadingElement>(null);

  const total = preguntas.length;
  const terminado = paso >= total;
  const pregunta = preguntas[paso];
  const progreso = Math.round((Math.min(paso, total) / total) * 100);

  // Al cambiar de pregunta, llevamos el foco al título (ayuda a lectores de pantalla)
  useEffect(() => {
    titulo.current?.focus({ preventScroll: true });
  }, [paso]);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  function elegir(valor: string) {
    setRespuestas((r) => ({ ...r, [pregunta.id]: valor }));
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setPaso((p) => p + 1), PAUSA_AL_ELEGIR_MS);
  }

  function irA(nuevoPaso: number) {
    clearTimeout(temporizador.current);
    setPaso(nuevoPaso);
  }

  function reiniciar() {
    setRespuestas({});
    irA(0);
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-muted">
          <span>{terminado ? "¡Listo!" : `Pregunta ${paso + 1} de ${total}`}</span>
          <span>{progreso}%</span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-label="Progreso del cuestionario"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progreso}
        >
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      <div
        key={paso}
        className="animate-aparecer rounded-3xl border border-line bg-surface p-6 shadow-xl shadow-brand/5 sm:p-10"
      >
        {terminado ? (
          <Resumen respuestas={respuestas} tituloRef={titulo} onCambiar={irA} onReiniciar={reiniciar} />
        ) : (
          <>
            <h1
              ref={titulo}
              tabIndex={-1}
              className="text-2xl font-bold tracking-tight text-balance outline-none sm:text-3xl"
            >
              {pregunta.titulo}
            </h1>
            <p className="mt-3 text-muted">{pregunta.ayuda}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {pregunta.opciones.map((opcion) => (
                <BotonOpcion
                  key={opcion.valor}
                  opcion={opcion}
                  elegida={respuestas[pregunta.id] === opcion.valor}
                  onElegir={() => elegir(opcion.valor)}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => irA(paso - 1)}
                disabled={paso === 0}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:invisible"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Atrás
              </button>
              {respuestas[pregunta.id] && (
                <button
                  type="button"
                  onClick={() => irA(paso + 1)}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
                >
                  Siguiente
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function BotonOpcion({
  opcion,
  elegida,
  onElegir,
}: {
  opcion: Opcion;
  elegida: boolean;
  onElegir: () => void;
}) {
  const Icono = opcion.icono;
  return (
    <button
      type="button"
      onClick={onElegir}
      aria-pressed={elegida}
      className={`group flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.98] ${
        elegida
          ? "border-brand bg-brand-soft"
          : "border-line bg-surface hover:border-brand/40 hover:bg-brand-soft/40"
      }`}
    >
      {Icono && (
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors ${
            elegida ? "bg-brand text-white" : "bg-background text-brand group-hover:bg-brand-soft"
          }`}
        >
          <Icono className="size-5" aria-hidden="true" />
        </span>
      )}
      <span className="flex-1">
        <span className="block font-semibold">{opcion.etiqueta}</span>
        {opcion.descripcion && (
          <span className="mt-0.5 block text-sm text-muted">{opcion.descripcion}</span>
        )}
      </span>
      <span
        className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
          elegida ? "border-brand bg-brand text-white" : "border-line"
        }`}
        aria-hidden="true"
      >
        {elegida && <Check className="size-3.5" strokeWidth={3} />}
      </span>
    </button>
  );
}

function Resumen({
  respuestas,
  tituloRef,
  onCambiar,
  onReiniciar,
}: {
  respuestas: Respuestas;
  tituloRef: RefObject<HTMLHeadingElement | null>;
  onCambiar: (paso: number) => void;
  onReiniciar: () => void;
}) {
  return (
    <>
      <span className="grid size-14 place-items-center rounded-2xl bg-success/10 text-success">
        <Check className="size-7" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <h1
        ref={tituloRef}
        tabIndex={-1}
        className="mt-5 text-2xl font-bold tracking-tight outline-none sm:text-3xl"
      >
        ¡Gracias! Esto es lo que nos has contado
      </h1>
      <p className="mt-3 text-muted">Revisa tus respuestas. Puedes cambiar cualquiera.</p>

      <dl className="mt-8 divide-y divide-line rounded-2xl border border-line">
        {preguntas.map((p, i) => {
          const opcion = p.opciones.find((o) => o.valor === respuestas[p.id]);
          return (
            <div key={p.id} className="flex items-center gap-4 px-4 py-3">
              <div className="min-w-0 flex-1">
                <dt className="text-sm text-muted">{p.titulo}</dt>
                <dd className="font-semibold">{opcion?.etiqueta ?? "Sin responder"}</dd>
              </div>
              <button
                type="button"
                onClick={() => onCambiar(i)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-brand transition-colors hover:bg-brand-soft"
                aria-label={`Cambiar: ${p.titulo}`}
              >
                <Pencil className="size-3.5" aria-hidden="true" />
                Cambiar
              </button>
            </div>
          );
        })}
      </dl>

      <div className="mt-8 rounded-2xl bg-accent-soft p-5">
        <p className="flex items-center gap-2 font-semibold">
          <Sparkles className="size-5 text-accent" aria-hidden="true" />
          Tus recomendaciones, muy pronto
        </p>
        <p className="mt-1 text-sm text-muted">
          Estamos preparando la base de datos de coches. En cuanto esté lista, aquí verás tu top 5.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse sm:justify-between">
        <button
          type="button"
          disabled
          className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white opacity-50"
        >
          Ver mis coches
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onReiniciar}
          className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Empezar de nuevo
        </button>
      </div>
    </>
  );
}
