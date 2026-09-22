import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const spring = { type: "spring", stiffness: 100, damping: 20 };

const BENEFITS = [
  "Innovative Material Solutions",
  "Uncompromising Durability",
  "Thermal & Acoustic Efficiency",
  "Sustainable Manufacturing",
  "Infinite Customization Options",
  "Certified Global Standards"
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="relative py-10 bg-transparent z-10 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-8 md:px-16 lg:px-24 relative">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ...spring }}
            className="w-full xl:w-[55%] flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, ...spring }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="font-secondary text-[10px] font-bold tracking-[0.2em] uppercase text-white/80">
                Our Advantage
              </span>
            </motion.div>
            
            <h2 className="font-primary font-extralight text-zinc-200 leading-[1.3] mb-5"
              style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', letterSpacing: '-0.02em' }}
            >
              Engineered to Perfection.
            </h2>

            <p className="font-secondary text-[14px] md:text-[16px] font-light leading-[1.95] text-white/80 mb-10 max-w-xl">
              Xteriohub provides an unparalleled ecosystem of premium architectural materials. From impact-resistant Steni panels to highly versatile Tempio ceramics, our solutions are chosen by top architects worldwide.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-14">
              {BENEFITS.map((benefit, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, ...spring }}
                  className="flex items-center gap-3.5 text-white/90 font-secondary text-[14px] font-medium py-1 px-0 bg-transparent border-none cursor-default leading-normal"
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  {benefit}
                </motion.li>
              ))}
            </ul>

            {/* Professional Progress Bars with Clean Spacing */}
            <div className="flex flex-col gap-8 max-w-xl pr-4">
              <div>
                <div className="flex justify-between text-white font-secondary text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                  <span>Architectural Integration</span>
                  <span className="text-cyan-400">95%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '95%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="h-full bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,153,232,0.6)]" 
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-white font-secondary text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                  <span>Structural Durability</span>
                  <span className="text-cyan-400">98%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '98%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.7 }}
                    className="h-full bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,153,232,0.6)]" 
                  />
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ...spring }}
            className="w-full xl:w-[45%]"
          >
            {/* Standard Rectangle Image */}
            <div className="relative h-[75vh] overflow-hidden rounded-3xl group">
              <motion.img 
                style={{ y: yImage, scale: 1.15 }}
                src="/assets/Brands/tempio/projects/geumang-tower.webp" 
                alt="Tempio Geumang Tower Project" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/10 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <span className="text-accent font-secondary text-[10px] tracking-[0.2em] uppercase mb-2 block">Featured Project</span>
                <h3 className="font-primary text-2xl font-light mb-1">Tempio - Geumang Tower</h3>
                <p className="font-secondary text-sm text-white/60">Striking modern terracotta facades showcasing structural brilliance.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
