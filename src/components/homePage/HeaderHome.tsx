"use client";

import Image from "next/image";
import Link from 'next/link';
import { marope } from "@/app/fonts";


export default function HeaderHome() {
    const navLinks = [
        { href: "#projetos", label: "Projetos" },
        { href: "#tecnologias", label: "Tecnologias" },
        { href: "#sobre", label: "Sobre" },
        { href: "#contato", label: "Contato" },
    ];

    return (
        <header className="fixed w-full top-0 z-50 bg-[#060606] backdrop-blur-lg">
            <div className={`${marope.className} container mx-auto px-6 py-5 flex items-center justify-between`}>
                <a href="#hero">
                    <Image src="/images/logo.svg" alt="Logo Guilherme Araújo" width={150} height={40} priority />
                </a>
                <nav className="hidden md:flex items-center gap-4">
                    {navLinks.map((link, index) => (
                        <div key={link.href} className="flex items-center gap-4 ">
                            <Link href={link.href} className="text-[#F1F1F1] text-lg hover:text-[#A3A3A3] transition-colors no-underline">
                                {link.label}
                            </Link>
                            {index < navLinks.length - 1 && (
                                <span className="text-white text-3xl font-light select-none">|</span>
                            )}
                        </div>
                    ))}
                </nav>
                <a href="/cv/Curriculo_Guilherme_Araújo.pdf"
                   target="_blank"
                   rel="noopener noreferrer"
                   download="Curriculo_Guilherme_Araujo.pdf"
                   className="bg-transparent hover:bg-[#2C2A2A] border-solid border-2 border-white text-white font-semibold py-2 px-5 rounded-full flex items-center gap-2 cursor-pointer no-underline">
                    <Image src="/images/cv.svg" alt="CV" width={16} height={16}/>
                    <span>Veja meu CV</span>
                </a>

            </div>
        </header>
    );
}