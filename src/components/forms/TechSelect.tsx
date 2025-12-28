import React, { useState, useEffect, useRef } from "react";
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
  const [search, setSearch] = useState("");
  const [allOptions, setAllOptions] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Carregar todas as tecnologias ao montar
  useEffect(() => {
    const loadTechs = async () => {
      setLoading(true);
      try {
        const data = await api.Technologies.search("");
        setAllOptions(data);
      } catch (error) {
        console.error("Erro ao buscar tecnologias", error);
      } finally {
        setLoading(false);
      }
    };
    loadTechs();
  }, []);

  // Buscar tecnologias conforme digita
  useEffect(() => {
    if (!search.trim()) {
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await api.Technologies.search(search);
        setAllOptions(data);
      } catch (error) {
        console.error("Erro ao buscar tecnologias", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTech = (tech: Technology) => {
    const isSelected = selectedTechs.some((t) => t.id === tech.id);
    if (isSelected) {
      onChange(selectedTechs.filter((t) => t.id !== tech.id));
    } else {
      onChange([...selectedTechs, tech]);
    }
  };

  const isSelected = (techId: number) => {
    return selectedTechs.some((t) => t.id === techId);
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        Tecnologias
      </label>

      {/* Botão trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-transparent border-2 border-white hover:border-blue-400 focus:border-blue-500 rounded-lg px-4 py-3 text-left transition-colors flex items-center justify-between"
      >
        <span className="text-gray-300 text-base">
          {selectedTechs.length === 0
            ? "Selecionar Tecnologias"
            : `${selectedTechs.length} tecnologia(s) selecionada(s)`}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Popover/Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl flex flex-col max-h-[500px]">
          {/* Header com busca e botão limpar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar tecnologia..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              {selectedTechs.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm text-gray-700 whitespace-nowrap"
                >
                  Limpar ({selectedTechs.length})
                </button>
              )}
            </div>
          </div>

          {/* Lista de tecnologias */}
          <div className="flex-1 overflow-auto" style={{ maxHeight: "400px" }}>
            {loading ? (
              <div className="p-4 space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2 animate-pulse"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded flex-1" />
                  </div>
                ))}
              </div>
            ) : allOptions.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                Nenhuma tecnologia encontrada
              </div>
            ) : (
              <div className="p-2">
                {allOptions.map((tech) => {
                  const selected = isSelected(tech.id);
                  return (
                    <div
                      key={tech.id}
                      onClick={() => toggleTech(tech)}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      {/* Checkbox */}
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
                          selected
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-400 bg-white"
                        }`}
                      >
                        {selected && (
                          <svg
                            className="w-3.5 h-3.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Ícone */}
                      <img
                        src={tech.imageUrl}
                        alt={tech.name}
                        className="w-8 h-8 object-contain flex-shrink-0"
                      />

                      {/* Nome */}
                      <span className="text-sm text-gray-900">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tags selecionadas abaixo */}
      {selectedTechs.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedTechs.map((tech) => (
            <span
              key={tech.id}
              className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-blue-900 text-blue-100 border border-blue-700"
            >
              {tech.imageUrl && (
                <img
                  src={tech.imageUrl}
                  alt=""
                  className="w-4 h-4 mr-2 object-contain"
                />
              )}
              {tech.name}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(selectedTechs.filter((t) => t.id !== tech.id));
                }}
                className="ml-2 text-blue-300 hover:text-white font-bold focus:outline-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
