import React, { useEffect, useState } from "react";
import API from "../api";

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/admin/dashboard")
      .then((res) => setData(res.data))
      .catch(() => setData({}));
  }, []);

  return (
    <div className="dash-grid">
      <div className="stat-card blue">
        <p>Total Orders</p>
        <h3>{data.totalOrders || 0}</h3>
      </div>

      <div className="stat-card green">
        <p>Total Users</p>
        <h3>{data.totalUsers || 0}</h3>
      </div>

      <div className="stat-card gold">
        <p>Total Revenue</p>
        <h3>₹ {data.revenue || 0}</h3>
      </div>
    </div>
  );
};

export default Dashboard;