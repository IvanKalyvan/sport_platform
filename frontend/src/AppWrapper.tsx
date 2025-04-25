import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { GroundManagementProvider } from "./context/GroundManagementContext";
import { GamerProfileProvider } from "./context/GamerProfileContext";
import App from "./App";

const AppWrapper: React.FC = () => {
    return (
        <AuthProvider>
            <GamerProfileProvider>
                <GroundManagementProvider>
                    <App />
                </GroundManagementProvider>
            </GamerProfileProvider>
        </AuthProvider>
    );
};

export default AppWrapper;
