import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/authContext";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./contexts/AppContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <App />
      </AppProvider>
      <Toaster position="top-right" />
    </AuthProvider>
  </React.StrictMode>
);
