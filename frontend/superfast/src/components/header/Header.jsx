import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Search from "./search/Search";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import Location from "../location/Location";
import { logoutAPi } from "../../apiMiddleware/AuthMiddleware";
import Cart from "./Cart";
import CartPage from "./CartDetails";

import MyOrder from "../../pages/MyOrder";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebar, setsidebar] = useState(false);
  const [ShowCartDetails, setShowCartDetails] = useState(false);
  const handleLogout = () => {
    dispatch(logoutAPi()).then((data) => {
     

      navigate("/");
    });
  };
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {/* Desktop & Tablet Header */}
      <div className="p-4 shadow-md fixed top-0 left-0 right-0 bg-white z-50 ">
        <div className="  flex justify-between  items-center gap-4">
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <h1>SuperFast</h1>
          </div>
          <Location />
          {/* Search for md and up */}
          <div className="hidden md:block w-100 ">
            <Search />
          </div>
          {!isAuthenticated ? (
            <div
              onClick={() => navigate("/register")}
              className="text-xl cursor-pointer "
            >
              Login
            </div>
          ) : (
            <div className="cursor-pointer" onClick={handleLogout}>
              Logout
            </div>
          )}
          {/* User Icon */}

          {isAuthenticated && (
            <button
              onClick={() => navigate("/showorders")}
              className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              My Orders
            </button>
          )}
          <div
            onClick={() => {
              if (isAuthenticated) {
                setShowCartDetails(true);
              } else {
                navigate("/login");
              }
            }}
          >
            <Cart />
          </div>
        </div>
      </div>

      {ShowCartDetails && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <CartPage onClose={() => setShowCartDetails(false)} />
        </div>
      )}
    </>
  );
}

export default Header;
