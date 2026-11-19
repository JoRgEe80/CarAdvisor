import { Car } from "lucide-react";

export default function Logo() {
  return (
    <span className="flex items-center gap-2 text-lg font-bold tracking-tight">
      <span className="grid size-9 place-items-center rounded-xl bg-brand text-white shadow-sm shadow-brand/30">
        <Car className="size-5" aria-hidden="true" />
      </span>
      <span>
        Car<span className="text-brand">Advisor</span>
      </span>
    </span>
  );
}
