import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const spring = { type: "spring", stiffness: 100, damping: 20 };

export default function HorizontalAbout() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const ICONS = [
    { title: "Facade Solutions", svg: <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" /> },
    { title: "Cladding Systems", svg: <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /> },
    { title: "Custom Architectural", svg: <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /> },
    { title: "Sustainable Design", svg: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /> }
  ];

  return (
    <section ref={containerRef} className="relative py-10 bg-transparent z-10">
      <div className="max-w-[1500px] mx-auto px-8 md:px-16 lg:px-24 relative">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ...spring }}
            className="w-full lg:w-[48%]"
          >
            {/* Wide Organic Blob Shape Image */}
            <div 
              className="relative aspect-[1.2/1] w-full max-w-[650px] mx-auto overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group"
              style={{ borderRadius: '60% 40% 65% 35% / 45% 55% 45% 55%' }}
            >
              <motion.img 
                style={{ y: yImage, scale: 1.0 }}
                src="/assets/generated/tempio_why_baguettes_1786410863457.png" 
                alt="Tempio Terracotta Facade Panels" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ...spring }}
            className="w-full lg:w-[48%] flex flex-col justify-center lg:pl-10 lg:ml-auto"
          >
            
            <h2 className="font-primary font-medium text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              Defining the Face of Modern Architecture.
            </h2>

            <p className="font-secondary text-[16px] md:text-[18px] font-medium leading-relaxed text-white/90 mb-6">
              A façade is more than just the exterior skin of a building—it is the ultimate intersection of design, engineering, and environmental performance.
            </p>

            <p className="font-secondary text-[14px] md:text-[16px] font-light leading-relaxed text-white/60 mb-12">
              It protects the structure against the elements, significantly improves thermal efficiency, and defines the visual identity of a project. Whether using the organic warmth of extruded terracotta or the ultra-compact resilience of sintered porcelain, a high-performance façade system ensures that a building not only stands out aesthetically but endures the test of time.
            </p>

            {/* 4 Feature Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              {ICONS.map((icon, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + (i * 0.1), ...spring }}
                  className="flex flex-col gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-transparent border-none flex items-center justify-start text-cyan-400 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      {icon.svg}
                    </svg>
                  </div>
                  <span className="font-secondary text-[12px] font-medium text-white/80 group-hover:text-white transition-colors">
                    {icon.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
