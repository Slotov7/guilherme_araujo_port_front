"use client";

import { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { AuthAPI } from '@/services/api';

export function useLoginForm() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { executeRecaptcha } = useGoogleReCaptcha();
    const { login } = useAuth();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setCredentials(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();
        if (!executeRecaptcha) {
            setError("O reCAPTCHA ainda não foi carregado.");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const recaptchaToken = await executeRecaptcha("login");
            const jwtToken = await AuthAPI.login({
                username: credentials.username,
                password: credentials.password,
                recaptchaResponse: recaptchaToken,
            });
            console.log("Token recebido da API:", jwtToken);
            login(jwtToken);
        } catch (err: any) {
            setError(err.response?.data?.message || "Credenciais inválidas.");
        } finally {
            setLoading(false);
        }
    }, [executeRecaptcha, credentials, login]);

    return {
        credentials,
        error,
        loading,
        handleChange,
        handleSubmit,
    };
}