import React from "react";
import { useGamerProfile } from "../../context/GamerProfileContext";
import * as S from "./ProfileCard.styles"

const ProfileCard: React.FC = () => {

    const { gamerData } = useGamerProfile();

    let backgroundColor = "#fff";
    if (gamerData?.sex === "male") {
        backgroundColor = "linear-gradient(135deg, #4682b4, #5f9ea0)";
    } else if (gamerData?.sex === "female") {
        backgroundColor = "linear-gradient(135deg, #d16ba5, #ff6a88)";
    }

    return (
        <S.ProfileCard style={{ background: backgroundColor }}>
            <div className="p-4">
                <S.CardTitle>{gamerData?.name || "Без имени"}</S.CardTitle>
                <S.CardText>
                    <strong>Возраст:</strong> {gamerData?.age || "Не указан"}
                </S.CardText>
                <S.CardText>
                    <strong>Локация:</strong> {gamerData?.location || "Не указана"}
                </S.CardText>
                <S.CardText>
                    <strong>Уровень скилла:</strong> {gamerData?.skill_lvl || "Не указан"}
                </S.CardText>
                <S.CardText>
                    <strong>Опыт:</strong> {gamerData?.experience || "Не указан"}
                </S.CardText>
            </div>
        </S.ProfileCard>
    );
};

export default ProfileCard;
