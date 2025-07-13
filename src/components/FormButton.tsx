"use client";

import { marope } from "@/app/fonts"; // Verifique se o caminho da fonte está correto

interface FormButtonProps {
    text: string;
    type?: 'submit' | 'button';
    onClick?: () => void;
    disabled?: boolean;
    color?: 'blue' | 'red' | 'green';
    fullWidth?: boolean;
}

export default function FormButton({
                                       text,
                                       type = 'button',
                                       onClick,
                                       disabled = false,
                                       color = 'blue',
                                       fullWidth = false
                                   }: FormButtonProps) {

    // Mapeamento de cores para as classes do Tailwind
    const colorClasses = {
        blue: 'bg-blue-600 hover:bg-blue-700',
        red: 'bg-red-600 hover:bg-red-700',
        green: 'bg-green-600 hover:bg-green-700'
    };

    const buttonColorClass = colorClasses[color] || colorClasses.blue;
    const widthClass = fullWidth ? 'w-full' : 'min-w-32 px-4';
    const handleClick = () => {
        if (onClick && !disabled) {
            onClick();
        }
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={disabled}
            className={`
                ${marope?.className || ''} 
                ${widthClass} 
                ${buttonColorClass}
                text-white font-semibold text-lg py-1.5 rounded-md 
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2
                disabled:bg-gray-500 disabled:opacity-70 cursor-pointer
                disabled:hover:bg-gray-500
            `.replace(/\s+/g, ' ').trim()}
            aria-label={text}>
            {text}
        </button>
    );
}