import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import CheckoutSummary from "./CheckoutSummary";
import "./CartPage.css";

const PRODUCT_IMAGES = {
  1: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
  2: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80",
  3: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80",
  4: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80",
  5: "https://images.unsplash.com/photo-1536766820879-059fec98ec0a?q=80&w=1974&auto=format&fit=crop",
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
  const navigate = useNavigate();

  const {
    products,
    cart,
    removeFromCart,
    savedForLater,
    moveToSavedForLater,
    moveSavedToCart,
    removeFromSavedForLater,
  } = useApp();

  // ================= STATE (MUST BE FIRST) =================
  const [couponCode, setCouponCode] = React.useState("");
  const [discountPercent, setDiscountPercent] = React.useState(0);

  // ================= DATA =================
  const cartProducts = products.filter((p) => cart.includes(p.id));
  const savedProducts = products.filter((p) => savedForLater.includes(p.id));

  const totalMRP = cartProducts.reduce(
    (sum, item) => sum + item.originalPrice,
    0
  );

  const totalDiscount = cartProducts.reduce(
    (sum, item) => sum + (item.originalPrice - item.price),
    0
  );

  const baseTotal = cartProducts.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const couponDiscount = (baseTotal * discountPercent) / 100;
  const finalTotal = baseTotal - couponDiscount;

  // ================= COUPON LOGIC =================
  const applyCoupon = (code) => {
    const c = code.trim().toUpperCase();

    if (c === "SAVE10") {
      setDiscountPercent(10);
    } else if (c === "SAVE20") {
      setDiscountPercent(20);
    } else if (c === "WELCOME5") {
      setDiscountPercent(5);
    } else {
      setDiscountPercent(0);
      alert("Invalid Coupon Code");
    }
  };

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

            {/* CART ITEMS */}
            {cartProducts.map((p) => (
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
                    <span className="item-price">₹{p.price}</span>
                    <span className="item-original-price">
                      ₹{p.originalPrice}
                    </span>
                    <span className="item-discount">{p.discount}% off</span>
                  </div>
                </div>

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

            {/* SAVED ITEMS */}
            {savedProducts.length > 0 && (
              <div className="saved-for-later-section">
                <h3>Saved for Later ({savedProducts.length})</h3>

                {savedProducts.map((p) => (
                  <div key={p.id} className="cart-item-card saved-card">
                    <img src={getImage(p.id)} alt={p.name} />

                    <div className="cart-item-details">
                      <p className="item-brand">{p.brand}</p>
                      <h3 className="item-name">{p.name}</h3>
                      <div className="item-price-row">
                        <span className="item-price">₹{p.price}</span>
                      </div>
                    </div>

                    <div className="cart-item-actions">
                      <button
                        className="text-action-btn"
                        onClick={() => removeFromSavedForLater(p.id)}
                      >
                        Remove
                      </button>

                      <span className="action-divider">|</span>

                      <button
                        className="text-action-btn"
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

          {/* SUMMARY */}
          {cartProducts.length > 0 && (
            <CheckoutSummary
              totalMRP={totalMRP}
              totalDiscount={totalDiscount}
              finalTotal={finalTotal}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              applyCoupon={applyCoupon}
              discountPercent={discountPercent}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
