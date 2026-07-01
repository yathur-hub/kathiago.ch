import React, { useState } from 'react';

interface Block {
  title: string;
  subtitle: string;
  duration: string;
  icon: string;
  description: string;
  topics: string[];
}

export default function KtCurriculum() {
  const [activeBlock, setActiveBlock] = useState<number>(0);

  const blocks: Block[] = [
    {
      title: "Block 1: Grundlagen & Analyse",
      subtitle: "Basis des Portfoliomanagements",
      duration: "7 Lektionen",
      icon: "📊",
      description: "Erfahren Sie, wie Sie ein Risikoprofil fundiert herleiten und gängige Zinsanlagen sowie Aktien mit klaren Kennzahlen analysieren.",
      topics: [
        "Herleitung und Strukturierung des Kunden-Risikoprofils",
        "Zinsanlagen (Obligationen, Geldmarktinstrumente) verstehen",
        "Aktienanalyse und grundlegende Aktienkennzahlen",
        "Zusammenhang zwischen Rendite, Risiko und Liquidität"
      ]
    },
    {
      title: "Block 2: Kollektive Anlagen & Struktur",
      subtitle: "Diversifikation & Anlagefonds",
      duration: "7 Lektionen",
      icon: "🧺",
      description: "Lernen Sie, wie kollektive Kapitalanlagen funktionieren und wie Sie Portfolios mithilfe der Asset Allocation strategisch aufbauen.",
      topics: [
        "Rechtliche Strukturen und Arten von Anlagefonds",
        "Kostenarten (TER, Ausgabe- und Rücknahmespesen) analysieren",
        "Konzepte der strategischen und taktischen Asset Allocation",
        "Risikodiversifikation in der praktischen Anwendung"
      ]
    },
    {
      title: "Block 3: Strukturierte Produkte",
      subtitle: "Funktionsweise & Pay-Off",
      duration: "7 Lektionen",
      icon: "📐",
      description: "Verstehen Sie komplexe strukturierte Produkte. Lernen Sie Pay-Off-Diagramme zu lesen und die Produktlogik verständlich zu erklären.",
      topics: [
        "Grundtypen strukturierter Produkte (Kapitalschutz, Renditeoptimierung, Partizipation)",
        "Lesen und Interpretieren von Pay-Off-Diagrammen",
        "Szenarioanalyse für strukturierte Produkte unter verschiedenen Marktbedingungen",
        "Chancen-Risiko-Profile verständlich im Kundengespräch vermitteln"
      ]
    },
    {
      title: "Block 4: Integration & Vorbereitung",
      subtitle: "Praxistransfer & FIDLEG-Vorbereitung",
      duration: "7 Lektionen",
      icon: "🎓",
      description: "Bringen Sie Ihr Wissen zusammen. Bereiten Sie sich anhand realer Praxisfälle und Prüfungssimulationen optimal auf den Nachweis vor.",
      topics: [
        "Ganzheitliche Fallstudien und praktische Anlageempfehlungen",
        "Einordnung der Fachkenntnisse gemäss FIDLEG Art. 6",
        "Prüfungssimulation und Besprechung von Beispielfragen",
        "Tipps für das Online-Prüfungszeitfenster"
      ]
    }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-10 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Ausbildungsblöcke</span>
            {blocks.map((block, idx) => {
              const isActive = activeBlock === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveBlock(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                    isActive 
                      ? 'bg-navy border-navy text-white shadow-lg shadow-navy/10 translate-x-2' 
                      : 'bg-slate-50 hover:bg-slate-100/85 border-slate-200/50 text-slate-700'
                  }`}
                >
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    isActive ? 'bg-primary/20 text-white' : 'bg-white border border-slate-200/80 text-slate-800'
                  }`}>
                    {block.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm sm:text-base tracking-tight truncate">
                      {block.title}
                    </div>
                    <div className={`text-xs truncate ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                      {block.subtitle}
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-md shrink-0 ${
                    isActive ? 'bg-white/10 text-white' : 'bg-slate-200/60 text-slate-600'
                  }`}>
                    {block.duration}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-50 border border-slate-200/50 p-5 rounded-2xl hidden lg:block">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Dauer & Umfang</span>
            <p className="text-sm text-slate-600 font-medium">Insgesamt 28 kompakte Lektionen, ideal berufsbegleitend absolvierbar.</p>
          </div>
        </div>

        {/* Content Detail View */}
        <div className="lg:col-span-7 bg-slate-50/70 border border-slate-200/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{blocks[activeBlock].icon}</span>
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">
                  Lehrplan-Schwerpunkt
                </span>
                <h3 className="text-2xl font-extrabold text-navy tracking-tight leading-tight">
                  {blocks[activeBlock].title}
                </h3>
              </div>
            </div>

            <p className="text-slate-600 font-medium text-base mb-6 leading-relaxed">
              {blocks[activeBlock].description}
            </p>

            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Konkrete Lerninhalte:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {blocks[activeBlock].topics.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="leading-snug">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-semibold text-slate-500">
              Umfang: 7 Lektionen gebündelte Fachkompetenz
            </span>
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Praxis-Standard KT
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
