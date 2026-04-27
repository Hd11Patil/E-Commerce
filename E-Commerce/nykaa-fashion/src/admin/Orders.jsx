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

  const update = async (id, status) => {
    await API.put(`/admin/order-status/${id}`, { status });
    load();
  };

  const getStatusClass = (status) => {
    if (status === "delivered") return "status delivered";
    if (status === "cancelled") return "status cancelled";
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
                  className="btn deliver"
                  onClick={() => update(o._id, "delivered")}
                >
                  Deliver
                </button>

                <button
                  className="btn cancel"
                  onClick={() => update(o._id, "cancelled")}
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