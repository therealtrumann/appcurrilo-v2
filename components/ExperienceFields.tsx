"use client";
import { Experience } from "@/types/resume";
import { Plus, Trash2 } from "lucide-react";

function genId() {
  return Math.random().toString(36).slice(2);
}

interface Props {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
  error?: string;
}

export default function ExperienceFields({ experiences, onChange, error }: Props) {
  const add = () => {
    onChange([
      ...experiences,
      { id: genId(), company: "", role: "", startDate: "", endDate: "", location: "", activities: "", results: "" },
    ]);
  };

  const remove = (id: string) => {
    onChange(experiences.filter(e => e.id !== id));
  };

  const update = (id: string, field: keyof Experience, value: string) => {
    onChange(experiences.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  return (
    <div className="space-y-6">
      {experiences.map((exp, i) => (
        <div key={exp.id} className="border border-gray-200 rounded-2xl p-5 bg-gray-50 relative">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-700">Experiência {i + 1}</h4>
            {experiences.length > 1 && (
              <button
                type="button"
                onClick={() => remove(exp.id)}
                className="text-red-400 hover:text-red-600 transition-colors p-1 rounded"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Empresa *</label>
              <input
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white"
                value={exp.company}
                onChange={e => update(exp.id, "company", e.target.value)}
                placeholder="Nome da empresa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cargo / Função *</label>
              <input
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white"
                value={exp.role}
                onChange={e => update(exp.id, "role", e.target.value)}
                placeholder="Ex: Atendente, Vendedor..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Início *</label>
              <input
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white"
                value={exp.startDate}
                onChange={e => update(exp.id, "startDate", e.target.value)}
                placeholder="Ex: Jan/2022"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fim *</label>
              <input
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white"
                value={exp.endDate}
                onChange={e => update(exp.id, "endDate", e.target.value)}
                placeholder="Ex: Dez/2023 ou atual"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cidade/UF</label>
              <input
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white"
                value={exp.location || ""}
                onChange={e => update(exp.id, "location", e.target.value)}
                placeholder="Ex: São Paulo/SP"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">O que você fazia no dia a dia? *</label>
              <p className="text-xs text-gray-500 mb-2">Descreva suas atividades principais. Se tiver resultados ou números, inclua. Ex: atendia 30 clientes por dia, batia metas, organizou planilhas, respondeu WhatsApp.</p>
              <textarea
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white min-h-[100px] resize-none"
                value={exp.activities}
                onChange={e => update(exp.id, "activities", e.target.value)}
                placeholder="Descreva suas atividades do jeito que você se lembra..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Resultados ou números (opcional)</label>
              <input
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white"
                value={exp.results || ""}
                onChange={e => update(exp.id, "results", e.target.value)}
                placeholder="Ex: atendia 40 clientes por dia, bati meta 3 meses seguidos..."
              />
            </div>
          </div>
        </div>
      ))}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="button"
        onClick={add}
        className="flex items-center gap-2 text-[#7A1515] font-medium border-2 border-dashed border-[#7A1515]/40 hover:border-[#7A1515] rounded-xl px-5 py-3 w-full justify-center hover:bg-[#f5e8e8] transition-colors"
      >
        <Plus size={18} /> Adicionar outra experiência
      </button>
    </div>
  );
}
