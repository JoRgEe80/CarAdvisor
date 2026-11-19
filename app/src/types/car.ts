/**
 * Un coche tal y como viene en cars.json (un modelo + versión + rango de años).
 *
 * Los nombres van sin tildes ni ñ: "anio" en lugar de "año".
 * Los campos que no salen de las fuentes oficiales y se han rellenado con IA
 * aparecen listados en `campos_estimados`.
 * `null` significa "no aplica" o "no hay dato".
 */
export type Car = {
  id: string;

  // Identificación
  marca: string;
  modelo: string;
  generacion: string;
  version: string;
  anio_desde: number;
  /** null si el modelo se sigue vendiendo */
  anio_hasta: number | null;

  // Características
  /** Ej.: "utilitario", "berlina", "SUV", "familiar", "monovolumen" */
  carroceria: string;
  /** Ej.: "gasolina", "diesel", "hibrido", "hibrido enchufable", "electrico" */
  combustible: string;
  potencia_cv: number;
  /** En cm³. null en eléctricos */
  cilindrada: number | null;
  peso_kg: number;
  /** Emisiones en g/km */
  co2: number;
  /** l/100 km (o kWh/100 km en eléctricos) */
  consumo_estimado: number;
  plazas: number;
  maletero_litros: number;
  largo_m: number;
  /** Etiqueta ambiental de la DGT. "SIN" = sin etiqueta */
  etiqueta_dgt: "0" | "ECO" | "C" | "B" | "SIN";
  cambio: "manual" | "automatico";

  // Fiabilidad
  /** 1 = poco fiable, 5 = muy fiable */
  fiabilidad_1a5: number;
  aguante_motor_km: number;
  problemas_conocidos: string;
  fuente_fiabilidad: string;

  // Seguridad
  /** null si no tiene prueba Euro NCAP */
  estrellas_euroncap: number | null;
  /** Año de la prueba Euro NCAP */
  anio_prueba: number | null;

  // Precios en euros (orientativos)
  precio_nuevo_aprox: number;
  precio_usado_min: number;
  precio_usado_max: number;

  // Popularidad
  /** Matriculaciones en España */
  matriculaciones_es: number;

  /** Nombres de los campos rellenados con IA, ej.: ["maletero_litros"] */
  campos_estimados: string[];
};
