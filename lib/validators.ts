import { ResumeData } from "@/types/resume";

export type ValidationErrors = Partial<Record<keyof ResumeData | string, string>>;

export function validateStep1(data: Partial<ResumeData>): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!data.fullName?.trim()) errors.fullName = "Preencha seu nome completo.";
  if (!data.cityState?.trim()) errors.cityState = "Informe sua cidade e estado.";
  if (!data.phone?.trim()) errors.phone = "Informe seu telefone/WhatsApp.";
  if (!data.email?.trim()) {
    errors.email = "Informe seu e-mail.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "E-mail inválido.";
  }
  return errors;
}

export function validateStep2(data: Partial<ResumeData>): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!data.targetRole?.trim()) errors.targetRole = "Informe a área ou vaga desejada.";
  if (!data.story?.trim()) errors.story = "Conte um pouco sobre você e sua trajetória.";
  return errors;
}

export function validateStep3(data: Partial<ResumeData>): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!data.technicalSkills?.trim()) errors.technicalSkills = "Informe pelo menos uma habilidade técnica.";
  if (!data.behavioralSkills?.trim()) errors.behavioralSkills = "Informe pelo menos uma habilidade comportamental.";
  return errors;
}

export function validateStep4(data: Partial<ResumeData>): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!data.experiences || data.experiences.length === 0) {
    errors.experiences = "Adicione pelo menos uma experiência profissional.";
  }
  return errors;
}

export function validateStep6(data: Partial<ResumeData>): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!data.educationLevel?.trim()) errors.educationLevel = "Selecione o nível de escolaridade.";
  return errors;
}

export function validateStep7(data: Partial<ResumeData>): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!data.availability?.trim()) errors.availability = "Selecione sua disponibilidade.";
  if (!data.workPreference?.trim()) errors.workPreference = "Selecione a preferência de trabalho.";
  return errors;
}
