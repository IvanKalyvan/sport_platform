import React, { useState, useContext, FormEvent } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import {
    Button,
    TextField,
    Container,
    Paper,
    Typography,
    Box,
    Alert,
} from "@mui/material";
import styles from "./ChangePassword.module.css";

const ChangePasswordForm: React.FC = () => {
    const navigate = useNavigate();
    const { email } = useContext(AuthContext) || {};
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [emailForReset, setEmailForReset] = useState<string>(email || "");
    const [errorMessage, setError] = useState<string>("");
    const [successMessage, setSuccess] = useState<string>("");
    const [infoMessage, setInfoMessage] = useState<string>("");

    const handleChangePassword = async (event: FormEvent) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {

            const access_token = Cookies.get("access_token");
            const response = await axios.post(
                "http://localhost:3001/auth/reset-password",
                { email: emailForReset, password: newPassword, access_token }
            );

            if (response.status === 201) {
                setError("");

                if (email) {
                    setInfoMessage("Password was changed successfully.");
                } else {
                    setInfoMessage(
                        "Please check your email for the confirmation link."
                    );
                }

                if (email) {
                    setTimeout(() => {
                        navigate("/home");
                    }, 2000);
                }
            } else {
                setError("Error while changing password");
                setSuccess("");
            }
        } catch (err: any) {

            if (err.response){

                const errorMessages = err.response.data.message || [];

                setError(errorMessages[0] || 'An error occurred');

            }

            else {

                setError("An unexpected error occurred");

            }
        }
    };

    console.log(email);

    return (
        <Container maxWidth="sm" className={styles.container}>
            <Paper elevation={3} className={styles.card}>
                <Typography
                    variant="h4"
                    component="h2"
                    align="center"
                    className={styles.title}
                >
                    Change Password
                </Typography>

                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                {successMessage && (
                    <Alert severity="success">{successMessage}</Alert>
                )}
                {infoMessage && <Alert severity="info">{infoMessage}</Alert>}

                <form onSubmit={handleChangePassword} className={styles.form}>
                    {!email && (
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={emailForReset}
                            onChange={(e) => setEmailForReset(e.target.value)}
                            margin="normal"
                            required
                        />
                    )}

                    <TextField
                        label="New Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        margin="normal"
                        required
                    />

                    <TextField
                        label="Confirm New Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        margin="normal"
                        required
                    />

                    <Box textAlign="center">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={styles.button}
                        >
                            Change Password
                        </Button>
                    </Box>
                </form>

                <Box mt={2} textAlign="center">
                    <Button
                        onClick={() => navigate(email ? "/home" : "/login")}
                        color="secondary"
                        variant="outlined"
                    >
                        {email ? "Go Home" : "Go to Login"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ChangePasswordForm;
