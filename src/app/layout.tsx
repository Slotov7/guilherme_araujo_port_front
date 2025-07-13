import type { Metadata } from "next";
import "./globals.css";
import { spaceGrotesk } from "@/app/fonts";
import { marope } from "@/app/fonts";
import RecaptchaProvider from "@/components/RecaptchaProvider";
import {AuthProvider} from "@/context/AuthContext";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export const metadata: Metadata = {
    title: "Guilherme Araujo",
    description: "Desenvolvido com React, Next.js, Java e Spring Boot",
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
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <RecaptchaProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </RecaptchaProvider>
        </body>
        </html>
    );
}