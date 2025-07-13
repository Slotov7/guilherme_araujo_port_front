import Header from "@/components/homePage/HeaderHome";
import SobreSection from "@/components/homePage/SobreSection";
import FooterHome from "@/components/homePage/FooterHome";
import HeroSection from "@/components/homePage/HeroSection";
import TecnologiasSection from "@/components/homePage/TecnologiasSection";
import ContactSection from "@/components/homePage/ContactSection";
import ProjectsSection from "@/components/homePage/ProjectsSection";

export default async function Home() {


    const navLinks = [
        {href: "#projetos", label: "Projetos"},
        {href: "#tecnologias", label: "Tecnologias"},
        {href: "#sobre", label: "Sobre"},
        {href: "#contato", label: "Contato"},
    ];

    return (
        <div className="bg-gradient-to-b from-[#060606] to-[#2C2A2A] text-white flex flex-col h-screen">
            <Header />

            <main className="flex-1 overflow-y-auto w-full">
                <HeroSection/>
                <ProjectsSection/>
                <TecnologiasSection/>
                <SobreSection/>
                <ContactSection/>
                <FooterHome/>
            </main>


        </div>
    );
}