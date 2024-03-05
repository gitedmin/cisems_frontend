import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"
import Register from "./components/Register";
import LoginPage from "./components/LoginPage";
import { Dashboard } from "@mui/icons-material";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <Routes>
      <Route path="/"  element = {<LoginPage />}/>
      <Route path="/dashboard"  element = {<App />}/>

      <Route path="/register"  element = {<Register />}/>
      
     </Routes>
    </BrowserRouter>
  </React.StrictMode>
);