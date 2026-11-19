import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Download, Mail, MapPin, Phone } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { PrivacyModal, PrivacyModalMode } from './components/PrivacyModal';
import { QuoteForm } from './components/QuoteForm';
import { SectionBackdrop } from './components/SectionBackdrop';
import {
  ABOUT_HIGHLIGHTS,
  ABOUT_SUMMARY,
  BBBEE_CREDENTIALS,
  COLLABORATIONS,
  COMPANY_INFO,
  CORE_SERVICES,
  DIFFERENTIATORS,
  STRATEGIC_PILLARS,
} from './data/companyData';

const CONSENT_STORAGE_KEY = 'usizolethu_privacy_consent_v1';

const SECTION_IMAGES = {
  heroLoader: '/src/assets/images/bg_mining_loader_quarry_1795119970117.jpg',
  aboutOpenPit: '/src/assets/images/bg_openpit_excavation_1795119970184.jpg',
  servicesPpeElectrical: '/src/assets/images/bg_mining_ppe_electrical_1795119970339.jpg',
  credentialsPlantDusk: '/src/assets/images/bg_mining_plant_dusk_1795119970718.jpg',
};

export default function App() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [logoError, setLogoError] = useState(false);

  // Privacy modal state: opens automatically on first entry
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [privacyMode, setPrivacyMode] = useState<PrivacyModalMode>('notice');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!saved) {
        setPrivacyMode('notice');
        setPrivacyOpen(true);
      }
    } catch {
      setPrivacyMode('notice');
      setPrivacyOpen(true);
    }
  }, []);

  const handleAcceptPrivacy = () => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
    } catch {
      // Ignore storage failures in restricted contexts
    }
    setPrivacyOpen(false);
  };

  const openPolicyFromFooter = () => {
    setPrivacyMode('policy');
    setPrivacyOpen(true);
  };

  // Dynamic offset-aware smooth scroll using actual sticky header height
  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const headerHeight = headerRef.current ? headerRef.current.getBoundingClientRect().height : 64;
    const extraBreathingRoom = 16;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - extraBreathingRoom;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });

    if (sectionId === 'quote') {
      window.setTimeout(() => {
        const firstInput = document.getElementById('quote-full-name');
        firstInput?.focus({ preventScroll: true });
      }, 450);
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-neutral-900">
        <Navbar headerRef={headerRef} onNavigate={scrollToSection} />

        <main className="flex-1">
          {/* 1. HERO SECTION — Clean Light Canvas + Quarry Wheel Loader Backdrop + Architectural Guides */}
          <section
            id="home"
            className="relative overflow-hidden bg-white border-b border-neutral-200"
          >
            <SectionBackdrop
              src={SECTION_IMAGES.heroLoader}
              alt="Heavy yellow mining wheel loader operating beside a granite quarry face"
              imageClassName="opacity-85 object-right"
              scrimClassName="bg-gradient-to-r from-white/95 via-white/82 to-white/20"
            />

            {/* Subtle architectural gridlines */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 architectural-grid opacity-40"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 w-1/2 h-full border-l border-neutral-200/70 hidden lg:block"
            />

            <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
                {/* Left Column: Primary Proposition */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-normal text-neutral-600 tabular-nums mb-6">
                      Reg. {COMPANY_INFO.regNo} <span aria-hidden="true">·</span> Supplier{' '}
                      {COMPANY_INFO.supplierNo} <span aria-hidden="true">·</span> Level 1 BBBEE
                    </p>

                    <h1
                      className="text-neutral-900 font-medium mb-6"
                      style={{
                        fontSize: 'clamp(2.35rem, 4.3vw, 3.85rem)',
                        letterSpacing: '-0.035em',
                        lineHeight: 1.07,
                      }}
                    >
                      Reliable mining supply &amp; industrial distribution.
                    </h1>

                    <p className="text-base sm:text-lg text-neutral-700 font-normal max-w-2xl leading-relaxed mb-10">
                      Usizolethu Holdings (Pty) Ltd is a South African mining consultancy and
                      equipment partner delivering electrical mining supplies, certified personal
                      protective equipment, geological exploration, and national logistics.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-5">
                    <button
                      type="button"
                      onClick={() => scrollToSection('quote')}
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium text-white bg-neutral-900 hover:bg-[var(--color-brand)] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
                    >
                      <span>Request a Free Quote</span>
                      <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <a
                      href={COMPANY_INFO.profilePdfSrc}
                      download="Usizolethu_Holdings_Company_Profile.pdf"
                      className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-neutral-800 hover:text-[var(--color-brand)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--color-brand)]"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      <span>Company Profile (PDF)</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: High-Resolution Brand Emblem Frame */}
                <div className="lg:col-span-5 flex">
                  <div className="relative w-full bg-white/92 backdrop-blur-xs border border-neutral-200 p-8 sm:p-10 flex flex-col justify-between">
                    {/* Subtle geometric corner layout marks */}
                    <span
                      aria-hidden="true"
                      className="absolute top-3 left-3 w-3 h-3 border-t border-l border-neutral-300"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-3 w-3 h-3 border-t border-r border-neutral-300"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-neutral-300"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-neutral-300"
                    />

                    <div className="flex-1 flex items-center justify-center py-4">
                      {!logoError ? (
                        <img
                          src={COMPANY_INFO.logoSrc}
                          alt="Usizolethu Holdings emblem"
                          referrerPolicy="no-referrer"
                          onError={() => setLogoError(true)}
                          className="w-56 sm:w-64 h-auto object-contain select-none"
                        />
                      ) : (
                        <div className="w-56 h-56 bg-neutral-50 border border-neutral-200 flex flex-col items-center justify-center p-6 text-center">
                          <span className="text-xl font-medium text-neutral-900">
                            {COMPANY_INFO.shortName}
                          </span>
                          <span className="text-xs text-neutral-500 mt-1">
                            Mining &amp; Industrial Supply
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t border-neutral-200 flex items-center justify-between gap-4 text-xs text-neutral-600">
                      <span>Mpumalanga &amp; National</span>
                      <span className="tabular-nums">{COMPANY_INFO.phoneDisplay}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full-width 4-Column Foundational Strip */}
              <div className="mt-14 pt-8 pb-6 px-6 sm:px-8 border border-neutral-200/90 bg-white/88 backdrop-blur-sm grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <p className="text-2xl sm:text-3xl font-medium text-neutral-900 tabular-nums">
                    100%
                  </p>
                  <p className="text-sm text-neutral-700 mt-1">Black Youth Owned EME</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-medium text-[var(--color-brand)]">
                    Level 1
                  </p>
                  <p className="text-sm text-neutral-700 mt-1">BBBEE Contributor Status</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-medium text-neutral-900">
                    National
                  </p>
                  <p className="text-sm text-neutral-700 mt-1">Supply &amp; Fleet Distribution</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-medium text-neutral-900 tabular-nums">
                    MAAA1615450
                  </p>
                  <p className="text-sm text-neutral-700 mt-1">Registered CSD Supplier</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. ABOUT & STRATEGIC MANDATE — Open-Pit Terraced Mine Backdrop */}
          <section id="about" className="relative overflow-hidden bg-neutral-100 border-b border-neutral-200">
            <SectionBackdrop
              src={SECTION_IMAGES.aboutOpenPit}
              alt="Panoramic open-pit mining haul road with mining trucks and excavator"
              imageClassName="opacity-90"
              scrimClassName="bg-gradient-to-r from-white/92 via-white/70 to-white/20"
            />

            <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start"
              >
                <div className="lg:col-span-5 bg-white/85 backdrop-blur-sm border border-neutral-200/90 p-7 sm:p-9">
                  <p className="text-sm font-medium text-[var(--color-brand)] mb-3">
                    About Us
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 mb-6">
                    Built on resilience, safety, and local empowerment.
                  </h2>
                  <p className="text-neutral-700 text-[15px] sm:text-base leading-relaxed mb-8">
                    {ABOUT_SUMMARY}
                  </p>

                  <ul className="space-y-3 border-t border-neutral-300/70 pt-6">
                    {ABOUT_HIGHLIGHTS.map((item) => (
                      <li
                        key={item}
                        className="flex items-center justify-between text-sm text-neutral-800 py-1"
                      >
                        <span>{item}</span>
                        <span className="text-[var(--color-brand)] text-xs" aria-hidden="true">
                          —
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-neutral-300/70">
                    <p className="text-xs text-neutral-500">Executive Leadership</p>
                    <p className="text-base font-medium text-neutral-900 mt-1">
                      {COMPANY_INFO.director}
                    </p>
                    <p className="text-sm text-neutral-700">
                      Director <span aria-hidden="true">·</span>{' '}
                      <a
                        href={`mailto:${COMPANY_INFO.directorEmail}`}
                        className="hover:text-[var(--color-brand)] underline underline-offset-4"
                      >
                        {COMPANY_INFO.directorEmail}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Vision, Mission, Commitment, Approach — Hairline Grid */}
                <div className="lg:col-span-7 grid sm:grid-cols-2 border border-neutral-200 bg-white/95 backdrop-blur-xs">
                  {STRATEGIC_PILLARS.map((pillar, idx) => (
                    <div
                      key={pillar.title}
                      className={`p-8 ${
                        idx % 2 === 0 ? 'sm:border-r sm:border-neutral-200' : ''
                      } ${idx < 2 ? 'border-b border-neutral-200' : idx === 2 ? 'border-b sm:border-b-0 border-neutral-200' : ''}`}
                    >
                      <span className="block text-xs text-neutral-400 tabular-nums mb-3">
                        0{idx + 1}
                      </span>
                      <h3 className="text-xl font-medium text-neutral-900 mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-[15px] text-neutral-600 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* 3. CORE SUPPLIES & SERVICES — Mining PPE & Electrical Infrastructure Backdrop */}
          <section id="services" className="relative overflow-hidden bg-white border-b border-neutral-200">
            <SectionBackdrop
              src={SECTION_IMAGES.servicesPpeElectrical}
              alt="Mining safety hardhats and industrial electrical switchgear panels"
              imageClassName="opacity-85 object-right"
              scrimClassName="bg-gradient-to-r from-white/92 via-white/75 to-white/25"
            />

            <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
              <div className="max-w-2xl mb-12 bg-white/85 backdrop-blur-sm border border-neutral-200/90 p-7 sm:p-8">
                <p className="text-sm font-medium text-[var(--color-brand)] mb-3">
                  Core Supplies &amp; Services
                </p>
                <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 mb-4">
                  End-to-end equipment supply and operational support.
                </h2>
                <p className="text-neutral-700 text-[15px] sm:text-base">
                  Comprehensive mining services—spanning exploration surveys, electrical
                  infrastructure, personal protective equipment, and national logistics—delivered
                  with accountable safety standards.
                </p>
              </div>

              {/* Clean Editorial Service Rows */}
              <div className="border border-neutral-200/90 bg-white/86 backdrop-blur-sm px-6 sm:px-10">
                {CORE_SERVICES.map((service) => (
                  <motion.div
                    key={service.index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="py-8 sm:py-10 border-b border-neutral-300/80 grid md:grid-cols-12 gap-4 md:gap-8 items-baseline"
                  >
                    <div className="md:col-span-1 text-sm font-medium text-[var(--color-brand)] tabular-nums">
                      {service.index}.
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-xl sm:text-2xl font-medium text-neutral-900">
                        {service.title}
                      </h3>
                      <p className="text-xs text-neutral-600 mt-1.5">{service.scope}</p>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-[15px] sm:text-base text-neutral-700 leading-relaxed max-w-2xl">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Single Centered Call-to-Action at End of Services Section */}
              <div className="mt-14 flex justify-center">
                <button
                  type="button"
                  onClick={() => scrollToSection('quote')}
                  className="inline-flex items-center gap-2.5 px-9 py-4 text-sm font-medium text-white bg-neutral-900 hover:bg-[var(--color-brand)] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
                >
                  <span>Request a Free Quote</span>
                  <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </section>

          {/* 4. DIFFERENTIATORS, BBBEE CREDENTIALS & COLLABORATIONS — Illuminated Mining Plant Dusk Backdrop */}
          <section
            id="credentials"
            className="relative overflow-hidden bg-neutral-950 text-neutral-100 border-b border-neutral-800"
          >
            <SectionBackdrop
              src={SECTION_IMAGES.credentialsPlantDusk}
              alt="Illuminated steel mining processing plant and electrical substation at twilight"
              imageClassName="opacity-95"
              scrimClassName="bg-gradient-to-b from-neutral-950/78 via-neutral-950/38 to-neutral-950/78"
            />

            <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
              {/* Differentiators */}
              <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
                <div className="lg:col-span-6">
                  <p className="text-sm font-medium text-[var(--color-brand-accent)] mb-3">
                    Unique Market Differentiators
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-medium text-white">
                    Total quality management built for demanding sites.
                  </h2>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-[15px] sm:text-base text-neutral-300 leading-relaxed">
                    Our Total Quality Management policies integrate eco-friendly practices,
                    renewable energy adoption, and local community empowerment to ensure dependable,
                    long-term operational performance.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 border border-white/15 bg-neutral-950/75 backdrop-blur-xs">
                {DIFFERENTIATORS.map((item, idx) => (
                  <div
                    key={item.title}
                    className={`p-7 sm:p-8 ${
                      idx < 3 ? 'lg:border-r lg:border-white/15' : ''
                    } ${idx % 2 === 0 ? 'sm:border-r sm:border-white/15 lg:border-r' : 'sm:border-r-0'} ${
                      idx < 2 ? 'border-b lg:border-b-0 border-white/15' : idx === 2 ? 'border-b sm:border-b-0 border-white/15' : ''
                    }`}
                  >
                    <span className="block text-xs text-[var(--color-brand-accent)] tabular-nums mb-4">
                      {item.index}
                    </span>
                    <h3 className="text-lg font-medium text-white mb-2.5">{item.title}</h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Claim-to-Proof Adjacency: BBBEE Status & Trusted Collaborations */}
              <div className="mt-16 grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-6 bg-neutral-950/78 backdrop-blur-sm border border-white/15 p-7 sm:p-8">
                  <p className="text-sm font-medium text-[var(--color-brand-accent)] mb-3">
                    Transformation &amp; Compliance
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">
                    BBBEE Recognition &amp; Ownership
                  </h3>
                  <p className="text-[15px] text-neutral-300 mb-8 max-w-xl">
                    Competing actively as a local Exempted Micro Enterprise (EME), Usizolethu
                    Holdings brings verified transformation credentials to mining and industrial
                    supply chains.
                  </p>

                  <dl className="border-t border-white/15">
                    {BBBEE_CREDENTIALS.map((cred) => (
                      <div
                        key={cred.label}
                        className="py-4 border-b border-white/15 flex items-center justify-between gap-4"
                      >
                        <dt className="text-sm text-neutral-300">{cred.label}</dt>
                        <dd className="text-sm font-medium text-white tabular-nums">
                          {cred.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="lg:col-span-6 bg-neutral-950/78 backdrop-blur-sm border border-white/15 p-7 sm:p-8">
                  <p className="text-sm font-medium text-[var(--color-brand-accent)] mb-3">
                    Trusted Collaborations
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">
                    Public, Energy &amp; Construction Alignment
                  </h3>
                  <p className="text-[15px] text-neutral-300 mb-7 max-w-xl">
                    {COLLABORATIONS.lead}
                  </p>

                  <div className="pt-6 border-t border-white/15 space-y-6">
                    <div>
                      <p className="text-xs text-neutral-400 mb-3">
                        Key Institutional &amp; Industry Stakeholders
                      </p>
                      <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-lg font-medium text-white">
                        {COLLABORATIONS.namedPartners.map((partner) => (
                          <span key={partner}>{partner}</span>
                        ))}
                      </div>
                    </div>

                    <ul className="pt-5 border-t border-white/15 space-y-2.5 text-sm text-neutral-300">
                      {COLLABORATIONS.principles.map((principle) => (
                        <li key={principle} className="flex items-start gap-2.5">
                          <span className="text-[var(--color-brand-accent)] mt-0.5" aria-hidden="true">
                            ·
                          </span>
                          <span>{principle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. CONTACT & QUOTE / CALLBACK REQUEST — Prominent Quarry Loader Backdrop */}
          <section id="contact" className="relative overflow-hidden bg-white">
            <SectionBackdrop
              src={SECTION_IMAGES.heroLoader}
              alt="Mining site wheel loader and rock quarry wall"
              imageClassName="opacity-80 object-left"
              scrimClassName="bg-gradient-to-l from-white/90 via-white/65 to-white/25"
            />

            <div
              id="quote"
              className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24 grid lg:grid-cols-12 gap-12 lg:gap-14 items-start"
            >
              {/* Direct Contact Directory */}
              <div className="lg:col-span-5 bg-white/88 backdrop-blur-sm border border-neutral-200/90 p-7 sm:p-9">
                <p className="text-sm font-medium text-[var(--color-brand)] mb-3">
                  Get in Touch
                </p>
                <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 mb-5">
                  Request a quotation or technical callback.
                </h2>
                <p className="text-[15px] text-neutral-700 leading-relaxed mb-10">
                  Share your electrical supply specifications, PPE requirements, exploration scope,
                  or delivery schedule. Our team responds promptly to tender and direct procurement
                  enquiries.
                </p>

                <div className="space-y-5 border-t border-neutral-200 pt-7 text-sm">
                  <div className="flex items-start gap-3.5">
                    <Phone className="w-4 h-4 text-[var(--color-brand)] mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="block text-xs text-neutral-500">Telephone</span>
                      <a
                        href={COMPANY_INFO.phoneHref}
                        className="text-neutral-900 hover:text-[var(--color-brand)] transition-colors tabular-nums"
                      >
                        {COMPANY_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-4 h-4 text-[var(--color-brand)] mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="block text-xs text-neutral-500">General Enquiries</span>
                      <a
                        href={`mailto:${COMPANY_INFO.enquiriesEmail}`}
                        className="text-neutral-900 hover:text-[var(--color-brand)] transition-colors"
                      >
                        {COMPANY_INFO.enquiriesEmail}
                      </a>
                      <span className="block text-xs text-neutral-600 mt-1">
                        Director: {COMPANY_INFO.director} ({COMPANY_INFO.directorEmail})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-4 h-4 text-[var(--color-brand)] mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="block text-xs text-neutral-500">Registered Office</span>
                      <span className="text-neutral-900">{COMPANY_INFO.address}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-600 tabular-nums">
                  <span>Reg No: {COMPANY_INFO.regNo}</span>
                  <span>Supplier No: {COMPANY_INFO.supplierNo}</span>
                  <span>{COMPANY_INFO.website}</span>
                </div>
              </div>

              {/* Minimalist Quote Form */}
              <div className="lg:col-span-7">
                <div className="border border-neutral-200 bg-white/98 backdrop-blur-xs p-7 sm:p-10">
                  <h3 className="text-xl font-medium text-neutral-900 mb-6">
                    Quote &amp; Specification Form
                  </h3>
                  <QuoteForm />
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* QUIET FOOTER WITH LEGAL COMPLIANCE & ATTRIBUTION */}
        <footer className="bg-[#111315] text-neutral-300 border-t border-neutral-800">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="grid md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
              <div className="md:col-span-5">
                <p
                  className="text-lg font-medium text-white mb-2"
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
                >
                  {COMPANY_INFO.legalName}
                </p>
                <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
                  Electrical mining supplies, certified personal protective equipment, exploration
                  services, and national distribution.
                </p>
                <p className="text-xs text-neutral-500 mt-4 tabular-nums">
                  Reg. {COMPANY_INFO.regNo} <span aria-hidden="true">·</span> CSD{' '}
                  {COMPANY_INFO.supplierNo}
                </p>
              </div>

              <div className="md:col-span-3">
                <p className="text-xs font-medium text-neutral-400 mb-3">Navigation</p>
                <ul className="space-y-2 text-sm">
                  {[
                    { id: 'home', label: 'Home' },
                    { id: 'about', label: 'About Us' },
                    { id: 'services', label: 'Services' },
                    { id: 'credentials', label: 'Credentials' },
                    { id: 'contact', label: 'Contact' },
                  ].map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.id);
                        }}
                        className="text-neutral-300 hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-4">
                <p className="text-xs font-medium text-neutral-400 mb-3">Legal &amp; Downloads</p>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <button
                      type="button"
                      onClick={openPolicyFromFooter}
                      className="text-neutral-300 hover:text-white underline underline-offset-4 transition-colors cursor-pointer text-left"
                    >
                      Privacy &amp; Cookie Policy (POPIA / GDPR)
                    </button>
                  </li>
                  <li>
                    <a
                      href={COMPANY_INFO.profilePdfSrc}
                      download="Usizolethu_Holdings_Company_Profile.pdf"
                      className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
                    >
                      <span>Download Company Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Copyright & KS Digital Solutionz Credit */}
            <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-neutral-400">
              <p>
                © {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved.
              </p>

              <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>
                  Website created by{' '}
                  <a
                    href="https://ksdigitalsolutionz.co.za"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-200 hover:text-white underline underline-offset-4 transition-colors"
                  >
                    KS Digital Solutionz
                  </a>
                </span>
                <span aria-hidden="true">·</span>
                <a
                  href="mailto:admin@ksdigitalsolutionz.co.za"
                  className="text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  admin@ksdigitalsolutionz.co.za
                </a>
              </p>
            </div>
          </div>
        </footer>

        <PrivacyModal
          isOpen={privacyOpen}
          mode={privacyMode}
          onModeChange={setPrivacyMode}
          onAcceptAndClose={handleAcceptPrivacy}
          onClose={handleAcceptPrivacy}
        />
      </div>
    </MotionConfig>
  );
}
