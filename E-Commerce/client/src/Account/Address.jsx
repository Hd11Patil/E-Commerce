

// import { useState, useEffect } from "react";
// import "./Address.css";

// function AddressSection() {
//   const [addresses, setAddresses] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     city: "",
//     state: "",
//     pincode: "",
//     addressLine: "",
//   });

//   // SAFE PARSE
//   const safeParse = (data, fallback) => {
//     try {
//       return data ? JSON.parse(data) : fallback;
//     } catch {
//       return fallback;
//     }
//   };

//   // LOAD ADDRESSES
//   useEffect(() => {
//     const raw = localStorage.getItem("user_addresses");
//     const saved = safeParse(raw, []);
//     setAddresses(saved);
//   }, []);

//   // SAVE TO LOCAL STORAGE
//   const saveToStorage = (data) => {
//     localStorage.setItem("user_addresses", JSON.stringify(data));
//   };

//   // HANDLE INPUT CHANGE
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // RESET FORM
//   const resetForm = () => {
//     setForm({
//       name: "",
//       phone: "",
//       city: "",
//       state: "",
//       pincode: "",
//       addressLine: "",
//     });

//     setEditingId(null);
//     setShowForm(false);
//   };

//   // SAVE ADDRESS
//   const handleSaveAddress = () => {
//     const { name, phone, city, state, pincode, addressLine } = form;

//     if (!name || !phone || !city || !state || !pincode || !addressLine) {
//       alert("Please fill all fields");
//       return;
//     }

//     let updatedAddresses = [];

//     // EDIT
//     if (editingId) {
//       updatedAddresses = addresses.map((addr) =>
//         addr.id === editingId
//           ? { ...form, id: editingId }
//           : addr
//       );
//     }

//     // ADD
//     else {
//       updatedAddresses = [
//         ...addresses,
//         {
//           ...form,
//           id: Date.now(),
//         },
//       ];
//     }

//     setAddresses(updatedAddresses);
//     saveToStorage(updatedAddresses);

//     resetForm();
//   };

//   // DELETE ADDRESS
//   const handleDelete = (id) => {
//     const filtered = addresses.filter((a) => a.id !== id);

//     setAddresses(filtered);
//     saveToStorage(filtered);
//   };

//   // EDIT ADDRESS
//   const handleEdit = (address) => {
//     setForm(address);
//     setEditingId(address.id);
//     setShowForm(true);
//   };

//   return (
//     <div className="content-card">

//       {/* TOP SECTION */}
//       <div className="address-top">
//         <h3>Saved Addresses</h3>

//         <button
//           className="add-new-btn"
//           onClick={() => setShowForm(true)}
//         >
//           + Add New Address
//         </button>
//       </div>

//       {/* ADDRESS FORM */}
//       {showForm && (
//         <div className="address-form">

//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={form.phone}
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             name="city"
//             placeholder="City"
//             value={form.city}
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             name="state"
//             placeholder="State"
//             value={form.state}
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             name="pincode"
//             placeholder="Pincode"
//             value={form.pincode}
//             onChange={handleChange}
//           />

//           <textarea
//             name="addressLine"
//             placeholder="Full Address"
//             value={form.addressLine}
//             onChange={handleChange}
//           />

//           <div className="form-buttons">

//             <button
//               className="save-btn"
//               onClick={handleSaveAddress}
//             >
//               {editingId ? "Update Address" : "Save Address"}
//             </button>

//             <button
//               className="cancel-btn"
//               onClick={resetForm}
//             >
//               Cancel
//             </button>

//           </div>
//         </div>
//       )}

//       {/* ADDRESS LIST */}
//       <div className="address-list">

//         {addresses.length === 0 ? (
//           <p className="no-address">
//             No addresses added yet.
//           </p>
//         ) : (
//           addresses.map((addr) => (
//             <div key={addr.id} className="address-card">

//               <div className="address-info">

//                 <h4>
//                   {addr.name}
//                   <span> ({addr.phone})</span>
//                 </h4>

//                 <p>{addr.addressLine}</p>

//                 <p>
//                   {addr.city}, {addr.state} - {addr.pincode}
//                 </p>

//               </div>

//               <div className="address-actions">

//                 <button
//                   className="edit-btn"
//                   onClick={() => handleEdit(addr)}
//                 >
//                   Edit
//                 </button>

//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDelete(addr.id)}
//                 >
//                   Delete
//                 </button>

//               </div>

//             </div>
//           ))
//         )}

//       </div>
//     </div>
//   );
// }

// export default AddressSection;
// --------------------------------------
import { useState, useEffect } from "react";
import "./Address.css";

function AddressSection() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    addressLine: "",
  });

  // SAFE PARSE
  const safeParse = (data, fallback) => {
    try {
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  };

  // LOAD ADDRESSES
  useEffect(() => {
    const raw = localStorage.getItem("user_addresses");
    const saved = safeParse(raw, []);
    setAddresses(saved);
  }, []);

  // SAVE TO STORAGE
  const saveToStorage = (data) => {
    localStorage.setItem("user_addresses", JSON.stringify(data));
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // RESET FORM
  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      city: "",
      state: "",
      pincode: "",
      addressLine: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // SAVE ADDRESS
  const handleSaveAddress = () => {
    const { name, phone, city, state, pincode, addressLine } = form;

    if (!name || !phone || !city || !state || !pincode || !addressLine) {
      alert("Please fill all fields");
      return;
    }

    let updatedAddresses = [];

    // UPDATE
    if (editingId) {
      updatedAddresses = addresses.map((addr) =>
        addr.id === editingId
          ? { ...form, id: editingId }
          : addr
      );
    }

    // ADD NEW
    else {
      updatedAddresses = [
        ...addresses,
        {
          ...form,
          id: Date.now(),
        },
      ];
    }

    setAddresses(updatedAddresses);
    saveToStorage(updatedAddresses);

    resetForm();
  };

  // DELETE
  const handleDelete = (id) => {
    const filtered = addresses.filter((a) => a.id !== id);

    setAddresses(filtered);
    saveToStorage(filtered);
  };

  // EDIT
  const handleEdit = (address) => {
    setForm(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  return (
    <div className="address-section">

      {/* TOP */}
      <div className="address-top">
        <h3 className="address-heading">Saved Addresses</h3>

        <button
          className="address-add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add New Address
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="address-form-wrapper">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="address-input"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="address-input"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="address-input"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="address-input"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="address-input"
          />

          <textarea
            name="addressLine"
            placeholder="Full Address"
            value={form.addressLine}
            onChange={handleChange}
            className="address-textarea"
          />

          <div className="address-form-buttons">

            <button
              className="address-save-btn"
              onClick={handleSaveAddress}
            >
              {editingId ? "Update Address" : "Save Address"}
            </button>

            <button
              className="address-cancel-btn"
              onClick={resetForm}
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* LIST */}
      <div className="address-list">

        {addresses.length === 0 ? (
          <p className="address-empty">
            No addresses added yet.
          </p>
        ) : (
          addresses.map((addr) => (
            <div key={addr.id} className="address-card">

              <div className="address-info">

                <h4 className="address-name">
                  {addr.name}
                  <span className="address-phone">
                    ({addr.phone})
                  </span>
                </h4>

                <p className="address-line">
                  {addr.addressLine}
                </p>

                <p className="address-location">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>

              </div>

              <div className="address-actions">

                <button
                  className="address-edit-btn"
                  onClick={() => handleEdit(addr)}
                >
                  Edit
                </button>

                <button
                  className="address-delete-btn"
                  onClick={() => handleDelete(addr.id)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default AddressSection;