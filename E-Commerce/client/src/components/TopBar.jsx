import React from "react";
import { Link } from "react-router-dom";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar-container">
        {/* Left Side - Welcome Message */}
        <div className="topbar-left hide-mobile">
          <span>Welcome to TECYGIG - Premium Fashion & Lifestyle</span>
        </div>

        {/* Right Side - Action Links */}
        <div className="topbar-right">
          <Link to="/login" className="topbar-link login-link">
            Login
          </Link>
          <span className="topbar-divider">|</span>
          <Link to="/register" className="topbar-link register-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
