import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export default function EditorialStatement() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-noise" style={{ minHeight: '85vh', background: '#FAFAF8' }}>
      {/* Grid line background */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none" />
      {/* Diagonal accent lines */}
      <div className="absolute inset-0 bg-diagonal-lines pointer-events-none" />
      {/* Top-left blue glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,153,232,0.06) 0%, transparent 70%)' }}
      />
      {/* Bottom-right warm glow */}
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(17,24,39,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto text-center relative z-10 px-8 py-40">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="inline-block font-secondary text-[11px] font-semibold tracking-[0.45em] uppercase mb-16"
          style={{ color: '#0099E8' }}
        >
          Our Philosophy
        </motion.span>

        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease }}
          className="font-primary font-light leading-[1.15] tracking-tight"
          style={{ fontSize: 'clamp(2rem, 5.5vw, 5.5rem)', color: '#111827', letterSpacing: '-0.02em', wordSpacing: '0.08em' }}
        >
          "We don't simply build façades.
          <br className="hidden sm:block" />
          <span className="italic" style={{ color: 'rgba(17,24,39,0.7)' }}>
            {' '}We engineer architectural identities."
          </span>
        </motion.blockquote>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease }}
          className="w-24 h-[2px] mx-auto mt-20 origin-left"
          style={{ background: '#0099E8' }}
        />
      </div>
    </section>
  );
}
