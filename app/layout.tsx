import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Currículo Aprovado — Gere seu currículo profissional",
  description: "Preencha seus dados e gere um currículo profissional pronto para vagas digitais e home office.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
