import React, { useRef } from "react";
import "./CategoryStrip.css";
const CATEGORIES = [
  { label: "Westernwear", emoji: "👗", color: "#f3e8d0" },
  { label: "Indianwear", emoji: "🥻", color: "#fce4ec" },
  { label: "Men", emoji: "👔", color: "#e3f2fd" },
  { label: "Footwear", emoji: "👠", color: "#fff3e0" },
  { label: "Lingerie", emoji: "🌸", color: "#fce4ec" },
  { label: "Activewear", emoji: "🏃", color: "#e8f5e9" },
  { label: "Kids", emoji: "🧸", color: "#fff8e1" },
  { label: "Bags", emoji: "👜", color: "#f3e5f5" },
  { label: "Jewellery", emoji: "💎", color: "#e0f7fa" },
  { label: "Sneakers", emoji: "👟", color: "#ede7f6" },
  { label: "Beauty", emoji: "💄", color: "#fce4ec" },
  { label: "Accessories", emoji: "🕶️", color: "#fff9c4" },
];
const CategoryStrip = () => {
  const ref = useRef(null);
  const scroll = (d) =>
    ref.current.scrollBy({ left: d * 320, behavior: "smooth" });
  return (
    <div className="category-strip-wrapper">
      <button className="cat-arrow left" onClick={() => scroll(-1)}>
        ‹
      </button>
      <div className="category-strip" ref={ref}>
        {CATEGORIES.map((cat) => (
          <div className="category-card" key={cat.label}>
            <div className="category-img" style={{ background: cat.color }}>
              <span className="cat-emoji">{cat.emoji}</span>
            </div>
            <span className="category-label">{cat.label}</span>
          </div>
        ))}
      </div>
      <button className="cat-arrow right" onClick={() => scroll(1)}>
        ›
      </button>
    </div>
  );
};
export default CategoryStrip;
