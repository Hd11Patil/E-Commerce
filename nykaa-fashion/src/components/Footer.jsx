import React from "react";
import "./Footer.css";
const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <div className="footer-logo">
          <span className="footer-logo-nykaa">TECYGIG</span>
          <span className="footer-logo-fashion">FASHION</span>
        </div>
        <p className="footer-tagline">
          Your one-stop fashion destination for women, men & kids.
        </p>
        <div className="footer-socials">
          {["📘", "📸", "🐦", "▶️"].map((s) => (
            <a href="#" key={s} className="social-btn">
              {s}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-col">
        <h4>Shop</h4>
        <ul>
          {["Women", "Men", "Kids", "Home", "Beauty", "All Brands"].map((l) => (
            <li key={l}>
              <a href="#">{l}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-col">
        <h4>Help</h4>
        <ul>
          {[
            "FAQs",
            "Track Order",
            "Returns & Refunds",
            "Shipping Info",
            "Contact Us",
          ].map((l) => (
            <li key={l}>
              <a href="#">{l}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-col">
        <h4>Company</h4>
        <ul>
          {[
            "About Us",
            "Careers",
            "Press",
            "Sustainability",
            "Terms of Use",
          ].map((l) => (
            <li key={l}>
              <a href="#">{l}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-newsletter">
        <h4>Stay in Style</h4>
        <p>Subscribe to get the latest trends & exclusive offers.</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Your email address" />
          <button>Subscribe</button>
        </div>
        <div className="app-badges">
          <a href="#" className="app-badge">
            🍎 App Store
          </a>
          <a href="#" className="app-badge">
            ▶ Play Store
          </a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="footer-bottom-inner">
        <p className="footer-copy">
          © 2026 TECYGIG Fashion. All rights reserved.
        </p>
        <div className="payment-icons">
          {[
            "💳 Visa",
            "💳 Mastercard",
            "📱 UPI",
            "🏦 Net Banking",
            "💰 COD",
          ].map((p) => (
            <span key={p} className="payment-icon">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
