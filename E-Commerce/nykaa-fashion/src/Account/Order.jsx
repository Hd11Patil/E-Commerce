import { useState, useEffect } from "react";
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

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const rawUser = localStorage.getItem("user");
      const user = safeParse(rawUser);

      if (!user || !user.email) return setOrders([]);

      const res = await fetch(
        `http://localhost:3001/get-orders/${encodeURIComponent(user.email)}`
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
      const res = await fetch(`http://localhost:3001/cancel-order/${id}`, {
        method: "PUT",
      });

      if (!res.ok) return alert("Failed to cancel order");

      alert("Order Cancelled");
      fetchOrders();
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
              {order.deliveryStatus !== "cancelled" && (
                <button
                  className="cancel-btn"
                  onClick={() => cancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              )}

              <button
                className="view-btn"
                onClick={() => setSelectedOrder(order)}
              >
                View Order
              </button>
            </div>

          </div>
        ))
      )}

      {/* ===== MODAL ===== */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal">

            <div className="modal-header">
              <h2>Order Details</h2>
              <span onClick={() => setSelectedOrder(null)}>✖</span>
            </div>

            <div className="modal-info">
              <p><strong>ID:</strong> {selectedOrder._id}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              <p><strong>Total:</strong> ₹{selectedOrder.totalAmount}</p>
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

          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersSection;


// ===== TRACKING COMPONENT =====
function Tracking({ status }) {
  const steps = ["processing", "shipped", "out for delivery", "delivered"];
  const current = steps.indexOf(status?.toLowerCase());

  return (
    <div className="tracking">
      <div className="tracking-line"></div>

      {steps.map((step, index) => (
        <div key={index} className="step">
          <div className={`circle ${index <= current ? "active" : ""}`} />
          <p>{step}</p>
        </div>
      ))}
    </div>
  );
}