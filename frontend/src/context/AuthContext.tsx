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

    const logout = () => {
        setUser(null);
        setEmail(null);
        sessionStorage.removeItem("email");
    };

    return (
        <AuthContext.Provider value={{ user, email, loading, logout, setEmailInContext }}>
            {children}
        </AuthContext.Provider>
    );
};
