import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppProviders from "./AppProviders";
import "./styles/main.scss";

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);
