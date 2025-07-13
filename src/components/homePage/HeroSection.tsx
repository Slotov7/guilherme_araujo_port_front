import Image from 'next/image';
import { spaceGrotesk } from '@/app/fonts';
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className=" grid grid-cols-1 md:grid-cols-2 container mx-auto px-6 items-center gap-8 h-screen">
            <div className={`${spaceGrotesk.className} container px-6 py-0 flex flex-col items-start justify-center text-center h-full  box-border`}>
                <div className="flex flex-col items-start justify-center h-full gap-1 pr-36" >
                    <h1 className="text-6xl md:text-7xl font-bold text-left w-full m-0 text-nowrap">Guilherme Araújo</h1>
                    <div className="mb-4">
                        <p className="text-2xl m-0 text-left ">Sou desenvolvedor backend e designer UI/UX.</p>
                        <p className="text-2xl m-0 text-left ">Crio soluções completas: do código robusto à interface intuitiva.</p>
                        <p className="text-2xl m-0 text-left ">Aqui você encontra meus projetos, habilidades e formas de contato.</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">

                        <a href="https://res.cloudinary.com/dfn2uzjqw/raw/upload/portfolio_cv.pdf"
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
            <div className="h-full  box-border items-center justify-center flex">
                <Image src="/images/foto.png" alt="Foto de Guilherme Araújo" width={550} height={550} className="shadow-lg shadow-[#2C2A2A] aspect-square rounded-full"/>

            </div>
        </section>
    );
}