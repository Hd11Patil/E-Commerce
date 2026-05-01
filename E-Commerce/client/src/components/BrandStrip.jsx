import React from 'react';
import './BrandStrip.css';
const BRANDS = [
  {name:'H&M',color:'#e50010'},{name:'Zara',color:'#000'},{name:'Puma',color:'#111'},
  {name:'Biba',color:'#c9007a'},{name:'Jack & Jones',color:'#1a3c8f'},{name:'Mango',color:'#d4922a'},
  {name:'Vero Moda',color:'#333'},{name:'Only',color:'#000'},{name:'Nike',color:'#111'},{name:'Adidas',color:'#000'},
];
const BrandStrip = () => (
  <section className="brand-strip-section">
    <div className="container">
      <div className="section-header"><h2 className="section-title">Shop By Brand</h2><a href="#" className="see-all">All Brands →</a></div>
    </div>
    <div className="brand-scroll">
      {BRANDS.map(b => (
        <div className="brand-pill" key={b.name} style={{borderColor:b.color+'44'}}>
          <span className="brand-dot" style={{background:b.color}}></span>
          <span className="brand-name" style={{color:b.color}}>{b.name}</span>
        </div>
      ))}
    </div>
  </section>
);
export default BrandStrip;
