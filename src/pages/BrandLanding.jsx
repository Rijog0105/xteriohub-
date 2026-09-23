import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { BRAND_DETAILS } from '../data/brandData';
import { getBrandAssets, getUniqueFeatureImages } from '../utils/getBrandAssets';
import { BRAND_CATALOGUES } from '../data/brandCataloguesData';
import FloatingFacadeElements from '../components/common/FloatingFacadeElements';

const spring = { type: 'spring', stiffness: 100, damping: 20 };

export default function BrandLanding() {
  const { brandId } = useParams();
  const normalizedId = (brandId || '').toLowerCase();
  
  const brand = BRAND_DETAILS[normalizedId];
  const assetsData = getBrandAssets(normalizedId);

  const brandCatalogues = BRAND_CATALOGUES[normalizedId] || [
    {
      fileName: `${brand?.name || 'Brand'}-Catalogue.pdf`,
      filePath: brand?.cataloguePdf || '/downloads',
      title: `${brand?.name || 'BRAND'} ARCHITECTURAL CATALOGUE`,
      subtitle: 'Technical Specifications & System Details',
      previewImage: assetsData.documentCover
    }
  ];

  const [hoveredDocIndex, setHoveredDocIndex] = useState(0);
  const [isSectionHovered, setIsSectionHovered] = useState(false);

  const activeDoc = brandCatalogues[hoveredDocIndex] || brandCatalogues[0];

  // Preload all document 1st page preview images for instant zero-lag hover rendering
  useEffect(() => {
    if (brandCatalogues && brandCatalogues.length > 0) {
      brandCatalogues.forEach(doc => {
        if (doc.previewImage) {
          const img = new Image();
          img.src = doc.previewImage;
        }
      });
    }
  }, [brandCatalogues]);

  const [heroIndex, setHeroIndex] = useState(0);

  // 5-second automatic hero slideshow timer
  useEffect(() => {
    if (!assetsData.heroImages.length) return;
    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % assetsData.heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [assetsData.heroImages]);

  // Scroll-driven dynamic fade to black for hero image
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [0.32, 0]);

  if (!brand) {
    return <Navigate to="/brands/frontek" replace />;
  }

  // Pick representative images for Collections & Projects magazine cards
  const collectionCover = assetsData.collectionImages[0] || assetsData.heroImages[1] || assetsData.heroImages[0];
  const projectCover = assetsData.projectImages[0] || assetsData.heroImages[2] || assetsData.heroImages[0];
  const aboutImage = assetsData.projectImages[1] || assetsData.collectionImages[1] || assetsData.heroImages[0];
  const catalogueImage = assetsData.documentCover;

  // Get unique supporting images for Why Choose points without repeating an image
  const pointsCount = brand.whyCards ? brand.whyCards.length : 6;
  const uniqueCardImages = getUniqueFeatureImages(normalizedId, pointsCount);

  return (
    <div className="relative w-full bg-black text-white overflow-x-hidden selection:bg-sky-500 selection:text-black">
      
      {/* Floating 3D Facade Elements & Slow-Motion Glowing Balls */}
      <FloatingFacadeElements />
      
      {/* ========================================================
          HERO BACKGROUND SLIDESHOW - Dynamically fades to black on scroll
         ======================================================== */}
      <motion.div 
        style={{ opacity: heroOpacity }}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{
              opacity: { duration: 2, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 7, ease: "linear" }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={assetsData.heroImages[heroIndex]}
              alt={`${brand.name} Architectural Background`}
              className="w-full h-full object-cover opacity-100 filter brightness-105 contrast-105 will-change-transform transform-gpu"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/45 to-black pointer-events-none" />
      </motion.div>

      {/* ========================================================
          HERO SECTION: Strictly Below Floating Navbar
         ======================================================== */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden z-10 pt-28 sm:pt-40 md:pt-56 lg:pt-64 pb-24 sm:pb-36">
        
        {/* Hero Overlay Content - 100% Center Aligned */}
        <div className="relative z-20 w-full max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 flex flex-col items-center justify-center text-center">
          
          {/* Transparent Brand Logo Stage */}
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`mb-14 flex items-center justify-center mx-auto bg-transparent border-none shadow-none pointer-events-none ${
              normalizedId === 'frontek'
                ? 'h-10 md:h-13 max-w-[150px] md:max-w-[180px]'
                : 'h-16 md:h-20 max-w-[220px] md:max-w-[260px]'
            }`}
          >
            <img
              src={assetsData.logo}
              alt={`${brand.name} Logo`}
              className="max-h-full w-auto object-contain filter brightness-110 drop-shadow-[0_6px_25px_rgba(0,0,0,0.95)]"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-primary font-extralight text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-zinc-200 max-w-4xl leading-[1.3] mb-8 text-center w-full"
          >
            {brand.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-secondary text-xs sm:text-base md:text-lg text-white/80 font-light max-w-2xl leading-relaxed mb-8 text-center mx-auto w-full"
          >
            {brand.subtitle}
          </motion.p>
        </div>

        {/* Hero Slideshow Controls */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {assetsData.heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === heroIndex ? 'w-10 bg-white shadow-[0_0_10px_#ffffff]' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ========================================================
          ABOUT THE BRAND: 100% Dead-Center Aligned Throughout
         ======================================================== */}
      <section 
        className="relative bg-transparent z-10"
        style={{ marginTop: '0px', marginBottom: '40px', paddingTop: '30px', paddingBottom: '40px' }}
      >
        <div className="max-w-[1500px] mx-auto px-6 md:px-16 lg:px-24">
          
          {/* Section Heading Container - Centered */}
          <div 
            className="w-full flex flex-col items-center justify-center text-center mx-auto"
            style={{ marginTop: '0px', marginBottom: '40px', paddingTop: '10px', paddingBottom: '10px' }}
          >
            <span className="font-mono text-xs font-light tracking-[0.35em] uppercase text-zinc-400 mb-3 block text-center w-full">
              BRAND OVERVIEW
            </span>
            <h2 className="font-primary text-xl sm:text-2xl md:text-3xl font-light text-white tracking-wide text-center w-full max-w-4xl mx-auto uppercase mb-3">
              About {brand.name}
            </h2>
            {brand.whySubtitle && (
              <h3 className="font-primary text-base sm:text-lg md:text-xl font-light italic text-zinc-300 text-center w-full max-w-3xl mx-auto tracking-wide">
                {brand.whySubtitle}
              </h3>
            )}
          </div>

          {/* Section 01 Content Stage */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Hero Architecture Portrait Image Stage */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/15 relative shadow-[0_25px_60px_rgba(0,0,0,0.9)] group"
            >
              <img
                src={aboutImage}
                alt={`${brand.name} Architectural Detail`}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] z-10 text-center">
                <p className="font-primary text-lg text-white font-light text-center w-full drop-shadow-md">
                  {brand.name} Architectural Systems
                </p>
              </div>
            </motion.div>

            {/* Styled Architectural Information Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center"
            >
              <div className="w-full p-8 md:p-10 rounded-3xl bg-[#07090e]/80 border border-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative group overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                
                <p className="font-secondary text-base md:text-lg text-white/95 font-light leading-relaxed mb-6 text-center w-full">
                  {brand.introduction}
                </p>

                <p className="font-secondary text-xs md:text-sm text-white/80 font-light leading-relaxed text-center w-full">
                  {brand.benefitsText || brand.technology || brand.history}
                </p>
              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* ========================================================
          02 / TECHNICAL ADVANTAGES: 100% Dead-Center Aligned
         ======================================================== */}
      <section 
        className="relative bg-transparent z-10 overflow-hidden"
        style={{ marginTop: '0px', marginBottom: '40px', paddingTop: '0px', paddingBottom: '40px' }}
      >
        <div className="max-w-[1500px] mx-auto px-6 md:px-16 lg:px-24">
          
          {/* Section 02 Heading Container - Centered */}
          <div 
            className="w-full flex flex-col items-center justify-center text-center mx-auto"
            style={{ marginTop: '0px', marginBottom: '60px', paddingTop: '30px', paddingBottom: '0px' }}
          >
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.4em] uppercase text-sky-400 mb-8 block text-center w-full">
              TECHNICAL ADVANTAGES
            </span>

            <h2 className="font-primary font-extralight text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-zinc-200 uppercase text-center w-full leading-[1.3]">
              {brand.whyHeading || `WHY CHOOSE ${brand.name}`}
            </h2>
          </div>

          {/* Alternating Feature Points - 100% Dead-Center Aligned */}
          <div className="flex flex-col gap-24 md:gap-32 w-full">
            {brand.whyCards && brand.whyCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: idx * 0.1 }}
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center justify-between w-full`}
              >
                {/* Feature Image Box with High-Contrast Finish */}
                <div className="w-full lg:w-1/2 aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/20 relative shadow-[0_20px_50px_rgba(0,0,0,0.85)] group shrink-0">
                  <img
                    src={card.image || uniqueCardImages[idx]}
                    alt={card.title}
                    className="w-full h-full object-cover filter brightness-105 contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Feature Content Box - 100% Dead-Center Aligned */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center px-2 sm:px-6">
                  <h3 className="font-primary text-xl sm:text-2xl md:text-3xl font-light text-white tracking-tight mb-4 text-center w-full uppercase">
                    {card.title}
                  </h3>

                  <p className="font-secondary text-sm md:text-base font-light text-white/90 leading-relaxed mb-6 max-w-xl text-center mx-auto">
                    {card.description}
                  </p>

                  <p className="font-secondary text-xs md:text-sm font-light text-white/70 leading-relaxed max-w-xl text-center mx-auto border-t border-white/10 pt-4">
                    {card.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================================
          03 / ARCHITECTURAL DESTINATIONS: COLLECTIONS & PROJECTS TILES
         ========================================================== */}
      <section 
        className="relative bg-transparent z-10 overflow-hidden"
        style={{ marginTop: '0px', marginBottom: '40px', paddingTop: '0px', paddingBottom: '40px' }}
      >
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16">
          
          {/* Section 03 Heading Container - Centered */}
          <div 
            className="w-full flex flex-col items-center justify-center text-center mx-auto"
            style={{ marginTop: '0px', marginBottom: '50px', paddingTop: '20px', paddingBottom: '0px' }}
          >
            <span className="font-mono text-xs font-light tracking-[0.4em] uppercase text-zinc-400 mb-4 block text-center w-full">
              EXPLORE {brand.name}
            </span>
            <h2 className="font-primary text-3xl sm:text-4xl md:text-5xl font-extralight text-white tracking-tight text-center w-full leading-[1.35]">
              Select Your <span className="font-serif italic text-white font-normal">Destination</span>
            </h2>
          </div>

          {/* 100% Dead-Centered Architectural Destination Cards Container */}
          <div className="w-full flex items-center justify-center text-center mx-auto">
            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 justify-items-center items-center text-center max-w-4xl w-full"
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
            >
              
              {/* DESTINATION CARD ONE: COLLECTIONS */}
              <Link
                to={`/brands/${brand.id}/collections`}
                className="group relative w-full max-w-[380px] sm:max-w-[420px] h-[260px] md:h-[280px] rounded-2xl overflow-hidden border border-white/20 bg-[#07090e]/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-white/50 transition-all duration-500 flex flex-col justify-between p-8 backdrop-blur-xl text-center items-center mx-auto"
              >
                {/* Glowing Top Edge Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                {/* Background Cover Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={collectionCover}
                    alt={`${brand.name} Collections`}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-[1.2s] ease-out filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 group-hover:via-black/40 transition-all duration-500" />
                </div>

                {/* Center Content: COLLECTION EXPLORER Title in Center */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center w-full mx-auto">
                  <h3 className="font-primary text-xl sm:text-2xl md:text-3xl font-light text-white tracking-tight leading-none group-hover:text-white transition-colors text-center w-full">
                    COLLECTIONS <span className="font-serif italic font-normal text-white/80">EXPLORER</span>
                  </h3>
                </div>

                {/* Plain Word Text Link with Arrow at the End / Bottom */}
                <div className="relative z-10 mt-auto text-center flex items-center justify-center w-full mx-auto">
                  <div className="font-primary text-xs md:text-sm font-light text-zinc-300 group-hover:text-white tracking-[0.2em] uppercase flex items-center gap-2 transition-colors">
                    <span>Explore Collections</span> <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                  </div>
                </div>
              </Link>

              {/* DESTINATION CARD TWO: PROJECTS */}
              <Link
                to={`/brands/${brand.id}/projects`}
                className="group relative w-full max-w-[380px] sm:max-w-[420px] h-[260px] md:h-[280px] rounded-2xl overflow-hidden border border-white/20 bg-[#07090e]/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-white/50 transition-all duration-500 flex flex-col justify-between p-8 backdrop-blur-xl text-center items-center mx-auto"
              >
                {/* Glowing Top Edge Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                {/* Background Cover Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={projectCover}
                    alt={`${brand.name} Projects`}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-[1.2s] ease-out filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 group-hover:via-black/40 transition-all duration-500" />
                </div>

                {/* Center Content: PROJECTS GALLERY Title in Center */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center w-full mx-auto">
                  <h3 className="font-primary text-xl sm:text-2xl md:text-3xl font-light text-white tracking-tight leading-none group-hover:text-white transition-colors text-center w-full">
                    PROJECTS <span className="font-serif italic font-normal text-white/80">GALLERY</span>
                  </h3>
                </div>

                {/* Plain Word Text Link with Arrow at the End / Bottom */}
                <div className="relative z-10 mt-auto text-center flex items-center justify-center w-full mx-auto">
                  <div className="font-primary text-xs md:text-sm font-light text-zinc-300 group-hover:text-white tracking-[0.2em] uppercase flex items-center gap-2 transition-colors">
                    <span>View Projects</span> <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                  </div>
                </div>
              </Link>

            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================
          04 / ARCHITECTURAL RESOURCES & CATALOGUE DOWNLOAD SECTION
         ========================================================== */}
      <section 
        className="relative w-full bg-transparent z-10 overflow-hidden flex flex-col items-center justify-center text-center"
        style={{ marginTop: '0px', marginBottom: '80px', paddingTop: '20px', paddingBottom: '80px' }}
      >
        <div 
          className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center text-center"
          onMouseEnter={() => setIsSectionHovered(true)}
          onMouseLeave={() => setIsSectionHovered(false)}
        >
          
          {/* Section Header Title with 3-4 Breaks Clearance */}
          <div className="w-full flex flex-col items-center justify-center text-center mb-16 sm:mb-24 md:mb-32 mx-auto">
            <h2 className="font-primary text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight leading-none text-center">
              ARCHITECTURAL <span className="font-serif italic font-normal text-zinc-300">CATALOGUES</span>
            </h2>
          </div>

          {/* Main Centered Container */}
          <div className="w-full flex flex-col items-center justify-center text-center mx-auto">
            
            {/* MAIN 1ST PAGE PREVIEW CONTAINER - CLEAN & TRANSPARENT */}
            <div className="group relative w-full max-w-[380px] sm:max-w-[440px] h-[300px] sm:h-[340px] rounded-2xl overflow-hidden bg-transparent transition-all duration-500 flex flex-col justify-between p-6 text-center items-center mx-auto my-0">
              
              {/* Glowing Top Edge Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500 z-20" />

              {/* 1st Page PDF Preview Image - Preloaded for Instant 0ms Hover Switching */}
              <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center p-4 bg-[#05070c] mx-auto text-center">
                <img
                  src={activeDoc.previewImage || assetsData.documentCover}
                  alt={`${activeDoc.title} 1st Page Preview`}
                  className="max-w-full max-h-full object-contain opacity-95 group-hover:opacity-100 group-hover:scale-[1.02] filter contrast-105 shadow-2xl rounded-sm mx-auto transition-transform duration-300 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />
              </div>
            </div>

            {/* Plain Word Download Link Below the Card */}
            <div className="w-full text-center flex items-center justify-center pt-8 md:pt-12 pb-2 mx-auto">
              <a
                href={activeDoc.filePath}
                download={activeDoc.fileName}
                className="group inline-flex items-center justify-center gap-2 font-primary text-sm md:text-base font-light text-zinc-300 hover:text-white tracking-[0.2em] uppercase transition-colors cursor-pointer"
              >
                <span>Download Catalogue</span> <span className="group-hover:translate-x-1.5 transition-transform">→</span>
              </a>
            </div>

            {/* CENTERED CATALOGUE OPTIONS (ALWAYS ACCESSIBLE ON MOBILE, HOVER-REVEALED ON DESKTOP) */}
            {brandCatalogues.length > 1 && (
              <div 
                className="w-full max-w-3xl flex flex-col items-center justify-center text-center gap-3 mx-auto mt-8 transition-all duration-500"
              >
                <div className="flex items-center justify-center gap-2 text-center mx-auto mb-1">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <h4 className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-300 text-center">
                    SELECT CATALOGUE ({brandCatalogues.length})
                  </h4>
                </div>

                <div className="w-full flex flex-wrap justify-center items-center text-center gap-3 mx-auto pb-2">
                  {brandCatalogues.map((doc, idx) => {
                    const isCurrentHovered = idx === hoveredDocIndex;
                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredDocIndex(idx)}
                        onClick={() => setHoveredDocIndex(idx)}
                        className={`group relative p-3 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer backdrop-blur-md text-center max-w-[280px] w-full ${
                          isCurrentHovered
                            ? 'border-white/40 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-[1.02]'
                            : 'border-white/10 bg-black/60 hover:border-white/30 hover:bg-black/80'
                        }`}
                      >
                        {/* Mini 1st Page Preview Thumbnail */}
                        <div className="relative w-10 h-14 rounded-md overflow-hidden border border-white/20 flex-shrink-0 bg-[#05070c] flex items-center justify-center p-0.5">
                          <img
                            src={doc.previewImage}
                            alt={doc.title}
                            className="max-w-full max-h-full object-contain opacity-95 group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Title & Subtitle - Centered */}
                        <div className="flex-1 min-w-0 text-center flex flex-col items-center justify-center">
                          <h5 className={`font-secondary text-xs font-semibold tracking-tight truncate text-center w-full ${
                            isCurrentHovered ? 'text-zinc-200' : 'text-white group-hover:text-zinc-300'
                          }`}>
                            {doc.title}
                          </h5>
                          
                          {/* Direct Download Plain Word Link */}
                          <a
                            href={doc.filePath}
                            download={doc.fileName}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center gap-1 font-mono text-[10px] font-bold text-zinc-400 hover:text-white uppercase tracking-wider mt-1 underline underline-offset-2 transition-colors mx-auto text-center"
                          >
                            <span>Download</span>
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

    </div>
  );
}
