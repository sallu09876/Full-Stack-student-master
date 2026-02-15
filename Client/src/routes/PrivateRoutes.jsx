// PrivateRoute.js
import { Navigate } from "react-router-dom";
import { getCookie } from "../lib/cookie";

export const PrivateRoute = ({ children }) => {
  const token = getCookie(); // check if SLKEY exists

  // If token exists, allow access, else redirect to login
  return token ? children : <Navigate to="/login" replace />;
};
