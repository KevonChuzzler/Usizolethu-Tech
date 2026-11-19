import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export type PrivacyModalMode = 'notice' | 'policy';

interface PrivacyModalProps {
  isOpen: boolean;
  mode: PrivacyModalMode;
  onModeChange: (mode: PrivacyModalMode) => void;
  onAcceptAndClose: () => void;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  mode,
  onModeChange,
  onAcceptAndClose,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="relative w-full max-w-2xl max-h-[88vh] flex flex-col bg-white border border-neutral-200 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 pb-5 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[var(--color-brand)] shrink-0" aria-hidden="true" />
            <div>
              <h2
                id="privacy-modal-title"
                className="text-xl sm:text-2xl font-medium text-neutral-900"
              >
                {mode === 'notice' ? 'Privacy & Data Protection Notice' : 'Privacy & Cookie Policy'}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                {COMPANY_INFO.legalName} · POPIA &amp; GDPR Compliant
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close privacy modal"
            className="w-10 h-10 -mr-2 -mt-1 inline-flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-brand)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 sm:px-8 py-6 overflow-y-auto space-y-5 text-sm sm:text-[15px] text-neutral-600 leading-relaxed">
          {mode === 'notice' ? (
            <>
              <p className="text-neutral-800">
                Welcome to {COMPANY_INFO.legalName}. In accordance with South Africa’s{' '}
                <strong className="font-medium text-neutral-900">
                  Protection of Personal Information Act (POPIA)
                </strong>{' '}
                and international <strong className="font-medium text-neutral-900">GDPR</strong>{' '}
                standards, we handle all visitor and business enquiry information transparently.
              </p>

              <div className="grid sm:grid-cols-2 gap-5 pt-2 border-t border-neutral-200">
                <div>
                  <h3 className="text-sm font-medium text-neutral-900 mb-1.5">
                    Essential Storage Only
                  </h3>
                  <p className="text-sm text-neutral-600">
                    This site stores only your privacy acknowledgement locally in your browser. We do
                    not run third-party advertising trackers or sell browsing data.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-900 mb-1.5">
                    Quote &amp; Callback Enquiries
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Contact details submitted through our quote form are used exclusively to respond
                    to your mining supply, PPE, or consultation request.
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-500 pt-2">
                You may request access to, correction of, or deletion of your personal records at
                any time by contacting{' '}
                <a
                  href={`mailto:${COMPANY_INFO.enquiriesEmail}`}
                  className="text-[var(--color-brand)] underline underline-offset-2"
                >
                  {COMPANY_INFO.enquiriesEmail}
                </a>
                .
              </p>
            </>
          ) : (
            <div className="space-y-5">
              <section>
                <h3 className="text-base font-medium text-neutral-900 mb-1.5">
                  1. Responsible Party
                </h3>
                <p>
                  This website is operated by {COMPANY_INFO.legalName} (Registration Number:{' '}
                  <span className="tabular-nums">{COMPANY_INFO.regNo}</span>, CSD Supplier Number:{' '}
                  <span className="tabular-nums">{COMPANY_INFO.supplierNo}</span>), situated at{' '}
                  {COMPANY_INFO.address}.
                </p>
              </section>

              <section>
                <h3 className="text-base font-medium text-neutral-900 mb-1.5">
                  2. Information We Collect &amp; Purpose
                </h3>
                <p>
                  When you submit a quote or callback request, we collect only the details you
                  voluntarily provide—such as your name, company name, email address, telephone
                  number, requested service category, and technical specifications. This information
                  is used strictly to prepare quotations, coordinate supplier compliance, and
                  communicate regarding your enquiry.
                </p>
              </section>

              <section>
                <h3 className="text-base font-medium text-neutral-900 mb-1.5">
                  3. Cookies &amp; Local Browser Storage
                </h3>
                <p>
                  We use strictly necessary browser storage to remember whether you have reviewed
                  this Privacy &amp; Cookie Policy. We do not deploy invasive behavioral analytics,
                  cross-site tracking cookies, or third-party marketing pixels.
                </p>
              </section>

              <section>
                <h3 className="text-base font-medium text-neutral-900 mb-1.5">
                  4. Data Security &amp; Retention
                </h3>
                <p>
                  We apply appropriate technical and organizational safeguards to protect your
                  submission records against unauthorized access or disclosure. Enquiry data is
                  retained only as long as necessary to fulfill procurement correspondence or meet
                  applicable South African statutory record-keeping duties.
                </p>
              </section>

              <section>
                <h3 className="text-base font-medium text-neutral-900 mb-1.5">
                  5. Your Rights &amp; Record Deletion Requests
                </h3>
                <p>
                  Under POPIA and GDPR, you have the right to request confirmation of whether we
                  hold personal information about you, request a copy of those records, ask for
                  inaccurate information to be updated, or request permanent deletion of your data.
                  To exercise any of these rights, email{' '}
                  <a
                    href={`mailto:${COMPANY_INFO.enquiriesEmail}?subject=POPIA%20Data%20Request`}
                    className="text-[var(--color-brand)] underline underline-offset-2"
                  >
                    {COMPANY_INFO.enquiriesEmail}
                  </a>{' '}
                  or call <span className="tabular-nums">{COMPANY_INFO.phoneDisplay}</span>.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-4 bg-neutral-50 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          {mode === 'notice' ? (
            <>
              <button
                type="button"
                onClick={() => onModeChange('policy')}
                className="text-sm font-medium text-neutral-700 hover:text-[var(--color-brand)] underline underline-offset-4 transition-colors cursor-pointer py-2"
              >
                Read Full Policy
              </button>
              <button
                type="button"
                onClick={onAcceptAndClose}
                className="px-6 py-2.5 text-sm font-medium text-white bg-neutral-900 hover:bg-[var(--color-brand)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
              >
                Accept &amp; Continue
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onModeChange('notice')}
                className="text-sm font-normal text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer py-2"
              >
                Back to Summary
              </button>
              <button
                type="button"
                onClick={onAcceptAndClose}
                className="px-6 py-2.5 text-sm font-medium text-white bg-neutral-900 hover:bg-[var(--color-brand)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
              >
                Acknowledge &amp; Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
