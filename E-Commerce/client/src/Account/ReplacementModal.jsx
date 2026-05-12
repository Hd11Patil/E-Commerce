import { useState } from "react";

const API_BASE =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://e-commerce-bfn8.onrender.com");

function ReplacementModal({ order, onClose, refreshOrders }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReplacement = async () => {
    if (!reason) {
      alert("Please select reason");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/replacement/${order._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });

      const data = await res
        .json()
        .catch(() => ({ message: `Request failed with ${res.status}` }));

      if (!res.ok) {
        alert(data.message || "Failed to submit replacement");
        return;
      }

      alert("Replacement request submitted");
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
          <h2>Replace Product</h2>
          <span onClick={onClose}>x</span>
        </div>

        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Total:</strong> Rs {order.totalAmount}
        </p>

        <h3>Select Reason</h3>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="return-select"
        >
          <option value="">Select Reason</option>
          <option value="Wrong Product">Wrong Product Received</option>
          <option value="Defective Product">Defective Product</option>
          <option value="Damaged Product">Damaged Product</option>
          <option value="Size Replacement">Size Replacement</option>
        </select>

        <button
          className="submit-replacement-btn"
          onClick={submitReplacement}
          disabled={loading}
        >
          {loading ? "Confirming..." : "Confirm Replacement"}
        </button>
      </div>
    </div>
  );
}

export default ReplacementModal;
