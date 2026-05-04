const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Stripe = require("stripe");
require("dotenv").config();
const Coupon = require("./models/Coupon");
const EmployeeModel = require("./models/Employee");
const Order = require("./models/Order");

const app = express();

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("Backend is Running");
});

// ================= MIDDLEWARE =================
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://e-commerce-jet-seven-60.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// ✅ Handle preflight requests (VERY IMPORTANT)

// app.options("*", cors());

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
// app.post("/create-checkout-session", async (req, res) => {
//   try {
//     const { cartItems, totalAmount, discountAmount, couponCode } = req.body;

//     if (!cartItems || cartItems.length === 0) {
//       return res.status(400).json({ error: "Cart is empty" });
//     }

//     // 🔥 ALWAYS calculate on backend (SECURE)
//     let finalAmount = totalAmount;

//     if (couponCode) {
//       const coupon = await Coupon.findOne({ code: couponCode });

//       if (coupon && coupon.expiry > new Date()) {
//         if (coupon.type === "percentage") {
//           finalAmount = totalAmount - (totalAmount * coupon.discount) / 100;
//         } else {
//           finalAmount = totalAmount - coupon.discount;
//         }
//       }
//     }

//     // 🛑 prevent negative amount
//     if (finalAmount < 1) finalAmount = 1;

//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: "Order Payment",
//             },
//             unit_amount: Math.round(finalAmount * 100), // ✅ FINAL PRICE
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: "https://e-commerce-jet-seven-60.vercel.app/success",
//       cancel_url: "https://e-commerce-jet-seven-60.vercel.app/cancel",
//     });

//     res.json({ url: session.url });

//   } catch (err) {
//     console.error("Stripe Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });


app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems, totalAmount, couponCode, origin } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    let finalAmount = totalAmount;

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });

      if (coupon && coupon.expiry > new Date()) {
        if (coupon.type === "percentage") {
          finalAmount = totalAmount - (totalAmount * coupon.discount) / 100;
        } else {
          finalAmount = totalAmount - coupon.discount;
        }
      }
    }

    if (finalAmount < 1) finalAmount = 1;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Order Payment",
            },
            unit_amount: Math.round(finalAmount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",

      // 🔥 DYNAMIC URLs
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: err.message });
  }
});
// =================Coupon Logic=====================

app.post("/apply-coupon", async (req, res) => {
  const { code, cartTotal } = req.body;

  const coupon = await Coupon.findOne({ code });

  if (!coupon) {
    return res.json({ success: false, message: "Invalid coupon" });
  }

  if (coupon.expiry < new Date()) {
    return res.json({ success: false, message: "Coupon expired" });
  }

  if (cartTotal < coupon.minAmount) {
    return res.json({ success: false, message: "Minimum amount not met" });
  }

  let discountAmount = 0;

  if (coupon.type === "percentage") {
    discountAmount = (cartTotal * coupon.discount) / 100;
  } else {
    discountAmount = coupon.discount;
  }

  res.json({
    success: true,
    discountAmount,
    finalAmount: cartTotal - discountAmount,
  });
});

// ================= ADMIN ADD COUPON =================
app.post("/admin/add-coupon", async (req, res) => {
  try {
    let { code, discount, type, expiry, minAmount } = req.body;

    // ================= VALIDATION =================
    if (!code || !discount || !type) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // Normalize values
    code = code.trim().toUpperCase();
    discount = Number(discount);
    minAmount = Number(minAmount) || 0;

    // Validate type
    if (!["percentage", "fixed"].includes(type)) {
      return res.json({ success: false, message: "Invalid coupon type" });
    }

    // Validate discount
    if (discount <= 0) {
      return res.json({ success: false, message: "Invalid discount value" });
    }

    if (type === "percentage" && discount > 100) {
      return res.json({ success: false, message: "Max 100% allowed" });
    }

    // Validate expiry
    if (expiry && new Date(expiry) < new Date()) {
      return res.json({ success: false, message: "Expiry must be future date" });
    }

    // ================= CHECK EXISTING =================
    const existing = await Coupon.findOne({ code });

    if (existing) {
      return res.json({ success: false, message: "Coupon already exists" });
    }

    // ================= CREATE =================
    const coupon = await Coupon.create({
      code,
      discount,
      type,
      expiry,
      minAmount,
    });

    res.json({ success: true, coupon });

  } catch (err) {
    console.error("ADD COUPON ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ================= SAVE ORDER =================
app.post("/save-order", async (req, res) => {
  try {
    const { userEmail, cartItems, totalAmount, couponCode, address, phone } =
      req.body;

    if (!userEmail || !cartItems || !totalAmount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const items = cartItems.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
    }));

    let discount = 0;
    let finalPrice = totalAmount;

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });

      if (coupon && coupon.expiry > new Date()) {
        if (coupon.type === "percentage") {
          discount = (totalAmount * coupon.discount) / 100;
        } else {
          discount = coupon.discount;
        }

        finalPrice = totalAmount - discount;
      }
    }

    const order = await Order.create({
      userEmail,
      items,
      totalAmount,
      discountAmount: discount,
      finalAmount: finalPrice,
      couponCode: couponCode || null,
      address,
      phone,
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error("SAVE ORDER ERROR:", err);
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
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.deliveryStatus !== "processing") {
      return res.status(400).json({
        message: "Order cannot be cancelled after shipping",
      });
    }

    order.deliveryStatus = "cancelled";
    await order.save();

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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
