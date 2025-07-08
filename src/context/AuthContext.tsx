"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {useRouter} from "next/navigation";

interface  AuthContext {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({children} : { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = (token: string) => {
        setToken(token);
        localStorage.setItem('authToken', token);
        router.push('/dashboard');
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('authToken');
        router.push('/login');
    };

    const isAuthenticated = !!token;

    return(
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}