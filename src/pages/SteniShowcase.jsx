import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, Droplets, Flame, Thermometer, Wind, 
  ArrowRight, Download, CheckCircle, ExternalLink,
  Layers, Sparkles, Building2, Cpu
} from 'lucide-react';
import SteniProductVideo from '../components/video/SteniProductVideo';
import FloatingFacadeElements from '../components/common/FloatingFacadeElements';

export default function SteniShowcase() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07080a] text-white selection:bg-sky-500 selection:text-white pt-24 pb-24 overflow-hidden">
      
      {/* Background Architectural Ambient Light Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating 3D Facade Geometry Elements */}
      <FloatingFacadeElements />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-white/50 mb-8 uppercase">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/brands/steni" className="hover:text-white transition-colors">Steni</Link>
          <span>/</span>
          <span className="text-sky-400">9:16 Performance Reel</span>
        </div>

        {/* Hero Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-sky-400 uppercase mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Continuous 8-Second Architectural Video</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-['Outfit'] mb-5">
              STENI® Façade Performance
            </h1>

            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">
              Experience the 4 cornerstone engineering pillars of Norwegian stone-composite façade panels. Continuous architectural subject with seamless fluid transitions, real-time physics, and minimal Scandinavian aesthetics.
            </p>
          </motion.div>
        </div>

        {/* Centerpiece 9:16 Video Player & Inspector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-24"
        >
          <SteniProductVideo />
        </motion.div>

        {/* 4 Feature Deep-Dive Grid */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white mb-3">
              Four Pillars of Norwegian Engineering
            </h2>
            <p className="text-sm text-white/60">
              Rigorously tested in the harsh Norwegian climate to withstand extreme weather, thermal shocks, and fire hazards for over 60 years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-500/40 transition-all group backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Droplets className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-sky-400 tracking-widest uppercase block mb-1">0.0s – 2.0s</span>
              <h3 className="text-lg font-bold text-white font-['Outfit'] mb-2">WATER RESISTANT</h3>
              <p className="text-xs text-white/65 leading-relaxed mb-4">
                100% moisture-impervious fiberglass-reinforced composite stone core. Zero water absorption eliminates freeze-thaw spalling, delamination, and efflorescence permanently.
              </p>
              <ul className="text-[11px] font-mono text-white/50 space-y-1.5 border-t border-white/5 pt-3">
                <li>• Water Absorption: 0.00%</li>
                <li>• Hydrophobic Contact Angle: 114°</li>
                <li>• Freeze-Thaw Resistance: Infinite</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/40 transition-all group backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-amber-400 tracking-widest uppercase block mb-1">2.0s – 4.0s</span>
              <h3 className="text-lg font-bold text-white font-['Outfit'] mb-2">FIRE RESISTANT</h3>
              <p className="text-xs text-white/65 leading-relaxed mb-4">
                European Class A2-s1, d0 non-combustible classification. Tested to endure direct 850°C flame exposure with zero burning droplets and minimal non-toxic smoke development.
              </p>
              <ul className="text-[11px] font-mono text-white/50 space-y-1.5 border-t border-white/5 pt-3">
                <li>• Euroclass: EN 13501-1 (A2-s1, d0)</li>
                <li>• Direct Exposure: 850°C Certified</li>
                <li>• Smoke Index: s1 (Minimal)</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 transition-all group backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Thermometer className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-purple-400 tracking-widest uppercase block mb-1">4.0s – 6.0s</span>
              <h3 className="text-lg font-bold text-white font-['Outfit'] mb-2">THERMALLY STABLE</h3>
              <p className="text-xs text-white/65 leading-relaxed mb-4">
                Ultra-low thermal expansion coefficient (0.014 mm/m·K). Resists severe thermal expansion and contraction between -50°C Arctic winters and +80°C desert solar heat.
              </p>
              <ul className="text-[11px] font-mono text-white/50 space-y-1.5 border-t border-white/5 pt-3">
                <li>• Coeff. of Expansion: 0.014 mm/m·K</li>
                <li>• Temperature Span: -50°C to +80°C</li>
                <li>• Joint Tolerance: 4mm Tight Seams</li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-all group backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Wind className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase block mb-1">6.0s – 8.0s</span>
              <h3 className="text-lg font-bold text-white font-['Outfit'] mb-2">VENTILATED FAÇADE</h3>
              <p className="text-xs text-white/65 leading-relaxed mb-4">
                Rear cavity design creates continuous chimney-effect buoyancy airflow. Dissipates moisture, equalizes wind pressure, and lowers structural building HVAC energy demands.
              </p>
              <ul className="text-[11px] font-mono text-white/50 space-y-1.5 border-t border-white/5 pt-3">
                <li>• Cavity Clearance: 38mm Clear Depth</li>
                <li>• Convective Velocity: 0.42 m/s</li>
                <li>• Pressure Equalization: Rainscreen Compliant</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Comparison Matrix Section */}
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md mb-20 overflow-x-auto">
          <div className="mb-6">
            <h3 className="text-xl font-bold font-['Outfit'] text-white mb-1">
              Material Performance Matrix
            </h3>
            <p className="text-xs text-white/50">
              Comprehensive comparison against standard architectural façade cladding materials.
            </p>
          </div>

          <table className="w-full text-left text-xs font-mono min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10 text-white/40 uppercase">
                <th className="py-3 px-4">Performance Criteria</th>
                <th className="py-3 px-4 text-sky-400 font-bold bg-sky-500/10 rounded-t-lg">STENI Stone Composite</th>
                <th className="py-3 px-4">Fiber Cement</th>
                <th className="py-3 px-4">ACM Panels</th>
                <th className="py-3 px-4">HPL Laminate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              <tr>
                <td className="py-3.5 px-4 font-sans font-medium text-white">Water Absorption</td>
                <td className="py-3.5 px-4 font-bold text-sky-400 bg-sky-500/5">0.00% (Impermeable)</td>
                <td className="py-3.5 px-4 text-white/60">7.0% - 12.0%</td>
                <td className="py-3.5 px-4 text-white/60">0.02%</td>
                <td className="py-3.5 px-4 text-white/60">1.0% - 3.0%</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-sans font-medium text-white">Fire Rating (EN 13501-1)</td>
                <td className="py-3.5 px-4 font-bold text-sky-400 bg-sky-500/5">A2-s1, d0 (Non-Combustible)</td>
                <td className="py-3.5 px-4 text-white/60">A2-s1, d0</td>
                <td className="py-3.5 px-4 text-white/60">B-s1, d0 / FR</td>
                <td className="py-3.5 px-4 text-white/60">B-s2, d0</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-sans font-medium text-white">Thermal Expansion</td>
                <td className="py-3.5 px-4 font-bold text-sky-400 bg-sky-500/5">0.014 mm/m·K (Ultra Low)</td>
                <td className="py-3.5 px-4 text-white/60">0.010 mm/m·K</td>
                <td className="py-3.5 px-4 text-white/60">0.024 mm/m·K</td>
                <td className="py-3.5 px-4 text-white/60">0.020 mm/m·K</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-sans font-medium text-white">Written Functional Warranty</td>
                <td className="py-3.5 px-4 font-bold text-sky-400 bg-sky-500/5">60 Years Guaranteed</td>
                <td className="py-3.5 px-4 text-white/60">10 - 15 Years</td>
                <td className="py-3.5 px-4 text-white/60">10 - 15 Years</td>
                <td className="py-3.5 px-4 text-white/60">10 Years</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-sans font-medium text-white">Impact & Blast Resistance</td>
                <td className="py-3.5 px-4 font-bold text-sky-400 bg-sky-500/5">Extreme (Crushed Stone + Glass Mesh)</td>
                <td className="py-3.5 px-4 text-white/60">Moderate (Brittle)</td>
                <td className="py-3.5 px-4 text-white/60">Moderate (Dents)</td>
                <td className="py-3.5 px-4 text-white/60">High</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA & Next Steps */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-md">
          <div>
            <h3 className="text-xl font-bold font-['Outfit'] text-white mb-1">
              Explore the STENI Collection
            </h3>
            <p className="text-xs text-white/60">
              Discover Steni Colour, Steni Nature, and Steni Vision architectural projects worldwide.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/brands/steni/collections"
              className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-semibold tracking-wider uppercase transition-all shadow-lg flex items-center gap-2"
            >
              <span>View Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/brands/steni/projects"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase transition-all border border-white/10"
            >
              Case Studies
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
