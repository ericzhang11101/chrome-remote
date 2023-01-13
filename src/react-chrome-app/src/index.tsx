import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
