import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 SIMPLE CHECK (you can change email)
  if (!user || user.email !== "harshal.dp11@gmail.com") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
