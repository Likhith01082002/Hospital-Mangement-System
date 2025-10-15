import React, { useContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import Appointment from "./pages/Appointment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { Context } from "./main";
import Footer from "./components/Footer";
import Loading from "./components/loading"; 

const App = () => {
  const { isAuthenticated } = useContext(Context);
  const [loading, setLoading] = useState(false); // no backend fetch needed

  if (loading) {
    return <Loading />; 
  }

  return (
    <Router>
      <Navbar />
      <Routes>
         <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer/>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
