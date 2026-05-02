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
  discountAmount,
   handleCheckout,
}) => {
  const navigate = useNavigate();

  const handleApply = () => {
    if (!couponCode.trim()) {
      alert("Please enter a coupon code");
      return;
    }
    applyCoupon(couponCode);
  };

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
            disabled={discountAmount > 0} // ✅ lock after apply
          />

          <button
            onClick={handleApply}
            className="coupon-btn"
            disabled={discountAmount > 0} // ✅ prevent multiple apply
          >
            Apply
          </button>
        </div>

        {discountAmount > 0 && (
          <p className="coupon-success">
            🎉 ₹{discountAmount.toLocaleString()} Discount Applied
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
      {discountAmount > 0 && (
        <div className="summary-row discount-row">
          <span>Coupon Discount</span>
          <span>- ₹{discountAmount.toLocaleString()}</span>
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

       <button className="checkout-btn" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CheckoutSummary;
