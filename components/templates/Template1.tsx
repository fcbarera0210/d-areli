"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Utensils,
  MapPin,
  Mail,
  Phone,
  Menu as MenuIcon,
  X,
  Award,
  ArrowRight,
} from 'lucide-react';

const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800';
const HERO_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800';
const QUIENES_SOMOS_IMAGE = 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800';

type GroupMenuItem = {
  id: string;
  title: string;
  color: string;
  accent: string;
  content: string;
  price: string;
};

const Template1 = () => {
  const [activeTab, setActiveTab] = useState('banqueteria');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<GroupMenuItem | null>(null);
  const [heroImgSrc, setHeroImgSrc] = useState(HERO_IMAGE_URL);
  const reducedMotion = useReducedMotion();
  const motionDuration = reducedMotion ? 0.2 : 0.8;

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: motionDuration, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const galaMenu = {
    title: "MENÚ GALA",
    subtitle: "Elegancia y Exclusividad",
    sections: [
      { category: "APERITIVOS", items: "Pisco sour, Mango sour, Bebidas, Jugo natural, Vino espumante, Cerveza" },
      { category: "BOCADOS", items: "4 canapés variados, 2 ceviches de reineta, 1 pastel de jaiba, 3 empanaditas de queso, 1 brocheta de cerdo, 2 pastelitos dulces" },
      { category: "ENTRADA", items: "Mousse de pollo en palta natural y dressing de yogurth, O fantasía marina (pastel de jaiba en fondos de alcachofa y lechuga marina)" },
      { category: "PLATO PRINCIPAL", items: "Mechada de vacuno cocinada en su jugo con pastelera de choclo y papas crocantes, O plateada de vacuno con salsa mignon y papas rústicas al perejil" },
      { category: "BUFFET DE POSTRES", items: "Suspiro limeño, Mousse de chocolate, Cheesecake de frutilla, Pie de limón, Waffles y helado, Leche asada" }
    ],
    price: "$23.000",
    conditions: "Mínimo 80 personas. Reserva con 50%."
  };

  const groupMenus: GroupMenuItem[] = [
    { id: 'empresas', title: "MENÚ EMPRESAS", color: "bg-red-500", accent: "border-red-500", content: "Ideal para eventos corporativos y almuerzos ejecutivos con buffet de asados.", price: "$23.800 + IVA" },
    { id: 'campestre', title: "MENÚ CAMPESTRE", color: "bg-blue-500", accent: "border-blue-500", content: "Tradición y sabor chileno: costillar, prietas, longaniza y buffet criollo.", price: "$23.000 + IVA" },
    { id: 'matrimonio', title: "MENÚ MATRIMONIO", color: "bg-amber-500", accent: "border-amber-500", content: "Sofisticación para tu gran día: plateada de vacuno o cerdo al horno.", price: "$27.000 + IVA" },
    { id: 'matrimonio-vip', title: "MENÚ MATRIMONIO VIP", color: "bg-teal-600", accent: "border-teal-600", content: "Experiencia premium: lomo vetado a las brasas y cordero asado.", price: "$30.000 + IVA" }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 scroll-smooth overflow-x-hidden">
      <nav className="fixed w-full z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-black flex items-center justify-center rounded-sm"><Utensils className="text-white w-6 h-6" /></div>
              <span className="text-xl font-bold tracking-tighter uppercase">D'ARELI <span className="font-light text-neutral-500">BANQUETERÍA</span></span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest">
              <a href="#inicio" className="hover:text-neutral-500 transition-colors">Inicio</a>
              <a href="#servicios" className="hover:text-neutral-500 transition-colors">Servicios</a>
              <a href="#quienes-somos" className="hover:text-neutral-500 transition-colors">Nosotros</a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#contacto" className="bg-black text-white px-6 py-2.5 hover:bg-neutral-800 transition-colors">Cotizar</motion.a>
            </motion.div>
            <button type="button" className="md:hidden p-3 min-h-[44px] min-w-[44px] flex items-center justify-center -mr-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}>{mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}</button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, maxHeight: 0 }} animate={{ opacity: 1, maxHeight: 320 }} exit={{ opacity: 0, maxHeight: 0 }} transition={{ duration: reducedMotion ? 0.15 : 0.3, ease: "easeInOut" }} className="md:hidden bg-white border-b border-neutral-200 overflow-hidden">
              <nav className="flex flex-col p-4" aria-label="Menú principal">
                <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="min-h-[44px] flex items-center py-3 text-sm font-bold uppercase tracking-widest">Inicio</a>
                <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="min-h-[44px] flex items-center py-3 text-sm font-bold uppercase tracking-widest">Servicios</a>
                <a href="#quienes-somos" onClick={() => setMobileMenuOpen(false)} className="min-h-[44px] flex items-center py-3 text-sm font-bold uppercase tracking-widest">Nosotros</a>
                <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="min-h-[44px] flex items-center py-3 text-sm font-bold uppercase tracking-widest text-neutral-500 italic">Cotizar Ahora</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section id="inicio" className="relative h-screen flex items-center overflow-hidden">
        {/* Fondo: en móvil imagen + overlay; en lg blobs */}
        <div className="absolute inset-0 z-0 bg-neutral-100">
          {/* Blobs solo en desktop (mejor performance en móvil) */}
          <div className="absolute top-20 right-[-10%] w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] bg-neutral-200 rounded-full blur-[60px] lg:blur-[120px] hidden lg:block template1-animate-blob" aria-hidden />
          <div className="absolute bottom-20 left-[-5%] w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-neutral-300 rounded-full blur-[50px] lg:blur-[100px] hidden lg:block template1-animate-blob-slow" aria-hidden />
          {/* Móvil/tablet: imagen de fondo + overlay para legibilidad */}
          <div className="absolute inset-0 lg:hidden">
            <Image src={heroImgSrc} alt="" fill className="object-cover grayscale-[0.15]" sizes="100vw" priority onError={() => setHeroImgSrc(HERO_IMAGE_FALLBACK)} />
            <div className="absolute inset-0 bg-black/55" aria-hidden />
          </div>
        </div>
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: reducedMotion ? 0 : -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reducedMotion ? 0.2 : 1, ease: "easeOut" }} className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-white/90 lg:bg-white border border-white/30 lg:border-neutral-200 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-700 lg:text-neutral-600 shadow-sm">Sabor que trasciende</div>
            <h1 className="text-5xl lg:text-8xl font-extrabold tracking-tighter leading-[0.95] break-words text-white lg:text-neutral-900">
              D&apos;ARELI <br /><span className="text-neutral-200 lg:text-neutral-400 font-light italic">BANQUETERÍA</span>
            </h1>
            <p className="text-lg lg:text-xl text-neutral-200 lg:text-neutral-600 max-w-md leading-relaxed font-light">Donde la alta cocina se encuentra con la distinción. Creamos banquetes memorables con un sello de sofisticación único.</p>
            <div className="flex flex-wrap gap-4 pt-6">
              <motion.a whileHover={{ x: reducedMotion ? 0 : 5 }} href="#servicios" className="min-h-[44px] min-w-[44px] inline-flex items-center px-8 py-4 bg-white text-black rounded-none hover:bg-neutral-100 transition-all gap-3 group text-xs uppercase tracking-widest font-bold lg:bg-black lg:text-white lg:hover:bg-neutral-800">Explorar Menús <ArrowRight className="w-4 h-4 shrink-0" /></motion.a>
              <a href="#contacto" className="min-h-[44px] min-w-[44px] inline-flex items-center px-8 py-4 border border-white/50 lg:border-neutral-300 bg-white/20 lg:bg-white/50 backdrop-blur rounded-none hover:bg-white/30 lg:hover:bg-neutral-100 transition-all text-xs uppercase tracking-widest font-bold text-white lg:text-neutral-900">Cotizar Evento</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.95, y: reducedMotion ? 0 : 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: reducedMotion ? 0.2 : 1.2, ease: "easeOut", delay: reducedMotion ? 0 : 0.2 }} className="hidden lg:block relative group will-change-transform">
            <div className="absolute -inset-4 border border-neutral-200 z-0 hidden lg:block template1-animate-border" aria-hidden />
            <div className="aspect-[4/5] relative bg-neutral-200 shadow-2xl overflow-hidden z-10">
              <Image src={heroImgSrc} alt="Alta Gastronomía Gourmet" fill className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" sizes="(max-width: 1023px) 90vw, 800px" onError={() => setHeroImgSrc(HERO_IMAGE_FALLBACK)} />
              <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                <motion.div initial={{ width: 0 }} whileInView={{ width: 48 }} transition={{ delay: 0.5, duration: motionDuration }} className="h-1 bg-white mb-6" />
                <span className="text-4xl font-serif italic tracking-wide block mb-2">Arte Culinario</span>
                <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-300 font-bold">D&apos;Areli Premium Experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="servicios" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">Propuestas Gastronómicas</h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
            <p className="text-neutral-500 max-w-2xl mx-auto font-light text-lg">Explora nuestra selección diseñada para impresionar a cada uno de tus invitados con el más alto estándar de calidad.</p>
          </motion.div>
          <div className="flex flex-col sm:flex-row sm:justify-center sm:border-b sm:border-neutral-100 gap-2 sm:gap-0 mb-16">
            {['banqueteria', 'almuerzos'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative w-full sm:w-auto min-h-[48px] sm:min-h-[44px] flex items-center justify-center px-6 py-4 sm:px-10 sm:py-5 text-xs font-bold uppercase tracking-[0.3em] transition-all border border-transparent rounded-lg sm:rounded-none sm:border-b-2 sm:border-transparent ${activeTab === tab ? 'text-black bg-neutral-100 sm:bg-transparent border-neutral-200 sm:border-transparent' : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'} ${activeTab === tab ? 'sm:border-b-black border-b-2 border-b-black' : 'sm:border-b-transparent'}`}
              >
                <span className="pointer-events-none">{tab === 'banqueteria' ? 'Banquetería Gala' : 'Almuerzos & Matrimonios'}</span>
                {activeTab === tab && <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-1 bg-black hidden sm:block" />}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {activeTab === 'banqueteria' ? (
              <motion.div key="gala-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: reducedMotion ? 0.2 : 0.5 }} className="max-w-5xl mx-auto bg-neutral-50 border border-neutral-100 p-8 md:p-20 shadow-2xl relative">
                <div className="absolute top-0 right-0 w-80 h-80 bg-neutral-200/30 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                <div className="text-center space-y-3 mb-16">
                  <div className="flex justify-center mb-8"><div className="w-14 h-14 flex items-center justify-center border-2 border-black rounded-full template1-animate-utensils"><Utensils className="w-6 h-6" /></div></div>
                  <h3 className="text-4xl font-black tracking-[0.4em] uppercase">{galaMenu.title}</h3>
                  <div className="text-neutral-500 font-light italic uppercase tracking-[0.3em] text-sm">{galaMenu.subtitle}</div>
                </div>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                  {galaMenu.sections.map((section, idx) => (
                    <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="space-y-3 group">
                      <h4 className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase border-b border-neutral-200 pb-3 group-hover:text-black transition-colors group-hover:border-black">{section.category}</h4>
                      <p className="text-sm leading-relaxed text-neutral-700 font-light">{section.items}</p>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="mt-20 pt-10 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="text-center md:text-left">
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2 font-bold">Inversión por Persona</span>
                    <span className="text-3xl font-black">{galaMenu.price}</span>
                    <p className="text-[10px] text-neutral-400 mt-1 uppercase font-medium">{galaMenu.conditions}</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" className="min-h-[44px] px-12 py-5 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-black hover:bg-neutral-800 transition-all shadow-xl">Solicitar Dossier Completo</motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="almuerzos-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: reducedMotion ? 0.2 : 0.5 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {groupMenus.map((menu, idx) => (
                  <motion.div key={menu.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : idx * 0.08, duration: reducedMotion ? 0.2 : 0.5 }} whileHover={{ y: -12 }} className="relative flex flex-col h-full bg-white border border-neutral-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] group overflow-hidden">
                    <div className={`h-2.5 w-full ${menu.color}`}></div>
                    <div className="p-10 flex flex-col flex-grow items-center text-center">
                      <div className={`w-14 h-14 mb-8 rounded-full flex items-center justify-center opacity-10 ${menu.color} text-black group-hover:scale-110 transition-transform`}><Utensils className="w-6 h-6" /></div>
                      <h3 className="text-xl font-black tracking-tight mb-5 min-h-[60px] flex items-center uppercase leading-tight">{menu.title}</h3>
                      <p className="text-neutral-500 text-sm leading-relaxed mb-10 font-light flex-grow">{menu.content}</p>
                      <div className="w-full pt-8 border-t border-neutral-50">
                        <span className="text-2xl font-black block mb-6">{menu.price}</span>
                        <button type="button" onClick={() => setSelectedMenu(menu)} className={`w-full min-h-[44px] py-4 text-[10px] uppercase tracking-[0.3em] font-black border transition-all ${menu.accent} hover:bg-neutral-50`}>Ver Detalles</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section id="quienes-somos" className="py-28 bg-neutral-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp} className="space-y-10">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">Excelencia en <br /><span className="text-neutral-500 font-light italic">Cada Detalle</span></h2>
            <div className="w-20 h-1 bg-white"></div>
            <div className="space-y-8 text-neutral-400 font-light leading-relaxed text-lg">
              <p>D'Areli nace de la visión de crear un servicio de banquetería que trascienda lo convencional. Nos especializamos en eventos corporativos y sociales de alto impacto, donde la logística y el sabor se unen a la perfección.</p>
              <p>Nuestra cocina combina técnicas de vanguardia con el respeto absoluto por los ingredientes locales, asegurando que cada bocado cuente una historia de calidad y dedicación.</p>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-6">
              {[{ label: "Años Exp.", val: "10+" }, { label: "Eventos", val: "500+" }, { label: "Calidad", val: "100%" }].map((stat, i) => (
                <div key={i} className="text-center p-6 border border-neutral-800 bg-neutral-800/20 backdrop-blur-sm">
                  <div className="text-3xl font-black text-white mb-2">{stat.val}</div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: reducedMotion ? 0 : 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: motionDuration, ease: "easeOut" }} className="relative">
            <div className="aspect-square bg-neutral-800 relative overflow-hidden group">
              <Image src={QUIENES_SOMOS_IMAGE} alt="Chef trabajando en detalle" fill className="object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-1000" sizes="(max-width: 767px) 100vw, 50vw" />
              <div className="absolute inset-0 flex items-center justify-center p-10 text-center border-[12px] border-white/5 m-10">
                <div className="space-y-6">
                  <Award className="w-16 h-16 mx-auto text-white/50" />
                  <h4 className="text-2xl font-light italic leading-relaxed">"La cocina es un lenguaje para expresar amor y cuidado por los demás."</h4>
                  <div className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 font-black pt-4">Equipo D'Areli</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contacto" className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="max-w-6xl mx-auto bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col md:flex-row border border-neutral-100">
            <div className="md:w-2/5 bg-black text-white p-16 space-y-16">
              <div className="space-y-4">
                <h3 className="text-3xl font-black tracking-tight uppercase">Hablemos de tu evento</h3>
                <p className="text-neutral-400 font-light text-sm tracking-wide">Nuestro equipo de asesores está listo para dar vida a tus ideas.</p>
              </div>
              <div className="space-y-10">
                {[{ Icon: Phone, label: "Llamadas / WhatsApp", val: "+56 9 488 355 22" }, { Icon: Mail, label: "Correo Electrónico", val: "arelisaez@gmail.com" }, { Icon: MapPin, label: "Área de Cobertura", val: "Región Metropolitana y Alrededores" }].map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="p-3 bg-neutral-800 rounded-full"><item.Icon className="w-5 h-5 text-neutral-400" /></div>
                    <div>
                      <div className="text-[10px] uppercase text-neutral-500 tracking-[0.3em] mb-2 font-black">{item.label}</div>
                      <div className="text-base font-light">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-3/5 p-16">
              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative">
                    <input type="text" className="peer w-full py-4 bg-transparent border-b border-neutral-200 focus:outline-none focus:border-black transition-colors placeholder-transparent" placeholder="Nombre" id="t1-name" />
                    <label htmlFor="t1-name" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] font-black text-neutral-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-light peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:text-black">Nombre Completo</label>
                  </div>
                  <div className="relative">
                    <input type="email" className="peer w-full py-4 bg-transparent border-b border-neutral-200 focus:outline-none focus:border-black transition-colors placeholder-transparent" placeholder="Email" id="t1-email" />
                    <label htmlFor="t1-email" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] font-black text-neutral-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-light peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:text-black">Correo Electrónico</label>
                  </div>
                </div>
                <div className="relative">
                  <select defaultValue="Tipo de Servicio" className="w-full py-4 bg-transparent border-b border-neutral-200 focus:outline-none focus:border-black transition-colors uppercase text-[10px] tracking-[0.2em] font-black cursor-pointer appearance-none">
                    <option disabled value="Tipo de Servicio">Tipo de Servicio</option>
                    <option>Banquetería Gala</option>
                    <option>Almuerzo Corporativo</option>
                    <option>Matrimonio</option>
                    <option>Otro Evento Social</option>
                  </select>
                </div>
                <div className="relative">
                  <textarea rows={3} className="peer w-full py-4 bg-transparent border-b border-neutral-200 focus:outline-none focus:border-black transition-colors placeholder-transparent" placeholder="Mensaje" id="t1-msg"></textarea>
                  <label htmlFor="t1-msg" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] font-black text-neutral-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-light peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:text-black">¿Cómo podemos ayudarte?</label>
                </div>
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="button" className="w-full md:w-auto min-h-[44px] px-16 py-5 bg-black text-white text-[11px] uppercase tracking-[0.4em] font-black hover:bg-neutral-800 transition-all shadow-lg">Enviar Solicitud</motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-neutral-100 py-20 border-t border-neutral-200 text-center">
        <div className="container mx-auto px-6 space-y-12">
          <div className="flex justify-center items-center gap-3">
            <div className="w-10 h-10 bg-black flex items-center justify-center rounded-sm"><Utensils className="text-white w-5 h-5" /></div>
            <span className="text-2xl font-black tracking-tighter uppercase">D'ARELI <span className="font-light text-neutral-500">BANQUETERÍA</span></span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-[0.4em] font-black text-neutral-400">
            <a href="#inicio" className="min-h-[44px] inline-flex items-center hover:text-black transition-colors">Inicio</a>
            <a href="#servicios" className="min-h-[44px] inline-flex items-center hover:text-black transition-colors">Servicios</a>
            <a href="#quienes-somos" className="min-h-[44px] inline-flex items-center hover:text-black transition-colors">Nosotros</a>
            <a href="#contacto" className="min-h-[44px] inline-flex items-center hover:text-black transition-colors">Contacto</a>
          </div>
          <p className="text-[10px] text-neutral-400 uppercase tracking-[0.5em] font-medium">Gastronomía de Autor • Santiago, Chile</p>
          <div className="pt-12 text-neutral-300 text-[9px] uppercase tracking-[0.4em] font-bold border-t border-neutral-200 max-w-lg mx-auto">© 2024 GRUPO D'ARELI. TODOS LOS DERECHOS RESERVADOS.</div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedMenu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedMenu(null)}>
            <motion.div initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 30, opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="bg-white w-full max-w-3xl shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className={`h-3 w-full ${selectedMenu.color}`}></div>
              <button type="button" onClick={() => setSelectedMenu(null)} className="absolute top-6 right-6 min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 hover:bg-neutral-100 rounded-full transition-colors z-10" aria-label="Cerrar"><X className="w-6 h-6" /></button>
              <div className="p-10 md:p-20 text-center">
                <h3 className="text-4xl font-black tracking-tight uppercase mb-10 leading-tight">{selectedMenu.title}</h3>
                <div className="space-y-10 text-left">
                  <div className="p-10 bg-neutral-50 border-l-8 border-neutral-900 italic text-neutral-600 text-lg leading-relaxed shadow-sm">"{selectedMenu.content}"</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    {["Servicio de garzones incluido", "Montaje y cristalería premium", "Protocolo de evento personalizado", "Gestión de tiempos garantizada"].map((txt, i) => (
                      <div key={i} className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-neutral-500">
                        <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                        {txt}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-neutral-100">
                  <div className="text-left">
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-1 font-black">Precio base por plato</span>
                    <span className="text-4xl font-black">{selectedMenu.price}</span>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" className="w-full md:w-auto min-h-[44px] px-14 py-5 bg-black text-white text-[11px] uppercase tracking-[0.4em] font-black shadow-xl">Solicitar Presupuesto</motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Template1;
