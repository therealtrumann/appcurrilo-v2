"use client";
import { ResumeData, GeneratedResume } from "@/types/resume";
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

const WINE = "#7A1515";

interface Props {
  data: ResumeData;
  generated: GeneratedResume;
}

export default function ResumePreview({ data, generated }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    await navigator.clipboard.writeText(generated.professionalSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-2xl mx-auto border border-gray-100">
      {/* Header */}
      <div className="p-8" style={{ borderBottom: `3px solid ${WINE}` }}>
        <div className="flex items-start gap-4">
          {data.photo && (
            <img
              src={data.photo}
              alt="Foto"
              className="w-20 h-20 rounded-full object-cover border-2"
              style={{ borderColor: WINE }}
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{data.fullName}</h1>
            <p className="text-sm mb-3" style={{ color: WINE }}>{generated.professionalTitle}</p>
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <span>📍 {data.cityState}</span>
              <span>📱 {data.phone}</span>
              <span>✉ {data.email}</span>
              {data.linkedin && <span>LinkedIn: {data.linkedin}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Resumo */}
        <div>
          <SectionTitle>Resumo Profissional</SectionTitle>
          <p className="text-sm text-gray-700 leading-relaxed">{generated.professionalSummary}</p>
          <button
            onClick={handleCopySummary}
            className="mt-3 flex items-center gap-1 text-xs text-[#7A1515] hover:underline"
          >
            {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
            {copied ? "Copiado!" : "Copiar resumo"}
          </button>
        </div>

        {/* Habilidades */}
        {(generated.professionalSkills.length > 0 || generated.technicalSkills.length > 0) && (
          <div>
            <SectionTitle>Habilidades</SectionTitle>
            {generated.professionalSkills.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Competências Profissionais</p>
                <div className="flex flex-wrap gap-2">
                  {generated.professionalSkills.map((s, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {generated.technicalSkills.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Habilidades Técnicas</p>
                <div className="flex flex-wrap gap-2">
                  {generated.technicalSkills.map((s, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Experiências */}
        {generated.experiences.length > 0 && (
          <div>
            <SectionTitle>Experiência Profissional</SectionTitle>
            <div className="space-y-5">
              {generated.experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-sm text-gray-900">{exp.company}</span>
                    <span className="text-xs text-gray-500">{exp.startDate} – {exp.endDate}{exp.location ? ` · ${exp.location}` : ""}</span>
                  </div>
                  <p className="text-xs italic mb-2" style={{ color: WINE }}>{exp.role}</p>
                  <ul className="space-y-1">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2 text-xs text-gray-700">
                        <span style={{ color: WINE }}>•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cursos */}
        {generated.courses.length > 0 && (
          <div>
            <SectionTitle>Cursos e Formações Complementares</SectionTitle>
            <div className="space-y-2">
              {generated.courses.map((c, i) => (
                <div key={i}>
                  <p className="text-sm font-bold text-gray-800">{c.name}</p>
                  <p className="text-xs text-gray-500">
                    {[c.institution, c.workload ? `${c.workload}h` : null, c.status !== "Não informado" ? c.status : null].filter(Boolean).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formação */}
        {generated.education.length > 0 && (
          <div>
            <SectionTitle>Formação Acadêmica</SectionTitle>
            <div className="space-y-2">
              {generated.education.map((e, i) => (
                <div key={i}>
                  <p className="text-sm font-bold text-gray-800">{e.level}</p>
                  <p className="text-xs text-gray-500">{[e.course, e.institution, e.year].filter(Boolean).join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info complementares */}
        <div>
          <SectionTitle>Informações Complementares</SectionTitle>
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            <span><strong style={{ color: WINE }}>Disponibilidade:</strong> {generated.availability}</span>
            <span><strong style={{ color: WINE }}>Regime:</strong> {generated.workPreference}</span>
            {generated.languages && <span><strong style={{ color: WINE }}>Idiomas:</strong> {generated.languages}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: "#7A1515", borderColor: "#e0e0e0", letterSpacing: "0.08em" }}>
      {children}
    </h2>
  );
}
