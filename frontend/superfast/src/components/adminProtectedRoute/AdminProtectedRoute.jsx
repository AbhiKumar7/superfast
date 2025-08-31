import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoute() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

 
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (role !== "ADMIN") return <Navigate to="/" replace />;

  return <Outlet />;
}

export default AdminProtectedRoute;
