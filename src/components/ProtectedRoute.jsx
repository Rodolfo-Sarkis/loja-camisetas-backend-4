import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ adminOnly = false }) {
  const { user, token } = useContext(AuthContext);
  const location = useLocation();

  const isLoggedIn = Boolean(user && token);
  const isAdmin = Boolean(user?.isAdmin || user?.role === "admin");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;