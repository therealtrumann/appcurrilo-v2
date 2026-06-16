import { Document, Page, Text, View, StyleSheet, Font, Image, pdf } from "@react-pdf/renderer";
import { createElement } from "react";
import { ResumeData, GeneratedResume } from "@/types/resume";

const WINE = "#7A1515";
const DARK = "#1a1a1a";
const GRAY = "#555555";
const LIGHT_GRAY = "#f5f5f5";
const BORDER = "#e0e0e0";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: DARK,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 45,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: WINE,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: WINE,
    objectFit: "cover",
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginBottom: 2,
  },
  title: {
    fontSize: 10,
    color: WINE,
    marginBottom: 8,
    fontFamily: "Helvetica-Oblique",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  contactItem: {
    fontSize: 8.5,
    color: GRAY,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: WINE,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  summaryText: {
    fontSize: 9.5,
    color: DARK,
    lineHeight: 1.6,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 2,
  },
  skillTag: {
    backgroundColor: LIGHT_GRAY,
    borderRadius: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    fontSize: 8.5,
    color: DARK,
  },
  skillsLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: GRAY,
    marginBottom: 4,
    marginTop: 6,
  },
  expItem: {
    marginBottom: 12,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  expCompany: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: DARK,
  },
  expRole: {
    fontSize: 9.5,
    color: WINE,
    fontFamily: "Helvetica-Oblique",
    marginBottom: 4,
  },
  expPeriod: {
    fontSize: 8.5,
    color: GRAY,
    textAlign: "right",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 2,
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
    color: WINE,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: DARK,
    lineHeight: 1.5,
  },
  courseItem: {
    marginBottom: 6,
  },
  courseName: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: DARK,
  },
  courseDetail: {
    fontSize: 8.5,
    color: GRAY,
  },
  eduItem: {
    marginBottom: 6,
  },
  eduLevel: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: DARK,
  },
  eduDetail: {
    fontSize: 8.5,
    color: GRAY,
  },
  infoRow: {
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
  },
  infoItem: {
    fontSize: 9,
    color: DARK,
  },
  infoLabel: {
    fontFamily: "Helvetica-Bold",
    color: WINE,
  },
});

function createPDFDocument(data: ResumeData, generated: GeneratedResume) {
  const hasPhoto = !!data.photo;

  return createElement(Document, {},
    createElement(Page, { size: "A4", style: styles.page },
      // Header
      createElement(View, { style: styles.header },
        createElement(View, { style: styles.headerRow },
          hasPhoto ? createElement(Image, { src: data.photo!, style: styles.photo }) : null,
          createElement(View, { style: styles.headerInfo },
            createElement(Text, { style: styles.name }, data.fullName),
            createElement(Text, { style: styles.title }, generated.professionalTitle),
            createElement(View, { style: styles.contactRow },
              createElement(Text, { style: styles.contactItem }, `📍 ${data.cityState}`),
              createElement(Text, { style: styles.contactItem }, `📱 ${data.phone}`),
              createElement(Text, { style: styles.contactItem }, `✉ ${data.email}`),
              data.linkedin ? createElement(Text, { style: styles.contactItem }, `LinkedIn: ${data.linkedin}`) : null,
            ),
          ),
        ),
      ),

      // Resumo
      createElement(View, { style: styles.section },
        createElement(Text, { style: styles.sectionTitle }, "Resumo Profissional"),
        createElement(Text, { style: styles.summaryText }, generated.professionalSummary),
      ),

      // Habilidades
      createElement(View, { style: styles.section },
        createElement(Text, { style: styles.sectionTitle }, "Habilidades"),
        generated.professionalSkills.length > 0 ? createElement(View, {},
          createElement(Text, { style: styles.skillsLabel }, "Competências Profissionais"),
          createElement(View, { style: styles.skillsRow },
            ...generated.professionalSkills.map((s, i) =>
              createElement(Text, { key: i, style: styles.skillTag }, s)
            ),
          ),
        ) : null,
        generated.technicalSkills.length > 0 ? createElement(View, {},
          createElement(Text, { style: styles.skillsLabel }, "Habilidades Técnicas"),
          createElement(View, { style: styles.skillsRow },
            ...generated.technicalSkills.map((s, i) =>
              createElement(Text, { key: i, style: styles.skillTag }, s)
            ),
          ),
        ) : null,
      ),

      // Experiências
      createElement(View, { style: styles.section },
        createElement(Text, { style: styles.sectionTitle }, "Experiência Profissional"),
        ...generated.experiences.map((exp, i) =>
          createElement(View, { key: i, style: styles.expItem },
            createElement(View, { style: styles.expHeader },
              createElement(Text, { style: styles.expCompany }, exp.company),
              createElement(Text, { style: styles.expPeriod }, `${exp.startDate} – ${exp.endDate}${exp.location ? ` · ${exp.location}` : ""}`),
            ),
            createElement(Text, { style: styles.expRole }, exp.role),
            ...exp.bullets.map((bullet, bi) =>
              createElement(View, { key: bi, style: styles.bullet },
                createElement(Text, { style: styles.bulletDot }, "•"),
                createElement(Text, { style: styles.bulletText }, bullet),
              )
            ),
          )
        ),
      ),

      // Cursos
      generated.courses.length > 0 ? createElement(View, { style: styles.section },
        createElement(Text, { style: styles.sectionTitle }, "Cursos e Formações Complementares"),
        ...generated.courses.map((c, i) =>
          createElement(View, { key: i, style: styles.courseItem },
            createElement(Text, { style: styles.courseName }, c.name),
            createElement(Text, { style: styles.courseDetail },
              [c.institution, c.workload ? `${c.workload}h` : null, c.status !== "Não informado" ? c.status : null]
                .filter(Boolean).join(" · ")
            ),
          )
        ),
      ) : null,

      // Formação
      generated.education.length > 0 ? createElement(View, { style: styles.section },
        createElement(Text, { style: styles.sectionTitle }, "Formação Acadêmica"),
        ...generated.education.map((e, i) =>
          createElement(View, { key: i, style: styles.eduItem },
            createElement(Text, { style: styles.eduLevel }, e.level),
            createElement(Text, { style: styles.eduDetail },
              [e.course, e.institution, e.year].filter(Boolean).join(" · ")
            ),
          )
        ),
      ) : null,

      // Info complementares
      createElement(View, { style: styles.section },
        createElement(Text, { style: styles.sectionTitle }, "Informações Complementares"),
        createElement(View, { style: styles.infoRow },
          createElement(Text, { style: styles.infoItem },
            createElement(Text, { style: styles.infoLabel }, "Disponibilidade: ") as any,
            generated.availability
          ),
          createElement(Text, { style: styles.infoItem },
            createElement(Text, { style: styles.infoLabel }, "Regime: ") as any,
            generated.workPreference
          ),
          generated.languages ? createElement(Text, { style: styles.infoItem },
            createElement(Text, { style: styles.infoLabel }, "Idiomas: ") as any,
            generated.languages
          ) : null,
        ),
      ),
    )
  );
}

export async function generatePDF(data: ResumeData, generated: GeneratedResume): Promise<Blob> {
  const doc = createPDFDocument(data, generated);
  const blob = await pdf(doc).toBlob();
  return blob;
}

export function getFileName(name: string): string {
  const safe = name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "");
  return `Curriculo_${safe}.pdf`;
}
