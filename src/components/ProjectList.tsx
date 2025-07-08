"use client";
import { useState } from "react";
import { Project } from "@/types/project";

// 1. Definimos as "props" que o nosso componente irá receber.
//    Ele receberá a lista inicial de projetos e uma possível mensagem de erro.
interface ProjectListProps {
    initialProjects: Project[];
    error: string | null;
}

export default function ProjectList({ initialProjects, error }: ProjectListProps) {


    const [projects, setProjects] = useState<Project[]>(initialProjects);

    if (error) {
        return <div className="text-center p-10 text-red-500">Erro: {error}</div>;
    }

    if (projects.length === 0) {
        return <div className="text-center p-10">Nenhum projeto encontrado.</div>;
    }

    // 6. Se há projetos, exibimo-los.
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
                <div key={proj.id} className="border rounded-lg overflow-hidden shadow-lg bg-white transition-transform hover:scale-105">
                    <img src={proj.imageUrl} alt={`Imagem do projeto ${proj.name}`} className="w-full h-48 object-cover" />
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{proj.name}</h3>
                        <p className="text-gray-600 mb-4 h-24 overflow-hidden">{proj.description}</p>
                        <a
                            href={proj.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            Ver Repositório
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
