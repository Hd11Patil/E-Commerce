import React from 'react';
import { useApp } from '../context/AppContext';
import './ProductGrid.css';

const ProductGrid = () => {
  const { products, wishlist, toggleWishlist, addToCart, cart } = useApp();
  return (
    <section className="product-section">
      <div className="container">
        <div className="section-header"><h2 className="section-title">Top Picks For You</h2><a href="#" className="see-all">View All →</a></div>
        <div className="product-grid">
          {products.map(p => (
            <div className="product-card" key={p.id}>
              <div className="product-img" style={{background:p.color}}>
                <span className="product-emoji">{p.emoji}</span>
                <div className="product-discount-tag">{p.discount}% OFF</div>
                <button className={`wishlist-btn${wishlist.includes(p.id)?' wished':''}`} onClick={() => toggleWishlist(p.id)}>
                  {wishlist.includes(p.id)?'♥':'♡'}
                </button>
              </div>
              <div className="product-info">
                <p className="product-brand">{p.brand}</p>
                <p className="product-name">{p.name}</p>
                <div className="product-prices">
                  <span className="price-current">₹{p.price.toLocaleString()}</span>
                  <span className="price-original">₹{p.originalPrice.toLocaleString()}</span>
                  <span className="price-off">({p.discount}% off)</span>
                </div>
                <button className={`add-cart-btn${cart.includes(p.id)?' in-cart':''}`} onClick={() => addToCart(p.id)}>
                  {cart.includes(p.id)?'✓ Added':'+ Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProductGrid;
