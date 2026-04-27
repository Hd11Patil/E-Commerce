import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import "./CheckoutPage.css";

const PRODUCT_IMAGES = {
  1: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
  2: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80",
  3: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80",
  4: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80",
};

const getImage = (id) => PRODUCT_IMAGES[id] || PRODUCT_IMAGES[1];

const CheckoutPage = () => {
  const { products, cart } = useApp();

  const cartProducts = products.filter((p) => cart.includes(p.id));

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  const finalTotal = cartProducts.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // 🚨 PAYMENT FUNCTION WITH ALERT
//   const handlePlaceOrder = async () => {
//     const { name, phone, pincode, city, state, addressLine } = address;

//     // ❌ Validation
//     if (!name || !phone || !pincode || !city || !state || !addressLine) {
//       alert("⚠️ Please fill all delivery address fields before making payment");
//       return;
//     }

//     try {
//       const user = JSON.parse(localStorage.getItem("user"));

//        if (!user) {
//         alert("User not logged in");
//         return;
//       }

//     // ✅ Save order FIRST
//     await fetch("http://localhost:3001/save-order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userEmail: user.email,
//         cartItems: cartProducts,
//         totalAmount: finalTotal,
//         address, // ✅ include address
//       }),
//     });

// // ----------------------
//       const response = await fetch(
//         "http://localhost:3001/create-checkout-session",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ cartItems: cartProducts }),
//         },
//       );

//       const data = await response.json();

//       window.location.href = data.url;
//     } catch (error) {
//       console.error(error);
//       alert("Payment failed");
//     }
//   };


// new handle 
const handlePlaceOrder = async () => {
  const { name, phone, pincode, city, state, addressLine } = address;

  if (!name || !phone || !pincode || !city || !state || !addressLine) {
    alert("⚠️ Fill all fields");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3001/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: cartProducts }),
      }
    );

    const data = await response.json();

    // 👉 store address temporarily
    localStorage.setItem("order_address", JSON.stringify(address));

    window.location.href = data.url;
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-container">
        {/* LEFT SIDE */}
        <div className="checkout-left">
          {/* ORDER ITEMS */}
          <div className="card">
            <h3>Order Items</h3>

            {cartProducts.map((p) => (
              <div key={p.id} className="checkout-item">
                <img src={getImage(p.id)} alt={p.name} />

                <div className="item-info">
                  <p className="item-name">{p.name}</p>
                  <p className="item-price">₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ADDRESS FORM */}
          <div className="card">
            <h3>Delivery Address</h3>

            <div className="form-grid">
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
              />
              <input
                name="pincode"
                placeholder="Pincode"
                onChange={handleChange}
              />
              <input name="city" placeholder="City" onChange={handleChange} />
              <input name="state" placeholder="State" onChange={handleChange} />
            </div>

            <textarea
              name="addressLine"
              placeholder="Full Address"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
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

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
