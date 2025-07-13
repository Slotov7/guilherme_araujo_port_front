import {ProjectsAPI} from "@/services/api";
import {Project} from "@/types/project";
import {marope, spaceGrotesk} from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";

import {
    CSSIcon,
    DockerIcon,
    FigmaIcon,
    GithubIcon,
    GitIcon,
    HibernateIcon,
    HTMLIcon,
    JavaIcon,
    JavaScriptIcon,
    MySqlIcon,
    NestJSIcon,
    NextJSIcon,
    NodeJStIcon,
    PostgreSqlIcon,
    PostmanIcon,
    PrismaIcon,
    PythonIcon,
    ReactIcon,
    SpringIcon,
    SwaggerIcon,
    TailwindIcon,
    TypeScriptIcon,
    AngularIcon,
    CIcon,
    CPlusPlusIcon,
    CSharpIcon,
    ArduinoIcon
} from "@/components/icons/TechnologyIcon";

const iconMap: { [key: string]: React.ElementType } = {
    java: JavaIcon,
    spring: SpringIcon,
    react: ReactIcon,
    python: PythonIcon,
    nodejs: NodeJStIcon,
    nestjs: NestJSIcon,
    nextjs: NextJSIcon,
    javascript: JavaScriptIcon,
    typescript: TypeScriptIcon,
    html: HTMLIcon,
    css: CSSIcon,
    tailwind: TailwindIcon,
    postgresql: PostgreSqlIcon,
    mysql: MySqlIcon,
    hibernate: HibernateIcon,
    prisma: PrismaIcon,
    figma: FigmaIcon,
    git: GitIcon,
    github: GithubIcon,
    postman: PostmanIcon,
    swagger: SwaggerIcon,
    docker: DockerIcon,
    angular: AngularIcon,
    c: CIcon,
    cplusplus: CPlusPlusIcon,
    csharp: CSharpIcon,
    arduino: ArduinoIcon
};

// Função para buscar dados no servidor
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
                <h2 className={`${spaceGrotesk.className} text-4xl font-bold text-center mb-8 text-white`}>
                    Projetos
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-[#1C1C1C] rounded-2xl shadow-lg overflow-hidden group flex flex-col">
                            <div className="relative w-full h-56">
                                <Image
                                    src={project.imageUrl || '/images/default-project.png'}
                                    alt={`Imagem do projeto ${project.name}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Conteúdo do Cartão */}
                            <div className={`p-6 flex flex-col flex-grow ${marope.className}`}>
                                <h3 className={`${spaceGrotesk.className} text-2xl font-bold mb-2 text-white`}>
                                    {project.name}
                                </h3>
                                <p className="text-gray-400 mb-4 flex-grow line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex items-center gap-3 mb-6">
                                    {project.technologies && project.technologies.split(',').map(techKey => {
                                        const IconComponent = iconMap[techKey.trim().toLowerCase()];
                                        if (!IconComponent) return null; // Se não encontrar o ícone, não renderiza nada
                                        return <IconComponent key={techKey} className="w-9 h-9" title={techKey} />;
                                    })}
                                </div>

                                <div className="mt-auto text-right">
                                    <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors no-underline">
                                        Ver Repositório
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                            <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}