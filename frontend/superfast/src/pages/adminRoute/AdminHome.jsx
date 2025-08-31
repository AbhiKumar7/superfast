// import React, { useState } from "react";
// import AdminSideBar from "../../components/adminDashBoard/AdminSideBar";
// import { Outlet, useNavigate } from "react-router-dom";
// import { FaBars } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { logoutAPi } from "../../apiMiddleware/AuthMiddleware";


// function AdminHome() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logoutAPi()).then((data) => {
//       console.log(data);
      
//       if (data.payload?.status) {
//         navigate("/");
//       }
//     });
//   };

//   return (
//     <div className="h-screen bg-gray-100 flex flex-col md:flex-row relative">
//       {/* Top bar with menu button on mobile */}
//       <div className="md:hidden p-4 bg-red-600 text-white flex justify-between items-center">
//         <h1 className="text-xl font-bold">Admin Panel</h1>
//         <button onClick={handleLogout} className="bg-white text-red-600 px-3 py-1 rounded font-semibold text-sm">
//           Logout
//         </button>
//         <button onClick={() => setSidebarOpen(true)} className="text-2xl">
//           <FaBars />
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed md:static top-0 left-0 z-50 h-full w-3/4 md:w-1/4 bg-red-700 shadow-lg transition-transform duration-300 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0`}
//       >
//         {/* Close button for mobile */}
//         <div className="md:hidden p-4 text-right">
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="text-white text-xl font-bold"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Sidebar Component */}
//         <AdminSideBar onClose={() => setSidebarOpen(false)} handleLogout={handleLogout} />
//       </div>

//       {/* Content */}
//       <div className="w-full md:w-3/4 p-4 overflow-y-auto mt-4 md:mt-0">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default AdminHome;
