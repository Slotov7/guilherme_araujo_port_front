"use client";

import { useState, FormEvent, ChangeEvent } from 'react';
import { ContactAPI } from '@/services/api';

declare global {
    interface Window {
        grecaptcha: any;
    }
}

export function useContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''

    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setResponseMessage('');
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

        try {

            if (!window.grecaptcha) {
                throw new Error("reCAPTCHA não carregado");
            }
            const token = await window.grecaptcha.execute(siteKey, { action: "contact" });
            await ContactAPI.sendContactEmail({ ...formData, recaptchaResponse: token });

            setStatus('success');
            setResponseMessage('Mensagem enviada com sucesso! Obrigado.');
            setFormData({ firstName: '', lastName: '', phone: '', email: '', message: '' }); // Limpa o formulário
        } catch (error) {
            setStatus('error');
            setResponseMessage('Falha ao enviar a mensagem. Tente novamente.');
            console.error("Erro no formulário de contato:", error);
        }
    };

    return { formData, status, responseMessage, handleChange, handleSubmit };
}