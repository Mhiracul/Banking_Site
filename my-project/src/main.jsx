import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./redux/index";
import { Provider } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </React.StrictMode>
);
