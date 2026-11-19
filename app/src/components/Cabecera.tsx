import Link from "next/link";
import BotonEnlace from "@/components/BotonEnlace";
import Logo from "@/components/Logo";

export default function Cabecera() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="CarAdvisor, ir al inicio">
          <Logo />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-4">
          <Link
            href="/#como-funciona"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground sm:block"
          >
            Cómo funciona
          </Link>
          <BotonEnlace href="/cuestionario">Empezar</BotonEnlace>
        </nav>
      </div>
    </header>
  );
}
