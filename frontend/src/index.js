import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppointmentsContextProvider } from "./context/AppointmentsContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppointmentsContextProvider>
        <App />
      </AppointmentsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
