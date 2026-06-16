import { ResumeData, GeneratedResume, FormattedExperience, Experience } from "@/types/resume";

const digitalMappings: { keywords: string[]; digital: string }[] = [
  { keywords: ["balcão", "loja", "varejo", "pdv", "caixa"], digital: "atendimento ao cliente e relacionamento com pessoas" },
  { keywords: ["vendas presenciais", "venda presencial", "vendedor"], digital: "vendas consultivas e atendimento personalizado ao cliente" },
  { keywords: ["whatsapp", "zap"], digital: "atendimento digital via WhatsApp" },
  { keywords: ["caderno", "planilha", "lista de clientes"], digital: "organização e gestão de base de clientes" },
  { keywords: ["cliente sumiu", "cliente inativo", "recuperação"], digital: "retomada de contato e acompanhamento de clientes inativos" },
  { keywords: ["negociaç", "negociar", "desconto", "preço"], digital: "negociação e fechamento de vendas" },
  { keywords: ["cartaz", "panfleto", "post", "divulgação"], digital: "criação de material de divulgação e comunicação promocional" },
  { keywords: ["pós-venda", "pos venda", "fideliz"], digital: "relacionamento com cliente e fidelização" },
];

function applyDigitalTranslation(text: string): string {
  let result = text.toLowerCase();
  for (const mapping of digitalMappings) {
    for (const kw of mapping.keywords) {
      if (result.includes(kw)) {
        result = result.replace(new RegExp(kw, "gi"), mapping.digital);
        break;
      }
    }
  }
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function generateProfessionalTitle(data: Partial<ResumeData>): string {
  const target = (data.targetRole || "").toLowerCase();
  const skills = (data.behavioralSkills || "").toLowerCase();

  const isSDR = target.includes("sdr") || target.includes("pré-vend") || target.includes("pre-vend");
  const isCS = target.includes("customer success") || target.includes("cs ");
  const isCloser = target.includes("closer") || target.includes("fechamento");
  const isSales = target.includes("vend") || target.includes("comercial");
  const isSupport = target.includes("suporte") || target.includes("atendimento");
  const isRemote = target.includes("remoto") || target.includes("home office") || target.includes("digital");
  const isSocialSelling = target.includes("social selling");

  const hasExperience = data.experiences && data.experiences.length > 0;
  const expText = hasExperience ? data.experiences!.map(e => e.activities + " " + e.role).join(" ").toLowerCase() : "";

  if (isSDR && !expText.includes("sdr") && !expText.includes("prospecção")) {
    return "Vendas e Atendimento ao Cliente · Em transição para SDR";
  }
  if (isCS && !expText.includes("customer success") && !expText.includes("cs ")) {
    return "Atendimento ao Cliente · Relacionamento · Em transição para Customer Success";
  }
  if (isCloser && isSales) {
    return "Vendas e Negociação · Fechamento · Atendimento ao Cliente";
  }
  if (isSocialSelling) {
    return "Relacionamento Digital · Vendas · Comunicação";
  }
  if (isSales && isSupport) {
    return "Vendas e Atendimento ao Cliente · Comunicação · Relacionamento";
  }
  if (isSales) {
    return "Vendas · Negociação · Relacionamento com Cliente";
  }
  if (isCS) {
    return "Relacionamento com Cliente · Suporte · Comunicação";
  }
  if (isSupport) {
    return "Atendimento ao Cliente · Comunicação · Organização";
  }
  if (isRemote) {
    return "Atendimento Digital · Comunicação · Relacionamento com Pessoas";
  }

  return "Comunicação · Organização · Atendimento ao Cliente";
}

export function generateProfessionalSummary(data: Partial<ResumeData>): string {
  const story = data.story || "";
  const target = data.targetRole || "o mercado digital";
  const behavioral = data.behavioralSkills || "";

  const expCount = data.experiences?.length || 0;
  const mainExp = data.experiences?.[0];
  const expArea = mainExp ? `${mainExp.role} na área de ${mainExp.company}` : "diferentes contextos profissionais";

  const behaviorList = behavioral
    .split(/[,;]+/)
    .map(s => s.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");

  const storyLower = story.toLowerCase();
  let areaAnterior = "atendimento ao cliente";
  if (storyLower.includes("vend")) areaAnterior = "vendas e atendimento ao cliente";
  if (storyLower.includes("admin")) areaAnterior = "administração e organização";
  if (storyLower.includes("logíst") || storyLower.includes("logist")) areaAnterior = "logística e operações";
  if (storyLower.includes("educa") || storyLower.includes("ensino")) areaAnterior = "educação e comunicação";
  if (mainExp?.role) areaAnterior = mainExp.role.toLowerCase();

  let mainActivities = "comunicação direta, organização e acompanhamento de demandas";
  if (mainExp?.activities) {
    const acts = mainExp.activities.toLowerCase();
    if (acts.includes("whatsapp")) mainActivities = "atendimento via WhatsApp e relacionamento com clientes";
    else if (acts.includes("vend")) mainActivities = "vendas, negociação e relacionamento com clientes";
    else if (acts.includes("suporte")) mainActivities = "suporte ao cliente e resolução de problemas";
    else mainActivities = "atendimento ao cliente e comunicação direta";
  }

  const isTransition = storyLower.includes("digital") || storyLower.includes("transição") || storyLower.includes("mudar") || storyLower.includes("remote");

  let summary = `Profissional com experiência em ${areaAnterior}, com atuação em ${mainActivities}.`;

  if (behaviorList) {
    summary += ` Possui habilidades em ${behaviorList}.`;
  }

  if (isTransition || !storyLower.includes(target.toLowerCase())) {
    summary += ` Atualmente busca transição para ${target}, aplicando sua experiência prática em comunicação, relacionamento e organização em ambientes digitais.`;
  } else {
    summary += ` Busca oportunidade em ${target}, com foco em contribuir com resultados concretos e relacionamento de qualidade.`;
  }

  return summary;
}

export function formatSkills(data: Partial<ResumeData>): { professional: string[]; technical: string[] } {
  const behavioral = (data.behavioralSkills || "")
    .split(/[,;\n]+/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1));

  const technical = (data.technicalSkills || "")
    .split(/[,;\n]+/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1));

  return { professional: behavioral, technical };
}

export function generateExperienceBullets(experience: Experience): string[] {
  const text = experience.activities + (experience.results ? " " + experience.results : "");
  const sentences = text
    .split(/[.!?\n;]+/)
    .map(s => s.trim())
    .filter(s => s.length > 5);

  const numberPattern = /\d+/;
  const bullets: string[] = [];

  const actionStarters = [
    "Atendimento", "Organização", "Acompanhamento", "Condução", "Realização",
    "Gestão", "Elaboração", "Apoio", "Desenvolvimento", "Implantação",
    "Redução", "Aumento", "Controle", "Suporte", "Comunicação",
    "Relacionamento", "Negociação", "Prospecção", "Cadastro", "Registro",
  ];

  for (const sentence of sentences.slice(0, 5)) {
    let bullet = sentence.trim();
    if (!bullet) continue;

    bullet = bullet
      .replace(/^(eu\s+|responsável\s+por\s+|fui\s+|era\s+|fazia\s+)/gi, "")
      .replace(/^[a-z]/, c => c.toUpperCase());

    if (numberPattern.test(bullet) && experience.results) {
      bullets.push(bullet + ".");
    } else {
      const translated = applyDigitalTranslation(bullet);
      if (!translated.endsWith(".")) bullets.push(translated + ".");
      else bullets.push(translated);
    }
  }

  if (bullets.length === 0) {
    bullets.push(`Atuação como ${experience.role} com foco em atendimento e organização das demandas diárias.`);
  }

  if (bullets.length === 1 && experience.role) {
    bullets.push(`Suporte às atividades da equipe com comprometimento e atenção aos detalhes.`);
  }

  return bullets.slice(0, 5);
}

export function generateResumeContent(data: ResumeData): GeneratedResume {
  const title = generateProfessionalTitle(data);
  const summary = generateProfessionalSummary(data);
  const { professional, technical } = formatSkills(data);

  const formattedExperiences: FormattedExperience[] = [...data.experiences]
    .sort((a, b) => {
      const dateA = a.endDate === "atual" ? "9999-12" : a.endDate;
      const dateB = b.endDate === "atual" ? "9999-12" : b.endDate;
      return dateB.localeCompare(dateA);
    })
    .map(exp => ({
      company: exp.company,
      role: exp.role,
      startDate: exp.startDate,
      endDate: exp.endDate,
      location: exp.location,
      bullets: generateExperienceBullets(exp),
    }));

  let availability = data.availability;
  if (availability === "Imediata") availability = "Disponibilidade imediata";
  else if (availability === "30 dias") availability = "Disponível em 30 dias";
  else if (availability === "A combinar") availability = "A combinar";

  return {
    professionalTitle: title,
    professionalSummary: summary,
    professionalSkills: professional,
    technicalSkills: technical,
    experiences: formattedExperiences,
    courses: data.courses,
    education: data.education,
    availability,
    workPreference: data.workPreference,
    languages: data.languages,
  };
}
