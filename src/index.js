import React from "react";
import  ReactDOM  from "react-dom/client";
import App from "./App"
import { BrowserRouter } from "react-router-dom";

import "./global.css";

let div = document.getElementById("root");
let rootElement = ReactDOM.createRoot(div);
rootElement.render(
  <BrowserRouter>
  <App></App>
  </BrowserRouter>
);