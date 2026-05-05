import React, { useEffect, useState } from "react";
import API from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders"); // ✅ NEW

  const load = () => {
    API.get("/admin/orders")
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]));
  };

  useEffect(() => {
    load();
  }, []);

  // ✅ EXISTING (UNCHANGED)
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `https://e-commerce-bfn8.onrender.com/admin/order-status/${id}`,
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

  // ✅ NEW: HANDLE RETURN
  const handleReturn = async (id, status) => {
    try {
      const res = await fetch(
        `https://e-commerce-bfn8.onrender.com/admin/return/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        alert("❌ Failed to update return");
        return;
      }

      // ✅ instant UI update
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id
            ? {
                ...o,
                returnRequest: {
                  ...o.returnRequest,
                  status:
                    status === "approved" ? "completed" : "rejected",
                },
              }
            : o
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ EXISTING
  const getStatusClass = (status) => {
    if (status === "delivered") return "status delivered";
    if (status === "cancelled") return "status cancelled";
    if (status === "out_for_delivery") return "status out_for_delivery";
    if (status === "shipped") return "status shipped";
    return "status processing";
  };

  // ✅ FILTER LOGIC
  const filteredOrders =
    activeTab === "returns"
      ? orders.filter((o) => o.returnRequest?.isRequested)
      : orders;

  return (
    <div className="orders-container">

      {/* ✅ TABS */}
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

            {/* ✅ ONLY SHOW IN RETURN TAB */}
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

              {/* DELIVERY STATUS */}
              <td>
                <span className={getStatusClass(o.deliveryStatus)}>
                  {o.deliveryStatus}
                </span>
              </td>

              {/* ✅ RETURN STATUS */}
              {activeTab === "returns" && (
                <td>
                  <span className="status return">
                    {o.returnRequest?.status}
                  </span>
                </td>
              )}

              <td>

                {/* ✅ NORMAL ORDER ACTIONS */}
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

                {/* ✅ RETURN ACTIONS */}
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