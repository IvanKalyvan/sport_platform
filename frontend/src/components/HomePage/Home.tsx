// noinspection JSAnnotator

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "./Home.styles";
import { AuthContext } from "../../context/AuthContext";
import Header from "./Header";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const response = await axios.get("http://localhost:3001/home", { withCredentials: true });
                setMessage(response.data.message);
            } catch (err) {
                setError("Unauthorized, please log in.");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        checkAuthorization();
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleResetPassword = () => {
        navigate("/change-password");
    };

    return (
        <>

            <Header />

            <S.HomeContainer>

                {loading ? (
                    <S.SpinnerContainer>
                        <S.Spinner/>
                        <span className="ms-2">Loading...</span>
                    </S.SpinnerContainer>
                ) : (
                    <>
                        {error && <S.Alert>{error}</S.Alert>}
                        <S.Card>
                            <S.Card>
                                <S.CardTitle>Welcome to Your Dashboard!</S.CardTitle>
                                <p className={S.CardText}>
                                    {message || "Here is your personalized dashboard where you can manage your settings and profile."}
                                </p>

                                <div className="d-flex gap-3 justify-content-center">
                                    <S.Button variant="primary" onClick={handleLogout}>
                                        Logout
                                    </S.Button>
                                    <S.Button variant="secondary" onClick={handleResetPassword}>
                                        Reset Password
                                    </S.Button>
                                </div>
                            </S.Card>
                        </S.Card>
                    </>
                )}
            </S.HomeContainer>
        </>
    );
};

export default Home;
