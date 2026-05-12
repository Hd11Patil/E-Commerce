import { useState, useEffect } from "react";
import ReplacementModal from "./ReplacementModal";
import ReplacementTracking from "./ReplacementTracking";
import ReturnModal from "./ReturnModal";
import ReturnTracking from "./ReturnTracking";
import "./OrdersSection.css";

const API_BASE =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://e-commerce-bfn8.onrender.com");

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
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showReplacementModal, setShowReplacementModal] = useState(false);

  const canReturnOrder = (order) =>
    order?.deliveryStatus === "delivered" &&
    order?.returnRequest?.isRequested !== true &&
    order?.replacementRequest?.isRequested !== true;

  const canReplaceOrder = (order) =>
    order?.deliveryStatus === "delivered" &&
    order?.returnRequest?.isRequested !== true &&
    order?.replacementRequest?.isRequested !== true;

  const getFreshOrder = async (order) => {
    const rawUser = localStorage.getItem("user");
    const user = safeParse(rawUser);

    if (!user?.email) return order;

    const res = await fetch(
      `${API_BASE}/get-orders/${encodeURIComponent(user.email)}`,
    );

    const updatedOrders = await res.json();
    return Array.isArray(updatedOrders)
      ? updatedOrders.find((o) => o._id === order._id) || order
      : order;
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const rawUser = localStorage.getItem("user");
      const user = safeParse(rawUser);

      if (!user || !user.email) return setOrders([]);

      const res = await fetch(
        `${API_BASE}/get-orders/${encodeURIComponent(user.email)}`,
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
      const res = await fetch(`${API_BASE}/cancel-order/${id}`, {
        method: "PUT",
      });

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

  // ✅ ALWAYS GET LATEST ORDER BEFORE OPENING MODAL
  const handleViewOrder = async (order) => {
    try {
      const rawUser = localStorage.getItem("user");
      const user = JSON.parse(rawUser);

      const res = await fetch(
        `${API_BASE}/get-orders/${encodeURIComponent(user.email)}`,
      );

      const updatedOrders = await res.json();

      const freshOrder = updatedOrders.find((o) => o._id === order._id);

      // ✅ fallback safety
      setSelectedOrder(freshOrder || order);
      setShowOrderDetails(true);
    } catch (err) {
      console.error(err);
      setSelectedOrder(order); // fallback
      setShowOrderDetails(true);
    }
  };

  const handleReturnOrder = async (order) => {
    try {
      const freshOrder = await getFreshOrder(order);

      if (!canReturnOrder(freshOrder)) {
        alert(
          freshOrder.returnRequest?.isRequested
            ? "Return already requested"
            : "Return is only available after delivery",
        );
        fetchOrders();
        return;
      }

      setSelectedOrder(freshOrder);
      setShowOrderDetails(false);
      setShowReturnModal(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleReplacementOrder = async (order) => {
    try {
      const freshOrder = await getFreshOrder(order);

      if (!canReplaceOrder(freshOrder)) {
        alert(
          freshOrder.replacementRequest?.isRequested
            ? "Replacement already requested"
            : "Replacement is only available after delivery",
        );
        fetchOrders();
        return;
      }

      setSelectedOrder(freshOrder);
      setShowOrderDetails(false);
      setShowReplacementModal(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
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

              {canReturnOrder(order) && (
                <button
                  className="return-btn"
                  onClick={() => handleReturnOrder(order)}
                >
                  Return Order
                </button>
              )}

              {canReplaceOrder(order) && (
                <button
                  className="replacement-btn"
                  onClick={() => handleReplacementOrder(order)}
                >
                  Replace Product
                </button>
              )}
            </div>

            {order.returnRequest?.isRequested && (
              <div className="return-status-section">
                <h4>Return Status</h4>
                <ReturnTracking status={order.returnRequest.status} />
              </div>
            )}

            {order.replacementRequest?.isRequested && (
              <div className="replacement-status-section">
                <h4>Replacement Status</h4>
                <ReplacementTracking
                  status={order.replacementRequest.status}
                />
              </div>
            )}
          </div>
        ))
      )}

      {/* ===== ORDER DETAILS MODAL ===== */}
      {selectedOrder && showOrderDetails && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Order Details</h2>
              <span
                onClick={() => {
                  setSelectedOrder(null);
                  setShowOrderDetails(false);
                }}
              >
                ✖
              </span>
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

            {/* ✅ RETURN BUTTON FIXED */}
            {canReturnOrder(selectedOrder) && (
              <button
                className="return-btn"
                onClick={() => setShowReturnModal(true)}
              >
                Return Order
              </button>
            )}

            {canReplaceOrder(selectedOrder) && (
              <button
                className="replacement-btn"
                onClick={() => setShowReplacementModal(true)}
              >
                Replace Product
              </button>
            )}

            {/* ✅ RETURN TRACKING */}
            {selectedOrder.returnRequest?.isRequested && (
              <>
                <h3>Return Status</h3>
                <ReturnTracking status={selectedOrder.returnRequest.status} />
              </>
            )}

            {selectedOrder.replacementRequest?.isRequested && (
              <>
                <h3>Replacement Status</h3>
                <ReplacementTracking
                  status={selectedOrder.replacementRequest.status}
                />
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
          refreshOrders={async () => {
            await fetchOrders();

            const rawUser = localStorage.getItem("user");
            const user = safeParse(rawUser);

            const res = await fetch(
              `${API_BASE}/get-orders/${encodeURIComponent(user.email)}`,
            );

            const updatedOrders = await res.json();
            const freshOrder = updatedOrders.find(
              (o) => o._id === selectedOrder._id,
            );

            setSelectedOrder(freshOrder);
          }}
        />
      )}

      {showReplacementModal && selectedOrder && (
        <ReplacementModal
          order={selectedOrder}
          onClose={() => setShowReplacementModal(false)}
          refreshOrders={async () => {
            await fetchOrders();

            const rawUser = localStorage.getItem("user");
            const user = safeParse(rawUser);

            const res = await fetch(
              `${API_BASE}/get-orders/${encodeURIComponent(user.email)}`,
            );

            const updatedOrders = await res.json();
            const freshOrder = updatedOrders.find(
              (o) => o._id === selectedOrder._id,
            );

            setSelectedOrder(freshOrder);
          }}
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
    returned: "Returned",
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

  if (status === "returned") {
    return (
      <div className="tracking cancelled-tracking">
        <div className="step">
          <div className="circle active" />
          <p>Returned</p>
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
