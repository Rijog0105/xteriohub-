import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../../data/assets';

export default function Preloader({ onComplete }) {
  const [stage, setStage] = useState(0);
  const logoUrl = assets.logos.find(l => l.includes('xteriohub')) || assets.logos[0];

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 200),    // Logo fades in
      setTimeout(() => setStage(2), 1000),   // "Exclusive Premium Façade Solutions" appears
      setTimeout(() => setStage(3), 2000),   // "Engineering • Innovation • Performance"
      setTimeout(() => setStage(4), 2600),   // Zoom dissolve begins
      setTimeout(() => {
        sessionStorage.setItem('xteriohub_preloader_shown', 'true');
        onComplete();
      }, 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 w-screen h-screen bg-black flex flex-col items-center justify-center overflow-hidden"
      style={{ zIndex: 999999 }}
      animate={stage >= 4
        ? { opacity: 0, scale: 2.5, filter: 'blur(20px)' }
        : { opacity: 1, scale: 1, filter: 'blur(0px)' }
      }
      transition={{ duration: 0.6, ease: [0.7, 0, 0.84, 0] }}
    >
      {/* Ambient Blue Radial Glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '70vw', height: '70vw', maxWidth: 700, maxHeight: 700,
          background: 'radial-gradient(circle, rgba(0,153,232,0.35) 0%, rgba(0,153,232,0.08) 45%, transparent 75%)',
        }}
        animate={{ scale: [0.8, 1.15, 1], opacity: [0.3, 0.8, 0.55] }}
        transition={{ duration: 3, ease: 'easeOut' }}
      />

      {/* Blueprint dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.035, backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1, height: Math.random() * 3 + 1,
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              background: `rgba(0,153,232,${Math.random() * 0.4 + 0.2})`,
            }}
            animate={{ y: [0, -(Math.random() * 40 + 20), 0], opacity: [0.1, 0.7, 0.1] }}
            transition={{ duration: Math.random() * 2 + 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 1.5 }}
          />
        ))}
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <AnimatePresence>
          {stage >= 1 && (
            <motion.img
              src={logoUrl}
              alt="XTERIOHUB"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={stage >= 4 ? { opacity: 1, scale: 1.3 } : { opacity: 1, scale: 1 }}
              transition={{ duration: stage >= 4 ? 0.5 : 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-56 md:w-80 lg:w-[420px] object-contain mb-10"
              style={{ dropShadow: '0 0 40px rgba(0,153,232,0.3)' }}
            />
          )}
        </AnimatePresence>

        {/* Tagline 1: EXCLUSIVE PREMIUM FAÇADE SOLUTIONS */}
        <AnimatePresence mode="wait">
          {stage >= 2 && stage < 3 && (
            <motion.p
              key="tagline1"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-secondary text-[11px] md:text-[13px] font-light tracking-[0.35em] uppercase text-center"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              EXCLUSIVE PREMIUM FAÇADE SOLUTIONS
            </motion.p>
          )}

          {/* Tagline 2: ENGINEERING • INNOVATION • PERFORMANCE */}
          {stage >= 3 && (
            <motion.p
              key="tagline2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-secondary text-[11px] md:text-[13px] font-semibold tracking-[0.4em] uppercase text-center"
              style={{ color: '#0099E8', textShadow: '0 0 25px rgba(0,153,232,0.6)' }}
            >
              ENGINEERING • INNOVATION • PERFORMANCE
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
