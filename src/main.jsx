import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ContextShare from "./context/ContextShare.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="371843901069-03o8d9fe0n8gj20dttikurgq1i2kqooq.apps.googleusercontent.com">
        <ContextShare>
          <App />
        </ContextShare>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
