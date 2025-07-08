"use client";

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectsAPI } from '@/services/api';
import { marope, spaceGrotesk } from "@/app/fonts";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function NewProjectPage() {
    const { logout } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        repoUrl: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Limite: 5MB
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB em bytes

    const handleChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // Função para comprimir imagem
    const compressImage = (file: File): Promise<File> => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new window.Image();

            img.onload = () => {
                // Calcular novo tamanho mantendo proporção
                const maxWidth = 1200;
                const maxHeight = 800;
                let { width, height } = img;

                if (width > height) {
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                // Desenhar imagem redimensionada
                ctx?.drawImage(img, 0, 0, width, height);

                // Converter para blob com qualidade reduzida
                canvas.toBlob((blob) => {
                    if (blob) {
                        const compressedFile = new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        });
                        resolve(compressedFile);
                    }
                }, 'image/jpeg', 0.8); // Qualidade 80%
            };

            img.src = URL.createObjectURL(file);
        });
    };

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;

        if (file) {
            // Verificar o tipo do arquivo
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                setError('Formato de arquivo não suportado. Use PNG, JPEG ou WebP.');
                setImageFile(null);
                setPreviewUrl(null);
                e.target.value = '';
                return;
            }

            let processedFile = file;

            // Se o arquivo for muito grande, comprimir
            if (file.size > MAX_FILE_SIZE) {
                try {
                    setError('Arquivo muito grande. Comprimindo...');
                    processedFile = await compressImage(file);

                    // Verificar se ainda está muito grande após compressão
                    if (processedFile.size > MAX_FILE_SIZE) {
                        setError(`Arquivo ainda muito grande após compressão. Tamanho: ${formatFileSize(processedFile.size)}. Máximo: ${formatFileSize(MAX_FILE_SIZE)}`);
                        setImageFile(null);
                        setPreviewUrl(null);
                        e.target.value = '';
                        return;
                    }

                    setError(null);
                } catch (error) {
                    console.error('Erro ao comprimir imagem:', error);
                    setError('Erro ao comprimir a imagem. Tente uma imagem menor.');
                    setImageFile(null);
                    setPreviewUrl(null);
                    e.target.value = '';
                    return;
                }
            }

            // Limpar erro anterior se existir
            setError(null);
            setImageFile(processedFile);
            setPreviewUrl(URL.createObjectURL(processedFile));
        } else {
            setImageFile(null);
            setPreviewUrl(null);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (Object.values(formData).some(v => !v.trim()) || !imageFile) {
            setError('Todos os campos são obrigatórios.');
            return;
        }

        // Verificar token de autenticação
        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('Token de autenticação não encontrado. Faça login novamente.');
            logout();
            router.push('/login');
            return;
        }

        // Verificação adicional de tamanho antes do envio
        if (imageFile.size > MAX_FILE_SIZE) {
            setError(`Arquivo muito grande. Tamanho atual: ${formatFileSize(imageFile.size)}. Máximo: ${formatFileSize(MAX_FILE_SIZE)}`);
            return;
        }

        setLoading(true);
        setError(null);

        const payload = new FormData();
        payload.append(
            'project',
            new Blob([JSON.stringify(formData)], { type: 'application/json' })
        );
        payload.append('image', imageFile);

        try {
            console.log('Enviando dados:', {
                formData,
                imageSize: formatFileSize(imageFile.size),
                imageType: imageFile.type
            });

            const response = await ProjectsAPI.createProject(payload);
            console.log('Resposta da API:', response);

            // Mostrar modal de sucesso
            setShowSuccessModal(true);

        } catch (error: any) {
            console.error('Erro ao criar projeto:', error);

            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;

                switch (status) {
                    case 403:
                        setError('Acesso negado. Você não tem permissão para criar projetos ou sua sessão expirou. Faça login novamente.');
                        setTimeout(() => {
                            logout();
                            router.push('/login');
                        }, 3000);
                        break;
                    case 413:
                        setError(`Arquivo muito grande para o servidor. Tamanho: ${formatFileSize(imageFile.size)}. Tente uma imagem menor.`);
                        break;
                    case 400:
                        setError(`Dados inválidos: ${data?.message || data?.error || 'Verifique os dados enviados'}`);
                        break;
                    case 401:
                        setError('Token inválido ou expirado. Faça login novamente.');
                        logout();
                        router.push('/login');
                        break;
                    case 500:
                        setError('Erro interno do servidor. Tente novamente mais tarde.');
                        break;
                    default:
                        setError(`Erro ${status}: ${data?.message || data?.error || JSON.stringify(data) || 'Erro desconhecido'}`);
                }
            } else if (error.request) {
                setError('Erro de conexão. Verifique se o servidor está rodando e se você tem acesso à internet.');
            } else {
                setError(`Erro inesperado: ${error.message || 'Erro desconhecido'}`);
            }
        } finally {
            setLoading(false);
        }
    };

    // Função para fechar o modal e navegar para o dashboard
    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        router.push('/dashboard');
    };

    // Classe CSS padronizada para todos os inputs
    const inputClassName = `${marope.className} w-full bg-transparent border-2 border-gray-500 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200`;

    return (
        <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-[#060606] to-[#2C2A2A] overflow-hidden">
            <header className="flex-shrink-0 px-8 py-5 bg-transparent shadow-lg z-50">
                <div className="flex items-center justify-between">
                    <a href="/"><Image src="/images/logo.svg" alt="Logo" width={150} height={40} priority /></a>
                    <button
                        onClick={() => { logout(); router.push('/login'); }}
                        className="bg-transparent border-0 focus:outline-none hover:bg-[#2C2A2A] rounded-full p-2 transition-colors"
                    >
                        {/* SVG de logout */}
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4">
                <div className="max-w-6xl mx-auto h-full flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <h1 className={`${spaceGrotesk.className} text-4xl font-bold text-white`}>
                            CRIAR PROJETO
                        </h1>
                    </div>

                    <div className="bg-[#1a1a1a] rounded-lg shadow-2xl p-8 flex-shrink-0">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                                <div className="flex flex-col justify-center">
                                    <div className="w-[500px] h-[480px] bg-gray-800 rounded-lg aspect-[4/3] flex items-center justify-center overflow-hidden border-2 border-gray-500">
                                        {previewUrl ? (
                                            <img
                                                src={previewUrl}
                                                alt="Pré-visualização do projeto"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-gray-400 text-center">
                                                <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                </svg>
                                                <p className="text-sm">Pré-visualização da imagem</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={`${marope.className} flex flex-col justify-between pr-8`}>
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                                Nome:
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={inputClassName}
                                                placeholder="Nome do projeto"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                                Descrição:
                                            </label>
                                            <textarea
                                                id="description"
                                                rows={4}
                                                value={formData.description}
                                                onChange={handleChange}
                                                className={`${inputClassName} resize-none`}
                                                placeholder="Descrição do projeto"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-300 mb-2">
                                                Repositório URL:
                                            </label>
                                            <input
                                                id="repoUrl"
                                                type="url"
                                                value={formData.repoUrl}
                                                onChange={handleChange}
                                                className={inputClassName}
                                                placeholder="https://github.com/user/repo"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
                                                Imagem do Projeto
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <label htmlFor="image" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
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
                                                <br />
                                                Imagens grandes serão comprimidas automaticamente
                                            </p>
                                            <input
                                                id="image"
                                                type="file"
                                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </div>

                                        {error && (
                                            <div className="text-red-400 text-sm bg-red-900 bg-opacity-20 p-3 rounded-md border border-red-500">
                                                {error}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-center gap-4 mt-8">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`${marope.className} w-32 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-1.5 rounded-md transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed`}
                                        >
                                            {loading ? 'Criando...' : 'Criar'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => router.push('/dashboard')}
                                            className={`${marope.className} w-32 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg py-1.5 rounded-md transition-colors cursor-pointer`}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <footer className={`${marope.className} bg-[#060606] text-center p-4 text-white mt-auto`}>
                © 2025 Guilherme Araujo - Todos os direitos reservados.
            </footer>

            {/* Modal de Sucesso */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#1E1E1E] text-white p-6 rounded-xl shadow-lg max-w-md w-full text-center mx-4">
                        <div className="flex justify-center mb-4">
                            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className={`${spaceGrotesk.className} text-xl font-bold mb-4`}>Sucesso!</h2>
                        <p className={`${marope.className} mb-6 text-gray-300`}>
                            Projeto criado com sucesso! Você será redirecionado para o dashboard.
                        </p>
                        <button
                            onClick={handleCloseSuccessModal}
                            className={`${marope.className} px-6 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold transition-colors`}
                        >
                            Ir para Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}