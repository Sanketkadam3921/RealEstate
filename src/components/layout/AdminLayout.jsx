import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  const handleResize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    if (!mobile) setSidebarOpen(true); // always open on desktop
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#F6F8FA",
        overflow: "hidden",
      }}
    >
      {/* SIDEBAR - onClose accepts true/false to set sidebar open state */}
      <AdminSidebar isOpen={sidebarOpen} onClose={setSidebarOpen} />

      {/* RIGHT SECTION */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* NAVBAR */}
        <AdminNavbar onToggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />

        {/* PAGE CONTENT */}
        <div
          style={{
            flex: 1,
            padding: "16px 16px",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
