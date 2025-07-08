"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProjectsAPI } from "@/services/api";
import { Project } from "@/types/project";
import { useRouter } from "next/navigation";
import {marope, spaceGrotesk} from "@/app/fonts";
import Image from "next/image";

export default function DashboardPage() {
    const { logout } = useAuth();
    const router = useRouter();

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<{ id: number, name: string } | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailureModal, setShowFailureModal] = useState(false)

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProjects = projects.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await ProjectsAPI.getProjects();
                setProjects(data);
            } catch (err: any) {
                console.error("Erro ao buscar projetos:", err);
                setError("Não foi possível carregar os projetos. A sua sessão pode ter expirado.");
                if (err.response?.status === 401 || err.response?.status === 403) {
                    logout();
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, [logout, router]);

    const handleDelete = (projectId: number, projectName: string) => {
        setSelectedProject({ id: projectId, name: projectName });
        setShowConfirmModal(true);
        setShowSuccessModal(false);
        setShowFailureModal(false);
    };

    const confirmDelete = async () => {
        if (!selectedProject) return;

        try {
            await ProjectsAPI.deleteProject(selectedProject.id, selectedProject.name);
            setProjects((current) => current.filter(p => p.id !== selectedProject.id));
            setShowSuccessModal(true);
        } catch (err) {
            console.error("Erro ao apagar projeto:", err);
            setShowFailureModal(true)
        } finally {
            setShowConfirmModal(false);
            setSelectedProject(null);
        }
    };

    const cancelDelete = () => {
        setShowConfirmModal(false);
        setSelectedProject(null);
    };

    const handleEdit = (projectId: number) => {
        router.push(`/dashboard/projects/edit/${projectId}`);
    };

    const handleCreateProject = () => {
        router.push('/dashboard/projects/new');
    };

    return (
        <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-[#060606] to-[#2C2A2A] overflow-hidden">
            <header className="flex-shrink-0 px-8 py-5 bg-transparent shadow-lg z-50">
                <div className="flex items-center justify-between">
                    <a href="/">
                        <Image
                            src="/images/logo.svg"
                            alt="Logo Guilherme Araujo"
                            width={150}
                            height={40}
                            priority
                        />
                    </a>
                    <button
                        onClick={() => {
                            logout();
                            router.push('/login');
                        }}
                        className="bg-transparent border-0 focus:outline-none flex items-center justify-center mr-10 hover:bg-[#2C2A2A] rounded-full p-2 transition-colors duration-300 cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M21 12L13 12"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M16 5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto overflow-x-hidden">
                <div className="min-h-full flex flex-col">
                    <div className="flex-1 py-8 px-4">
                        <div className="max-w-full">
                            <div className="flex justify-center items-center mb-8">
                                <h1 className={`${spaceGrotesk.className} text-5xl font-bold text-center mb-8 tracking-widest text-white`}>
                                    MEUS PROJETOS
                                </h1>
                            </div>

                            {loading && <p className="text-white text-center">A carregar projetos...</p>}
                            {error && <p className="text-red-700 text-center">{error}</p>}

                            {!loading && !error && (
                                <div className="bg-[#060606] bg-opacity-40 rounded-lg shadow-lg p-6 mx-auto max-w-4xl">
                                    {projects.length > 0 ? (
                                        <div className="space-y-4">
                                            {displayedProjects.map((project) => (
                                                <div key={project.id} className="bg-[#2C2A2A] p-4 rounded-lg shadow-md flex flex-col lg:flex-row gap-4 relative">
                                                    <div className="lg:w-60 lg:flex-shrink-0">
                                                        <img
                                                            src={project.imageUrl || "/images/default-project.png"}
                                                            alt={project.name}
                                                            className="w-full h-56 lg:h-52 object-cover rounded-lg shadow-lg"
                                                        />
                                                    </div>
                                                    <div className="flex-1 flex flex-col justify-center">
                                                        <h3 className="text-lg lg:text-xl font-bold text-white mb-2 break-words">{project.name}</h3>
                                                        <p className="text-sm text-gray-300 break-words leading-relaxed">{project.description}</p>
                                                    </div>
                                                    <div className="flex lg:flex-col justify-end lg:justify-center items-center lg:items-end space-x-2 lg:space-x-0 lg:space-y-2">
                                                        <button
                                                            onClick={() => {
                                                                router.push('/dashboard/project/edit/' + project.id);
                                                            }}
                                                            className="bg-transparent border-0 focus:outline-none hover:bg-white hover:bg-opacity-10 rounded-full p-2 transition-colors duration-300 cursor-pointer"
                                                            title="Editar"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                                <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(project.id, project.name)}
                                                            className="bg-transparent border-0 focus:outline-none hover:bg-red-500 hover:bg-opacity-20 rounded-full p-2 transition-colors duration-300 cursor-pointer"
                                                            title="Apagar"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                                <path d="M10 12V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path d="M14 12V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path d="M4 7H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-white text-center text-lg">Nenhum projeto encontrado. Que tal criar o primeiro?</p>
                                    )}
                                </div>
                            )}

                            {/* Controles de paginação */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center mt-8 space-x-2 flex-wrap">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((p) => p - 1)}
                                        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 hover:bg-gray-600 transition-colors"
                                    >
                                        Anterior
                                    </button>
                                    <div className="flex space-x-2 flex-wrap">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-4 py-2 rounded transition-colors ${
                                                    page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((p) => p + 1)}
                                        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 hover:bg-gray-600 transition-colors"
                                    >
                                        Próximo
                                    </button>
                                </div>
                            )}

                            <div className="flex justify-center mt-12 mb-8">
                                <button
                                    type="button"
                                    onClick={() => {
                                        router.push('/dashboard/project/new');
                                    }}
                                    className="flex items-center justify-center bg-[#20359C] border-0 text-white text-lg sm:text-2xl py-4 px-8 rounded-lg transition-all duration-300 disabled:bg-gray-500 cursor-pointer hover:bg-gradient-to-r hover:from-[#20359C] hover:to-[#1F4E79] shadow-lg"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 512 512"
                                        fill="white"
                                        className="mr-3"
                                    >
                                        <title>project-new</title>
                                        <g transform="translate(64,34.346667)">
                                            <path d="M192,0 L384,110.851252 L384,242.986 L341.333,242.986 L341.333,157.655 L213.333,231.555 L213.333,431.088 L192,443.405007 L0,332.553755 L0,110.851252 L192,0 Z M341.333333,264.32 L341.333,328.32 L405.333333,328.32 L405.333333,370.986667 L341.333,370.986 L341.333333,434.986667 L298.666667,434.986667 L298.666,370.986 L234.666667,370.986667 L234.666667,328.32 L298.666,328.32 L298.666667,264.32 L341.333333,264.32 Z M42.666,157.654 L42.6666667,307.920144 L170.666,381.82 L170.666,231.555 L42.666,157.654 Z M192,49.267223 L66.1333333,121.936377 L192,194.605531 L317.866667,121.936377 L192,49.267223 Z"></path>
                                        </g>
                                    </svg>
                                    Adicionar projeto
                                </button>
                            </div>
                        </div>
                    </div>

                    <footer className={`${marope.className} bg-[#060606] text-center p-4 text-white mt-auto`}>
                        © 2025 Guilherme Araujo - Todos os direitos reservados.
                    </footer>
                </div>
            </main>

            {showConfirmModal && selectedProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`${marope.className} bg-[#1E1E1E] text-white justify-center text-center p-6 rounded-xl font-manrope shadow-lg max-w-md w-full mx-4`}>
                        <h2 className="text-xl font-bold mb-4">Confirmar exclusão</h2>
                        <p>Tem certeza que deseja apagar o projeto <strong>{selectedProject.name}</strong>? Esta ação não pode ser desfeita.</p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition"
                            >
                                Apagar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#1E1E1E] text-white p-6 rounded-xl shadow-lg max-w-md w-full text-center font-manrope mx-4">
                        <h2 className="text-xl font-bold mb-4">Sucesso!</h2>
                        <p>Projeto apagado com sucesso.</p>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold transition"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}

            {showFailureModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#1E1E1E] text-white p-6 rounded-xl shadow-lg max-w-md w-full text-center font-manrope mx-4">
                        <h2 className="text-xl font-bold mb-4">Erro!</h2>
                        <p>Falha ao apagar projeto.</p>
                        <button
                            onClick={() => setShowFailureModal(false)}
                            className="mt-6 px-6 py-2 bg-red-700 hover:bg-red-700 rounded text-white font-semibold transition"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}