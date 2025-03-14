import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/LoginPage/Login";
import Register from "./components/RegisterPage/Register";
import Home from "./components/HomePage/Home";
import Main from "./components/MainPage/Main";
import ConfirmEmail from "./components/ConfirmEmailPage/ConfirmEmail";
import ChangePasswordForm from "./components/ChangePasswodPage/ChangePassword";
import ConfirmationChangePassword from "./components/ConfirmChangePasswordPage/ConfirmChangePassword";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Main />} />
            <Route path="/confirm-email" element={<ConfirmEmail />} />
            <Route path="/change-password" element={<ChangePasswordForm />} />
            <Route path="/reset-password" element={<ConfirmationChangePassword />} />
        </Routes>
    );
};

export default App;
