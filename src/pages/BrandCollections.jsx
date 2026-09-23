import { useMemo, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BRAND_DETAILS } from '../data/brandData';
import { getBrandAssets } from '../utils/getBrandAssets';
import { isGenericName, makeCategories } from '../utils/materialCollectionUtils';

const ease = [0.16, 1, 0.3, 1];

const makeRows = (items, size = 6) => items.reduce((rows, item, index) => {
  if (index % size === 0) rows.push([]);
  rows[rows.length - 1].push(item);
  return rows;
}, []);

function PanelCard({ item, onSelect, index }) {
  const showName = !isGenericName(item.name);
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ y: [0, -9, 0] }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        y: { duration: 4.2 + (index % 4) * 0.45, delay: (index % 5) * 0.18, repeat: Infinity, ease: 'easeInOut' },
        opacity: { duration: 0.55, delay: (index % 6) * 0.045, ease }
      }}
      whileHover={{ y: -20, scale: 1.075, transition: { type: 'spring', duration: 0.7, bounce: 0.32 } }}
      style={{ marginLeft: index === 0 ? 0 : '-2.25rem', zIndex: index + 1 }}
      className="group relative w-[158px] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-[#070708]/95 text-left shadow-[0_18px_35px_rgba(0,0,0,0.6)] transition-all hover:z-30 hover:border-white/40 hover:shadow-[0_22px_48px_rgba(255,255,255,0.12)] sm:w-[180px]"
    >
      <div 
        onClick={() => onSelect(item)}
        className="relative h-[168px] overflow-hidden bg-[#040609] sm:h-[190px] cursor-pointer"
      >
        <img src={item.image} alt={showName ? item.name : 'Facade panel'} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020407] via-transparent to-transparent" />
      </div>

      <div className="flex min-h-[52px] items-center justify-between gap-2 px-3 py-3">
        <div onClick={() => onSelect(item)} className="cursor-pointer">
          {showName && <h3 className="max-w-[108px] truncate font-primary text-sm font-light text-white">{item.name}</h3>}
          <span className="font-mono text-[8px] tracking-[0.16em] text-sky-400">PANEL</span>
        </div>
        <button
          type="button"
          onClick={() => onSelect(item)}
          className="font-mono text-[8px] tracking-widest text-white/50 hover:text-white transition-colors cursor-pointer"
          title="View Panel Details"
        >
          VIEW →
        </button>
      </div>
    </motion.div>
  );
}

function PanelViewer({ selected, brandId, onClose }) {
  const title = isGenericName(selected?.name || '') ? 'Facade Panel' : selected?.name;
  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={event => event.target === event.currentTarget && onClose()}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#020407]/85 p-4 sm:p-6 backdrop-blur-lg overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease }}
            className="grid w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#090f18] shadow-[0_30px_100px_rgba(0,0,0,0.7)] md:grid-cols-[280px_1fr] relative my-auto"
          >
            {/* Quick Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center font-mono text-xs cursor-pointer md:hidden backdrop-blur-md"
              aria-label="Close panel view"
            >
              ✕
            </button>

            <div className="flex min-h-[220px] md:min-h-[300px] items-center justify-center bg-[radial-gradient(circle_at_center,rgba(14,116,144,0.2),transparent_65%)] p-6 sm:p-10">
              <div className="aspect-[3/4] w-full max-w-[140px] sm:max-w-[170px] overflow-hidden rounded-xl border border-white/15 bg-black shadow-2xl">
                <img src={selected.image} alt={title} className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="p-6 sm:p-7 md:p-9 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] tracking-[0.22em] text-sky-400 uppercase">
                  {selected.category}
                </span>
                <h2 className="mt-2 sm:mt-3 font-primary text-2xl sm:text-3xl font-light text-white uppercase tracking-wide">
                  {title}
                </h2>
                <p className="mt-3 sm:mt-4 font-secondary text-xs sm:text-sm leading-6 text-white/60">
                  High-performance architectural façade cladding panel. Available for physical project specification and material samples.
                </p>

                {selected.dimensionImage && (
                  <div className="mt-5 sm:mt-6 border-t border-white/10 pt-4 sm:pt-5">
                    <p className="font-mono text-[9px] tracking-[0.2em] text-white/45 uppercase mb-2 sm:mb-3">TECHNICAL DIMENSIONS</p>
                    <div className="rounded-xl border border-white/10 bg-black p-3 shadow-inner">
                      <img src={selected.dimensionImage} alt={`${selected.category} dimensions`} className="max-h-32 sm:max-h-36 w-full bg-black object-contain brightness-110 contrast-125" />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 sm:mt-8 flex items-center gap-4 flex-wrap pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-full bg-white text-black font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-zinc-200 transition-all duration-300 cursor-pointer shadow-lg font-medium"
                >
                  CLOSE SPECIFICATION
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function BrandCollections() {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const normalizedId = (brandId || '').toLowerCase();
  const brand = BRAND_DETAILS[normalizedId];
  const assetsData = getBrandAssets(normalizedId);
  const [selected, setSelected] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMousePos({ x, y });
  };

  const categories = useMemo(() => makeCategories(assetsData.collectionImages, normalizedId), [assetsData.collectionImages, normalizedId]);
  if (!brand) return <Navigate to="/brands/frontek" replace />;

  return (
    <div onMouseMove={handleMouseMove} className="brand-collections-page relative min-h-screen overflow-hidden bg-black pb-28 sm:pb-48 md:pb-64 text-white selection:bg-white selection:text-black">
      <style>{` .brand-collections-page header { position: relative; margin-top: 1rem !important; margin-bottom: 3rem !important; border-bottom: 0 !important; } .brand-collections-page header::after { content: ''; position: absolute; right: 0; bottom: 0; left: 0; height: 1px; background: rgba(255,255,255,0.1); } .brand-collections-page h2, .brand-collections-page h3 { text-transform: uppercase; } .brand-collections-page header p { display: none; } .brand-collections-page section + section { margin-top: 5rem !important; } @media (min-width: 768px) { .brand-collections-page header { margin-top: 2rem !important; margin-bottom: 6rem !important; } .brand-collections-page section + section { margin-top: 8rem !important; } .brand-collections-page header::after { transform: translateX(3vw); } .brand-collections-page header > span { display: inline-block; transform: translateX(3vw); } .brand-collections-page header h1 { transform: translateX(3vw); } .brand-collections-page section:nth-child(odd) { transform: translateX(-5vw); } .brand-collections-page section:nth-child(even) { transform: translateX(12vw); } .brand-collections-page section > div:first-child { transform: none !important; } }`}</style>
      
      {/* PURE BLACK THEME WITH DYNAMIC SPOTLIGHT TORCH BEAM FOLLOWING CURSOR */}
      <div 
        className="pointer-events-none absolute inset-0 transition-all duration-150 ease-out"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 70%), radial-gradient(circle 900px at 50% 0%, rgba(255, 255, 255, 0.18) 0%, transparent 55%)`
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:72px_72px]" />
      
      {/* Top Clearance Spacer Below Floating Top Navbar */}
      <div className="w-full h-24 sm:h-32 md:h-[130px] shrink-0 pointer-events-none" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center overflow-x-hidden px-4 sm:px-8 md:px-12 lg:px-20">

        <header className="mx-auto mb-16 md:mb-24 mt-4 md:mt-8 max-w-4xl border-b border-white/10 pb-8 md:pb-12 text-center md:translate-x-[1vw]">
          <h1 className="font-primary text-3xl sm:text-5xl md:text-7xl font-light tracking-tight text-white">Collections & <span className="italic text-white/65">Finishes</span></h1>
          <p className="mx-auto mt-4 md:mt-6 max-w-2xl font-secondary text-xs sm:text-sm md:text-base leading-6 md:leading-7 text-white/60">Browse the {brand.name} material library by category. Select any panel to inspect its technical dimensions and physical specifications.</p>
        </header>

        <div className="w-full space-y-20 md:space-y-32 lg:space-y-40">
          {categories.map((category) => (
            <section key={category.name} className="mx-auto w-full max-w-[1120px]">
              <div className="mb-6 md:mb-10 flex flex-col items-center gap-2 md:gap-3 border-b border-white/10 pb-4 md:pb-6 text-center md:translate-x-[3vw]">
                <h2 className="font-primary text-xl sm:text-2xl md:text-3xl font-extralight text-zinc-200 tracking-tight">{category.name}</h2>
              </div>

              {/* Mobile Touch-Friendly Grid (md:hidden) */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden w-full max-w-md mx-auto">
                {category.items.map((item) => (
                  <div
                    key={item.key}
                    onClick={() => setSelected({ ...item, category: category.name, dimensionImage: category.dimensionImage })}
                    className="group relative flex flex-col rounded-xl border border-white/15 bg-[#070708]/95 overflow-hidden shadow-lg active:scale-95 transition-transform cursor-pointer"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-[#040609]">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020407] via-transparent to-transparent" />
                    </div>
                    <div className="p-2.5 flex items-center justify-between gap-1">
                      <div className="truncate">
                        <h3 className="truncate font-primary text-xs font-light text-white">
                          {!isGenericName(item.name) ? item.name : 'Panel'}
                        </h3>
                        <span className="font-mono text-[8px] tracking-wider text-sky-400">PANEL</span>
                      </div>
                      <span className="font-mono text-[8px] text-white/60 shrink-0">VIEW →</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Floating Deck with Overlapping Offset (hidden md:block) */}
              <div className="hidden md:block mx-auto w-full max-w-[75vw] space-y-12 overflow-visible px-10 pb-5 pt-5">
                {makeRows(category.items).map((row, rowIndex) => (
                  <div key={`${category.name}-${rowIndex}`} style={{ transform: `translateX(${Math.max(0, row.length - 1) * 18}px)` }} className="flex justify-center overflow-visible">
                    {row.map((item, index) => (
                      <PanelCard
                        key={item.key}
                        item={item}
                        index={index}
                        onSelect={() => setSelected({ ...item, category: category.name, dimensionImage: category.dimensionImage })}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Generous Bottom Clearance Spacer Before Footer */}
        <div className="w-full h-24 sm:h-36 md:h-56 shrink-0 pointer-events-none" />

      </div>
      <PanelViewer
        selected={selected}
        brandId={normalizedId}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
