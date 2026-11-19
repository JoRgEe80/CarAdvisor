import type { Metadata } from "next";
import Cuestionario from "@/components/cuestionario/Cuestionario";

export const metadata: Metadata = {
  title: "Cuestionario",
  description: "Responde 8 preguntas sencillas y descubre qué coche te conviene.",
};

export default function PaginaCuestionario() {
  return (
    <main className="flex flex-1 flex-col px-4 py-10 sm:px-6 sm:py-16">
      <Cuestionario />
    </main>
  );
}
