import type { LucideIcon } from "lucide-react";

export type Opcion = {
  valor: string;
  etiqueta: string;
  descripcion?: string;
  icono?: LucideIcon;
};

export type Pregunta = {
  id: string;
  titulo: string;
  /** Explicación sencilla de por qué lo preguntamos */
  ayuda: string;
  opciones: Opcion[];
};

/** Respuestas del usuario: id de la pregunta → valor de la opción elegida */
export type Respuestas = Record<string, string>;
