import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../data/assets';

import HeroSlideshow from '../components/sections/HeroSlideshow';
import HorizontalAbout from '../components/sections/HorizontalAbout';
import OurBrands from '../components/sections/OurBrands';
import OurExpertise from '../components/sections/OurExpertise';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ProjectCTA from '../components/sections/ProjectCTA';
import FinalCTA from '../components/sections/FinalCTA';

const SectionDivider = () => (
  <div className="w-full flex justify-center py-16 lg:py-32">
    <div className="w-[1px] h-32 lg:h-48 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
  </div>
);

const HERO_IMAGES = [
  assets.heroImages[0], // tempio
  assets.heroImages[1], // techlam
  assets.heroImages[2], // steni
  assets.heroImages[3]  // frontek
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // Slower 6s transition for calmer feel
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden">
      
      {/* Global Fixed Background Slideshow */}
      <div className="fixed inset-0 w-full h-screen z-0 bg-black">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={HERO_IMAGES[currentIndex]}
            alt="XTERIOHUB Architecture Background"
            className="absolute inset-0 w-full h-full object-cover opacity-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.32 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 2, ease: "easeInOut" }
            }}
          />
        </AnimatePresence>
        
        {/* Clean, professional dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/85 pointer-events-none" />
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        
        {/* Massive XTERIOHUB Intro Section */}
        <section className="relative h-screen w-full flex items-center justify-center bg-transparent z-10 flex-col">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ 
              opacity: 1, 
              y: [-8, 8, -8]
            }}
            transition={{
              opacity: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 6, repeat: Infinity, ease: [0.445, 0.05, 0.55, 0.95] }
            }}
            className="flex flex-col items-center justify-center transform-gpu"
            style={{ willChange: "transform" }}
          >
            <h1 
              className="font-primary font-bold leading-none tracking-[0.15em] uppercase select-none cursor-default text-center"
              style={{ 
                color: '#0099E8',
                fontSize: 'clamp(2rem, 4.5vw, 4.2rem)',
                letterSpacing: '0.15em'
              }}
            >
              XTERIOHUB
            </h1>
            <p 
              className="font-mono text-sm sm:text-lg md:text-[22px] font-semibold tracking-[0.4em] uppercase select-none mt-6 md:mt-8 text-center"
              style={{ 
                color: '#0099E8'
              }}
            >
              EXCLUSIVE FAÇADE SOLUTIONS
            </p>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="font-secondary text-[10px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent"
            />
          </motion.div>
        </section>

        <HeroSlideshow />
        <SectionDivider />
        <HorizontalAbout />
        <SectionDivider />
        <OurBrands />
        <SectionDivider />
        <OurExpertise />
        <SectionDivider />
        <FeaturedProjects />
        <SectionDivider />
        <WhyChooseUs />
        <SectionDivider />
        <ProjectCTA />
        <SectionDivider />
        <FinalCTA />
      </div>
    </div>
  );
}
