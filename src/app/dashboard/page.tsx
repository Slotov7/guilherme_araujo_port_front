"use client";

import {spaceGrotesk} from "@/app/fonts";
import Footer from "@/components/Footer";
import HeaderDashboard from "@/components/dashboardPage/HeaderDashboard";
import ListProjects from "@/components/dashboardPage/ListProjects";
import NewProjectButton from "@/components/dashboardPage/NewProjectButton";
import ConfirmDeleteModal from "@/components/dashboardPage/ConfirmDeleteModal";
import SuccessModal from "@/components/dashboardPage/SuccessModal";
import FailureModal from "@/components/dashboardPage/FailureModal";
import {useProjects} from "@/hooks/useProjects";

export default function DashboardPage() {
    const {
        projects,
        loading,
        error,
        showConfirmModal,
        selectedProject,
        showSuccessModal,
        showFailureModal,
        handleDelete,
        confirmDelete,
        cancelDelete,
        handleEdit,
        setShowSuccessModal,
        setShowFailureModal
    } = useProjects();

    const validProjects = Array.isArray(projects) ? projects : [];

    return (
        <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-[#060606] to-[#2C2A2A] overflow-hidden">
            <HeaderDashboard/>
            <main className="flex-1 overflow-y-auto overflow-x-hidden">
                <div className="min-h-full flex flex-col">
                    <div className="flex-1 py-8 px-4">
                        <div className="max-w-full">
                            <div className="flex justify-center items-center mb-8">
                                <h1 className={`${spaceGrotesk.className} text-5xl font-bold text-center mb-8 tracking-widest text-white`}>
                                    MEUS PROJETOS
                                </h1>
                            </div>
                            {loading && (
                                <div className="text-white text-center" role="status" aria-live="polite">
                                    A carregar projetos...
                                </div>
                            )}
                            {error && (
                                <div className="text-red-700 text-center" role="alert" aria-live="assertive">
                                    {error}
                                </div>
                            )}
                            {!loading && !error && (
                                <ListProjects
                                    projects={validProjects}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                            )}
                            <div className="flex justify-center mt-8 mb-2">
                                <NewProjectButton/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </main>

            <ConfirmDeleteModal
                isOpen={showConfirmModal}
                projectName={selectedProject?.name ?? 'Projeto sem nome'}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />

            <SuccessModal
                isOpen={showSuccessModal}
                message="Projeto apagado com sucesso."
                onClose={() => setShowSuccessModal(false)}
            />

            <FailureModal
                isOpen={showFailureModal}
                message="Falha ao apagar o projeto. Tente novamente."
                onClose={() => setShowFailureModal(false)}
            />
        </div>
    );
}