import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
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

            <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
                {/* Left Column: Primary Proposition */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-normal text-neutral-300 tabular-nums mb-6">
                      Reg No. : <span className="text-white">{COMPANY_INFO.regNo}</span>{' '}
                      <span aria-hidden="true" className="text-[#9ADBE8] mx-1.5">·</span>
                      Supplier No. : <span className="text-white">{COMPANY_INFO.supplierNo}</span>
                    </p>

                    <h1
                      className="text-white font-medium mb-6"
                      style={{
                        fontSize: 'clamp(2.35rem, 4.3vw, 3.85rem)',
                        letterSpacing: '-0.035em',
                        lineHeight: 1.07,
                      }}
                    >
                      Reliable mining supply{' '}
                      <span className="text-[#9ADBE8]">&amp; industrial distribution.</span>
                    </h1>

                    <p className="text-base sm:text-lg text-neutral-200 font-normal max-w-2xl leading-relaxed mb-10">
                      Usizolethu Holdings (Pty) Ltd is a South African mining consultancy and
                      equipment partner delivering electrical mining supplies, certified personal
                      protective equipment, geological exploration, and national logistics.
                    </p>
                  </div>

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

                {/* Right Column: Framed Brand Emblem Card matching Dark/Ice-Cyan Contrast */}
                <div className="lg:col-span-5 flex">
                  <div className="relative w-full bg-[#141414]/88 backdrop-blur-sm border border-[#9ADBE8]/45 p-7 sm:p-9 flex flex-col justify-between">
                    {/* Subtle geometric corner marks */}
                    <span
                      aria-hidden="true"
                      className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#9ADBE8]/60"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#9ADBE8]/60"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#9ADBE8]/60"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#9ADBE8]/60"
                    />

                    <div className="flex-1 flex items-center justify-center py-3">
                      {!logoError ? (
                        <div className="bg-white p-5 sm:p-6 border border-white/15">
                          <img
                            src={COMPANY_INFO.logoSrc}
                            alt="Usizolethu Holdings emblem"
                            referrerPolicy="no-referrer"
                            onError={() => setLogoError(true)}
                            className="w-48 sm:w-56 h-auto object-contain select-none"
                          />
                        </div>
                      ) : (
                        <div className="w-56 h-56 bg-[#1A1A1A] border border-[#9ADBE8]/40 flex flex-col items-center justify-center p-6 text-center">
                          <span className="text-xl font-medium text-white">
                            {COMPANY_INFO.shortName}
                          </span>
                          <span className="text-xs text-[#9ADBE8] mt-1">
                            Mining &amp; Industrial Supply
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-5 border-t border-white/15 flex items-center justify-between gap-4 text-xs text-neutral-300">
                      <span>
                        Presented by:{' '}
                        <span className="text-white">{COMPANY_INFO.director}</span>
                      </span>
                      <span className="tabular-nums text-[#9ADBE8]">{COMPANY_INFO.phoneDisplay}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full-width 4-Column Foundational Strip */}
              <div className="mt-14 pt-8 pb-6 px-6 sm:px-8 border border-[#9ADBE8]/35 bg-[#141414]/85 backdrop-blur-sm grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <p className="text-2xl sm:text-3xl font-medium text-white tabular-nums">
                    100%
                  </p>
                  <p className="text-sm text-neutral-300 mt-1">Black Youth Owned EME</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-medium text-[#9ADBE8]">
                    Level 1
                  </p>
                  <p className="text-sm text-neutral-300 mt-1">BBBEE Contributor Status</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-medium text-white">
                    National
                  </p>
                  <p className="text-sm text-neutral-300 mt-1">Supply &amp; Fleet Distribution</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-medium text-[#9ADBE8] tabular-nums">
                    MAAA1615450
                  </p>
                  <p className="text-sm text-neutral-300 mt-1">Registered CSD Supplier</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. ABOUT & VISION FOR THE FUTURE — Open-Pit Mine Backdrop + PDF Page 2 & 3 Visual Structure */}
          <section id="about" className="relative overflow-hidden bg-[#1A1A1A] border-b border-white/10">
            <SectionBackdrop
              src={SECTION_IMAGES.aboutOpenPit}
              alt="Panoramic open-pit mining haul road with mining trucks and excavator"
              imageClassName="opacity-85"
              scrimClassName="bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/75 to-[#1A1A1A]/35"
            />

            {/* PDF Dot Matrix Corner Accent */}
            <DotMatrixAccent className="hidden lg:block absolute bottom-4 right-6 w-44 opacity-85" />

            <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-16"
              >
                {/* Top Split: About Us + Leadership */}
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-6 bg-[#141414]/86 backdrop-blur-sm border border-[#9ADBE8]/35 p-7 sm:p-9">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <h2 className="text-3xl sm:text-4xl font-medium text-white">
                        About <span className="text-[#9ADBE8]">Us</span>
                      </h2>
                      <ChevronMotif className="w-24 opacity-75 shrink-0" />
                    </div>
                    <p className="text-neutral-200 text-[15px] sm:text-base leading-relaxed mb-8">
                      {ABOUT_SUMMARY}
                    </p>

                    <ul className="space-y-3.5 border-t border-white/15 pt-6">
                      {ABOUT_HIGHLIGHTS.map((item, idx) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-sm sm:text-[15px] text-neutral-100"
                        >
                          <span
                            aria-hidden="true"
                            className={`w-2 h-2 shrink-0 ${
                              idx === 0 ? 'bg-[#9ADBE8]' : 'border border-[#9ADBE8]'
                            }`}
                          />
                          <span className={idx === 0 ? 'text-[#9ADBE8] font-medium' : ''}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
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

                  {/* Vision for the Future Intro + 4 Pillars mirroring PDF Page 3 */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="bg-[#141414]/82 backdrop-blur-sm border border-white/15 p-7 sm:p-8">
                      <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                        Vision for <span className="text-[#9ADBE8]">the Future</span>
                      </h3>
                      <p className="text-neutral-300 text-[15px] leading-relaxed">
                        We aim to lead the mining industry through efficient distribution of
                        electrical equipment and personal protective equipment, creating value for
                        stakeholders while empowering local communities.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {STRATEGIC_PILLARS.map((pillar, idx) => {
                        const isVision = idx === 0;
                        const IconComponent = PILLAR_ICONS[idx];
                        return (
                          <div
                            key={pillar.title}
                            className={`p-6 sm:p-7 flex flex-col justify-between transition-colors ${
                              isVision
                                ? 'bg-[#9ADBE8] text-[#1A1A1A] border border-[#9ADBE8]'
                                : 'bg-[#141414]/85 backdrop-blur-sm text-white border border-[#9ADBE8]/50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-6">
                              <span
                                className={`text-xs tabular-nums ${
                                  isVision ? 'text-[#1A1A1A]/70' : 'text-[#9ADBE8]'
                                }`}
                              >
                                0{idx + 1}
                              </span>
                              <div
                                className={`w-9 h-9 flex items-center justify-center ${
                                  isVision
                                    ? 'bg-[#1A1A1A] text-[#9ADBE8]'
                                    : 'bg-[#9ADBE8] text-[#1A1A1A]'
                                }`}
                              >
                                <IconComponent className="w-4 h-4" aria-hidden="true" />
                              </div>
                            </div>

                            <div>
                              <h4
                                className={`text-lg font-medium mb-2 ${
                                  isVision ? 'text-[#1A1A1A]' : 'text-white'
                                }`}
                              >
                                {pillar.title}
                              </h4>
                              <p
                                className={`text-sm leading-relaxed ${
                                  isVision ? 'text-[#1A1A1A]/85' : 'text-neutral-300'
                                }`}
                              >
                                {pillar.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* 3. CORE SUPPLIES & SERVICES — PPE & Electrical Switchgear Backdrop + Editorial List */}
          <section id="services" className="relative overflow-hidden bg-[#1A1A1A] border-b border-white/10">
            <SectionBackdrop
              src={SECTION_IMAGES.servicesPpeElectrical}
              alt="Mining safety hardhats and industrial electrical switchgear panels"
              imageClassName="opacity-80 object-right"
              scrimClassName="bg-gradient-to-b from-[#1A1A1A]/90 via-[#1A1A1A]/68 to-[#1A1A1A]/92"
            />

            <ChevronMotif className="hidden md:block absolute bottom-12 left-10 w-36 opacity-70" />

            <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
              <div className="grid lg:grid-cols-12 gap-10 mb-12 items-end">
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
                    Comprehensive mining services—supply and delivery of electrical mining
                    supplies, personal protective equipment, geological exploration, and national
                    logistics—delivered with safety and innovation.
                  </p>
                </div>
              </div>

              {/* Clean Editorial Service Rows */}
              <div className="border border-[#9ADBE8]/35 bg-[#141414]/86 backdrop-blur-sm px-6 sm:px-10">
                {CORE_SERVICES.map((service) => (
                  <motion.div
                    key={service.index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="py-8 sm:py-10 border-b border-white/12 last:border-b-0 grid md:grid-cols-12 gap-4 md:gap-8 items-baseline"
                  >
                    <div className="md:col-span-1 text-sm font-medium text-[#9ADBE8] tabular-nums">
                      {service.index}.
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-xl sm:text-2xl font-medium text-white">
                        {service.title}
                      </h3>
                      <p className="text-xs text-[#9ADBE8]/85 mt-1.5">{service.scope}</p>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-[15px] sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
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
                  className="inline-flex items-center gap-2.5 px-9 py-4 text-sm font-medium text-[#1A1A1A] bg-[#9ADBE8] hover:bg-white transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9ADBE8]"
                >
                  <span>Request a Free Quote</span>
                  <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </section>

          {/* 4. DIFFERENTIATORS, BBBEE STATUS & COLLABORATIONS — Illuminated Mining Plant Backdrop */}
          <section
            id="credentials"
            className="relative overflow-hidden bg-[#1A1A1A] text-neutral-100 border-b border-white/10"
          >
            <SectionBackdrop
              src={SECTION_IMAGES.credentialsPlantDusk}
              alt="Illuminated steel mining processing plant and electrical substation at twilight"
              imageClassName="opacity-90"
              scrimClassName="bg-gradient-to-b from-[#1A1A1A]/85 via-[#1A1A1A]/45 to-[#1A1A1A]/88"
            />

            <ChevronMotif className="hidden md:block absolute top-10 right-10 w-36 opacity-75" />
            <DotMatrixAccent className="hidden lg:block absolute bottom-6 left-6 w-40 opacity-75" />

            <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
              {/* Differentiators */}
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

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {DIFFERENTIATORS.map((item) => (
                  <div
                    key={item.title}
                    className="p-7 bg-[#141414]/84 backdrop-blur-sm border border-[#9ADBE8]/55 flex flex-col justify-between"
                  >
                    <div>
                      <span className="block text-xs text-[#9ADBE8] tabular-nums mb-4">
                        {item.index}
                      </span>
                      <h3 className="text-lg font-medium text-[#9ADBE8] mb-3">{item.title}</h3>
                      <p className="text-sm text-neutral-200 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Claim-to-Proof Adjacency: BBBEE Status & Trusted Collaborations */}
              <div className="mt-16 grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-6 bg-[#141414]/86 backdrop-blur-sm border border-[#9ADBE8]/45 p-7 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                    BBBEE <span className="text-[#9ADBE8]">Status</span>
                  </h3>
                  <p className="text-[15px] text-neutral-300 mb-7 max-w-xl">
                    Aiming to participate actively as a competitive local Exempted Micro Enterprise
                    (EME) across South Africa’s mining and industrial supply chains.
                  </p>

                  <dl className="space-y-3">
                    {BBBEE_CREDENTIALS.map((cred) => (
                      <div
                        key={cred.label}
                        className="px-5 py-3.5 border border-[#9ADBE8]/55 bg-[#1A1A1A]/75 flex items-center justify-between gap-4"
                      >
                        <dt className="text-sm text-neutral-200">{cred.label}</dt>
                        <dd className="text-sm font-medium text-[#9ADBE8] tabular-nums">
                          {cred.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="lg:col-span-6 bg-[#141414]/86 backdrop-blur-sm border border-[#9ADBE8]/45 p-7 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                    Trusted <span className="text-[#9ADBE8]">Collaborations</span>
                  </h3>
                  <p className="text-[15px] text-neutral-300 mb-7 max-w-xl">
                    {COLLABORATIONS.lead}
                  </p>

                  <div className="pt-6 border-t border-white/15 space-y-6">
                    <div>
                      <p className="text-xs text-neutral-400 mb-3">
                        Institutional &amp; Energy Stakeholders
                      </p>
                      <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-lg font-medium text-[#9ADBE8]">
                        {COLLABORATIONS.namedPartners.map((partner) => (
                          <span key={partner}>{partner}</span>
                        ))}
                      </div>
                    </div>

                    <ul className="pl-5 border-l border-[#9ADBE8]/60 space-y-2.5 text-sm text-neutral-200">
                      {COLLABORATIONS.principles.map((principle) => (
                        <li key={principle}>{principle}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. CONTACT & QUOTE / CALLBACK REQUEST — Dark Quarry Loader Backdrop */}
          <section id="contact" className="relative overflow-hidden bg-[#1A1A1A]">
            <SectionBackdrop
              src={SECTION_IMAGES.heroLoader}
              alt="Mining site wheel loader and rock quarry wall"
              imageClassName="opacity-80 object-left"
              scrimClassName="bg-gradient-to-l from-[#1A1A1A]/94 via-[#1A1A1A]/75 to-[#1A1A1A]/35"
            />

            <DotMatrixAccent className="hidden lg:block absolute top-10 right-8 w-40 opacity-75" />

            <div
              id="quote"
              className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24 grid lg:grid-cols-12 gap-12 lg:gap-14 items-start"
            >
              {/* Direct Contact Directory */}
              <div className="lg:col-span-5 bg-[#141414]/88 backdrop-blur-sm border border-[#9ADBE8]/40 p-7 sm:p-9">
                <p className="text-sm font-medium text-[#9ADBE8] mb-3">
                  Direct Enquiries
                </p>
                <h2 className="text-3xl sm:text-4xl font-medium text-white mb-5">
                  Get in Touch <span className="text-[#9ADBE8]">With Us</span>
                </h2>
                <p className="text-[15px] text-neutral-300 leading-relaxed mb-10">
                  Share your electrical supply specifications, PPE requirements, exploration scope,
                  or delivery schedule. Our team responds promptly to tender and direct procurement
                  enquiries.
                </p>

                <div className="space-y-5 border-t border-white/15 pt-7 text-sm">
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
                      <span className="block text-xs text-neutral-400 mt-1">
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

                <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-400 tabular-nums">
                  <span>Reg No: {COMPANY_INFO.regNo}</span>
                  <span>Supplier No: {COMPANY_INFO.supplierNo}</span>
                  <span>{COMPANY_INFO.website}</span>
                </div>
              </div>

              {/* Minimalist Dark Quote Form */}
              <div className="lg:col-span-7">
                <div className="border border-[#9ADBE8]/40 bg-[#1A1A1A]/90 backdrop-blur-sm p-7 sm:p-10">
                  <h3 className="text-xl font-medium text-white mb-6">
                    Quote &amp; Specification Form
                  </h3>
                  <QuoteForm />
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
                <p
                  className="text-lg font-medium text-white mb-2"
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
                >
                  {COMPANY_INFO.shortName}{' '}
                  <span className="text-[#9ADBE8]">(Pty) Ltd</span>
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
                      download="Usizolethu_Holdings_Company_Profile.pdf"
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
