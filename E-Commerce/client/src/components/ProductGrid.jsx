// import React, { useState } from "react";
// import { useApp } from "../context/AppContext";
// import "./ProductGrid.css";

// const ProductGrid = () => {
//   const {
//     products,
//     wishlist,
//     toggleWishlist,
//     addToCart,
//     cart,
//   } = useApp();

//   // FILTER STATES
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedPrice, setSelectedPrice] = useState("");

//   // FILTER LOGIC
//   let filteredProducts = [...products];

//   if (selectedPrice) {
//     filteredProducts = filteredProducts.filter(
//       (product) => product.price <= Number(selectedPrice)
//     );
//   }

//   return (
//     <section className="product-section">
//       <div className="container">

//         {/* HEADER */}
//         <div className="section-header">
//           <h2 className="section-title">Top Picks For You</h2>

//           <div className="header-buttons">

//             {/* FILTER BUTTON */}
//             <button
//               className="filter-btn"
//               onClick={() => setShowFilter(true)}
//             >
//               Filter
//             </button>

//             <a href="#" className="see-all">
//               View All →
//             </a>

//           </div>
//         </div>

//         {/* FILTER SIDEBAR */}
//         {showFilter && (
//           <div className="filter-sidebar">

//             <div className="filter-top">
//               <h2>Price Filter</h2>

//               <button
//                 className="close-filter"
//                 onClick={() => setShowFilter(false)}
//               >
//                 ✕
//               </button>
//             </div>

//             <select
//               value={selectedPrice}
//               onChange={(e) => setSelectedPrice(e.target.value)}
//             >
//               <option value="">All Products</option>
//               <option value="1000">Under ₹1000</option>
//               <option value="4000">Under ₹4000</option>
//               <option value="10000">Under ₹10000</option>
//             </select>

//           </div>
//         )}

//         {/* PRODUCT GRID */}
//         <div className="product-grid">

//           {filteredProducts.map((p) => (
//             <div className="product-card" key={p.id}>

//               {/* PRODUCT IMAGE */}
//               <div className="product-img">
//                 <img
//                   src={p.image}
//                   alt={p.name}
//                   className="product-photo"
//                 />

//                 <div className="product-overlay" />

//                 {/* DISCOUNT */}
//                 <div className="product-discount-tag">
//                   {p.discount}% OFF
//                 </div>

//                 {/* WISHLIST */}
//                 <button
//                   className={`wishlist-btn ${
//                     wishlist.includes(p.id) ? "wished" : ""
//                   }`}
//                   onClick={() => toggleWishlist(p.id)}
//                 >
//                   {wishlist.includes(p.id) ? "♥" : "♡"}
//                 </button>
//               </div>

//               {/* PRODUCT INFO */}
//               <div className="product-info">

//                 <p className="product-brand">{p.brand}</p>

//                 <p className="product-name">{p.name}</p>

//                 {/* PRICE */}
//                 <div className="product-prices">

//                   <span className="price-current">
//                     ₹{p.price.toLocaleString()}
//                   </span>

//                   <span className="price-original">
//                     ₹{p.originalPrice.toLocaleString()}
//                   </span>

//                   <span className="price-off">
//                     ({p.discount}% off)
//                   </span>

//                 </div>

//                 {/* ADD TO CART */}
//                 <button
//                   className={`add-cart-btn ${
//                     cart.includes(p.id) ? "in-cart" : ""
//                   }`}
//                   onClick={() => addToCart(p.id)}
//                 >
//                   {cart.includes(p.id)
//                     ? "✓ Added"
//                     : "+ Add to Cart"}
//                 </button>

//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductGrid;
// --------------------------------------------
import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import "./ProductGrid.css";

const ProductGrid = () => {
  const {
    products,
    wishlist,
    toggleWishlist,
    addToCart,
    cart,
  } = useApp();

  // FILTER STATES
  const [showFilter, setShowFilter] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");

  // FILTER LOGIC
  let filteredProducts = [...products];

  if (selectedPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= Number(selectedPrice)
    );
  }

  return (
    <section className="product-section">
      <div className="container">

        {/* HEADER */}
        <div className="section-header">

          <h2 className="section-title">
            Top Picks For You
          </h2>

          <div className="header-buttons">

            {/* FILTER WRAPPER */}
            <div className="filter-wrapper">

              {/* FILTER BUTTON */}
              <button
                className="filter-btn"
                onClick={() => setShowFilter(!showFilter)}
              >
                Filter
              </button>

              {/* FILTER POPUP */}
              {showFilter && (
                <div className="filter-sidebar">

                  <div className="filter-top">

                    <h2>Price Filter</h2>

                    <button
                      className="close-filter"
                      onClick={() => setShowFilter(false)}
                    >
                      ✕
                    </button>

                  </div>

                  <select
                    value={selectedPrice}
                    onChange={(e) =>
                      setSelectedPrice(e.target.value)
                    }
                  >
                    <option value="">
                      All Products
                    </option>

                    <option value="1000">
                      Under ₹1000
                    </option>

                     <option value="2000">
                      Under ₹2000
                    </option>

                    <option value="4000">
                      Under ₹4000
                    </option>

                    <option value="10000">
                      Under ₹10000
                    </option>
                  </select>

                </div>
              )}
            </div>

            {/* VIEW ALL */}
            <a href="#" className="see-all">
              View All →
            </a>

          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="product-grid">

          {filteredProducts.map((p) => (
            <div
              className="product-card"
              key={p.id}
            >

              {/* PRODUCT IMAGE */}
              <div className="product-img">

                <img
                  src={p.image}
                  alt={p.name}
                  className="product-photo"
                />

                <div className="product-overlay" />

                {/* DISCOUNT */}
                <div className="product-discount-tag">
                  {p.discount}% OFF
                </div>

                {/* WISHLIST */}
                <button
                  className={`wishlist-btn ${
                    wishlist.includes(p.id)
                      ? "wished"
                      : ""
                  }`}
                  onClick={() => toggleWishlist(p.id)}
                >
                  {wishlist.includes(p.id)
                    ? "♥"
                    : "♡"}
                </button>

              </div>

              {/* PRODUCT INFO */}
              <div className="product-info">

                <p className="product-brand">
                  {p.brand}
                </p>

                <p className="product-name">
                  {p.name}
                </p>

                {/* PRICE */}
                <div className="product-prices">

                  <span className="price-current">
                    ₹{p.price.toLocaleString()}
                  </span>

                  <span className="price-original">
                    ₹{p.originalPrice.toLocaleString()}
                  </span>

                  <span className="price-off">
                    ({p.discount}% off)
                  </span>

                </div>

                {/* ADD TO CART */}
                <button
                  className={`add-cart-btn ${
                    cart.includes(p.id)
                      ? "in-cart"
                      : ""
                  }`}
                  onClick={() => addToCart(p.id)}
                >
                  {cart.includes(p.id)
                    ? "✓ Added"
                    : "+ Add to Cart"}
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;