import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
);

reportWebVitals();
