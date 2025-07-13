"use client";

import { marope } from "@/app/fonts";

// Definimos as props que o componente vai receber
interface ConfirmDeleteModalProps {
    isOpen: boolean;
    projectName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDeleteModal({ isOpen, projectName, onConfirm, onCancel }: ConfirmDeleteModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${marope.className} bg-[#1E1E1E] text-white justify-center text-center p-6 rounded-xl shadow-lg max-w-md w-full mx-4`}>
                <h2 className="text-xl font-bold mb-4">Confirmar exclusão</h2>
                <p>Tem certeza que deseja apagar o projeto <strong>{projectName}</strong>? Esta ação não pode ser desfeita.</p>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white transition cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition cursor-pointer"
                    >
                        Apagar
                    </button>
                </div>
            </div>
        </div>
    );
}