import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/about.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "./styles/academics.css";
import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/features.css";
import "./styles/animations.css";
import "./styles/whychoose.css";
import "./styles/facilities.css";
import "./styles/admissions.css";
import "./styles/comingsoon.css";
import "./styles/contact.css";






ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
