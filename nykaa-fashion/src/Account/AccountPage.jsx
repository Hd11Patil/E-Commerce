import { useState } from "react";
import "./AccountPage.css";

const SECTIONS = [
  {
    id: "profile",
    label: "My Profile",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: "orders",
    label: "My Orders",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 7h8M8 12h8M8 17h5" />
      </svg>
    ),
  },
  {
    id: "address",
    label: "Saved Addresses",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
];

// Orders data
const ORDERS = [
  {
    id: "#TG-20419",
    date: "2 Apr 2026",
    items: 3,
    products: "Floral Wrap Dress, White Linen Blazer, Strappy Heels",
    total: "₹5,299",
    status: "shipped",
    statusLabel: "Shipped",
  },
];

// Filters
const ORDER_FILTERS = ["All", "Processing", "Shipped", "Delivered"];

// ── Sidebar ─────────────────────────────────────────

function Sidebar({ active, onSelect, onSignOut }) {
  return (
    <aside className="sidebar">
      <div className="user-avatar">SR</div>
      <div className="user-name">Sneha Rao</div>
      <div className="user-email">sneha.rao@gmail.com</div>

      <hr className="sidebar-divider" />

      <ul className="sidebar-menu">
        {SECTIONS.map((s) => (
          <li
            key={s.id}
            className={active === s.id ? "active" : ""}
            onClick={() => onSelect(s.id)}
          >
            {s.icon}
            {s.label}
          </li>
        ))}
      </ul>

      <button className="signout-btn" onClick={onSignOut}>
        Sign Out
      </button>
    </aside>
  );
}

// ── Profile Section ─────────────────────────────────

function ProfileSection() {
  const [form, setForm] = useState({
    firstName: "Sneha",
    lastName: "Rao",
    email: "sneha.rao@gmail.com",
    phone: "+91 98765 43210",
    gender: "Female",
  });

  return (
    <div className="content-card">
      <h3>Profile</h3>
      <input value={form.firstName} readOnly />
      <input value={form.email} readOnly />
    </div>
  );
}

// ── Orders Section ─────────────────────────────────

function OrdersSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? ORDERS
      : ORDERS.filter((o) => o.statusLabel === activeFilter);

  return (
    <div className="content-card">
      <h3>Orders</h3>

      {filtered.map((order) => (
        <div key={order.id}>
          <p>{order.id}</p>
          <p>{order.total}</p>
        </div>
      ))}
    </div>
  );
}

// ── Address Section ─────────────────────────────────

function AddressSection() {
  return (
    <div className="content-card">
      <h3>Addresses</h3>
      <p>No addresses added.</p>
    </div>
  );
}

// ── MAIN ───────────────────────────────────────────

export default function AccountPage() {
  const [activeSection, setActiveSection] = useState("profile");

  const handleSignOut = () => {
    alert("Signed out");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "orders":
        return <OrdersSection />;
      case "address":
        return <AddressSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="account-page">
      <Sidebar
        active={activeSection}
        onSelect={setActiveSection}
        onSignOut={handleSignOut}
      />
      <main>{renderSection()}</main>
    </div>
  );
}
