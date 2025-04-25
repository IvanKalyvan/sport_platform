import React, { createContext, useState, ReactNode, useContext } from "react";

interface GamerProfileProps {
    name?: string;
    age?: number;
    sex?: string;
    location?: string;
    skill_lvl?: number;
    experience?: string;
}

interface GamerProfileContextType {
    gamerData: GamerProfileProps | null;
    setGamerData: React.Dispatch<React.SetStateAction<GamerProfileProps | null>>;
}

// Set default value for the context
const GamerProfileContext = createContext<GamerProfileContextType>(null!);

interface GamerProfileProviderProps {
    children: ReactNode;
}

export const GamerProfileProvider: React.FC<GamerProfileProviderProps> = ({ children }) => {
    const [gamerData, setGamerData] = useState<GamerProfileProps | null>(null);

    return (
        <GamerProfileContext.Provider value={{ gamerData, setGamerData }}>
            {children}
        </GamerProfileContext.Provider>
    );
};

// 3) Хук — проверяем, что контекст не null, и возвращаем
export const useGamerProfile = (): GamerProfileContextType => {
    const context = useContext(GamerProfileContext);
    if (context === null) {
        throw new Error("useGamerProfile must be used within a GamerProfileProvider");
    }
    return context;
};