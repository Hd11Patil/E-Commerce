import React, { useState } from "react";
import axios from "axios";
import "./AdminPanel.css";

const AdminCoupon = () => {
  const [form, setForm] = useState({
    code: "",
    discount: "",
    type: "percentage",
    minAmount: "",
    expiry: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !form.code ||
      !form.discount ||
      !form.minAmount ||
      !form.expiry
    ) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3001/admin/add-coupon",
        form
      );

      if (res.data.success) {
        alert("✅ Coupon Added Successfully");

        setForm({
          code: "",
          discount: "",
          type: "percentage",
          minAmount: "",
          expiry: "",
        });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div className="admin-coupon-page">
      <div className="admin-coupon-title">Admin Coupon</div>

      <div className="coupon-card">
        <h2>Add Coupon</h2>

        <div className="coupon-form-group">
          <label>Coupon Code</label>
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="coupon-input"
            placeholder="e.g. SAVE10"
          />
        </div>

        <div className="coupon-form-group">
          <label>Discount</label>
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            className="coupon-input"
            placeholder="Enter discount"
          />
        </div>

        <div className="coupon-form-group">
          <label>Discount Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="coupon-select"
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>

        <div className="coupon-form-group">
          <label>Minimum Amount</label>
          <input
            type="number"
            name="minAmount"
            value={form.minAmount}
            onChange={handleChange}
            className="coupon-input"
            placeholder="Enter minimum cart value"
          />
        </div>

        <div className="coupon-form-group">
          <label>Expiry Date</label>
          <input
            type="date"
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            className="coupon-date"
          />
        </div>

        <button className="coupon-btn-submit" onClick={handleSubmit}>
          Add Coupon
        </button>
      </div>
    </div>
  );
};

export default AdminCoupon;