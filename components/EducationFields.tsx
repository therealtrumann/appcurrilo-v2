"use client";
import { Education } from "@/types/resume";
import { Plus, Trash2 } from "lucide-react";

function genId() { return Math.random().toString(36).slice(2); }

const levels = [
  "Ensino Médio Completo",
  "Ensino Médio Incompleto",
  "Técnico",
  "Graduação Cursando",
  "Graduação Concluída",
  "Pós-graduação / MBA",
  "Outro",
];

interface Props {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export default function EducationFields({ education, onChange }: Props) {
  const add = () => {
    onChange([...education, { id: genId(), level: "", course: "", institution: "", year: "" }]);
  };
  const remove = (id: string) => onChange(education.filter(e => e.id !== id));
  const update = (id: string, field: keyof Education, value: string) => {
    onChange(education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  return (
    <div className="space-y-4">
      {education.map((edu, i) => (
        <div key={edu.id} className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-700">Formação {i + 1}</h4>
            {education.length > 0 && (
              <button type="button" onClick={() => remove(edu.id)} className="text-red-400 hover:text-red-600 p-1 rounded">
                <Trash2 size={18} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nível *</label>
              <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white" value={edu.level} onChange={e => update(edu.id, "level", e.target.value)}>
                <option value="">Selecione...</option>
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Curso / Área</label>
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white" value={edu.course || ""} onChange={e => update(edu.id, "course", e.target.value)} placeholder="Ex: Administração, Marketing..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white" value={edu.institution || ""} onChange={e => update(edu.id, "institution", e.target.value)} placeholder="Ex: UNOPAR, USP, ETEC..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ano de conclusão ou situação</label>
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white" value={edu.year || ""} onChange={e => update(edu.id, "year", e.target.value)} placeholder="Ex: 2023 ou cursando" />
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-2 text-[#7A1515] font-medium border-2 border-dashed border-[#7A1515]/40 hover:border-[#7A1515] rounded-xl px-5 py-3 w-full justify-center hover:bg-[#f5e8e8] transition-colors">
        <Plus size={18} /> Adicionar formação
      </button>
    </div>
  );
}
