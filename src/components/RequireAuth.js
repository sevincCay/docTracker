import React from "react";
import { Navigate } from "react-router-dom";

function RequireAuth({ children, redirectTo }) {
  let isAuth = localStorage.getItem("auth-token");

  return isAuth ? children : <Navigate to={redirectTo} />;
}

export default RequireAuth;
