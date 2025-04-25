import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from "./ConfirmChangePassword.styles"

const ConfirmationChangePassword: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const messageFromUrl = queryParams.get('message');
        const isError = queryParams.get('error') === 'true';

        if (messageFromUrl) {
            setMessage(decodeURIComponent(messageFromUrl));
            setError(isError);
        }
    }, [location.search]);

    const handleRedirect = (goToLogin: boolean) => {
        navigate(goToLogin ? '/login' : '/');
    };

    return (
        <S.Container>
            <S.Alert className={error ? S.AlertError : S.AlertSuccess}>
                <S.AlertTitle>{error ? 'Error' : 'Success'}</S.AlertTitle>
                <S.AlertText>{message}</S.AlertText>
            </S.Alert>
            <S.ButtonsContainer>
                <S.ButtonSecondary onClick={() => handleRedirect(false)}>
                    Go to main page
                </S.ButtonSecondary>

                {!error && (
                    <S.ButtonPrimary onClick={() => handleRedirect(true)}>
                        Go to login
                    </S.ButtonPrimary>
                )}
            </S.ButtonsContainer>
        </S.Container>
    );
};

export default ConfirmationChangePassword;
