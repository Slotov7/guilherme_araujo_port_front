"use client";

import {useState, FormEvent, ChangeEvent, useEffect} from 'react';
import axios from 'axios';
import {CvAPI} from "@/services/api";

export function useCv() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (filePreviewUrl) {
                URL.revokeObjectURL(filePreviewUrl);
            }
        };
    }, [filePreviewUrl]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // Limpa a URL antiga sempre que um novo ficheiro é selecionado
        if (filePreviewUrl) {
            URL.revokeObjectURL(filePreviewUrl);
        }

        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
            setFilePreviewUrl(URL.createObjectURL(file));
            setMessage('Ficheiro PDF selecionado. Pronto para o upload.');
            setStatus('idle');
        } else {
            setSelectedFile(null);
            if (file) {
                setMessage('Erro: Por favor, selecione um ficheiro PDF.');
                setStatus('error');
            } else {
                setMessage('');
                setStatus('idle');
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectedFile) {
            setMessage('Nenhum ficheiro PDF selecionado para o upload.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setMessage('A fazer o upload do currículo...');

        const formData = new FormData();
        formData.append('cv', selectedFile);

        try {
            await CvAPI.uploadCv(formData);

            setStatus('success');
            setMessage('Currículo atualizado com sucesso!');
            setSelectedFile(null);
        } catch (err: any) {
            console.error("Erro completo no upload:", err);
            setStatus('error');


            let errorMessage = 'Falha no upload. Tente novamente mais tarde.';


            if (err.response && err.response.data) {
                if (typeof err.response.data === 'string' && err.response.data.length < 100) {
                    errorMessage = err.response.data;
                }
                else if (err.response.data.message) {
                    errorMessage = err.response.data.message;
                }
            }

            setMessage(errorMessage);
        }
    };
    const handleDownloadCv = async () => {
        const url = "https://res.cloudinary.com/dqtwohf2x/raw/portfolio_cv.pdf";

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Erro ao baixar o arquivo");

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "Curriculo_Guilherme_Araujo.pdf";
            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error("Erro ao baixar o CV:", error);
        }
    };


    return {
        selectedFile,
        status,
        filePreviewUrl,
        message,
        handleDownloadCv,
        handleFileChange,
        handleSubmit,
        setStatus
    };
}