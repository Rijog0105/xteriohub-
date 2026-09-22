import { Link } from 'react-router-dom';
import { assets } from '../../data/assets';

export default function Footer() {
  const logoUrl = assets.logos.find(l => l.includes('xteriohub')) || assets.logos[0];

  return (
    <footer className="bg-[#030406] text-white border-t border-white/10 relative z-10 w-full flex justify-center mt-24">
      <div className="w-full max-w-[1500px] mx-auto px-8 md:px-16 lg:px-24 pt-28 md:pt-32 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">

          {/* Brand Identity */}
          <div className="flex flex-col items-start justify-start">
            <img src={logoUrl} alt="XTERIOHUB" className="w-40 mb-6" />
            <p className="font-secondary text-[13px] text-white/50 leading-[1.8] font-light">
              Engineering tomorrow's façades. Premium architectural surface solutions for visionary building skins across India.
            </p>
          </div>

          {/* Our Brands - Frontek, Tempio, Steni, Techlam */}
          <div className="flex flex-col items-start md:items-center pt-3 md:pt-5">
            <div className="text-left">
              <h4 className="font-secondary text-[11px] font-bold tracking-[0.25em] uppercase text-sky-400 mb-6">Our Brands</h4>
              <ul className="space-y-3">
                {['Frontek', 'Tempio', 'Steni', 'Techlam'].map(b => (
                  <li key={b}>
                    <Link to={`/brands/${b.toLowerCase()}`} className="font-secondary text-[13px] text-white/60 hover:text-white transition-colors">{b}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Company Navigation */}
          <div className="flex flex-col items-start md:items-center pt-3 md:pt-5">
            <div className="text-left">
              <h4 className="font-secondary text-[11px] font-bold tracking-[0.25em] uppercase text-sky-400 mb-6">Company</h4>
              <ul className="space-y-3">
                {['About', 'Projects', 'Technology', 'Downloads', 'Contact'].map(l => (
                  <li key={l}>
                    <Link to={`/${l.toLowerCase().replace(' ', '-')}`} className="font-secondary text-[13px] text-white/60 hover:text-white transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-start md:items-end pt-3 md:pt-5">
            <div className="text-left md:text-right">
              <h4 className="font-secondary text-[11px] font-bold tracking-[0.25em] uppercase text-sky-400 mb-6">Contact Us</h4>
              <address className="not-italic font-secondary text-[13px] text-white/60 space-y-3 leading-relaxed">
                <p>Pan India Execution</p>
                <p><a href="mailto:info@xteriohub.com" className="hover:text-white transition-colors">info@xteriohub.com</a></p>
                <p><a href="tel:+919731679545" className="hover:text-white transition-colors">+91 97316 79545</a></p>
              </address>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-secondary text-[12px] text-white/40">© {new Date().getFullYear()} XTERIOHUB. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="font-secondary text-[12px] text-white/40 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="font-secondary text-[12px] text-white/40 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
