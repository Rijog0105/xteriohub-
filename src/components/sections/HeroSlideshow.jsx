import { motion } from 'framer-motion';
import { useRef } from 'react';
import { assets } from '../../data/assets';

const spring = { type: "spring", stiffness: 100, damping: 20 };

export default function HeroSlideshow() {
  const containerRef = useRef(null);

  return (
    <div className="relative w-full overflow-visible" ref={containerRef}>
      <div className="w-full max-w-[1500px] mx-auto px-5 sm:px-10 md:px-16 lg:px-24 relative z-10 pt-4 sm:pt-6 md:pt-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 sm:gap-10 lg:gap-16 w-full">
          
          {/* Left Hero Text Column */}
          <motion.div 
            className="w-full lg:w-6/12 relative pt-6 sm:pt-8 md:pt-12 text-center lg:text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ...spring }}
              className="font-primary font-extralight text-white leading-[1.18] sm:leading-[1.15] tracking-tight mb-5 sm:mb-6"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.8rem)' }}
            >
              Crafting Iconic <br className="hidden sm:block"/>
              <span className="font-light text-zinc-300 bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-500">
                Exteriors with Precision
              </span>
              <br className="hidden sm:block"/> & Innovation
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ...spring }}
              className="font-secondary text-[14px] sm:text-[16px] md:text-[18px] font-light leading-relaxed text-white/80 max-w-xl mb-6 sm:mb-8 mx-auto lg:mx-0"
            >
              Crafted for durability, created for impact. XTERIOHUB delivers future-ready façade solutions with premium global partners—built to last, built to inspire.
            </motion.p>
          </motion.div>

          {/* Right Side Video Reel Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ...spring }}
            className="w-[190px] sm:w-[230px] md:w-[260px] lg:w-[285px] aspect-[9/16] rounded-[28px] sm:rounded-[32px] border border-white/25 bg-black/90 shadow-[0_20px_50px_rgba(0,0,0,0.95)] overflow-hidden relative group shrink-0 mt-2 sm:mt-0 md:-mt-28 lg:-mt-48 translate-x-0 md:-translate-x-12 lg:-translate-x-24 -translate-y-2 sm:-translate-y-8 lg:-translate-y-16 z-20 mx-auto lg:mx-0"
            style={{ borderRadius: '32px' }}
          >
            <video
              src="/assets/Videos/reel.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter contrast-105 brightness-105 group-hover:scale-105 transition-transform duration-700"
              style={{ borderRadius: '32px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" style={{ borderRadius: '32px' }} />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
