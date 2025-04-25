// noinspection JSAnnotator

import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import { useGamerProfile } from "../../context/GamerProfileContext";
import { AuthContext } from "../../context/AuthContext";
import * as S from "./GameProfile.styles"
import axios from "axios";
import ProfileCard from "./ProfileCard";

const GamerProfile: React.FC = () => {
    const { email } = useContext(AuthContext);
    const { setGamerData } = useGamerProfile();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchGamerProfile = async () => {
            try {

                const response = await axios.post("http://localhost:3001/home/gamer-profile", { email }, { withCredentials: true });

                const gamerProfile = response.data.gamerProfile;

                setGamerData({
                    name: gamerProfile.name,
                    age: gamerProfile.age,
                    sex: gamerProfile.sex === "m" ? "male" : "female",
                    location: gamerProfile.location,
                    skill_lvl: gamerProfile.skill_lvl,
                    experience: gamerProfile.experience,
                });

            } catch (err: any) {

                setError("Не удалось загрузить профиль.");

            } finally {
                setLoading(false);
            }
        };

        fetchGamerProfile();
    }, [email, setGamerData]);

    return (
        <>
            <Header />
            <S.Container>
                <S.Row>
                    <S.Col>
                        {loading ? (
                            <div className="text-center mt-5">
                                <S.Spinner />
                                <span className="ms-2">Загрузка профиля...</span>
                            </div>
                        ) : error ? (
                            <div className="text-center mt-5 text-red-500">{error}</div>
                        ) : (
                            <ProfileCard />
                        )}
                    </S.Col>
                </S.Row>
            </S.Container>
        </>
    );
};

export default GamerProfile;
