import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { StudentSignup } from "./pages/SignupPage";
import { StudentLogin } from "./pages/LoginPage";
import { Jwt } from "./pages/Jwt";
import { PrivateRoute } from "./routes/PrivateRoutes";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<StudentSignup />} />
        <Route path="/login" element={<StudentLogin />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/jwt"
          element={
            <PrivateRoute>
              <Jwt />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};