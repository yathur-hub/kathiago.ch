import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ContactForm from './ContactForm';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
      }

      if (target && target.tagName === 'A') {
        // If we are already on the contact page, do not intercept contact page links
        if (
          window.location.pathname === '/kontakt' ||
          window.location.pathname === '/kontakt/'
        ) {
          return;
        }

        const href = target.getAttribute('href');
        // Intercept both relative and absolute links to /kontakt or /kontakt/
        if (
          href === '/kontakt' ||
          href === '/kontakt/' ||
          href?.endsWith('/kontakt') ||
          href?.endsWith('/kontakt/') ||
          target.hasAttribute('data-contact-trigger')
        ) {
          e.preventDefault();
          setIsOpen(true);
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    // Register global window functions for manual JS access
    (window as any).openContactModal = () => setIsOpen(true);
    (window as any).closeContactModal = () => setIsOpen(false);

    // Escape key closes modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('keydown', handleKeyDown);
      try {
        delete (window as any).openContactModal;
        delete (window as any).closeContactModal;
      } catch (err) {
        // Fallback for environment constraints
      }
    };
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm"
          />

          {/* Modal content container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full max-h-[90vh] overflow-y-auto relative z-10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-xl font-bold text-navy">Kontakt aufnehmen</h3>
                <p className="text-xs text-slate-500">Wir melden uns in Kürze bei Ihnen.</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-navy hover:bg-slate-100 transition-colors"
                aria-label="Schließen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
