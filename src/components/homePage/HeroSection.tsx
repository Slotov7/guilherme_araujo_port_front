import Image from 'next/image';
import { spaceGrotesk } from '@/app/fonts';
import Link from "next/link";

export default function HeroSection() {
    return (
        <section id="hero" className="grid grid-cols-2 max-lg:grid-cols-1 container mx-auto px-6 items-center gap-8 h-screen">
            <div className={`${spaceGrotesk.className} container px-6 py-0 flex flex-col items-start justify-center text-center h-full box-border`}>
                <div className="flex flex-col items-start justify-center h-full gap-4" >
                    <h1 className="text-6xl md:text-7xl font-bold text-left w-full m-0 max-lg:text-center max-sm:text-6xl">Guilherme Araújo</h1>
                    <div className="flex flex-col gap-1 max-lg:gap-2">
                        <p className="text-2xl m-0 text-left max-lg:text-center">Sou desenvolvedor backend e designer UI/UX.</p>
                        <p className="text-2xl m-0 text-left max-lg:text-center">Crio soluções completas: do código robusto à interface intuitiva.</p>
                        <p className="text-2xl m-0 text-left max-lg:text-center">Aqui você encontra meus projetos, habilidades e formas de contato.</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt max-lg:text-center ">

                        <a href="/cv/Curriculo_Guilherme_Araújo.pdf"
                           target="_blank"
                           rel="noopener noreferrer"
                           download="Curriculo_Guilherme_Araujo.pdf"
                           className="text-white font-semibold py-4 px-6 rounded-md no-underline hover:bg-blue-700 transition-colors flex items-center gap-4 bg-blue-600">
                            <Image src="/images/cv.svg" alt="CV" width={24} height={24}/>
                            <span className="text-xl">Veja meu CV</span>
                        </a>

                        <Link href="#projetos"
                              className="text-white font-semibold py-4 px-6 rounded-md no-underline hover:bg-blue-700 transition-colors flex items-center gap-4 bg-blue-600">
                            <Image src="/images/project.svg" alt="project" width={26} height={26}/>
                            <span className="text-xl">Veja meus projetos</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="h-full box-border items-center justify-center max-lg:hidden flex">
                <Image src="/images/foto.png" alt="Foto de Guilherme Araújo" width={550} height={550} className="shadow-lg shadow-[#2C2A2A] aspect-square rounded-full"/>
            </div>
        </section>
    );
}