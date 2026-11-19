import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <div className="w-full max-w-xl">
        <p className="text-6xl" aria-hidden="true">
          🚗
        </p>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          CarAdvisor
        </h1>
        <p className="mt-4 text-lg text-neutral-600 sm:text-xl dark:text-neutral-400">
          Te ayudamos a elegir coche aunque no sepas nada de coches
        </p>
        <Link
          href="/cuestionario"
          className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
        >
          Empezar
        </Link>
      </div>
    </main>
  );
}
