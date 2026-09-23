import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FloatingFacadeElements from '../components/common/FloatingFacadeElements';

const TECH_HIGHLIGHTS = [
  {
    num: '01',
    title: 'CELLULAR HONEYCOMB EXTRUSION',
    brand: 'FRONTEK / SPAIN',
    desc: 'Patented double-skin terracotta profile with internal air chambers that drastically reduce building dead load while establishing an impenetrable thermal barrier.',
    features: ['A1 Non-Combustible Fire Rating', 'Over 3.5 kPa Wind Deflection Load', 'Continuous Thermal Insulation Cavity'],
    image: '/assets/generated/frontek_cellular_core_sample.jpg'
  },
  {
    num: '02',
    title: 'GLASS-FIBER POLYMER COMPOSITE CORE',
    brand: 'STENI / NORWAY',
    desc: 'Norwegian-engineered crushed stone aggregate matrix reinforced with dual layers of woven fiberglass for 60-year guaranteed climate resilience.',
    features: ['100% Moisture Impervious', 'Freeze-Thaw & Anti-Graffiti Shield', '60-Year Written Functional Guarantee'],
    image: '/assets/generated/steni_why_warranty_1786410929718.png'
  },
  {
    num: '03',
    title: 'HIGH-PRESSURE SINTERED PORCELAIN',
    brand: 'TECHLAM / SPAIN',
    desc: 'Ultra-thin 3mm and 6mm porcelain slabs compacted under 15,000 tons of pressure and sintered at 1,200°C for seamless jumbo architectural surfaces.',
    features: ['Jumbo Format Slabs Up To 3000x1000mm', 'Zero Porosity Water Absorption <0.1%', 'UV & Scratch Resistant Finish'],
    image: '/assets/generated/techlam_why_durability_1786348720892.png'
  },
  {
    num: '04',
    title: 'SOLAR BAGUETTES & 3D GEOMETRY',
    brand: 'TEMPIO / SPAIN',
    desc: 'Precision extruded clay sunscreen baguettes and custom 3D wave profiles delivering active solar control and sculpted architectural shadows.',
    features: ['Natural Chimney-Effect Ventilation', 'Custom 3D Curved & Ribbed Surfaces', 'Integrated Substructure Attachment'],
    image: '/assets/generated/tempio_why_baguettes_1786410863457.png'
  }
];

export default function Technology() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMousePos({ x, y });
  };

  return (
    <div onMouseMove={handleMouseMove} className="relative w-full bg-black text-white overflow-x-hidden selection:bg-sky-500 selection:text-black">
      <FloatingFacadeElements />

      {/* PURE BLACK THEME WITH DYNAMIC SPOTLIGHT TORCH BEAM FOLLOWING CURSOR */}
      <div 
        className="pointer-events-none absolute inset-0 transition-all duration-150 ease-out"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 70%), radial-gradient(circle 900px at 50% 0%, rgba(255, 255, 255, 0.18) 0%, transparent 55%)`
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:72px_72px]" />


      {/* Main Container */}
      <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 pt-28 sm:pt-40 md:pt-52 pb-20 sm:pb-32">
        
        {/* Editorial Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-16 sm:mb-24 md:mb-28">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.35em] sm:tracking-[0.4em] uppercase text-sky-400 mb-4 sm:mb-6 block"
          >
            FAÇADE ENGINEERING // SURFACE SCIENCE
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-primary font-light text-3xl sm:text-5xl md:text-7xl tracking-tight text-white leading-tight mb-6 sm:mb-8"
          >
            Advanced <span className="font-serif italic font-normal text-white/90">Façade Technologies</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-secondary text-sm sm:text-base md:text-lg text-white/75 font-light leading-relaxed max-w-2xl px-2"
          >
            Delivering next-generation material science, thermal insulation, hidden structural anchorage, and extreme environmental durability across high-rise building envelopes.
          </motion.p>
        </div>

        {/* Technology Highlights Grid */}
        <div className="space-y-16 sm:space-y-24 md:space-y-36">
          {TECH_HIGHLIGHTS.map((tech, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={tech.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 sm:gap-12 lg:gap-20 items-center`}
              >
                {/* Image Showcase */}
                <div className="w-full lg:w-1/2 aspect-[16/11] rounded-3xl overflow-hidden border border-white/15 relative group shadow-2xl hover:border-sky-400/60 transition-all duration-500">
                  <img
                    src={tech.image}
                    alt={tech.title}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-[1.8s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  <span className="absolute top-6 left-6 font-mono text-xs font-bold tracking-[0.25em] text-sky-400 bg-black/85 px-4 py-1.5 rounded-full border border-sky-400/30 backdrop-blur-md">
                    TECH {tech.num} // {tech.brand}
                  </span>
                </div>

                {/* Content Details */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="font-mono text-xs font-bold tracking-[0.3em] text-sky-400/90 uppercase block mb-3">
                    ENGINEERING PROFILE
                  </span>

                  <h3 className="font-primary text-2xl md:text-4xl font-medium text-white mb-6 tracking-tight">
                    {tech.title}
                  </h3>

                  <p className="font-secondary text-sm md:text-base text-white/80 font-light leading-relaxed mb-8">
                    {tech.desc}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-3.5 mb-10">
                    {tech.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 font-secondary text-xs md:text-sm text-sky-200/90 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/25 text-white font-mono text-xs font-semibold tracking-widest uppercase hover:bg-sky-400 hover:text-black hover:border-sky-400 transition-all duration-300 w-fit"
                  >
                    Request Technical Specs ↗
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
