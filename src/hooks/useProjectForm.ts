"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ProjectsAPI } from '@/services/api';


export function useProjectForm(projectId?: number) {
    const { logout } = useAuth();
    const router = useRouter();

    const isEditMode = projectId !=null;

    const [formData, setFormData] = useState({ name: '', description: '', repoUrl: '', technologies: '' });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const MAX_FILE_SIZE = 3 * 1024 * 1024;


    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            ProjectsAPI.getProjectById(projectId)
                .then(project => {
                    setFormData({
                        name: project.name,
                        description: project.description,
                        repoUrl: project.repoUrl,
                        technologies: project.technologies || ''
                    });
                    setPreviewUrl(project.imageUrl);
                })
                .catch(() => setError("Falha ao carregar dados do projeto."))
                .finally(() => setLoading(false));
        }
    }, [projectId, isEditMode]);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const compressImage = (file: File): Promise<File> => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new window.Image();

            img.onload = () => {
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

        if (Object.values(formData).some(v => !v.trim())) {
            setError('Todos os campos de texto são obrigatórios.');
            return;
        }

        if (!isEditMode && !imageFile) {
            setError('Uma imagem é obrigatória para criar um novo projeto.');
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

        if (imageFile && imageFile.size > MAX_FILE_SIZE) {
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
        if (imageFile) payload.append('image', imageFile);

        try {
            if (isEditMode && projectId) {
                await ProjectsAPI.updateProject(projectId, payload);
            } else {
                await ProjectsAPI.createProject(payload);
            }
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

                        if (imageFile) {
                            setError(`Arquivo muito grande para o servidor. Tamanho: ${formatFileSize(imageFile.size)}. Tente uma imagem menor.`);
                        } else {
                            // Se, por algum motivo estranho, não tivermos o 'imageFile', mostramos uma mensagem genérica.
                            setError('Arquivo muito grande para o servidor. Tente uma imagem menor.');
                        }
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

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        router.push('/dashboard');
    };

    return {
        MAX_FILE_SIZE,
        isEditMode,
        formData,
        imageFile,
        previewUrl,
        loading,
        error,
        showSuccessModal,
        handleChange,
        handleImageChange,
        handleSubmit,
        handleCloseSuccessModal,
        formatFileSize,
        pageLoading: false

    };
}