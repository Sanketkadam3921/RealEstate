import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import "./providers.jsx";
import App from "./App.jsx";
import "leaflet/dist/leaflet.css";
import "../utils/leaflet.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
