import { ResumeData } from "@/types/resume";

const STORAGE_KEY = "curriculo_aprovado_data";

export function saveToStorage(data: Partial<ResumeData>): void {
  if (typeof window === "undefined") return;
  try {
    const existing = loadFromStorage();
    const merged = { ...existing, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (e) {
    console.error("Erro ao salvar dados:", e);
  }
}

export function loadFromStorage(): Partial<ResumeData> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

export function clearStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function saveCurrentStep(step: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("curriculo_step", String(step));
}

export function loadCurrentStep(): number {
  if (typeof window === "undefined") return 0;
  const s = localStorage.getItem("curriculo_step");
  return s ? parseInt(s, 10) : 0;
}
