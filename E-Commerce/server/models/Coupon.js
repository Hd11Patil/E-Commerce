const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: String,
  discount: Number,
  type: String, // "percentage" or "fixed"
  expiry: Date,
  minAmount: Number,
});

module.exports = mongoose.model("Coupon", couponSchema);
    