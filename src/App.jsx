import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
          <Route path="/brands/steni/video" element={<Navigate to="/brands/steni" replace />} />
          <Route path="/steni-showcase" element={<Navigate to="/brands/steni" replace />} />
          <Route path="/steni-reel" element={<Navigate to="/brands/steni" replace />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
