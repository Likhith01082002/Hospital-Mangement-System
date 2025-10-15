import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Messages from "./components/Messages";
import AddNewDoctor from "./components/AddNewDoctor";
import AddNewAdmin from "./components/AddNewAdmin";
import Login from "./components/Login";
import Doctors from "./components/Doctors";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./main";
import Loading from "./components/loading";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a short loading time
    setTimeout(() => {
      setIsAuthenticated(false); // default: not logged in
      setUser({}); // empty user
      setLoading(false);
    }, 500);
  }, [setIsAuthenticated, setUser]);

  if (loading) return <Loading />;

  return (
    <Router>
      {/* ✅ Sidebar only shows when logged in */}
      {isAuthenticated && <Sidebar />}

      <Routes>
        {/* ✅ Default route (Landing Page) */}
        <Route path="/" element={<LandingPage />} />

        {/* ✅ Login routes for each portal */}
        <Route path="/admin-login" element={<Login />} />
        <Route path="/doctor-login" element={<Login />} />
        <Route path="/patient-login" element={<Login />} />

        {/* ✅ Other existing routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor/addnew" element={<AddNewDoctor />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>

      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
