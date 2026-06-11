import React, { useState, useEffect } from 'react';

// Define strict, clean types for state management
type StartingPoint = 'starting' | 'insurance' | 'wealth' | 'holistic' | 'regulatory';
type Goal = 'exam' | 'regulatory_safety' | 'skills_expansion' | 'complex_mandates' | 'next_step';

interface QuestionOption<T> {
  id: T;
  label: string;
}

interface ProgramRecommendation {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  ctaText: string;
  link: string;
}

const STARTING_OPTIONS: QuestionOption<StartingPoint>[] = [
  { id: 'starting', label: 'Ich starte in der Finanzberatung' },
  { id: 'insurance', label: 'Ich vermittle Versicherungen' },
  { id: 'wealth', label: 'Ich berate zu Vermögen' },
  { id: 'holistic', label: 'Ich möchte ganzheitlich beraten' },
  { id: 'regulatory', label: 'Ich brauche regulatorische Sicherheit' },
];

const GOAL_OPTIONS: QuestionOption<Goal>[] = [
  { id: 'exam', label: 'Prüfung bestehen' },
  { id: 'regulatory_safety', label: 'Regulatorisch sicher handeln' },
  { id: 'skills_expansion', label: 'Beratungskompetenz ausbauen' },
  { id: 'complex_mandates', label: 'Komplexere Mandate betreuen' },
  { id: 'next_step', label: 'Beruflichen nächsten Schritt planen' },
];

const DECISION_LOGIC: Record<StartingPoint, Record<Goal, string>> = {
  starting: {
    exam: 'vbv',
    skills_expansion: 'iaf',
    regulatory_safety: 'fidleg',
    complex_mandates: 'iaf',
    next_step: 'strategiegespraech',
  },
  insurance: {
    exam: 'vbv',
    regulatory_safety: 'fidleg',
    skills_expansion: 'iaf',
    complex_mandates: 'iaf',
    next_step: 'strategiegespraech',
  },
  wealth: {
    exam: 'kt',
    regulatory_safety: 'kt',
    skills_expansion: 'kt',
    complex_mandates: 'planer',
    next_step: 'strategiegespraech',
  },
  holistic: {
    exam: 'iaf',
    regulatory_safety: 'fidleg',
    skills_expansion: 'iaf',
    complex_mandates: 'planer',
    next_step: 'strategiegespraech',
  },
  regulatory: {
    exam: 'fidleg',
    regulatory_safety: 'fidleg',
    skills_expansion: 'kt',
    complex_mandates: 'planer',
    next_step: 'strategiegespraech',
  }
};

const RECOMMENDATIONS: Record<string, ProgramRecommendation> = {
  vbv: {
    id: 'vbv',
    title: 'Versicherungsvermittler VBV',
    description: 'Die passende Grundlage für professionelle Versicherungsvermittlung und regulatorische Sicherheit.',
    benefits: [
      'Praxisnahe Prüfungsvorbereitung',
      'Fachliche Grundlage für Versicherungsberatung',
      'Relevanz für Vermittlung und Kundenberatung',
    ],
    ctaText: 'Programm ansehen',
    link: '/programme/versicherungsvermittler-vbv/',
  },
  kt: {
    id: 'kt',
    title: 'Vermögensberater KT',
    description: 'Für Berater, die Anlagekompetenz im FIDLEG-Kontext aufbauen und Vermögensfragen strukturierter begleiten möchten.',
    benefits: [
      'Anlagekompetenz praxisnah vertiefen',
      'FIDLEG-Kontext verstehen',
      'Vermögensberatung professioneller strukturieren',
    ],
    ctaText: 'Programm ansehen',
    link: '/programme/zert-vermoegensberater-kt/',
  },
  fidleg: {
    id: 'fidleg',
    title: 'FIDLEG Verhaltensregeln',
    description: 'Für Berater, die regulatorische Sicherheit im Kundengespräch, bei Informationspflichten und in der Dokumentation benötigen.',
    benefits: [
      'Verhaltensregeln sicher anwenden',
      'Informationspflichten verstehen',
      'Dokumentation und Rechenschaft stärken',
    ],
    ctaText: 'Programm ansehen',
    link: '/programme/fidleg-verhaltensregeln/',
  },
  iaf: {
    id: 'iaf',
    title: 'Finanzberater IAF',
    description: 'Für Berater, die ganzheitlicher arbeiten und ihre Kompetenzen in Vorsorge, Versicherung, Vermögen, Steuern und Immobilienfinanzierung ausbauen möchten.',
    benefits: [
      'Breite Finanzberatung aufbauen',
      'Anerkannten Abschluss anstreben',
      'Beratungskompetenz systematisch erweitern',
    ],
    ctaText: 'Programm ansehen',
    link: '/programme/finanzberater-iaf/',
  },
  planer: {
    id: 'planer',
    title: 'Eidg. Finanzplaner',
    description: 'Für erfahrene Berater, die komplexe Lebenssituationen, Pensionierung, Vermögensstrukturierung, Steuern und Nachlass professionell begleiten möchten.',
    benefits: [
      'Komplexe Mandate begleiten',
      'Lebenszyklusplanung vertiefen',
      'Höhere fachliche Qualifikation erreichen',
    ],
    ctaText: 'Programm ansehen',
    link: '/programme/eidg-finanzplaner/',
  },
  strategiegespraech: {
    id: 'strategiegespraech',
    title: 'Strategiegespräch',
    description: 'Ihre Ausgangslage ist individuell. In einem kurzen Gespräch klären wir, welcher Bildungsweg fachlich, regulatorisch und beruflich am besten passt.',
    benefits: [
      'Persönliche Ausgangslage klären',
      'Passenden Bildungsweg bestimmen',
      'Nächsten Schritt strukturiert planen',
    ],
    ctaText: 'Strategiegespräch buchen',
    link: '/kontakt/',
  }
};

// Tracking helper
const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    console.log(`[Tracking Event] ${eventName}`, params);
    
    // Support Google Analytics / Google Tag Manager
    const dataLayer = (window as any).dataLayer;
    if (Array.isArray(dataLayer)) {
      dataLayer.push({
        event: eventName,
        ...params
      });
    }
    
    const gtag = (window as any).gtag;
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }
};

export default function CompetenceSelector() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedStartingPoint, setSelectedStartingPoint] = useState<StartingPoint | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  // Trigger started event once
  useEffect(() => {
    trackEvent('competence_path_started');
  }, []);

  const handleSelectStep1 = (optionId: StartingPoint) => {
    setSelectedStartingPoint(optionId);
    trackEvent('competence_path_step1_selected', { selected_starting_point: optionId });
    setStep(2);
  };

  const handleSelectStep2 = (optionId: Goal) => {
    setSelectedGoal(optionId);
    trackEvent('competence_path_step2_selected', {
      selected_starting_point: selectedStartingPoint,
      selected_goal: optionId,
    });
    
    // Resolve recommendation
    setStep(3);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedGoal(null);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedStartingPoint(null);
    setSelectedGoal(null);
    trackEvent('competence_path_reset');
  };

  const getRecommendation = (): ProgramRecommendation => {
    if (!selectedStartingPoint || !selectedGoal) {
      return RECOMMENDATIONS.strategiegespraech;
    }
    const recId = DECISION_LOGIC[selectedStartingPoint]?.[selectedGoal];
    return RECOMMENDATIONS[recId] || RECOMMENDATIONS.strategiegespraech;
  };

  const recommendation = getRecommendation();

  // Trigger result shown event when moving to step 3
  useEffect(() => {
    if (step === 3 && recommendation) {
      trackEvent('competence_path_result_shown', {
        selected_starting_point: selectedStartingPoint,
        selected_goal: selectedGoal,
        recommended_program: recommendation.id,
      });
    }
  }, [step, selectedStartingPoint, selectedGoal, recommendation]);

  return (
    <div 
      className={`relative w-full rounded-2xl border transition-all duration-300 ${
        step === 3 
          ? 'bg-navy text-white border-navy/30 shadow-xl' 
          : 'bg-white text-navy border-slate-200/80 shadow-md'
      }`}
      aria-live="polite"
      id="competence-card"
    >
      {/* ProgressBar - Only shown during question phases */}
      {step !== 3 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 rounded-t-2xl overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${step === 1 ? '15%' : step === 2 ? '60%' : '100%'}` }} 
          />
        </div>
      )}

      <div className="p-6 sm:p-8 space-y-6">
        {/* HEADER */}
        {step !== 3 && (
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-navy">
              Ihr nächster Kompetenzschritt
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Beantworten Sie zwei kurze Fragen und erhalten Sie eine passende Empfehlung aus unseren Bildungsprogrammen.
            </p>
            <p className="text-xs text-slate-400 font-medium">
              Orientierung in weniger als einer Minute. Ohne Anmeldung.
            </p>
          </div>
        )}

        {/* STEP 1: Starting point */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary">
              Frage 1: Wo stehen Sie heute?
            </label>
            <div className="space-y-2.5">
              {STARTING_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectStep1(option.id)}
                  className="w-full text-left px-4 py-3.5 border border-slate-200 rounded-xl hover:border-primary hover:bg-slate-50/50 hover:shadow-xs hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-150 text-slate-700 font-medium text-sm sm:text-base cursor-pointer flex justify-between items-center group"
                >
                  <span className="group-hover:text-navy transition-colors">{option.label}</span>
                  <span className="text-slate-300 group-hover:text-primary transition-colors text-lg transform group-hover:translate-x-1 duration-150">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Goal */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary">
                Frage 2: Was ist Ihr nächstes Ziel?
              </label>
              <button
                onClick={handleBack}
                className="text-xs font-bold text-slate-500 hover:text-primary transition-colors focus:underline outline-none flex items-center gap-1 cursor-pointer"
                aria-label="Zurück zur vorherigen Frage"
              >
                ← Zurück
              </button>
            </div>
            <div className="space-y-2.5">
              {GOAL_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectStep2(option.id)}
                  className="w-full text-left px-4 py-3.5 border border-slate-200 rounded-xl hover:border-primary hover:bg-slate-50/50 hover:shadow-xs hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-150 text-slate-700 font-medium text-sm sm:text-base cursor-pointer flex justify-between items-center group"
                >
                  <span className="group-hover:text-navy transition-colors">{option.label}</span>
                  <span className="text-slate-300 group-hover:text-primary transition-colors text-lg transform group-hover:translate-x-1 duration-150">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Result / recommendation */}
        {step === 3 && recommendation && (
          <div className="space-y-5 animate-fade-in text-white">
            <div className="space-y-1">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 py-1 px-3.5 rounded-full">
                Empfohlener nächster Schritt
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1 pt-1">
                {recommendation.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {recommendation.description}
            </p>

            {/* Benefits list */}
            <ul className="space-y-2.5 py-1" aria-label="Nutzenpunkte des Programms">
              {recommendation.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start text-sm text-slate-100 leading-tight">
                  <span className="text-accent font-bold mr-2 flex-shrink-0" aria-hidden="true">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              <a
                href={recommendation.link}
                onClick={() => trackEvent('competence_path_program_clicked', {
                  recommended_program: recommendation.id,
                  cta_clicked: 'programm_ansehen',
                })}
                className="w-full text-center px-6 py-3.5 rounded-xl font-bold text-sm bg-accent text-white hover:bg-accent-dark active:scale-[0.99] transition-all flex items-center justify-center gap-1 shadow-md shadow-accent/20"
              >
                {recommendation.ctaText}
              </a>
              
              {/* Secondary Button except when already showing the contact path as the main action */}
              {recommendation.id !== 'strategiegespraech' && (
                <a
                  href="/kontakt/"
                  onClick={() => trackEvent('competence_path_consultation_clicked', {
                    recommended_program: recommendation.id,
                    cta_clicked: 'beratung_buchen',
                  })}
                  className="w-full text-center px-6 py-3.5 rounded-xl font-bold text-sm bg-white/10 text-white hover:bg-white/20 active:scale-[0.99] transition-all border border-white/25"
                >
                  Strategiegespräch buchen
                </a>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-3 items-center pt-3 border-t border-white/10 text-xs">
              <button
                onClick={handleReset}
                className="text-slate-300 hover:text-white transition-colors underline focus:ring-1 focus:ring-accent outline-none cursor-pointer"
              >
                Empfehlung zurücksetzen
              </button>
              
              <a
                href="/programme/"
                className="text-slate-400 hover:text-white transition-colors focus:ring-1 focus:ring-accent outline-none font-medium mt-1"
              >
                Alle Bildungsprogramme ansehen
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
