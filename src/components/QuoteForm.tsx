import React, { useState } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO, CORE_SERVICES } from '../data/companyData';

interface QuoteFormState {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  details: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  details?: string;
}

const INITIAL_STATE: QuoteFormState = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  service: CORE_SERVICES[0].title,
  details: '',
};

const INPUT_CLASS =
  'w-full px-1 py-3.5 text-[15px] text-white bg-transparent border-0 border-b border-white/25 placeholder:text-neutral-500 transition-colors duration-200 focus:outline-none focus:border-[#9ADBE8]';

interface QuoteFormProps {
  selectedService?: string | null;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ selectedService }) => {
  const [form, setForm] = useState<QuoteFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedData, setSubmittedData] = useState<QuoteFormState | null>(null);

  React.useEffect(() => {
    if (selectedService) {
      setForm((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Please provide a valid email address.';
    }
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!form.phone.trim() || phoneDigits.length < 9) {
      nextErrors.phone = 'Please enter a valid contact number.';
    }
    if (!form.details.trim() || form.details.trim().length < 10) {
      nextErrors.details = 'Please describe your required supplies, quantities, or site timeline.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmittedData({ ...form });
  };

  const handleReset = () => {
    setForm(INITIAL_STATE);
    setErrors({});
    setSubmittedData(null);
  };

  const buildMailtoHref = (data: QuoteFormState) => {
    const subject = encodeURIComponent(
      `Quote Request: ${data.service} — ${data.company || data.fullName}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${data.fullName}`,
        `Organization: ${data.company || 'N/A'}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Service Required: ${data.service}`,
        '',
        'Specifications & Scope:',
        data.details,
      ].join('\n'),
    );
    return `mailto:${COMPANY_INFO.enquiriesEmail}?subject=${subject}&body=${body}`;
  };

  if (submittedData) {
    return (
      <div className="pt-4">
        <div className="flex items-center gap-3 text-white mb-5">
          <div className="w-7 h-7 bg-[#9ADBE8] flex items-center justify-center">
            <Check className="w-4 h-4 text-[#1A1A1A]" />
          </div>
          <span className="text-sm font-medium text-[#9ADBE8]">
            Enquiry Prepared for Review
          </span>
        </div>

        <h3 className="text-2xl font-medium text-white mb-3">
          Thank you, {submittedData.fullName}.
        </h3>
        <p className="text-neutral-300 text-[15px] mb-6 max-w-xl leading-relaxed">
          Your specification summary for{' '}
          <strong className="font-medium text-white">{submittedData.service}</strong> has been
          validated. Send it directly via your email client to reach our procurement desk, or call{' '}
          <a
            href={COMPANY_INFO.phoneHref}
            className="text-[#9ADBE8] underline underline-offset-4 tabular-nums hover:text-white"
          >
            {COMPANY_INFO.phoneDisplay}
          </a>{' '}
          for urgent mine-site dispatches.
        </p>

        <div className="border-t border-white/15 pt-5 mb-8 grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="block text-xs text-neutral-400">Organization</span>
            <span className="text-white">{submittedData.company || 'Individual Enquiry'}</span>
          </div>
          <div>
            <span className="block text-xs text-neutral-400">Contact</span>
            <span className="text-white tabular-nums">
              {submittedData.email} · {submittedData.phone}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={buildMailtoHref(submittedData)}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#1A1A1A] bg-[#9ADBE8] hover:bg-white transition-colors"
          >
            <span>Send via Email Client</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-3 text-sm font-normal text-neutral-300 hover:text-white border-b border-white/25 hover:border-[#9ADBE8] transition-colors cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="quote-full-name" className="block text-xs font-medium text-neutral-400 mb-1">
            Full Name <span className="text-[#9ADBE8]">*</span>
          </label>
          <input
            id="quote-full-name"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="e.g. Thabo Mokoena"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            aria-invalid={Boolean(errors.fullName)}
            className={INPUT_CLASS}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-company" className="block text-xs font-medium text-neutral-400 mb-1">
            Company / Mine Operation
          </label>
          <input
            id="quote-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Organization name"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="quote-email" className="block text-xs font-medium text-neutral-400 mb-1">
            Email Address <span className="text-[#9ADBE8]">*</span>
          </label>
          <input
            id="quote-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="procurement@company.co.za"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            aria-invalid={Boolean(errors.email)}
            className={INPUT_CLASS}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-phone" className="block text-xs font-medium text-neutral-400 mb-1">
            Telephone / Mobile <span className="text-[#9ADBE8]">*</span>
          </label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+27 72 000 0000"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            aria-invalid={Boolean(errors.phone)}
            className={`${INPUT_CLASS} tabular-nums`}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="quote-service" className="block text-xs font-medium text-neutral-400 mb-1">
          Primary Supply or Service Category
        </label>
        <select
          id="quote-service"
          name="service"
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className={`${INPUT_CLASS} cursor-pointer`}
        >
          {CORE_SERVICES.map((svc) => (
            <option key={svc.title} value={svc.title} className="bg-[#1A1A1A] text-white">
              {svc.title}
            </option>
          ))}
          <option value="Multi-Site Mining & Water Treatment Support" className="bg-[#1A1A1A] text-white">
            Multi-Site Mining &amp; Water Treatment Support
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="quote-details" className="block text-xs font-medium text-neutral-400 mb-1">
          Project Specifications &amp; Delivery Location <span className="text-[#9ADBE8]">*</span>
        </label>
        <textarea
          id="quote-details"
          name="details"
          rows={3}
          placeholder="Outline electrical supplies, water treatment chemical volumes, project scope, or site delivery schedule..."
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
          aria-invalid={Boolean(errors.details)}
          className={`${INPUT_CLASS} resize-y`}
        />
        {errors.details && (
          <p className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.details}
          </p>
        )}
      </div>

      <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xs text-neutral-400 max-w-sm">
          Protected under POPIA. Details are used exclusively to respond to your quotation or
          callback request.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-[#1A1A1A] bg-[#9ADBE8] hover:bg-white transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9ADBE8]"
        >
          Submit Quote Request
        </button>
      </div>
    </form>
  );
};
