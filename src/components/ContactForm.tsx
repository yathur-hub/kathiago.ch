import React, { useState } from 'react';

interface FormDataState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormDataState>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormDataState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name as keyof FormDataState]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormDataState, string>> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'Bitte geben Sie Ihren Vornamen ein.';
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Bitte geben Sie Ihren Nachnamen ein.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Bitte geben Sie Ihre Telefonnummer ein.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Bitte geben Sie eine Nachricht ein.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getTrackingData = () => {
    if (typeof window === 'undefined') {
      return {
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: '',
        current_url: '',
        referrer: '',
        landing_page: '',
        submitted_at: ''
      };
    }

    let utm_source = '';
    let utm_medium = '';
    let utm_campaign = '';
    let utm_term = '';
    let utm_content = '';
    let landing_page = '';
    let referrer = '';

    try {
      utm_source = sessionStorage.getItem('contact_utm_source') || '';
      utm_medium = sessionStorage.getItem('contact_utm_medium') || '';
      utm_campaign = sessionStorage.getItem('contact_utm_campaign') || '';
      utm_term = sessionStorage.getItem('contact_utm_term') || '';
      utm_content = sessionStorage.getItem('contact_utm_content') || '';
      landing_page = sessionStorage.getItem('contact_landing_page') || '';
      referrer = sessionStorage.getItem('contact_referrer') || '';
    } catch (e) {
      console.warn('Could not read sessionStorage:', e);
    }

    return {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      current_url: window.location.href,
      referrer: referrer || document.referrer || '',
      landing_page: landing_page || window.location.href,
      submitted_at: new Date().toISOString()
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');

    const trackingData = getTrackingData();
    const payload = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
      ...trackingData
    };

    try {
      const response = await fetch('https://formspree.io/f/xykrklkz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Server-Fehler beim Senden.');
      }

      const data = await response.json().catch(() => ({}));
      if (data.ok === false) {
        throw new Error(data.error || 'Server-Fehler beim Senden.');
      }

      setIsSuccess(true);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      console.error('Form submission failed:', err);
      setSubmitError('Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt unter info@kathiago.ch.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 px-4 transition-all duration-500 animate-fade-in" aria-live="polite">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-navy mb-3">Vielen Dank!</h3>
        <p className="text-slate-600 max-w-sm mx-auto">
          Ihre Nachricht wurde erfolgreich übermittelt. Wir werden uns so schnell wie möglich bei Ihnen melden.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-slate-700 mb-2">
            Vorname
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            required
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Ihr Vorname"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all text-navy ${
              errors.first_name
                ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-500'
                : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
            }`}
          />
          {errors.first_name && (
            <p className="text-xs text-rose-600 mt-1" id="error-first_name">
              {errors.first_name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-slate-700 mb-2">
            Nachname
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            required
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Ihr Nachname"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all text-navy ${
              errors.last_name
                ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-500'
                : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
            }`}
          />
          {errors.last_name && (
            <p className="text-xs text-rose-600 mt-1" id="error-last_name">
              {errors.last_name}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
          E-Mail-Adresse
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="beispiel@domain.ch"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all text-navy ${
            errors.email
              ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-500'
              : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
          }`}
        />
        {errors.email && (
          <p className="text-xs text-rose-600 mt-1" id="error-email">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
          Telefonnummer
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="+41 78 900 88 10"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all text-navy ${
            errors.phone
              ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-500'
              : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
          }`}
        />
        {errors.phone && (
          <p className="text-xs text-rose-600 mt-1" id="error-phone">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Wie können wir Ihnen helfen?"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all text-navy resize-none ${
            errors.message
              ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-500'
              : 'border-slate-200 focus:ring-primary/20 focus:border-primary'
          }`}
        ></textarea>
        {errors.message && (
          <p className="text-xs text-rose-600 mt-1" id="error-message">
            {errors.message}
          </p>
        )}
      </div>

      {submitError && <p className="text-sm text-rose-600">{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full py-4 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all disabled:opacity-50"
      >
        {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
      </button>
    </form>
  );
}
