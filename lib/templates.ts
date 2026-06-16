export type TemplateId = "classico" | "minimalista" | "corporativo" | "moderno";

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  accent: string;
  headerBg: string;
  headerText: string;
  layout: "single" | "two-column";
}

export const TEMPLATES: Template[] = [
  {
    id: "classico",
    name: "Clássico",
    description: "Elegante com detalhes em vinho",
    accent: "#7A1515",
    headerBg: "#ffffff",
    headerText: "#1a1a1a",
    layout: "single",
  },
  {
    id: "minimalista",
    name: "Minimalista",
    description: "Limpo e focado no conteúdo",
    accent: "#1a1a1a",
    headerBg: "#ffffff",
    headerText: "#1a1a1a",
    layout: "single",
  },
  {
    id: "corporativo",
    name: "Corporativo",
    description: "Azul naval, formal e profissional",
    accent: "#1E3A8A",
    headerBg: "#1E3A8A",
    headerText: "#ffffff",
    layout: "single",
  },
  {
    id: "moderno",
    name: "Moderno",
    description: "Sidebar escura, layout em duas colunas",
    accent: "#C0392B",
    headerBg: "#1E1E1E",
    headerText: "#ffffff",
    layout: "two-column",
  },
];
