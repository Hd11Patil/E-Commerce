import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ================= PRODUCTS =================
  const [products, setProducts] = useState([]);

  // Shuffle Function
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // FETCH PRODUCTS FROM API
  useEffect(() => {
    const urls = [
      "https://dummyjson.com/products/category/tops",

      "https://dummyjson.com/products/category/mens-shirts",

      "https://dummyjson.com/products/category/womens-dresses",

      "https://dummyjson.com/products/category/mens-shoes",

      "https://dummyjson.com/products/category/womens-shoes",

      "https://dummyjson.com/products/category/womens-bags",
    ];

    Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))

      .then((data) => {
        // Combine all products
        const allProducts = data.flatMap((item) => item.products);

        // Convert API data to YOUR product format
        const formattedProducts = allProducts.map((item) => ({
          id: item.id,

          brand: item.brand || "Fashion",

          name: item.title,

          price: Math.floor(item.price * 80),

          originalPrice: Math.floor(
            item.price * 80 + (item.price * 80 * item.discountPercentage) / 100,
          ),

          discount: Math.floor(item.discountPercentage),

          image: item.images[0],

          category: "Fashion",

          stock: item.stock || 100,
        }));

        // Shuffle products randomly
        const randomProducts = shuffleArray(formattedProducts).slice(0,12);

        setProducts(randomProducts);
      })

      .catch((err) => console.log(err));
  }, []);

  // ================= PRODUCT CRUD =================
  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts((prev) => [...prev, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p)),
    );
  };

  // ================= ORDERS =================
  const [orders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // ================= 🔥 COUPON (NEW) =================
  const [coupon, setCoupon] = useState(() => {
    const saved = localStorage.getItem("tecygig_coupon");
    return saved
      ? JSON.parse(saved)
      : { code: "", discountAmount: 0, finalTotal: 0 };
  });

  useEffect(() => {
    localStorage.setItem("tecygig_coupon", JSON.stringify(coupon));
  }, [coupon]);

  // ================= LOCAL STORAGE =================
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("tecygig_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("tecygig_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [savedForLater, setSavedForLater] = useState(() => {
    const saved = localStorage.getItem("tecygig_saved");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tecygig_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("tecygig_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("tecygig_saved", JSON.stringify(savedForLater));
  }, [savedForLater]);

  // ================= CART =================
  const toggleWishlist = (id) =>
    setWishlist((w) =>
      w.includes(id) ? w.filter((x) => x !== id) : [...w, id],
    );

  const addToCart = (id) => {
    setCart((prevCart) => {
      if (prevCart.includes(id)) return prevCart; // block duplicates
      return [...prevCart, id];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const index = prevCart.indexOf(id);
      if (index === -1) return prevCart;

      const newCart = [...prevCart];
      newCart.splice(index, 1); // remove ONLY ONE
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("tecygig_cart");

    // 🔥 RESET COUPON WHEN CART CLEARED
    setCoupon({ code: "", discountAmount: 0, finalTotal: 0 });
  };

  // ================= SAVE FOR LATER =================

  const moveToSavedForLater = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item !== id));

    setSavedForLater((prevSaved) =>
      prevSaved.includes(id) ? prevSaved : [...prevSaved, id],
    );
  };
  const moveSavedToCart = (id) => {
    setSavedForLater((prev) => prev.filter((savedId) => savedId !== id));
    addToCart(id);
  };

  const removeFromSavedForLater = (id) => {
    setSavedForLater((prev) => prev.filter((savedId) => savedId !== id));
  };

  // ================= PROVIDER =================
  return (
    <AppContext.Provider
      value={{
        products,
        orders,
        wishlist,
        cart,
        isAdmin,
        setIsAdmin,

        // ✅ NEW COUPON
        coupon,
        setCoupon,

        // PRODUCT FUNCTIONS
        addProduct,
        deleteProduct,
        updateProduct,

        toggleWishlist,
        removeFromCart,
        addToCart,
        savedForLater,
        moveToSavedForLater,
        moveSavedToCart,
        removeFromSavedForLater,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
