// import { useState } from "react";

// function ReturnModal({ order, onClose, refreshOrders }) {
//   const [reason, setReason] = useState("");

//   const submitReturn = async () => {
//     if (!reason) {
//       alert("Please select reason");
//       return;
//     }

//     await fetch(
//       `https://e-commerce-bfn8.onrender.com/return/${order._id}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ reason }),
//       }
//     );

//     alert("Return request submitted");

//     onClose();
//     refreshOrders();
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal">

//         <div className="modal-header">
//           <h2>Return Order</h2>
//           <span onClick={onClose}>✖</span>
//         </div>

//         <p><strong>Order ID:</strong> {order._id}</p>
//         <p><strong>Total:</strong> ₹{order.totalAmount}</p>

//         <h3>Select Reason</h3>
//         <select
//           value={reason}
//           onChange={(e) => setReason(e.target.value)}
//           className="return-select"
//         >
//           <option value="">Select Reason</option>
//           <option value="Damaged">Damaged Product</option>
//           <option value="Wrong Item">Wrong Item</option>
//           <option value="Size Issue">Size Issue</option>
//         </select>

//         <button className="submit-return-btn" onClick={submitReturn}>
//           Submit Return
//         </button>

//       </div>
//     </div>
//   );
// }

// export default ReturnModal;

// 0000000000000000000000000000000000000
import { useState } from "react";

const API_BASE =
  process.env.REACT_APP_API_URL || "https://e-commerce-bfn8.onrender.com";

function ReturnModal({ order, onClose, refreshOrders }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReturn = async () => {
    if (!reason) {
      alert("Please select reason");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/return/${order._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to submit return");
        return;
      }

      alert("Return request submitted");

      // 🔥 IMPORTANT: wait for refresh
      await refreshOrders();

      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h2>Return Order</h2>
          <span onClick={onClose}>✖</span>
        </div>

        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Total:</strong> ₹{order.totalAmount}</p>

        <h3>Select Reason</h3>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="return-select"
        >
          <option value="">Select Reason</option>
          <option value="Damaged">Damaged Product</option>
          <option value="Wrong Item">Wrong Item</option>
          <option value="Size Issue">Size Issue</option>
        </select>

        <button
          className="submit-return-btn"
          onClick={submitReturn}
          disabled={loading}
        >
          {loading ? "Confirming..." : "Confirm Return"}
        </button>

      </div>
    </div>
  );
}

export default ReturnModal;
