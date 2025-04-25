import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./ConfirmEmail.styles"

const ConfirmEmail = () => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const messageFromUrl = queryParams.get("message");
        const isError = queryParams.get("error") === "true";

        if (messageFromUrl) {
            setMessage(decodeURIComponent(messageFromUrl));
            setError(isError);
        }
    }, [location.search]);

    const handleRedirect = (goToLogin: boolean = false): void => {
        navigate(goToLogin ? "/login" : "/");
    };

    return (
        <S.Wrapper>
            <S.Card className={error ? S.Error : S.Success}>
                <h1>{error ? "Error" : "Congratulations!"}</h1>
                <p>{message}</p>
                <div className={S.Buttons}>
                    <S.BackButton onClick={() => handleRedirect(false)}>
                        Go to Main Page
                    </S.BackButton>
                    {!error && (
                        <S.LoginButton onClick={() => handleRedirect(true)}>
                            Go to Login
                        </S.LoginButton>
                    )}
                </div>
            </S.Card>
        </S.Wrapper>
    );
};

export default ConfirmEmail;
