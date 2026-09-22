import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Brands from './pages/Brands';
import BrandLanding from './pages/BrandLanding';
import BrandCollections from './pages/BrandCollections';
import BrandProjects from './pages/BrandProjects';
import Projects from './pages/Projects';
import Technology from './pages/Technology';
import Downloads from './pages/Downloads';
import Contact from './pages/Contact';
import SteniShowcase from './pages/SteniShowcase';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/:brandId" element={<BrandLanding />} />
          <Route path="/brands/:brandId/collections" element={<BrandCollections />} />
          <Route path="/brands/:brandId/projects" element={<BrandProjects />} />
          <Route path="/brands/steni/video" element={<SteniShowcase />} />
          <Route path="/steni-showcase" element={<SteniShowcase />} />
          <Route path="/steni-reel" element={<SteniShowcase />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
