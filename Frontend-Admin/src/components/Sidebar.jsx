import React, { useContext, useState } from "react";
import { Context } from "../main";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const gotoHome = () => {
    navigateTo("/dashboard");
    setShow(false);
  };

  const gotoDoctors = () => {
    navigateTo("/doctors");
    setShow(false);
  };

  const gotoMessages = () => {
    navigateTo("/messages");
    setShow(false);
  };

  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(false);
  };

  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(false);
  };

  // ✅ Updated Logout handler
  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setIsAuthenticated(false);
    setShow(false); // ✅ Auto-close sidebar on logout
    navigateTo("/"); // ✅ Redirect to landing page
  };

  // ✅ Hide sidebar and hamburger before login
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <nav className={show ? "show sidebar" : "sidebar"}>
        <div className="links">
          <TiHome onClick={gotoHome} />
          <FaUserDoctor onClick={gotoDoctors} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <IoPersonAddSharp onClick={gotoAddNewDoctor} />
          <AiFillMessage onClick={gotoMessages} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>

      <div className="wrapper">
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setShow(!show)}
        />
      </div>
    </>
  );
};

export default Sidebar;
