"use client";

import { Project } from "@/types/project";
import Image from "next/image";

// 1. Definimos as props que o componente vai receber do pai (DashboardPage)
interface ListProjectsProps {
    projects: Project[];
    onEdit: (id: number) => void;
    onDelete: (id: number, name: string) => void;
}

export default function ListProjects({
                                        projects,
                                        onEdit,
                                        onDelete,
                                    }: ListProjectsProps) {
    return (
        <div className="bg-[#060606] bg-opacity-40 rounded-lg shadow-lg p-6 mx-auto max-w-4xl">
            {projects.length > 0 ? (
                <div className="space-y-4">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-[#2C2A2A] p-4 rounded-lg shadow-md flex flex-col lg:flex-row gap-4 relative">
                            <div className="lg:w-60 lg:flex-shrink-0">
                                <img
                                    src={project.imageUrl || "/images/default-projects.png"}
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
                                    onClick={() => onEdit(project.id)}
                                    className="bg-transparent border-0 focus:outline-none hover:bg-white hover:bg-opacity-10 rounded-full p-2 transition-colors duration-300 cursor-pointer"
                                    title="Editar"
                                >
                                    {/* SVG Editar */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </button>
                                <button
                                    onClick={() => onDelete(project.id, project.name)}
                                    className="bg-transparent border-0 focus:outline-none hover:bg-red-500 hover:bg-opacity-20 rounded-full p-2 transition-colors duration-300 cursor-pointer"
                                    title="Apagar"
                                >
                                    {/* SVG Apagar */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10 12V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 12V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 7H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-white text-center text-lg">Nenhum projeto encontrado. Que tal criar o primeiro?</p>
            )}
        </div>
    );
}