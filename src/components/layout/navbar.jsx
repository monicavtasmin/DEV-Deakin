import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import NotificationIcon from "../../assets/notification.svg";
import Notification from "../notification";
import { useNavigate } from "react-router-dom";
import Menu from "../../assets/menu.svg";
import Close from "../../assets/close.svg";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const [notificationActive, setNotificationActive] = useState(false);
  const signoutHandler = (e) => {
    localStorage.clear("deakintoken");
    navigate("/login");
  };
  return (
    <div className="flex p-5 bg-black justify-between text-white items-center">
      <div className="flex items-center space-x-5">
        <img className="w-auto h-[4rem]" src={Logo} alt="" />
        <div>DEV@Deakin</div>
      </div>
      <div className="items-center space-x-5 hidden lg:flex">
        <div className="relative text-black">
          <img
            className="h-[1.5rem] w-auto cursor-pointer"
            onClick={() => setNotificationActive(!notificationActive)}
            src={NotificationIcon}
            alt=""
          />
          <div
            className={`${
              notificationActive ? "" : "hidden"
            } transition-all absolute z-[9999] top-[150%] right-0 p-5 border bg-white drop-shadow-md w-[20rem] max-h-[30rem] overflow-y-auto`}
          >
            <div className="font-medium text-[1.25rem]">Notifications</div>
            <Notification />
          </div>
        </div>
        <Link to="/">Home</Link>
        <Link to="/post">Post</Link>
        <Link to="/plan">Plan</Link>
        <Link to="/help">Help</Link>
        <div
          onClick={() => signoutHandler()}
          className="bg-primary text-white p-2 hover:brightness-110 cursor-pointer"
        >
          Sign Out
        </div>
      </div>

      {/* Mobile Menu  */}
      <div className="flex items-center space-x-5 lg:hidden">
        <div className="relative text-black">
          <img
            className="h-[1.5rem] w-auto cursor-pointer"
            onClick={() => setNotificationActive(!notificationActive)}
            src={NotificationIcon}
            alt=""
          />
          <div
            className={`${
              notificationActive ? "" : "hidden"
            } transition-all absolute z-[9999] top-[150%] right-0 p-5 border bg-white drop-shadow-md w-[20rem] max-h-[30rem] overflow-y-auto`}
          >
            <div className="font-medium text-[1.25rem]">Notifications</div>
            <Notification />
          </div>
        </div>
        <img
          onClick={() => setMobileMenu(true)}
          className="h-[2rem] w-auto"
          src={Menu}
          alt=""
        />
      </div>

      {/* Mobile Navigation  */}
      <div
        className={`${
          mobileMenu ? "translate-y-0" : "translate-y-[100%]"
        } transition-all text-[1.5rem] fixed top-0 left-0 w-full h-screen bg-black z-[9999999999999999] flex items-center flex-col space-y-5 justify-center`}
      >
        <img
          className="absolute right-[2%] top-[2%] w-auto h-[2rem]"
          onClick={() => setMobileMenu(false)}
          alt=""
          src={Close}
        />
        <Link onClick={() => setMobileMenu(false)} to="/">
          Home
        </Link>
        <Link onClick={() => setMobileMenu(false)} to="/post">
          Post
        </Link>
        <Link onClick={() => setMobileMenu(false)} to="/plan">
          Plan
        </Link>
        <Link onClick={() => setMobileMenu(false)} to="/help">
          Help
        </Link>
        <div
          onClick={() => signoutHandler()}
          className="bg-primary text-white p-2 hover:brightness-110 cursor-pointer"
        >
          Sign Out
        </div>
      </div>
    </div>
  );
}

export default Navbar;
