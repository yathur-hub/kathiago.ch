import React, { useState } from 'react';

export default function HolisticAdvisorySection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const worlds = [
    { name: 'Versicherungen', x: 250, y: 40, posClass: 'left-[50%] top-[8%] -translate-x-1/2 -translate-y-1/2' },
    { name: 'Anlagen', x: 432, y: 145, posClass: 'left-[86.4%] top-[29%] -translate-x-1/2 -translate-y-1/2' },
    { name: 'Hypotheken', x: 432, y: 355, posClass: 'left-[86.4%] top-[71%] -translate-x-1/2 -translate-y-1/2' },
    { name: 'Vorsorge', x: 250, y: 460, posClass: 'left-[50%] top-[92%] -translate-x-1/2 -translate-y-1/2' },
    { name: 'Honorarberatung', x: 68, y: 355, posClass: 'left-[13.6%] top-[71%] -translate-x-1/2 -translate-y-1/2' },
    { name: 'Nachlass', x: 68, y: 145, posClass: 'left-[13.6%] top-[29%] -translate-x-1/2 -translate-y-1/2' },
  ];

  return (
    <section className="py-[56px] md:py-[72px] lg:py-[96px] bg-[#14243A] text-white relative overflow-hidden">
      <style>{`
        @keyframes rotateOrbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .rotating-ring {
          transform-origin: 250px 250px;
          animation: rotateOrbit 40s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .rotating-ring {
            animation: none !important;
          }
        }
      `}</style>

      {/* Decorative Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-[#376AB2]/10 rounded-full blur-[90px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Content Block */}
          <div className="lg:col-span-5 max-w-[540px]">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
              Warum ganzheitlich
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Ein Kunde. Sechs Welten.
            </h2>
            <div className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed">
              <p>
                Im Zentrum jeder Beratung steht nicht das Produkt, sondern der Kunde. Seine Bedürfnisse umfassen sechs Welten: Vorsorge, Versicherungen, Hypotheken, Anlagen, Honorarberatung und Nachlass.
              </p>
              <p>
                Erschlossen werden sie nicht durch Fachwissen allein, sondern durch Beratungs- und Verkaufskompetenz — die Hülle, die den Kunden mit jeder dieser Welten verbindet. Genau hier setzt Kathiago an.
              </p>
            </div>
          </div>

          {/* Right Interactive Orbit Diagram */}
          <div className="lg:col-span-7 flex justify-center items-center w-full min-h-[380px] sm:min-h-[520px] lg:min-h-[580px] relative">
            <div className="relative w-[290px] h-[290px] sm:w-[480px] sm:h-[480px] md:w-[500px] md:h-[500px] lg:w-[520px] lg:h-[520px] flex-shrink-0">
              
              {/* Scalable SVG Background & Dynamic Lines */}
              <svg 
                viewBox="0 0 500 500" 
                className="w-full h-full absolute inset-0 z-10"
                aria-hidden="true"
              >
                <defs>
                  {/* Circular Text Path */}
                  <path
                    id="orbit-text-path-1"
                    d="M 250, 160 A 90,90 0 1,1 249.9,160"
                    fill="none"
                  />
                </defs>

                {/* Connection lines from center to outer positions */}
                {worlds.map((world, idx) => (
                  <line
                    key={idx}
                    x1="250"
                    y1="250"
                    x2={world.x}
                    y2={world.y}
                    stroke={hoveredIdx === idx ? '#376AB2' : 'rgba(255, 255, 255, 0.12)'}
                    strokeWidth={hoveredIdx === idx ? '2' : '1'}
                    strokeDasharray="4 4"
                    className="transition-all duration-300"
                  />
                ))}

                {/* Rotating Envelope Ring (second ring) */}
                <g className="rotating-ring">
                  {/* Decorative outer dash ring */}
                  <circle
                    cx="250"
                    cy="250"
                    r="110"
                    fill="none"
                    stroke="rgba(55, 106, 178, 0.25)"
                    strokeWidth="1"
                    strokeDasharray="8 6"
                  />
                  {/* Decorative inner dotted ring */}
                  <circle
                    cx="250"
                    cy="250"
                    r="82"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="1.5"
                    strokeDasharray="3 5"
                  />
                  {/* Curved Envelope Label */}
                  <text className="font-sans font-bold tracking-[0.24em] text-[8.5px] uppercase fill-white/80">
                    <textPath href="#orbit-text-path-1" startOffset="0%">
                      BERATUNGS- &amp; VERKAUFSKOMPETENZ — KATHIAGO —
                    </textPath>
                  </text>
                </g>

                {/* Static Opaque Muted Center Circle */}
                <circle 
                  cx="250" 
                  cy="250" 
                  r="52" 
                  fill="#376AB2" 
                  className="shadow-inner"
                />
                
                {/* Center text */}
                <text
                  x="250"
                  y="255"
                  fill="#ffffff"
                  textAnchor="middle"
                  className="font-sans font-bold text-sm sm:text-base tracking-wider select-none pointer-events-none"
                >
                  Kunde
                </text>
              </svg>

              {/* HTML Hoverable Cards overlayed exactly using CSS percentages */}
              {worlds.map((world, idx) => {
                const isHovered = hoveredIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`absolute ${world.posClass} z-20`}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <button
                      className={`flex items-center px-3 py-2 sm:px-5 sm:py-3 rounded-2xl bg-[#1A304E] border ${
                        isHovered 
                          ? 'border-primary/60 bg-[#223d63] text-white shadow-[0_0_15px_rgba(55,106,178,0.35)] scale-105' 
                          : 'border-slate-700/60 text-slate-100'
                      } transition-all duration-300 group cursor-default text-xs sm:text-sm font-semibold tracking-wide`}
                      aria-label={`Beratungswelt: ${world.name}`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 shrink-0 transition-colors duration-300 ${
                        isHovered ? 'bg-primary' : 'bg-primary/60'
                      }`} />
                      {world.name}
                    </button>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
