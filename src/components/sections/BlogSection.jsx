import { motion } from 'framer-motion';
import { useRef } from 'react';
import { assets } from '../../data/assets';

const spring = { type: "spring", stiffness: 100, damping: 20 };

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Sustainable Façade Materials",
    date: "Aug 15, 2026",
    image: assets.projects[5] || assets.heroImages[0],
    category: "Sustainability",
    link: "https://www.wfmmedia.com/future-facades/"
  },
  {
    id: 2,
    title: "Integrating Techlam into Modern Architecture",
    date: "Sep 02, 2026",
    image: assets.projects[6] || assets.heroImages[1],
    category: "Architecture",
    link: "https://www.techlam.com/en/blog/"
  },
  {
    id: 3,
    title: "Why Ventilated Cladding is the New Standard",
    date: "Oct 12, 2026",
    image: assets.projects[7] || assets.heroImages[2],
    category: "Cladding",
    link: "https://www.equitone.com/en-gb/blog/why-ventilated-facades-are-the-future/"
  }
];

export default function BlogSection() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative py-20 md:py-28 bg-transparent z-10 w-full flex justify-center">
      <div className="w-full max-w-[1500px] mx-auto px-8 md:px-16 lg:px-24 relative flex flex-col items-center">
        
        {/* Header */}
        <div className="w-full flex flex-col items-center justify-center text-center gap-4 mb-16 mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-secondary text-[12px] font-bold tracking-[0.2em] uppercase text-accent mb-2 block text-center w-full"
          >
            Direct from the blog posts
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-primary font-medium text-white text-3xl md:text-5xl leading-tight text-center w-full"
          >
            Checkout our latest news <br className="hidden md:block"/>
            and articles
          </motion.h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <motion.a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ...spring }}
              className="group block cursor-pointer rounded-3xl bg-transparent border-none overflow-hidden hover:opacity-90 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="w-full h-[250px] overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <span className="font-secondary text-[10px] uppercase tracking-wider text-white">
                    {post.category}
                  </span>
                </div>
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col items-center text-center">
                <span className="font-secondary text-[12px] text-white/50 mb-3 block">
                  {post.date}
                </span>
                <h3 className="font-primary text-xl md:text-2xl text-white font-medium leading-snug group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <div className="mt-8 flex items-center justify-center gap-2 text-white/70 font-secondary text-[13px] font-medium group-hover:text-white transition-colors">
                  Read Article 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-2 transition-transform">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
