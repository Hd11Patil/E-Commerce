// import React, { useState } from "react";
// import { useApp } from "../context/AppContext";
// import "./CheckoutPage.css";

// const PRODUCT_IMAGES = {
//   1: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80",
//   2: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80",
//   3: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80",
//   4: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80",
// };

// //  fetch adress from account
// const [savedAddresses, setSavedAddresses] = useState([]);
// const [selectedAddress, setSelectedAddress] = useState(null);

// // load saved addresses on component mount
// useEffect(() => {
//   const raw = localStorage.getItem("user_addresses");
//   const parsed = raw ? JSON.parse(raw) : [];

//   setSavedAddresses(parsed);

//   const lastSelected = localStorage.getItem("selected_address");
//   if (lastSelected) {
//     setSelectedAddress(JSON.parse(lastSelected));
//   }
// }, []);

//   // select address function
// const handleSelectAddress = (addr) => {
//   setSelectedAddress(addr);
//   localStorage.setItem("selected_address", JSON.stringify(addr));
// };



// const getImage = (id) => PRODUCT_IMAGES[id] || PRODUCT_IMAGES[1];

// const CheckoutPage = () => {
//   const { products, cart } = useApp();

//   const cartProducts = products.filter((p) => cart.includes(p.id));

//   const [address, setAddress] = useState({
//     name: "",
//     phone: "",
//     pincode: "",
//     city: "",
//     state: "",
//     addressLine: "",
//   });

//   const finalTotal = cartProducts.reduce((sum, item) => sum + item.price, 0);

//   const handleChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//   };

// // new handle  payment
// const handlePlaceOrder = async () => {
//   const { name, phone, pincode, city, state, addressLine } = address;

//   if (!name || !phone || !pincode || !city || !state || !addressLine) {
//     alert("⚠️ Fill all fields");
//     return;
//   }

//   try {
//     const response = await fetch(
//       "https://e-commerce-bfn8.onrender.com/create-checkout-session",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ cartItems: cartProducts }),
//       }
//     );

//     const data = await response.json();

//     // 👉 store address temporarily
//     localStorage.setItem("order_address", JSON.stringify(address));

//     window.location.href = data.url;
//   } catch (err) {
//     console.error(err);
//   }
// };

//   return (
//     <div className="checkout-page">
//       <h1 className="checkout-title">Checkout</h1>

//       <div className="checkout-container">
//         {/* LEFT SIDE */}
//         <div className="checkout-left">
//           {/* ORDER ITEMS */}
//           <div className="card">
//             <h3>Order Items</h3>

//             {cartProducts.map((p) => (
//               <div key={p.id} className="checkout-item">
//                 <img src={getImage(p.id)} alt={p.name} />

//                 <div className="item-info">
//                   <p className="item-name">{p.name}</p>
//                   <p className="item-price">₹{p.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ADDRESS FORM */}
//           <div className="card">
//             <h3>Delivery Address</h3>

//             <div className="form-grid">
//               <input
//                 name="name"
//                 placeholder="Full Name"
//                 onChange={handleChange}
//               />
//               <input
//                 name="phone"
//                 placeholder="Phone Number"
//                 onChange={handleChange}
//               />
//               <input
//                 name="pincode"
//                 placeholder="Pincode"
//                 onChange={handleChange}
//               />
//               <input name="city" placeholder="City" onChange={handleChange} />
//               <input name="state" placeholder="State" onChange={handleChange} />
//             </div>

//             <textarea
//               name="addressLine"
//               placeholder="Full Address"
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="checkout-right card">
//           <h3>Price Summary</h3>

//           <div className="summary-row">
//             <span>Total Items</span>
//             <span>{cartProducts.length}</span>
//           </div>

//           <div className="summary-row">
//             <span>Total Price</span>
//             <span>₹{finalTotal}</span>
//           </div>

//           <button className="place-order-btn" onClick={handlePlaceOrder}>
//             Make Payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
// ------------------------------------------------------
import React, { useState, useEffect } from "react";
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

  // manual address (fallback)
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  // saved addresses
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // load saved addresses
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
    setAddress(addr); // auto fill form
    localStorage.setItem("selected_address", JSON.stringify(addr));
  };

  const finalTotal = cartProducts.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    setSelectedAddress(null); // switching to manual mode
  };

  const handlePlaceOrder = async () => {
    const finalAddress = selectedAddress || address;

    const { name, phone, pincode, city, state, addressLine } = finalAddress;

    if (!name || !phone || !pincode || !city || !state || !addressLine) {
      alert("⚠️ Select or fill address");
      return;
    }

    try {
      const response = await fetch(
        "https://e-commerce-bfn8.onrender.com/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartItems: cartProducts }),
        }
      );

      const data = await response.json();

      localStorage.setItem("order_address", JSON.stringify(finalAddress));

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

          {/* ADDRESS SECTION */}
          <div className="card">
            <h3>Delivery Address</h3>

            {/* SAVED ADDRESSES */}
            {savedAddresses.length > 0 && (
              <div style={{ marginBottom: "15px" }}>
                {savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => handleSelectAddress(addr)}
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px",
                      marginBottom: "10px",
                      cursor: "pointer",
                      background:
                        selectedAddress?.id === addr.id ? "#e6f7ff" : "white",
                    }}
                  >
                    <p>
                      <b>{addr.name}</b> ({addr.phone})
                    </p>
                    <p>{addr.addressLine}</p>
                    <p>
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* INPUT FORM */}
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