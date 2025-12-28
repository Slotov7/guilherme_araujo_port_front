"use client";

import { useState } from "react";
import { Project } from "@/types/project";
import { marope, spaceGrotesk } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#1C1C1C] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Botão fechar melhorado */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 shadow-lg"
          aria-label="Fechar modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Imagem */}
        <div className="relative w-full h-96">
          <Image
            src={project.imageUrl || "/images/default-project.png"}
            alt={project.name}
            fill
            className="object-cover rounded-t-2xl"
          />
        </div>

        {/* Conteúdo */}
        <div className={`p-8 ${marope.className}`}>
          <h2
            className={`${spaceGrotesk.className} text-4xl font-bold mb-4 text-white`}
          >
            {project.name}
          </h2>

          <p className="text-gray-300 text-lg mb-6 whitespace-pre-wrap">
            {project.description}
          </p>

          {/* Tecnologias */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Tecnologias Utilizadas
              </h3>
              <div className="flex flex-wrap gap-4">
                {project.technologies.map((tech) => (
                  <div
                    key={tech.id}
                    className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg"
                  >
                    <div className="relative w-8 h-8">
                      <Image
                        src={tech.imageUrl}
                        alt={tech.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-gray-200">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Link do repositório */}
          {project.repoUrl && (
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors no-underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Ver Repositório
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-[#1C1C1C] rounded-2xl shadow-lg overflow-hidden group flex flex-col">
        <div className="relative w-full h-full aspect-video">
          <Image
            src={project.imageUrl || "/images/default-project.png"}
            alt={`Imagem do projeto ${project.name}`}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className={`p-6 flex flex-col flex-grow ${marope.className}`}>
          <h3
            className={`${spaceGrotesk.className} text-2xl font-bold mb-2 text-white`}
          >
            {project.name}
          </h3>
          <p className="text-gray-400 mb-3 flex-grow line-clamp-3">
            {project.description}
          </p>

          <div className="mb-4 text-right">
            <button
              className="text-gray-400 hover:text-gray-300 text-sm underline transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              Ver mais detalhes
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            {project.technologies &&
              project.technologies.map((tech) => (
                <div
                  key={tech.id}
                  className="relative w-9 h-9"
                  title={tech.name}
                >
                  <Image
                    src={tech.imageUrl}
                    alt={tech.name}
                    fill
                    className="object-contain"
                    sizes="36px"
                  />
                </div>
              ))}
          </div>

          {project.repoUrl && (
            <div className="mt-auto text-right">
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors no-underline"
              >
                Ver Repositório
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>

      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
