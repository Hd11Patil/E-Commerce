import React from "react";
import { useApp } from "../context/AppContext";
import "./ProductGrid.css";

const PRODUCT_IMAGES = {
  1: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
  2: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80",
  3: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80",
  4: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80",
  5: "https://images.unsplash.com/photo-1536766820879-059fec98ec0a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  6: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
  7: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
  8: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
  "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&q=80",
  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80",
];

const getImage = (id) =>
  PRODUCT_IMAGES[id] || FALLBACK_IMAGES[id % FALLBACK_IMAGES.length];

const ProductGrid = () => {
  const { products, wishlist, toggleWishlist, addToCart, cart } = useApp();

  return (
    <section className="product-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Top Picks For You</h2>
          <a href="#" className="see-all">
            View All →
          </a>
        </div>
        <div className="product-grid">
          {products.map((p) => (
            <div className="product-card" key={p.id}>
              <div className="product-img">
                <img
                  src={getImage(p.id)}
                  alt={p.name}
                  className="product-photo"
                />
                <div className="product-overlay" />
                <div className="product-discount-tag">{p.discount}% OFF</div>
                <button
                  className={`wishlist-btn${wishlist.includes(p.id) ? " wished" : ""}`}
                  onClick={() => toggleWishlist(p.id)}
                >
                  {wishlist.includes(p.id) ? "♥" : "♡"}
                </button>
              </div>
              <div className="product-info">
                <p className="product-brand">{p.brand}</p>
                <p className="product-name">{p.name}</p>
                <div className="product-prices">
                  <span className="price-current">
                    ₹{p.price.toLocaleString()}
                  </span>
                  <span className="price-original">
                    ₹{p.originalPrice.toLocaleString()}
                  </span>
                  <span className="price-off">({p.discount}% off)</span>
                </div>
                <button
                  className={`add-cart-btn${cart.includes(p.id) ? " in-cart" : ""}`}
                  onClick={() => addToCart(p.id)}
                >
                  {cart.includes(p.id) ? "✓ Added" : "+ Add to Cart"}
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
