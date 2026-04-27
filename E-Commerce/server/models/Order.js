const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },

    items: [
      {
        productId: {
          type: Number, // ✅ IMPORTANT FIX
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "paid",
    },

    paymentMethod: {
      type: String,
      default: "stripe",
    },

    deliveryStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },

    address: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);