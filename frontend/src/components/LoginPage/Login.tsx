import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Login.module.css";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const { setEmailInContext } = useContext(AuthContext);

    useEffect(() => {
        const token = Cookies.get("access_token");
        if (token) {
            navigate("/home");
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3001/auth/login",
                { email, password },
                { withCredentials: true }
            );

            if (response.status === 201) {
                setEmailInContext(email);
                navigate("/home");
            }
        } catch (err: any) {

            if (err.response){

                const errorMessages = err.response.data.message || [];

                setError(String(errorMessages) || 'An error occurred');

            }

            else {

                setError("An unexpected error occurred");

            }
        }
    };

    const handleForgotPassword = () => {
        navigate("/change-password");
    };

    const handleGoHome = () => {
        navigate("/");
    };

    console.log(error);

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h2 className={styles.title}>Login</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.loginButton}>
                        Login
                    </button>
                </form>
                <div className={styles.footer}>
                    <button className={styles.forgotPassword} onClick={handleForgotPassword}>
                        Forgot password?
                    </button>
                    <button className={styles.goHome} onClick={handleGoHome}>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
