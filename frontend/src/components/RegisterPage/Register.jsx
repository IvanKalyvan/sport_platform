import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password is too short");
            return;
        }

        if (password.length > 15) {
            setError("Password is too long");
            return;
        }

        setError("");

        try {
            const response = await axios.post("http://localhost:3001/auth/register", {
                email,
                password,
            });

            console.log(response);

            if (response.data.response_status === 200) {
                alert("Check your email and confirm your registration!");
            }
        } catch (err) {
            setError("Error during registration");
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.button}>
                        Register
                    </button>

                    <button type="button" className={styles.backButton} onClick={() => navigate("/")}>
                        Back to Main
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
