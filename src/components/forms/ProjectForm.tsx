"use client";
import {useRouter} from "next/navigation";
import {marope} from "@/app/fonts";
import FormButton from "@/components/FormButton";
import TechSelect from './TechSelect';
import { Project, Technology } from '@/types/project';

interface ProjectFormProps {
    isEditMode: boolean;
    // CORREÇÃO CRÍTICA AQUI: Usamos a interface 'Project' para os tipos baterem certo
    formData: Project;
    previewUrl: string | null;
    imageFile: File | null;
    loading: boolean;
    error: string | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTechChange: (techs: Technology[]) => void;
    handleSubmit: (e: React.FormEvent) => void;
    formatFileSize: (bytes: number) => string;
    MAX_FILE_SIZE: number;
}

export default function ProjectForm({
                                        isEditMode, formData, previewUrl, imageFile, loading, error,
                                        handleChange, handleImageChange, handleTechChange, handleSubmit, formatFileSize, MAX_FILE_SIZE,
                                    }: ProjectFormProps) {

    const router = useRouter();

    const inputClassName = `${marope.className} w-full bg-transparent border-2 border-white focus:border-blue-500 text-lg text-white py-2 px-3 outline-none transition-colors rounded-lg`;

    if (!formData) {
        return <div className="text-red-400">Erro: dados do formulário não carregados</div>;
    }

    return (
        <div className="bg-[#1a1a1a] rounded-lg shadow-2xl p-8 flex-shrink-0">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="flex flex-col justify-center">
                        <div
                            className="w-[500px] h-[480px] bg-gray-800 rounded-lg aspect-[4/3] flex items-center justify-center overflow-hidden border-2 border-gray-500">
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Pré-visualização do projeto"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-gray-400 text-center">
                                    <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <p className="text-sm">Pré-visualização da imagem</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* LADO DIREITO: CAMPOS DO FORMULÁRIO */}
                    <div className={`${marope.className} flex flex-col justify-between pr-8`}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                    Nome:
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    required={true}
                                    type="text"
                                    value={formData.name || ''}
                                    onChange={handleChange}
                                    className={inputClassName}
                                    placeholder="Nome do projeto"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                                    Descrição:
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    value={formData.description || ''}
                                    onChange={handleChange}
                                    className={`${inputClassName} resize-none`}
                                    placeholder="Descrição do projeto"
                                />
                            </div>
                            <div>
                                <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-300 mb-1">
                                    Repositório URL:
                                </label>
                                <input
                                    required={true}
                                    id="repoUrl"
                                    name="repoUrl"
                                    type="url"
                                    value={formData.repoUrl || ''}
                                    onChange={handleChange}
                                    className={inputClassName}
                                    placeholder="https://github.com/user/repo"
                                />
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
                                    Imagem do Projeto
                                </label>
                                <div className="flex items-center gap-4">
                                    <label htmlFor="image"
                                           className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                                        Escolher arquivo
                                    </label>
                                    <div className="flex flex-col">
                                    <span className="text-gray-400 text-sm truncate">
                                    {imageFile ? imageFile.name : 'Nenhum arquivo selecionado'}
                                    </span>
                                        {imageFile && (
                                            <span className="text-gray-500 text-xs">
                                            {formatFileSize(imageFile.size)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Tamanho máximo: {MAX_FILE_SIZE / (1024 * 1024)}MB • Formatos: PNG, JPEG, WebP
                                    <br/>
                                    Imagens grandes serão comprimidas automaticamente
                                </p>
                                <input
                                    required={!isEditMode}
                                    id="image"
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            {/* COMPONENTE DE TECNOLOGIAS INTELIGENTE */}
                            <div>
                                <TechSelect
                                    selectedTechs={formData.technologies || []}
                                    onChange={handleTechChange}
                                />
                            </div>

                            {error && (
                                <div
                                    className="text-red-400 text-sm bg-red-900 bg-opacity-20 p-3 rounded-md border border-red-500">
                                    {error}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-center gap-4 mt-8">
                            <FormButton
                                type="submit"
                                text={
                                    isEditMode
                                        ? (loading ? "Salvando..." : "Salvar")
                                        : (loading ? "Criando..." : "Criar")
                                }
                                disabled={loading}
                                color={isEditMode ? "blue" : "green"}
                            />
                            <FormButton
                                text="Cancelar"
                                type="button"
                                onClick={() => router.back()}
                                color="red"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}