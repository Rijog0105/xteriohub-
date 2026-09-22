import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    overview: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMousePos({ x, y });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', overview: '' });
    }, 4000);
  };

  return (
    <div onMouseMove={handleMouseMove} className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* PURE BLACK THEME WITH DYNAMIC SPOTLIGHT TORCH BEAM FOLLOWING CURSOR */}
      <div 
        className="pointer-events-none absolute inset-0 transition-all duration-150 ease-out"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 70%), radial-gradient(circle 900px at 50% 0%, rgba(255, 255, 255, 0.18) 0%, transparent 55%)`
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:72px_72px]" />

      {/* Top Spacer for Fixed Nav */}
      <div style={{ height: '110px', minHeight: '110px' }} className="w-full block shrink-0 pointer-events-none" />

      {/* 1. HERO HEADER BANNER (CLEAN & COMPACT MINIMAL TYPOGRAPHY) */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 text-center" style={{ marginBottom: '50px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative py-4 text-center"
        >
          <h1 className="font-primary text-3xl md:text-5xl font-extralight text-zinc-300 tracking-tight text-center">
            Get in Touch
          </h1>
        </motion.div>
      </div>

      {/* 2. MAIN TWO-COLUMN CONTACT SECTION */}
      <div
        className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24"
        style={{ marginBottom: '120px' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* LEFT COLUMN: COMPANY & CONTACT INFO (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-start"
          >
            <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extralight text-zinc-200 leading-tight tracking-tight mb-20 md:mb-28">
              Let's Discuss Next <br />
              <span className="font-light italic text-zinc-400">Projects</span>
            </h2>

            {/* CONTACT INFO BLOCKS - COMPACT FONT & EXTENDED BREAK SPACING */}
            <div className="space-y-16 md:space-y-20">
              
              {/* Phone Item */}
              <div className="border-b border-white/10 pb-12 md:pb-14">
                <motion.a
                  href="tel:+919731679545"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-5 p-1 bg-transparent transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-300">
                    <svg className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-mono text-[11px] text-zinc-500 font-normal block tracking-widest uppercase">
                      Phone
                    </span>
                    <span className="font-primary text-base md:text-lg font-light text-zinc-300 group-hover:text-white transition-colors block">
                      +91 97316 79545
                    </span>
                  </div>
                </motion.a>
              </div>

              {/* Email Item */}
              <div className="border-b border-white/10 pb-12 md:pb-14">
                <motion.a
                  href="mailto:info@xteriohub.com"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-5 p-1 bg-transparent transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-300">
                    <svg className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-mono text-[11px] text-zinc-500 font-normal block tracking-widest uppercase">
                      Email
                    </span>
                    <span className="font-primary text-base md:text-lg font-light text-zinc-300 group-hover:text-white transition-colors block">
                      info@xteriohub.com
                    </span>
                  </div>
                </motion.a>
              </div>

              {/* Office Address Item */}
              <div className="pb-4">
                <motion.a
                  href="https://maps.google.com/?q=Indiranagar+2nd+stage+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-5 p-1 bg-transparent transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-300">
                    <svg className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-mono text-[11px] text-zinc-500 font-normal block tracking-widest uppercase">
                      Office Location
                    </span>
                    <span className="font-secondary text-xs md:text-sm text-zinc-300 font-light leading-relaxed block group-hover:text-white transition-colors">
                      #52, 1st Floor, 3rd Cross, 10th Main, Indiranagar 2nd stage, Bangalore - 560038
                    </span>
                  </div>
                </motion.a>
              </div>

            </div>
          </motion.div>

          {/* RIGHT COLUMN: STRETCHED CONTACT FORM (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 w-full"
          >
            <div className="relative w-full bg-transparent">
              <div className="relative z-10 py-2">
                <h3 className="font-primary text-xl md:text-2xl font-extralight text-zinc-300 tracking-tight mb-12">
                  Write to Us
                </h3>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center flex flex-col items-center justify-center bg-white/[0.03] border border-white/15 rounded-2xl p-8 backdrop-blur-md space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white text-xl mb-1">
                      ✓
                    </div>
                    <h4 className="font-primary text-xl text-zinc-200 font-light">Message Sent</h4>
                    <p className="font-secondary text-xs text-zinc-400 font-light max-w-xs leading-relaxed">
                      Thank you for reaching out. Our team will get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-16 md:space-y-20 w-full">
                    {/* Q1: Your Name */}
                    <div className="w-full border-b border-white/10 pb-12 md:pb-14">
                      <label className="font-mono text-[11px] text-zinc-400 font-normal uppercase tracking-widest block mb-3">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-12 md:h-13 px-5 bg-white/[0.04] border border-white/10 rounded-xl font-secondary text-xs md:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                      />
                    </div>

                    {/* Q2: Email Address */}
                    <div className="w-full border-b border-white/10 pb-12 md:pb-14">
                      <label className="font-mono text-[11px] text-zinc-400 font-normal uppercase tracking-widest block mb-3">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-12 md:h-13 px-5 bg-white/[0.04] border border-white/10 rounded-xl font-secondary text-xs md:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                      />
                    </div>

                    {/* Q3: Phone Number */}
                    <div className="w-full border-b border-white/10 pb-12 md:pb-14">
                      <label className="font-mono text-[11px] text-zinc-400 font-normal uppercase tracking-widest block mb-3">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-12 md:h-13 px-5 bg-white/[0.04] border border-white/10 rounded-xl font-secondary text-xs md:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                      />
                    </div>

                    {/* Q4: Project Overview */}
                    <div className="w-full border-b border-white/10 pb-12 md:pb-14">
                      <label className="font-mono text-[11px] text-zinc-400 font-normal uppercase tracking-widest block mb-3">
                        Project Overview
                      </label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Briefly describe your requirements..."
                        value={formData.overview}
                        onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                        className="w-full p-5 bg-white/[0.04] border border-white/10 rounded-xl font-secondary text-xs md:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 font-primary text-base md:text-lg font-light text-zinc-300 hover:text-white tracking-[0.2em] uppercase transition-colors cursor-pointer pt-4 bg-transparent border-none outline-none"
                    >
                      Contact Us <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 3. GOOGLE MAP SECTION */}
      <div
        className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 mb-16"
        style={{ marginTop: '80px' }}
      >
        <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl h-[400px] md:h-[450px]">
          <iframe
            title="XterioHub Bangalore Office Map"
            src="https://maps.google.com/maps?q=12.9719,77.6412&hl=en&z=15&output=embed"
            className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 brightness-95 contrast-125 grayscale-[30%]"
            allowFullScreen=""
            loading="lazy"
          />

          <div className="absolute top-6 left-6 bg-black/90 backdrop-blur-xl border border-white/15 p-6 rounded-2xl shadow-2xl max-w-sm space-y-2">
            <h4 className="font-primary text-lg font-light text-zinc-200">
              XterioHub Bangalore
            </h4>
            <p className="font-secondary text-xs text-zinc-400 font-light leading-relaxed">
              #52, 1st Floor, 3rd Cross, 10th Main, Indiranagar 2nd stage, Bangalore - 560038
            </p>
            <a
              href="https://maps.google.com/?q=Indiranagar+2nd+stage+Bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-zinc-200 font-secondary text-xs font-light hover:bg-white hover:text-black transition-all cursor-pointer mt-2"
            >
              Open in Maps ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
