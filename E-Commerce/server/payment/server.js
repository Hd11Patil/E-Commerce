
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.use(express.json());

// Stripe init
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Health check (optional but useful)
app.get("/", (req, res) => {
  res.send("Stripe server running...");
});

// Create checkout session
app.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  try {
    // Validate cartItems
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // convert INR → paise
        },
        quantity: 1,
      })),

      mode: "payment",

      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    console.log("Stripe session created:", session.id);

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
