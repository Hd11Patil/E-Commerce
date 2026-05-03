// const express = require("express");
// const cors = require("cors");
// const Stripe = require("stripe");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: "https://e-commerce-jet-seven-60.vercel.app/",
//   }),
// );
// app.use(express.json());

// // Stripe init
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// // Health check (optional but useful)
// app.get("/", (req, res) => {
//   res.send("Stripe server running...");
// });

// // Create checkout session
// app.post("/create-checkout-session", async (req, res) => {
//   const { cartItems } = req.body;

//   try {
//     // Validate cartItems
//     if (!cartItems || cartItems.length === 0) {
//       return res.status(400).json({ error: "Cart is empty" });
//     }

//     const session = await stripe.checkout.sessions.create({
//       line_items: cartItems.map((item) => ({
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: item.name,
//           },
//           unit_amount: Math.round(item.price * 100), // convert INR → paise
//         },
//         quantity: 1,
//       })),

//       mode: "payment",

//       success_url: "https://e-commerce-jet-seven-60.vercel.app/success",
//       cancel_url: "https://e-commerce-jet-seven-60.vercel.app/cancel",
//     });

//     console.log("Stripe session created:", session.id);

//     res.json({ id: session.id });
//   } catch (err) {
//     console.error("Stripe Error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// ---------------------------------------------------------------
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://e-commerce-jet-seven-60.vercel.app/",
  })
);
app.use(express.json());

// Stripe init
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Health check
app.get("/", (req, res) => {
  res.send("Stripe server running...");
});

// ================= CREATE CHECKOUT SESSION =================
app.post("/create-checkout-session", async (req, res) => {
  const { cartItems, finalTotal } = req.body;

  try {
    // ✅ Validate cart
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // ✅ If frontend sends finalTotal (coupon applied)
    let amountToCharge;

    if (finalTotal && finalTotal > 0) {
      amountToCharge = finalTotal;
    } else {
      // fallback (no coupon)
      amountToCharge = cartItems.reduce(
        (sum, item) => sum + item.price,
        0
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Order Payment",
            },
            unit_amount: Math.round(amountToCharge * 100), // ✅ FINAL PRICE USED
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      success_url: "https://e-commerce-jet-seven-60.vercel.app/success",
      cancel_url: "https://e-commerce-jet-seven-60.vercel.app/cancel",
    });

    console.log("Stripe session created:", session.id);

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ================= SERVER =================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});