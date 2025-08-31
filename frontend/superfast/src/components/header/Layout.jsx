import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer sticks to bottom */}
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
