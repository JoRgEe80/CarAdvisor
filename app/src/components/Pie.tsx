import Logo from "@/components/Logo";

export default function Pie() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-muted sm:px-6 md:grid-cols-[1fr_2fr]">
        <div className="space-y-3">
          <Logo />
          <p>Proyecto gratuito para ayudarte a elegir coche sin complicaciones.</p>
        </div>
        <div className="space-y-3">
          <p>
            <strong className="text-foreground">Datos orientativos.</strong>{" "}
            Los precios, consumos y la fiabilidad son aproximados y pueden variar
            según la versión, el estado y el año del coche. Revisa siempre el
            vehículo antes de comprarlo.
          </p>
          <p>
            Fuentes: Agencia Europea de Medio Ambiente (EEA), DGT, ADAC y Euro
            NCAP. Algunos datos se han estimado y así se indica en cada coche.
          </p>
        </div>
      </div>
    </footer>
  );
}
