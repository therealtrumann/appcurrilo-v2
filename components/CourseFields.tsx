"use client";
import { Course } from "@/types/resume";
import { Plus, Trash2 } from "lucide-react";

function genId() { return Math.random().toString(36).slice(2); }

interface Props {
  courses: Course[];
  onChange: (courses: Course[]) => void;
}

export default function CourseFields({ courses, onChange }: Props) {
  const add = () => {
    onChange([...courses, { id: genId(), name: "", institution: "", workload: "", status: "Concluído" }]);
  };

  const remove = (id: string) => onChange(courses.filter(c => c.id !== id));

  const update = (id: string, field: keyof Course, value: string) => {
    onChange(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  return (
    <div className="space-y-4">
      {courses.map((course, i) => (
        <div key={course.id} className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-700">Curso {i + 1}</h4>
            {courses.length > 0 && (
              <button type="button" onClick={() => remove(course.id)} className="text-red-400 hover:text-red-600 p-1 rounded">
                <Trash2 size={18} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome do curso</label>
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white" value={course.name} onChange={e => update(course.id, "name", e.target.value)} placeholder="Ex: Formação em Atendimento ao Cliente" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white" value={course.institution} onChange={e => update(course.id, "institution", e.target.value)} placeholder="Ex: Google, Sebrae, Udemy..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Carga horária (h)</label>
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white" value={course.workload || ""} onChange={e => update(course.id, "workload", e.target.value)} placeholder="Ex: 40" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white" value={course.status} onChange={e => update(course.id, "status", e.target.value as Course["status"])}>
                <option value="Concluído">Concluído</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Não informado">Não informado</option>
              </select>
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-2 text-[#7A1515] font-medium border-2 border-dashed border-[#7A1515]/40 hover:border-[#7A1515] rounded-xl px-5 py-3 w-full justify-center hover:bg-[#f5e8e8] transition-colors">
        <Plus size={18} /> Adicionar curso
      </button>
    </div>
  );
}
