import React from 'react';
import { AuthProvider } from './context/AuthContext';
import App from './App';

const AppWrapper = () => {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
};

export default AppWrapper;
