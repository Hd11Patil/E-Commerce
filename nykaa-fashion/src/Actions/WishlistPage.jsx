import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./WishlistPage.css";

// Bring in your image logic so the wishlist pictures match the grid perfectly
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

const WishlistPage = () => {
  // Pull all your state and functions from AppContext
  const { products, wishlist, toggleWishlist, addToCart, cart } = useApp();

  // Find the actual product objects that match the IDs saved in the wishlist array
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <h1>My Wishlist</h1>
        <span className="item-count">
          {wishlistedProducts.length}{" "}
          {wishlistedProducts.length === 1 ? "Item" : "Items"}
        </span>
      </header>

      {wishlistedProducts.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-icon">♡</div>
          <h2>Your wishlist is currently empty</h2>
          <p>Explore our store and add items you love to your wishlist!</p>
          <Link to="/">
            <button className="continue-shopping-btn">Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistedProducts.map((p) => (
            <div key={p.id} className="wishlist-card">
              <div className="card-image-container">
                <img
                  src={getImage(p.id)}
                  alt={p.name}
                  className="product-image"
                />

                {/* Remove button uses your toggleWishlist function */}
                <button
                  className="remove-btn"
                  onClick={() => toggleWishlist(p.id)}
                  title="Remove from wishlist"
                >
                  ✕
                </button>
              </div>

              <div className="card-details">
                <p
                  style={{
                    margin: "0 0 4px 0",
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  {p.brand}
                </p>
                <h3 className="product-name">{p.name}</h3>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: "#000",
                    }}
                  >
                    ₹{p.price.toLocaleString()}
                  </span>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#999",
                      fontSize: "0.9rem",
                    }}
                  >
                    ₹{p.originalPrice.toLocaleString()}
                  </span>
                  <span
                    style={{
                      color: "#388e3c",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                    }}
                  >
                    {p.discount}% off
                  </span>
                </div>

                {/* Cart button uses your cart state to show if it's already added */}
                <button
                  className="add-to-cart-btn"
                  style={{
                    backgroundColor: cart.includes(p.id) ? "#fc2779" : "#fff",
                    color: cart.includes(p.id) ? "#fff" : "#fc2779",
                  }}
                  onClick={() => addToCart(p.id)}
                >
                  {cart.includes(p.id) ? "✓ Added to Cart" : "+ Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
