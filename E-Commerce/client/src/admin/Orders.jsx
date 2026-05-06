import React, { useEffect, useState } from "react";
import API from "../services/api";

const API_BASE =
  process.env.REACT_APP_API_URL || "https://e-commerce-bfn8.onrender.com";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");

  const load = () => {
    API.get("/admin/orders")
      .then((res) => {
        // ✅ FIX: ensure returnRequest exists for all orders
        const fixed = res.data.map((o) => ({
          ...o,
          returnRequest: o.returnRequest || {
            isRequested: false,
            status: "pending",
          },
        }));
        setOrders(fixed);
      })
      .catch(() => setOrders([]));
  };

  useEffect(() => {
    load();
  }, []);

  // ✅ UPDATE DELIVERY STATUS
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `${API_BASE}/admin/order-status/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        alert("❌ Failed");
        return;
      }

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

  // ✅ HANDLE RETURN
  const handleReturn = async (id, status) => {
    try {
      const res = await fetch(
        `${API_BASE}/admin/return/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      const updatedOrder = data.order;

      if (!res.ok) {
        alert(data.message || "❌ Failed");
        return;
      }

      // ✅ update UI properly
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id
            ? {
                ...(updatedOrder || o),
                returnRequest: {
                  ...(updatedOrder?.returnRequest || o.returnRequest),
                  isRequested: true,
                  status:
                    updatedOrder?.returnRequest?.status || status,
                },
              }
            : o
        )
      );
      load();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusClass = (status) => {
    if (status === "delivered") return "status delivered";
    if (status === "cancelled") return "status cancelled";
    if (status === "returned") return "status returned";
    if (status === "out_for_delivery") return "status out_for_delivery";
    if (status === "shipped") return "status shipped";
    return "status processing";
  };

  // ✅ FIXED FILTER
  const filteredOrders =
    activeTab === "returns"
      ? orders.filter(
          (o) =>
            o.returnRequest &&
            o.returnRequest.isRequested === true
        )
      : orders;

  return (
    <div className="orders-container">

      <div className="tabs">
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          All Orders
        </button>

        <button
          className={activeTab === "returns" ? "active" : ""}
          onClick={() => setActiveTab("returns")}
        >
          Return Requests
        </button>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            {activeTab === "returns" && <th>Return</th>}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.map((o) => (
            <tr
              key={o._id}
              className={
                o.returnRequest?.isRequested ? "return-row" : ""
              }
            >
              <td>{o.userEmail}</td>
              <td>₹ {o.totalAmount}</td>

              <td>
                <span className={getStatusClass(o.deliveryStatus)}>
                  {o.deliveryStatus}
                </span>
              </td>

              {activeTab === "returns" && (
                <td>
                  <span className="status return">
                    {o.returnRequest?.status}
                  </span>
                </td>
              )}

              <td>
                {activeTab === "orders" && (
                  <>
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
                      onClick={() =>
                        updateStatus(o._id, "out_for_delivery")
                      }
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
                  </>
                )}

                {activeTab === "returns" &&
                  o.returnRequest?.status === "pending" && (
                    <>
                      <button
                        className="btn approve"
                        onClick={() =>
                          handleReturn(o._id, "approved")
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="btn cancel"
                        onClick={() =>
                          handleReturn(o._id, "rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
