"use client";
import Link from "next/link";
import { FileText, CheckCircle, Download, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="wine-gradient text-white">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 rounded-2xl p-4">
              <FileText size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Gerador de Currículo Digital
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
            Preencha seus dados e gere um currículo profissional pronto para enviar em vagas digitais, home office e atendimento online.
          </p>
          <p className="text-white/75 mb-10 text-base">
            Você não precisa escrever bonito. Preencha do seu jeito. O gerador organiza e melhora o texto para você.
          </p>
          <Link
            href="/form"
            className="inline-block bg-white text-[#7A1515] font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Começar agora
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
          Como funciona
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FileText size={28} className="text-[#7A1515]" />,
              title: "Preencha os dados",
              desc: "Formulário simples em etapas. Não precisa escrever como currículo.",
            },
            {
              icon: <Zap size={28} className="text-[#7A1515]" />,
              title: "Geração automática",
              desc: "O sistema transforma seu texto em linguagem profissional, sem inventar nada.",
            },
            {
              icon: <Download size={28} className="text-[#7A1515]" />,
              title: "Baixe o PDF",
              desc: "Currículo em A4, pronto para enviar. Compatível com sistemas ATS.",
            },
          ].map((f, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="bg-[#f5e8e8] rounded-full p-3">{f.icon}</div>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Ideal para quem busca</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Atendimento digital", "Customer Success", "SDR / Pré-vendas", "Suporte ao cliente", "Vendas online", "Home office", "Assistente remoto", "Social Selling"].map(tag => (
              <span key={tag} className="bg-white border border-gray-200 text-gray-700 rounded-full px-4 py-2 text-sm font-medium shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <CheckCircle size={40} className="text-[#7A1515] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Gratuito e sem cadastro</h2>
          <p className="text-gray-600 mb-8">Seus dados ficam só no seu navegador. Nada é enviado para servidores.</p>
          <Link
            href="/form"
            className="inline-block wine-gradient text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Criar meu currículo agora
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-6 text-center text-gray-400 text-sm">
        Currículo Aprovado · Seus dados ficam apenas no seu dispositivo
      </footer>
    </main>
  );
}
