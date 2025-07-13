"use client";

import { marope, spaceGrotesk } from "@/app/fonts";
import { useLoginForm } from '@/hooks/useLoginForm'; // 1. Importe o hook
import FormButton from "@/components/FormButton";
import React from "react";

export default function FormLogin() {
    const {
        credentials,
        error,
        loading,
        handleChange,
        handleSubmit,
    } = useLoginForm();

    if (!credentials) {
        return (
            <div className="w-full max-w-md bg-[#060606] bg-opacity-40 rounded-2xl shadow-lg p-10 md:p-16">
                <div className="text-red-400 text-center">Erro ao carregar formulário</div>
            </div>
        );
    }


    return(
        <div className="w-full max-w-md bg-[#060606] bg-opacity-40 rounded-2xl shadow-lg p-10 md:p-16">
            <h1 className={`${spaceGrotesk.className} text-4xl font-bold text-center mb-10 tracking-widest text-white`}>LOGIN</h1>
            <form onSubmit= {handleSubmit} className="space-y-10">
                <label htmlFor="username" className="sr-only">Usuário</label>
                <div className="relative flex justify-center">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        autoComplete="on"
                        value={credentials.username || ''}
                        onChange={handleChange}
                        className={`${marope.className} w-full bg-transparent border-2 border-white focus:border-blue-500 text-lg text-white py-4 px-4 outline-none transition-colors rounded-lg`}
                        placeholder="Usuário"
                        required
                    />
                </div>
                <div className="relative flex justify-center">
                    <label htmlFor="password" className="sr-only">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        value={credentials.password || ''}
                        onChange={handleChange}
                        className={`${marope.className} w-full bg-transparent border-2 border-white focus:border-blue-500 text-lg text-white py-4 px-4 outline-none transition-colors rounded-lg`}
                        placeholder="Senha"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <FormButton
                        text={loading ? "Entrando..." : "Entrar"}
                        type="submit"
                        disabled={loading}
                        color="blue"
                    />
                </div>
                {error && (
                    <div role="alert" className="text-red-500 text-center bg-red-900 bg-opacity-20 p-2 rounded">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}