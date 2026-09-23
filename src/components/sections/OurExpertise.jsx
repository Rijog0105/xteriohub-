import { motion } from 'framer-motion';
import { useRef } from 'react';

const spring = { type: "spring", stiffness: 100, damping: 20 };

const SERVICES = [
  {
    title: "Terracotta Facades",
    description: "Extruded double-skin terracotta panels delivering exceptional thermal insulation, natural warmth, and fire-proof structural durability.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      </svg>
    ),
    delay: 0.1
  },
  {
    title: "Sintered Surfaces",
    description: "Ultra-compact sintered mineral slabs compacted under 15,000 tons of pressure for zero porosity and extreme thermal stability.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    delay: 0.2
  },
  {
    title: "Porcelain Cladding",
    description: "Large-format 3mm and 6mm architectural porcelain slabs providing scratch resistance, UV color fastness, and effortless maintenance.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    delay: 0.3
  },
  {
    title: "Glass Fiber Composites",
    description: "Steni glass-fiber reinforced stone aggregate panels delivering 100% moisture impermeability, freeze-thaw resistance, and a 60-year warranty.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <line x1="12" y1="22" x2="12" y2="12" />
        <polyline points="22 8.5 12 12 2 8.5" />
      </svg>
    ),
    delay: 0.4
  }
];

function ServiceCard({ service }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: service.delay, ...spring }}
      whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.3, ease: "easeOut" } }}
      className="group relative h-full flex flex-col p-8 lg:p-10 bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden cursor-pointer backdrop-blur-xl"
    >
      <div className="relative z-10 flex-1 flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-5 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 shrink-0">
          {service.icon}
        </div>
        
        <h3 className="font-primary text-base md:text-lg font-medium text-white mb-2.5 leading-snug tracking-tight">
          {service.title}
        </h3>
        
        <p className="font-secondary text-xs md:text-sm leading-relaxed text-white/70 group-hover:text-white/90 transition-colors duration-300 mt-auto">
          {service.description}
        </p>
      </div>

      {/* Subtle Hover Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/0 via-cyan-400/0 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function OurExpertise() {
  const containerRef = useRef(null);
  
  return (
    <section ref={containerRef} className="relative py-10 sm:py-16 md:py-20 bg-transparent z-10">
      <div className="max-w-[1500px] mx-auto px-6 md:px-16 lg:px-24 relative">
        
        <div className="flex flex-col items-center text-center mb-8 sm:mb-14 md:mb-20">
          <span className="font-secondary text-[10px] font-semibold tracking-[0.4em] uppercase block mb-3 text-cyan-400">
            OUR MATERIALS
          </span>
          <h2 className="font-primary font-extralight text-zinc-200 max-w-2xl"
            style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', letterSpacing: '-0.02em', lineHeight: 1.25 }}
          >
            Curating the World's Best Architectural Skins.
          </h2>
        </div>

        {/* Top 3 Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 mb-12 lg:mb-16">
          {SERVICES.slice(0, 3).map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* 4th Card Centered Below */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-md" style={{ marginTop: '45px' }}>
            <ServiceCard service={SERVICES[3]} />
          </div>
        </div>

      </div>
    </section>
  );
}
