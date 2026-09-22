import { motion } from 'framer-motion';
import { assets } from '../../data/assets';

const ease = [0.16, 1, 0.3, 1];

export default function AboutXteriohub() {
  const aboutImg = assets.projects[0] || assets.heroImages[1];

  return (
    <section id="about" className="relative overflow-hidden bg-noise" style={{ background: '#FAFAF8' }}>
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-grid-dots pointer-events-none" />
      {/* Accent glow top-right */}
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,153,232,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 md:px-16 xl:px-24 py-36 md:py-52">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.08)]" style={{ aspectRatio: '4/5', background: '#F3F5F7' }}>
              <img
                src={aboutImg}
                alt="XTERIOHUB Architectural Engineering"
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[1.2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-10 left-10 right-10 pointer-events-none">
                <span className="font-secondary text-[10px] font-semibold tracking-[0.35em] uppercase block mb-2"
                  style={{ color: 'rgba(255,255,255,0.6)' }}>Architectural Execution</span>
                <p className="font-primary text-xl text-white font-light" style={{ wordSpacing: '0.1em' }}>Nationwide Precision Delivery</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.15, ease }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-5 mb-10">
              <span className="font-primary text-6xl font-light" style={{ color: 'rgba(0,153,232,0.2)' }}>02</span>
              <span className="font-secondary text-[11px] font-semibold tracking-[0.35em] uppercase" style={{ color: '#0099E8' }}>
                About XTERIOHUB
              </span>
            </div>

            <h2 className="font-primary font-light leading-[1.12] text-text mb-12"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em', wordSpacing: '0.06em' }}
            >
              Engineering Architectural Brilliance.
            </h2>

            <div className="space-y-7 font-secondary text-[15px] font-light"
              style={{ lineHeight: '2', color: '#6B7280', wordSpacing: '0.05em' }}
            >
              <p>
                XTERIOHUB is India's leading specialized façade engineering firm, dedicated to transforming complex architectural designs into high-performance building envelopes.
              </p>
              <p>
                Through exclusive partnerships with Europe's premier manufacturers of ultra-compact porcelain, extruded terracotta, and fiber-reinforced composites, we empower architects to realize complex building skins without compromise.
              </p>
              <p>
                From wind-load modeling and thermal calculations to custom sub-framing design and nationwide on-site installation, our team delivers seamless execution across India's most ambitious landmarks.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 mt-14 pt-12" style={{ borderTop: '1px solid rgba(17,24,39,0.08)' }}>
              <div>
                <h3 className="font-primary text-xl font-light text-text mb-3" style={{ wordSpacing: '0.06em' }}>Innovation</h3>
                <p className="font-secondary text-[13px] leading-[1.9] font-light" style={{ color: '#6B7280', wordSpacing: '0.04em' }}>
                  Direct partnerships with European material manufacturers.
                </p>
              </div>
              <div>
                <h3 className="font-primary text-xl font-light text-text mb-3" style={{ wordSpacing: '0.06em' }}>Sustainability</h3>
                <p className="font-secondary text-[13px] leading-[1.9] font-light" style={{ color: '#6B7280', wordSpacing: '0.04em' }}>
                  100% recyclable cladding with low thermal transfer.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
