import React, { useState } from "react";
import { useApp } from "../context/AppContext";

const AddProduct = () => {
  const { addProduct } = useApp();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
  });

  const handleAdd = () => {
    if (!form.name || !form.price) return;

    addProduct({
      ...form,
      price: +form.price,
    });

    setForm({ name: "", brand: "", price: "" });
  };

  return (
    <div className="form-box">
      <h3>Add Product</h3>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Brand"
        value={form.brand}
        onChange={(e) => setForm({ ...form, brand: e.target.value })}
      />

      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button onClick={handleAdd}>Add Product</button>
    </div>
  );
};

export default AddProduct;