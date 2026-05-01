import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

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
];
const getImage = (id) =>
  PRODUCT_IMAGES[id] || FALLBACK_IMAGES[id % FALLBACK_IMAGES.length];

const CartPage = () => {
  const {
    products,
    cart,
    removeFromCart,
    savedForLater,
    moveToSavedForLater,
    moveSavedToCart,
    removeFromSavedForLater,
  } = useApp();

  const cartProducts = products.filter((p) => cart.includes(p.id));
  const savedProducts = products.filter((p) => savedForLater.includes(p.id));

  const totalMRP = cartProducts.reduce(
    (sum, item) => sum + item.originalPrice,
    0,
  );
  const totalDiscount = cartProducts.reduce(
    (sum, item) => sum + (item.originalPrice - item.price),
    0,
  );
  const finalTotal = cartProducts.reduce((sum, item) => sum + item.price, 0);

  //  for ckeckout navigation

  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>Shopping Bag</h1>
        <span className="item-count">
          {cartProducts.length} {cartProducts.length === 1 ? "Item" : "Items"}
        </span>
      </header>

      {cartProducts.length === 0 && savedProducts.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>Your shopping bag is empty</h2>
          <p>Let's add some items to your cart to get started.</p>
          <Link to="/">
            <button className="continue-shopping-btn">Start Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items-section">
            {/* ACTIVE CART ITEMS */}
            {cartProducts.length > 0 &&
              cartProducts.map((p) => (
                <div key={p.id} className="cart-item-card">
                  <img
                    src={getImage(p.id)}
                    alt={p.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <p className="item-brand">{p.brand}</p>
                    <h3 className="item-name">{p.name}</h3>
                    <div className="item-price-row">
                      <span className="item-price">
                        ₹{p.price.toLocaleString()}
                      </span>
                      <span className="item-original-price">
                        ₹{p.originalPrice.toLocaleString()}
                      </span>
                      <span className="item-discount">{p.discount}% off</span>
                    </div>
                  </div>

                  {/* ALIGNED ACTION BUTTONS */}
                  <div className="cart-item-actions">
                    <button
                      className="text-action-btn cart-remove-btn"
                      onClick={() => removeFromCart(p.id)}
                    >
                      Remove
                    </button>

                    <span className="action-divider">|</span>

                    <button
                      className="text-action-btn save-btn"
                      onClick={() => moveToSavedForLater(p.id)}
                    >
                      Save for Later
                    </button>
                  </div>
                </div>
              ))}

            {/* SAVED FOR LATER SECTION */}
            {savedProducts.length > 0 && (
              <div className="saved-for-later-section">
                <h3 className="saved-header">
                  Saved for Later ({savedProducts.length})
                </h3>
                {savedProducts.map((p) => (
                  <div key={p.id} className="cart-item-card saved-card">
                    <img
                      src={getImage(p.id)}
                      alt={p.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <p className="item-brand">{p.brand}</p>
                      <h3 className="item-name">{p.name}</h3>
                      <div className="item-price-row">
                        <span className="item-price">
                          ₹{p.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* ALIGNED ACTION BUTTONS */}
                    <div className="cart-item-actions">
                      <button
                        className="text-action-btn cart-remove-btn"
                        onClick={() => removeFromSavedForLater(p.id)}
                      >
                        Remove
                      </button>

                      <span className="action-divider">|</span>

                      <button
                        className="text-action-btn add-back-btn"
                        onClick={() => moveSavedToCart(p.id)}
                      >
                        Move to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ORDER SUMMARY */}
          {cartProducts.length > 0 && (
            <div className="cart-summary-section">
              <h3>Price Details</h3>
              <div className="summary-row">
                <span>Total MRP</span>
                <span>₹{totalMRP.toLocaleString()}</span>
              </div>
              <div className="summary-row discount-row">
                <span>Discount on MRP</span>
                <span>- ₹{totalDiscount.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping Fee</span>
                <span className="free-shipping">FREE</span>
              </div>
              <hr className="summary-divider" />
              <div className="summary-row grand-total">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
