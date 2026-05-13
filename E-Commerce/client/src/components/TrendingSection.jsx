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

      "https://dummyjson.com/products/category/womens-watches",

      "https://dummyjson.com/products/category/mens-watches",
      
      "https://dummyjson.com/products/category/sunglasses",
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