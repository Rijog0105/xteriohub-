import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.3, y: y * 0.3 }); // 0.3 is the magnetic pull strength
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section ref={containerRef} className="relative w-full bg-transparent pt-12 pb-12 overflow-hidden">
      
      {/* Background Dots */}
      <div className="absolute inset-0 bg-grid-dots pointer-events-none opacity-[0.15]" />
      
      <div className="max-w-[1500px] mx-auto px-8 md:px-16 lg:px-24 relative z-10 flex flex-col items-center">
        
        {/* Massive Let's Talk CTA */}
        <motion.div 
          style={{ scale, opacity }}
          className="flex flex-col items-center justify-center w-full mb-8"
        >
          <span className="font-secondary text-[11px] font-semibold tracking-[0.45em] uppercase text-accent mb-8">
            COLLABORATION
          </span>

          <h2 className="font-primary font-extralight text-zinc-200 text-center mb-8 leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
          >
            Let's Talk.
          </h2>

          {/* Magnetic Button Area */}
          <div 
            className="p-12 cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              ref={buttonRef}
              animate={{ x: isHovered ? mousePos.x : 0, y: isHovered ? mousePos.y : 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
            >
              <Link to="/contact" className="relative block">
                <motion.div 
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-text flex items-center justify-center text-white"
                  animate={{ 
                    scale: isHovered ? 1.1 : 1,
                    backgroundColor: isHovered ? '#0099E8' : '#111827'
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                >
                  <span className="font-secondary text-[12px] font-semibold tracking-[0.2em] uppercase text-center w-full block">
                    Get In Touch
                  </span>
                  
                  {/* Custom Cursor Dot Follower inside button */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute w-2 h-2 bg-white rounded-full pointer-events-none"
                        style={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
