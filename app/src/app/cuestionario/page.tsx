import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cuestionario | CarAdvisor",
};

export default function Cuestionario() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Próximamente
      </h1>
      <Link
        href="/"
        className="mt-8 text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
      >
        ← Volver al inicio
      </Link>
    </main>
  );
}
