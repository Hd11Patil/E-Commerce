import React from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./SearchPage.css";

const SearchPage = () => {
  // GET SEARCH TEXT FROM URL
  const { query } = useParams();

  // GET PRODUCTS FROM CONTEXT
  const { products, addToCart, cart, wishlist, toggleWishlist } = useApp();

  // FILTER PRODUCTS
  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <section className="product-section">
      <div className="container">
        {/* HEADER */}
        <div className="section-header">
          <h2 className="section-title">Search Results for "{query}"</h2>
        </div>

        {/* NO RESULTS */}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              padding: "50px 0",
              textAlign: "center",
            }}
          >
            <h2>No products found</h2>
          </div>
        ) : (
          // PRODUCTS
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <div className="product-card" key={p.id}>
                {/* IMAGE */}
                <div className="product-img">
                  <img src={p.image} alt={p.name} className="product-photo" />

                  <div className="product-overlay" />

                  <div className="product-discount-tag">{p.discount}% OFF</div>

                  {/* WISHLIST */}
                  <button
                    className={`wishlist-btn ${
                      wishlist.includes(p.id) ? "wished" : ""
                    }`}
                    onClick={() => toggleWishlist(p.id)}
                  >
                    {wishlist.includes(p.id) ? "♥" : "♡"}
                  </button>
                </div>

                {/* INFO */}
                <div className="product-info">
                  <p className="product-brand">{p.brand}</p>

                  <p className="product-name">{p.name}</p>

                  <div className="product-prices">
                    <span className="price-current">₹{p.price}</span>

                    <span className="price-original">₹{p.originalPrice}</span>

                    <span className="price-off">({p.discount}% off)</span>
                  </div>

                  {/* CART */}
                  <button
                    className={`add-cart-btn ${
                      cart.includes(p.id) ? "in-cart" : ""
                    }`}
                    onClick={() => addToCart(p.id)}
                  >
                    {cart.includes(p.id) ? "✓ Added" : "+ Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
