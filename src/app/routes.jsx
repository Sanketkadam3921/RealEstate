import { createBrowserRouter, Navigate } from "react-router-dom";

// layouts
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../components/layout/AdminLayout";

// auth
import Login from "../features/auth/Login";
import AdminLogin from "../features/auth/AdminLogin";

// guards
import AdminRoute from "../guards/AdminRoute";

// user pages
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Property from "../pages/user/Properties";
import Contact from "../pages/user/Contact";

// admin pages
import Dashboard from "../pages/admin/Dashboard";
import Properties from "../pages/admin/Properties";
import Inquiries from "../pages/admin/Inquiries";

export const router = createBrowserRouter([
  // User routes - /
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
        path: "about",
        element: <About />,
      },
      {
        path: "property",
        element: <Property />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },

  // Admin routes - /admin
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "properties",
        element: <Properties />,
      },
      {
        path: "inquiries",
        element: <Inquiries />,
      },
    ],
  },

  // Fallback
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
