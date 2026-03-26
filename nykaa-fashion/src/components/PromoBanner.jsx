import React from 'react';
import './PromoBanner.css';
const PROMOS = [
  {bg:'#1a1a2e',text:'NEW IN: LUXURY BRANDS',sub:'Explore Designer Labels',accent:'#d4af37'},
  {bg:'#fce4ec',text:'FREE SHIPPING',sub:'On orders above ₹599',accent:'#e91e63'},
  {bg:'#e8f5e9',text:'EASY 30-DAY RETURNS',sub:'Hassle-free returns policy',accent:'#2e7d32'},
];
const PromoBanner = () => (
  <div className="promo-strip">
    {PROMOS.map((p,i) => (
      <div className="promo-tile" key={i} style={{background:p.bg}}>
        <p className="promo-text" style={{color:p.accent}}>{p.text}</p>
        <p className="promo-sub" style={{color:p.accent+'aa'}}>{p.sub}</p>
      </div>
    ))}
  </div>
);
export default PromoBanner;
