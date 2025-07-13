import {marope, spaceGrotesk} from "@/app/fonts";

interface SucessModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
}

export default function SuccessModal({ isOpen, message, onClose }: SucessModalProps) {
    // Se não for para estar aberto, não renderiza nada
    if (!isOpen) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1E1E1E] text-white p-6 rounded-xl shadow-lg max-w-md w-full text-center mx-4">
                <div className="flex justify-center mb-4">
                    {/* Ícone de Sucesso */}
                    <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className={`${spaceGrotesk.className} text-xl font-bold mb-4`}>Sucesso!</h2>
                <p className={`${marope.className} mb-6 text-gray-300`}>
                    {message}
                </p>
                <button
                    onClick={onClose}
                    className={`${marope.className} px-6 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold transition-colors`}
                >
                    Fechar
                </button>
            </div>
        </div>
    )
}
