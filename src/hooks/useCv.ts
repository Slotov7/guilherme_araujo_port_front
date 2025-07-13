// "use client";
//
// import {useState, FormEvent, ChangeEvent, useEffect} from 'react';
// import {CvAPI} from "@/services/api";
//
// export function useCv() {
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
//     const [message, setMessage] = useState('');
//     const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
//
//     useEffect(() => {
//         return () => {
//             if (filePreviewUrl) {
//                 URL.revokeObjectURL(filePreviewUrl);
//             }
//         };
//     }, [filePreviewUrl]);
//
//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         // Limpa a URL antiga sempre que um novo ficheiro é selecionado
//         if (filePreviewUrl) {
//             URL.revokeObjectURL(filePreviewUrl);
//         }
//
//         if (file && file.type === "application/pdf") {
//             setSelectedFile(file);
//             setFilePreviewUrl(URL.createObjectURL(file));
//             setMessage('Ficheiro PDF selecionado. Pronto para o upload.');
//             setStatus('idle');
//         } else {
//             setSelectedFile(null);
//             if (file) {
//                 setMessage('Erro: Por favor, selecione um ficheiro PDF.');
//                 setStatus('error');
//             } else {
//                 setMessage('');
//                 setStatus('idle');
//             }
//         }
//     };
//
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         if (!selectedFile) {
//             setMessage('Nenhum ficheiro PDF selecionado para o upload.');
//             setStatus('error');
//             return;
//         }
//
//         setStatus('loading');
//         setMessage('A fazer o upload do currículo...');
//
//         const formData = new FormData();
//         formData.append('file', selectedFile);
//
//         try {
//             await CvAPI.uploadCv(formData);
//
//             setStatus('success');
//             setMessage('Currículo atualizado com sucesso!');
//             setSelectedFile(null);
//         } catch (err: any) {
//             console.error("Erro completo no upload:", err);
//             setStatus('error');
//
//
//             let errorMessage = 'Falha no upload. Tente novamente mais tarde.';
//
//
//             if (err.response && err.response.data) {
//                 if (typeof err.response.data === 'string' && err.response.data.length < 100) {
//                     errorMessage = err.response.data;
//                 }
//                 else if (err.response.data.message) {
//                     errorMessage = err.response.data.message;
//                 }
//             }
//
//             setMessage(errorMessage);
//         }
//     };
//     const handleDownloadCv = () => {
//
//         const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
//         const downloadUrl = `${backendUrl}/public/cv/download`;
//         window.open(downloadUrl, '_blank');
//     };
//
//
//     return {
//         selectedFile,
//         status,
//         filePreviewUrl,
//         message,
//         handleDownloadCv,
//         handleFileChange,
//         handleSubmit,
//         setStatus
//     };
// }