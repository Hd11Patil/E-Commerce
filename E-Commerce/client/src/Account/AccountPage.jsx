import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OrdersSection from "./Order";
import AddressSection from "./Address";
import ProfileSection from "./ProfileSection";
import Sidebar from "./Sidebar";

import "./AccountPage.css";

const SECTIONS = [
  { id: "profile", label: "My Profile" },
  { id: "orders", label: "My Orders" },
  { id: "address", label: "Saved Addresses" },
];

// ✅ SAFE PARSE FUNCTION
const safeParse = (data, fallback = null) => {
  try {
    if (!data || data === "undefined") return fallback;
    return JSON.parse(data);
  } catch {
    return fallback;
  }
};


// ── MAIN ───────────────────────────────────────────
export default function AccountPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");

    const storedUser = safeParse(rawUser);

    if (!token || !storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection user={user} />;
      case "orders":
        return <OrdersSection activeSection={activeSection} />;
      case "address":
        return <AddressSection />;
      default:
        return <ProfileSection user={user} />;
    }
  };

  return (
    <div className="account-page">
      <Sidebar
        active={activeSection}
        onSelect={setActiveSection}
        onSignOut={handleSignOut}
        user={user}
      />
      <main>{renderSection()}</main>
    </div>
  );
}
