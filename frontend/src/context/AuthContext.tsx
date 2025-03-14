import React, { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface User {
    exp?: number;
    iat?: number;
    sub?: string;
    token: string;
}

interface AuthContextType {
    user: User | null;
    email: string | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    setEmailInContext: (email: string) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        if (storedEmail) {
            setEmail(storedEmail);
        }

        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode<User>(token);
                setUser({ ...decoded, token });
            } catch (error) {
                console.error("Token decoding failed:", error);
            }
        }
        setLoading(false);
    }, []);

    const setEmailInContext = (email: string) => {
        setEmail(email);
        sessionStorage.setItem("email", email);
    };

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post<{ token: string; email: string }>("auth/login", { username, password });
            const { token, email: userEmail } = response.data;
            localStorage.setItem("token", token);
            sessionStorage.setItem("email", userEmail);
            const decoded = jwtDecode<User>(token);
            setUser({ ...decoded, token });
            setEmail(userEmail);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("email");
        setUser(null);
        setEmail(null);
    };

    return (
        <AuthContext.Provider value={{ user, email, loading, login, logout, setEmailInContext }}>
            {children}
        </AuthContext.Provider>
    );
};
