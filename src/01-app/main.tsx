import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { AppProviders } from "./providers";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders />

    <ToastContainer
      position="top-right"
      autoClose={2000}
      style={{
        fontSize: "0.9rem",
        lineHeight: "120%",
      }}
    />
  </StrictMode>,
);
