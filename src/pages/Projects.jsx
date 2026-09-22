import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_DETAILS } from '../data/brandData';
import { getBrandAssets } from '../utils/getBrandAssets';
import FloatingFacadeElements from '../components/common/FloatingFacadeElements';

const spring = { type: 'spring', stiffness: 120, damping: 20 };

export default function Projects() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [activeBrand, setActiveBrand] = useState('all');
  const [mousePos, setMousePos] = useState({ x: 50, y: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMousePos({ x, y });
  };

  const brandKeys = Object.keys(BRAND_DETAILS);

  // Gather projects across all brands
  const allProjects = brandKeys.flatMap(bId => {
    const brand = BRAND_DETAILS[bId];
    const assets = getBrandAssets(bId);
    const imgs = assets.projectImages.length > 0 ? assets.projectImages : assets.heroImages;
    return imgs.map((img, idx) => ({
      img,
      brandId: bId,
      brandName: brand.name,
      title: img.split('/').pop()?.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || `${brand.name} Project ${idx + 1}`
    }));
  });

  const filteredProjects = activeBrand === 'all'
    ? allProjects
    : allProjects.filter(p => p.brandId === activeBrand);

  return (
    <div onMouseMove={handleMouseMove} className="relative min-h-screen overflow-hidden bg-black pb-48 md:pb-64 lg:pb-72 text-white selection:bg-white selection:text-black">
      {/* PURE BLACK THEME WITH DYNAMIC SPOTLIGHT TORCH BEAM FOLLOWING CURSOR */}
      <div 
        className="pointer-events-none absolute inset-0 transition-all duration-150 ease-out"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 70%), radial-gradient(circle 900px at 50% 0%, rgba(255, 255, 255, 0.18) 0%, transparent 55%)`
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:72px_72px]" />

      {/* Top Clearance Spacer Below Floating Top Navbar */}
      <div style={{ height: '140px', minHeight: '140px' }} className="w-full block shrink-0 pointer-events-none" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Page Header Pushed Towards the Right with Massive Clearance */}
        <div className="ml-auto mr-0 md:mr-[4vw] max-w-3xl border-b border-white/10 pb-16 mb-16 text-center md:text-right flex flex-col items-center md:items-end">
          <span className="font-mono text-xs font-normal tracking-[0.36em] text-white/75 uppercase inline-block mb-4 md:translate-x-[13vw]">
            GLOBAL PORTFOLIO // ALL BRANDS
          </span>
          <h1 className="font-primary text-5xl md:text-7xl font-light text-white tracking-tight inline-block md:translate-x-[22vw]">
            Architectural <span className="font-normal italic text-white/65">Projects</span>
          </h1>
        </div>

        {/* CLEARANCE SPACER BETWEEN HEADER AND PROJECTS GRID */}
        <div style={{ height: '120px', minHeight: '120px' }} className="w-full block shrink-0 pointer-events-none" />

        {/* Brand Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 mb-24 md:mb-32 lg:mb-36 ml-auto mr-0 md:mr-[4vw]">
          <button
            onClick={() => setActiveBrand('all')}
            className={`px-5 py-2 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
              activeBrand === 'all'
                ? 'bg-white text-black font-semibold shadow-lg'
                : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            All Projects ({allProjects.length})
          </button>
          {brandKeys.map(bId => {
            const bName = BRAND_DETAILS[bId].name;
            const bCount = allProjects.filter(p => p.brandId === bId).length;
            return (
              <button
                key={bId}
                onClick={() => setActiveBrand(bId)}
                className={`px-5 py-2 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                  activeBrand === bId
                    ? 'bg-white text-black font-semibold shadow-lg'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {bName} ({bCount})
              </button>
            );
          })}
        </div>

        {/* Projects Centered Gallery Grid with Generous Bottom Margin */}
        <div className="flex flex-wrap justify-center gap-10 mb-24 md:mb-36 lg:mb-44">
          {filteredProjects.map((item, idx) => (
            <motion.div
              key={`${item.brandId}-${idx}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 6) * 0.06, ...spring }}
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.04, z: 25 }}
              style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
              onClick={() => setSelectedImg(item)}
              className="group cursor-pointer rounded-3xl overflow-hidden p-2 bg-gradient-to-b from-white/20 via-white/10 to-white/5 border border-white/20 backdrop-blur-3xl shadow-[0_20px_45px_rgba(0,0,0,0.7)] hover:border-white/60 hover:from-white/35 hover:to-white/15 hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] transition-all duration-500 w-full md:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.75rem)] max-w-[460px] aspect-[16/11] relative"
            >
              {/* Inner Framed Container with Deep Translucent Dark Glass Backdrop */}
              <div className="w-full h-full rounded-[1.25rem] overflow-hidden relative bg-[#131418]/80 backdrop-blur-xl border border-white/10">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 group-hover:blur-[3.5px] transition-all duration-700 ease-out"
                />
                
                {/* 30% Blurred Hover Glass Overlay with Centered Project Name */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center border border-white/20 rounded-[1.25rem]">
                  <span className="font-mono text-[10px] font-medium tracking-[0.24em] text-white/70 uppercase block mb-2">
                    {item.brandName} INSTALLATION
                  </span>
                  <h3 className="font-primary text-2xl font-light text-white capitalize leading-snug mb-3">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[10px] tracking-widest text-white/60 group-hover:text-white transition-colors border-b border-white/30 pb-0.5">
                    VIEW PHOTO [↗]
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CLEARANCE SPACER BETWEEN GALLERY GRID AND CALLOUT CARD */}
        <div style={{ height: '160px', minHeight: '160px' }} className="w-full block shrink-0 pointer-events-none" />

        {/* Luxury Translucent Grey Contact XterioHub Callout Card (Nudged Tiny Bit Left) */}
        <div className="mt-16 md:mt-24 flex flex-col items-center justify-center text-center p-14 md:p-20 lg:p-24 rounded-[2.5rem] border border-white/25 bg-[#1c1d22]/90 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] max-w-4xl mx-auto md:translate-x-[22vw] md:ml-[13vw]">
          <span className="font-mono text-xs md:text-sm font-normal tracking-[0.38em] text-white/70 uppercase block mb-6">
            ARCHITECTURAL REFERENCE LIBRARY
          </span>
          <h3 className="font-primary text-3xl md:text-5xl font-light text-white mb-8 leading-snug tracking-tight">
            Need additional high-resolution imagery?
          </h3>
          <p className="font-secondary text-base md:text-lg text-white/70 font-light max-w-2xl mb-12 leading-[1.9]">
            For complete architectural photo archives, facade engineering submittals, and site-specific case studies, reach out directly.
          </p>
          <a
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-gradient-to-r from-white via-neutral-100 to-neutral-300 text-black font-mono text-xs font-bold tracking-[0.25em] uppercase shadow-[0_10px_35px_rgba(255,255,255,0.25)] hover:shadow-[0_15px_45px_rgba(255,255,255,0.45)] hover:scale-105 transition-all duration-500 overflow-hidden border border-white/50"
          >
            <span className="relative z-10 flex items-center gap-3">
              For More Photos, Contact XterioHub
              <span className="text-sm font-semibold group-hover:translate-x-1.5 transition-transform duration-300">↗</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </a>
        </div>

        {/* Modal Lightbox */}
        <AnimatePresence>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 cursor-pointer"
            >
              <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
                <img
                  src={selectedImg.img}
                  alt="High Resolution Project Preview"
                  className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
                />
                <p className="font-mono text-xs text-white/70 mt-4 tracking-widest uppercase">
                  {selectedImg.brandName} // {selectedImg.title}
                </p>
                <button
                  onClick={() => setSelectedImg(null)}
                  className="absolute -top-12 right-0 font-mono text-xs text-white/70 hover:text-white uppercase tracking-widest"
                >
                  Close [✕]
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generous Bottom Clearance Spacer Before Footer */}
        <div style={{ height: '220px', minHeight: '220px' }} className="w-full block shrink-0 pointer-events-none" />

      </div>
    </div>
  );
}
