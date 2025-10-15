import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import Loading from "./loading";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  const location = useLocation();

  // ✅ Determine portal type based on route
  const getPortalType = () => {
    if (location.pathname.includes("admin")) return "Admin";
    if (location.pathname.includes("doctor")) return "Doctor";
    if (location.pathname.includes("patient")) return "Patient";
    return "User"; // Default fallback
  };

  const portalType = getPortalType();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate async login
    setTimeout(() => {
      toast.success(`${portalType} login successful!`);
      setIsAuthenticated(true);
      setLoading(false);

      // ✅ Redirect to respective dashboard instead of landing page
      if (portalType === "Admin") navigateTo("/dashboard");
      else if (portalType === "Doctor") navigateTo("/doctor-dashboard");
      else if (portalType === "Patient") navigateTo("/patient-dashboard");
      else navigateTo("/dashboard");
    }, 500);
  };

  // ✅ Redirect to the correct dashboard if already logged in
  if (isAuthenticated) {
    if (portalType === "Admin") return <Navigate to="/dashboard" />;
    if (portalType === "Doctor") return <Navigate to="/doctor-dashboard" />;
    if (portalType === "Patient") return <Navigate to="/patient-dashboard" />;
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      {loading && <Loading />}
      <div className="container form-component">
        <img src="/logo.png" alt="EXCELR" className="logo" />
        <h1 className="form-title">{portalType} Login</h1>
        <p>Welcome to the {portalType} Portal of EXCELR Hospital</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button type="submit">Login</button>
          </div>

          {/* Register & Forgot Password buttons */}
          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#007bff",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigateTo("/register")}
            >
              Register Now
            </button>

            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#007bff",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigateTo("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
