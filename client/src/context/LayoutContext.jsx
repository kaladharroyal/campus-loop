import React, { createContext, useState, useContext } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);

    return (
        <LayoutContext.Provider value={{ isSidebarHidden, setIsSidebarHidden }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
};
