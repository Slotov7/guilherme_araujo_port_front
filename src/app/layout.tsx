import type { Metadata } from "next";
import "./globals.css";
import { spaceGrotesk } from "@/app/fonts";
import { marope } from "@/app/fonts";
import RecaptchaProvider from "@/components/RecaptchaProvider";
import {AuthProvider} from "@/context/AuthContext";

export const metadata: Metadata = {
    title: "Portfólio de Guilherme Araujo",
    description: "Desenvolvido com React, Next.js e Spring Boot",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en"
                className="scroll-smooth"
                suppressHydrationWarning={true}
                data-theme="dark"
        >
        <body className={`${spaceGrotesk.className} ${marope.className}`}>
        <RecaptchaProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </RecaptchaProvider>
        </body>
        </html>
    );
}