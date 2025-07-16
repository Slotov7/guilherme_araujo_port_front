"use client";
import { IMaskInput } from "react-imask";

import { useContactForm } from "@/hooks/useContactForm";
import { marope, spaceGrotesk } from "@/app/fonts";
import FormButton from "@/components/FormButton";
import React from "react";

export default function ContactForm() {
    const { formData, status, responseMessage, handleChange, handleSubmit } = useContactForm();

    const inputClassName = `${marope.className} w-full bg-transparent border-2 border-gray-500 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200`;

    return (
        <div className={`bg-[#1a1a1a] p-6 md:p-8 rounded-2xl shadow-lg ${marope.className} w-full max-w-xl`}>
            <h2 className={`${spaceGrotesk.className} text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-white text-center md:text-left`}>
                Fala comigo!
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 w-full h-auto">
                <div className= "w-auto h-auto mr-9" >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2 ">Nome*</label>
                            <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} className={inputClassName} required placeholder="Guilherme" />
                        </div>
                        <div className="pb-2">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2 ">Sobrenome*</label>
                            <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} className={inputClassName} required placeholder="Araújo" />
                        </div>
                    </div>

                    <div className="pb-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2 ">Telefone</label>
                        <IMaskInput
                            mask="(00) 00000-0000"
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onAccept={(value) => handleChange({ target: { id: 'phone', value } } as any)}
                            className={inputClassName}
                            placeholder="(99) 99999-9999"
                        />
                    </div>

                    <div className="pb-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 ">E-mail*</label>
                        <input type="email" id="email" value={formData.email} onChange={handleChange} className={inputClassName} required placeholder="seu-email@exemplo.com" />
                    </div>

                    <div className="pb-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 ">Mensagem*</label>
                        <textarea id="message" rows={5} value={formData.message} onChange={handleChange} className={`${inputClassName} resize-none`} required placeholder="Dúvidas, Propostas, Sugestões, Elogios..." />
                    </div>

                    <div className="text-center pl-9 pt-2">
                        <FormButton
                            text={status === 'loading' ? 'Enviando...' : 'Enviar'}
                            type="submit"
                            disabled={status === 'loading'}
                            color="blue"
                        />
                    </div>
                </div>


                {responseMessage && (
                    <p className={`text-center text-sm mt-4 ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {responseMessage}
                    </p>
                )}
            </form>
        </div>
    );
}