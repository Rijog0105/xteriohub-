import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_DETAILS } from '../data/brandData';
import { getBrandAssets } from '../utils/getBrandAssets';
import FloatingFacadeElements from '../components/common/FloatingFacadeElements';

const spring = { type: 'spring', stiffness: 120, damping: 20 };

export default function BrandProjects() {
  const { brandId } = useParams();
  const normalizedId = (brandId || '').toLowerCase();
  
  const brand = BRAND_DETAILS[normalizedId];
  const assetsData = getBrandAssets(normalizedId);
  const [selectedImg, setSelectedImg] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMousePos({ x, y });
  };

  if (!brand) {
    return <Navigate to="/brands/frontek" replace />;
  }

  const projects = assetsData.projectImages.length > 0 
    ? assetsData.projectImages 
    : assetsData.heroImages;

  return (
    <div onMouseMove={handleMouseMove} className="relative min-h-screen overflow-hidden bg-black pb-48 md:pb-64 lg:pb-72 text-white selection:bg-white selection:text-black">
      <FloatingFacadeElements />
      
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
        
        {/* Page Header Pushed Towards the Right with Massive Bottom Clearance */}
        <div className="ml-auto mr-0 md:mr-[4vw] max-w-3xl border-b border-white/10 pb-16 mb-16 text-center md:text-right flex flex-col items-center md:items-end">
          <h1 className="font-primary text-5xl md:text-7xl font-light text-white tracking-tight inline-block md:translate-x-[22vw]">
            Architectural <span className="font-normal italic text-white/65">Projects</span>
          </h1>
        </div>

        {/* CLEARANCE SPACER BETWEEN HEADER AND PROJECTS GRID */}
        <div style={{ height: '120px', minHeight: '120px' }} className="w-full block shrink-0 pointer-events-none" />

        {/* Projects Centered Gallery Grid with Generous Bottom Margin */}
        <div className="flex flex-wrap justify-center gap-10 mb-24 md:mb-36 lg:mb-44">
          {projects.map((img, idx) => {
            const filename = img.split('/').pop()?.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || `Project Case Study ${idx + 1}`;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, ...spring }}
                whileHover={{ rotateX: 6, rotateY: -6, scale: 1.04, z: 25 }}
                style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
                onClick={() => setSelectedImg(img)}
                className="group cursor-pointer rounded-3xl overflow-hidden p-2 bg-gradient-to-b from-white/20 via-white/10 to-white/5 border border-white/20 backdrop-blur-3xl shadow-[0_20px_45px_rgba(0,0,0,0.7)] hover:border-white/60 hover:from-white/35 hover:to-white/15 hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] transition-all duration-500 w-full md:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.75rem)] max-w-[340px] aspect-[16/11] relative"
              >
                {/* Inner Framed Container with Deep Translucent Dark Glass Backdrop */}
                <div className="w-full h-full rounded-[1.25rem] overflow-hidden relative bg-[#131418]/80 backdrop-blur-xl border border-white/10">
                  <img
                    src={img}
                    alt={filename}
                    className="w-full h-full object-cover group-hover:scale-108 group-hover:blur-[3.5px] transition-all duration-700 ease-out"
                  />
                  
                  {/* 30% Blurred Hover Glass Overlay with Centered Project Name */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center border border-white/20 rounded-[1.25rem]">
                    <span className="font-mono text-[10px] font-medium tracking-[0.24em] text-white/70 uppercase block mb-2">
                      {brand.name} INSTALLATION
                    </span>
                    <h3 className="font-primary text-2xl font-light text-white capitalize leading-snug mb-3">
                      {filename}
                    </h3>
                    <span className="font-mono text-[10px] tracking-widest text-white/60 group-hover:text-white transition-colors border-b border-white/30 pb-0.5">
                      VIEW PHOTO [↗]
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CLEARANCE SPACER BETWEEN GALLERY GRID AND CALLOUT */}
        <div style={{ height: '160px', minHeight: '160px' }} className="w-full block shrink-0 pointer-events-none" />

        {/* Transparent Styled Contact Text Link (Without Card Box) */}
        <div className="mt-16 md:mt-24 flex flex-col items-center justify-center text-center max-w-4xl mx-auto md:translate-x-[22vw] md:ml-[13vw]">
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 font-primary text-sm sm:text-base md:text-lg font-light text-zinc-300 hover:text-white tracking-[0.25em] uppercase transition-colors cursor-pointer"
          >
            <span>For More Content, Contact Xteriohub</span> <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
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
                  src={selectedImg}
                  alt="High Resolution Project Preview"
                  className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
                />
                <p className="font-mono text-xs text-white/70 mt-4 tracking-widest uppercase">
                  {selectedImg.split('/').pop()}
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
