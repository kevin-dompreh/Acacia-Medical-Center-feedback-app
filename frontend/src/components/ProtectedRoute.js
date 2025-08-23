// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const admin = localStorage.getItem("admin"); // check if admin is logged in
  if (!admin) {
    alert("You must be logged in as admin to access this page");
    return <Navigate to="/admin" />;
  }
  return children;
}

export default ProtectedRoute;
