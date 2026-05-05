import { useState, useEffect } from "react";
import ReturnModal from "./ReturnModal";
import ReturnTracking from "./ReturnTracking";
import "./AccountPage.css";

// ✅ Safe JSON parse helper
const safeParse = (data, fallback = null) => {
  try {
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

function OrdersSection({ activeSection }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showReturnModal, setShowReturnModal] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const rawUser = localStorage.getItem("user");
      const user = safeParse(rawUser);

      if (!user || !user.email) return setOrders([]);

      const res = await fetch(
        `https://e-commerce-bfn8.onrender.com/get-orders/${encodeURIComponent(user.email)}`,
      );

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeSection === "orders") fetchOrders();
  }, [activeSection]);

  const cancelOrder = async (id) => {
    try {
      const res = await fetch(
        `https://e-commerce-bfn8.onrender.com/cancel-order/${id}`,
        { method: "PUT" },
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Order Cancelled");
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ ALWAYS FRESH DATA WHEN OPENING MODAL
  const handleViewOrder = async (order) => {
    try {
      const rawUser = localStorage.getItem("user");
      const user = JSON.parse(rawUser);

      const res = await fetch(
        `https://e-commerce-bfn8.onrender.com/get-orders/${encodeURIComponent(user.email)}`,
      );

      const updatedOrders = await res.json();

      // ✅ get fresh updated order from DB
      const freshOrder = updatedOrders.find((o) => o._id === order._id);

      console.log("LATEST STATUS:", freshOrder?.deliveryStatus); // DEBUG

      setSelectedOrder(freshOrder);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="content-card">
      <h3>My Orders</h3>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <span className="order-total">₹{order.totalAmount}</span>
              <span className="order-date">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="order-status">
              <span className="badge paid">{order.paymentStatus}</span>
              <span className="badge delivery">{order.deliveryStatus}</span>
            </div>

            <div className="order-items">
              {order.items?.map((item, i) => (
                <div key={i} className="order-item-card">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="order-actions">
              <button
                className="view-btn"
                onClick={() => handleViewOrder(order)}
              >
                View Order
              </button>

              {order.deliveryStatus === "processing" && (
                <button
                  className="cancel-btn"
                  onClick={() => cancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))
      )}

      {/* ===== ORDER DETAILS MODAL ===== */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Order Details</h2>
              <span onClick={() => setSelectedOrder(null)}>✖</span>
            </div>

            <div className="modal-info">
              <p>
                <strong>ID:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Total:</strong> ₹{selectedOrder.totalAmount}
              </p>
            </div>

            <h3>Items</h3>
            <div className="modal-items">
              {selectedOrder.items?.map((item, i) => (
                <div key={i} className="item-row">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

            <h3>Tracking</h3>
            <Tracking status={selectedOrder.deliveryStatus} />

            {/* return btn */}
            {selectedOrder?.deliveryStatus === "delivered" &&
              !selectedOrder?.returnRequest?.isRequested && (
                <button
                  className="return-btn"
                  onClick={() => setShowReturnModal(true)}
                >
                  Return Order
                </button>
              )}

            {/* ✅ RETURN TRACKING */}
            {selectedOrder.returnRequest?.isRequested && (
              <>
                <h3>Return Status</h3>
                <ReturnTracking status={selectedOrder.returnRequest.status} />
              </>
            )}
          </div>
        </div>
      )}

      {/* ✅ RETURN MODAL */}
      {showReturnModal && selectedOrder && (
        <ReturnModal
          order={selectedOrder}
          onClose={() => setShowReturnModal(false)}
          refreshOrders={fetchOrders}
        />
      )}
    </div>
  );
}

export default OrdersSection;

// ===== TRACKING COMPONENT =====

function Tracking({ status }) {
  const steps = ["processing", "shipped", "out_for_delivery", "delivered"];

  const labels = {
    processing: "Processing",
    shipped: "Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  if (status === "cancelled") {
    return (
      <div className="tracking cancelled-tracking">
        <div className="step">
          <div className="circle cancelled active" />
          <p className="cancelled-text">Cancelled</p>
        </div>
      </div>
    );
  }

  const current = steps.indexOf(status);

  return (
    <div className="tracking">
      <div className="tracking-line"></div>

      {steps.map((step, index) => (
        <div key={step} className="step">
          <div className={`circle ${index <= current ? "active" : ""}`} />
          <p>{labels[step]}</p>
        </div>
      ))}
    </div>
  );
}
