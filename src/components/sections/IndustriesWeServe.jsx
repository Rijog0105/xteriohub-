import { motion } from 'framer-motion';
import { assets } from '../../data/assets';

export default function IndustriesWeServe() {
  const industries = [
    { 
      name: 'Commercial', 
      desc: 'Corporate headquarters, tech parks, and high-rise office towers demanding thermal efficiency and striking corporate identity.', 
      image: assets.projects[0] || assets.heroImages[0] 
    },
    { 
      name: 'Hospitality', 
      desc: 'Luxury hotels and resorts where aesthetic elegance and noise reduction form the guest experience.', 
      image: assets.projects[1] || assets.heroImages[1] 
    },
    { 
      name: 'Healthcare', 
      desc: 'Hospitals and medical research centers requiring hygienic, weather-tight, and highly durable building envelopes.', 
      image: assets.projects[2] || assets.heroImages[2] 
    },
    { 
      name: 'Residential', 
      desc: 'Ultra-luxury private villas and high-end residential towers combining warmth, privacy, and low maintenance.', 
      image: assets.projects[3] || assets.heroImages[3] 
    },
    { 
      name: 'Education', 
      desc: 'University campuses and institutions built for high foot-traffic longevity and architectural distinction.', 
      image: assets.projects[4] || assets.heroImages[0] 
    },
    { 
      name: 'Mixed Use', 
      desc: 'Iconic urban centers blending retail, dining, office, and living spaces within a unified architectural façade.', 
      image: assets.projects[5] || assets.heroImages[1] 
    }
  ];

  return (
    <section className="bg-black text-white relative">
      <div className="py-24 px-6 md:px-12 xl:px-24 border-b border-white/10 max-w-[1600px] mx-auto">
        <span className="font-secondary text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
          Sectors
        </span>
        <h2 className="font-primary text-4xl md:text-6xl font-light tracking-tight">
          Architectural Typologies.
        </h2>
      </div>

      {/* One Industry per Viewport Section */}
      {industries.map((ind, idx) => (
        <div 
          key={ind.name}
          className="relative h-screen w-full sticky top-0 flex items-end justify-start overflow-hidden border-t border-white/10"
        >
          {/* Cinematic Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={ind.image} 
              alt={ind.name} 
              className="w-full h-full object-cover opacity-60 transition-transform duration-1000 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
          </div>

          {/* Industry Details */}
          <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 md:px-12 xl:px-24 pb-20 md:pb-28">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-accent/50" />
              </div>

              <motion.h3 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-primary text-5xl md:text-7xl font-light mb-6 tracking-tight text-white"
              >
                {ind.name}
              </motion.h3>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-secondary text-sm md:text-base text-gray-300 leading-relaxed font-light max-w-lg"
              >
                {ind.desc}
              </motion.p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
