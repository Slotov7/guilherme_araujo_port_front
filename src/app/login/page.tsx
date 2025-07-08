"use client";

import {useState, FormEvent, useCallback} from "react";
import {useRouter} from "next/navigation";

import Image from "next/image";
import {spaceGrotesk} from "@/app/fonts";
import { marope } from "@/app/fonts";
import { AuthAPI } from "@/services/api";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {useAuth} from "@/context/AuthContext";

export default function LoginPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null); // Para mostrar mensagens de erro
    const [loading, setLoading] = useState(false);

    const { executeRecaptcha } = useGoogleReCaptcha();
    const { login } = useAuth();


    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();

        if (!executeRecaptcha) {
            setError("O reCAPTCHA ainda não foi carregado. Tente novamente.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const recaptchaToken = await executeRecaptcha("login");
            const jwtToken = await AuthAPI.login({
                username,
                password,
                recaptchaResponse: recaptchaToken,
            });

            login(jwtToken);

        } catch (err: any) {
            console.error("Erro no login:", err);
            setError(err.response?.data || "Falha na autenticação.");
        } finally {
            setLoading(false);
        }
    }, [executeRecaptcha, username, password, login]);


    return (
        <div className="h-screen flex flex-col bg-gradient-to-b from-[#060606] to-[#2C2A2A]">
            {/* Header fixo */}
            <header className="fixed top-0 left-0 w-full bg-[#060606] px-8 py-5 shadow-lg z-50">
                <a href="/">
                    <Image
                        src="/images/logo.svg"
                        alt="Logo Guilherme Araujo"
                        width={150}
                        height={40}
                        priority
                    />
                </a>
            </header>

            <div className="h-[72px]" />

            <main className="flex-1 flex items-center justify-center overflow-auto p-4">
                <div className="w-full max-w-md bg-[#060606] bg-opacity-40 rounded-2xl shadow-lg p-8 md:p-12">
                    <h1 className={`${spaceGrotesk.className} text-3xl font-bold text-center mb-8 tracking-widest text-white`}>LOGIN</h1>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="relative flex justify-center">
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`${marope.className} w-3/4 bg-transparent border-2 border-white focus:border-blue-500 text-lg text-white py-2 px-3 outline-none transition-colors rounded-lg`}
                                placeholder="Usuário"
                                required
                            />
                        </div>
                        <div className="relative flex justify-center">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`${marope.className} w-3/4 bg-transparent border-2 border-white focus:border-blue-500 text-lg text-white py-2 px-3 outline-none transition-colors rounded-lg`}
                                placeholder="Senha"
                                required
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-1/3 bg-[#20359C] border-0 text-white text-2xl py-3 px-4 rounded-lg transition-all duration-300 disabled:bg-gray-500 text-center cursor-pointer hover:bg-gradient-to-r hover:from-[#20359C] hover:to-[#1F4E79]"
                            >
                                {loading ? "Entrando" : "Entrar"}
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </form>
                </div>
            </main>

            <div className="h-[64px]" />


            <footer className={`${marope.className} fixed bottom-0 left-0 w-full bg-[#060606] text-center p-4 text-white z-50`}>
                © 2025 Guilherme Araujo - Todos os direitos reservados.
            </footer>
        </div>
    );
}