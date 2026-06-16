"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ResumeData, Experience, Course, Education, GeneratedResume } from "@/types/resume";
import { saveToStorage, loadFromStorage, clearStorage, saveCurrentStep, loadCurrentStep } from "@/lib/storage";
import { validateStep1, validateStep2, validateStep3, validateStep4, validateStep6, validateStep7, ValidationErrors } from "@/lib/validators";
import { generateResumeContent } from "@/lib/resume-generator";
import { generatePDF, getFileName } from "@/lib/pdf-generator";
import ProgressBar from "@/components/ProgressBar";
import StepNavigation from "@/components/StepNavigation";
import ExperienceFields from "@/components/ExperienceFields";
import CourseFields from "@/components/CourseFields";
import EducationFields from "@/components/EducationFields";
import ResumePreview from "@/components/ResumePreview";
import { CheckCircle, AlertCircle, RotateCcw, Download, Loader2 } from "lucide-react";

function genId() { return Math.random().toString(36).slice(2); }

const STEPS = [
  "Identificação",
  "Objetivo",
  "Habilidades",
  "Experiências",
  "Cursos",
  "Formação",
  "Finalizando",
  "Revisão",
];

const emptyData: ResumeData = {
  fullName: "",
  cityState: "",
  phone: "",
  email: "",
  linkedin: "",
  photo: "",
  targetRole: "",
  story: "",
  technicalSkills: "",
  behavioralSkills: "",
  experiences: [{ id: genId(), company: "", role: "", startDate: "", endDate: "", location: "", activities: "", results: "" }],
  courses: [],
  educationLevel: "",
  education: [{ id: genId(), level: "", course: "", institution: "", year: "" }],
  availability: "",
  workPreference: "",
  languages: "",
};

const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7A1515]/30 focus:border-[#7A1515] bg-white text-base";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";
const hintClass = "text-xs text-gray-500 mt-1";
const errorClass = "text-red-500 text-xs mt-1";

function Field({ label, hint, error, required, children }: { label: string; hint?: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
      {children}
      {hint && <p className={hintClass}>{hint}</p>}
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

export default function FormPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ResumeData>(emptyData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [generated, setGenerated] = useState<GeneratedResume | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const photoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = loadFromStorage();
    const savedStep = loadCurrentStep();
    if (saved && Object.keys(saved).length > 0) {
      setData(prev => ({
        ...prev,
        ...saved,
        experiences: (saved.experiences && saved.experiences.length > 0) ? saved.experiences : prev.experiences,
        education: (saved.education && saved.education.length > 0) ? saved.education : prev.education,
        courses: saved.courses || [],
      }));
      setStep(savedStep || 0);
    }
  }, []);

  const save = useCallback((d: Partial<ResumeData>) => {
    saveToStorage(d);
  }, []);

  const update = (field: keyof ResumeData, value: unknown) => {
    const next = { ...data, [field]: value };
    setData(next);
    save(next);
    if (errors[field]) setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const photoData = ev.target?.result as string;
      update("photo", photoData);
    };
    reader.readAsDataURL(file);
  };

  const validateAndNext = () => {
    let errs: ValidationErrors = {};
    if (step === 0) errs = validateStep1(data);
    else if (step === 1) errs = validateStep2(data);
    else if (step === 2) errs = validateStep3(data);
    else if (step === 3) errs = validateStep4(data);
    else if (step === 5) errs = validateStep6(data);
    else if (step === 6) errs = validateStep7(data);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const nextStep = step + 1;
    setStep(nextStep);
    saveCurrentStep(nextStep);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    const prev = step - 1;
    setStep(prev);
    saveCurrentStep(prev);
    setErrors({});
    window.scrollTo(0, 0);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 800));
    const result = generateResumeContent(data);
    setGenerated(result);
    setIsGenerating(false);
    setStep(7);
    saveCurrentStep(7);
    window.scrollTo(0, 0);
  };

  const handleDownload = async () => {
    if (!generated) return;
    setIsDownloading(true);
    try {
      const blob = await generatePDF(data, generated);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = getFileName(data.fullName);
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      alert("Erro ao gerar PDF. Tente novamente.");
    }
    setIsDownloading(false);
  };

  const handleReset = () => {
    if (resetConfirm) {
      clearStorage();
      setData(emptyData);
      setGenerated(null);
      setStep(0);
      setResetConfirm(false);
      saveCurrentStep(0);
    } else {
      setResetConfirm(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <a href="/" className="text-[#7A1515] font-bold text-sm hover:underline">← Início</a>
            <button
              onClick={handleReset}
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors ${resetConfirm ? "bg-red-100 text-red-600 font-bold" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}
            >
              <RotateCcw size={14} />
              {resetConfirm ? "Confirmar limpeza" : "Recomeçar"}
            </button>
          </div>
          <ProgressBar current={step + 1} total={STEPS.length} stepName={STEPS[step]} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Step 0: Identificação */}
        {step === 0 && (
          <Card title="Identificação" subtitle="Seus dados de contato aparecerão no topo do currículo.">
            <div className="space-y-5">
              <Field label="Nome completo" required error={errors.fullName}>
                <input className={inputClass} value={data.fullName} onChange={e => update("fullName", e.target.value)} placeholder="Seu nome completo" />
              </Field>
              <Field label="Cidade e estado" required error={errors.cityState}>
                <input className={inputClass} value={data.cityState} onChange={e => update("cityState", e.target.value)} placeholder="Ex: São Paulo/SP" />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Telefone / WhatsApp" required error={errors.phone}>
                  <input className={inputClass} value={data.phone} onChange={e => update("phone", e.target.value)} placeholder="(11) 99999-9999" />
                </Field>
                <Field label="E-mail" required error={errors.email}>
                  <input className={inputClass} type="email" value={data.email} onChange={e => update("email", e.target.value)} placeholder="seu@email.com" />
                </Field>
              </div>
              <Field label="LinkedIn" hint="Opcional. Cole o link ou seu nome de usuário.">
                <input className={inputClass} value={data.linkedin || ""} onChange={e => update("linkedin", e.target.value)} placeholder="linkedin.com/in/seunome" />
              </Field>
              <Field label="Foto profissional" hint="Opcional. Uma foto discreta e profissional pode valorizar o currículo.">
                <div className="flex items-center gap-4">
                  {data.photo && (
                    <img src={data.photo} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-[#7A1515]" />
                  )}
                  <button type="button" onClick={() => photoRef.current?.click()} className="border-2 border-dashed border-gray-300 hover:border-[#7A1515] rounded-xl px-4 py-3 text-sm text-gray-500 hover:text-[#7A1515] transition-colors">
                    {data.photo ? "Trocar foto" : "Selecionar foto"}
                  </button>
                  {data.photo && (
                    <button type="button" onClick={() => update("photo", "")} className="text-xs text-red-400 hover:text-red-600">Remover</button>
                  )}
                  <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </div>
              </Field>
            </div>
            <StepNavigation showBack={false} onNext={validateAndNext} />
          </Card>
        )}

        {/* Step 1: Objetivo */}
        {step === 1 && (
          <Card title="Objetivo Profissional" subtitle="Nos conte onde quer chegar e de onde você vem.">
            <div className="space-y-5">
              <Field label="Qual vaga ou área está buscando?" required error={errors.targetRole} hint="Informe a área de interesse para que o currículo seja direcionado corretamente.">
                <input className={inputClass} value={data.targetRole} onChange={e => update("targetRole", e.target.value)} placeholder="Ex: Atendimento digital, SDR, Customer Success, vendas online..." />
              </Field>
              <Field
                label="Conte sua história em suas palavras"
                required
                error={errors.story}
                hint="Não precisa escrever como currículo. Responda do seu jeito: de onde você vem profissionalmente, o que sabe fazer bem e por que quer entrar no digital."
              >
                <textarea
                  className={inputClass + " min-h-[150px] resize-none"}
                  value={data.story}
                  onChange={e => update("story", e.target.value)}
                  placeholder="Ex: Trabalhei por 5 anos em uma loja de roupas, aprendi muito sobre atendimento ao cliente. Sei negociar bem, sou organizada e boa em comunicação. Agora quero trabalhar em home office porque tenho filhos pequenos..."
                />
              </Field>
            </div>
            <StepNavigation onBack={goBack} onNext={validateAndNext} />
          </Card>
        )}

        {/* Step 2: Habilidades */}
        {step === 2 && (
          <Card title="Habilidades" subtitle="Liste o que você sabe fazer. Seja honesto — essas habilidades aparecerão no currículo.">
            <div className="space-y-5">
              <Field
                label="Habilidades técnicas"
                required
                error={errors.technicalSkills}
                hint="Ferramentas, sistemas ou plataformas que você já usou, mesmo que de forma básica."
              >
                <textarea
                  className={inputClass + " min-h-[100px] resize-none"}
                  value={data.technicalSkills}
                  onChange={e => update("technicalSkills", e.target.value)}
                  placeholder="Ex: WhatsApp Business, Excel, Google Planilhas, Instagram, Canva..."
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {["WhatsApp Business", "Canva", "Excel", "Google Planilhas", "Instagram", "Google Drive", "LinkedIn", "CRM", "Pipedrive"].map(t => (
                    <button key={t} type="button" onClick={() => update("technicalSkills", data.technicalSkills ? data.technicalSkills + ", " + t : t)} className="text-xs bg-gray-100 hover:bg-[#f5e8e8] text-gray-600 hover:text-[#7A1515] px-3 py-1 rounded-full border border-gray-200 hover:border-[#7A1515]/30 transition-colors">
                      + {t}
                    </button>
                  ))}
                </div>
              </Field>
              <Field
                label="Habilidades comportamentais"
                required
                error={errors.behavioralSkills}
                hint="O que as pessoas reconhecem em você. O que seus amigos, clientes ou chefes sempre falam?"
              >
                <textarea
                  className={inputClass + " min-h-[100px] resize-none"}
                  value={data.behavioralSkills}
                  onChange={e => update("behavioralSkills", e.target.value)}
                  placeholder="Ex: Comunicação, organização, atenção aos detalhes, empatia..."
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Comunicação", "Organização", "Atenção aos detalhes", "Negociação", "Empatia", "Escuta ativa", "Foco em resultado", "Resiliência"].map(t => (
                    <button key={t} type="button" onClick={() => update("behavioralSkills", data.behavioralSkills ? data.behavioralSkills + ", " + t : t)} className="text-xs bg-gray-100 hover:bg-[#f5e8e8] text-gray-600 hover:text-[#7A1515] px-3 py-1 rounded-full border border-gray-200 hover:border-[#7A1515]/30 transition-colors">
                      + {t}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
            <StepNavigation onBack={goBack} onNext={validateAndNext} />
          </Card>
        )}

        {/* Step 3: Experiências */}
        {step === 3 && (
          <Card title="Experiências Profissionais" subtitle="Adicione suas experiências mais relevantes. Da mais recente para a mais antiga.">
            <ExperienceFields
              experiences={data.experiences}
              onChange={exps => update("experiences", exps)}
              error={errors.experiences}
            />
            <StepNavigation onBack={goBack} onNext={validateAndNext} />
          </Card>
        )}

        {/* Step 4: Cursos */}
        {step === 4 && (
          <Card title="Cursos e Formações Complementares" subtitle="Inclua cursos curtos, gratuitos ou em andamento. Eles também contam!">
            <p className="text-sm text-gray-500 mb-5">
              Exemplos: Google Certificados, Meta Blueprint, Sebrae, RD University, Cursos Online.
            </p>
            <CourseFields courses={data.courses} onChange={c => update("courses", c)} />
            <StepNavigation onBack={goBack} onNext={validateAndNext} nextLabel="Continuar" />
          </Card>
        )}

        {/* Step 5: Formação */}
        {step === 5 && (
          <Card title="Formação Acadêmica" subtitle="Informe sua formação escolar e universitária.">
            <div className="mb-5">
              <label className={labelClass}>Nível de escolaridade <span className="text-red-400">*</span></label>
              <select
                className={inputClass}
                value={data.educationLevel}
                onChange={e => update("educationLevel", e.target.value)}
              >
                <option value="">Selecione...</option>
                {["Ensino Médio Completo", "Ensino Médio Incompleto", "Técnico", "Graduação Cursando", "Graduação Concluída", "Pós-graduação / MBA", "Outro"].map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              {errors.educationLevel && <p className={errorClass}>{errors.educationLevel}</p>}
            </div>
            <EducationFields education={data.education} onChange={e => update("education", e)} />
            <StepNavigation onBack={goBack} onNext={validateAndNext} />
          </Card>
        )}

        {/* Step 6: Informações Finais */}
        {step === 6 && (
          <Card title="Informações Finais" subtitle="Quase lá! Só mais algumas informações.">
            <div className="space-y-5">
              <Field label="Disponibilidade para início" required error={errors.availability}>
                <div className="grid grid-cols-3 gap-3">
                  {["Imediata", "30 dias", "A combinar"].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update("availability", opt)}
                      className={`py-3 rounded-xl border-2 text-sm font-medium transition-all ${data.availability === opt ? "border-[#7A1515] bg-[#f5e8e8] text-[#7A1515]" : "border-gray-200 text-gray-600 hover:border-[#7A1515]/40"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Preferência de regime de trabalho" required error={errors.workPreference}>
                <div className="grid grid-cols-2 gap-3">
                  {["Remoto", "Presencial", "Híbrido", "Indiferente"].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update("workPreference", opt)}
                      className={`py-3 rounded-xl border-2 text-sm font-medium transition-all ${data.workPreference === opt ? "border-[#7A1515] bg-[#f5e8e8] text-[#7A1515]" : "border-gray-200 text-gray-600 hover:border-[#7A1515]/40"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Idiomas além do português" hint="Opcional.">
                <input className={inputClass} value={data.languages || ""} onChange={e => update("languages", e.target.value)} placeholder="Ex: Inglês básico, Espanhol intermediário..." />
              </Field>
            </div>
            <StepNavigation onBack={goBack} onNext={validateAndNext} />
          </Card>
        )}

        {/* Step 7: Revisão e geração */}
        {step === 7 && !generated && (
          <Card title="Revisão Final" subtitle="Antes de gerar o currículo, confira se está tudo correto.">
            <div className="space-y-3 mb-8">
              {[
                { q: "O título profissional será alinhado com a área desejada?", ok: !!data.targetRole },
                { q: "O resumo será gerado com base na sua história real?", ok: !!data.story },
                { q: "As habilidades informadas são verdadeiras?", ok: !!(data.technicalSkills && data.behavioralSkills) },
                { q: "As experiências profissionais estão completas?", ok: data.experiences.some(e => e.company && e.activities) },
                { q: "Você consegue explicar tudo que está no currículo?", ok: true },
                { q: "O currículo será baixado em PDF?", ok: true },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${item.ok ? "bg-green-50" : "bg-yellow-50"}`}>
                  {item.ok
                    ? <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    : <AlertCircle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  }
                  <p className="text-sm text-gray-700">{item.q}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#f5e8e8] rounded-2xl p-5 mb-6">
              <p className="text-sm text-[#7A1515] font-medium">
                Tudo certo! O gerador vai transformar suas respostas em um currículo profissional, sem inventar informações. O texto final será claro, honesto e otimizado para leitura humana e ATS.
              </p>
            </div>

            <StepNavigation
              onBack={goBack}
              onNext={handleGenerate}
              nextLabel={isGenerating ? "Gerando..." : "Gerar currículo"}
              isLastStep
            />
          </Card>
        )}

        {/* Step 7 com currículo gerado: Preview */}
        {step === 7 && generated && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Seu currículo está pronto!</h2>
                  <p className="text-sm text-gray-500">Confira o preview abaixo e baixe o PDF.</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setGenerated(null)}
                    className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Editar dados
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 bg-[#7A1515] hover:bg-[#6B1010] text-white font-bold px-6 py-2 rounded-lg shadow hover:shadow-md transition-all disabled:opacity-60"
                  >
                    {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    {isDownloading ? "Gerando PDF..." : "Baixar PDF"}
                  </button>
                </div>
              </div>
            </div>
            <ResumePreview data={data} generated={generated} />
            <div className="text-center pb-8">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-2 mx-auto bg-[#7A1515] hover:bg-[#6B1010] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
              >
                {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                {isDownloading ? "Gerando PDF..." : "Baixar currículo em PDF"}
              </button>
            </div>
          </div>
        )}

        {/* Generating loading overlay */}
        {isGenerating && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-sm mx-4">
              <Loader2 size={40} className="text-[#7A1515] animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">Gerando seu currículo...</h3>
              <p className="text-sm text-gray-500">Transformando suas informações em linguagem profissional.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
