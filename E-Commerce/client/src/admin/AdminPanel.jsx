import React, { useState } from "react";
import "./AdminPanel.css";

import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Products from "./Products";
import AddProduct from "./AddProduct";

const TABS = ["Dashboard", "Orders", "Products", "Add Product"];

const AdminPanel = () => {
  const [tab, setTab] = useState("Dashboard");

  const renderTab = () => {
    switch (tab) {
      case "Dashboard":
        return <Dashboard />;
      case "Orders":
        return <Orders />;
      case "Products":
        return <Products />;
      case "Add Product":
        return <AddProduct />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Admin Panel</h2>

        {TABS.map((t) => (
          <div
            key={t}
            className={`sidebar-item ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="main-content">
        <div className="topbar">
          <h2>{tab}</h2>
        </div>

        <div className="content-box">{renderTab()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;