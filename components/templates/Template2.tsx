"use client";

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChefHat, Utensils, Phone, Mail, MapPin, ChevronRight, Menu, X, Award, Clock, Instagram, Facebook } from 'lucide-react';
import type { ServiceLine } from '@/app/page';
import { almuerzosDiarios, comidasTemporales, textoComidasTemporales } from '@/data/cocineria';
import {
  BANQUETERIA_GALA_MENUS,
  COCTELERIA_CATEGORIES,
  COCTELERIA_CONTACT,
  COCTELERIA_FOOTER,
} from '@/data/banqueteria';

const BANQUETERIA_TAB_IDS = [...BANQUETERIA_GALA_MENUS.map((m) => m.id), 'cocteleria'] as const;
const BANQUETERIA_TAB_LABELS: Record<string, string> = {
  'evento-exclusivo': 'Evento Exclusivo',
  boda: 'Boda',
  campestre: 'Campestre',
  corporativo: 'Corporativo',
  cocteleria: 'Coctelería',
};

function galaSectionsToRecord(sections: { category: string; items: string }[]): Record<string, string[]> {
  return Object.fromEntries(sections.map((s) => [s.category, s.items.split(/\s*;\s*/).map((i) => i.trim())]));
}

const COCINERIA_COLORS_T2 = ['border-red-500', 'bg-red-500', 'text-red-600', 'border-blue-500', 'bg-blue-500', 'text-blue-600', 'border-amber-500', 'bg-amber-500', 'text-amber-600', 'border-teal-500', 'bg-teal-500', 'text-teal-600'] as const;
function buildCocineriaCardsT2(): LunchMenuItem[] {
  const cards: LunchMenuItem[] = [];
  almuerzosDiarios.forEach((a, i) => {
    const idx = i % 4;
    cards.push({
      title: a.nombre.toUpperCase(),
      color: COCINERIA_COLORS_T2[idx * 3] as string,
      bg: COCINERIA_COLORS_T2[idx * 3 + 1] as string,
      textColor: COCINERIA_COLORS_T2[idx * 3 + 2] as string,
      items: [a.descripcion],
      price: a.precio,
      detailSections: [{ category: 'INCLUYE', items: a.descripcion }],
    });
  });
  comidasTemporales.forEach((e, i) => {
    const idx = (almuerzosDiarios.length + i) % 4;
    cards.push({
      title: e.variedad.toUpperCase(),
      color: COCINERIA_COLORS_T2[idx * 3] as string,
      bg: COCINERIA_COLORS_T2[idx * 3 + 1] as string,
      textColor: COCINERIA_COLORS_T2[idx * 3 + 2] as string,
      items: [e.descripcion],
      price: e.precio,
      detailSections: [{ category: 'DISPONIBILIDAD', items: textoComidasTemporales }, { category: 'DESCRIPCIÓN', items: e.descripcion }],
    });
  });
  return cards;
}
const COCINERIA_CARDS_T2 = buildCocineriaCardsT2();

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

const QUIENES_SOMOS_IMAGE = '/areli.png';

type Template2Props = { serviceLine: ServiceLine; onChangeServiceLine: (linea: ServiceLine) => void };

const Template2 = ({ serviceLine, onChangeServiceLine }: Template2Props) => {
  const [activeBanqueteriaTab, setActiveBanqueteriaTab] = useState(BANQUETERIA_TAB_IDS[0]);
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

  const currentGalaMenu = BANQUETERIA_GALA_MENUS.find((m) => m.id === activeBanqueteriaTab);
  const galaMenuRecord = currentGalaMenu ? galaSectionsToRecord(currentGalaMenu.sections) : null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <nav className="fixed w-full z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
              <Image src="/SVG/Recurso 3.svg" alt="" width={40} height={40} className="w-10 h-10 object-contain shrink-0" aria-hidden />
              <Image src="/SVG/Recurso 4.svg" alt="D'Areli Gastronómico" width={160} height={40} className="h-8 w-auto object-contain object-left" />
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
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.5, duration: motionDuration }} className="text-5xl md:text-[4rem] font-bold text-white mb-6 tracking-tight">
            D&apos;Areli <br /><span className="italic font-serif text-slate-300 font-light underline decoration-red-500/30 underline-offset-8">Gastronómico</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reducedMotion ? 0 : 1, duration: motionDuration }} className="text-xl text-slate-300 mb-10 font-light max-w-2xl mx-auto">
            Profesionalismo y calidad en cada plato. Ingredientes seleccionados y la experiencia de nuestro chef al servicio de tu evento o de tu mesa del día a día.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 1.3, duration: motionDuration }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button type="button" onClick={() => { onChangeServiceLine('banqueteria'); document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }); }} className={`px-8 py-4 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 ${serviceLine === 'banqueteria' ? 'bg-white text-black shadow-xl' : 'border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm'}`}>Banquetería <ChevronRight size={18}/></button>
            <button type="button" onClick={() => { onChangeServiceLine('cocinería'); document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }); }} className={`px-8 py-4 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 ${serviceLine === 'cocinería' ? 'bg-white text-black shadow-xl' : 'border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm'}`}>Cocinería <ChevronRight size={18}/></button>
          </motion.div>
        </div>
      </section>

      <motion.section id="quienes-somos" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={getFadeInSection(motionDuration)} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs">{serviceLine === 'cocinería' ? 'Nuestra Cocinería' : 'Nuestra Esencia'}</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">{serviceLine === 'cocinería' ? 'Calidad en cada almuerzo' : 'Pasión por la alta cocina'}</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                {serviceLine === 'cocinería' ? "D'Areli Gastronómico lleva la misma calidad de nuestra cocina a tu mesa del día a día. Almuerzos individuales tipo menú ejecutivo con opción de bebestible y envío. Ingredientes locales y recetas tradicionales chilenas, preparadas con el mismo cuidado que nos distingue." : "En D'Areli, transformamos reuniones en experiencias memorables. Nuestra cocina fusiona la técnica profesional con el cariño de lo hecho en casa, asegurando que cada plato cuente una historia de calidad."}
              </p>
              <div className="grid grid-cols-2 gap-8 py-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg"><Award size={24}/></div>
                  <h4 className="font-bold">Excelencia</h4>
                  <p className="text-sm text-slate-500">{serviceLine === 'cocinería' ? 'Calidad en cada plato que preparamos.' : 'Certificación en cada proceso gastronómico.'}</p>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><Clock size={24}/></div>
                  <h4 className="font-bold">{serviceLine === 'cocinería' ? 'Práctico' : 'Eficiencia'}</h4>
                  <p className="text-sm text-slate-500">{serviceLine === 'cocinería' ? 'Menú del día, envíos y opciones a tu medida.' : 'Logística perfecta para eventos de gran escala.'}</p>
                </motion.div>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: reducedMotion ? 0.2 : 1 }} className="relative">
              <div className="aspect-[4/5] rounded-[2rem] bg-slate-200 overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <Image src={QUIENES_SOMOS_IMAGE} alt="Areli Sire, maestro de cocina" width={800} height={1000} className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
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
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{serviceLine === 'cocinería' ? 'Cocinería' : 'Banquetería'}</h2>
            <p className="text-slate-600 font-serif italic text-lg md:text-xl">
              {serviceLine === 'cocinería' ? 'Todos los días algo rico' : 'La experiencia se nota, el sabor se disfruta'}
            </p>
            <div className="w-24 h-1 bg-slate-900 mx-auto" />
            <h3 className="text-2xl md:text-3xl font-bold text-slate-700">Propuestas {serviceLine === 'cocinería' ? 'del Día' : 'Personalizadas'}</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {serviceLine === 'cocinería' ? 'Almuerzos del día y opciones temporales para disfrutar en casa o en la oficina.' : 'Explora nuestra selección diseñada para impresionar a cada uno de tus invitados con el más alto estándar de calidad.'}
            </p>
          </motion.div>
            {serviceLine === 'cocinería' ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {COCINERIA_CARDS_T2.map((menu, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} whileHover={{ y: -10 }} className={`bg-white rounded-[2rem] shadow-xl border-b-[12px] ${menu.color} overflow-hidden group transition-all duration-300`}>
                  <div className={`${menu.bg} p-5 sm:p-8 text-white text-center relative overflow-hidden`}>
                    <motion.div initial={{ opacity: 0.1 }} whileHover={{ scale: 1.5, opacity: 0.2 }} className="absolute -right-4 -bottom-4"><Utensils size={80} /></motion.div>
                    <h3 className="font-black text-base sm:text-lg md:text-xl tracking-tight leading-snug relative z-10 uppercase italic break-words">{menu.title}</h3>
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
                        <p className="text-[9px] uppercase font-black text-slate-400 tracking-tighter mb-1">Precio</p>
                        <p className={`text-2xl font-black ${menu.textColor}`}>{menu.price}</p>
                        {menu.priceNote && <p className="text-xs text-slate-500 mt-1">{menu.priceNote}</p>}
                      </div>
                      <motion.button whileHover={{ rotate: 90 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => setSelectedLunchMenu(menu)} aria-label="Ver detalles" className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${menu.bg}`}><ChevronRight size={24} /></motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
          <>
          <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:justify-center md:p-1.5 md:bg-white md:rounded-full md:shadow-inner md:max-w-full md:mx-auto md:border md:border-slate-200 mb-12">
            {BANQUETERIA_TAB_IDS.map((tabId) => (
              <button key={tabId} type="button" onClick={() => setActiveBanqueteriaTab(tabId)} className={`relative w-full md:flex-1 md:min-w-0 py-3.5 px-4 md:py-3 md:px-3 rounded-2xl md:rounded-full text-xs font-black uppercase tracking-wide md:tracking-widest transition-all z-10 text-left md:text-center ${activeBanqueteriaTab === tabId ? 'text-white bg-black shadow-lg md:bg-transparent' : 'text-slate-600 bg-white border border-slate-200 hover:border-slate-300 md:border-0 md:bg-transparent md:text-slate-400 md:hover:text-slate-600'}`}>
                <span className="block break-words">{BANQUETERIA_TAB_LABELS[tabId] ?? tabId}</span>
                {activeBanqueteriaTab === tabId && <motion.div layoutId="tab-bg-t2" className="absolute inset-0 bg-black rounded-2xl md:rounded-full -z-10 shadow-lg hidden md:block" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {activeBanqueteriaTab === 'cocteleria' ? (
              <motion.div key="cocteleria" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: motionDuration }} className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-6 sm:p-8 md:p-16">
                <div className="text-center mb-8 md:mb-12">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight uppercase mb-2 break-words">Menú de Coctelería y Precios</h3>
                  <p className="text-slate-500 text-sm">{COCTELERIA_CONTACT}</p>
                </div>
                <div className="space-y-10">
                  {COCTELERIA_CATEGORIES.map((cat, ci) => (
                    <div key={ci}>
                      <h4 className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase border-b border-slate-100 pb-3 mb-4">{cat.name}</h4>
                      <ul className="space-y-3">
                        {cat.items.map((item, ii) => (
                          <li key={ii} className="flex flex-wrap justify-between items-baseline gap-2 text-sm">
                            <span className="text-slate-600 font-light">{item.name}</span>
                            <span className="font-black text-red-600 shrink-0">{item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-12 pt-8 border-t border-slate-100 text-slate-500 text-sm text-center">{COCTELERIA_FOOTER}</p>
              </motion.div>
            ) : currentGalaMenu && galaMenuRecord ? (
              <motion.div key={currentGalaMenu.id} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: motionDuration }} className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
                <div className="bg-slate-50 p-6 sm:p-12 md:p-16 text-center border-b border-slate-100 relative">
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-5"><ChefHat size={120} /></div>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex justify-center mb-6 relative z-10">
                    <div className="relative w-16 h-10">
                      <div className="absolute left-0 w-6 h-6 bg-black transform rotate-45 rounded-sm shadow-md" />
                      <div className="absolute right-0 w-6 h-6 bg-black transform rotate-45 rounded-sm shadow-md" />
                    </div>
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl md:text-4xl font-light tracking-[0.15em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase mb-4 relative z-10 break-words px-2">{currentGalaMenu.title}</h3>
                  {currentGalaMenu.subtitle && <p className="text-slate-400 font-serif italic text-sm sm:text-base md:text-lg">{currentGalaMenu.subtitle}</p>}
                </div>
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="p-5 sm:p-10 md:p-16 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
                  {Object.entries(galaMenuRecord).map(([key, items]) => (
                    <motion.div key={key} variants={itemVariants}>
                      <h4 className="font-bold text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-6 md:mb-8 border-b border-slate-100 pb-3 flex justify-between items-center gap-2 break-words"><span className="min-w-0">{key}</span> <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0" /></h4>
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
                      <div className="flex items-baseline gap-2 justify-center lg:justify-start"><span className="text-4xl font-black">{currentGalaMenu.price}</span></div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-red-400 uppercase mb-1">Servicio incluye</p>
                      <p className="text-[10px] opacity-80">{currentGalaMenu.serviceIncludes}</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <motion.button whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }} type="button" className="bg-white text-black px-12 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-xl">Reservar Fecha</motion.button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
          </>
          )}
        </div>
      </section>

      <motion.section id="contacto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={getFadeInSection(motionDuration)} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-6xl mx-auto bg-slate-50 rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-slate-900 text-slate-300 p-8 md:p-12 lg:p-16 space-y-8 md:space-y-12">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight uppercase text-white">{serviceLine === 'cocinería' ? 'Hablemos de tu pedido' : 'Hablemos de tu evento'}</h3>
                <p className="text-slate-400 font-light text-sm tracking-wide">{serviceLine === 'cocinería' ? 'Consultas de menú, pedidos y envíos. Estamos para ayudarte.' : 'Nuestro equipo de asesores está listo para dar vida a tus ideas.'}</p>
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
                    {serviceLine === 'cocinería' ? (
                      <>
                        <option value="menu-ejecutivo">Menú ejecutivo (almuerzo)</option>
                        <option value="menu-bebestible-envio">Menú con bebestible y envío</option>
                        <option value="empanadas">Empanadas / Comidas temporales</option>
                        <option value="otro">Otro</option>
                      </>
                    ) : (
                      <>
                        <option>Banquetería Gala</option>
                        <option>Almuerzo Corporativo</option>
                        <option>Matrimonio</option>
                        <option>Otro Evento Social</option>
                      </>
                    )}
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
                <Image src="/SVG/Recurso 3.svg" alt="D'Areli Gastronómico" width={40} height={40} className="w-10 h-10 object-contain shrink-0 invert" />
                <span className="text-2xl font-black tracking-tighter uppercase italic">D'Areli</span>
              </div>
              <p className="max-w-md text-sm font-light leading-relaxed mb-8 text-slate-500">{serviceLine === 'cocinería' ? "En cada almuerzo y pedido ponemos la misma calidad y cuidado. D'Areli Gastronómico — sabor y nutrición para tu día a día." : "La gastronomía es el lenguaje del cuidado. En cada plato ponemos nuestra reputación y pasión para asegurar que su evento sea, sencillamente, perfecto."}</p>
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
            <p>&copy; 2026 D&apos;Areli Gastronómico - Calidad Superior</p>
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
