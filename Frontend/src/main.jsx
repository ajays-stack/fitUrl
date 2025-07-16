import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Context from "./context/context.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context>
      <App />
    </Context>
  </StrictMode>
);
