import React, { useState } from 'react';

interface Topic {
  title: string;
  subtitle: string;
  icon: string;
  bullets: string[];
  description: string;
}

export default function VbvCurriculum() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const topics: Topic[] = [
    {
      title: "Versicherungswirtschaft",
      subtitle: "Die Ökonomie des Risikoausgleichs",
      icon: "💼",
      description: "Verstehen Sie die ökonomischen Gesetzmässigkeiten und Marktdynamiken der modernen Assekuranz.",
      bullets: [
        "Grundlagen und ökonomische Bedeutung von Versicherungen",
        "Moderne Mechanismen des Risikotransfers",
        "Vergütungsstrukturen und Anreizsysteme im Vertrieb",
        "Aktuelle Akteure, Vertriebskanäle und Marktentwicklungen"
      ]
    },
    {
      title: "Rechtskenntnisse",
      subtitle: "Gesetzlicher Rahmen und Kundenschutz",
      icon: "⚖️",
      description: "Recht ist bei uns keine graue Theorie, sondern Ihr tägliches Werkzeug für rechtssichere Beratung.",
      bullets: [
        "Rechtliche Pflichten gemäss FINMA-Aufsichtsrecht",
        "Das Versicherungsvertragsgesetz (VVG) in der Praxis",
        "Sorgfaltspflichten und Konsumentenschutzregeln",
        "Haftungsfragen und rechtssichere Beratungsdokumentation"
      ]
    },
    {
      title: "Sach- und Vermögensversicherung",
      subtitle: "Existenzen und Werte optimal absichern",
      icon: "🏠",
      description: "Lernen Sie, Sach- und Vermögenswerte von Privat- und Firmenkunden methodisch richtig zu schützen.",
      bullets: [
        "Hausrat-, Gebäude-, Kasko- und Haftpflichtversicherungen",
        "Grundlagen des prozessualen Risk Managements",
        "Spezifische Deckungen für Selbstständigerwerbende",
        "Ganzheitliche Bedarfsanalyse und Risikoszenarien"
      ]
    },
    {
      title: "Personen- und Sozialversicherung",
      subtitle: "Existenzsicherung & Altersvorsorge",
      icon: "👥",
      description: "Meistern Sie das Schweizer Vorsorgesystem in allen Details von der Altersvorsorge bis zum Krankheitsfall.",
      bullets: [
        "Das Schweizer 3-Säulen-System im Detail (AHV/IV, BVG, Säule 3a/3b)",
        "Kranken- und Unfallversicherungen (KVG und UVG)",
        "Lebensversicherungen als Absicherungs- und Sparinstrument",
        "Zusatzversicherungen und bedarfsgerechte Vorsorgeplanung"
      ]
    },
    {
      title: "Prüfungsvorbereitung",
      subtitle: "Simulation, Repetition und Vertiefung",
      icon: "🎯",
      description: "Durchbrechen Sie Prüfungsängste mit gezielten Simulationen und vertiefter Fallarbeit aus echten Prüfungsszenarien.",
      bullets: [
        "Simulation der schriftlichen 120-Minuten-Onlineprüfung",
        "Mündliches Prüfungstraining mit erfahrenen Experten",
        "Ausführliches Feedback zu Gesprächsführung und Methodik",
        "Gezielte Repetition von Wissentiefen und Praxisknackpunkten"
      ]
    }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-10 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Topic List / Navigation */}
        <div className="lg:col-span-5 space-y-3">
          {topics.map((topic, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                  isActive 
                    ? 'bg-navy border-navy text-white shadow-lg shadow-navy/10 translate-x-2' 
                    : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/50 text-slate-700'
                }`}
              >
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                  isActive ? 'bg-primary/20 text-white' : 'bg-white border border-slate-200/80 text-slate-800'
                }`}>
                  {topic.icon}
                </span>
                <div className="min-w-0">
                  <div className="font-bold text-sm sm:text-base tracking-tight truncate">
                    {topic.title}
                  </div>
                  <div className={`text-xs truncate ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {topic.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Content Detail View */}
        <div className="lg:col-span-7 bg-slate-50/70 border border-slate-200/50 rounded-2xl p-6 sm:p-8 min-h-[360px] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{topics[activeTab].icon}</span>
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">
                  Themenbereich 0{activeTab + 1}
                </span>
                <h3 className="text-2xl font-extrabold text-navy leading-none">
                  {topics[activeTab].title}
                </h3>
              </div>
            </div>

            <p className="text-slate-600 font-medium text-base mb-6 leading-relaxed">
              {topics[activeTab].description}
            </p>

            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Fokus-Lehrthemen
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topics[activeTab].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-semibold text-slate-500">
              Modul 100% kongruent mit offiziellen VBV-Anforderungen
            </span>
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Kathiago-Qualitätsstandard
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
