import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const spring = { type: "spring", stiffness: 140, damping: 18 };

const ORDERED_BRANDS = [
  { name: "Frontek", logo: "/assets/logo/frontek-hd.webp" },
  { name: "Tempio", logo: "/assets/logo/tempio.webp" },
  { name: "Steni", logo: "/assets/logo/steni.webp" },
  { name: "Techlam", logo: "/assets/logo/techlam.webp" }
];

export default function OurBrands() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Alternate 3D Parallax Scroll Motion (Up & Down as you scroll!)
  const y1 = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  return (
    <section ref={containerRef} className="relative py-10 sm:py-16 md:py-28 bg-transparent z-10 overflow-hidden mt-2 sm:mt-6 w-full flex flex-col items-center justify-center text-center">
      
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 flex flex-col items-center justify-center text-center">
        
        {/* Header & Subtitle 100% Centered */}
        <div className="w-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring }}
            className="font-primary font-light text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 w-full text-center tracking-wide uppercase"
          >
            Our Brands
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ...spring }}
            className="font-secondary text-sm md:text-base font-light leading-relaxed text-white/75 w-full text-center max-w-2xl mx-auto"
          >
            Browse our collection of world-class architectural brand partners, highlighting innovative and high-quality façade solutions that transform spaces with precision and style.
          </motion.p>
        </div>

        {/* Clean Floating Brand Logos with Free Open Layout & Slightly Larger Logo Sizing */}
        <div className="w-full max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-14 py-4 text-center">
          {ORDERED_BRANDS.map((brand, index) => {
            const id = brand.name.toLowerCase();
            const isFrontek = brand.name === 'Frontek';
            const isTechlam = brand.name === 'Techlam';

            let sizeClasses = 'max-h-11 sm:max-h-14 md:max-h-16';
            if (isFrontek) {
              sizeClasses = 'max-h-5 sm:max-h-6 md:max-h-7.5 -translate-y-1.5 md:-translate-y-2';
            } else if (isTechlam) {
              sizeClasses = 'max-h-7 sm:max-h-8 md:max-h-9';
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, ...spring }}
                className="flex-1 min-w-[140px] max-w-[200px] flex items-center justify-center"
              >
                <Link
                  to={`/brands/${id}`}
                  className="group relative flex items-center justify-center w-full py-2 px-2 hover:scale-105 transition-transform duration-300"
                >
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} Logo`} 
                    className={`w-auto max-w-full object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-300 ${sizeClasses}`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
