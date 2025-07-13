// "use client";
//
// import FormButton from '@/components/FormButton';
// import React, { ChangeEvent, FormEvent } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
//
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
//
// interface FormCvProps {
//     status: 'idle' | 'loading' | 'success' | 'error';
//     message: string;
//     selectedFile: File | null;
//     handleSubmit: (e: FormEvent) => void;
//     handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
//     filePreviewUrl: string | null;
// }
//
// export default function FormCv({
//                                    status,
//                                    message,
//                                    selectedFile,
//                                    handleSubmit,
//                                    filePreviewUrl,
//                                    handleFileChange
//                                }: FormCvProps) {
//
//
//     return (
//         <div className="w-full min-h-full flex flex-col items-center justify-center p-8 text-white">
//             <div className="text-center">
//                 <h1 className="text-3xl font-bold mb-8">Gerir Currículo</h1>
//             </div>
//             <div className="max-w-xl w-full bg-[#1C1C1C] p-8 rounded-2xl shadow-lg">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border-2 border-gray-500">
//                         {selectedFile && filePreviewUrl ? (
//                             <Document file={filePreviewUrl} loading="A carregar pré-visualização...">
//                                 <Page pageNumber={1} width={500} renderTextLayer={false} renderAnnotationLayer={false} />
//                             </Document>
//                         ) : (
//                             <div className="text-gray-400 text-center">
//                                 <p>Pré-visualização do PDF</p>
//                             </div>
//                         )}
//                     </div>
//
//                     <div className="mb-4">
//                         <label htmlFor="cv-upload" className="block text-lg font-medium mb-3">Carregar novo CV (apenas PDF)</label>
//                         <input
//                             id="cv-upload"
//                             type="file"
//                             accept="application/pdf"
//                             onChange={handleFileChange}
//                             className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
//                         />
//                         {selectedFile && <p className="text-sm mt-2 text-gray-300">Ficheiro selecionado: {selectedFile.name}</p>}
//                     </div>
//                     <div className="pt-2 text-center">
//                         <FormButton
//                             type="submit"
//                             text={status === 'loading' ? 'Enviando...' : 'Salvar Novo CV'}
//                             disabled={!selectedFile || status === 'loading'}
//                             color="green"
//                             fullWidth={true}
//                         />
//                     </div>
//                     {message && (status === 'idle' || status === 'error') && (
//                         <p className={`text-center text-sm mt-4 ${
//                             status === 'error' ? 'text-red-400' : 'text-gray-400'
//                         }`}>
//                             {message}
//                         </p>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// }