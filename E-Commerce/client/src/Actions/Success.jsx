import { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";

const Success = () => {
  const { cart, products, clearCart } = useApp();
  const hasSaved = useRef(false);

  useEffect(() => {
    if (hasSaved.current) return;
    hasSaved.current = true;

    const saveOrder = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const address = JSON.parse(localStorage.getItem("order_address"));
        const summary = JSON.parse(localStorage.getItem("order_summary"));

        if (!user) return;

        const cartProducts = products.filter((p) =>
          cart.includes(p.id)
        );

        await fetch("https://e-commerce-bfn8.onrender.com/save-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user.email,
            cartItems: cartProducts,

            // ✅ CORRECT VALUES
            totalAmount: summary?.totalAmount || 0,
            couponCode: summary?.couponCode || null,

            address: address?.addressLine,
            phone: address?.phone,
          }),
        });

        // ✅ CLEANUP
        clearCart();
        localStorage.removeItem("tecygig_cart");
        localStorage.removeItem("order_address");
        localStorage.removeItem("order_summary");

      } catch (err) {
        console.error(err);
      }
    };

    saveOrder();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>✅ Payment Successful</h1>
      <p>Your order has been placed!</p>
    </div>
  );
};

export default Success;