import React, { createContext, useState, useEffect, useCallback, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface User {
    username?: string;
    exp?: number;
    iat?: number;
    sub?: string;
    token: string;
    userType?: string;
}

interface AuthContextType {
    user: User | null;
    email: string | null;
    userType: string | null;
    loading: boolean;
    logout: () => void;
    setEmailInContext: (email: string) => void;
    setUserTypeInContext: (userType: string) => void;
    updateUserFromToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

interface AuthProviderProps {
    children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState<string | null>(() => localStorage.getItem("email"));
    const [userType, setUserType] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = Cookies.get("access_token");
        if (token) {
            updateUserFromToken(token);
        }
        setLoading(false);
    }, []);

    const updateUserFromToken = useCallback((token: string) => {
        try {
            const decoded = jwtDecode<User>(token);
            setUser({ ...decoded, token });

            if (decoded.username) {
                setEmail(decoded.username);
                localStorage.setItem("email", decoded.username);
            }

            if (decoded.userType) setUserType(decoded.userType);
        } catch (error) {
            console.error("Ошибка декодирования токена:", error);
        }
    }, []);

    const setEmailInContext = useCallback((email: string) => {
        setEmail(email);
        localStorage.setItem("email", email);
    }, []);

    const setUserTypeInContext = useCallback((userType: string) => setUserType(userType), []);

    const logout = () => {
        setUser(null);
        setEmail(null);
        setUserType(null);
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        localStorage.removeItem("email");
    };

    return (
        <AuthContext.Provider value={{ user, email, userType, loading, logout, setEmailInContext, setUserTypeInContext, updateUserFromToken }}>
            {children}
        </AuthContext.Provider>
    );
};