"use client";

import ContactForm from "@/components/forms/ContactForm";
import {GitHubButton, InstagramButton, LinkedInButton} from "@/components/homePage/SocialMidiasButtons";
import ResponsiveImage from "@/components/ResponsiveImage";

export default function ContactSection(){
    return(
        <section id="contato" className=" relative grid grid-cols-1 xl:grid-cols-2 bg-gradient-to-b from-[#2C2A2A] to-[#060606] text-white p-8 gap-8">
            <div className="order-1 xl:order-1 mb-4">
                <h2 className="text-3xl m-0 text-left max-sm:text-center max-sm:text-2xl max-xl:text-center">Se preferir entre em contato pelas redes sociais!</h2>
                <div className="flex gap-4 mt-4 mb-4 max-sm:items-center max-sm:justify-center max-xl:items-center max-xl:justify-center">
                    <GitHubButton/>
                    <LinkedInButton/>
                    <InstagramButton/>
                </div>
                <p className="text-xl m-0 text-left max-sm:text-center max-sm:text-lg max-xl:text-center">Transformo ideias em experiências funcionais e bem projetadas. </p>
                <p className="text-xl m-0 text-left max-sm:text-center max-sm:text-lg max-xl:text-center">Vamos construir algo juntos?</p>

            </div>

            <div className="flex justify-center order-2 gap-8 mb-8">
                <ContactForm/>
            </div>

            <ResponsiveImage/>

        </section>
    );
}