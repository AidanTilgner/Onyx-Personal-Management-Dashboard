import "./typings.d.ts";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const domContainer = document.querySelector("#root");

if (!domContainer) {
  throw new Error("No #root element found");
}

const root = createRoot(domContainer);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
