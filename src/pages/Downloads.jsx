import { useState } from 'react';
import { motion } from 'framer-motion';
import { BRAND_CATALOGUES } from '../data/brandCataloguesData';
import FloatingFacadeElements from '../components/common/FloatingFacadeElements';
import ConsultationModal from '../components/common/ConsultationModal';

const spring = { type: 'spring', stiffness: 120, damping: 20 };

export default function Downloads() {
  const [activeBrand, setActiveBrand] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMousePos({ x, y });
  };

  const brandKeys = Object.keys(BRAND_CATALOGUES);

  // Flatten catalogues with brand metadata
  const allCatalogues = brandKeys.flatMap(brand => {
    return (BRAND_CATALOGUES[brand] || []).map(cat => ({
      ...cat,
      brandKey: brand,
      brandName: brand.toUpperCase()
    }));
  });

  const filteredCatalogues = activeBrand === 'all'
    ? allCatalogues
    : allCatalogues.filter(c => c.brandKey === activeBrand);

  return (
    <div onMouseMove={handleMouseMove} className="relative min-h-screen bg-black text-white pb-32 sm:pb-48 md:pb-64 overflow-x-hidden selection:bg-sky-500 selection:text-black">
      <FloatingFacadeElements />

      {/* PURE BLACK THEME WITH DYNAMIC SPOTLIGHT TORCH BEAM */}
      <div 
        className="pointer-events-none absolute inset-0 transition-all duration-150 ease-out"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 70%), radial-gradient(circle 900px at 50% 0%, rgba(255, 255, 255, 0.18) 0%, transparent 55%)`
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:72px_72px]" />

      {/* Top Spacer */}
      <div className="w-full h-24 sm:h-32 md:h-[130px] shrink-0 pointer-events-none" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        
        {/* Editorial Header */}
        <div className="max-w-3xl border-b border-white/10 pb-8 sm:pb-14 mb-8 sm:mb-12 text-center md:text-left mx-auto md:mx-0">
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.35em] text-sky-400 uppercase inline-block mb-3">
            TECHNICAL DOCUMENTATION // SPECIFICATION GUIDES
          </span>
          <h1 className="font-primary text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-tight">
            Architectural <span className="font-serif italic font-normal text-white/80">Catalogues</span>
          </h1>
          <p className="mt-4 font-secondary text-xs sm:text-sm md:text-base text-white/60 font-light leading-relaxed max-w-xl">
            Download comprehensive technical catalogues, architectural drawing guides, and structural façade installation specifications.
          </p>
        </div>

        {/* Brand Filter Tabs (Horizontally scrollable on mobile) */}
        <div className="flex items-center justify-start md:justify-start gap-2.5 overflow-x-auto no-scrollbar pb-3 mb-10 sm:mb-16 w-full max-w-full px-1">
          <button
            onClick={() => setActiveBrand('all')}
            className={`px-4 sm:px-5 py-2 rounded-full font-mono text-[11px] sm:text-xs tracking-widest uppercase transition-all duration-300 shrink-0 cursor-pointer ${
              activeBrand === 'all'
                ? 'bg-white text-black font-semibold shadow-lg'
                : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            All Catalogues ({allCatalogues.length})
          </button>
          {brandKeys.map(bKey => (
            <button
              key={bKey}
              onClick={() => setActiveBrand(bKey)}
              className={`px-4 sm:px-5 py-2 rounded-full font-mono text-[11px] sm:text-xs tracking-widest uppercase transition-all duration-300 shrink-0 cursor-pointer ${
                activeBrand === bKey
                  ? 'bg-white text-black font-semibold shadow-lg'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {bKey.toUpperCase()} ({BRAND_CATALOGUES[bKey]?.length || 0})
            </button>
          ))}
        </div>

        {/* Catalogues Responsive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          {filteredCatalogues.map((item, idx) => (
            <motion.div
              key={`${item.fileName}-${idx}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, ...spring }}
              className="group relative w-full max-w-[340px] rounded-2xl overflow-hidden border border-white/15 bg-[#090b10]/90 backdrop-blur-xl shadow-xl flex flex-col justify-between p-5 hover:border-sky-400/50 hover:shadow-[0_0_35px_rgba(0,153,232,0.25)] transition-all duration-500"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent group-hover:via-sky-400 transition-all duration-500" />

              {/* 1st Page Preview Image */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#040609] border border-white/10 p-2 flex items-center justify-center mb-4">
                <img
                  src={item.previewImage}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 filter contrast-105 shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-3 left-3 font-mono text-[9px] font-bold tracking-widest text-sky-400 bg-black/80 px-2.5 py-1 rounded-md border border-white/10">
                  {item.brandName}
                </span>
              </div>

              {/* Document Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-primary text-sm sm:text-base font-medium text-white tracking-tight leading-snug mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="font-secondary text-xs text-white/50 font-light mb-4">
                    {item.subtitle || 'Technical Façade Submittal'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <a
                    href={item.filePath}
                    download={item.fileName}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white text-black font-mono text-[10px] font-bold tracking-wider uppercase hover:bg-sky-400 hover:text-black transition-colors cursor-pointer"
                  >
                    <span>Download PDF</span>
                    <span>↓</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white font-mono text-[10px] font-medium tracking-wider uppercase transition-colors cursor-pointer"
                    title="Request printed sample"
                  >
                    Sample
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
