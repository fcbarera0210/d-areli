"use client";

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChefHat, Utensils, Phone, Mail, MapPin, ChevronRight, Menu, X, Award, Clock, Instagram, Facebook } from 'lucide-react';

type LunchMenuSection = { category: string; items: string };
type LunchMenuItem = {
  title: string;
  color: string;
  bg: string;
  textColor: string;
  items: string[];
  price: string;
  priceNote?: string;
  detailSections: LunchMenuSection[];
};

const getFadeInSection = (duration: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration, ease: 'easeOut' } }
});

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const QUIENES_SOMOS_IMAGE = 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop';

const Template2 = () => {
  const [activeTab, setActiveTab] = useState('banqueteria');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLunchMenu, setSelectedLunchMenu] = useState<LunchMenuItem | null>(null);
  const reducedMotion = useReducedMotion();
  const motionDuration = reducedMotion ? 0.2 : 0.8;

  const scrollToServicios = () => {
    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
  };

  const closeLunchModal = useCallback(() => setSelectedLunchMenu(null), []);
  useEffect(() => {
    if (!selectedLunchMenu) return;
    const onEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLunchModal(); };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [selectedLunchMenu, closeLunchModal]);

  const lunchMenus: LunchMenuItem[] = [
    {
      title: "MENÚ EMPRESAS", color: "border-red-500", bg: "bg-red-500", textColor: "text-red-600",
      items: ["Pisco/Mango Sour, cerveza y coctelería", "Almuerzo buffet de asados", "Postre pie de limón y torta-helado", "Opción bar abierto"],
      price: "$23.800 + IVA", priceNote: "$35.700 + IVA (*) con bar abierto",
      detailSections: [
        { category: "APERITIVOS Y COCTELERÍA", items: "Pisco Sour, Mango Sour, Cerveza, 3 empanaditas de queso, 2 ceviches de reineta, 2 pastelitos dulces, 2 tutitos de ala, 1 pastel de jaiba." },
        { category: "ALMUERZO", items: "Buffet de asados: pollo, cerdo y vacuno a la parrilla. Papas cocidas, ensaladas (tomate, lechuga, choclo), pan, pebre." },
        { category: "POSTRE", items: "Pie de limón, Torta, Helado." },
        { category: "DETALLES DEL SERVICIO", items: "Servicio incluye: Garzones y cocineros, mesas y sillas vestidas, loza, cristalería, cubiertos. Valor: $23.800 + IVA; $35.700 + IVA (*) bar abierto barra nacional (Micheladas, Pisco, Whisky, Aperol, Espumante, Sours)." }
      ]
    },
    {
      title: "MENÚ CAMPESTRE", color: "border-blue-500", bg: "bg-blue-500", textColor: "text-blue-600",
      items: ["Aperitivos y ponches, coctelería criolla", "Plato de fondo: buffet asados criollos", "Postres y trasnoche"],
      price: "$23.000 + IVA",
      detailSections: [
        { category: "APERITIVOS Y BEBESTIBLES", items: "Pisco o Mango Sour, Cerveza, ponches, jugos naturales, bebidas, agua detox." },
        { category: "COCTELERÍA", items: "3 empanadas de queso o pino, 3 sopaipillas con pebre, 2 ceviche de reineta, Chancho en piedra, Arrollado de huaso, 2 tutitos de pollo al horno." },
        { category: "PLATO DE FONDO", items: "Buffet asados criollos: pollo, cerdo, vacuno, prietas, longaniza. Papas cocidas, pan, pebre, vinos y bebidas." },
        { category: "BUFFET DE POSTRES", items: "Leche asada, Mote con huesillos, Arroz con leche, Panqueques, Frutas." },
        { category: "TRASNOCHE", items: "Consomé, Tapaditos (ave, queso, salame)." },
        { category: "DETALLES DEL SERVICIO", items: "Servicio incluye: Mobiliario, personal de servicio. Valor: $23.000 + IVA." }
      ]
    },
    {
      title: "MENÚ MATRIMONIO", color: "border-orange-500", bg: "bg-orange-500", textColor: "text-orange-600",
      items: ["Coctelería y entrada elegante", "Fondo: plateada o cerdo al horno", "Postres y trasnoche"],
      price: "$27.000 + IVA",
      detailSections: [
        { category: "APERITIVOS", items: "1 Pisco o Mango Sour, 1 espumante, ponches, jugos naturales y bebidas." },
        { category: "COCTELERÍA", items: "4 canapés variados, 2 ceviches de reineta, 3 empanaditas de queso, 2 brochetas, 2 sopaipillas de coctel." },
        { category: "ENTRADA", items: "Rollito de jamón York; Camarón y palmitos en lechuga; Palta rellena con dressing de yogurth." },
        { category: "FONDO", items: "Plateada de vacuno en su jugo con papas rústicas. Cerdo al horno con papas duquesas." },
        { category: "POSTRES", items: "Mousse de manjar, Cheesecake de maracuyá, Pie de limón, Tiramisú, Frutas frescas." },
        { category: "TRASNOCHE", items: "Tapaditos surtidos, Consomé de ave." },
        { category: "DETALLES DEL SERVICIO", items: "Servicio incluye: Mobiliario, personal, decoración centro de mesas. Valor: $27.000 + IVA." }
      ]
    },
    {
      title: "MENÚ MATRIMONIO VIP", color: "border-teal-500", bg: "bg-teal-500", textColor: "text-teal-600",
      items: ["Coctelería premium", "Entrada: ceviche, mousse o fantasía marina", "Fondo: lomo vetado o plateada", "Trasnoche cordero/costillar"],
      price: "$30.000 + IVA",
      detailSections: [
        { category: "APERITIVOS", items: "Pisco o Mango Sour, espumantes, Late Harvest, Cerveza Corona, bebidas y jugos." },
        { category: "COCTELERÍA", items: "1 pastel de jaiba, 2 bocados de ceviche, 2 empanaditas de queso, 2 pinchos de pollo a la mostaza, 2 pastelitos dulces." },
        { category: "ENTRADA", items: "Ceviche de reineta con crostini al ajillo. Mousse de pollo en palta y dressing de yogurth. Fantasía marina: fondos de alcachofa con puré de jaiba." },
        { category: "FONDO", items: "Lomo vetado a las brasas con papas rústicas. Plateada en su jugo con pastelera de choclo." },
        { category: "POSTRES", items: "Cheesecake de frutilla, Pie de limón, Leche asada, Panqueques, Mousse de chocolate, Panna cotta de café." },
        { category: "TRASNOCHE (100 PERS)", items: "Cordero asado, Costillar asado, Consomé, Tapaditos." },
        { category: "DETALLES DEL SERVICIO", items: "Servicio incluye: Mobiliario, decoración centro de mesas. Valor: $30.000 + IVA." }
      ]
    }
  ];

  const galaMenu: Record<string, string[]> = {
    aperitivos: ["Pisco sour", "Mango sour", "Bebidas", "Jugo natural", "Vino espumante", "Cerveza"],
    bocados: ["4 canapés variados", "2 ceviches de reineta", "1 pastel de jaiba", "3 empanaditas de queso", "1 brocheta de cerdo", "2 pastelitos dulces"],
    entradas: ["Mousse de pollo en palta natural y dressing de yogurth", "Fantasía marina (pastel de jaiba en fondos de alcachofa y lechuga marina)"],
    "plato principal": ["Mechada de vacuno cocinada en su jugo con pastelera de choclo y papas crocantes", "Plateada de vacuno con salsa mignon y papas rústicas al perejil"],
    "menú vegetariano": ["Quiche de verduras con salteado de vegetales"],
    líquidos: ["Vinos, bebidas y jugos durante el servicio", "Té, café, agua de hierbas"],
    "buffet de postres": ["Suspiro limeño", "Mousse de chocolate", "Cheesecake de frutilla", "Pie de limón", "Waffles y helado", "Leche asada"],
    trasnoche: ["Consomé de ave", "Tapaditos"]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <nav className="fixed w-full z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">D</div>
              <span className="text-xl font-bold tracking-tighter uppercase">D'Areli <span className="font-light italic">Banquetería</span></span>
            </motion.div>
            <div className="hidden md:flex items-center gap-8">
              {['inicio', 'quienes-somos', 'servicios'].map((item) => (
                <motion.a key={item} href={`#${item}`} whileHover={{ y: -2 }} className="text-sm font-medium hover:text-red-600 transition-colors capitalize">{item.replace('-', ' ')}</motion.a>
              ))}
              <motion.a href="#contacto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all inline-block">Contactar</motion.a>
            </div>
            <button type="button" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </nav>

      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 0.4 }} transition={{ duration: reducedMotion ? 0.3 : 2 }} className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-400 via-slate-900 to-black" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.5, duration: motionDuration }} className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Arte en cada <br /><span className="italic font-serif text-slate-300 font-light underline decoration-red-500/30 underline-offset-8">Bocado</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reducedMotion ? 0 : 1, duration: motionDuration }} className="text-xl text-slate-300 mb-10 font-light">Servicios gastronómicos de alta gama para empresas y celebraciones únicas.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 1.3, duration: motionDuration }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button type="button" onClick={() => { scrollToServicios(); setActiveTab('banqueteria'); }} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xl">Banquetería Gala <ChevronRight size={18}/></button>
            <button type="button" onClick={() => { scrollToServicios(); setActiveTab('almuerzos'); }} className="px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">Menús Almuerzo <ChevronRight size={18}/></button>
          </motion.div>
        </div>
      </section>

      <motion.section id="quienes-somos" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={getFadeInSection(motionDuration)} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs">Nuestra Esencia</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Pasión por la alta cocina</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light">En <strong>D'Areli</strong>, transformamos reuniones en experiencias memorables. Nuestra cocina fusiona la técnica profesional con el cariño de lo hecho en casa, asegurando que cada plato cuente una historia de calidad.</p>
              <div className="grid grid-cols-2 gap-8 py-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg"><Award size={24}/></div>
                  <h4 className="font-bold">Excelencia</h4>
                  <p className="text-sm text-slate-500">Certificación en cada proceso gastronómico.</p>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><Clock size={24}/></div>
                  <h4 className="font-bold">Eficiencia</h4>
                  <p className="text-sm text-slate-500">Logística perfecta para eventos de gran escala.</p>
                </motion.div>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: reducedMotion ? 0.2 : 1 }} className="relative">
              <div className="aspect-[4/5] rounded-[2rem] bg-slate-200 overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <Image src={QUIENES_SOMOS_IMAGE} alt="" width={800} height={1000} className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <motion.div animate={reducedMotion ? undefined : { y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-6 -left-6 bg-white text-black p-10 rounded-3xl shadow-2xl border border-slate-100">
                <p className="text-5xl font-black text-red-600">10+</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-50">Años de Sabor</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section id="servicios" className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Propuestas Personalizadas</h2>
            <div className="flex justify-center mt-8 p-1.5 bg-white rounded-full shadow-inner max-w-sm mx-auto border border-slate-200">
              {['banqueteria', 'almuerzos'].map((tab) => (
                <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`relative flex-1 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all z-10 ${activeTab === tab ? 'text-white' : 'text-slate-400'}`}>
                  {tab === 'banqueteria' ? 'Banquetería Gala' : 'Menús Almuerzo'}
                  {activeTab === tab && <motion.div layoutId="tab-bg-t2" className="absolute inset-0 bg-black rounded-full -z-10 shadow-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                </button>
              ))}
            </div>
          </motion.div>
          <AnimatePresence mode="wait">
            {activeTab === 'banqueteria' ? (
              <motion.div key="gala" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: motionDuration }} className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
                <div className="bg-slate-50 p-16 text-center border-b border-slate-100 relative">
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-5"><ChefHat size={120} /></div>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex justify-center mb-6 relative z-10">
                    <div className="relative w-16 h-10">
                      <div className="absolute left-0 w-6 h-6 bg-black transform rotate-45 rounded-sm shadow-md" />
                      <div className="absolute right-0 w-6 h-6 bg-black transform rotate-45 rounded-sm shadow-md" />
                    </div>
                  </motion.div>
                  <h3 className="text-4xl font-light tracking-[0.4em] uppercase mb-4 relative z-10">Menú Gala</h3>
                  <p className="text-slate-400 font-serif italic text-lg">La distinción de un servicio integral</p>
                </div>
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="p-16 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                  {Object.entries(galaMenu).map(([key, items]) => (
                    <motion.div key={key} variants={itemVariants}>
                      <h4 className="font-bold text-[10px] tracking-[0.3em] uppercase mb-8 border-b border-slate-100 pb-3 flex justify-between items-center capitalize">{key} <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /></h4>
                      <ul className="space-y-4">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 group cursor-default">
                            <ChevronRight size={14} className="mt-1 text-slate-300 group-hover:text-red-500 transition-colors" />
                            <span className="text-slate-600 font-light group-hover:text-black transition-colors">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="bg-slate-900 p-12 text-white flex flex-col gap-8">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
                    <div>
                      <p className="text-xs opacity-50 uppercase tracking-[0.2em] mb-2">Valor por persona</p>
                      <div className="flex items-baseline gap-2 justify-center lg:justify-start"><span className="text-4xl font-black">$23.000</span><span className="text-lg font-light opacity-30">CLP</span></div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-red-400 uppercase mb-1">Servicio incluye</p>
                      <p className="text-[10px] opacity-80">Mesas y sillas (10 personas); Loza; Garzones; Mantelería; Cristalería; Cubiertos.</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-red-400 uppercase mb-1">Condiciones</p>
                      <p className="text-[10px] opacity-80">Reserva con 50% del total. Abonos no devueltos, solo reagendar. Mínimo 80 personas.</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-red-400 uppercase mb-1">Servicios adicionales</p>
                      <p className="text-[10px] opacity-80">Robot led / Dj y amplificación / Cámara 360. Valor con adicionales: $30.000 por persona.</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <motion.button whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }} type="button" className="bg-white text-black px-12 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-xl">Reservar Fecha</motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="lunch" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: motionDuration }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {lunchMenus.map((menu, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -10 }} className={`bg-white rounded-[2rem] shadow-xl border-b-[12px] ${menu.color} overflow-hidden group transition-all duration-300`}>
                    <div className={`${menu.bg} p-8 text-white text-center relative overflow-hidden`}>
                      <motion.div initial={{ opacity: 0.1 }} whileHover={{ scale: 1.5, opacity: 0.2 }} className="absolute -right-4 -bottom-4"><Utensils size={80} /></motion.div>
                      <h3 className="font-black text-xl tracking-tight leading-tight relative z-10 uppercase italic">{menu.title}</h3>
                    </div>
                    <div className="p-8 space-y-8">
                      {menu.items.map((item, i) => (
                        <div key={i}>
                          <p className="text-sm text-slate-600 font-medium leading-relaxed group-hover:text-black transition-colors">{item}</p>
                          {i < menu.items.length - 1 && <hr className="mt-6 border-slate-50" />}
                        </div>
                      ))}
                      <div className="pt-6 mt-6 border-t border-slate-50 flex justify-between items-end">
                        <div>
                          <p className="text-[9px] uppercase font-black text-slate-400 tracking-tighter mb-1">Valor Unitario</p>
                          <p className={`text-2xl font-black ${menu.textColor}`}>{menu.price}</p>
                          {menu.priceNote && <p className="text-xs text-slate-500 mt-1">{menu.priceNote}</p>}
                        </div>
                        <motion.button whileHover={{ rotate: 90 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => setSelectedLunchMenu(menu)} aria-label="Ver detalles del menú" className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${menu.bg}`}><ChevronRight size={24} /></motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <motion.section id="contacto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={getFadeInSection(motionDuration)} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-6xl mx-auto bg-slate-50 rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-slate-900 text-slate-300 p-8 md:p-12 lg:p-16 space-y-8 md:space-y-12">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight uppercase text-white">Hablemos de tu evento</h3>
                <p className="text-slate-400 font-light text-sm tracking-wide">Nuestro equipo de asesores está listo para dar vida a tus ideas.</p>
              </div>
              <div className="space-y-6">
                {[
                  { Icon: Phone, label: 'Llamadas / WhatsApp', val: '+56 9 488 355 22' },
                  { Icon: Mail, label: 'Correo Electrónico', val: 'arelisaez@gmail.com' },
                  { Icon: MapPin, label: 'Área de Cobertura', val: 'Romeral, Región del Maule y alrededores' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="p-2.5 bg-slate-800 rounded-2xl shrink-0"><item.Icon className="w-5 h-5 text-red-500" /></div>
                    <div>
                      <div className="text-[10px] uppercase text-slate-500 tracking-[0.3em] mb-1 font-black">{item.label}</div>
                      <div className="text-sm font-light text-slate-300">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-slate-800">
                <h4 className="text-white font-black mb-4 uppercase text-[10px] tracking-[0.3em]">Horarios</h4>
                <p className="text-xs text-slate-400">Lun - Vie: <span className="text-white font-medium">09:00 - 19:00</span></p>
                <p className="text-xs text-slate-400 mt-1">Sáb: <span className="text-white font-medium">Eventos VIP</span></p>
              </div>
            </div>
            <div className="md:w-3/5 p-8 md:p-12 lg:p-16">
              <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <input type="text" id="t2-name" className="peer w-full py-3.5 px-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all placeholder-transparent" placeholder="Nombre" />
                    <label htmlFor="t2-name" className="absolute left-4 -top-2.5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 bg-white px-2 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-normal peer-focus:-top-2.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:text-red-600">Nombre Completo</label>
                  </div>
                  <div className="relative">
                    <input type="email" id="t2-email" className="peer w-full py-3.5 px-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all placeholder-transparent" placeholder="Email" />
                    <label htmlFor="t2-email" className="absolute left-4 -top-2.5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 bg-white px-2 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-normal peer-focus:-top-2.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:text-red-600">Correo Electrónico</label>
                  </div>
                </div>
                <div>
                  <label htmlFor="t2-service" className="block text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-2">Tipo de Servicio</label>
                  <select id="t2-service" className="w-full py-3.5 px-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-sm font-medium cursor-pointer appearance-none">
                    <option value="">Seleccione una opción</option>
                    <option>Banquetería Gala</option>
                    <option>Almuerzo Corporativo</option>
                    <option>Matrimonio</option>
                    <option>Otro Evento Social</option>
                  </select>
                </div>
                <div className="relative">
                  <textarea id="t2-msg" rows={3} className="peer w-full py-3.5 px-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all placeholder-transparent resize-none" placeholder="Mensaje" />
                  <label htmlFor="t2-msg" className="absolute left-4 -top-2.5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 bg-white px-2 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-normal peer-focus:-top-2.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:text-red-600">¿Cómo podemos ayudarte?</label>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full sm:w-auto min-h-[44px] px-10 py-4 bg-red-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.3em] hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">Enviar Solicitud</motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <footer className="bg-slate-900 text-slate-400 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-white to-red-600" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-16 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 text-white mb-8">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-black">D</div>
                <span className="text-2xl font-black tracking-tighter uppercase italic">D'Areli</span>
              </div>
              <p className="max-w-md text-sm font-light leading-relaxed mb-8 text-slate-500">La gastronomía es el lenguaje del cuidado. En cada plato ponemos nuestra reputación y pasión para asegurar que su evento sea, sencillamente, perfecto.</p>
              <div className="flex gap-4">
                <motion.a href="#" target="_blank" rel="noopener noreferrer" whileHover={{ y: -5, backgroundColor: '#fff', color: '#000' }} className="w-12 h-12 rounded-2xl border border-slate-800 flex items-center justify-center transition-all text-slate-400" aria-label="Instagram"><Instagram size={20} /></motion.a>
                <motion.a href="#" target="_blank" rel="noopener noreferrer" whileHover={{ y: -5, backgroundColor: '#fff', color: '#000' }} className="w-12 h-12 rounded-2xl border border-slate-800 flex items-center justify-center transition-all text-slate-400" aria-label="Facebook"><Facebook size={20} /></motion.a>
                <motion.a href="https://wa.me/56948835522" target="_blank" rel="noopener noreferrer" whileHover={{ y: -5, backgroundColor: '#fff', color: '#000' }} className="w-12 h-12 rounded-2xl border border-slate-800 flex items-center justify-center transition-all text-slate-400" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </motion.a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 uppercase text-[10px] tracking-[0.3em]">Directorio</h4>
              <ul className="space-y-4 text-sm font-light">
                <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Phone size={14} className="text-red-600" /> +56 9 488 355 22</li>
                <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Mail size={14} className="text-red-600" /> arelisaez@gmail.com</li>
                <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><MapPin size={14} className="text-red-600" /> Romeral, Región del Maule, Chile</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold">
            <p>&copy; 2026 D&apos;Areli Banquetería - Calidad Superior</p>
            <p className="opacity-30">Una empresa de Grupo D&apos;Areli. Web diseñada y desarrollada por <a href="https://charlideas.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300 transition-colors">Charl!deas</a>.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedLunchMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.25 }}
            className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/95 backdrop-blur-sm"
            onClick={closeLunchModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300, duration: reducedMotion ? 0.2 : undefined }}
              className={`relative w-full max-w-[calc(100vw-2rem)] sm:max-w-lg my-4 sm:my-8 bg-white rounded-[2rem] shadow-2xl overflow-hidden border-b-[12px] ${selectedLunchMenu.color} shrink-0`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`h-2 ${selectedLunchMenu.bg}`} aria-hidden />
              <button type="button" onClick={closeLunchModal} className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-2xl hover:bg-slate-100 transition-colors z-10" aria-label="Cerrar"><X className="w-6 h-6 text-slate-600" /></button>
              <div className="p-6 sm:p-10 overflow-y-auto max-h-[calc(100vh-8rem)]">
                <h3 className="text-2xl font-black tracking-tight uppercase mb-6 pr-12 leading-tight">{selectedLunchMenu.title}</h3>
                <div className="space-y-6 mb-8">
                  {selectedLunchMenu.detailSections.map((section, i) => (
                    <div key={i}>
                      <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400 mb-2 border-b border-slate-100 pb-2">{section.category}</h4>
                      <p className="text-slate-600 font-light text-sm leading-relaxed">{section.items}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <p className="text-[9px] uppercase font-black text-slate-400 tracking-tighter mb-1">Valor por persona</p>
                  <p className={`text-2xl font-black ${selectedLunchMenu.textColor}`}>{selectedLunchMenu.price}</p>
                  {selectedLunchMenu.priceNote && <p className="text-xs text-slate-500 mt-1">{selectedLunchMenu.priceNote}</p>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: reducedMotion ? 400 : 200 }} className="fixed inset-0 z-[60] bg-slate-900 flex flex-col items-center justify-center text-white">
            <button type="button" className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}><X size={40} /></button>
            <nav className="flex flex-col gap-10 text-4xl font-black uppercase italic text-center">
              {['inicio', 'servicios', 'quienes somos', 'contacto'].map((item, i) => (
                <motion.a key={item} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} href={`#${item.replace(' ', '-')}`} onClick={() => setIsMenuOpen(false)}>{item}</motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Template2;
