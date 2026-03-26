import React, { useState, useEffect } from 'react';
import './HeroBanner.css';

const SLIDES = [
  { image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80', overlay:'rgba(10,30,60,0.45)', discount:'75', sub:'Summer Sale — Shop Now', tag:'NEW ARRIVALS' },
  { image:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&q=80', overlay:'rgba(80,10,40,0.40)', discount:'60', sub:'Festive Collection is Here', tag:'TRENDING' },
  { image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80', overlay:'rgba(10,50,20,0.42)', discount:'50', sub:'Sustainable & Chic', tag:'ECO PICKS' },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c+1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);
  const slide = SLIDES[current];
  return (
    <div className="hero-banner">
      {SLIDES.map((s,i) => (
        <div key={i} className={`hero-bg-slide${i===current?' active':''}`} style={{backgroundImage:`url(${s.image})`}} />
      ))}
      <div className="hero-overlay" style={{background:slide.overlay}} />
      <div className="hero-content" key={current}>
        <span className="hero-tag">{slide.tag}</span>
        <div className="hero-brand">
          <span className="hero-brand-italic">NYKAA</span>
          <span className="hero-brand-bold">FASHION</span>
        </div>
        <div className="hero-discount">
          <span className="discount-upto">UP TO</span>
          <span className="discount-num">{slide.discount}%</span>
          <span className="discount-off">OFF</span>
        </div>
        <p className="hero-sub">{slide.sub}</p>
        <button className="hero-cta">Shop Now</button>
      </div>
      <div className="hero-dots">
        {SLIDES.map((_,i) => <button key={i} className={`hero-dot${current===i?' active':''}`} onClick={() => setCurrent(i)} />)}
      </div>
      <button className="hero-arrow right" onClick={() => setCurrent(c => (c+1)%SLIDES.length)}>›</button>
      <button className="hero-arrow left"  onClick={() => setCurrent(c => (c-1+SLIDES.length)%SLIDES.length)}>‹</button>
    </div>
  );
};
export default HeroBanner;
