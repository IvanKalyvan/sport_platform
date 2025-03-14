import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }

        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({ ...decoded, token });
            } catch (error) {
                console.error('Token decoding failed:', error);
            }
        }
        setLoading(false);
    }, []);

    const setEmailInContext = (email) => {
        setEmail(email);
        sessionStorage.setItem('email', email);
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post('auth/login', { username, password });
            const { token, email: userEmail } = response.data;
            localStorage.setItem('token', token);
            sessionStorage.setItem('email', userEmail);
            const decoded = jwtDecode(token);
            setUser({ ...decoded, token });
            setEmail(userEmail);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        sessionStorage.removeItem('email');
        setUser(null);
        setEmail(null);
    };

    return (
        <AuthContext.Provider value={{ user, email, loading, login, logout, setEmailInContext }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
