import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../data/assets';

const PROJECTS = [
  { id: 1, title: 'Ekta Elitus', location: 'Mumbai, India', material: 'Frontek', image: '/assets/Brands/frontek/projects/portfolio-ekta-elitus.png' },
  { id: 2, title: 'Britacel', location: 'Mumbai, India', material: 'Frontek', image: '/assets/Brands/frontek/projects/portfolio-britacel.jpg', fitContain: true },
  { id: 3, title: 'Nirlon NZURI', location: 'Pune, India', material: 'Frontek', image: '/assets/Brands/frontek/projects/portfolio-nirlon-nzuri.png' },
  { id: 4, title: 'Sebastopol Residences', location: 'Caulfield, Australia', material: 'Frontek', image: '/assets/Brands/frontek/projects/portfolio-sebastopol-residences.png' }
];

export default function FeaturedProjects() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeMobileProject, setActiveMobileProject] = useState(null);
  const timerRef = useRef(null);

  const bgImage = hoveredProject ? PROJECTS.find(p => p.id === hoveredProject)?.image : null;

  // Touch / Click handler for mobile phones (shows small preview in front for 5s)
  const handleProjectSelect = (proj) => {
    // Clear any active timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActiveMobileProject(proj);

    // Auto-dismiss after 5 seconds so user can select the next project
    timerRef.current = setTimeout(() => {
      setActiveMobileProject(null);
    }, 5000);
  };

  const handleCloseMobilePreview = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActiveMobileProject(null);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden bg-transparent z-10 transition-colors duration-1000">
      
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10 md:px-16 lg:px-24 relative z-10">

        {/* Minimalist Left-Aligned Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 md:mb-20 gap-6 sm:gap-10">
          <div>
            <span className="font-secondary text-[11px] font-semibold tracking-[0.4em] uppercase block mb-3 sm:mb-4" style={{ color: '#0099E8' }}>
              PORTFOLIO
            </span>
            <h2 className="font-primary font-extralight text-zinc-200"
              style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', letterSpacing: '-0.03em', wordSpacing: '0.06em' }}
            >
              Featured Works.
            </h2>
          </div>
          <Link to="/projects"
            className="group inline-flex items-center gap-4 font-secondary text-[11px] font-semibold tracking-[0.3em] uppercase text-white/50 transition-colors hover:text-white pb-2 sm:pb-4"
          >
            Explore Archive
            <span className="group-hover:translate-x-2 transition-transform duration-300 text-lg">→</span>
          </Link>
        </div>

        {/* Content Layout: List on Left, Preview on Right */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Project List */}
          <div className="w-full lg:w-[60%] flex flex-col border-t border-white/10">
            {PROJECTS.map((proj) => (
              <div 
                key={proj.id}
                className="group relative flex flex-col justify-center py-6 sm:py-10 md:py-14 border-b border-white/10 cursor-pointer active:bg-white/[0.02] transition-colors"
                onMouseEnter={() => setHoveredProject(proj.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => handleProjectSelect(proj)}
              >
                <div className="flex flex-col gap-1.5 sm:gap-2 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-secondary text-[10px] tracking-[0.3em] uppercase text-accent opacity-75 group-hover:opacity-100 transition-opacity duration-500">
                      {proj.material}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-primary text-2xl sm:text-4xl md:text-5xl font-light text-white/60 group-hover:text-white transition-colors duration-500" style={{ letterSpacing: '-0.02em' }}>
                      {proj.title}
                    </h3>
                    <p className="font-secondary text-xs sm:text-sm font-light text-white/30 group-hover:text-white/70 transition-colors duration-500 hidden sm:block">
                      {proj.location}
                    </p>
                  </div>
                  <p className="font-secondary text-[11px] text-white/30 sm:hidden">
                    {proj.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Laptop / Desktop Preview Box (Hover-driven) */}
          <div className="hidden lg:flex w-[40%] justify-end">
            <div className="w-full max-w-[350px] aspect-[4/5] rounded-[1.8rem] overflow-hidden bg-black/40 border border-white/10 relative shadow-2xl">
              {PROJECTS.map((proj) => (
                <img
                  key={proj.id}
                  src={proj.image}
                  alt={proj.title}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                    proj.fitContain ? 'object-contain p-2 bg-black' : 'object-cover'
                  } ${
                    bgImage === proj.image 
                      ? 'opacity-95 scale-100' 
                      : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                />
              ))}
              {!bgImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-secondary text-[11px] tracking-[0.2em] uppercase text-white/30">
                    Hover to preview
                  </span>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>

      {/* ========================================================
          MOBILE TOUCH PREVIEW POPUP IN FRONT (CLEAN PREVIEW WITHOUT TIMER UI)
         ======================================================== */}
      <AnimatePresence>
        {activeMobileProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseMobilePreview}
            className="fixed inset-0 z-[70] flex items-center justify-center p-5 bg-black/80 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[310px] rounded-3xl overflow-hidden border border-white/20 bg-[#090b10]/95 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-4 flex flex-col"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />

              {/* Top Bar inside card */}
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-sky-400 uppercase">
                  {activeMobileProject.material}
                </span>
                <button
                  type="button"
                  onClick={handleCloseMobilePreview}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-mono cursor-pointer"
                  aria-label="Close preview"
                >
                  ✕
                </button>
              </div>

              {/* Project Image Preview */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-black/80 border border-white/10 shadow-inner flex items-center justify-center">
                <img
                  src={activeMobileProject.image}
                  alt={activeMobileProject.title}
                  className={`w-full h-full ${
                    activeMobileProject.fitContain ? 'object-contain p-2 bg-black' : 'object-cover'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Project Details Overlay */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-left">
                  <h4 className="font-primary text-xl font-light text-white tracking-tight leading-snug">
                    {activeMobileProject.title}
                  </h4>
                  <p className="font-secondary text-xs font-light text-white/75 mt-0.5">
                    {activeMobileProject.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
