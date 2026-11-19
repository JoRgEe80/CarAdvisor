import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  variante?: "principal" | "secundario";
  tamano?: "normal" | "grande";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.98]";

const variantes = {
  principal:
    "bg-brand text-white shadow-lg shadow-brand/25 hover:bg-brand-strong hover:shadow-brand/35",
  secundario:
    "border border-line bg-surface text-foreground hover:border-brand/40 hover:text-brand",
};

const tamanos = {
  normal: "px-5 py-2.5 text-sm",
  grande: "px-8 py-4 text-base sm:text-lg",
};

/** Enlace con aspecto de botón. */
export default function BotonEnlace({
  variante = "principal",
  tamano = "normal",
  className = "",
  ...props
}: Props) {
  return (
    <Link
      className={`${base} ${variantes[variante]} ${tamanos[tamano]} ${className}`}
      {...props}
    />
  );
}
