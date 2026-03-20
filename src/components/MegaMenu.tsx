import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';

const menuSections = [
  {
    title: 'Programme',
    links: [
      { label: 'Versicherungsvermittler VBV', href: '/programme/versicherungsvermittler-vbv/' },
      { label: 'Finanzberater IAF', href: '/programme/finanzberater-iaf/' },
      { label: 'Vermögensberater IAF', href: '/programme/vermoegensberater-iaf/' },
      { label: 'Zert. Vermögensberater KT', href: '/programme/zert-vermoegensberater-kt/' },
      { label: 'FIDLEG Verhaltensregeln', href: '/programme/fidleg-verhaltensregeln/' },
      { label: 'Eidg. Finanzplaner', href: '/programme/eidg-finanzplaner/' },
      { label: 'Crypto Advisor', href: '/programme/crypto-advisor/' },
    ]
  },
  {
    title: 'Zertifizierungen',
    links: [
      { label: 'CICERO', href: '/zertifizierungen/cicero/' },
      { label: 'SAQ', href: '/zertifizierungen/saq/' },
      { label: 'Rezertifizierung', href: '/zertifizierungen/rezertifizierung/' },
    ]
  },
  {
    title: 'Ressourcen',
    links: [
      { label: 'Assessment', href: '/ressourcen/assessment/' },
      { label: 'Marktstudien', href: '/ressourcen/marktstudien/' },
      { label: 'Regulatorische Analysen', href: '/ressourcen/regulatorische-analysen/' },
    ]
  },
  {
    title: 'Weitere Bereiche',
    links: [
      { label: 'Über uns', href: '/ueber-uns/' },
      { label: 'Kontakt', href: '/kontakt/' },
      { label: 'Impressum', href: '/impressum/' },
      { label: 'Datenschutz', href: '/datenschutz/' },
      { label: 'AGB', href: '/agb/' },
    ]
  }
];

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Focus trap logic
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      firstElement.focus();
      window.addEventListener('keydown', handleTab);
      return () => window.removeEventListener('keydown', handleTab);
    }
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={toggleMenu}
        className="z-[100] p-2 text-slate-600 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
        aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[90] bg-white w-screen h-screen overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Header inside Overlay */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between border-b border-slate-100">
              <a href="/" className="flex items-center">
                <img src="https://raw.githubusercontent.com/yathur-hub/kathiago.ch-assets/main/Kathiago%20Logo%20Transparent.png" alt="Kathiago Logo" className="h-16 w-auto" />
              </a>
              {/* The button is fixed outside but we keep a placeholder or just rely on the fixed button */}
              <div className="w-8 h-8"></div> 
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
                {/* Left Column: Main Navigation Sections */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
                  {menuSections.map((section) => (
                    <div key={section.title} className="space-y-6">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                        {section.title}
                      </h3>
                      <ul className="space-y-4">
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              className="group flex items-center text-lg md:text-xl text-slate-800 hover:text-primary transition-colors"
                            >
                              <span>{link.label}</span>
                              <ArrowRight className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" size={18} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Right Column: CTAs & Featured */}
                <div className="space-y-12">
                  <div className="bg-surface p-8 rounded-3xl border border-slate-100 space-y-8">
                    <h3 className="text-xl font-bold text-navy">Die Köpfe dahinter</h3>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <img src="https://cuirapartners.ch/wp-content/uploads/2025/01/4.png" alt="Kathir" className="w-20 h-20 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-navy">Kathir</p>
                          <p className="text-sm text-slate-600">Co-Founder</p>
                          <a href="mailto:kathir@kathiago.ch" className="text-sm text-primary hover:underline">kathir@kathiago.ch</a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <img src="https://cuirapartners.ch/wp-content/uploads/2025/01/3.png" alt="Tiago" className="w-20 h-20 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-navy">Tiago</p>
                          <p className="text-sm text-slate-600">Co-Founder</p>
                          <a href="mailto:tiago@kathiago.ch" className="text-sm text-primary hover:underline">tiago@kathiago.ch</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-navy text-white rounded-3xl space-y-4">
                    <h4 className="font-bold">Beratung benötigt?</h4>
                    <p className="text-sm text-slate-400">Sprechen Sie mit unseren Experten über Ihre individuelle Weiterbildung.</p>
                    <a href="/kontakt/" className="inline-flex items-center text-accent font-bold hover:underline">
                      Kontakt aufnehmen <ArrowRight size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Background click to close (optional, but requested) */}
            <div 
              className="absolute inset-0 -z-10 cursor-default" 
              onClick={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
