import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Utensils, Users, Phone, Mail, MapPin, ChevronRight, Menu, X, Star, Award, Clock } from 'lucide-react';

// Variantes para animaciones de entrada por sección
const fadeInSection = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const App = () => {
  const [activeTab, setActiveTab] = useState('banqueteria');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menús de almuerzo basados en la imagen colorida
  const lunchMenus = [
    {
      title: "MENÚ EMPRESAS",
      color: "border-red-500",
      bg: "bg-red-500",
      textColor: "text-red-600",
      items: ["Aperitivos y Coctelería: Pisco Sour, Mango Sour, Empanaditas", "Almuerzo: Buffet de asados (Pollo, Cerdo, Vacuno)", "Postre: Pie de Limón, Torta Helada"]
    },
    {
      title: "MENÚ CAMPESTRE",
      color: "border-blue-500",
      bg: "bg-blue-500",
      textColor: "text-blue-600",
      items: ["Aperitivos: Pisco/Mango Sour, Jugos Naturales", "Coctelería: Sopapillas con pebre, Ceviche de Reineta", "Plato de Fondo: Buffet de Asados Criollos"]
    },
    {
      title: "MENÚ MATRIMONIO",
      color: "border-orange-500",
      bg: "bg-orange-500",
      textColor: "text-orange-600",
      items: ["Entrada: Rollito de Jamón York o Palta Rellena", "Fondo: Plateada de Vacuno en su jugo con papas rústicas", "Postres: Mousse de Manjar, Tiramisú"]
    },
    {
      title: "MENÚ MATRIMONIO VIP",
      color: "border-teal-500",
      bg: "bg-teal-500",
      textColor: "text-teal-600",
      items: ["Coctelería: Pastel de Jaiba, Pincho de Pollo a la mostaza", "Entrada: Ceviche de Reineta o Fantasía Marina", "Fondo: Lomo Vetado a las brasas o Plateada"]
    }
  ];

  // Menú de gala basado en la imagen minimalista
  const galaMenu = {
    aperitivos: ["Pisco sour", "Mango sour", "Bebidas", "Jugo natural", "Vino espumante", "Cerveza"],
    bocados: ["4 canapés variados", "2 ceviches de reineta", "1 pastel de jaiba", "3 empanaditas de queso", "1 brocheta de cerdo", "2 pastelitos dulces"],
    entradas: ["Mousse de pollo en palta natural", "Fantasía marina (pastel de jaiba)"],
    platos: ["Mechada de vacuno con pastelera de choclo", "Plateada de vacuno con salsa mignon"],
    postres: ["Suspiro limeño", "Mousse de chocolate", "Cheesecake de frutilla", "Pie de limón", "Waffles y helado"]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* --- Navegación --- */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">D</div>
              <span className="text-xl font-bold tracking-tighter uppercase">D'Areli <span className="font-light italic">Banquetería</span></span>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-8">
              {['inicio', 'quienes-somos', 'servicios'].map((item) => (
                <motion.a 
                  key={item}
                  href={`#${item}`} 
                  whileHover={{ y: -2 }}
                  className="text-sm font-medium hover:text-red-600 transition-colors capitalize"
                >
                  {item.replace('-', ' ')}
                </motion.a>
              ))}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all"
              >
                Contactar
              </motion.button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-400 via-slate-900 to-black"
        ></motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight"
          >
            Arte en cada <br/> 
            <span className="italic font-serif text-slate-300 font-light underline decoration-red-500/30 underline-offset-8">Bocado</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-xl text-slate-300 mb-10 font-light"
          >
            Servicios gastronómicos de alta gama para empresas y celebraciones únicas.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button onClick={() => {document.getElementById('servicios').scrollIntoView({behavior: 'smooth'}); setActiveTab('banqueteria')}} 
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xl">
              Banquetería Gala <ChevronRight size={18}/>
            </button>
            <button onClick={() => {document.getElementById('servicios').scrollIntoView({behavior: 'smooth'}); setActiveTab('almuerzos')}}
              className="px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
              Menús Almuerzo <ChevronRight size={18}/>
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- Quiénes Somos --- */}
      <motion.section 
        id="quienes-somos" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInSection}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs">Nuestra Esencia</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Pasión por la alta cocina</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                En <strong>D'Areli</strong>, transformamos reuniones en experiencias memorables. Nuestra cocina fusiona la técnica profesional con el cariño de lo hecho en casa, asegurando que cada plato cuente una historia de calidad.
              </p>
              <div className="grid grid-cols-2 gap-8 py-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Award size={24}/>
                  </div>
                  <h4 className="font-bold">Excelencia</h4>
                  <p className="text-sm text-slate-500">Certificación en cada proceso gastronómico.</p>
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Clock size={24}/>
                  </div>
                  <h4 className="font-bold">Eficiencia</h4>
                  <p className="text-sm text-slate-500">Logística perfecta para eventos de gran escala.</p>
                </motion.div>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[2rem] bg-slate-200 overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
              </div>
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white text-black p-10 rounded-3xl shadow-2xl border border-slate-100"
              >
                <p className="text-5xl font-black text-red-600">10+</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-50">Años de Sabor</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- Sección de Servicios --- */}
      <section id="servicios" className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Propuestas Personalizadas</h2>
            <div className="flex justify-center mt-8 p-1.5 bg-white rounded-full shadow-inner max-w-sm mx-auto border border-slate-200">
              {['banqueteria', 'almuerzos'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex-1 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all z-10 ${activeTab === tab ? 'text-white' : 'text-slate-400'}`}
                >
                  {tab === 'banqueteria' ? 'Banquetería Gala' : 'Menús Almuerzo'}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="tab-bg"
                      className="absolute inset-0 bg-black rounded-full -z-10 shadow-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'banqueteria' ? (
              <motion.div 
                key="gala"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100"
              >
                <div className="bg-slate-50 p-16 text-center border-b border-slate-100 relative">
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-5">
                    <ChefHat size={120} />
                  </div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex justify-center mb-6 relative z-10"
                  >
                    <div className="relative w-16 h-10">
                      <div className="absolute left-0 w-6 h-6 bg-black transform rotate-45 rounded-sm shadow-md"></div>
                      <div className="absolute right-0 w-6 h-6 bg-black transform rotate-45 rounded-sm shadow-md"></div>
                    </div>
                  </motion.div>
                  <h3 className="text-4xl font-light tracking-[0.4em] uppercase mb-4 relative z-10">Menú Gala</h3>
                  <p className="text-slate-400 font-serif italic text-lg">La distinción de un servicio integral</p>
                </div>
                
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="p-16 grid md:grid-cols-2 lg:grid-cols-3 gap-16"
                >
                  {Object.entries(galaMenu).slice(0, 3).map(([key, items]) => (
                    <motion.div key={key} variants={itemVariants}>
                      <h4 className="font-bold text-[10px] tracking-[0.3em] uppercase mb-8 border-b border-slate-100 pb-3 flex justify-between items-center">
                        {key} <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      </h4>
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

                <div className="bg-slate-900 p-12 text-white flex flex-col lg:flex-row justify-between items-center gap-8">
                  <div className="text-center lg:text-left">
                    <p className="text-xs opacity-50 uppercase tracking-[0.2em] mb-2">Inversión por invitado</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black">$23.000</span>
                      <span className="text-xl font-light opacity-30">CLP</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="text-center sm:text-right border-l border-white/10 pl-6 hidden sm:block">
                      <p className="text-xs font-bold text-red-400 uppercase mb-1">Servicios Incluidos</p>
                      <p className="text-[10px] opacity-40">Mobiliario, Loza, Garzones y Cristalería</p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
                      className="bg-white text-black px-12 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-xl"
                    >
                      Reservar Fecha
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="lunch"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {lunchMenus.map((menu, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -10 }}
                    className={`bg-white rounded-[2rem] shadow-xl border-b-[12px] ${menu.color} overflow-hidden group transition-all duration-300`}
                  >
                    <div className={`${menu.bg} p-8 text-white text-center relative overflow-hidden`}>
                      <motion.div 
                        initial={{ opacity: 0.1 }}
                        whileHover={{ scale: 1.5, opacity: 0.2 }}
                        className="absolute -right-4 -bottom-4"
                      >
                        <Utensils size={80} />
                      </motion.div>
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
                          <p className={`text-2xl font-black ${menu.textColor}`}>$23.000 <span className="text-xs opacity-50">+IVA</span></p>
                        </div>
                        <motion.button 
                          whileHover={{ rotate: 90 }}
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${menu.bg}`}
                        >
                          <ChevronRight size={24} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-white to-red-600"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-16 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 text-white mb-8">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-black">D</div>
                <span className="text-2xl font-black tracking-tighter uppercase italic">D'Areli</span>
              </div>
              <p className="max-w-md text-sm font-light leading-relaxed mb-8 text-slate-500">
                La gastronomía es el lenguaje del cuidado. En cada plato ponemos nuestra reputación y pasión para asegurar que su evento sea, sencillamente, perfecto.
              </p>
              <div className="flex gap-4">
                {[1,2,3].map(i => (
                  <motion.a 
                    key={i} 
                    href="#" 
                    whileHover={{ y: -5, backgroundColor: "#fff", color: "#000" }}
                    className="w-12 h-12 rounded-2xl border border-slate-800 flex items-center justify-center transition-all"
                  >
                    <Star size={20}/>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-black mb-8 uppercase text-[10px] tracking-[0.3em]">Directorio</h4>
              <ul className="space-y-4 text-sm font-light">
                <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Phone size={14} className="text-red-600" /> +56 9 488 355 22</li>
                <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Mail size={14} className="text-red-600" /> arelisaez@gmail.com</li>
                <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><MapPin size={14} className="text-red-600" /> Santiago, Chile</li>
              </ul>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h4 className="text-white font-black mb-6 uppercase text-[10px] tracking-[0.3em]">Operaciones</h4>
              <p className="text-xs mb-2">Lun - Vie: <span className="text-white">09:00 - 19:00</span></p>
              <p className="text-xs mb-6">Sáb: <span className="text-white">Eventos VIP</span></p>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-red-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest w-full shadow-lg shadow-red-600/20"
              >
                Hablar con un Chef
              </motion.button>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold">
            <p>&copy; 2024 D'Areli Banquetería - Calidad Superior</p>
            <p className="opacity-30">Una empresa de Grupo D'Areli</p>
          </div>
        </div>
      </footer>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-slate-900 flex flex-col items-center justify-center text-white"
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
              <X size={40} />
            </button>
            <nav className="flex flex-col gap-10 text-4xl font-black uppercase italic text-center">
              {['inicio', 'servicios', 'quienes somos', 'contacto'].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  href={`#${item.replace(' ', '-')}`} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;