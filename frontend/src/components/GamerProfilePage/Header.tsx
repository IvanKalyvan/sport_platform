import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Header.styles";

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <S.Header>
            <div className="max-w-full mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div>
                        <S.Title>Gamer's Profile</S.Title>
                    </div>
                    <div>
                        <S.Button onClick={() => navigate("/home")}>
                            Go Home
                        </S.Button>
                    </div>
                </div>
            </div>
        </S.Header>
    );
};

export default Header;
