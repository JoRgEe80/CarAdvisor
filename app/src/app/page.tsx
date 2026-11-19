import {
  ArrowRight,
  Check,
  Clock,
  Euro,
  Gift,
  Leaf,
  ListChecks,
  MessageCircleQuestion,
  Ruler,
  ShieldCheck,
  Star,
  TrendingUp,
  Trophy,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import BotonEnlace from "@/components/BotonEnlace";

const pasos: { icono: LucideIcon; titulo: string; texto: string }[] = [
  {
    icono: MessageCircleQuestion,
    titulo: "Responde 8 preguntas",
    texto:
      "Sobre tu día a día, tu presupuesto y lo que te importa. Nada de palabras técnicas.",
  },
  {
    icono: ListChecks,
    titulo: "Comparamos por ti",
    texto:
      "Cruzamos datos oficiales de consumo, fiabilidad, seguridad y precio de cientos de modelos.",
  },
  {
    icono: Trophy,
    titulo: "Recibe tu top 5",
    texto:
      "Modelos concretos y años recomendados, con una explicación clara de por qué encajan contigo.",
  },
];

const criterios: { icono: LucideIcon; titulo: string; texto: string }[] = [
  {
    icono: Leaf,
    titulo: "Consumo y etiqueta DGT",
    texto: "Cuánto gastarás en combustible y si podrás entrar al centro.",
  },
  {
    icono: Wrench,
    titulo: "Fiabilidad",
    texto: "Qué modelos se averían menos y qué problemas conocidos tienen.",
  },
  {
    icono: ShieldCheck,
    titulo: "Seguridad",
    texto: "Las estrellas Euro NCAP, la prueba de choque de referencia en Europa.",
  },
  {
    icono: Euro,
    titulo: "Precio nuevo y usado",
    texto: "Una horquilla orientativa para que sepas qué es un buen precio.",
  },
  {
    icono: Ruler,
    titulo: "Espacio y tamaño",
    texto: "Plazas, maletero y largo, para que quepa tu vida y tu plaza de garaje.",
  },
  {
    icono: TrendingUp,
    titulo: "Popularidad en España",
    texto: "Los coches más vendidos tienen más recambios y talleres que los conocen.",
  },
];

const ventajas = [
  { icono: Gift, texto: "100 % gratis" },
  { icono: Clock, texto: "2 minutos" },
  { icono: Check, texto: "Sin registrarte" },
];

export default function Home() {
  return (
    <main>
      {/* Presentación */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[32rem] max-w-4xl rounded-full bg-brand/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pt-24 lg:pb-28">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-sm font-medium text-brand">
              <Star className="size-4" aria-hidden="true" />
              Tu asesor de coches gratuito
            </p>
            <h1 className="mt-6 text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Te ayudamos a elegir coche{" "}
              <span className="text-brand">aunque no sepas nada de coches</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-muted lg:mx-0">
              Responde unas preguntas sencillas y te diremos qué modelos y qué
              años te convienen, nuevos o de segunda mano, y por qué.
            </p>
            <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <BotonEnlace href="/cuestionario" tamano="grande">
                Empezar
                <ArrowRight className="size-5" aria-hidden="true" />
              </BotonEnlace>
              <BotonEnlace href="#como-funciona" tamano="grande" variante="secundario">
                Cómo funciona
              </BotonEnlace>
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted lg:justify-start">
              {ventajas.map(({ icono: Icono, texto }) => (
                <li key={texto} className="flex items-center gap-1.5">
                  <Icono className="size-4 text-success" aria-hidden="true" />
                  {texto}
                </li>
              ))}
            </ul>
          </div>

          <EjemploResultado />
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="scroll-mt-20 border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <TituloSeccion
            antetitulo="Cómo funciona"
            titulo="Tres pasos y listo"
            texto="Tú nos cuentas cómo es tu vida. Nosotros nos encargamos de la parte técnica."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {pasos.map(({ icono: Icono, titulo, texto }, i) => (
              <li
                key={titulo}
                className="relative rounded-3xl border border-line bg-background p-7"
              >
                <span className="absolute top-6 right-7 text-5xl font-bold text-line">
                  {i + 1}
                </span>
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Icono className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{titulo}</h3>
                <p className="mt-2 text-muted">{texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Qué tenemos en cuenta */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <TituloSeccion
          antetitulo="Qué tenemos en cuenta"
          titulo="Lo que un experto miraría por ti"
          texto="Datos de fuentes oficiales y de referencia, explicados en lenguaje normal."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {criterios.map(({ icono: Icono, titulo, texto }) => (
            <li
              key={titulo}
              className="flex gap-4 rounded-2xl border border-line bg-surface p-5 transition-shadow hover:shadow-lg hover:shadow-brand/5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icono className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">{titulo}</h3>
                <p className="mt-1 text-sm text-muted">{texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Llamada final */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-14 text-center text-white sm:px-12">
          <div
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-white/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-20 size-72 rounded-full bg-white/10"
            aria-hidden="true"
          />
          <h2 className="relative text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            ¿Empezamos? Solo son 2 minutos
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/85">
            Al final tendrás una lista corta de coches que encajan contigo, sin
            tener que leer ni una ficha técnica.
          </p>
          <BotonEnlace
            href="/cuestionario"
            tamano="grande"
            variante="secundario"
            className="relative mt-8 border-transparent bg-white text-brand hover:text-brand-strong"
          >
            Empezar el cuestionario
            <ArrowRight className="size-5" aria-hidden="true" />
          </BotonEnlace>
        </div>
      </section>
    </main>
  );
}

function TituloSeccion({
  antetitulo,
  titulo,
  texto,
}: {
  antetitulo: string;
  titulo: string;
  texto: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold tracking-wide text-brand uppercase">
        {antetitulo}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {titulo}
      </h2>
      <p className="mt-4 text-lg text-muted">{texto}</p>
    </div>
  );
}

/** Tarjeta decorativa que muestra cómo será un resultado. Los datos son de ejemplo. */
function EjemploResultado() {
  const datos = [
    { etiqueta: "Etiqueta", valor: "ECO" },
    { etiqueta: "Plazas", valor: "5" },
    { etiqueta: "Consumo", valor: "4,5 l" },
  ];
  const motivos = [
    "Gasta poco en ciudad",
    "Muy pocas averías según ADAC",
    "5 estrellas en seguridad",
  ];

  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-accent/25" />
      <div className="relative rounded-3xl border border-line bg-surface p-6 shadow-2xl shadow-brand/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              Ejemplo de resultado
            </p>
            <p className="mt-1 text-xl font-bold">Compacto híbrido</p>
            <p className="text-sm text-muted">Años recomendados: 2019 – 2022</p>
          </div>
          <div className="grid size-16 shrink-0 place-items-center rounded-full bg-success/10 text-center">
            <span className="text-lg leading-none font-bold text-success">
              94%
              <span className="block text-[10px] font-medium">encaje</span>
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {datos.map((d) => (
            <div key={d.etiqueta} className="rounded-xl bg-background px-3 py-2 text-center">
              <p className="text-[11px] text-muted">{d.etiqueta}</p>
              <p className="font-semibold">{d.valor}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm font-semibold">Por qué te lo recomendamos</p>
        <ul className="mt-2 space-y-2">
          {motivos.map((m) => (
            <li key={m} className="flex items-center gap-2 text-sm">
              <span className="grid size-5 place-items-center rounded-full bg-success text-white">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {m}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between rounded-2xl bg-brand-soft px-4 py-3">
          <span className="text-sm text-muted">De segunda mano</span>
          <span className="font-bold text-brand">14.000 – 19.000 €</span>
        </div>
      </div>
    </div>
  );
}
