import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CheckoutSummary = ({
  totalMRP,
  totalDiscount,
  finalTotal,
  couponCode,
  setCouponCode,
  applyCoupon,
  discountPercent,
}) => {
  const navigate = useNavigate();

  return (
    <div className="cart-summary-section">
      <h3>Price Details</h3>

      {/* COUPON SECTION */}

      <div className="coupon-section">
        <div className="coupon-box">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="coupon-input"
          />

          <button
            onClick={() => applyCoupon(couponCode)}
          className="coupon-btn" 
          >
            Apply
          </button>
        </div>

        {discountPercent > 0 && (
          <p className="coupon-success">
            🎉 {discountPercent}% Discount Applied
          </p>
        )}
      </div>

      <div className="summary-row">
        <span>Total MRP</span>
        <span>₹{totalMRP.toLocaleString()}</span>
      </div>

      <div className="summary-row discount-row">
        <span>Product Discount</span>
        <span>- ₹{totalDiscount.toLocaleString()}</span>
      </div>

      {/* COUPON DISCOUNT */}
      {discountPercent > 0 && (
        <div className="summary-row discount-row">
          <span>Coupon Discount ({discountPercent}%)</span>
          <span>
            - ₹
            {(
              (finalTotal * discountPercent) /
              (100 - discountPercent)
            ).toLocaleString()}
          </span>
        </div>
      )}

      <div className="summary-row">
        <span>Shipping Fee</span>
        <span className="free-shipping">FREE</span>
      </div>

      <hr className="summary-divider" />

      <div className="summary-row grand-total">
        <span>Total Amount</span>
        <span>₹{finalTotal.toLocaleString()}</span>
      </div>

      <button className="checkout-btn" onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CheckoutSummary;
