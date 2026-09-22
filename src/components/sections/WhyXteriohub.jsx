import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

const FEATURES = [
  {
    number: '01',
    title: 'Curated Global Brands',
    description: 'Exclusive access to leading international manufacturers including Tempio, Techlam, Steni, and Frontek.',
  },
  {
    number: '02',
    title: 'Precision Engineering',
    description: 'End-to-end substructure calculation, wind load analysis, and bespoke attachment system engineering.',
  },
  {
    number: '03',
    title: 'Sustainable Skins',
    description: 'Eco-friendly, recyclable, and thermal-efficient materials engineered to drastically reduce building energy consumption.',
  },
  {
    number: '04',
    title: 'Pan-India Execution',
    description: 'Comprehensive turn-key project management and flawless execution across high-end commercial and residential landmarks.',
  }
];

export default function WhyXteriohub() {
  return (
    <section className="relative py-12 md:py-16 bg-transparent overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 xl:px-24 relative z-10">

        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="font-secondary text-xs font-semibold tracking-[0.35em] uppercase text-cyan-400 block mb-3">
            WHY ENGINEERS & ARCHITECTS CHOOSE US
          </span>
          <h2 className="font-primary font-light text-white text-2xl md:text-3xl lg:text-4xl leading-tight">
            The Xteriohub Architectural Advantage
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease }}
              className="group relative p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Number */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-primary text-3xl font-light text-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                    {feature.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-primary text-base md:text-lg font-medium text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-secondary text-xs md:text-sm text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
