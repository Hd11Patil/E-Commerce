import "./Sidebar.css";

const SECTIONS = [
  { id: "profile", label: "My Profile" },
  { id: "orders", label: "My Orders" },
  { id: "address", label: "Saved Addresses" },
];

export default function Sidebar({
  active,
  onSelect,
  onSignOut,
  user,
}) {
  return (
    <aside className="sidebar">
      {/* User Image */}
      <div className="sidebar-top">
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="sidebar-avatar-image"
          />
        ) : (
          <div className="user-avatar">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>
        )}

        <div className="user-name">
          {user?.name || "User"}
        </div>

        <div className="user-email">
          {user?.email || "No Email"}
        </div>
      </div>

      <hr className="sidebar-divider" />

      {/* Menu */}
      <ul className="sidebar-menu">
        {SECTIONS.map((section) => (
          <li
            key={section.id}
            className={
              active === section.id ? "active" : ""
            }
            onClick={() => onSelect(section.id)}
          >
            {section.label}
          </li>
        ))}
      </ul>

      {/* Sign Out */}
      <button
        className="signout-btn"
        onClick={onSignOut}
      >
        Sign Out
      </button>
    </aside>
  );
}