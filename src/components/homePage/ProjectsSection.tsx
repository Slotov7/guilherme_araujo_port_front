import { ProjectsAPI } from "@/services/api";
import { Project } from "@/types/project";
import { spaceGrotesk } from "@/app/fonts";
import { ProjectCard } from "./ProjectCard";

async function getProjects(): Promise<Project[]> {
  try {
    return await ProjectsAPI.getProjects();
  } catch (error) {
    console.error("Falha ao buscar projetos para a página principal:", error);
    return [];
  }
}

export default async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <section id="projetos" className="py-6">
      <div className="container mx-auto px-6">
        <h2
          className={`${spaceGrotesk.className} text-4xl font-bold text-center mb-8 text-white`}
        >
          Projetos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
