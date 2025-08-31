import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

import { logoutAPi } from "../../apiMiddleware/AuthMiddleware";
import { useNavigate } from "react-router-dom";

function UserMenu() {
 


  const [sidebar, setSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      {/* User Icon */}
      <div
        onClick={() => {
          if (window.innerWidth < 768) {
            // Mobile - open sidebar
            setSidebar(true);
          } else {
            // Desktop - toggle dropdown
            setDropdownOpen((prev) => !prev);
          }
        }}
        className="text-2xl bg-red-400 rounded-full p-2 cursor-pointer"
      >
        <FaUser />
      </div>

      {/* Dropdown Menu - Desktop Only */}
      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white shadow-md rounded-md w-40 p-2 z-50 hidden md:block">
          <button className="w-full text-left px-2 py-1 hover:bg-gray-100">
            My Orders
          </button>
          <button className="w-full text-left px-2 py-1 hover:bg-gray-100">
            Wishlist
          </button>
          <button className="w-full text-left px-2 py-1 hover:bg-gray-100">
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-2 py-1 hover:bg-gray-100 text-red-500"
          >
            Logout
          </button>
        </div>
      )}

      {/* Sidebar - Mobile Only */}
      {sidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 flex justify-end md:hidden"
          onClick={() => setSidebar(false)}
        >
          <div
            className="w-3/4 sm:w-1/2 bg-white h-full p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-right">
              <button
                onClick={() => setSidebar(false)}
                className="text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <p className="border-b pb-2">My Orders</p>
              <p className="border-b pb-2">Wishlist</p>
              <p className="border-b pb-2">Profile</p>
              <p className="border-b pb-2 text-red-500" onClick={handleLogout}>
                Logout
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
