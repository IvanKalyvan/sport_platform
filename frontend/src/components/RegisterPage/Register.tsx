// noinspection JSAnnotator

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "./Register.styles"

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [roles, setRoles] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<number>(18);
    const [gender, setGender] = useState<string>("male");
    const [location, setLocation] = useState<string>("");
    const [skillLvl, setSkillLvl] = useState<number>(0);
    const [experience, setExperience] = useState<string>("");

    const [currentStep, setCurrentStep] = useState<number>(1);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get("http://localhost:3001/auth/user-roles");
                setRoles(response.data);
            } catch (err) {
                setError("Failed to fetch roles.");
            }
        };

        fetchRoles();
    }, []);

    const handleSubmitStep1 = async (e: FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/auth/register", {
                email,
                password,
                user_type: role,
            }, { withCredentials: true });

            if (response.status === 401) {
                setError(response.data.message);
            }

            console.log(response, role);

            if (role === "Gamer") {
                setTimeout(() => { setCurrentStep(2) }, 2000);
            } else {
                navigate("/login");
            }

        } catch (err: any) {
            if (err.response) {
                const message = err.response.data.message;
                setError(Array.isArray(message) ? message[0] : message);
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    const handleSubmitStep2 = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post("http://localhost:3001/auth/register-profile", {
                email,
                name,
                age,
                sex: gender,
                location,
                skill_lvl: skillLvl,
                experience,
            });
            alert("Your profile was updated successfully.");
            setTimeout(() => { setCurrentStep(2) }, 2000);
            navigate('/login');
        } catch (err: any) {
            if (err.response) {
                const message = err.response.data.message;
                setError(Array.isArray(message) ? message[0] : message);
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => setAge(Number(e.target.value));
    const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => setGender(e.target.value);
    const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value);
    const handleSkillLvlChange = (e: ChangeEvent<HTMLInputElement>) => setSkillLvl(Number(e.target.value));
    const handleExperienceChange = (e: ChangeEvent<HTMLTextAreaElement>) => setExperience(e.target.value);

    return (
        <S.Wrapper>
            <S.Container>
                <S.Heading>{currentStep === 1 ? "Register" : "Gamer Profile"}</S.Heading>
                <form onSubmit={currentStep === 1 ? handleSubmitStep1 : handleSubmitStep2}>
                    {currentStep === 1 && (
                        <>
                            <S.InputGroup>
                                <S.Label>Email</S.Label>
                                <S.Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </S.InputGroup>

                            <S.InputGroup>
                                <S.Label>Password</S.Label>
                                <S.Input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </S.InputGroup>

                            <S.InputGroup>
                                <S.Label>Confirm Password</S.Label>
                                <S.Input
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </S.InputGroup>

                            <S.InputGroup>
                                <S.Label>Role</S.Label>
                                <S.Select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Select Role</option>
                                    {roles.map((roleOption, index) => (
                                        <option key={index} value={roleOption}>
                                            {roleOption}
                                        </option>
                                    ))}
                                </S.Select>
                            </S.InputGroup>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <S.InputGroup>
                                <S.Label>Name</S.Label>
                                <S.Input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </S.InputGroup>

                            <S.InputGroup>
                                <S.Label>Age</S.Label>
                                <S.Input
                                    type="number"
                                    placeholder="Enter your age"
                                    value={age}
                                    onChange={handleAgeChange}
                                    min="1"
                                    step="1"
                                />
                            </S.InputGroup>

                            <S.InputGroup>
                                <S.Label>Gender</S.Label>
                                <S.Select
                                    value={gender}
                                    onChange={handleGenderChange}
                                    aria-label="Select gender"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </S.Select>
                            </S.InputGroup>

                            <S.InputGroup>
                                <S.Label>Location</S.Label>
                                <S.Input
                                    type="text"
                                    placeholder="Enter your location"
                                    value={location}
                                    onChange={handleLocationChange}
                                />
                            </S.InputGroup>

                            <S.InputGroup>
                                <S.Label>Skill Level</S.Label>
                                <S.Input
                                    type="number"
                                    placeholder="Enter your skill level"
                                    value={skillLvl}
                                    onChange={handleSkillLvlChange}
                                    min="0.01"
                                    max="10.00"
                                    step="0.01"
                                />
                            </S.InputGroup>

                            <S.InputGroup>
                                <S.Label>Experience</S.Label>
                                <textarea
                                    placeholder="Enter your experience"
                                    value={experience}
                                    onChange={handleExperienceChange}
                                    maxLength={1000}
                                    rows={4}
                                />
                            </S.InputGroup>
                        </>
                    )}

                    {error && <S.Error>{error}</S.Error>}

                    <S.Button type="submit">
                        {currentStep === 1 ? "Next" : "Finish Registration"}
                    </S.Button>
                </form>

                <S.BackButton onClick={() => navigate("/")}>Back to Main Page</S.BackButton>
            </S.Container>
        </S.Wrapper>
    );
};

export default Register;
