import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AddressSection() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    addressLine: "",
  });

  const safeParse = (data, fallback) => {
  try {
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    return fallback;
  }
};

useEffect(() => {
  const raw = localStorage.getItem("user_addresses");
  const saved = safeParse(raw, []);
  setAddresses(saved);
}, []);

  const saveToStorage = (data) => {
    localStorage.setItem("user_addresses", JSON.stringify(data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAddress = () => {
    const { name, phone, city, state, pincode, addressLine } = form;

    if (!name || !phone || !city || !state || !pincode || !addressLine) {
      alert("Please fill all fields");
      return;
    }

    const newAddresses = [...addresses, { ...form, id: Date.now() }];
    setAddresses(newAddresses);
    saveToStorage(newAddresses);

    setForm({
      name: "",
      phone: "",
      city: "",
      state: "",
      pincode: "",
      addressLine: "",
    });
  };

  const handleDelete = (id) => {
    const filtered = addresses.filter((a) => a.id !== id);
    setAddresses(filtered);
    saveToStorage(filtered);
  };

  return (
    <div className="content-card">
      <h3>Saved Addresses</h3>

      <div className="address-form">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />
        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
        />
        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
        />
        <textarea
          name="addressLine"
          placeholder="Full Address"
          value={form.addressLine}
          onChange={handleChange}
        />

        <button className="add-address-btn" onClick={handleAddAddress}>
          Add Address
        </button>
      </div>

      <div className="address-list">
        {addresses.length === 0 ? (
          <p>No addresses added.</p>
        ) : (
          addresses.map((addr) => (
            <div key={addr.id} className="address-card">
              <p>
                <b>{addr.name}</b> ({addr.phone})
              </p>
              <p>{addr.addressLine}</p>
              <p>
                {addr.city}, {addr.state} - {addr.pincode}
              </p>

              <button
                className="delete-btn"
                onClick={() => handleDelete(addr.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AddressSection;