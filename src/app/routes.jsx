// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";

// layouts
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

// pages
import Login from "../features/auth/Login";
import Home from "../pages/user/Home";
import Dashboard from "../pages/admin/Dashboard";
import AboutHero from "../features/about/HeroSection";
import About from "../pages/user/About";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
