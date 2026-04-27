const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Stripe = require("stripe");
require("dotenv").config();

const EmployeeModel = require("./models/Employee");
const Order = require("./models/Order");

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// ================= STRIPE =================
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ================= DB CONNECTION =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ================= AUTH =================
app.post("/login", async (req, res) => {
  try {
    const user = await EmployeeModel.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
      return res.json({ status: "error", message: "Invalid credentials" });
    }

    res.json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        mobile: user.mobile,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error" });
  }
});

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, gender, mobile } = req.body;

    if (!name || !email || !password || !gender || !mobile) {
      return res.json({ status: "error", message: "All fields required" });
    }

    const existing = await EmployeeModel.findOne({ email });
    if (existing) {
      return res.json({ status: "error", message: "User already exists" });
    }

    const newUser = await EmployeeModel.create({
      name,
      email,
      password,
      gender,
      mobile,
    });

    res.json({ status: "success", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error" });
  }
});

// ================= STRIPE CHECKOUT =================
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= SAVE ORDER =================
// app.post("/save-order", async (req, res) => {
//   try {
//     const { userEmail, cartItems, totalAmount, address, phone } = req.body;

//     const items = cartItems.map((item) => ({
//       productId: item.id,
//       name: item.name,
//       price: item.price,
//       quantity: item.quantity || 1,
//     }));

//     const order = await Order.create({
//       userEmail,
//       items,
//       totalAmount,
//       address,
//       phone,
//       paymentStatus: "paid",
//       deliveryStatus: "processing",
//     });

//     res.json({ success: true, order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });


app.post("/save-order", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // 👈 debug

    if (!req.body) {
      return res.status(400).json({ error: "No body received" });
    }

    const { userEmail, cartItems, totalAmount, address, phone } = req.body;

    if (!userEmail || !cartItems || !totalAmount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const items = cartItems.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
    }));

    const order = await Order.create({
      userEmail,
      items,
      totalAmount,
      address,
      phone,
    });

    res.json({ success: true, order });

  } catch (err) {
    console.error("🔥 SAVE ORDER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
// ================= GET USER ORDERS =================
app.get("/get-orders/:email", async (req, res) => {
  try {
    const orders = await Order.find({
      userEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ================= CANCEL ORDER =================
app.put("/cancel-order/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { deliveryStatus: "cancelled" },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ================= ADMIN =================
app.get("/admin/dashboard", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await EmployeeModel.countDocuments();

    const orders = await Order.find();
    const revenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);

    res.json({ totalOrders, totalUsers, revenue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/admin/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.put("/admin/order-status/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { deliveryStatus: req.body.status },
      { new: true },
    );

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ================= SERVER =================
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
