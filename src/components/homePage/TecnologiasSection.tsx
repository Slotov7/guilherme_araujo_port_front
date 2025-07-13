// src/components/TecnologiasSection.tsx

import { spaceGrotesk, marope } from "@/app/fonts";
import React from 'react';


import { JavaIcon } from "@/components/icons/TechnologyIcon"; import {PythonIcon} from "@/components/icons/TechnologyIcon";
import { SpringIcon } from "@/components/icons/TechnologyIcon"; import { ReactIcon } from "@/components/icons/TechnologyIcon";
import { NodeJStIcon } from "@/components/icons/TechnologyIcon"; import { NestJSIcon } from "@/components/icons/TechnologyIcon";
import { NextJSIcon } from "@/components/icons/TechnologyIcon"; import { JavaScriptIcon } from "@/components/icons/TechnologyIcon";
import { TypeScriptIcon } from "@/components/icons/TechnologyIcon"; import { HTMLIcon } from "@/components/icons/TechnologyIcon";
import { CSSIcon } from "@/components/icons/TechnologyIcon"; import { TailwindIcon } from "@/components/icons/TechnologyIcon";

import {PostgreSqlIcon} from "@/components/icons/TechnologyIcon"; import {MySqlIcon} from "@/components/icons/TechnologyIcon";
import { HibernateIcon } from "@/components/icons/TechnologyIcon"; import { PrismaIcon } from "@/components/icons/TechnologyIcon";

import { FigmaIcon } from "@/components/icons/TechnologyIcon"; import { GitIcon } from "@/components/icons/TechnologyIcon";
import { GithubIcon } from "@/components/icons/TechnologyIcon"; import { PostmanIcon } from "@/components/icons/TechnologyIcon";
import { SwaggerIcon } from "@/components/icons/TechnologyIcon"; import { IntelliJIcon } from "@/components/icons/TechnologyIcon";
import { WebStormIcon } from "@/components/icons/TechnologyIcon"; import { VsCodeIcon } from "@/components/icons/TechnologyIcon";
import { DockerIcon } from "@/components/icons/TechnologyIcon";

const technologies = {
    languages: [
        { name: 'Java', Icon: JavaIcon },
        { name: 'Spring', Icon: SpringIcon },
        { name: 'Python', Icon:  PythonIcon },
        { name: 'React', Icon: ReactIcon },
        { name: 'Node.js', Icon: NodeJStIcon },
        { name: 'NestJS', Icon: NestJSIcon },
        { name: 'Next.js', Icon: NextJSIcon },
        { name: 'JavaScript', Icon: JavaScriptIcon },
        { name: 'TypeScript', Icon: TypeScriptIcon },
        { name: 'HTML5', Icon: HTMLIcon },
        { name: 'CSS3', Icon: CSSIcon },
        { name: 'Tailwind CSS', Icon: TailwindIcon },

    ],
    databases: [
        { name: 'PostgreSQL', Icon: PostgreSqlIcon },
        { name: 'MySQL', Icon: MySqlIcon },
        { name: 'Hibernate', Icon: HibernateIcon },
        { name: 'Prisma', Icon: PrismaIcon },
    ],
    tools: [
        { name: 'Figma', Icon: FigmaIcon },
        { name: 'Git', Icon: GitIcon },
        { name: 'GitHub', Icon: GithubIcon },
        { name: 'Postman', Icon: PostmanIcon },
        { name: 'Swagger', Icon: SwaggerIcon },
        { name: 'Docker', Icon: DockerIcon },
        { name: 'IntelliJ IDEA', Icon: IntelliJIcon },
        { name: 'WebStorm', Icon: WebStormIcon },
        { name: 'VS Code', Icon: VsCodeIcon },
    ]
};


function TechIcon({ Icon, name }: { Icon: React.ElementType, name: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 text-center w-24" title={name}>
            <Icon className="w-30 h-30 transition-transform duration-300 hover:scale-110" />
        </div>
    );
}


export default function TecnologiasSection() {
    return (
        <section id="tecnologias" className="py-6">
            <div className="container mx-auto px-6">
                <h2 className={`${spaceGrotesk.className} text-4xl font-bold text-center mb-8 text-white`}>Tecnologias</h2>


                <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                    {/* Linguagens e Frameworks */}
                    <div className="bg-[#1C1C1C] pb-8 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-semibold mb-8 text-center text-gray-200">Linguagens e Frameworks</h3>
                        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 space-x-2">
                            {technologies.languages.map(tech => <TechIcon key={tech.name} {...tech} />)}
                        </div>
                    </div>
                    {/* Banco de Dados e ORMs */}
                    <div className="bg-[#1C1C1C] pb-8 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-semibold mb-8 text-center text-gray-200">Banco de Dados e ORMs</h3>
                        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 space-x-10">
                            {technologies.databases.map(tech => <TechIcon key={tech.name} {...tech} />)}
                        </div>
                    </div>
                    {/* Ferramentas e IDEs */}
                    <div className="bg-[#1C1C1C] pb-8 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-semibold mb-8 text-center text-gray-200">Ferramentas e IDEs</h3>
                        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 space-x-10">
                            {technologies.tools.map(tech => <TechIcon key={tech.name} {...tech} />)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}