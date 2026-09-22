import { useState, useEffect } from 'react';
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
          { name: '9:16 Video Reel', path: '/brands/steni/video' },
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
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const logoUrl = assets.logos.find(l => l.includes('xteriohub')) || assets.logos[0];
  const isHome = location.pathname === '/';

  const handleConsultationClick = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      setModalOpen(true);
    }
  };

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
              'fixed top-0 left-0 right-0 z-50 h-[90px] flex items-center transition-all duration-500',
              scrolled
                ? 'bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
                : 'bg-transparent'
            )}
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full max-w-[1600px] mx-auto px-12 md:px-20 xl:px-32 flex items-center justify-between">
              {/* Logo with Direct 3D Effects */}
              <Link to="/" className="shrink-0 group">
                <img
                  src={logoUrl}
                  alt="XTERIOHUB"
                  className="w-32 md:w-36 transition-all duration-500 drop-shadow-[0_8px_16px_rgba(0,153,232,0.45)] filter group-hover:scale-105 group-hover:drop-shadow-[0_14px_24px_rgba(0,153,232,0.7)] group-hover:-translate-y-1"
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
                        "text-white/70 group-hover:text-white"
                      )}
                    >
                      {link.name}
                      {link.dropdown && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-70">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      )}
                      <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full" />
                    </Link>

                    {/* Dropdown 1st Level - Reduced Clearance & Increased Height */}
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

                              {/* Only revealed when hovering over the specific brand word */}
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

              {/* CTA Button -> Opens Consultation Form Modal */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleConsultationClick}
                  className={cn(
                    "hidden md:inline-flex items-center h-[52px] px-9 rounded-full font-secondary text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 active:scale-95 shadow-lg",
                    "bg-white text-black hover:bg-accent hover:text-white hover:shadow-[0_0_25px_rgba(0,153,232,0.5)] hover:scale-105"
                  )}
                >
                  Consultation
                </button>
                <button className="lg:hidden p-2 text-white">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Consultation Modal */}
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
