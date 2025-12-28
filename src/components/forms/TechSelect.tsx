import React, { useState, useEffect } from 'react';
import { Technology } from '@/types/project';
import api from '@/services/api';

interface TechSelectProps {
    selectedTechs: Technology[];
    onChange: (techs: Technology[]) => void;
}

export default function TechSelect({ selectedTechs, onChange }: TechSelectProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState<Technology[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchTerm.trim().length === 0) {
                setOptions([]);
                return;
            }

            setLoading(true);
            try {
                const data = await api.Technologies.search(searchTerm);
                setOptions(data);
                setIsOpen(true);
            } catch (error) {
                console.error("Erro ao buscar tecnologias", error);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleSelect = (tech: Technology) => {
        if (selectedTechs.some(t => t.id === tech.id)) {
            setSearchTerm('');
            setIsOpen(false);
            return;
        }

        onChange([...selectedTechs, tech]);
        setSearchTerm('');
        setIsOpen(false);
    };

    const handleRemove = (techId: number) => {
        onChange(selectedTechs.filter(t => t.id !== techId));
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tecnologias</label>

            <div className="flex flex-wrap gap-2 mb-2 min-h-[30px]">
                {selectedTechs.map(tech => (
                    <span key={tech.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {tech.name}
                        <button
                            type="button"
                            onClick={() => handleRemove(tech.id)}
                            className="ml-1.5 text-blue-600 hover:text-blue-800 font-bold focus:outline-none"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>

            <input
                type="text"
                placeholder="Pesquisar tecnologia (ex: Java, React)..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => { if(options.length > 0) setIsOpen(true) }}
            />

            {isOpen && (options.length > 0 || loading) && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {loading ? (
                            <li className="px-4 py-2 text-gray-500 text-sm">A carregar...</li>
                        ) : (
                            options.map(tech => {
                                const isSelected = selectedTechs.some(t => t.id === tech.id);
                                return (
                                    <li
                                        key={tech.id}
                                        onClick={() => handleSelect(tech)}
                                        className={`px-4 py-2 flex items-center gap-3 cursor-pointer transition-colors ${
                                            isSelected ? 'bg-gray-100 opacity-50' : 'hover:bg-blue-50'
                                        }`}
                                    >
                                        <img src={tech.imageUrl} alt={tech.name} className="w-6 h-6 object-contain" />
                                        <span className="text-sm text-gray-700">{tech.name}</span>
                                        {isSelected && <span className="ml-auto text-xs text-green-600 font-bold">✓</span>}
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </>
            )}
        </div>
    );
}