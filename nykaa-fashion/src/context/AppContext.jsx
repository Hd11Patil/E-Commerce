import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ... (Keep your exact products and orders arrays here, I am hiding them to save space but keep yours!) ...
  const [products, setProducts] = useState([
    {
      id: 1,
      brand: "H&M",
      name: "Floral Wrap Dress",
      price: 1299,
      originalPrice: 2999,
      discount: 57,
      emoji: "👗",
      color: "#fce4ec",
      category: "Women",
      stock: 24,
    },
    {
      id: 2,
      brand: "Zara",
      name: "Linen Wide Leg Pants",
      price: 2499,
      originalPrice: 4999,
      discount: 50,
      emoji: "👖",
      color: "#e8f5e9",
      category: "Women",
      stock: 18,
    },
    {
      id: 3,
      brand: "Jack & Jones",
      name: "Classic Polo Shirt",
      price: 899,
      originalPrice: 1799,
      discount: 50,
      emoji: "👔",
      color: "#e3f2fd",
      category: "Men",
      stock: 42,
    },
    {
      id: 4,
      brand: "Viva",
      name: "Embroidered Anarkali",
      price: 3499,
      originalPrice: 6999,
      discount: 50,
      emoji: "🥻",
      color: "#fff3e0",
      category: "Women",
      stock: 9,
    },
    {
      id: 5,
      brand: "Puma",
      name: "Training Jogger Set",
      price: 1899,
      originalPrice: 3999,
      discount: 52,
      emoji: "🏃",
      color: "#e8f5e9",
      category: "Men",
      stock: 31,
    },
    {
      id: 6,
      brand: "Steve Madden",
      name: "Strappy Block Heels",
      price: 2999,
      originalPrice: 5999,
      discount: 50,
      emoji: "👠",
      color: "#fff8e1",
      category: "Women",
      stock: 15,
    },
    {
      id: 7,
      brand: "Louis Philippe",
      name: "Slim Fit Chinos",
      price: 1599,
      originalPrice: 3299,
      discount: 52,
      emoji: "👖",
      color: "#ede7f6",
      category: "Men",
      stock: 27,
    },
    {
      id: 8,
      brand: "Biba",
      name: "Printed Kurta Set",
      price: 1299,
      originalPrice: 2799,
      discount: 54,
      emoji: "🥻",
      color: "#fce4ec",
      category: "Women",
      stock: 6,
    },
  ]);

  const [orders] = useState([]); // Keep your orders here

  const [isAdmin, setIsAdmin] = useState(false);

  // --- LOCAL STORAGE STATES ---
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("tecygig_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("tecygig_cart");
    return saved ? JSON.parse(saved) : [];
  });

  //  Save for Later State
  const [savedForLater, setSavedForLater] = useState(() => {
    const saved = localStorage.getItem("tecygig_saved");
    return saved ? JSON.parse(saved) : [];
  });

  // --- USE EFFECTS ---
  useEffect(() => {
    localStorage.setItem("tecygig_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    localStorage.setItem("tecygig_cart", JSON.stringify(cart));
  }, [cart]);

  //  Save to local storage

  useEffect(() => {
    localStorage.setItem("tecygig_saved", JSON.stringify(savedForLater));
  }, [savedForLater]);

  // --- FUNCTIONS ---
  const toggleWishlist = (id) =>
    setWishlist((w) =>
      w.includes(id) ? w.filter((x) => x !== id) : [...w, id],
    );
  const addToCart = (id) => setCart((c) => (c.includes(id) ? c : [...c, id]));
  const removeFromCart = (id) =>
    setCart((c) => c.filter((cartId) => cartId !== id));

  // 3. NEW: Save for Later Functions
  const moveToSavedForLater = (id) => {
    removeFromCart(id); // Take it out of cart
    setSavedForLater((prev) => (prev.includes(id) ? prev : [...prev, id])); // Put it in saved
  };

  const moveSavedToCart = (id) => {
    setSavedForLater((prev) => prev.filter((savedId) => savedId !== id)); // Take it out of saved
    addToCart(id); // Put it in cart
  };

  const removeFromSavedForLater = (id) => {
    setSavedForLater((prev) => prev.filter((savedId) => savedId !== id));
  };

  return (
    <AppContext.Provider
      value={{
        products,
        orders,
        wishlist,
        cart,
        isAdmin,
        setIsAdmin,
        toggleWishlist,
        removeFromCart,
        addToCart,
        savedForLater,
        moveToSavedForLater,
        moveSavedToCart,
        removeFromSavedForLater, // Export new functions
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
