import React, { useState } from 'react';
import './App.css';
import { AppProvider, useApp } from './context/AppContext';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategoryStrip from './components/CategoryStrip';
import TrendingSection from './components/TrendingSection';
import PromoBanner from './components/PromoBanner';
import ProductGrid from './components/ProductGrid';
import BrandStrip from './components/BrandStrip';
import Footer from './components/Footer';
import AdminPanel from './admin/AdminPanel';

const AppInner = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  const { isAdmin, setIsAdmin } = useApp();

  const handleAdminClick = () => {
    if (isAdmin) { setIsAdmin(false); setAdminOpen(false); }
    else { setIsAdmin(true); setAdminOpen(true); }
  };

  return (
    <div className="app">
      <Topbar />
      <Navbar onAdminClick={handleAdminClick} />
      <main>
        <HeroBanner />
        <CategoryStrip />
        <TrendingSection />
        <PromoBanner />
        <ProductGrid />
        <BrandStrip />
      </main>
      <Footer />
      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
    </div>
  );
};

function App() {
  return <AppProvider><AppInner /></AppProvider>;
}
export default App;
