// import React from "react";
// import "./TrendingSection.css";

// const TRENDING = [
//   {
//     label: "T-shirt Bras",
//     discount: 60,
//     image:
//       "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
//   },
//   {
//     label: "Oversized Tees",
//     discount: 65,
//     image:
//       "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
//   },
//   {
//     label: "Baggy Jeans",
//     discount: 70,
//     image:
//       "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80",
//   },
//   {
//     label: "Cotton Kurtas",
//     discount: 70,
//     image:
//       "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
//   },
//   {
//     label: "Ethnic Co-ords",
//     discount: 70,
//     image:
//       "https://images.unsplash.com/photo-1531891570158-e71b35a485bc?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     label: "Slip Dresses",
//     discount: 65,
//     image:
//       "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80",
//   },
// ];

// const TrendingSection = () => (
//   <section className="trending-section">
//     <div className="container">
//       <div className="section-header">
//         <h2 className="section-title">Trending Summer Picks</h2>
//         <a href="#" className="see-all">
//           See All →
//         </a>
//       </div>
//       <div className="trending-grid">
//         {TRENDING.map((item) => (
//           <div className="trending-card" key={item.label}>
//             <div className="trending-img">
//               <img
//                 src={item.image}
//                 alt={item.label}
//                 className="trending-photo"
//               />
//               <div className="trending-overlay" />
//               <div className="trending-badge">
//                 <span className="badge-upto">up to</span>
//                 <span className="badge-pct">{item.discount}%</span>
//                 <span className="badge-off">Off</span>
//               </div>
//             </div>
//             <p className="trending-label">{item.label}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// export default TrendingSection;
// ---------------------------------------------------------
import React, { useEffect, useState } from "react";
import "./TrendingSection.css";

const TrendingSection = () => {

  const [products, setProducts] = useState([]);

  // Shuffle Function
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {

    // All fashion category APIs
    const urls = [

      "https://dummyjson.com/products/category/tops",

      "https://dummyjson.com/products/category/mens-shirts",

      "https://dummyjson.com/products/category/womens-dresses",

      "https://dummyjson.com/products/category/mens-shoes",

      "https://dummyjson.com/products/category/womens-shoes",

      "https://dummyjson.com/products/category/womens-bags",

    ];

    // Fetch all APIs together
    Promise.all(

      urls.map((url) =>
        fetch(url).then((res) => res.json())
      )

    )

      .then((data) => {

        // Combine all products
        const allProducts = data.flatMap(
          (item) => item.products
        );

        // Shuffle products
        const randomProducts = shuffleArray(
          allProducts
        ).slice(0, 6);

        setProducts(randomProducts);

      })

      .catch((err) => console.log(err));

  }, []);

  return (
    <section className="trending-section">

      <div className="container">

        {/* HEADER */}
        <div className="section-header">

          <h2 className="section-title">
            Trending Summer Picks
          </h2>

          <a href="#" className="see-all">
            See All →
          </a>

        </div>

        {/* GRID */}
        <div className="trending-grid">

          {products.map((item) => (

            <div
              className="trending-card"
              key={item.id}
            >

              <div className="trending-img">

                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="trending-photo"
                />

                <div className="trending-overlay" />

                {/* DISCOUNT */}
                <div className="trending-badge">

                  <span className="badge-upto">
                    up to
                  </span>

                  <span className="badge-pct">
                    {Math.floor(item.discountPercentage)}%
                  </span>

                  <span className="badge-off">
                    Off
                  </span>

                </div>

              </div>

              {/* PRODUCT NAME */}
              <p className="trending-label">
                {item.title}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default TrendingSection;