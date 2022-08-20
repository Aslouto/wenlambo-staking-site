import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Farm from "./farm/Farm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>     
      <BrowserRouter>
        <Routes>
          {/* <Route path="/farm" element={<Farm />} /> */}
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
