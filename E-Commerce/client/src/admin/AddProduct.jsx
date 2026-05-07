import React, { useState } from "react";

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    brand: "",
    price: "",
    image: "",
    category: "",
    stock: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!form.title || !form.price) {
      alert("Title & Price required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });

      const data = await res.json();
      alert(data.message || "Product Added");

      setForm({
        title: "",
        brand: "",
        price: "",
        image: "",
        category: "",
        stock: "",
        description: "",
      });

    } catch (err) {
      console.error(err);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="topbar">
        <h2>Add Product</h2>
      </div>

      <div className="add-product-container">
        <div className="add-product-card">

          <h3>Add New Product</h3>

          <form onSubmit={handleAdd} className="add-product-grid">

            <input name="title" placeholder="Product Title" value={form.title} onChange={handleChange} />
            <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} />

            <input type="number" name="price" placeholder="Price (₹)" value={form.price} onChange={handleChange} />
            <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />

            <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
            <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />

            {/* Image Preview */}
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="preview-img"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}

            <textarea
              name="description"
              placeholder="Product Description"
              value={form.description}
              onChange={handleChange}
            />

            <button type="submit" className="add-btn" disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;