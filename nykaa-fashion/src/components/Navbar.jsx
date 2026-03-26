import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Navbar.css';

const NAV_ITEMS = ['Women', 'Men', 'Kids', 'Home', 'All Brands', 'More'];

const Navbar = ({ onAdminClick }) => {
  const { cart, wishlist, isAdmin } = useApp();
  const [search, setSearch] = useState('');
  const [active, setActive] = useState('Women');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>

        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-nykaa">NYKAA</span>
          <span className="logo-fashion">FASHION</span>
        </div>

        {/* Nav links desktop */}
        <nav className={`navbar-links${menuOpen ? ' open' : ''}`}>
          {NAV_ITEMS.map(item => (
            <button key={item} className={`nav-link${active === item ? ' active' : ''}`}
              onClick={() => { setActive(item); setMenuOpen(false); }}>
              {item}
            </button>
          ))}
          <button className="nav-link admin-nav-link" onClick={() => { onAdminClick(); setMenuOpen(false); }}>
            {isAdmin ? '🔴 Exit Admin' : '⚙️ Admin'}
          </button>
        </nav>

        {/* Search */}
        <div className="navbar-search">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search for products, styles, brand"
            value={search} onChange={e => setSearch(e.target.value)} />
          <button className="camera-btn" title="Visual Search">📷</button>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          <button className="action-btn hide-sm">
            <span className="action-icon">👤</span>
            <span className="action-label">Account</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">♡</span>
            <span className="action-label hide-sm">Wishlist</span>
            {wishlist.length > 0 && <span className="action-badge">{wishlist.length}</span>}
          </button>
          <button className="action-btn">
            <span className="action-icon">🛒</span>
            <span className="action-label hide-sm">Cart</span>
            {cart.length > 0 && <span className="action-badge">{cart.length}</span>}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="mobile-search">
        <span>🔍</span>
        <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
    </header>
  );
};
export default Navbar;
