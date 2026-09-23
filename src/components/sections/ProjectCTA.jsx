import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { assets } from '../../data/assets';

const spring = { type: "spring", stiffness: 100, damping: 20 };

export default function ProjectCTA() {
  const ctaImage = assets.projects[4] || assets.heroImages[0];

  return (
    <section className="relative py-10 sm:py-16 md:py-20 bg-transparent z-10 w-full flex justify-center">
      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-16 lg:px-24 relative flex justify-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ...spring }}
          className="relative w-full bg-transparent flex flex-col items-center justify-center text-center px-4 py-4 sm:py-8"
        >
          {/* Content */}
          <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center text-center mx-auto">
            <span className="font-secondary text-xs font-semibold tracking-[0.3em] uppercase text-zinc-400 mb-4 sm:mb-6 block text-center w-full">
              HIRE US FOR YOUR NEW PROJECTS
            </span>
            
            <h2 className="font-primary font-thin text-zinc-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight mb-4 sm:mb-6 text-center w-full tracking-wide">
              Let's Discuss Your Next Project
            </h2>

            {/* Managed Line Space Before Contact Us */}
            <div className="w-full flex flex-col items-center justify-center pt-10 sm:pt-20 md:pt-32 lg:pt-40">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 font-primary text-base md:text-lg font-light text-zinc-300 hover:text-white tracking-[0.25em] uppercase transition-colors cursor-pointer"
              >
                Contact Us <span className="group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
