import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BRAND_DETAILS } from '../data/brandData';
import { getBrandAssets } from '../utils/getBrandAssets';

const spring = { type: 'spring', stiffness: 120, damping: 20 };

export default function Brands() {
  const brandsList = Object.values(BRAND_DETAILS);
  const [mousePos, setMousePos] = useState({ x: 50, y: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMousePos({ x, y });
  };

  return (
    <div onMouseMove={handleMouseMove} className="relative min-h-screen bg-black text-white pb-44 md:pb-56 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-start text-center selection:bg-sky-500 selection:text-black overflow-hidden">
      
      {/* Balanced Top Clearance Spacer */}
      <div style={{ height: '130px', minHeight: '130px' }} className="w-full block shrink-0 pointer-events-none" />

      {/* PURE BLACK THEME WITH DYNAMIC SPOTLIGHT TORCH BEAM FOLLOWING CURSOR */}
      <div 
        className="pointer-events-none absolute inset-0 transition-all duration-150 ease-out"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 70%), radial-gradient(circle 900px at 50% 0%, rgba(255, 255, 255, 0.18) 0%, transparent 55%)`
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:72px_72px]" />

      {/* 100% DEAD-CENTER ALIGNED CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center text-center">
        
        {/* Page Header */}
        <div className="w-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-18 md:mb-24">
          <span className="font-mono text-[10px] sm:text-xs font-normal tracking-[0.3em] uppercase text-zinc-400 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-md text-center inline-block mb-6">
            GLOBAL BRAND PARTNERS
          </span>
          <h1 className="font-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin text-zinc-400 tracking-tight leading-snug text-center w-full">
            International Façade <span className="font-serif italic font-light text-white">Technologies</span>
          </h1>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent mt-8 mx-auto" />
        </div>

        {/* Brands Showcase Grid */}
        <div className="w-full max-w-[880px] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 justify-center items-center place-items-center text-center mx-auto mb-16 md:mb-24">
          {brandsList.map((brand, idx) => {
            const assetsData = getBrandAssets(brand.id);
            const coverImage = assetsData.heroImages[0] || assetsData.projectImages[0];

            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, ...spring }}
                className="group relative w-full max-w-[400px] h-[320px] rounded-2xl overflow-hidden border border-white/15 bg-black/90 shadow-2xl hover:border-white/50 transition-all duration-500 flex flex-col justify-end p-6 backdrop-blur-xl text-left mx-auto cursor-pointer"
              >
                {/* Glowing Top Edge Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                {/* Background Cover Image with High Opacity */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={coverImage}
                    alt={brand.name}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-[1.2s] ease-out filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30 group-hover:via-black/60 transition-all duration-500" />
                </div>

                {/* BOTTOM LEFT VERTICAL STACK WITH GENEROUS LINE SPACE */}
                <div className="relative z-10 flex flex-col items-start justify-end text-left w-full mt-auto space-y-6">
                  
                  {/* 1. Logo */}
                  <div className="h-10 max-w-[180px] flex items-center justify-start mb-3">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} Logo`}
                      className={`object-contain filter drop-shadow-lg brightness-110 ${
                        brand.id === 'frontek' ? 'max-h-6 sm:max-h-7 max-w-[130px]' : 'max-h-full max-w-full'
                      }`}
                    />
                  </div>

                  {/* 2. Brand Overview */}
                  <div className="pt-2">
                    <Link
                      to={`/brands/${brand.id}`}
                      className="font-primary font-light text-xs sm:text-sm tracking-[0.25em] text-zinc-200 hover:text-white uppercase transition-colors flex items-center gap-3 group/link"
                    >
                      <span>Brand Overview</span> <span className="group-hover/link:translate-x-1.5 transition-transform">→</span>
                    </Link>
                  </div>

                  {/* 3. Projects */}
                  <div className="pt-2">
                    <Link
                      to={`/brands/${brand.id}/projects`}
                      className="font-primary font-light text-xs sm:text-sm tracking-[0.25em] text-zinc-300 hover:text-white uppercase transition-colors flex items-center gap-3 group/link"
                    >
                      <span>Projects</span> <span className="group-hover/link:translate-x-1.5 transition-transform">→</span>
                    </Link>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Generous Bottom Spacer Block */}
        <div style={{ height: '120px', minHeight: '120px' }} className="w-full block shrink-0 pointer-events-none" />

      </div>
    </div>
  );
}
