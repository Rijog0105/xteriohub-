import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConsultationModal({ isOpen, onClose, prefillData = null }) {
  const defaultOverview = prefillData 
    ? `Request for ${prefillData.brand} (${prefillData.category} - ${prefillData.materialName})`
    : '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    overview: defaultOverview
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', overview: '' });
      onClose();
    }, 2400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Real Tempio / Steni Ceramic Panel Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg border border-white/25 rounded-3xl p-6 md:p-8 shadow-[0_35px_90px_rgba(0,0,0,0.95)] text-white overflow-hidden group"
          >
            {/* Single Tempio Ceramic Panel Background Image */}
            <img
              src="/assets/Brands/tempio/collections/rustikota/pictures/rk-ek1051-new-black.webp"
              alt="Tempio Panel Skin"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 contrast-110 transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
              onError={(e) => {
                e.target.src = '/assets/Brands/tempio/hero/temp-hero1.webp';
              }}
            />

            {/* Dark Vignette Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/85 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-xs text-white hover:bg-white hover:text-black transition-all duration-300 z-20 backdrop-blur-md"
              aria-label="Close Modal"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-left mb-6 relative z-10">
              <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-cyan-300 uppercase block mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                CONSULTATION // TEMPIO PANEL SKIN
              </span>
              <h2 className="font-primary text-xl md:text-2xl font-light text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Write anytime
              </h2>
            </div>

            {/* Success State */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-8 text-center flex flex-col items-center justify-center relative z-10 bg-black/80 border border-cyan-400/40 rounded-2xl p-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,153,232,0.3)]"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/25 border border-cyan-400 flex items-center justify-center text-cyan-300 text-lg mb-3 shadow-[0_0_20px_rgba(0,153,232,0.5)]">
                  ✓
                </div>
                <h3 className="font-primary text-lg font-light text-white mb-1 drop-shadow">
                  Message Sent Successfully!
                </h3>
                <p className="font-secondary text-xs text-white/70 font-light max-w-xs leading-relaxed">
                  Our façade engineering team will reach out to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              /* Form with Refined Compact Font Sizes */
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                  <label className="font-mono text-[9px] font-bold tracking-[0.2em] text-cyan-300 uppercase block mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 px-4 bg-black/75 border border-white/35 rounded-xl font-secondary text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(0,153,232,0.45)] focus:bg-black/90 transition-all duration-300 backdrop-blur-md leading-relaxed"
                  />
                </div>

                <div>
                  <label className="font-mono text-[9px] font-bold tracking-[0.2em] text-cyan-300 uppercase block mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 px-4 bg-black/75 border border-white/35 rounded-xl font-secondary text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(0,153,232,0.45)] focus:bg-black/90 transition-all duration-300 backdrop-blur-md leading-relaxed"
                  />
                </div>

                <div>
                  <label className="font-mono text-[9px] font-bold tracking-[0.2em] text-cyan-300 uppercase block mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 px-4 bg-black/75 border border-white/35 rounded-xl font-secondary text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(0,153,232,0.45)] focus:bg-black/90 transition-all duration-300 backdrop-blur-md leading-relaxed"
                  />
                </div>

                <div>
                  <label className="font-mono text-[9px] font-bold tracking-[0.2em] text-cyan-300 uppercase block mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    Give a brief overview of your project
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your building facade requirements..."
                    value={formData.overview}
                    onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                    className="w-full p-3.5 bg-black/75 border border-white/35 rounded-xl font-secondary text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(0,153,232,0.45)] focus:bg-black/90 transition-all duration-300 resize-none backdrop-blur-md leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full h-11 rounded-xl bg-gradient-to-r from-white via-neutral-100 to-neutral-300 text-black font-mono text-[10px] font-bold tracking-[0.22em] uppercase shadow-[0_10px_35px_rgba(255,255,255,0.3)] hover:shadow-[0_15px_45px_rgba(0,153,232,0.6)] active:scale-[0.98] transition-all duration-300 overflow-hidden mt-3 border border-white"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    SEND A MESSAGE
                    <span className="text-xs font-semibold group-hover:translate-x-1 transition-transform">↗</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/40 to-cyan-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
