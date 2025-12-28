import React, { useState, useEffect } from "react";
import { Technology } from "@/types/project";
import api from "@/services/api";

interface TechSelectProps {
  selectedTechs: Technology[];
  onChange: (techs: Technology[]) => void;
}

export default function TechSelect({
  selectedTechs,
  onChange,
}: TechSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Carregar tecnologias iniciais ao montar
  useEffect(() => {
    const loadInitialTechs = async () => {
      setLoading(true);
      try {
        const data = await api.Technologies.search("");
        setOptions(data);
      } catch (error) {
        console.error("Erro ao buscar tecnologias", error);
      } finally {
        setLoading(false);
      }
    };
    loadInitialTechs();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await api.Technologies.search(searchTerm);
        setOptions(data);
        if (data.length > 0) {
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Erro ao buscar tecnologias", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSelect = (tech: Technology) => {
    if (selectedTechs.some((t) => t.id === tech.id)) {
      setSearchTerm("");
      setIsOpen(false);
      return;
    }

    onChange([...selectedTechs, tech]);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleRemove = (techId: number) => {
    onChange(selectedTechs.filter((t) => t.id !== techId));
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        Tecnologias
      </label>

      <div
        className="w-full bg-transparent border-2 border-white focus-within:border-blue-500 rounded-lg p-2 flex flex-wrap gap-2 min-h-[50px] transition-colors"
        onClick={() => document.getElementById("tech-input")?.focus()}
      >
        {selectedTechs.map((tech) => (
          <span
            key={tech.id}
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-100 border border-blue-700"
          >
            {tech.imageUrl && (
              <img
                src={tech.imageUrl}
                alt=""
                className="w-4 h-4 mr-1 object-contain"
              />
            )}
            {tech.name}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(tech.id);
              }}
              className="ml-1.5 text-blue-300 hover:text-white font-bold focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}

        <input
          id="tech-input"
          type="text"
          placeholder={
            selectedTechs.length === 0
              ? "Pesquisar tecnologia (ex: Java, React)..."
              : ""
          }
          className="bg-transparent border-none outline-none text-lg text-white flex-grow min-w-[150px] placeholder-gray-400 h-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (options.length > 0) setIsOpen(true);
          }}
        />
      </div>

      {isOpen && (options.length > 0 || loading) && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <ul className="absolute z-20 w-full mt-1 bg-[#1a1a1a] border border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {loading ? (
              <li className="px-4 py-2 text-gray-400 text-sm">A carregar...</li>
            ) : (
              options.map((tech) => {
                const isSelected = selectedTechs.some((t) => t.id === tech.id);
                return (
                  <li
                    key={tech.id}
                    onClick={() => handleSelect(tech)}
                    className={`px-4 py-2 flex items-center gap-3 cursor-pointer transition-colors ${
                      isSelected // Keep selection highlight or make it subtle? The image had white bg for unchecked.
                        ? // I'll keep hover effects but rely on checkbox for state.
                          "bg-blue-900 bg-opacity-20"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    {/* Checkbox Visual */}
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "border-gray-500 bg-transparent"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>

                    <img
                      src={tech.imageUrl}
                      alt={tech.name}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="text-sm text-gray-200">{tech.name}</span>
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
