import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Binoculars,
  Handshake,
  Mail,
  MapPin,
  Phone,
  Target,
  TrendingUp,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { PrivacyModal, PrivacyModalMode } from './components/PrivacyModal';
import { ChevronMotif, DotMatrixAccent } from './components/ProfileMotifs';
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

const PILLAR_ICONS = [Binoculars, Target, Handshake, TrendingUp];

export default function App() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);

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
      <div className="min-h-screen flex flex-col bg-[#1A1A1A] text-neutral-100">
        <Navbar headerRef={headerRef} onNavigate={scrollToSection} />

        <main className="flex-1">
          {/* 1. HERO SECTION — Dark Charcoal #1A1A1A + Quarry Wheel Loader + PDF Chevron Motif */}
          <section
            id="home"
            className="relative overflow-hidden bg-[#1A1A1A] border-b border-white/10"
          >
            <SectionBackdrop
              src={SECTION_IMAGES.heroLoader}
              alt="Heavy yellow mining wheel loader operating beside a granite quarry face"
              imageClassName="opacity-90 object-right"
              scrimClassName="bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/75 to-[#1A1A1A]/25"
            />

            {/* Subtle dark architectural gridlines */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 architectural-grid-dark opacity-70"
            />

            {/* Signature PDF 5-Chevron Motif */}
            <ChevronMotif className="hidden md:block absolute top-10 right-10 w-40 opacity-80" />

            <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-20 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
              <div className="max-w-2xl">
                <h1
                  className="text-white font-medium mb-6"
                  style={{
                    fontSize: 'clamp(2.35rem, 4.3vw, 3.85rem)',
                    letterSpacing: '-0.035em',
                    lineHeight: 1.07,
                  }}
                >
                  Mining &amp; water treatment{' '}
                  <span className="text-[#9ADBE8]">supply &amp; project delivery.</span>
                </h1>

                <p className="text-base sm:text-lg text-neutral-200 font-normal max-w-2xl leading-relaxed mb-10">
                  Usizolethu Technologies (Pty) Ltd is a South African technical partner delivering
                  electrical mining supplies, water treatment chemicals, infrastructure project
                  management, and dependable site support supplies.
                </p>

                <div className="flex flex-wrap items-center gap-5">
                  <button
                    type="button"
                    onClick={() => scrollToSection('quote')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium text-[#1A1A1A] bg-[#9ADBE8] hover:bg-white transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9ADBE8]"
                  >
                    <span>Request a Free Quote</span>
                    <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 2. ABOUT & VISION FOR THE FUTURE — Unboxed Editorial Split + Architectural Pillar Grid */}
          <section id="about" className="relative overflow-hidden bg-[#1A1A1A] border-b border-white/10">
            <SectionBackdrop
              src={SECTION_IMAGES.aboutOpenPit}
              alt="Panoramic open-pit mining haul road with mining trucks and excavator"
              imageClassName="opacity-85"
              scrimClassName="bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/82 to-[#1A1A1A]/45"
            />

            {/* PDF Dot Matrix Corner Accent */}
            <DotMatrixAccent className="hidden lg:block absolute bottom-4 right-6 w-44 opacity-80" />

            <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-start"
              >
                {/* Left Column: Open Unboxed Editorial Prose */}
                <div className="lg:col-span-5">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <h2 className="text-3xl sm:text-4xl font-medium text-white">
                      About <span className="text-[#9ADBE8]">Us</span>
                    </h2>
                    <ChevronMotif className="w-24 opacity-75 shrink-0" />
                  </div>

                  <p className="text-neutral-200 text-[15px] sm:text-base leading-relaxed mb-9">
                    {ABOUT_SUMMARY}
                  </p>

                  <ul className="space-y-4 border-t border-white/15 pt-7">
                    {ABOUT_HIGHLIGHTS.map((item, idx) => (
                      <li
                        key={item}
                        className="group flex items-center gap-3.5 text-sm sm:text-[15px] text-neutral-100"
                      >
                        <span
                          aria-hidden="true"
                          className={`h-[1.5px] transition-all duration-200 shrink-0 ${
                            idx === 0
                              ? 'w-6 bg-[#9ADBE8]'
                              : 'w-3 bg-white/40 group-hover:w-6 group-hover:bg-[#9ADBE8]'
                          }`}
                        />
                        <span className={idx === 0 ? 'text-[#9ADBE8] font-medium' : 'group-hover:text-white transition-colors'}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 pt-7 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-neutral-400">Director &amp; Founder</p>
                      <p className="text-base font-medium text-white mt-0.5">
                        {COMPANY_INFO.director}
                      </p>
                    </div>
                    <a
                      href={`mailto:${COMPANY_INFO.directorEmail}`}
                      className="text-sm text-[#9ADBE8] hover:text-white underline underline-offset-4 transition-colors"
                    >
                      {COMPANY_INFO.directorEmail}
                    </a>
                  </div>
                </div>

                {/* Right Column: Vision for the Future — Open Translucent Crosshair Grid */}
                <div className="lg:col-span-7 space-y-10">
                  <div className="border-b border-white/15 pb-8">
                    <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                      Vision for <span className="text-[#9ADBE8]">the Future</span>
                    </h3>
                    <p className="text-neutral-200 text-[15px] sm:text-base leading-relaxed max-w-2xl">
                      We aim to lead across mining and water treatment supply chains through
                      efficient distribution of electrical equipment, treatment chemicals, and
                      infrastructure project execution while empowering local communities.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 border-t border-l border-white/15 bg-[#141414]/45 backdrop-blur-sm">
                    {STRATEGIC_PILLARS.map((pillar, idx) => {
                      const IconComponent = PILLAR_ICONS[idx];
                      return (
                        <div
                          key={pillar.title}
                          className="group relative p-7 sm:p-8 border-r border-b border-white/15 transition-colors duration-200 hover:bg-[#141414]/75"
                        >
                          {/* Expanding top ice-cyan hairline on hover */}
                          <span
                            aria-hidden="true"
                            className={`absolute top-0 left-0 h-[2px] bg-[#9ADBE8] transition-all duration-300 ${
                              idx === 0 ? 'w-14 group-hover:w-full' : 'w-0 group-hover:w-full'
                            }`}
                          />

                          <div className="flex items-center justify-between mb-7">
                            <span className="text-xs text-[#9ADBE8]/80 tabular-nums">
                              0{idx + 1}
                            </span>
                            <IconComponent
                              className="w-4 h-4 text-[#9ADBE8]/75 group-hover:text-[#9ADBE8] transition-colors"
                              aria-hidden="true"
                            />
                          </div>

                          <h4 className="text-lg font-medium text-white group-hover:text-[#9ADBE8] transition-colors mb-2.5">
                            {pillar.title}
                          </h4>
                          <p className="text-sm text-neutral-300 leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* 3. CORE SUPPLIES & SERVICES — Open Interactive Editorial Bands (No Boxes, No Numbering, No Icons) */}
          <section id="services" className="relative overflow-hidden bg-[#1A1A1A] border-b border-white/10">
            <SectionBackdrop
              src={SECTION_IMAGES.servicesPpeElectrical}
              alt="Mining safety hardhats and industrial electrical switchgear panels"
              imageClassName="opacity-80 object-right"
              scrimClassName="bg-gradient-to-b from-[#1A1A1A]/90 via-[#1A1A1A]/72 to-[#1A1A1A]/92"
            />

            <ChevronMotif className="hidden md:block absolute bottom-12 left-10 w-36 opacity-70" />

            <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
              <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
                <div className="lg:col-span-5">
                  <p className="text-sm font-medium text-[#9ADBE8] mb-3">
                    Operational Scope
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-medium text-white">
                    Core Supplies &amp; <span className="text-[#9ADBE8]">Services</span>
                  </h2>
                </div>
                <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-[#9ADBE8]/45">
                  <p className="text-neutral-200 text-[15px] sm:text-base leading-relaxed">
                    Comprehensive mining and water treatment services—electrical mining supplies,
                    treatment chemicals, infrastructure project management, and dependable site
                    support—delivered with safety and accountability.
                  </p>
                </div>
              </div>

              {/* Interactive 2x2 Architectural Services Grid — Click to Reveal Details */}
              <div className="grid md:grid-cols-2 border-t border-l border-white/15 bg-[#141414]/45 backdrop-blur-sm">
                {CORE_SERVICES.map((service) => {
                  const isExpanded = expandedService === service.title;
                  return (
                    <button
                      key={service.title}
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpandedService((prev) =>
                          prev === service.title ? null : service.title,
                        )
                      }
                      className={`group relative text-left p-8 sm:p-10 border-r border-b border-white/15 flex flex-col justify-between transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#9ADBE8] ${
                        isExpanded ? 'bg-[#141414]/82' : 'hover:bg-[#141414]/70'
                      }`}
                    >
                      {/* Top hairline accent indicator */}
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-[#9ADBE8] origin-left transition-transform duration-300 ${
                          isExpanded
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />

                      <div className="w-full">
                        <div className="mb-4">
                          <h3
                            className={`text-xl sm:text-2xl font-medium transition-colors ${
                              isExpanded
                                ? 'text-[#9ADBE8]'
                                : 'text-white group-hover:text-[#9ADBE8]'
                            }`}
                          >
                            {service.title}
                          </h3>
                          <p className="text-xs text-[#9ADBE8]/80 mt-1.5">{service.scope}</p>
                        </div>

                        <p className="text-[15px] text-neutral-200 leading-relaxed">
                          {service.description}
                        </p>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 4 }}
                              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                              className="mt-6 pt-6 border-t border-white/15 space-y-4"
                            >
                              <p className="text-sm text-neutral-300 leading-relaxed">
                                {service.details}
                              </p>
                              <ul className="space-y-2 text-sm text-neutral-200">
                                {service.capabilities.map((cap) => (
                                  <li key={cap} className="flex items-start gap-2.5">
                                    <span className="text-[#9ADBE8]" aria-hidden="true">
                                      —
                                    </span>
                                    <span>{cap}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="mt-7 pt-4 border-t border-white/10 w-full flex items-center justify-between text-xs">
                        <span
                          className={`transition-colors ${
                            isExpanded
                              ? 'text-[#9ADBE8]'
                              : 'text-neutral-400 group-hover:text-[#9ADBE8]'
                          }`}
                        >
                          {isExpanded ? 'Hide details' : 'View details'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Single Centered Call-to-Action at End of Services Section */}
              <div className="mt-14 flex justify-center">
                <button
                  type="button"
                  onClick={() => scrollToSection('quote')}
                  className="inline-flex items-center justify-center px-9 py-4 text-sm font-medium text-[#1A1A1A] bg-[#9ADBE8] hover:bg-white transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9ADBE8]"
                >
                  Request a Free Quote
                </button>
              </div>
            </div>
          </section>

          {/* 4. DIFFERENTIATORS, BBBEE STATUS & COLLABORATIONS — Staggered Architectural Columns & Open Metrics */}
          <section
            id="credentials"
            className="relative overflow-hidden bg-[#1A1A1A] text-neutral-100 border-b border-white/10"
          >
            <SectionBackdrop
              src={SECTION_IMAGES.credentialsPlantDusk}
              alt="Illuminated steel mining processing plant and electrical substation at twilight"
              imageClassName="opacity-90"
              scrimClassName="bg-gradient-to-b from-[#1A1A1A]/85 via-[#1A1A1A]/55 to-[#1A1A1A]/92"
            />

            <ChevronMotif className="hidden md:block absolute top-10 right-10 w-36 opacity-75" />
            <DotMatrixAccent className="hidden lg:block absolute bottom-6 left-6 w-40 opacity-75" />

            <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
              {/* Differentiators Header */}
              <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
                <div className="lg:col-span-6">
                  <p className="text-sm font-medium text-[#9ADBE8] mb-3">
                    Total Quality Management
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-medium text-white">
                    Unique Market <span className="text-[#9ADBE8]">Differentiators</span>
                  </h2>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-[15px] sm:text-base text-neutral-200 leading-relaxed">
                    Our Total Quality Management policies integrate eco-friendly activities,
                    renewable energy use, and community empowerment, ensuring responsible
                    operations for long-term success.
                  </p>
                </div>
              </div>

              {/* Staggered Open Architectural Columns */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-white/15 bg-[#141414]/45 backdrop-blur-sm lg:divide-x lg:divide-white/12">
                {DIFFERENTIATORS.map((item, idx) => (
                  <div
                    key={item.title}
                    className={`group relative px-6 sm:px-7 pb-9 transition-colors duration-200 hover:bg-[#141414]/75 ${
                      idx % 2 === 1 ? 'pt-8 lg:pt-14' : 'pt-8 lg:pt-8'
                    } border-b sm:border-b-0 border-white/12 last:border-b-0`}
                  >
                    <span
                      aria-hidden="true"
                      className="block w-8 h-[1.5px] bg-[#9ADBE8] group-hover:w-full transition-all duration-300 mb-6"
                    />
                    <span className="block text-xs text-neutral-400 tabular-nums mb-3">
                      {item.index}
                    </span>
                    <h3 className="text-xl font-medium text-white group-hover:text-[#9ADBE8] transition-colors mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-200 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Claim-to-Proof Adjacency: Unboxed Broadsheet Metrics & Collaborations */}
              <div className="mt-20 grid lg:grid-cols-12 gap-14 lg:gap-16 items-start">
                <div className="lg:col-span-6">
                  <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                    BBBEE <span className="text-[#9ADBE8]">Status</span>
                  </h3>
                  <p className="text-[15px] text-neutral-200 mb-8 max-w-xl leading-relaxed">
                    Aiming to participate actively as a competitive local Exempted Micro Enterprise
                    (EME) across South Africa’s mining and industrial supply chains.
                  </p>

                  <dl className="border-t border-white/15">
                    {BBBEE_CREDENTIALS.map((cred) => (
                      <div
                        key={cred.label}
                        className="group py-5 border-b border-white/15 flex items-baseline justify-between gap-4 transition-colors hover:border-[#9ADBE8]/60"
                      >
                        <dt className="text-sm sm:text-[15px] text-neutral-200 group-hover:text-white transition-colors">
                          {cred.label}
                        </dt>
                        <dd className="text-lg sm:text-xl font-medium text-[#9ADBE8] tabular-nums">
                          {cred.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="lg:col-span-6">
                  <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                    Partners &amp; <span className="text-[#9ADBE8]">Clients</span>
                  </h3>
                  <p className="text-[15px] text-neutral-200 mb-8 max-w-xl leading-relaxed">
                    {COLLABORATIONS.lead}
                  </p>

                  <div className="pt-7 border-t border-white/15 space-y-7">
                    <div>
                      <p className="text-xs text-neutral-400 mb-4">
                        Trusted Institutions, Utilities &amp; Mining Operations
                      </p>
                      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-lg font-medium text-[#9ADBE8]">
                        {COLLABORATIONS.namedPartners.map((partner) => (
                          <span key={partner}>{partner}</span>
                        ))}
                      </div>
                    </div>

                    <ul className="pl-5 border-l border-[#9ADBE8]/60 space-y-3 text-sm sm:text-[15px] text-neutral-200">
                      {COLLABORATIONS.principles.map((principle) => (
                        <li key={principle}>{principle}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. CONTACT & QUOTE / CALLBACK REQUEST — Open Directory + Minimal Glass Specification Form */}
          <section id="contact" className="relative overflow-hidden bg-[#1A1A1A]">
            <SectionBackdrop
              src={SECTION_IMAGES.heroLoader}
              alt="Mining site wheel loader and rock quarry wall"
              imageClassName="opacity-80 object-left"
              scrimClassName="bg-gradient-to-l from-[#1A1A1A]/95 via-[#1A1A1A]/80 to-[#1A1A1A]/50"
            />

            <DotMatrixAccent className="hidden lg:block absolute top-10 right-8 w-40 opacity-75" />

            <div
              id="quote"
              className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 grid lg:grid-cols-12 gap-14 lg:gap-16 items-start"
            >
              {/* Unboxed Direct Contact Directory */}
              <div className="lg:col-span-5">
                <p className="text-sm font-medium text-[#9ADBE8] mb-3">
                  Direct Enquiries
                </p>
                <h2 className="text-3xl sm:text-4xl font-medium text-white mb-5">
                  Get in Touch <span className="text-[#9ADBE8]">With Us</span>
                </h2>
                <p className="text-[15px] text-neutral-200 leading-relaxed mb-10">
                  Share your electrical supply specifications, water treatment chemical volumes,
                  infrastructure project scope, or site delivery schedule. Our team responds promptly
                  to tender and direct procurement enquiries.
                </p>

                <div className="space-y-6 border-t border-white/15 pt-7 text-sm">
                  <div className="flex items-start gap-3.5">
                    <Phone className="w-4 h-4 text-[#9ADBE8] mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="block text-xs text-neutral-400">Telephone</span>
                      <a
                        href={COMPANY_INFO.phoneHref}
                        className="text-white hover:text-[#9ADBE8] transition-colors tabular-nums"
                      >
                        {COMPANY_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-4 h-4 text-[#9ADBE8] mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="block text-xs text-neutral-400">General Enquiries</span>
                      <a
                        href={`mailto:${COMPANY_INFO.enquiriesEmail}`}
                        className="text-white hover:text-[#9ADBE8] transition-colors"
                      >
                        {COMPANY_INFO.enquiriesEmail}
                      </a>
                      <span className="block text-xs text-neutral-300 mt-1">
                        Director: {COMPANY_INFO.director} ({COMPANY_INFO.directorEmail})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-4 h-4 text-[#9ADBE8] mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="block text-xs text-neutral-400">Registered Office</span>
                      <span className="text-white">{COMPANY_INFO.address}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-9 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-300 tabular-nums">
                  <span>{COMPANY_INFO.website}</span>
                  <span>{COMPANY_INFO.address}</span>
                </div>
              </div>

              {/* Minimalist Frosted Glass Specification Form */}
              <div className="lg:col-span-7">
                <div className="border-t-2 border-[#9ADBE8] bg-[#141414]/65 backdrop-blur-md p-7 sm:p-10">
                  <h3 className="text-xl font-medium text-white mb-7">
                    Quote &amp; Specification Form
                  </h3>
                  <QuoteForm selectedService={expandedService} />
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* QUIET FOOTER WITH LEGAL COMPLIANCE, PROFILE PDF LINK & ATTRIBUTION */}
        <footer className="bg-[#141414] text-neutral-300 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="grid md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
              <div className="md:col-span-5">
                <p className="text-lg font-medium text-white mb-2" style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}>
                  Usizolethu <span className="text-[#9ADBE8]">Technologies</span>
                </p>
                <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
                  Electrical mining supplies, water treatment chemicals, infrastructure project
                  management, and site support supplies.
                </p>
                <p className="text-xs text-neutral-300 mt-4 tabular-nums">
                  Reg No. : <span className="text-white">{COMPANY_INFO.regNo}</span>{' '}
                  <span aria-hidden="true" className="text-[#9ADBE8] mx-1.5">·</span>
                  CSD Supplier No. : <span className="text-white">{COMPANY_INFO.supplierNo}</span>
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
                        className="text-neutral-300 hover:text-[#9ADBE8] transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-4">
                <p className="text-xs font-medium text-neutral-400 mb-3">Legal &amp; Resources</p>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <button
                      type="button"
                      onClick={openPolicyFromFooter}
                      className="text-neutral-300 hover:text-[#9ADBE8] underline underline-offset-4 transition-colors cursor-pointer text-left"
                    >
                      Privacy &amp; Cookie Policy (POPIA / GDPR)
                    </button>
                  </li>
                  <li>
                    <a
                      href={COMPANY_INFO.profilePdfSrc}
                      download="Usizolethu_Technologies_Company_Profile.pdf"
                      className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-[#9ADBE8] underline underline-offset-4 transition-colors"
                    >
                      <span>Download Company Profile (PDF)</span>
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
                    className="text-neutral-200 hover:text-[#9ADBE8] underline underline-offset-4 transition-colors"
                  >
                    KS Digital Solutionz
                  </a>
                </span>
                <span aria-hidden="true">·</span>
                <a
                  href="mailto:admin@ksdigitalsolutionz.co.za"
                  className="text-neutral-400 hover:text-[#9ADBE8] transition-colors"
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
