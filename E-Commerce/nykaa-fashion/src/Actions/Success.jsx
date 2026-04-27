
// import { useEffect, useRef } from "react";
// import { useApp } from "../context/AppContext";

// const Success = () => {
//   const { cart, products, clearCart } = useApp();

//   const hasSaved = useRef(false); // ✅ prevents duplicate calls

//   useEffect(() => {
//     if (hasSaved.current) return; // 🔥 stop second execution
//     hasSaved.current = true;

//     const saveOrder = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));

//         if (!user) {
//           console.error("User not found");
//           return;
//         }

//         const cartProducts = products.filter((p) => cart.includes(p.id));

//         const totalAmount = cartProducts.reduce(
//           (sum, item) => sum + item.price,
//           0,
//         );

//         await fetch("http://localhost:3001/save-order", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userEmail: user.email,
//             cartItems: cartProducts,
//             totalAmount,
//           }),
//         });

//         // ✅ clear cart AFTER saving
//         clearCart();
//         localStorage.removeItem("tecygig_cart");
//       } catch (error) {
//         console.error("Error saving order:", error);
//       }
//     };

//     saveOrder();
//   }, []);

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>✅ Payment Successful</h1>
//       <p>Your order has been placed!</p>
//     </div>
//   );
// };

// export default Success;
// ---------------------------------
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

        if (!user) return;

        const cartProducts = products.filter((p) =>
          cart.includes(p.id)
        );

        const totalAmount = cartProducts.reduce(
          (sum, item) => sum + item.price,
          0
        );

        await fetch("http://localhost:3001/save-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user.email,
            cartItems: cartProducts,
            totalAmount,
            address: address?.addressLine,
            phone: address?.phone,
          }),
        });

        clearCart();
        localStorage.removeItem("tecygig_cart");
        localStorage.removeItem("order_address");

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