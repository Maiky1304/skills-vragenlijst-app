import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./Welcome";
import Question from "./Question";
import Finished from "./Finished";
import store from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Welcome />} />
        <Route path="/vragen/:questionId" element={<Question />} />
        <Route path="/vragen/finished" element={<Finished />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
