import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const spring = { type: "spring", stiffness: 100, damping: 20 };

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

export default function About() {
  const heroRef = useRef(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(0);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Section 4: What Makes Us Different - 6 Topics (User Provided Content)
  const DIFFERENTIATORS = [
    {
      title: "Value Engineering",
      subtitle: "COST & PERFORMANCE BALANCING",
      desc: "XTERIOHUB delivers optimized engineering solutions that balance cost, performance, and constructability. We refine sub-frame layouts and panel yields early in design to prevent material waste and avoid structural over-design.",
      highlights: [
        "Structural Optimization",
        "Cost & Material Efficiency",
        "Constructability Audits"
      ],
      image: "/assets/about/value_engineering.png"
    },
    {
      title: "Excellent Execution",
      subtitle: "ZERO-TOLERANCE PRECISION",
      desc: "From factory pre-fabrication to on-site installation, XTERIOHUB enforces strict quality control protocols across every phase. Our zero-tolerance alignment checks and weather-seal inspections ensure structural integrity and flawless aesthetic alignment.",
      highlights: [
        "Quality Control Protocols",
        "Zero-Tolerance Alignment",
        "Turnkey Façade Installation"
      ],
      image: "/assets/about/excellent_execution.png"
    },
    {
      title: "Timeline Adherence",
      subtitle: "TIMELY & SCHEDULED EXECUTION",
      desc: "XTERIOHUB ensures timely project execution through proper planning, coordinated material supply, and continuous communication with clients, consultants, architects, and execution teams. Every stage is monitored to maintain project schedules while supporting smooth site execution.",
      highlights: [
        "Timely Project Execution",
        "Coordinated Material Supply",
        "Planned Project Scheduling"
      ],
      image: "/assets/about/timeline_adherence.png"
    },
    {
      title: "Post Execution Support",
      subtitle: "CONTINUED CLIENT ASSURANCE",
      desc: "XTERIOHUB continues to provide technical support after project completion whenever required. The team remains available to assist with technical guidance, project coordination, and support related to the installed façade systems.",
      highlights: [
        "Technical Support",
        "Project Assistance",
        "Continued Client Support"
      ],
      image: "/assets/about/post_execution.png"
    },
    {
      title: "In-House Design Team",
      subtitle: "COORDINATED DESIGN & DETAILING",
      desc: "Our in-house design team works closely with architects, consultants, and developers to develop façade concepts, technical detailing, and engineering solutions. Every project is supported with coordinated design assistance to ensure efficient execution.",
      highlights: [
        "Design Assistance",
        "Technical Detailing",
        "Engineering Coordination"
      ],
      image: "/assets/about/design_team.png"
    },
    {
      title: "Experienced Team",
      subtitle: "FAÇADE ENGINEERING EXPERTISE",
      desc: "XTERIOHUB is supported by an experienced team with expertise in façade engineering, technical detailing, project management, and execution. Their knowledge and practical experience contribute to delivering high-quality façade solutions across a wide range of projects.",
      highlights: [
        "Experienced Professionals",
        "Technical Expertise",
        "Quality Project Execution"
      ],
      image: "/assets/about/experienced_team.png"
    }
  ];

  // Section 5: Our Approach Steps - 8 Steps Pixel-Perfect Grid
  const PROCESS_STEPS = [
    { num: "01", title: "Design Consultation", desc: "Collaborative systems selection & CAD reviews.", image: "/assets/about/approach_design_consultation.png" },
    { num: "02", title: "Value Engineering", desc: "Optimizing material yields & cost efficiency.", image: "/assets/about/approach_value_engineering.png" },
    { num: "03", title: "Technical Detailing", desc: "3D BIM substructure & clip layout calculations.", image: "/assets/about/approach_technical_detailing.png" },
    { num: "04", title: "Material Coordination", desc: "Direct factory procurement & logistics sync.", image: "/assets/about/approach_material_coordination.png" },
    { num: "05", title: "Installation Support", desc: "On-site engineering supervision & installation.", image: "/assets/about/approach_installation_support.png" },
    { num: "06", title: "Project Completion", desc: "Final sign-off, quality audit & handover.", image: "/assets/about/approach_project_completion.png" },
    { num: "07", title: "Lifecycle Support", desc: "Post-execution maintenance & system guarantees.", image: "/assets/about/post_execution.png" }
  ];

  // Section 7: Why Clients Choose Us - 8 Features Side-Tab Accordion Deck
  const WHY_CHOOSE_US = [
    { title: "Exclusive European Partnerships", desc: "Direct access to world-class manufacturing technologies from Spain and Norway.", image: "/assets/about/why_european_partnerships.png" },
    { title: "Value Engineering", desc: "Maximizing architectural impact while optimizing material usage and structural costs.", image: "/assets/about/why_value_engineering.png" },
    { title: "Technical Expertise", desc: "Decades of specialized façade engineering, system attachment calculations, and wind-load detailing.", image: "/assets/about/why_technical_expertise.png" },
    { title: "Project Execution", desc: "Turnkey operational management ensuring flawless alignment and structural integrity.", image: "/assets/about/why_project_execution.png" },
    { title: "Complete End-to-End Support", desc: "Single point of accountability from initial architectural design to site installation.", image: "/assets/about/why_end_to_end_support.png" },
    { title: "Proven Industry Experience", desc: "A track record of iconic landmark installations across commercial and residential sectors.", image: "/assets/about/why_industry_experience.png" },
    { title: "Sustainable Envelope Design", desc: "Eco-friendly, recyclable, and thermal-efficient materials engineered to drastically reduce building energy consumption.", image: "/assets/about/why_sustainable_design.png" },
    { title: "Precision Quality Control", desc: "Multi-tier inspections and strict adherence to international cladding standards.", image: "/assets/about/why_quality_control.png" }
  ];

  return (
    <div className="relative w-full bg-black text-white overflow-x-hidden">

      {/* ========================================================
          LOW OPACITY AMBIENT FLOATING PARTICLES
         ======================================================== */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${(i * 13 + 5) % 100}vw`, 
              y: `${(i * 19 + 7) % 100}vh`
            }}
            animate={{ 
              y: [
                `${(i * 19 + 7) % 100}vh`, 
                `${((i * 19 + 7) + 30) % 100}vh`, 
                `${(i * 19 + 7) % 100}vh`
              ],
              opacity: [0.15, 0.45, 0.15]
            }}
            transition={{ 
              duration: 10 + (i % 7) * 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className={`absolute rounded-full ${
              i % 2 === 0 
                ? 'bg-white/40 shadow-[0_0_12px_rgba(255,255,255,0.35)]' 
                : 'bg-white/20'
            } ${i % 3 === 0 ? 'w-2 h-2' : 'w-1 h-1'}`}
          />
        ))}
      </div>

      {/* ========================================================
          HERO SECTION (100% CENTERED)
         ======================================================== */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10">
        
        {/* Background Image with Parallax */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img
            src="/assets/about/hero.png"
            alt="XTERIOHUB Architecture Hero"
            className="w-full h-full object-cover scale-105 opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-8 md:px-16 max-w-[1400px] mx-auto flex flex-col items-center justify-center">
          
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-secondary text-[11px] font-bold tracking-[0.4em] uppercase text-gray-300 mb-6 block text-center"
          >
            Engineering Exquisite Façades
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-primary text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-thin text-zinc-200 tracking-tight mb-8 leading-[1.1] text-center"
          >
            <span className="font-thin">Pioneering Advanced</span> <br />
            <span className="font-thin italic text-white/90">Building Envelopes</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-secondary text-sm md:text-base lg:text-lg font-light text-white/80 max-w-2xl leading-relaxed mb-12 text-center"
          >
            XTERIOHUB combines European façade technologies with comprehensive engineering expertise, precision CAD detailing and hands-on installation support across India.
          </motion.p>



        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="font-secondary text-[9px] tracking-[0.3em] uppercase text-white/60">Scroll To Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/70 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* Section Gap Divider */}
      <div className="w-full flex justify-center py-12 lg:py-16 relative z-10">
        <div className="w-[1px] h-24 lg:h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>

      {/* ========================================================
          SECTION 1: WHO WE ARE
         ======================================================== */}
      <section className="relative py-20 lg:py-24 bg-transparent z-10">
        <div className="max-w-[1500px] mx-auto px-8 md:px-16 lg:px-24">
          
          <div className="w-full flex flex-col items-center text-center mx-auto" style={{ marginBottom: "60px" }}>
            <span className="font-secondary text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400 mb-4 block text-center w-full">
              IDENTITY
            </span>
            <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extralight text-zinc-200 tracking-tight text-center w-full">
              Engineering Excellence
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mt-6" />
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center" style={{ marginTop: "30px" }}>
            
            {/* Left Image */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInScale}
              className="w-full lg:w-1/2 aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/20 relative shadow-2xl group"
            >
              <img 
                src="/assets/about/who_we_are.png"
                alt="Who We Are Architecture"
                className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>

            {/* Right Content */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left"
            >
              <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase text-sky-400 mb-3 block">
                ABOUT XTERIOHUB
              </span>

              <h3 className="font-primary text-xl md:text-2xl lg:text-3xl font-light text-zinc-200 mb-4 leading-tight">
                We deliver innovative façade & architectural design solutions
              </h3>

              <p className="font-secondary text-sm md:text-base text-sky-300/90 font-medium leading-relaxed mb-5 italic border-l-2 border-sky-400/50 pl-4 py-1">
                Our signature approach combines sustainability, durability, and creativity—crafting bespoke cladding systems and architectural designs that inspire, perform, and endure.
              </p>

              <p className="font-secondary text-sm md:text-base text-white/80 font-light leading-relaxed">
                At Xteriohub, we specialize in delivering cutting-edge façade solutions, sustainable cladding systems, and bespoke architectural designs that blend innovation, aesthetics, and durability. With over years of experience, we partner with architects and developers worldwide to craft visually striking and environmentally conscious exteriors that leave a lasting impression. Our unwavering commitment to quality, sustainability, and advanced technology ensures that every project meets the highest standards, providing functional and beautiful solutions for the future.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Section Gap Divider */}
      <div className="w-full flex justify-center py-12 lg:py-16 relative z-10">
        <div className="w-[1px] h-24 lg:h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>

      {/* ========================================================
          SECTION 2: OUR JOURNEY (ULTRA-PREMIUM 3D ANIMATED LASER TIMELINE)
         ======================================================== */}
      <section className="relative py-24 lg:py-36 bg-transparent z-10 w-full flex flex-col items-center overflow-hidden">
        
        {/* Title: "Our Journey" */}
        <div className="w-full flex flex-col items-center text-center mx-auto px-6 mb-20 md:mb-28">
          <span className="font-secondary text-[10px] font-bold tracking-[0.4em] uppercase text-cyan-400 mb-3 block text-center w-full">
            MILESTONES
          </span>
          <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extralight text-zinc-200 tracking-tight text-center w-full">
            Our Journey
          </h2>
          <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-4 shadow-[0_0_12px_#0099E8]" />
        </div>

        {/* 3D Horizontal Line Timeline Container */}
        <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12">
          
          {/* ULTRA-PREMIUM 3D LASER BEAM TIMELINE LINE */}
          <div className="hidden md:block absolute top-[44px] left-20 right-20 -translate-y-1/2 z-0 pointer-events-none">
            {/* Outer Cyan Ambient Glow Track */}
            <div className="w-full h-3 bg-cyan-500/20 blur-md rounded-full" />
            
            {/* Core Glowing Laser Beam Line */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_#0099E8] -mt-[7px] relative overflow-hidden">
              {/* High-Speed Traveling Light Pulse */}
              <motion.div 
                animate={{ x: ['-100%', '250%'] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                className="w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-100 to-transparent shadow-[0_0_25px_#fff]"
              />
            </div>
          </div>

          {/* 4 Milestones Laid Out Horizontally Along the 3D Laser Line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative z-10 w-full">
            {[
              { num: "01", tag: "EXPERIENCE", stat: "14+", title: "14+ Years Industry Experience", detail: "Over a decade of pioneering advanced building skin engineering and structural cladding systems." },
              { num: "02", tag: "PORTFOLIO", stat: "35+", title: "Frontek Projects", detail: "High-impact extruded terracotta facade installations engineered across major commercial hubs." },
              { num: "03", tag: "SURFACE", stat: "125,000+", title: "Sq.m Installed", detail: "Precision installation spanning ultra-compact porcelain, stone composite, and terracotta panels." },
              { num: "04", tag: "COVERAGE", stat: "Pan India", title: "Project Footprint", detail: "Seamless project execution, technical detailing, and site supervision across major metropolises." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ...spring }}
                className="flex flex-col items-center relative group cursor-pointer"
              >
                {/* 3D Futuristic Counter-Rotating Orbital Node Point */}
                <div className="relative w-22 h-22 mb-8 flex items-center justify-center">
                  {/* Expanding Ambient Shockwave Wave */}
                  <motion.div 
                    animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.4, delay: idx * 0.4 }}
                    className="absolute w-16 h-16 rounded-full border border-cyan-400/40 pointer-events-none"
                  />

                  {/* Outer Clockwise Orbit Ring with Satellite Dot */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 group-hover:border-cyan-400 transition-colors flex items-start justify-center p-0.5"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#0099E8]" />
                  </motion.div>

                  {/* Inner Counter-Clockwise Orbit Ring */}
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
                    className="absolute inset-2 rounded-full border border-white/20 group-hover:border-cyan-400/60 transition-colors"
                  />

                  {/* Central 3D Glassmorphic Sphere */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400/30 via-black to-cyan-950 border border-cyan-400/60 shadow-[0_0_30px_rgba(0,153,232,0.5)] backdrop-blur-xl flex items-center justify-center relative z-10 group-hover:scale-125 group-hover:border-cyan-300 transition-all duration-500">
                    {/* Glowing Core 3D Diamond */}
                    <div className="w-3.5 h-3.5 bg-gradient-to-tr from-cyan-400 to-white rotate-45 shadow-[0_0_15px_#0099E8] group-hover:rotate-[225deg] transition-transform duration-700" />
                  </div>
                </div>

                {/* Ultra-Premium Glass Milestone Card */}
                <div className="w-full bg-[#06080e]/90 border border-cyan-500/20 hover:border-cyan-400 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] hover:shadow-[0_25px_70px_rgba(0,153,232,0.3)] hover:-translate-y-2.5 transition-all duration-500 backdrop-blur-2xl flex flex-col items-center text-center relative overflow-hidden group/card">
                  {/* Subtle Top Glowing Line */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent group-hover/card:via-cyan-400 transition-all duration-500" />

                  <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-cyan-400 mb-3 block uppercase bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-400/30">
                    {item.num} // {item.tag}
                  </span>

                  <div className="font-primary text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-lg group-hover/card:text-cyan-300 transition-colors">
                    {item.stat}
                  </div>

                  <h3 className="font-primary text-sm font-semibold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-secondary text-xs text-white/60 font-light leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Section Gap Divider */}
      <div className="w-full flex justify-center py-12 lg:py-16 relative z-10">
        <div className="w-[1px] h-24 lg:h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>

      {/* ========================================================
          SECTION 3: OUR PHILOSOPHY
         ======================================================== */}
      <section className="relative py-20 lg:py-24 bg-transparent z-10 flex items-center justify-center text-center overflow-hidden">
        
        {/* Subtle Ambient Background Light */}
        <div className="absolute inset-0 bg-radial-gradient from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 relative z-10 flex flex-col items-center justify-center text-center">
          
          <span className="font-secondary text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400 mb-6 block text-center">
            PHILOSOPHY
          </span>

          <motion.blockquote 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-primary text-2xl md:text-3xl lg:text-4xl font-extralight text-zinc-200 leading-[1.25] max-w-4xl mb-6 tracking-tight text-center"
          >
            "We don't simply install façades.<br />
            <span className="text-gray-300 font-light">We engineer architectural identities.</span>"
          </motion.blockquote>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-secondary text-sm md:text-base font-light text-white/75 max-w-2xl leading-relaxed text-center"
          >
            Every façade is approached as a combination of engineering, aesthetics and long-term performance. Every project is carefully detailed, coordinated and executed to ensure durability, efficiency and architectural excellence.
          </motion.p>

        </div>
      </section>

      {/* Section Gap Divider */}
      <div className="w-full flex justify-center py-12 lg:py-16 relative z-10">
        <div className="w-[1px] h-24 lg:h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>

      {/* ========================================================
          SECTION 4: WHAT MAKES US DIFFERENT
         ======================================================== */}
      <section className="relative py-20 lg:py-24 bg-transparent z-10">
        <div className="max-w-[1500px] mx-auto px-8 md:px-16 lg:px-24">
          
          {/* 100% Full-Width Centered Section Header */}
          <div className="w-full flex flex-col items-center text-center mx-auto" style={{ marginBottom: "60px" }}>
            <span className="font-secondary text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400 mb-4 block text-center w-full">
              DIFFERENTIATION
            </span>
            <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extralight text-zinc-200 tracking-tight text-center w-full">
              What Makes Us Different
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mt-6" />
          </div>

          <div className="flex flex-col gap-20 lg:gap-24" style={{ marginTop: "30px" }}>
            {DIFFERENTIATORS.map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-center ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Supporting Architectural Image */}
                <div className="w-full lg:w-1/2 aspect-[16/10] rounded-[2rem] overflow-hidden border border-white/20 relative group shadow-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">
                      {item.subtitle}
                    </span>
                  </div>

                  <h3 className="font-primary text-xl md:text-2xl lg:text-3xl font-light text-zinc-200 mb-4 leading-tight">
                    {item.title}
                  </h3>

                  <p className="font-secondary text-sm md:text-base text-white/80 font-light leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {/* Feature Highlights Badges */}
                  <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start w-full">
                    {item.highlights.map((point, pIdx) => (
                      <div key={pIdx} className="py-1 bg-transparent font-mono text-xs text-sky-300/90 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#0099E8]" />
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Section Gap Divider */}
      <div className="w-full flex justify-center py-12 lg:py-16 relative z-10">
        <div className="w-[1px] h-24 lg:h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>

      {/* ========================================================
          SECTION 5: OUR APPROACH
         ======================================================== */}
      <section className="relative py-20 lg:py-24 bg-transparent z-10">
        <div className="max-w-[1500px] mx-auto px-8 md:px-16 lg:px-24 flex flex-col items-center text-center">
          
          <div className="w-full flex flex-col items-center text-center mx-auto" style={{ marginBottom: "60px" }}>
            <span className="font-secondary text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400 mb-4 block text-center w-full">
              METHODOLOGY
            </span>
            <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extralight text-zinc-200 tracking-tight text-center w-full">
              Our Approach
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mt-6" />
          </div>

          {/* Process Timeline Grid - Reduced Card Size & 2-Row Centered Layout */}
          <div className="w-full max-w-[1300px] mx-auto space-y-6 perspective-[1400px]" style={{ marginTop: "30px" }}>
            {/* Row 1: 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              {PROCESS_STEPS.slice(0, 4).map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, rotateX: 10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-45px" }}
                  transition={{ duration: 0.7, delay: idx * 0.08, ...spring }}
                  whileHover={{
                    scale: 1.04,
                    y: -6,
                    rotateY: idx % 2 === 0 ? 5 : -5,
                    rotateX: -4,
                    z: 20
                  }}
                  className="relative rounded-2xl overflow-hidden border border-white/15 group w-full max-w-[260px] min-h-[240px] flex flex-col justify-between items-center text-center p-5 bg-[#0d0e14]/90 backdrop-blur-2xl hover:border-cyan-400/50 transition-all duration-400 shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_40px_rgba(0,153,232,0.2)] transform-style-3d cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-cyan-400/5 to-transparent blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 z-0">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                  </div>
                  <div className="relative z-10 flex justify-center items-center w-full mb-3">
                    <span className="px-3 py-0.5 rounded-full bg-black/70 border border-cyan-400/30 font-mono text-[9px] font-bold tracking-[0.2em] text-cyan-400 uppercase">
                      STEP {step.num}
                    </span>
                  </div>
                  <div className="relative z-10 text-center flex flex-col items-center justify-center">
                    <h3 className="font-primary text-base md:text-lg font-medium text-white mb-2 leading-snug drop-shadow text-center group-hover:text-cyan-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="font-secondary text-[11px] md:text-xs text-white/80 font-light leading-relaxed drop-shadow text-center">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Row 2: 3 Cards Centered */}
            <div className="flex flex-wrap justify-center gap-6 w-full">
              {PROCESS_STEPS.slice(4, 7).map((step, idx) => {
                const globalIdx = idx + 4;
                return (
                  <motion.div
                    key={globalIdx}
                    initial={{ opacity: 0, y: 30, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-45px" }}
                    transition={{ duration: 0.7, delay: globalIdx * 0.08, ...spring }}
                    whileHover={{
                      scale: 1.04,
                      y: -6,
                      rotateY: globalIdx % 2 === 0 ? 5 : -5,
                      rotateX: -4,
                      z: 20
                    }}
                    className="relative rounded-2xl overflow-hidden border border-white/15 group w-full max-w-[260px] min-h-[240px] flex flex-col justify-between items-center text-center p-5 bg-[#0d0e14]/90 backdrop-blur-2xl hover:border-cyan-400/50 transition-all duration-400 shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_40px_rgba(0,153,232,0.2)] transform-style-3d cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-cyan-400/5 to-transparent blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 z-0">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                    </div>
                    <div className="relative z-10 flex justify-center items-center w-full mb-3">
                      <span className="px-3 py-0.5 rounded-full bg-black/70 border border-cyan-400/30 font-mono text-[9px] font-bold tracking-[0.2em] text-cyan-400 uppercase">
                        STEP {step.num}
                      </span>
                    </div>
                    <div className="relative z-10 text-center flex flex-col items-center justify-center">
                      <h3 className="font-primary text-base md:text-lg font-medium text-white mb-2 leading-snug drop-shadow text-center group-hover:text-cyan-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="font-secondary text-[11px] md:text-xs text-white/80 font-light leading-relaxed drop-shadow text-center">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Section Gap Divider */}
      <div className="w-full flex justify-center py-12 lg:py-16 relative z-10">
        <div className="w-[1px] h-24 lg:h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>

      {/* ========================================================
          SECTION 6: GLOBAL PARTNERSHIPS
         ======================================================== */}
      <section className="relative py-20 lg:py-24 bg-transparent z-10 overflow-hidden">
        
        {/* Subtle Map / Grid Background Overlay */}
        <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />

        <div className="max-w-[1500px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          
          {/* 100% Full-Width Centered Section Header */}
          <div className="w-full flex flex-col items-center text-center mx-auto" style={{ marginBottom: "60px" }}>
            <span className="font-secondary text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400 mb-4 block text-center w-full">
              NETWORK
            </span>
            <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extralight text-zinc-200 tracking-tight text-center w-full">
              Global Partnerships
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mt-6" />
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center" style={{ marginTop: "30px" }}>
            
            {/* Left Content (Shifted Right with pl-4 md:pl-8 lg:pl-12) */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left pl-4 md:pl-8 lg:pl-12">
              <p className="font-secondary text-sm md:text-base text-white/90 font-light leading-relaxed mb-10">
                At XTERIOHUB, we collaborate with internationally recognized façade manufacturers to bring premium architectural surface technologies and engineered façade systems to projects across India. These strategic partnerships enable us to combine global innovation with local engineering expertise, technical guidance, and execution support, ensuring every project meets the highest standards of quality, performance, and architectural excellence. Through our exclusive partnerships, we offer architects, consultants, developers, and contractors access to world-class façade solutions tailored for modern building envelopes.
              </p>

              {/* Sub-heading with Slightly Reduced Clearance Gap to Frontek Logo */}
              <h3 className="font-mono text-xs md:text-sm font-bold tracking-[0.25em] text-gray-400 uppercase" style={{ marginBottom: "30px" }}>
                OUR GLOBAL PARTNER PORTFOLIO INCLUDES:
              </h3>

              {/* 4 Brand Partner Points in Refined Metallic Grey */}
              <div className="flex flex-col gap-7 md:gap-8 w-full mb-10">
                {[
                  {
                    name: "FRONTEK",
                    country: "SPAIN",
                    desc: "Premium Ventilated Porcelain Façade Systems",
                    logo: "/assets/logo/frontek-hd.webp"
                  },
                  {
                    name: "TEMPIO",
                    country: "SPAIN",
                    desc: "Premium Terracotta Ventilated Façade Systems",
                    logo: "/assets/logo/tempio.webp"
                  },
                  {
                    name: "STENI",
                    country: "NORWAY",
                    desc: "Stone Composite Façade Panels",
                    logo: "/assets/logo/steni.webp"
                  },
                  {
                    name: "TECHLAM",
                    country: "SPAIN",
                    desc: "Large Format Sintered Stone & Architectural Surfaces",
                    logo: "/assets/logo/techlam.webp"
                  }
                ].map((brand, i) => (
                  <div key={i} className="group flex items-center gap-4 text-left py-1 transition-all duration-300">
                    {/* Minimal Metallic Micro-Dot Bullet Node */}
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400/80 group-hover:bg-white group-hover:scale-125 transition-all shrink-0 shadow-[0_0_6px_rgba(255,255,255,0.3)]" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 flex-wrap w-full">
                      {/* Logo Image Only - Direct on Dark Theme */}
                      <img 
                        src={brand.logo} 
                        alt={`${brand.name} Logo`} 
                        className="h-6 md:h-7 max-w-[110px] object-contain shrink-0 filter drop-shadow-md group-hover:scale-105 transition-transform" 
                      />

                      {/* Monospace Metallic Grey Country Pill */}
                      <span className="font-mono text-[10px] font-bold tracking-widest text-gray-300 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/15 uppercase">
                        {brand.country}
                      </span>

                      {/* Hairline Dot Separator */}
                      <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-gray-500/50" />

                      {/* Clean Refined Grey Typography */}
                      <p className="font-secondary text-sm md:text-base font-light text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                        {brand.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Closing Paragraph */}
              <p className="font-secondary text-xs md:text-sm text-white/80 font-light leading-relaxed italic border-l-2 border-sky-400/50 pl-4 py-1.5">
                Together, these internationally trusted brands enable XTERIOHUB to deliver complete façade solutions supported by technical expertise, engineering consultation, and nationwide project execution across India.
              </p>
            </div>

            {/* Right Architectural Image Canvas */}
            <div className="w-full lg:w-5/12 aspect-[4/5] lg:aspect-square rounded-[2.5rem] overflow-hidden border border-white/20 relative shadow-2xl group shrink-0">
              <img
                src="/assets/about/global_partnerships.png"
                alt="Global Partnerships Architecture"
                className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white text-center md:text-left">
                <span className="font-secondary text-[10px] tracking-[0.3em] uppercase text-gray-300 mb-1 block">International Engineering</span>
                <p className="font-primary text-xl font-light">Advanced European Systems & Surfaces</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Section Gap Divider */}
      <div className="w-full flex justify-center py-12 lg:py-16 relative z-10">
        <div className="w-[1px] h-24 lg:h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>

      {/* ========================================================
          SECTION 7: WHY CLIENTS CHOOSE XTERIOHUB (3D STACKED DECK WITH HOVER IN-PLACE EXPANSION)
         ======================================================== */}
      <section className="relative py-20 lg:py-28 bg-transparent z-10 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 flex flex-col items-center text-center">
          
          {/* 100% Full-Width Centered Section Header */}
          <div className="w-full flex flex-col items-center text-center mx-auto" style={{ marginBottom: "36px" }}>
            <span className="font-secondary text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400 mb-3 block text-center w-full">
              PROVEN TRUST
            </span>
            <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extralight text-zinc-200 tracking-tight text-center w-full">
              Why Clients Choose XTERIOHUB
            </h2>
            <p className="font-secondary text-xs md:text-sm text-white/60 font-light mt-2 tracking-widest uppercase">
              Hover over side tabs in the 3D deck to expand feature details in place
            </p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mt-4" />
          </div>

          {/* 3D Offset Stacked Deck Canvas */}
          <div className="relative w-full max-w-[1400px] mx-auto h-[480px] md:h-[520px] flex items-center justify-center py-6 px-4" style={{ marginTop: "10px" }}>
            <div className="relative w-[1150px] max-w-[95vw] h-[420px] md:h-[450px] flex items-center justify-start perspective-[1400px]">
              {WHY_CHOOSE_US.map((item, idx) => {
                const total = WHY_CHOOSE_US.length;
                const isHovered = hoveredCardIndex === idx;

                // Calculate 3D Offset Position
                // If a card before idx is hovered, shift idx right to make room for expanded hovered card!
                let xTranslate = 0;
                if (hoveredCardIndex === null || idx <= hoveredCardIndex) {
                  xTranslate = idx * 72;
                } else {
                  // hoveredCardIndex < idx: shift by 460px extra
                  xTranslate = hoveredCardIndex * 72 + 520 + (idx - hoveredCardIndex - 1) * 72;
                }

                const widthVal = isHovered ? 560 : 125;
                const zIndexVal = isHovered ? 50 : (total - idx + 10);
                const scaleVal = isHovered ? 1 : 0.95;

                return (
                  <motion.div
                    key={idx}
                    onMouseEnter={() => setHoveredCardIndex(idx)}
                    onClick={() => setHoveredCardIndex(idx)}
                    animate={{
                      x: xTranslate,
                      width: widthVal,
                      scale: scaleVal,
                      opacity: 1,
                      zIndex: zIndexVal,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 140,
                      damping: 20,
                      mass: 0.8
                    }}
                    className={`absolute top-0 left-0 ${
                      isHovered 
                        ? 'border-white/40 shadow-[0_25px_60px_rgba(255,255,255,0.2)] bg-black/90' 
                        : 'border-white/20 shadow-xl bg-black/85 hover:border-white/50'
                    } h-[410px] md:h-[440px] rounded-3xl border backdrop-blur-2xl p-6 md:p-8 cursor-pointer overflow-hidden flex flex-col justify-between transition-colors duration-300`}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          isHovered ? 'opacity-80 scale-105' : 'opacity-35'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                    </div>

                    {/* EXPANDED FULL CARD CONTENT (Visible when hovered in place) */}
                    {isHovered ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 h-full flex flex-col justify-between items-start text-left w-full min-w-[320px] md:min-w-[480px]"
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="px-3.5 py-1 rounded-full bg-black/70 border border-white/30 font-mono text-[10px] font-bold text-gray-200 shadow">
                            07.{idx + 1} // FEATURE
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] tracking-widest text-white/70">
                              {idx + 1} / {total}
                            </span>
                            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                          </div>
                        </div>

                        <div className="flex flex-col items-start text-left mt-auto">
                          <h3 className="font-primary text-2xl md:text-3xl font-medium text-white mb-3 tracking-tight drop-shadow-md">
                            {item.title}
                          </h3>
                          <p className="font-secondary text-xs md:text-sm text-white/90 font-light leading-relaxed max-w-lg drop-shadow">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      /* RESTING SIDE-TAB VIEW (Visible when resting in 3D stack) */
                      <div className="relative z-10 h-full flex flex-col items-center justify-between py-4 px-1 w-full text-center">
                        <span className="px-2.5 py-1 rounded-full bg-black/70 border border-white/30 font-mono text-[10px] font-bold text-gray-200 shadow">
                          07.{idx + 1}
                        </span>
                        <div className="rotate-[-90deg] whitespace-nowrap font-primary text-xs tracking-[0.2em] font-light text-white/90 uppercase">
                          {item.title}
                        </div>
                        <span className="w-2 h-2 rounded-full bg-white/70 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Indicator Navigation Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-8 z-20">
            {WHY_CHOOSE_US.map((_, i) => (
              <button
                key={i}
                onMouseEnter={() => setHoveredCardIndex(i)}
                onClick={() => setHoveredCardIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  hoveredCardIndex === i 
                    ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]' 
                    : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to feature ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Section Gap Divider */}
      <div className="w-full flex justify-center py-12 lg:py-16 relative z-10">
        <div className="w-[1px] h-24 lg:h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>

      {/* ========================================================
          SECTION 8: LEADERSHIP THAT INSPIRES (AWARD-WINNING EXECUTIVE DESIGN)
         ======================================================== */}
      <section className="relative pt-24 bg-transparent text-white z-10 overflow-hidden w-full flex flex-col items-center" style={{ paddingBottom: "110px" }}>
        
        {/* Subtle Ambient Background Gradient Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-[200px] pointer-events-none" />

        {/* Section Header (Guaranteed 60px Margin Bottom) */}
        <div className="w-full flex flex-col items-center justify-center text-center mx-auto px-6" style={{ marginBottom: "60px" }}>
          <span className="font-secondary text-[11px] font-bold tracking-[0.4em] uppercase text-sky-400 mb-4 block text-center w-full drop-shadow-[0_0_10px_rgba(0,153,232,0.4)]">
            LEADERSHIP THAT INSPIRES
          </span>
          <h2 className="font-primary text-4xl md:text-6xl font-light text-white tracking-tight text-center w-full">
            Leading with passion <span className="font-normal italic text-white/80">and precision</span>
          </h2>
          {/* Subtle Glowing Cyan Architectural Bridge Line */}
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-sky-400/60 to-transparent mt-6 drop-shadow-[0_0_8px_rgba(0,153,232,0.6)]" />
        </div>

        {/* Leader Cards (Photos) Container (Guaranteed 30px Margin Top, Reduced Card Gap & Fine-Tuned Bottom Clearance) */}
        <div className="flex flex-col gap-6 md:gap-8 w-full max-w-[1100px] mx-auto px-6" style={{ marginTop: "30px", marginBottom: "40px" }}>
          
          {/* CARD 1: Prashant Kalani (Offset Left) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="self-start w-full md:w-[90%] max-w-[860px] rounded-[2.5rem] bg-gradient-to-br from-[#121318]/95 via-[#0b0c10]/95 to-[#050507]/95 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-sky-400/60 hover:shadow-[0_0_35px_rgba(0,153,232,0.3)] transition-all duration-500 overflow-hidden flex flex-col md:flex-row items-center justify-between p-7 md:p-10 group relative"
          >
            {/* Holographic Glowing Top Edge Line on Hover */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Subtle Blueprint Grid Pattern in Background */}
            <div className="absolute inset-0 bg-grid-dots opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-500" />

            {/* Portrait Image Stage (Left side) */}
            <div className="relative z-10 w-full md:w-5/12 flex items-center justify-center md:justify-start mb-6 md:mb-0">
              <div className="relative w-full max-w-[210px] md:max-w-[240px] aspect-[4/5] flex items-end justify-center rounded-2xl bg-gradient-to-b from-white/5 to-transparent p-2 border border-white/5 group-hover:border-sky-500/30 transition-colors duration-500">
                <img
                  src="/Prashant-Kalani-Image.webp"
                  alt="Prashant Kalani - Founder & CEO"
                  className="w-full h-full object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Bio & Details (Right side - 100% Center Aligned Text) */}
            <div className="relative z-10 w-full md:w-7/12 flex flex-col items-center text-center justify-center pl-0 md:pl-8">
              
              {/* Prominent Bold Title Tag */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#0099E8]" />
                <span className="font-mono text-xs md:text-sm font-bold tracking-[0.25em] text-sky-400 uppercase">
                  FOUNDER & CEO
                </span>
              </div>

              <h3 className="font-primary text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 tracking-tight text-center w-full">
                Prashant Kalani
              </h3>

              <p className="font-secondary text-xs md:text-sm text-white/80 font-light leading-relaxed max-w-md text-center mx-auto mb-6">
                With 26+ years of experience in luxury, retail, and construction, Prashant leads with innovation, vision, and precision. Formerly with Ethos and Stonex, he's a horologist at heart and a perfectionist in execution.
              </p>

              {/* Micro Highlight Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300 tracking-wider">
                  26+ YRS LUXURY & RETAIL
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300 tracking-wider">
                  EX-ETHOS & STONEX
                </span>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: L.C. Venkatadhri (Offset Right) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="self-end w-full md:w-[90%] max-w-[860px] rounded-[2.5rem] bg-gradient-to-bl from-[#121318]/95 via-[#0b0c10]/95 to-[#050507]/95 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-sky-400/60 hover:shadow-[0_0_35px_rgba(0,153,232,0.3)] transition-all duration-500 overflow-hidden flex flex-col-reverse md:flex-row items-center justify-between p-7 md:p-10 group relative"
          >
            {/* Holographic Glowing Top Edge Line on Hover */}
            <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Subtle Blueprint Grid Pattern in Background */}
            <div className="absolute inset-0 bg-grid-dots opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-500" />

            {/* Bio & Details (Left side - 100% Center Aligned Text) */}
            <div className="relative z-10 w-full md:w-7/12 flex flex-col items-center text-center justify-center pr-0 md:pr-8 mt-6 md:mt-0">
              
              {/* Prominent Bold Title Tag */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#0099E8]" />
                <span className="font-mono text-xs md:text-sm font-bold tracking-[0.25em] text-sky-400 uppercase">
                  CO-FOUNDER & COO
                </span>
              </div>

              <h3 className="font-primary text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 tracking-tight text-center w-full">
                L.C. Venkatadhri
              </h3>

              <p className="font-secondary text-xs md:text-sm text-white/80 font-light leading-relaxed max-w-md text-center mx-auto mb-6">
                With 35+ years in the construction industry, LCV is a façade expert with unmatched technical and operational skills. A marathon runner and geology postgrad, he drives precision and performance at XterioHub.
              </p>

              {/* Micro Highlight Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300 tracking-wider">
                  35+ YRS FAÇADE EXPERT
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300 tracking-wider">
                  GEOLOGY & MARATHON RUNNER
                </span>
              </div>
            </div>

            {/* Portrait Image Stage (Right side) */}
            <div className="relative z-10 w-full md:w-5/12 flex items-center justify-center md:justify-end">
              <div className="relative w-full max-w-[210px] md:max-w-[240px] aspect-[4/5] flex items-end justify-center rounded-2xl bg-gradient-to-b from-white/5 to-transparent p-2 border border-white/5 group-hover:border-sky-500/30 transition-colors duration-500">
                <img
                  src="/VenkatadhriLC-Image.webp"
                  alt="L.C. Venkatadhri - Co-Founder & COO"
                  className="w-full h-full object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
              </div>
            </div>

          </motion.div>

        </div>

      </section>

    </div>
  );
}
