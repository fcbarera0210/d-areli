/**
 * Menús de Banquetería D'Areli.
 * Fuente: menus-banqueteria-actualizados.txt
 */

export type BanqueteriaSection = { category: string; items: string };

export type BanqueteriaGalaMenu = {
  id: string;
  title: string;
  subtitle?: string;
  sections: BanqueteriaSection[];
  price: string;
  serviceIncludes: string;
  conditions?: string;
  additionalServices?: string;
  priceWithAddons?: string;
};

export const BANQUETERIA_GALA_MENUS: BanqueteriaGalaMenu[] = [
  {
    id: "evento-exclusivo",
    title: "MENÚ DE EVENTO EXCLUSIVO",
    subtitle: "Elegancia y exclusividad",
    sections: [
      {
        category: "BEBIDAS PARA INICIAR",
        items: "Espumantes; Variedad de sours; Vino blanco frío; Coronitas; Aperol spritz; Jugos y gaseosas.",
      },
      {
        category: "PEQUEÑOS BOCADOS Y APERITIVOS",
        items: "Pastel de jaiba; Empanaditas surtidas; Crostinis; Brochetas caprese; Variedad de ceviches; Pinchos de pollo; Pinchos de ternera; Bocaditos dulces.",
      },
      {
        category: "PRIMEROS PLATOS",
        items: "Ravioles de espinaca ricotta con pesto; Tortellini camarón ricotta con salsa de queso; Crema de verduras con crutones y jamón.",
      },
      {
        category: "PLATOS FUERTES PRINCIPALES",
        items: "Plateada cocción mixta con su jugo y pastelera de choclo; Entrecotte de vacuno con patatas al horno; Salmón a la plancha con salsa margarita.",
      },
      {
        category: "DULCES FINALES VARIADOS",
        items: "Buffet de postres; Mix de tartas; Panna cotta de café; Mousse de chocolate; Crème brûlée; Helado almendrado y salsa de frutas.",
      },
      {
        category: "PARA CONTINUAR LA NOCHE",
        items: "Trasnoche; Papas fritas; Tapaditos; Consomé; Costillas baby; Tapaditos variados; Té / café.",
      },
    ],
    price: "$40.000",
    serviceIncludes: "Mobiliario para la ocasión; Personal de servicio; Cocineros; Cocina (opcional) y traslado.",
  },
  {
    id: "boda",
    title: "MENÚ COMPLETO PARA BODA",
    subtitle: "Un día inolvidable",
    sections: [
      {
        category: "BEBIDAS DE BIENVENIDA",
        items: "Espumantes; Cerveza; Aperol; Tinto de verano; Jugos naturales; Gaseosa.",
      },
      {
        category: "SELECCIÓN DE TAPAS Y ENTRANTES",
        items: "2 variedad de tapas al estilo español (jamón tomate, melón y jamón, atún anchoa, huevos y gambas); 2 camarones apanados; 2 empanadas queso pollo; 2 ceviche salmón y cangrejo; Tablas de quesos y embutidos; Champiñones rellenos.",
      },
      {
        category: "OPCIONES DE ENTRANTES PRINCIPALES",
        items: "Ensalada mixta estilo español (lechuga, tomate, cebolla, atún, espárrago, huevo cocido, pepinillo); Carpaccio de salmón con alcaparras y queso parmesano aderezado con vinagreta a la mostaza.",
      },
      {
        category: "PLATOS DE FONDO",
        items: "Solomillo de cerdo en salsa de oporto y patatas bravas; Filete de vacuno en puré de arvejas y tomate asado con salsa carmenère.",
      },
      {
        category: "POSTRES VARIADOS",
        items: "Variedad de tartas; Crème brûlée; Panna cotta de café; Panna cotta de maracuyá.",
      },
      {
        category: "PARA FINALIZAR LA COMIDA",
        items: "Consomé; Tapaditos; Papas fritas.",
      },
    ],
    price: "$36.000",
    serviceIncludes: "Mobiliario; Personal de servicio; Cocina (opcional); Transporte y logística.",
  },
  {
    id: "campestre",
    title: "MENÚ FESTIVO CHILENO CAMPESTRE",
    subtitle: "Tradición y parrilla",
    sections: [
      {
        category: "OPCIONES DE BEBIDAS REFRESCANTES",
        items: "Pisco sour; Mango sour; Borgoña; Clery; Cervezas; Jugos naturales; Bebidas.",
      },
      {
        category: "ENDRANTES TRADICIONALES",
        items: "2 empanaditas de queso; 2 empanaditas de pino; 2 sopaipillas c/pebre; 2 tutitos al horno; 1 mini pastelito de choclo; 1 ceviche de reineta.",
      },
      {
        category: "PLATOS FUERTES Y ACOMPAÑAMIENTOS DE LA PARRILLA CHILENA",
        items: "Parrilladas a la chilena de vacuno, cerdo, pollo, longaniza; Acompañado de ensaladas y papas cocidas; Pan y pebre; Vinos de la zona.",
      },
      {
        category: "DULCES TENTACIONES",
        items: "Leche asada; Helado; Torta de piña y crema; Panqueques.",
      },
      {
        category: "CIERRE GASTRONÓMICO",
        items: "Tapaditos y consomé; Té y café.",
      },
    ],
    price: "$32.000",
    serviceIncludes: "Mobiliario completo; Personal de servicio; Parrillas; Cocina opcional; Logística y transporte.",
  },
  {
    id: "corporativo",
    title: "MENÚ CORPORATIVO CON OPCIONES VARIADAS",
    subtitle: "Profesional y versátil",
    sections: [
      {
        category: "BEBIDAS PARA REFRESCAR",
        items: "Pisco sour; Cervezas; Jugos naturales; Espumantes; Agua mineral; Gaseosas.",
      },
      {
        category: "ENDRANTES Y BOCADOS",
        items: "2 empanadas de queso; 2 empanadas de pino; 2 variedad de ceviches; 2 pastelitos dulces; 2 pastel de jaiba; 2 tutitos de pollo a la mostaza.",
      },
      {
        category: "PLATO PRINCIPAL Y ACOMPAÑAMIENTOS",
        items: "Lomo vetado a la brasa con patata panadera; Ensaladas mixtas de la estación (tomate, lechuga, olivas); Pan y pebre; Vinos de la zona.",
      },
      {
        category: "POSTRES PARA FINALIZAR",
        items: "Pie de limón; Mix de tartas.",
      },
    ],
    price: "$32.000",
    serviceIncludes: "Mobiliario completo; Garzones; Cocineros; Cocina (opcional); Parrillas.",
  },
];

/** Ítem de coctelería con nombre y precio visible */
export type CocteleriaItem = { name: string; price: string };

/** Categoría del menú de coctelería */
export type CocteleriaCategory = { name: string; items: CocteleriaItem[] };

export const COCTELERIA_CATEGORIES: CocteleriaCategory[] = [
  {
    name: "Canapés Estándar",
    items: [
      { name: "Canapés estándar base pollo (100 U)", price: "$25.000" },
      { name: "Canapé estándar base mayonesa (100 U) — Chorito, espárrago, choclo, queso, aceituna, jamón, palmito, salame, pepinillo, tomate cherry (elegir 4 tipos)", price: "$23.000" },
    ],
  },
  {
    name: "Tapaditos Variados",
    items: [
      { name: "Tapaditos (50 U) elegir 2 tipos — Pasta de ave mayo, ave pimiento, queso salame, jamón queso", price: "$28.000" },
    ],
  },
  {
    name: "Mini Churrascos",
    items: [
      { name: "Mini churrascos (50 U) — Churrasco queso/lechuga/tomate; Pollo queso/lechuga/tomate; Salame queso", price: "$36.000" },
    ],
  },
  {
    name: "Pizzetas",
    items: [{ name: "Pizzetas (50 U)", price: "$30.000" }],
  },
  {
    name: "Empanadas",
    items: [
      { name: "Empanadas queso (50 U)", price: "$28.000" },
      { name: "Empanadas de pino (50 U)", price: "$32.000" },
      { name: "Empanadas queso camarón (40 U)", price: "$32.000" },
    ],
  },
  {
    name: "Mini Postres",
    items: [{ name: "Mini tartaletas o mini pie (100 U)", price: "$27.000" }],
  },
  {
    name: "Cachitos Dulces",
    items: [{ name: "50 cachitos con manjar o crema pastelera", price: "$17.000" }],
  },
  {
    name: "Fajitas",
    items: [
      { name: "Fajitas (24 U) — Elegir 1: Carne o pollo. Agregados elegir 2: lechuga, tomate, aceituna, choclo", price: "$25.000" },
    ],
  },
  {
    name: "Sopaipillas con Guacamole",
    items: [{ name: "Sopaipillas con guacamole (50 U)", price: "$17.000" }],
  },
  {
    name: "Alitas de Pollo",
    items: [{ name: "50 alitas de pollo a la mostaza", price: "$32.000" }],
  },
  {
    name: "Ceviches",
    items: [
      { name: "Ceviche camarón / kanikama (kilo)", price: "$28.000" },
      { name: "Ceviche de reineta (kilo)", price: "$22.000" },
      { name: "Ceviche salmón (kilo)", price: "$25.000" },
    ],
  },
  {
    name: "Crostinis",
    items: [
      { name: "30 crostinis base oliva-queso crema (elegir 3 tipos) — Cebolla acaramelada, camarón, champiñón salteado, salmón, salame, tomate cherry salteado/albahaca, pollo a la mostaza", price: "$22.000" },
    ],
  },
  {
    name: "Pinchos",
    items: [
      { name: "Pinchos (50 unid) — Queso salame aceituna sevillana; Queso champiñón tomate cherry; Pollo salteado", price: "$25.000" },
    ],
  },
  {
    name: "Vasitos de Fruta",
    items: [{ name: "Vasitos de fruta (50 U)", price: "$30.000" }],
  },
];

export const COCTELERIA_CONTACT = "WhatsApp: +56 9 4883 5522 — Cotiza tu evento con nosotros.";
export const COCTELERIA_FOOTER =
  "Servicio de camareros, Bartender y asadores disponible. Gracias por cotizar con nosotros.";
