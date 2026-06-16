export type Experience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location?: string;
  activities: string;
  results?: string;
};

export type Course = {
  id: string;
  name: string;
  institution: string;
  workload?: string;
  status: "Concluído" | "Em andamento" | "Não informado";
};

export type Education = {
  id: string;
  level: string;
  course?: string;
  institution?: string;
  year?: string;
};

export type ResumeData = {
  fullName: string;
  cityState: string;
  phone: string;
  email: string;
  linkedin?: string;
  photo?: string;
  targetRole: string;
  story: string;
  technicalSkills: string;
  behavioralSkills: string;
  experiences: Experience[];
  courses: Course[];
  educationLevel: string;
  education: Education[];
  availability: string;
  workPreference: string;
  languages?: string;
};

export type GeneratedResume = {
  professionalTitle: string;
  professionalSummary: string;
  professionalSkills: string[];
  technicalSkills: string[];
  experiences: FormattedExperience[];
  courses: Course[];
  education: Education[];
  availability: string;
  workPreference: string;
  languages?: string;
};

export type FormattedExperience = {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location?: string;
  bullets: string[];
};
