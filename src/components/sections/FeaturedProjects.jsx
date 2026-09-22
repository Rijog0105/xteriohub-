import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../data/assets';

const PROJECTS = [
  { id: 1, title: 'Ekta Elitus', location: 'Mumbai, India', material: 'Frontek', image: '/assets/Brands/frontek/projects/portfolio-ekta-elitus.png' },
  { id: 2, title: 'Britacel', location: 'Mumbai, India', material: 'Frontek', image: '/assets/Brands/frontek/projects/portfolio-britacel.jpg', fitContain: true },
  { id: 3, title: 'Nirlon NZURI', location: 'Pune, India', material: 'Frontek', image: '/assets/Brands/frontek/projects/portfolio-nirlon-nzuri.png' },
  { id: 4, title: 'Sebastopol Residences', location: 'Caulfield, Australia', material: 'Frontek', image: '/assets/Brands/frontek/projects/portfolio-sebastopol-residences.png' }
];

export default function FeaturedProjects() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const bgImage = hoveredProject ? PROJECTS.find(p => p.id === hoveredProject)?.image : null;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-transparent z-10 transition-colors duration-1000">
      
      <div className="max-w-[1500px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">

        {/* Minimalist Left-Aligned Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
          <div>
            <span className="font-secondary text-[11px] font-semibold tracking-[0.4em] uppercase block mb-4" style={{ color: '#0099E8' }}>
              PORTFOLIO
            </span>
            <h2 className="font-primary font-extralight text-zinc-200"
              style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', letterSpacing: '-0.03em', wordSpacing: '0.06em' }}
            >
              Featured Works.
            </h2>
          </div>
          <Link to="/projects"
            className="group inline-flex items-center gap-4 font-secondary text-[11px] font-semibold tracking-[0.3em] uppercase text-white/50 transition-colors hover:text-white pb-4"
          >
            Explore Archive
            <span className="group-hover:translate-x-2 transition-transform duration-300 text-lg">→</span>
          </Link>
        </div>

        {/* Content Layout: List on Left, Preview on Right */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Project List */}
          <div className="w-full lg:w-[60%] flex flex-col border-t border-white/10">
            {PROJECTS.map((proj) => (
              <div 
                key={proj.id}
                className="group relative flex flex-col justify-center py-10 md:py-14 border-b border-white/10 cursor-pointer"
                onMouseEnter={() => setHoveredProject(proj.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="flex flex-col gap-2 relative z-10">
                  <span className="font-secondary text-[10px] tracking-[0.3em] uppercase text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {proj.material}
                  </span>
                  <div className="flex justify-between items-center">
                    <h3 className="font-primary text-4xl md:text-5xl font-light text-white/40 group-hover:text-white transition-colors duration-500" style={{ letterSpacing: '-0.02em' }}>
                      {proj.title}
                    </h3>
                    <p className="font-secondary text-sm font-light text-white/30 group-hover:text-white/70 transition-colors duration-500 hidden md:block">
                      {proj.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Small Preview Box - Reduced size for sleek compact look */}
          <div className="hidden lg:flex w-[40%] justify-end">
            <div className="w-full max-w-[350px] aspect-[4/5] rounded-[1.8rem] overflow-hidden bg-black/40 border border-white/10 relative shadow-2xl">
              {PROJECTS.map((proj) => (
                <img
                  key={proj.id}
                  src={proj.image}
                  alt={proj.title}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                    proj.fitContain ? 'object-contain p-2 bg-black' : 'object-cover'
                  } ${
                    bgImage === proj.image 
                      ? 'opacity-95 scale-100' 
                      : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                />
              ))}
              {!bgImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-secondary text-[11px] tracking-[0.2em] uppercase text-white/30">
                    Hover to preview
                  </span>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
