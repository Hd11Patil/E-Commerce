import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
  } = useApp();

  // ================= DATA =================
  const cartProducts = products.filter((p) => cart.includes(p.id));

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

  // ================= STATE =================
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  // ================= COUPON =================
  const applyCoupon = async (code) => {
    try {
      const res = await axios.post("http://localhost:3001/apply-coupon", {
        code,
        cartTotal: baseTotal,
      });

      if (res.data.success) {
        setDiscountAmount(res.data.discountAmount);
        setFinalTotal(res.data.finalAmount);
      } else {
        setDiscountAmount(0);
        setFinalTotal(baseTotal);
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Always sync total correctly
  useEffect(() => {
    if (discountAmount > 0) {
      setFinalTotal(baseTotal - discountAmount);
    } else {
      setFinalTotal(baseTotal);
    }
  }, [baseTotal, discountAmount]);

  // reset coupon if cart changes
  useEffect(() => {
    setDiscountAmount(0);
    setCouponCode("");
  }, [cart]);

  // ✅ IMPORTANT: PASS EVERYTHING TO CHECKOUT
  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        cartProducts,
        baseTotal,
        finalTotal,
        discountAmount,
        couponCode,
      },
    });
  };

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>Shopping Bag</h1>
        <span className="item-count">
          {cartProducts.length}{" "}
          {cartProducts.length === 1 ? "Item" : "Items"}
        </span>
      </header>

      {cartProducts.length === 0 ? (
        <div className="empty-cart">
          <h2>Your shopping bag is empty</h2>
          <Link to="/">
            <button className="continue-shopping-btn">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items-section">
            {cartProducts.map((p) => (
              <div key={p.id} className="cart-item-card">
                <img src={getImage(p.id)} alt={p.name} />

                <div className="cart-item-details">
                  <p>{p.brand}</p>
                  <h3>{p.name}</h3>
                  <div>
                    ₹{p.price} <del>₹{p.originalPrice}</del>
                  </div>
                </div>

                <div>
                  <button onClick={() => removeFromCart(p.id)}>
                    Remove
                  </button>
                  <button onClick={() => moveToSavedForLater(p.id)}>
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>

          <CheckoutSummary
            totalMRP={totalMRP}
            totalDiscount={totalDiscount}
            finalTotal={finalTotal}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            applyCoupon={applyCoupon}
            discountAmount={discountAmount}
            handleCheckout={handleCheckout} // ✅ THIS IS CRITICAL
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;