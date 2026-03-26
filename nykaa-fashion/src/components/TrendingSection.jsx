import React from 'react';
import './TrendingSection.css';
const TRENDING = [
  {label:'T-shirt Bras',discount:60,color:'#fce4ec',emoji:'🩱'},{label:'Oversized Tees',discount:65,color:'#e3f2fd',emoji:'👕'},
  {label:'Baggy Jeans',discount:70,color:'#e8f5e9',emoji:'👖'},{label:'Cotton Kurtas',discount:70,color:'#fff3e0',emoji:'🥻'},
  {label:'Ethnic Co-ords',discount:70,color:'#f3e8ff',emoji:'👘'},{label:'Slip Dresses',discount:65,color:'#fce4ec',emoji:'👗'},
];
const TrendingSection = () => (
  <section className="trending-section">
    <div className="container">
      <div className="section-header"><h2 className="section-title">Trending Summer Picks</h2><a href="#" className="see-all">See All →</a></div>
      <div className="trending-grid">
        {TRENDING.map(item => (
          <div className="trending-card" key={item.label}>
            <div className="trending-img" style={{background:item.color}}>
              <span className="trending-emoji">{item.emoji}</span>
              <div className="trending-badge">
                <span className="badge-upto">up to</span>
                <span className="badge-pct">{item.discount}%</span>
                <span className="badge-off">Off</span>
              </div>
            </div>
            <p className="trending-label">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default TrendingSection;
