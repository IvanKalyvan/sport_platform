// noinspection JSAnnotator

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
import * as S from "./Login.styles";
import { jwtDecode } from "jwt-decode";

const Login: React.FC = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const { setEmailInContext } = useContext(AuthContext);
    const { setUserTypeInContext } = useContext(AuthContext);

    useEffect(() => {
        const token = Cookies.get("access_token");
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                if (decodedToken && decodedToken.userType) {
                    setUserTypeInContext(decodedToken.userType);
                    navigate("/home");
                }
            } catch (e) {
                console.error("Invalid token", e);
            }
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(setUserTypeInContext)

        try {
            const response = await axios.post(
                "http://localhost:3001/auth/login",
                { email, password },
                { withCredentials: true }
            );

            if (response.status === 201) {
                setEmailInContext(email);

                const token = Cookies.get("access_token");
                if (token) {
                    try {
                        const decodedToken: any = jwtDecode(token);
                        if (decodedToken && decodedToken.userType) {
                            setUserTypeInContext(decodedToken.userType);
                            navigate("/home");
                        }
                    } catch (e) {
                        console.error("Invalid token", e);
                    }
                }
            }
        } catch (err: any) {
            if (err.response) {
                const errorMessages = err.response.data.message || [];
                setError(String(errorMessages) || "An error occurred");
            } else {
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

    return (
        <S.Wrapper>
            <S.Card>
                <S.Title>Login</S.Title>
                <S.Form onSubmit={handleSubmit}>
                    <S.InputGroup>
                        <S.Label htmlFor="email">Email</S.Label>
                        <S.Input
                            type="text"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </S.InputGroup>
                    <S.InputGroup>
                        <S.Label htmlFor="password">Password</S.Label>
                        <S.Input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </S.InputGroup>
                    {error && <S.Error>{error}</S.Error>}
                    <S.LoginButton onClick={handleSubmit}>
                        Login
                    </S.LoginButton>
                </S.Form>
                <S.Footer>
                    <S.ForgotPassword onClick={handleForgotPassword}>
                        Forgot password?
                    </S.ForgotPassword>
                    <S.GoHome onClick={handleGoHome}>
                        Back to Home
                    </S.GoHome>
                </S.Footer>
            </S.Card>
        </S.Wrapper>
    );
};

export default Login;
