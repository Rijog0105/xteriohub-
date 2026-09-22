import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './Navbar';
import Footer from './Footer';
import Preloader from '../animations/Preloader';
import WhatsAppButton from '../common/WhatsAppButton';

export default function Layout({ children, navbarVisible = true }) {
  const [showPreloader, setShowPreloader] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    setShowPreloader(true);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    // Lock scroll during preloader
    if (showPreloader && !preloaderDone) {
      lenis.stop();
    } else {
      lenis.start();
    }

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [showPreloader, preloaderDone]);

  const handlePreloaderComplete = () => {
    setPreloaderDone(true);
    setShowPreloader(false);
  };

  return (
    <>
      {/* Preloader sits ON TOP of homepage — homepage renders underneath but is hidden by the overlay */}
      {showPreloader && !preloaderDone && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      <div
        className="min-h-screen flex flex-col bg-transparent text-text"
        style={{
          opacity: preloaderDone || !showPreloader ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <Navbar visible={preloaderDone || !showPreloader} />
        <main className="flex-grow">{children}</main>
        <Footer />

        {/* Global Floating WhatsApp Direct Chat Button */}
        <WhatsAppButton />
      </div>
    </>
  );
}
