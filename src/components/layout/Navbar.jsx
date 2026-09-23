import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { assets } from '../../data/assets';
import ConsultationModal from '../common/ConsultationModal';

const NAV_LINKS = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT', path: '/about' },
  { 
    name: 'OUR BRANDS', 
    path: '/brands',
    dropdown: [
      {
        name: 'FRONTEK',
        path: '/brands/frontek',
        sub: [
          { name: 'Collections', path: '/brands/frontek/collections' },
          { name: 'Projects', path: '/brands/frontek/projects' }
        ]
      },
      {
        name: 'TEMPIO',
        path: '/brands/tempio',
        sub: [
          { name: 'Collections', path: '/brands/tempio/collections' },
          { name: 'Projects', path: '/brands/tempio/projects' }
        ]
      },
      {
        name: 'STENI',
        path: '/brands/steni',
        sub: [
          { name: 'Collections', path: '/brands/steni/collections' },
          { name: 'Projects', path: '/brands/steni/projects' }
        ]
      },
      {
        name: 'TECHLAM',
        path: '/brands/techlam',
        sub: [
          { name: 'Collections', path: '/brands/techlam/collections' },
          { name: 'Projects', path: '/brands/techlam/projects' }
        ]
      }
    ]
  },
  { name: 'CONTACT', path: '/contact' }
];

export default function Navbar({ visible = true, onOpenConsultation }) {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandsAccordionOpen, setBrandsAccordionOpen] = useState(false);
  const location = useLocation();
  const logoUrl = assets.logos.find(l => l.includes('xteriohub')) || assets.logos[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConsultationClick = () => {
    setMobileMenuOpen(false);
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      setModalOpen(true);
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setBrandsAccordionOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            className={cn(
              'fixed top-0 left-0 right-0 z-[100] h-[76px] sm:h-[84px] md:h-[90px] flex items-center transition-all duration-500',
              scrolled || mobileMenuOpen
                ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                : 'bg-transparent'
            )}
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-16 xl:px-28 flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="shrink-0 group flex items-center">
                <img
                  src={logoUrl}
                  alt="XTERIOHUB"
                  className="w-28 sm:w-32 md:w-36 transition-all duration-500 drop-shadow-[0_8px_16px_rgba(0,153,232,0.45)] filter group-hover:scale-105 group-hover:drop-shadow-[0_14px_24px_rgba(0,153,232,0.7)]"
                />
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
                {NAV_LINKS.map(link => (
                  <div key={link.name} className="relative group py-6">
                    <Link
                      to={link.path}
                      className={cn(
                        "font-secondary text-[11px] uppercase tracking-[0.18em] font-medium transition-colors relative flex items-center gap-1",
                        "text-white/70 group-hover:text-white",
                        location.pathname === link.path && "text-white font-semibold"
                      )}
                    >
                      {link.name}
                      {link.dropdown && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-70">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      )}
                      <span className={cn(
                        "absolute -bottom-2 left-0 h-[1.5px] bg-accent transition-all duration-300",
                        location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                      )} />
                    </Link>

                    {/* Dropdown 1st Level */}
                    {link.dropdown && (
                      <div 
                        style={{ paddingTop: '20px' }}
                        className="absolute top-[100%] left-1/2 -translate-x-1/2 min-w-[700px] xl:min-w-[780px] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-[0.16,1,0.3,1] z-50 pointer-events-auto"
                      >
                        <div className="bg-black/95 border border-white/10 rounded-xl px-9 py-14 shadow-2xl flex flex-row justify-between gap-6 backdrop-blur-xl">
                          {link.dropdown.map(brand => (
                            <div 
                              key={brand.name} 
                              className="flex-1 flex flex-col items-start group/brand cursor-pointer border-r last:border-r-0 border-white/15 pr-6"
                            >
                              <Link 
                                to={brand.path}
                                className="font-mono text-sm font-bold tracking-[0.25em] text-neutral-400 group-hover/brand:text-white transition-colors uppercase block mt-3 mb-4"
                              >
                                {brand.name}
                              </Link>

                              {brand.sub && (
                                <div className="flex flex-col gap-1.5 opacity-0 invisible max-h-0 group-hover/brand:opacity-100 group-hover/brand:visible group-hover/brand:max-h-24 transition-all duration-400 ease-[0.16,1,0.3,1] overflow-hidden pt-1">
                                  {brand.sub.map(subItem => (
                                    <Link
                                      key={subItem.name}
                                      to={subItem.path}
                                      className="font-mono text-[11px] tracking-widest text-neutral-500 hover:text-neutral-200 transition-colors uppercase py-0.5 block"
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Actions: Desktop CTA + Mobile Hamburger Toggle */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={handleConsultationClick}
                  className={cn(
                    "hidden md:inline-flex items-center h-[46px] sm:h-[50px] px-7 sm:px-8 rounded-full font-secondary text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 active:scale-95 shadow-lg cursor-pointer",
                    "bg-white text-black hover:bg-accent hover:text-white hover:shadow-[0_0_25px_rgba(0,153,232,0.5)] hover:scale-105"
                  )}
                >
                  Consultation
                </button>

                {/* Mobile Hamburger Button with 3 Horizontal Lines */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(prev => !prev)}
                  className="lg:hidden relative w-12 h-12 rounded-full bg-white/10 border border-white/20 flex flex-col items-center justify-center gap-1.5 text-white hover:bg-white/15 active:scale-90 transition-transform focus:outline-none cursor-pointer touch-manipulation select-none pointer-events-auto z-[101]"
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                >
                  <motion.span
                    animate={mobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-5 h-[2px] bg-white rounded-full block origin-center pointer-events-none"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-[2px] bg-sky-400 rounded-full block origin-center pointer-events-none"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-5 h-[2px] bg-white rounded-full block origin-center pointer-events-none"
                  />
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ========================================================
          MOBILE NAVIGATION DRAWER (Mounted directly into document.body)
         ======================================================== */}
      {mounted && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-[9999990] pointer-events-auto lg:hidden">
              {/* Dark Backdrop with Blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer pointer-events-auto"
              />

              {/* Slide-over Luxury Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="fixed top-0 right-0 bottom-0 w-[90vw] max-w-[400px] z-[9999995] bg-[#07090e]/98 backdrop-blur-2xl border-l border-white/15 flex flex-col justify-between shadow-[0_0_90px_rgba(0,0,0,0.95)] overflow-hidden pointer-events-auto"
              >
                {/* Top Bar of Drawer */}
                <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-black/40">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <img src={logoUrl} alt="XTERIOHUB" className="w-28 sm:w-32" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-lg hover:text-white hover:bg-white/20 active:scale-90 transition-all cursor-pointer touch-manipulation select-none"
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>

                {/* Scrollable Links Area */}
                <div
                  data-lenis-prevent
                  className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-6 space-y-4 touch-pan-y"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {/* Category Title */}
                  <div className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase px-2 mb-1">
                    Navigation Tabs
                  </div>

                  {/* Main Links */}
                  <div className="space-y-1.5">
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3.5 px-4 rounded-xl font-secondary text-sm font-semibold tracking-[0.15em] uppercase transition-colors touch-manipulation",
                        location.pathname === '/' ? "bg-sky-500/15 text-sky-400 border border-sky-500/30" : "text-white/80 hover:bg-white/5 hover:text-white border border-transparent"
                      )}
                    >
                      <span>HOME</span>
                      <span className="font-mono text-xs text-white/40">01</span>
                    </Link>

                    <Link
                      to="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3.5 px-4 rounded-xl font-secondary text-sm font-semibold tracking-[0.15em] uppercase transition-colors touch-manipulation",
                        location.pathname === '/about' ? "bg-sky-500/15 text-sky-400 border border-sky-500/30" : "text-white/80 hover:bg-white/5 hover:text-white border border-transparent"
                      )}
                    >
                      <span>ABOUT</span>
                      <span className="font-mono text-xs text-white/40">02</span>
                    </Link>

                    {/* OUR BRANDS Expandable Accordion */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden my-2">
                      <div className="flex items-center justify-between p-1">
                        <Link
                          to="/brands"
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex-1 py-3 px-3.5 font-secondary text-sm font-semibold tracking-[0.15em] uppercase transition-colors touch-manipulation flex items-center gap-2",
                            location.pathname.startsWith('/brands') ? "text-sky-400" : "text-white/90 hover:text-white"
                          )}
                        >
                          <span>OUR BRANDS</span>
                          <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-400/20">4</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setBrandsAccordionOpen(prev => !prev)}
                          className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer touch-manipulation"
                          aria-label="Toggle brand sub-menu"
                        >
                          <motion.span
                            animate={{ rotate: brandsAccordionOpen ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-xs"
                          >
                            ▼
                          </motion.span>
                        </button>
                      </div>

                      <AnimatePresence>
                        {brandsAccordionOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-3 pb-3 pt-1 space-y-2.5 border-t border-white/5"
                          >
                            <Link
                              to="/brands"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-2 px-2 font-mono text-[11px] text-sky-400 font-bold uppercase tracking-wider hover:underline"
                            >
                              → VIEW ALL BRANDS OVERVIEW
                            </Link>

                            {[
                              { name: 'FRONTEK', path: '/brands/frontek', type: 'Terracotta' },
                              { name: 'TEMPIO', path: '/brands/tempio', type: 'Terracotta Skin' },
                              { name: 'STENI', path: '/brands/steni', type: 'Stone Composite' },
                              { name: 'TECHLAM', path: '/brands/techlam', type: 'Sintered Porcelain' }
                            ].map(b => (
                              <div key={b.name} className="p-3 rounded-lg bg-black/40 border border-white/10 space-y-2">
                                <div className="flex items-center justify-between">
                                  <Link
                                    to={b.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="font-mono text-xs font-bold text-white hover:text-sky-400 tracking-wider transition-colors py-1"
                                  >
                                    {b.name}
                                  </Link>
                                  <span className="font-mono text-[9px] text-white/40">{b.type}</span>
                                </div>
                                <div className="flex items-center gap-3 pt-1 border-t border-white/5 flex-wrap">
                                  <Link
                                    to={`${b.path}/collections`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="font-mono text-[11px] text-zinc-300 hover:text-sky-400 uppercase tracking-wider py-1 px-2 bg-white/5 rounded"
                                  >
                                    Collections →
                                  </Link>
                                  <Link
                                    to={`${b.path}/projects`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="font-mono text-[11px] text-zinc-300 hover:text-sky-400 uppercase tracking-wider py-1 px-2 bg-white/5 rounded"
                                  >
                                    Projects →
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <Link
                      to="/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3.5 px-4 rounded-xl font-secondary text-sm font-semibold tracking-[0.15em] uppercase transition-colors touch-manipulation",
                        location.pathname === '/projects' ? "bg-sky-500/15 text-sky-400 border border-sky-500/30" : "text-white/80 hover:bg-white/5 hover:text-white border border-transparent"
                      )}
                    >
                      <span>PROJECTS</span>
                      <span className="font-mono text-xs text-white/40">04</span>
                    </Link>

                    <Link
                      to="/technology"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3.5 px-4 rounded-xl font-secondary text-sm font-semibold tracking-[0.15em] uppercase transition-colors touch-manipulation",
                        location.pathname === '/technology' ? "bg-sky-500/15 text-sky-400 border border-sky-500/30" : "text-white/80 hover:bg-white/5 hover:text-white border border-transparent"
                      )}
                    >
                      <span>TECHNOLOGY</span>
                      <span className="font-mono text-xs text-white/40">05</span>
                    </Link>

                    <Link
                      to="/downloads"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3.5 px-4 rounded-xl font-secondary text-sm font-semibold tracking-[0.15em] uppercase transition-colors touch-manipulation",
                        location.pathname === '/downloads' ? "bg-sky-500/15 text-sky-400 border border-sky-500/30" : "text-white/80 hover:bg-white/5 hover:text-white border border-transparent"
                      )}
                    >
                      <span>DOWNLOADS</span>
                      <span className="font-mono text-xs text-white/40">06</span>
                    </Link>

                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3.5 px-4 rounded-xl font-secondary text-sm font-semibold tracking-[0.15em] uppercase transition-colors touch-manipulation",
                        location.pathname === '/contact' ? "bg-sky-500/15 text-sky-400 border border-sky-500/30" : "text-white/80 hover:bg-white/5 hover:text-white border border-transparent"
                      )}
                    >
                      <span>CONTACT</span>
                      <span className="font-mono text-xs text-white/40">07</span>
                    </Link>
                  </div>

                  {/* Direct Consultation Button Inside Drawer */}
                  <div className="pt-3">
                    <button
                      onClick={handleConsultationClick}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-black font-secondary text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_25px_rgba(0,153,232,0.4)] active:scale-95 transition-transform cursor-pointer touch-manipulation"
                    >
                      Request Consultation
                    </button>
                  </div>
                </div>

                {/* Bottom Info of Drawer */}
                <div className="p-5 sm:p-6 border-t border-white/10 bg-black/60 space-y-2.5 shrink-0">
                  <div className="flex items-center justify-between text-white/70 text-xs font-secondary">
                    <span>Pan India Execution</span>
                    <a href="tel:+919731679545" className="text-sky-400 hover:underline font-mono">
                      +91 97316 79545
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-white/45 text-[11px] font-mono">
                    <a href="mailto:info@xteriohub.com" className="hover:text-white transition-colors">
                      info@xteriohub.com
                    </a>
                    <span>Bangalore, India</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Consultation Modal */}
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
