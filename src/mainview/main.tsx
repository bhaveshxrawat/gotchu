import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "sonner";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <StrictMode>
    <App />
    <Toaster visibleToasts={2} position="top-right" />
  </StrictMode>,
);
