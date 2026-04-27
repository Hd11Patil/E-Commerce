import React, { useState } from "react";
import { useApp } from "../context/AppContext";

const Products = () => {
  const { products, deleteProduct, updateProduct } = useApp();

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (p) => {
    setEditId(p.id);
    setEditForm({ ...p });
  };

  const saveEdit = () => {
    updateProduct(editId, editForm);
    setEditId(null);
  };

  return (
    <div>
      <h3>Products</h3>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              {editId === p.id ? (
                <>
                  <td>
                    <input
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                  </td>

                  <td>{editForm.brand}</td>
                  <td>{editForm.price}</td>

                  <td>
                    <button className="btn deliver" onClick={saveEdit}>
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{p.name}</td>
                  <td>{p.brand}</td>
                  <td>₹ {p.price}</td>

                  <td>
                    <button
                      className="btn deliver"
                      onClick={() => startEdit(p)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn cancel"
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;