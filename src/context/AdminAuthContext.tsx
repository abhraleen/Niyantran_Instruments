import React, { createContext, useContext } from 'react';

interface AdminAuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    adminEmail: string;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'niyantranadmin@gmail.com';
const ADMIN_PASSWORD = 'sumanniyantran123!';
const AUTH_KEY = 'ni_admin_auth';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialise synchronously so ProtectedRoute never sees a false flash on reload
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() => {
        try { return localStorage.getItem(AUTH_KEY) === 'true'; } catch { return false; }
    });

    const login = (email: string, password: string): boolean => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem(AUTH_KEY, 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem(AUTH_KEY);
    };

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, adminEmail: ADMIN_EMAIL }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error('useAdminAuth must be used within AdminAuthProvider');
    }
    return context;
};
