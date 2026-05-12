const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },

    items: [
      {
        productId: Number,
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
      enum: ["pending", "paid", "failed", "refunded"], // ✅ FIXED
      default: "paid",
    },

    paymentMethod: {
      type: String,
      default: "stripe",
    },

    deliveryStatus: {
      type: String,
      enum: [
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "processing",
    },

    returnRequest: {
      isRequested: { type: Boolean, default: false },
      reason: { type: String, default: "" },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected", "completed"],
        default: "pending",
      },
      requestedAt: { type: Date, default: null },
      processedAt: { type: Date, default: null },
    },

    replacementRequest: {
      isRequested: { type: Boolean, default: false },
      reason: { type: String, default: "" },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected", "completed"],
        default: "pending",
      },
      requestedAt: { type: Date, default: null },
      processedAt: { type: Date, default: null },
    },

    address: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
