import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, brand: 'H&M', name: 'Floral Wrap Dress', price: 1299, originalPrice: 2999, discount: 57, emoji: '👗', color: '#fce4ec', category: 'Women', stock: 24 },
    { id: 2, brand: 'Zara', name: 'Linen Wide Leg Pants', price: 2499, originalPrice: 4999, discount: 50, emoji: '👖', color: '#e8f5e9', category: 'Women', stock: 18 },
    { id: 3, brand: 'Jack & Jones', name: 'Classic Polo Shirt', price: 899, originalPrice: 1799, discount: 50, emoji: '👔', color: '#e3f2fd', category: 'Men', stock: 42 },
    { id: 4, brand: 'Viva', name: 'Embroidered Anarkali', price: 3499, originalPrice: 6999, discount: 50, emoji: '🥻', color: '#fff3e0', category: 'Women', stock: 9 },
    { id: 5, brand: 'Puma', name: 'Training Jogger Set', price: 1899, originalPrice: 3999, discount: 52, emoji: '🏃', color: '#e8f5e9', category: 'Men', stock: 31 },
    { id: 6, brand: 'Steve Madden', name: 'Strappy Block Heels', price: 2999, originalPrice: 5999, discount: 50, emoji: '👠', color: '#fff8e1', category: 'Women', stock: 15 },
    { id: 7, brand: 'Louis Philippe', name: 'Slim Fit Chinos', price: 1599, originalPrice: 3299, discount: 52, emoji: '👖', color: '#ede7f6', category: 'Men', stock: 27 },
    { id: 8, brand: 'Biba', name: 'Printed Kurta Set', price: 1299, originalPrice: 2799, discount: 54, emoji: '🥻', color: '#fce4ec', category: 'Women', stock: 6 },
  ]);

  const [orders] = useState([
    { id: '#ORD-001', customer: 'Priya Sharma', product: 'Floral Wrap Dress', amount: 1299, status: 'Delivered', date: '2024-03-15' },
    { id: '#ORD-002', customer: 'Rahul Verma', product: 'Classic Polo Shirt', amount: 899, status: 'Processing', date: '2024-03-18' },
    { id: '#ORD-003', customer: 'Anjali Singh', product: 'Embroidered Anarkali', amount: 3499, status: 'Shipped', date: '2024-03-20' },
    { id: '#ORD-004', customer: 'Karan Mehta', product: 'Training Jogger Set', amount: 1899, status: 'Processing', date: '2024-03-21' },
    { id: '#ORD-005', customer: 'Sneha Patel', product: 'Strappy Block Heels', amount: 2999, status: 'Delivered', date: '2024-03-22' },
    { id: '#ORD-006', customer: 'Vikram Roy', product: 'Slim Fit Chinos', amount: 1599, status: 'Cancelled', date: '2024-03-23' },
  ]);

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleWishlist = (id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  const addToCart = (id) => setCart(c => c.includes(id) ? c : [...c, id]);

  const addProduct = (p) => setProducts(prev => [...prev, { ...p, id: Date.now() }]);
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));
  const updateProduct = (id, data) => setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));

  return (
    <AppContext.Provider value={{ products, orders, wishlist, cart, isAdmin, setIsAdmin, toggleWishlist, addToCart, addProduct, deleteProduct, updateProduct }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
