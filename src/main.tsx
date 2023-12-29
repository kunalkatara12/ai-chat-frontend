import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';
axios.defaults.baseURL = "http://localhost:1209/api/v1/";
axios.defaults.withCredentials = true;
const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab,serif",
    allVariants: {
      color: "white",
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* @ts-ignore */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Toaster position="top-center" />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
