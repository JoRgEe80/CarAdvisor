import {
  Armchair,
  Baby,
  Building2,
  CircleHelp,
  Fuel,
  Gauge,
  History,
  Luggage,
  PlugZap,
  Plug,
  Route,
  ShieldCheck,
  ShoppingBag,
  Shuffle,
  Sparkles,
  SquareParking,
  ThumbsUp,
  User,
  Users,
  UsersRound,
  Wallet,
  Warehouse,
  Wrench,
} from "lucide-react";
import type { Pregunta } from "@/types/cuestionario";

/**
 * Preguntas del cuestionario, en el orden en que se muestran.
 * Para cambiar un texto o añadir una pregunta, basta con editar esta lista.
 */
export const preguntas: Pregunta[] = [
  {
    id: "estado",
    titulo: "¿Buscas un coche nuevo o de segunda mano?",
    ayuda:
      "Un coche de segunda mano cuesta bastante menos; uno nuevo te da garantía y lo último en seguridad.",
    opciones: [
      { valor: "nuevo", etiqueta: "Nuevo", descripcion: "Recién salido del concesionario", icono: Sparkles },
      { valor: "usado", etiqueta: "Segunda mano", descripcion: "Más barato, ya con algunos kilómetros", icono: History },
      { valor: "indiferente", etiqueta: "Me da igual", descripcion: "Enséñame las dos opciones", icono: Shuffle },
    ],
  },
  {
    id: "presupuesto",
    titulo: "¿Cuánto quieres gastar como máximo?",
    ayuda: "Es el precio del coche. No hace falta que sea exacto: elige el rango más cercano.",
    opciones: [
      { valor: "10000", etiqueta: "Hasta 10.000 €", icono: Wallet },
      { valor: "20000", etiqueta: "Hasta 20.000 €", icono: Wallet },
      { valor: "30000", etiqueta: "Hasta 30.000 €", icono: Wallet },
      { valor: "45000", etiqueta: "Hasta 45.000 €", icono: Wallet },
      { valor: "sin-limite", etiqueta: "Más de 45.000 €", icono: Wallet },
    ],
  },
  {
    id: "uso",
    titulo: "¿Por dónde vas a conducir sobre todo?",
    ayuda: "Hay coches que brillan en ciudad y otros que son mejores en viajes largos.",
    opciones: [
      { valor: "ciudad", etiqueta: "Por ciudad", descripcion: "Trayectos cortos, atascos y semáforos", icono: Building2 },
      { valor: "carretera", etiqueta: "Por carretera", descripcion: "Autovía y viajes largos a menudo", icono: Route },
      { valor: "mixto", etiqueta: "Un poco de todo", descripcion: "Ciudad entre semana, escapadas de vez en cuando", icono: Shuffle },
    ],
  },
  {
    id: "personas",
    titulo: "¿Cuántas personas viajan normalmente?",
    ayuda: "Contándote a ti. Piensa en lo habitual, no en el viaje de una vez al año.",
    opciones: [
      { valor: "1-2", etiqueta: "1 o 2", icono: User },
      { valor: "3-4", etiqueta: "3 o 4", icono: Users },
      { valor: "5", etiqueta: "5", icono: UsersRound },
      { valor: "6-7", etiqueta: "6 o 7", descripcion: "Necesitas una tercera fila de asientos", icono: UsersRound },
    ],
  },
  {
    id: "maletero",
    titulo: "¿Cuánto vas a cargar en el maletero?",
    ayuda: "El maletero se mide en litros. Te traducimos los litros a cosas del día a día.",
    opciones: [
      { valor: "poco", etiqueta: "Poco", descripcion: "La compra y alguna mochila", icono: ShoppingBag },
      { valor: "normal", etiqueta: "Lo normal", descripcion: "Maletas para un fin de semana", icono: Luggage },
      { valor: "mucho", etiqueta: "Mucho", descripcion: "Carrito de bebé, perro, bici o vacaciones en familia", icono: Baby },
    ],
  },
  {
    id: "aparcamiento",
    titulo: "¿Dónde vas a aparcar?",
    ayuda: "Si aparcas en la calle de una ciudad, un coche corto te ahorrará muchas vueltas.",
    opciones: [
      { valor: "calle", etiqueta: "En la calle, y cuesta encontrar sitio", icono: SquareParking },
      { valor: "garaje-pequeno", etiqueta: "En un garaje pequeño o estrecho", icono: Warehouse },
      { valor: "sin-problema", etiqueta: "Tengo sitio de sobra", icono: ThumbsUp },
    ],
  },
  {
    id: "carga",
    titulo: "¿Podrías enchufar el coche en casa o en el trabajo?",
    ayuda:
      "Los eléctricos e híbridos enchufables solo salen a cuenta si puedes cargarlos fácilmente.",
    opciones: [
      { valor: "si", etiqueta: "Sí", descripcion: "Tengo garaje con enchufe o cargador cerca", icono: PlugZap },
      { valor: "no", etiqueta: "No", descripcion: "Mejor gasolina, diésel o híbrido normal", icono: Plug },
      { valor: "no-se", etiqueta: "No lo sé", descripcion: "No pasa nada, lo tendremos en cuenta", icono: CircleHelp },
    ],
  },
  {
    id: "prioridad",
    titulo: "¿Qué es lo más importante para ti?",
    ayuda: "Elige lo que más te importe. Lo usaremos para ordenar las recomendaciones.",
    opciones: [
      { valor: "fiabilidad", etiqueta: "Que no se averíe", descripcion: "Pocas visitas al taller", icono: Wrench },
      { valor: "gasto", etiqueta: "Gastar poco", descripcion: "En combustible y mantenimiento", icono: Fuel },
      { valor: "seguridad", etiqueta: "La seguridad", descripcion: "Las mejores notas en pruebas de choque", icono: ShieldCheck },
      { valor: "comodidad", etiqueta: "La comodidad", descripcion: "Espacio, silencio y buen confort", icono: Armchair },
      { valor: "potencia", etiqueta: "Que corra bien", descripcion: "Que acelere con alegría", icono: Gauge },
    ],
  },
];
