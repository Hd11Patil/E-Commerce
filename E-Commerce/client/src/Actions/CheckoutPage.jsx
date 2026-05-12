import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { products, cart } = useApp();
  const location = useLocation();

  // ✅ GET DATA FROM CART PAGE
  const {
    cartProducts: passedCartProducts,
    finalTotal: passedFinalTotal,
    discountAmount,
    couponCode,
  } = location.state || {};

  // fallback (if user refresh)
  const cartProducts =
    passedCartProducts || products.filter((p) => cart.includes(p.id));

  const finalTotal =
    passedFinalTotal || cartProducts.reduce((sum, item) => sum + item.price, 0);

  // ================= ADDRESS =================
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("user_addresses");
    const parsed = raw ? JSON.parse(raw) : [];

    setSavedAddresses(parsed);

    const lastSelected = localStorage.getItem("selected_address");
    if (lastSelected) {
      setSelectedAddress(JSON.parse(lastSelected));
    }
  }, []);

  const handleSelectAddress = (addr) => {
    setSelectedAddress(addr);
    setAddress(addr);
    localStorage.setItem("selected_address", JSON.stringify(addr));
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    setSelectedAddress(null);
  };

  // ================= PAYMENT =================

  const handlePlaceOrder = async () => {
    const finalAddress = selectedAddress || address;

    const { name, phone, pincode, city, state, addressLine } = finalAddress;

    // ✅ Validate address
    if (!name || !phone || !pincode || !city || !state || !addressLine) {
      alert("⚠️ Select or fill address");
      return;
    }

    try {
      // 🔥 Calculate original total (before coupon)
      const originalTotal = cartProducts.reduce(
        (sum, item) => sum + item.price,
        0,
      );

      // ✅ Save order summary (for success page)
      localStorage.setItem(
        "order_summary",
        JSON.stringify({
          totalAmount: originalTotal,
          finalAmount: finalTotal,
          discountAmount,
          couponCode,
        }),
      );

      // ✅ Save address
      localStorage.setItem("order_address", JSON.stringify(finalAddress));

      // 🔥 Create Stripe session
      const response = await fetch(
        "https://e-commerce-bfn8.onrender.com/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems: cartProducts,
            totalAmount: originalTotal,
            couponCode,

            // 🔥 IMPORTANT FIX (LOCALHOST + VERCEL SUPPORT)
            origin: window.location.origin,
          }),
        },
      );

      const data = await response.json();

      if (!data.url) {
        alert("Payment session failed");
        return;
      }

      // 🚀 Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Something went wrong while placing order");
    }
  };
  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-container">
        {/* LEFT */}
        <div className="checkout-left">
          <div className="card">
            <h3>Order Items</h3>

            {cartProducts.map((p) => (
              <div key={p.id} className="checkout-item">
                {/* <img src={getImage(p.id)} alt={p.name} /> */}
                <img src={p.image} alt={p.name} />
                <div className="item-info">
                  <p className="item-name">{p.name}</p>
                  <p className="item-price">₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h3>Delivery Address</h3>

            {savedAddresses.length > 0 && (
              <div className="checkout-saved-addresses">
                {savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`checkout-address-card ${
                      selectedAddress?.id === addr.id ? "selected-address" : ""
                    }`}
                  >
                    {/* CLICKABLE AREA */}
                    <div onClick={() => handleSelectAddress(addr)}>
                      <p className="checkout-address-name">
                        {addr.name}
                        <span> ({addr.phone})</span>
                      </p>

                      <p className="checkout-address-line">
                        {addr.addressLine}
                      </p>

                      <p className="checkout-address-location">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                    </div>

                    {/* BUTTONS */}
                    <div className="checkout-address-actions">
                      {/* <button
                        className="checkout-edit-btn"
                        onClick={() => handleSelectAddress(addr)}
                      >
                        Edit
                      </button> */}

                      <button
                        className="checkout-edit-btn"
                        onClick={() => {
                          setEditingId(addr.id);

                          setAddress({
                            name: addr.name,
                            phone: addr.phone,
                            pincode: addr.pincode,
                            city: addr.city,
                            state: addr.state,
                            addressLine: addr.addressLine,
                          });

                          setSelectedAddress(addr);

                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="checkout-delete-btn"
                        onClick={() => {
                          const filtered = savedAddresses.filter(
                            (a) => a.id !== addr.id,
                          );

                          setSavedAddresses(filtered);

                          localStorage.setItem(
                            "user_addresses",
                            JSON.stringify(filtered),
                          );

                          // REMOVE SELECTED
                          if (selectedAddress?.id === addr.id) {
                            setSelectedAddress(null);

                            setAddress({
                              name: "",
                              phone: "",
                              pincode: "",
                              city: "",
                              state: "",
                              addressLine: "",
                            });
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="form-grid">
              <input
                name="name"
                placeholder="Full Name"
                value={address.name}
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Phone Number"
                value={address.phone}
                onChange={handleChange}
              />
              <input
                name="pincode"
                placeholder="Pincode"
                value={address.pincode}
                onChange={handleChange}
              />
              <input
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
              />
              <input
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleChange}
              />
            </div>

            <textarea
              name="addressLine"
              placeholder="Full Address"
              value={address.addressLine}
              onChange={handleChange}
            />
            {/* -------------------- */}
            <div className="checkout-form-actions">
              <button
                className="checkout-save-address-btn"
                onClick={() => {
                  const updatedAddresses = savedAddresses.map((a) =>
                    a.id === editingId
                      ? {
                          ...address,
                          id: editingId,
                        }
                      : a,
                  );

                  setSavedAddresses(updatedAddresses);

                  localStorage.setItem(
                    "user_addresses",
                    JSON.stringify(updatedAddresses),
                  );

                  setSelectedAddress({
                    ...address,
                    id: editingId,
                  });

                  setEditingId(null);

                  alert("Address Updated");
                }}
              >
                {editingId ? "Update Address" : "Save Address"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="checkout-right card">
          <h3>Price Summary</h3>

          <div className="summary-row">
            <span>Total Items</span>
            <span>{cartProducts.length}</span>
          </div>

          <div className="summary-row">
            <span>Total Price</span>
            <span>₹{finalTotal}</span>
          </div>

          {/* ✅ SHOW COUPON */}
          {discountAmount > 0 && (
            <div className="summary-row" style={{ color: "green" }}>
              <span>Coupon Applied ({couponCode})</span>
              <span>- ₹{discountAmount}</span>
            </div>
          )}

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
