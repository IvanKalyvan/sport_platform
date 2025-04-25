// noinspection JSAnnotator

import React from "react";
import * as S from "./Header.styles";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {

        navigate("/home");

    }

    const handleBackToController = () => {

        navigate("/home/ground-control");

    }

    return (
        <S.HeaderContainer>
            <S.Title>Booking management</S.Title>
            <S.ButtonGroup>
                <S.Button onClick={handleBackToHome}>
                    Back to Home
                </S.Button>
                <S.ButtonPrimary onClick={handleBackToController}>
                    Back to Ground Controller
                </S.ButtonPrimary>
            </S.ButtonGroup>
        </S.HeaderContainer>
    );
};

export default Header;
