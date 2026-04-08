import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // IMPORT ROUTER
import "./App.css";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import TrendingSection from "./components/TrendingSection";
import PromoBanner from "./components/PromoBanner";
import ProductGrid from "./components/ProductGrid";
import BrandStrip from "./components/BrandStrip";
import Footer from "./components/Footer";
import AdminPanel from "./admin/AdminPanel";
import WishlistPage from "./Actions/WishlistPage";
import CartPage from "./Actions/CartPage";
import TopBar from "./components/TopBar";
import LoginPage from "./Login/LoginPage";
import RegisterPage from "./Login/RegisterPage";
import AccountPage from "./Account/AccountPage";
import ProtectedRoute from "./Account/ProtectedRoute";
// Create a simple wrapper for your homepage content so it's clean
const HomeContent = () => (
  <>
    <HeroBanner />
    <TrendingSection />
    <PromoBanner />
    <ProductGrid />
    <BrandStrip />
  </>
);

const AppInner = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  const { isAdmin, setIsAdmin } = useApp();

  const handleAdminClick = () => {
    if (isAdmin) {
      setIsAdmin(false);
      setAdminOpen(false);
    } else {
      setIsAdmin(true);
      setAdminOpen(true);
    }
  };

  return (
    <div className="app">
      <TopBar />
      <Navbar onAdminClick={handleAdminClick} />

      <main>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomeContent />} />

          {/* Account */}

          <Route path="/account" element={<AccountPage />} />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                {" "}
                <AccountPage />{" "}
              </ProtectedRoute>
            }
          />

          {/* Wishlist */}
          <Route path="/wishlist" element={<WishlistPage />} />

          {/* Cart */}
          <Route path="/cart" element={<CartPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 404 */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>

      <Footer />
      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      {/* Wrap AppInner in the Router */}
      <Router>
        <AppInner />
      </Router>
    </AppProvider>
  );
}

export default App;
