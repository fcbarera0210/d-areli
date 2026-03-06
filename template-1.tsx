import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, 
  Calendar, 
  Users, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  Menu as MenuIcon, 
  X,
  Award,
  ArrowRight,
  Info
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('banqueteria');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  // Animaciones Framer Motion optimizadas
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Datos del Menú Gala (Banquetería)
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

  // Datos de los Menús de Almuerzo (Servicios Grupales)
  const groupMenus = [
    {
      id: 'empresas',
      title: "MENÚ EMPRESAS",
      color: "bg-red-500",
      accent: "border-red-500",
      content: "Ideal para eventos corporativos y almuerzos ejecutivos con buffet de asados.",
      price: "$23.800 + IVA"
    },
    {
      id: 'campestre',
      title: "MENÚ CAMPESTRE",
      color: "bg-blue-500",
      accent: "border-blue-500",
      content: "Tradición y sabor chileno: costillar, prietas, longaniza y buffet criollo.",
      price: "$23.000 + IVA"
    },
    {
      id: 'matrimonio',
      title: "MENÚ MATRIMONIO",
      color: "bg-amber-500",
      accent: "border-amber-500",
      content: "Sofisticación para tu gran día: plateada de vacuno o cerdo al horno.",
      price: "$27.000 + IVA"
    },
    {
      id: 'matrimonio-vip',
      title: "MENÚ MATRIMONIO VIP",
      color: "bg-teal-600",
      accent: "border-teal-600",
      content: "Experiencia premium: lomo vetado a las brasas y cordero asado.",
      price: "$30.000 + IVA"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 scroll-smooth overflow-x-hidden">
      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-10 h-10 bg-black flex items-center justify-center rounded-sm">
                <Utensils className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tighter uppercase">D'ARELI <span className="font-light text-neutral-500">BANQUETERÍA</span></span>
            </motion.div>
            
            {/* Desktop Nav */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest"
            >
              <a href="#inicio" className="hover:text-neutral-500 transition-colors">Inicio</a>
              <a href="#servicios" className="hover:text-neutral-500 transition-colors">Servicios</a>
              <a href="#quienes-somos" className="hover:text-neutral-500 transition-colors">Nosotros</a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contacto" 
                className="bg-black text-white px-6 py-2.5 hover:bg-neutral-800 transition-colors"
              >
                Cotizar
              </motion.a>
            </motion.div>

            {/* Mobile Toggle */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-neutral-200 overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-4 text-sm font-bold uppercase tracking-widest">
                <a href="#inicio" onClick={() => setMobileMenuOpen(false)}>Inicio</a>
                <a href="#servicios" onClick={() => setMobileMenuOpen(false)}>Servicios</a>
                <a href="#quienes-somos" onClick={() => setMobileMenuOpen(false)}>Nosotros</a>
                <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-neutral-500 italic">Cotizar Ahora</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="inicio" className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-neutral-100">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-neutral-200 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ duration: 15, repeat: Infinity, delay: 2 }}
            className="absolute bottom-20 left-[-5%] w-[500px] h-[500px] bg-neutral-300 rounded-full blur-[100px]"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-1.5 bg-white border border-neutral-200 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-600 shadow-sm">
              Sabor que trasciende
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9]">
              D'ARELI <br />
              <span className="text-neutral-400 font-light italic">BANQUETERÍA</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-md leading-relaxed font-light">
              Donde la alta cocina se encuentra con la distinción. Creamos banquetes memorables con un sello de sofisticación único.
            </p>
            <div className="flex flex-wrap gap-4 pt-6">
              <motion.a 
                whileHover={{ x: 5 }}
                href="#servicios" 
                className="px-8 py-4 bg-black text-white rounded-none hover:bg-neutral-800 transition-all flex items-center gap-3 group text-xs uppercase tracking-widest font-bold"
              >
                Explorar Menús <ArrowRight className="w-4 h-4" />
              </motion.a>
              <a href="#contacto" className="px-8 py-4 border border-neutral-300 bg-white/50 backdrop-blur rounded-none hover:bg-neutral-100 transition-all text-xs uppercase tracking-widest font-bold">
                Cotizar Evento
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="hidden md:block relative group"
          >
            {/* Marco decorativo dinámico */}
            <motion.div 
              animate={{ x: [24, 12, 24], y: [24, 12, 24] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 border border-neutral-200 z-0"
            />
            
            <div className="aspect-[4/5] relative bg-neutral-200 shadow-2xl overflow-hidden z-10">
               <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" 
                alt="Alta Gastronomía Gourmet"
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'; }}
               />
               <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-1 bg-white mb-6"
                  />
                  <span className="text-4xl font-serif italic tracking-wide block mb-2">Arte Culinario</span>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-300 font-bold">D'Areli Premium Experience</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="servicios" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">Propuestas Gastronómicas</h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
            <p className="text-neutral-500 max-w-2xl mx-auto font-light text-lg">
              Explora nuestra selección diseñada para impresionar a cada uno de tus invitados con el más alto estándar de calidad.
            </p>
          </motion.div>

          {/* TABS SELECTOR */}
          <div className="flex justify-center mb-16 border-b border-neutral-100">
            {['banqueteria', 'almuerzos'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] transition-all ${activeTab === tab ? 'text-black' : 'text-neutral-400 hover:text-neutral-600'}`}
              >
                {tab === 'banqueteria' ? 'Banquetería Gala' : 'Almuerzos & Matrimonios'}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-black" 
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'banqueteria' ? (
              <motion.div 
                key="gala-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto bg-neutral-50 border border-neutral-100 p-8 md:p-20 shadow-2xl relative"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-neutral-200/30 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                
                <div className="text-center space-y-3 mb-16">
                  <div className="flex justify-center mb-8">
                    <motion.div 
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-14 h-14 flex items-center justify-center border-2 border-black rounded-full"
                    >
                      <Utensils className="w-6 h-6" />
                    </motion.div>
                  </div>
                  <h3 className="text-4xl font-black tracking-[0.4em] uppercase">{galaMenu.title}</h3>
                  <div className="text-neutral-500 font-light italic uppercase tracking-[0.3em] text-sm">{galaMenu.subtitle}</div>
                </div>

                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid md:grid-cols-2 gap-x-16 gap-y-12"
                >
                  {galaMenu.sections.map((section, idx) => (
                    <motion.div 
                      key={idx} 
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { opacity: 1, y: 0 }
                      }}
                      className="space-y-3 group"
                    >
                      <h4 className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase border-b border-neutral-200 pb-3 group-hover:text-black transition-colors group-hover:border-black">
                        {section.category}
                      </h4>
                      <p className="text-sm leading-relaxed text-neutral-700 font-light">
                        {section.items}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="mt-20 pt-10 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="text-center md:text-left">
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2 font-bold">Inversión por Persona</span>
                    <span className="text-3xl font-black">{galaMenu.price}</span>
                    <p className="text-[10px] text-neutral-400 mt-1 uppercase font-medium">{galaMenu.conditions}</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-12 py-5 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-black hover:bg-neutral-800 transition-all shadow-xl"
                  >
                    Solicitar Dossier Completo
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="almuerzos-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {groupMenus.map((menu, idx) => (
                  <motion.div 
                    key={menu.id} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    whileHover={{ y: -12 }}
                    className="relative flex flex-col h-full bg-white border border-neutral-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] group overflow-hidden"
                  >
                    <div className={`h-2.5 w-full ${menu.color}`}></div>
                    <div className="p-10 flex flex-col flex-grow items-center text-center">
                      <div className={`w-14 h-14 mb-8 rounded-full flex items-center justify-center opacity-10 ${menu.color} text-black group-hover:scale-110 transition-transform`}>
                        <Utensils className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-black tracking-tight mb-5 min-h-[60px] flex items-center uppercase leading-tight">{menu.title}</h3>
                      <p className="text-neutral-500 text-sm leading-relaxed mb-10 font-light flex-grow">{menu.content}</p>
                      <div className="w-full pt-8 border-t border-neutral-50">
                        <span className="text-2xl font-black block mb-6">{menu.price}</span>
                        <button 
                          onClick={() => setSelectedMenu(menu)}
                          className={`w-full py-4 text-[10px] uppercase tracking-[0.3em] font-black border transition-all ${menu.accent} hover:bg-neutral-50`}
                        >
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="quienes-somos" className="py-28 bg-neutral-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div 
            {...fadeInUp}
            className="space-y-10"
          >
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Excelencia en <br />
              <span className="text-neutral-500 font-light italic">Cada Detalle</span>
            </h2>
            <div className="w-20 h-1 bg-white"></div>
            <div className="space-y-8 text-neutral-400 font-light leading-relaxed text-lg">
              <p>
                D'Areli nace de la visión de crear un servicio de banquetería que trascienda lo convencional. Nos especializamos en eventos corporativos y sociales de alto impacto, donde la logística y el sabor se unen a la perfección.
              </p>
              <p>
                Nuestra cocina combina técnicas de vanguardia con el respeto absoluto por los ingredientes locales, asegurando que cada bocado cuente una historia de calidad y dedicación.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-6">
              {[
                { label: "Años Exp.", val: "10+" },
                { label: "Eventos", val: "500+" },
                { label: "Calidad", val: "100%" }
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 border border-neutral-800 bg-neutral-800/20 backdrop-blur-sm">
                  <div className="text-3xl font-black text-white mb-2">{stat.val}</div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square bg-neutral-800 relative overflow-hidden group">
               <img 
                 src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" 
                 alt="Chef trabajando en detalle" 
                 className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-1000"
               />
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

      {/* --- CONTACT SECTION --- */}
      <section id="contacto" className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            {...fadeInUp}
            className="max-w-6xl mx-auto bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col md:flex-row border border-neutral-100"
          >
            <div className="md:w-2/5 bg-black text-white p-16 space-y-16">
              <div className="space-y-4">
                <h3 className="text-3xl font-black tracking-tight uppercase">Hablemos de tu evento</h3>
                <p className="text-neutral-400 font-light text-sm tracking-wide">Nuestro equipo de asesores está listo para dar vida a tus ideas.</p>
              </div>
              <div className="space-y-10">
                {[
                  { Icon: Phone, label: "Llamadas / WhatsApp", val: "+56 9 488 355 22" },
                  { Icon: Mail, label: "Correo Electrónico", val: "arelisaez@gmail.com" },
                  { Icon: MapPin, label: "Área de Cobertura", val: "Región Metropolitana y Alrededores" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="p-3 bg-neutral-800 rounded-full">
                        <item.Icon className="w-5 h-5 text-neutral-400" />
                    </div>
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
                    <input type="text" className="peer w-full py-4 bg-transparent border-b border-neutral-200 focus:outline-none focus:border-black transition-colors placeholder-transparent" placeholder="Nombre" id="name" />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] font-black text-neutral-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-light peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:text-black">Nombre Completo</label>
                  </div>
                  <div className="relative">
                    <input type="email" className="peer w-full py-4 bg-transparent border-b border-neutral-200 focus:outline-none focus:border-black transition-colors placeholder-transparent" placeholder="Email" id="email" />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] font-black text-neutral-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-light peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:text-black">Correo Electrónico</label>
                  </div>
                </div>
                <div className="relative">
                    {/* FIJADO: Uso de defaultValue en lugar de selected en option para evitar warning de React */}
                    <select 
                      defaultValue="Tipo de Servicio"
                      className="w-full py-4 bg-transparent border-b border-neutral-200 focus:outline-none focus:border-black transition-colors uppercase text-[10px] tracking-[0.2em] font-black cursor-pointer appearance-none"
                    >
                      <option disabled value="Tipo de Servicio">Tipo de Servicio</option>
                      <option>Banquetería Gala</option>
                      <option>Almuerzo Corporativo</option>
                      <option>Matrimonio</option>
                      <option>Otro Evento Social</option>
                    </select>
                </div>
                <div className="relative">
                    <textarea rows="3" className="peer w-full py-4 bg-transparent border-b border-neutral-200 focus:outline-none focus:border-black transition-colors placeholder-transparent" placeholder="Mensaje" id="msg"></textarea>
                    <label htmlFor="msg" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] font-black text-neutral-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-light peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-black peer-focus:text-black">¿Cómo podemos ayudarte?</label>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full md:w-auto px-16 py-5 bg-black text-white text-[11px] uppercase tracking-[0.4em] font-black hover:bg-neutral-800 transition-all shadow-lg"
                >
                  Enviar Solicitud
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-neutral-100 py-20 border-t border-neutral-200 text-center">
        <div className="container mx-auto px-6 space-y-12">
          <div className="flex justify-center items-center gap-3">
            <div className="w-10 h-10 bg-black flex items-center justify-center rounded-sm">
              <Utensils className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">D'ARELI <span className="font-light text-neutral-500">BANQUETERÍA</span></span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] uppercase tracking-[0.4em] font-black text-neutral-400">
              <a href="#inicio" className="hover:text-black transition-colors">Inicio</a>
              <a href="#servicios" className="hover:text-black transition-colors">Servicios</a>
              <a href="#quienes-somos" className="hover:text-black transition-colors">Nosotros</a>
              <a href="#contacto" className="hover:text-black transition-colors">Contacto</a>
          </div>
          <p className="text-[10px] text-neutral-400 uppercase tracking-[0.5em] font-medium">Gastronomía de Autor • Santiago, Chile</p>
          <div className="pt-12 text-neutral-300 text-[9px] uppercase tracking-[0.4em] font-bold border-t border-neutral-200 max-w-lg mx-auto">
            © 2024 GRUPO D'ARELI. TODOS LOS DERECHOS RESERVADOS.
          </div>
        </div>
      </footer>

      {/* --- MODAL DETALLE --- */}
      <AnimatePresence>
        {selectedMenu && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedMenu(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-3xl shadow-2xl relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
               <div className={`h-3 w-full ${selectedMenu.color}`}></div>
               <button 
                onClick={() => setSelectedMenu(null)} 
                className="absolute top-6 right-6 p-2.5 hover:bg-neutral-100 rounded-full transition-colors z-10"
               >
                 <X className="w-6 h-6" />
               </button>
               <div className="p-10 md:p-20 text-center">
                 <h3 className="text-4xl font-black tracking-tight uppercase mb-10 leading-tight">{selectedMenu.title}</h3>
                 <div className="space-y-10 text-left">
                   <div className="p-10 bg-neutral-50 border-l-8 border-neutral-900 italic text-neutral-600 text-lg leading-relaxed shadow-sm">
                     "{selectedMenu.content}"
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                     <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-neutral-500">
                        <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                        Servicio de garzones incluido
                     </div>
                     <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-neutral-500">
                        <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                        Montaje y cristalería premium
                     </div>
                     <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-neutral-500">
                        <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                        Protocolo de evento personalizado
                     </div>
                     <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-neutral-500">
                        <div className="w-2 h-2 bg-neutral-900 rounded-full"></div>
                        Gestión de tiempos garantizada
                     </div>
                   </div>
                 </div>
                 <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-neutral-100">
                    <div className="text-left">
                        <span className="block text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-1 font-black">Precio base por plato</span>
                        <span className="text-4xl font-black">{selectedMenu.price}</span>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full md:w-auto px-14 py-5 bg-black text-white text-[11px] uppercase tracking-[0.4em] font-black shadow-xl"
                    >
                        Solicitar Presupuesto
                    </motion.button>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;