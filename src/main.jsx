import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import ExchangeCenter from "./pages/ExchangeCenter/ExchangeCenter";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ExchangeCenter />
  </React.StrictMode>
);