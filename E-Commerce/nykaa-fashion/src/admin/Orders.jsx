import React, { useEffect, useState } from "react";
import API from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const load = () => {
    API.get("/admin/orders")
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]));
  };

  useEffect(() => {
    load();
  }, []);
const updateStatus = async (id, status) => {
  try {
    const res = await fetch(
      `http://localhost:3001/admin/order-status/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!res.ok) {
      alert("❌ Failed");
      return;
    }

    // 🔥 MAIN CHANGE → instant UI update
    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, deliveryStatus: status } : o
      )
    );

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};




  const getStatusClass = (status) => {
    if (status === "delivered") return "status delivered";
    if (status === "cancelled") return "status cancelled";
    if (status ===  "out-delivery") return "status out_for_delivery";
    if (status === "shipped") return "status shipped";
    return "status processing";
  };

  return (
    <div className="orders-container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o.userEmail}</td>
              <td>₹ {o.totalAmount}</td>

              <td>
                <span className={getStatusClass(o.deliveryStatus)}>
                  {o.deliveryStatus}
                </span>
              </td>

              <td>
                <button
                  className="btn processing"
                  onClick={() => updateStatus(o._id, "processing")}
                >
                  Processing
                </button>

                <button
                  className="btn shipped"
                  onClick={() => updateStatus(o._id, "shipped")}
                >
                  Shipped
                </button>

                <button
                  className="btn out"
                  onClick={() => updateStatus(o._id, "out_for_delivery")}
                >
                  Out for Delivery
                </button>

                <button
                  className="btn deliver"
                  onClick={() => updateStatus(o._id, "delivered")}
                >
                  Deliver
                </button>

                <button
                  className="btn cancel"
                  onClick={() => updateStatus(o._id, "cancelled")}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
