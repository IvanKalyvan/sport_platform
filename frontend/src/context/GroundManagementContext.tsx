// noinspection JSAnnotator

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GroundManagementContextType {
    isElementDelete: boolean;
    isFormVisibleInsert: boolean;
    isFormVisibleUpdate: boolean;
    objectId: number;
    groundType: string;
    elementDelete: () => void;
    elementNotDelete: () => void;
    showFormInsert: () => void;
    hideFormInsert: () => void;
    showFormUpdate: () => void;
    hideFormUpdate: () => void;
    setObjectType: (type_name: string) => void;
    setObjectId: (id: number) => void;
}

const GroundManagementContext = createContext<GroundManagementContextType | undefined>(undefined);

interface GroundManagementProviderProps {
    children: ReactNode;
}

export const GroundManagementProvider: React.FC<GroundManagementProviderProps> = ({ children }) => {
    const [isFormVisibleInsert, setIsFormVisibleInsert] = useState(false);
    const [isFormVisibleUpdate, setIsFormVisibleUpdate] = useState(false);
    const [isElementDelete, setElementDelete] = useState(false);
    const [groundType, setGroundType] = useState<string>("");
    const [objectId, setElementId] = useState<number>(0);

    const showFormInsert = () => setIsFormVisibleInsert(true);
    const hideFormInsert = () => setIsFormVisibleInsert(false);
    const showFormUpdate = () => setIsFormVisibleUpdate(true);
    const hideFormUpdate = () => setIsFormVisibleUpdate(false);

    const elementDelete = () => setElementDelete(true);
    const elementNotDelete = () => setElementDelete(false);

    const setObjectType = (type_name: string) => setGroundType(type_name || "");
    const setObjectId = (id: number) => setElementId(id || 0);

    return (
        <GroundManagementContext.Provider value={{
            isElementDelete,
            isFormVisibleInsert,
            isFormVisibleUpdate,
            objectId,
            groundType,
            elementDelete,
            elementNotDelete,
            showFormInsert,
            hideFormInsert,
            showFormUpdate,
            hideFormUpdate,
            setObjectType,
            setObjectId
        }}>
            {children}
        </GroundManagementContext.Provider>
    );
};

export const useGroundManagement = (): GroundManagementContextType => {
    const context = useContext(GroundManagementContext);
    if (!context) {
        throw new Error("useGroundManagement must be used within a GroundManagementProvider");
    }
    return context;
};
