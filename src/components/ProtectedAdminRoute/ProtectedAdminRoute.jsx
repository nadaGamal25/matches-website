import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  if (localStorage.getItem("adminToken") == null) {
    console.log("No admin token");
    return <Navigate to="/admin" />;
  } else {
    return children;
  }
}
