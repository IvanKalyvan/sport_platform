import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Header.styles";
import { AuthContext } from "../../context/AuthContext";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { userType } = useContext(AuthContext);

    const handleGoToProfile = () => {
        navigate("/home/profile");
    };

    const handleGoToGroundControl = () => {
        navigate("/home/ground-control");
    }

    return (
        <header>
            <S.NavbarContainer>
                <S.NavbarInnerContainer>
                    <S.NavbarBrand>Dashboard</S.NavbarBrand>
                    {userType === "Gamer" && (
                        <S.NavbarButton onClick={handleGoToProfile}>
                            Open Profile
                        </S.NavbarButton>
                    )}
                    {userType === "Organazer" && (
                        <S.NavbarButton onClick={handleGoToProfile}>
                            Tournament Management
                        </S.NavbarButton>
                    )}
                    {userType === "GroundOwner" && (
                        <S.NavbarButton onClick={handleGoToGroundControl}>
                            Ground Management
                        </S.NavbarButton>
                    )}
                </S.NavbarInnerContainer>
            </S.NavbarContainer>
        </header>
    );
};

export default Header;
