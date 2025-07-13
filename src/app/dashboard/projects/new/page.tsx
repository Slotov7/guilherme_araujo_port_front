"use client";

import {spaceGrotesk} from "@/app/fonts";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SuccessModal from "@/components/dashboardPage/SuccessModal";
import {useProjectForm} from "@/hooks/useProjectForm";
import ProjectForm from "@/components/forms/ProjectForm";

export default function NewProjectPage() {
    const formProps = useProjectForm();

    if (!formProps) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-[#060606] to-[#2C2A2A] text-white">
                Erro ao carregar o formulário
            </div>
        );
    }
    return (
        <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-[#060606] to-[#2C2A2A] overflow-hidden">
            <Header/>

            <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4">
                <div className="max-w-6xl mx-auto h-full flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <h1 className={`${spaceGrotesk.className} text-4xl font-bold text-white`}>
                            CRIAR PROJETO
                        </h1>
                    </div>

                    <ProjectForm {...formProps}/>
                </div>
            </main>

            <Footer/>

            <SuccessModal
                isOpen={formProps.showSuccessModal}
                message="Projeto criado com sucesso! Você será redirecionado."
                onClose={formProps.handleCloseSuccessModal}
            />
        </div>
    );
}