import React, { useState, useContext, FormEvent } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import * as S from "./ChangePassword.types"

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

    return (
        <S.Container>
            <S.Card>
                <S.Title>Change Password</S.Title>

                {errorMessage && <S.Error>{errorMessage}</S.Error>}
                {successMessage && (
                    <div className="text-green-600 text-sm">{successMessage}</div>
                )}
                {infoMessage && <div className="text-blue-600 text-sm">{infoMessage}</div>}

                <S.Form onSubmit={handleChangePassword}>
                    {!email && (
                        <S.InputGroup>
                            <S.InputGroupLabel>Email</S.InputGroupLabel>
                            <S.Input
                                type="email"
                                value={emailForReset}
                                onChange={(e) => setEmailForReset(e.target.value)}
                                required
                            />
                        </S.InputGroup>
                    )}

                    <S.InputGroup>
                        <S.InputGroupLabel>New Password</S.InputGroupLabel>
                        <S.Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </S.InputGroup>

                    <S.InputGroup>
                        <S.InputGroupLabel>Confirm New Password</S.InputGroupLabel>
                        <S.Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </S.InputGroup>

                    <div className="text-center">
                        <S.Button>
                            Change Password
                        </S.Button>
                    </div>
                </S.Form>

                <div className="mt-2 text-center">
                    <S.FooterButton
                        onClick={() => navigate(email ? "/home" : "/login")}
                        className={S.FooterLink}
                    >
                        {email ? "Go Home" : "Go to Login"}
                    </S.FooterButton>
                </div>
            </S.Card>
        </S.Container>
    );
};

export default ChangePasswordForm;
