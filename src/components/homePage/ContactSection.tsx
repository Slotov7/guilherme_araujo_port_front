import ContactForm from "@/components/forms/ContactForm";
import {GitHubButton, InstagramButton, LinkedInButton} from "@/components/homePage/SocialMidiasButtons";
import Image from "next/image";

export default function ContactSection(){
    return(
        <section id="contato" className=" relative grid grid-cols-2 md:grid-cols-2bg-gradient-to-b from-[#2C2A2A] to-[#060606] text-white p-8">
            <div className="mb-4">
                <h2 className="text-3xl m-0 text-left ">Se preferir entre em contato pelas redes sociais!</h2>
                <div className="flex gap-4 mt-4 mb-4">
                    <GitHubButton/>
                    <LinkedInButton/>
                    <InstagramButton/>
                </div>
                <p className="text-xl m-0 text-left ">Transformo ideias em experiências funcionais e bem projetadas. </p>
                <p className="text-xl m-0 text-left ">Vamos construir algo juntos?</p>

            </div>

            <div className="gap-8 mb-8">
                <ContactForm/>
            </div>

            <div className="absolute bottom-0 ml-[520px] w-full md:w-1/2 flex justify-center md:justify-start pointer-events-none">
                <Image
                    src="/images/boneco.png"
                    alt="Avatar de desenvolvedor"
                    width={500}
                    height={700}
                    className="h-auto"
                />
            </div>

        </section>
    );
}