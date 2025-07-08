import { ProjectsAPI } from "@/services/api";
import { Project } from "@/types/project";
import ProjectList from "@/components/ProjectList";

export default async function Home() {

    let projects: Project[] = [];
    let error: string | null = null;


    try {
        projects = await ProjectsAPI.getProjects();
    } catch (err) {
        // Se a chamada falhar (ex: por CORS, ou se o backend estiver desligado),
        // guardamos a mensagem de erro.
        console.error("Falha ao buscar projetos no servidor:", err);
        error = "Não foi possível carregar os projetos. O backend está acessível?";
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="text-center p-8 md:p-16 bg-white shadow-sm">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                    Meu Portfólio
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Bem-vindo ao meu espaço! Aqui estão alguns dos projetos que desenvolvi.
                </p>
            </div>

            <div className="container mx-auto p-4 md:p-8">
                <ProjectList initialProjects={projects} error={error} />
            </div>

        </main>
    );
}
