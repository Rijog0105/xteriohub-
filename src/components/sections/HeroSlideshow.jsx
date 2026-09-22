import { motion } from 'framer-motion';
import { useRef } from 'react';
import { assets } from '../../data/assets';

const spring = { type: "spring", stiffness: 100, damping: 20 };

export default function HeroSlideshow() {
  const containerRef = useRef(null);

  return (
    <div className="relative w-full overflow-visible" ref={containerRef}>
      <div className="w-full max-w-[1500px] mx-auto px-8 md:px-16 lg:px-24 relative z-10 pt-6 md:pt-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-16 w-full">
          
          {/* Left Hero Text Column */}
          <motion.div 
            className="w-full lg:w-6/12 relative pt-8 md:pt-12"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ...spring }}
              className="font-primary font-extralight text-white leading-[1.15] tracking-tight mb-6"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)' }}
            >
              Crafting Iconic <br/>
              <span className="font-light text-zinc-300 bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-500">
                Exteriors with Precision
              </span>
              <br/> & Innovation
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ...spring }}
              className="font-secondary text-[16px] md:text-[18px] font-light leading-relaxed text-white/80 max-w-xl mb-8"
            >
              Crafted for durability, created for impact. XTERIOHUB delivers future-ready façade solutions with premium global partners—built to last, built to inspire.
            </motion.p>
          </motion.div>

          {/* Right Side Video Reel Container (Way Up On Top - All 4 Corners Fully Rounded & Unclipped - Further Size Reduction) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ...spring }}
            className="w-[200px] sm:w-[230px] md:w-[260px] lg:w-[285px] aspect-[9/16] rounded-[32px] border border-white/25 bg-black/90 shadow-[0_30px_70px_rgba(0,0,0,0.95)] overflow-hidden relative group shrink-0 -mt-20 sm:-mt-28 md:-mt-36 lg:-mt-48 -translate-y-8 lg:-translate-y-16 -translate-x-4 md:-translate-x-12 lg:-translate-x-24 z-20"
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
