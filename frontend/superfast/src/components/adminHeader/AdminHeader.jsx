import React from "react";
import { logoutAPi } from "../../apiMiddleware/AuthMiddleware";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAPi()).then((data) => {
      navigate("/", { replace: true });
    });
  };

  return (
    <header className="bg-red-600 text-white px-4 py-3 shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Logo / Title */}
        <h1 className="text-xl font-bold">Admin Panel</h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex gap-4 text-sm sm:text-base font-medium">
            <li>
              <NavLink
                to="/admin/category"
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-4 text-white"
                    : "hover:underline hover:text-gray-100"
                }
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/subcategory"
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-4 text-white"
                    : "hover:underline hover:text-gray-100"
                }
              >
                Sub Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/product"
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-4 text-white"
                    : "hover:underline hover:text-gray-100"
                }
              >
                Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-4 text-white"
                    : "hover:underline hover:text-gray-100"
                }
              >
                Orders
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-white text-red-700 px-4 py-1 rounded hover:bg-red-100 font-semibold text-sm sm:text-base"
          type="button"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
