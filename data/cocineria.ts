/**
 * Datos placeholder para D'Areli Gastronómico.
 * Almuerzos diarios (típicos chilenos) y comidas temporales (empanadas fin de semana).
 * Reemplazar con menús definitivos cuando estén disponibles.
 */

export type AlmuerzoDiario = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
};

export type EmpanadaTemporal = {
  id: string;
  variedad: string;
  descripcion: string;
  precio: string;
};

export const almuerzosDiarios: AlmuerzoDiario[] = [
  { id: "cazuela", nombre: "Cazuela de vacuno", descripcion: "Caldo de vacuno con choclo, zapallo, papa y arroz. Sabor tradicional chileno.", precio: "$6.500" },
  { id: "pastel-choclo", nombre: "Pastel de choclo", descripcion: "Pino de carne, cebolla, aceitunas y huevo, cubierto con pasta de choclo gratinada.", precio: "$7.200" },
  { id: "porotos", nombre: "Porotos granados", descripcion: "Porotos con mote, zapallo, albahaca y choclo. Opción vegetariana disponible.", precio: "$6.800" },
  { id: "lentejas", nombre: "Lentejas con chorizo", descripcion: "Guiso de lentejas con chorizo, zanahoria y cilantro. Pan y ensalada.", precio: "$6.200" },
  { id: "pollo-arvejado", nombre: "Pollo arvejado", descripcion: "Pollo en salsa de arvejas con zanahoria y papas. Clásico de la cocina chilena.", precio: "$7.500" },
  { id: "carbonada", nombre: "Carbonada", descripcion: "Guiso de carne con zapallo, choclo, papa y perejil. Ideal para el invierno.", precio: "$7.000" },
  { id: "estofado", nombre: "Estofado de vacuno", descripcion: "Vacuno estofado con cebolla, zanahoria y vino. Acompañado de arroz o puré.", precio: "$8.000" },
  { id: "ensalada-pollo", nombre: "Ensalada surtida + pollo", descripcion: "Ensalada fresca con pechuga grillada. Incluye pan y postre del día.", precio: "$7.800" },
];

export const comidasTemporales: EmpanadaTemporal[] = [
  { id: "pino", variedad: "Empanada de pino", descripcion: "Carne, cebolla, huevo, aceituna y pasas. Tradición chilena.", precio: "$2.800" },
  { id: "queso", variedad: "Empanada de queso", descripcion: "Queso fundido en masa horneada. Opción vegetariana.", precio: "$2.500" },
  { id: "napolitana", variedad: "Empanada napolitana", descripcion: "Queso, jamón y tomate. Ideal para compartir.", precio: "$2.600" },
  { id: "mariscos", variedad: "Empanada de mariscos", descripcion: "Mezcla de mariscos con queso y merkén. Especialidad de temporada.", precio: "$3.200" },
  { id: "pollo", variedad: "Empanada de pollo", descripcion: "Pollo cremoso con verduras. Suave y sabroso.", precio: "$2.700" },
  { id: "champiñon", variedad: "Empanada de champiñones", descripcion: "Champiñones salteados con queso. Opción vegetariana.", precio: "$2.800" },
];

export const textoComidasTemporales =
  "Disponibles ciertos fines de semana según stock. Consultar disponibilidad por WhatsApp o al pedir.";
