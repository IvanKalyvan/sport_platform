import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Header.styles";

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <S.Header>
            <S.Button onClick={() => navigate("/register")}>
                Signup
            </S.Button>
            <S.Button onClick={() => navigate("/login")}>
                Login
            </S.Button>
        </S.Header>
    );
};

export default Header;
