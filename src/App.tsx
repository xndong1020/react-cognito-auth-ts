import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ForgotPasswordVerification from "./components/auth/ForgotPasswordVerification";
import ChangePassword from "./components/auth/ChangePassword";
import ChangePasswordConfirm from "./components/auth/ChangePasswordConfirm";
import Welcome from "./components/auth/Welcome";
import Footer from "./components/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(faEdit);

const App = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            {/* <Route path="/admin" element={<ProductAdmin />} /> */}
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/forgotpasswordverification"
              element={<ForgotPasswordVerification />}
            />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route
              path="/changepasswordconfirmation"
              element={<ChangePasswordConfirm />}
            />
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
