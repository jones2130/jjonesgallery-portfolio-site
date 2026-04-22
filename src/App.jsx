import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import ArtDetail from '@/pages/ArtDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

const AdminMigrate = import.meta.env.DEV ? lazy(() => import('@/pages/AdminMigrate')) : null;

export default function App() {
  return (
    <div className="site-wrapper">
      <Navbar />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/art/:slug" element={<ArtDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {import.meta.env.DEV && AdminMigrate && (
            <Route 
              path="/admin/migrate" 
              element={
                <Suspense fallback={<div>Loading Admin...</div>}>
                  <AdminMigrate />
                </Suspense>
              } 
            />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
