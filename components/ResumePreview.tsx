"use client";
import { ResumeData, GeneratedResume } from "@/types/resume";
import { TemplateId } from "@/lib/templates";
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

interface Props {
  data: ResumeData;
  generated: GeneratedResume;
  templateId?: TemplateId;
}

export default function ResumePreview({ data, generated, templateId = "classico" }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    await navigator.clipboard.writeText(generated.professionalSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (templateId === "moderno") {
    return <PreviewModerno data={data} generated={generated} copied={copied} onCopy={handleCopySummary} />;
  }

  const cfg = CONFIGS[templateId];

  return (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-2xl mx-auto border border-gray-100">
      {/* Header */}
      <div style={{ backgroundColor: cfg.headerBg, borderBottom: `3px solid ${cfg.accent}` }} className="p-8">
        <div className="flex items-start gap-4">
          {data.photo && (
            <img
              src={data.photo}
              alt="Foto"
              className="w-20 h-20 rounded-full object-cover border-2 flex-shrink-0"
              style={{ borderColor: cfg.accent }}
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1" style={{ color: cfg.headerText }}>{data.fullName}</h1>
            <p className="text-sm mb-3" style={{ color: cfg.headerBg === "#ffffff" ? cfg.accent : cfg.headerText, opacity: cfg.headerBg !== "#ffffff" ? 0.85 : 1 }}>
              {generated.professionalTitle}
            </p>
            <div className="flex flex-wrap gap-3 text-xs" style={{ color: cfg.headerBg === "#ffffff" ? "#6b7280" : "rgba(255,255,255,0.75)" }}>
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
          <SectionTitle accent={cfg.accent} minimal={cfg.minimal}>{cfg.sectionLabel("Resumo Profissional")}</SectionTitle>
          <p className="text-sm text-gray-700 leading-relaxed">{generated.professionalSummary}</p>
          <button onClick={handleCopySummary} className="mt-3 flex items-center gap-1 text-xs hover:underline" style={{ color: cfg.accent }}>
            {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
            {copied ? "Copiado!" : "Copiar resumo"}
          </button>
        </div>

        {/* Habilidades */}
        {(generated.professionalSkills.length > 0 || generated.technicalSkills.length > 0) && (
          <div>
            <SectionTitle accent={cfg.accent} minimal={cfg.minimal}>{cfg.sectionLabel("Habilidades")}</SectionTitle>
            {generated.professionalSkills.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Competências Profissionais</p>
                {cfg.minimal
                  ? <p className="text-sm text-gray-700">{generated.professionalSkills.join(" · ")}</p>
                  : <div className="flex flex-wrap gap-2">
                    {generated.professionalSkills.map((s, i) => (
                      <span key={i} style={{ backgroundColor: cfg.tagBg, color: cfg.tagText }} className="text-xs px-3 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                }
              </div>
            )}
            {generated.technicalSkills.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Habilidades Técnicas</p>
                {cfg.minimal
                  ? <p className="text-sm text-gray-700">{generated.technicalSkills.join(" · ")}</p>
                  : <div className="flex flex-wrap gap-2">
                    {generated.technicalSkills.map((s, i) => (
                      <span key={i} style={{ backgroundColor: cfg.tagBg, color: cfg.tagText }} className="text-xs px-3 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                }
              </div>
            )}
          </div>
        )}

        {/* Experiências */}
        {generated.experiences.length > 0 && (
          <div>
            <SectionTitle accent={cfg.accent} minimal={cfg.minimal}>{cfg.sectionLabel("Experiência Profissional")}</SectionTitle>
            <div className="space-y-5">
              {generated.experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-sm text-gray-900">{exp.company}</span>
                    <span className="text-xs text-gray-500">{exp.startDate} – {exp.endDate}{exp.location ? ` · ${exp.location}` : ""}</span>
                  </div>
                  <p className="text-xs italic mb-2" style={{ color: cfg.accent }}>{exp.role}</p>
                  <ul className="space-y-1">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2 text-xs text-gray-700">
                        <span style={{ color: cfg.accent }}>•</span>
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
            <SectionTitle accent={cfg.accent} minimal={cfg.minimal}>{cfg.sectionLabel("Cursos e Formações Complementares")}</SectionTitle>
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
            <SectionTitle accent={cfg.accent} minimal={cfg.minimal}>{cfg.sectionLabel("Formação Acadêmica")}</SectionTitle>
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
          <SectionTitle accent={cfg.accent} minimal={cfg.minimal}>{cfg.sectionLabel("Informações Complementares")}</SectionTitle>
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            <span><strong style={{ color: cfg.accent }}>Disponibilidade:</strong> {generated.availability}</span>
            <span><strong style={{ color: cfg.accent }}>Regime:</strong> {generated.workPreference}</span>
            {generated.languages && <span><strong style={{ color: cfg.accent }}>Idiomas:</strong> {generated.languages}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Moderno (two-column layout) ---

function PreviewModerno({ data, generated, copied, onCopy }: {
  data: ResumeData;
  generated: GeneratedResume;
  copied: boolean;
  onCopy: () => void;
}) {
  const SIDEBAR = "#1E1E1E";
  const ACCENT = "#C0392B";
  const allSkills = [...generated.professionalSkills, ...generated.technicalSkills];

  return (
    <div className="shadow-2xl rounded-2xl overflow-hidden max-w-2xl mx-auto border border-gray-100 flex" style={{ minHeight: 600 }}>
      {/* Sidebar */}
      <div style={{ backgroundColor: SIDEBAR, width: "36%", flexShrink: 0 }} className="p-6 flex flex-col gap-5">
        {data.photo && (
          <img src={data.photo} alt="Foto" className="w-20 h-20 rounded-full object-cover border-2 mx-auto" style={{ borderColor: ACCENT }} />
        )}
        <div>
          <h1 className="text-lg font-bold text-white leading-tight">{data.fullName}</h1>
          <p className="text-xs mt-1" style={{ color: ACCENT }}>{generated.professionalTitle}</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: ACCENT }}>Contato</p>
          <p className="text-xs text-gray-300">📍 {data.cityState}</p>
          <p className="text-xs text-gray-300">📱 {data.phone}</p>
          <p className="text-xs text-gray-300">✉ {data.email}</p>
          {data.linkedin && <p className="text-xs text-gray-300 break-all">{data.linkedin}</p>}
        </div>
        {allSkills.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: ACCENT }}>Habilidades</p>
            <div className="flex flex-col gap-1">
              {allSkills.slice(0, 10).map((s, i) => (
                <span key={i} className="text-xs text-gray-300">› {s}</span>
              ))}
            </div>
          </div>
        )}
        {generated.languages && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: ACCENT }}>Idiomas</p>
            <p className="text-xs text-gray-300">{generated.languages}</p>
          </div>
        )}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: ACCENT }}>Disponibilidade</p>
          <p className="text-xs text-gray-300">{generated.availability}</p>
          <p className="text-xs text-gray-300 mt-0.5">{generated.workPreference}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white flex-1 p-6 space-y-5 overflow-y-auto">
        {/* Resumo */}
        <div>
          <ModernoSectionTitle accent={ACCENT}>Resumo Profissional</ModernoSectionTitle>
          <p className="text-xs text-gray-700 leading-relaxed">{generated.professionalSummary}</p>
          <button onClick={onCopy} className="mt-2 flex items-center gap-1 text-xs hover:underline" style={{ color: ACCENT }}>
            {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
            {copied ? "Copiado!" : "Copiar resumo"}
          </button>
        </div>

        {/* Experiências */}
        {generated.experiences.length > 0 && (
          <div>
            <ModernoSectionTitle accent={ACCENT}>Experiência Profissional</ModernoSectionTitle>
            <div className="space-y-4">
              {generated.experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-gray-900">{exp.company}</span>
                    <span className="text-xs text-gray-400">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <p className="text-xs italic mb-1.5" style={{ color: ACCENT }}>{exp.role}</p>
                  <ul className="space-y-0.5">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-1.5 text-xs text-gray-600">
                        <span style={{ color: ACCENT }}>•</span><span>{b}</span>
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
            <ModernoSectionTitle accent={ACCENT}>Cursos</ModernoSectionTitle>
            {generated.courses.map((c, i) => (
              <div key={i} className="mb-1.5">
                <p className="text-xs font-bold text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-500">{[c.institution, c.workload ? `${c.workload}h` : null].filter(Boolean).join(" · ")}</p>
              </div>
            ))}
          </div>
        )}

        {/* Formação */}
        {generated.education.length > 0 && (
          <div>
            <ModernoSectionTitle accent={ACCENT}>Formação Acadêmica</ModernoSectionTitle>
            {generated.education.map((e, i) => (
              <div key={i} className="mb-1.5">
                <p className="text-xs font-bold text-gray-800">{e.level}</p>
                <p className="text-xs text-gray-500">{[e.course, e.institution, e.year].filter(Boolean).join(" · ")}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Shared sub-components ---

function SectionTitle({ children, accent, minimal }: { children: React.ReactNode; accent: string; minimal?: boolean }) {
  return (
    <h2
      className="text-xs font-bold uppercase tracking-wider mb-3 pb-1"
      style={{
        color: accent,
        borderBottom: `1px solid ${minimal ? accent : "#e0e0e0"}`,
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </h2>
  );
}

function ModernoSectionTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accent, borderColor: "#f3f4f6" }}>
      {children}
    </h2>
  );
}

// --- Per-template style configs ---

interface TemplateConfig {
  accent: string;
  headerBg: string;
  headerText: string;
  tagBg: string;
  tagText: string;
  minimal: boolean;
  sectionLabel: (s: string) => string;
}

const CONFIGS: Record<Exclude<TemplateId, "moderno">, TemplateConfig> = {
  classico: {
    accent: "#7A1515",
    headerBg: "#ffffff",
    headerText: "#1a1a1a",
    tagBg: "#f3f4f6",
    tagText: "#374151",
    minimal: false,
    sectionLabel: s => s,
  },
  minimalista: {
    accent: "#1a1a1a",
    headerBg: "#ffffff",
    headerText: "#1a1a1a",
    tagBg: "#f3f4f6",
    tagText: "#1a1a1a",
    minimal: true,
    sectionLabel: s => s,
  },
  corporativo: {
    accent: "#1E3A8A",
    headerBg: "#1E3A8A",
    headerText: "#ffffff",
    tagBg: "#EFF6FF",
    tagText: "#1E3A8A",
    minimal: false,
    sectionLabel: s => s,
  },
};
