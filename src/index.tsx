import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/PractiseTimeTravel";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router";
import { Menu } from "./components/Menu";
import PractiseTimeTravel from "./components/PractiseTimeTravel";
import OnlineApp from "./components/OnlineApp";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/practise" element={<PractiseTimeTravel />} />
            <Route path="/online-play" element={<OnlineApp />} />
        </Routes>
    </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
