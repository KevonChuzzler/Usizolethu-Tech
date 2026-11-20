export interface ServiceItem {
  index: string;
  title: string;
  scope: string;
  description: string;
  details: string;
  capabilities: string[];
}

export interface StrategicPillar {
  title: string;
  description: string;
}

export interface DifferentiatorItem {
  index: string;
  title: string;
  description: string;
}

export const COMPANY_INFO = {
  legalName: 'Usizolethu Holdings (Pty) Ltd',
  shortName: 'Usizolethu Holdings',
  regNo: '2023/551466/07',
  supplierNo: 'MAAA1615450',
  director: 'Vuyo Nyathikazi',
  directorEmail: 'vuyon@usizolethu.co.za',
  enquiriesEmail: 'enquiries@usizolethu.co.za',
  phoneDisplay: '+27 72 951 3106',
  phoneHref: 'tel:+27729513106',
  website: 'www.usizolethu.com',
  address: 'Stand no. 80888, Daantjie Trust, 1216',
  logoSrc: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_17.36.14_2cc48165.jpeg',
  profilePdfSrc: '/assets/aistudio/Mining_Company_Profile_8fd0e86e.pdf',
};

export const ABOUT_SUMMARY =
  'Usizolethu Holdings (Pty) Ltd is a mining consultancy and supply enterprise strategically positioned to serve a diverse clientele across South Africa’s mining sector. Founded by a young black Chief Executive Officer, the company pairs disciplined operational execution with community empowerment and environmentally responsible delivery.';

export const ABOUT_HIGHLIGHTS = [
  'Trusted mining equipment supplier',
  'Committed to eco-friendly operations',
  'Operating nationally with local focus',
  'Innovation-driven safe efficiency',
];

export const STRATEGIC_PILLARS: StrategicPillar[] = [
  {
    title: 'Vision',
    description:
      'To be the national benchmark in the efficient distribution of electrical mining supplies and personal protective equipment.',
  },
  {
    title: 'Mission',
    description:
      'Delivering essential industrial and mining resources responsibly while maximizing long-term stakeholder value.',
  },
  {
    title: 'Commitment',
    description:
      'Prioritizing workplace safety, environmentally responsible practices, and healthy operating conditions across every site.',
  },
  {
    title: 'Approach',
    description:
      'Driving practical innovation and accountable supply coordination in every phase of mining operations.',
  },
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    index: '01',
    title: 'Exploration',
    scope: 'Geological Surveys · Resource Discovery',
    description:
      'Structured geological surveys and modern exploration technology supporting accurate site assessment, mineral mapping, and early-stage resource discovery.',
    details:
      'Our exploration consultancy supports project owners from preliminary reconnaissance through site delineation. We combine field survey execution with modern geophysical and mapping workflows to reduce uncertainty prior to capital deployment.',
    capabilities: [
      'Surface and subsurface geological site assessments',
      'Mineral deposit mapping and resource boundary verification',
      'Exploration technology coordination with environmental compliance',
    ],
  },
  {
    index: '02',
    title: 'Electrical Mining Supplies',
    scope: 'Industrial Power · Mine Infrastructure',
    description:
      'Dependable sourcing and site-ready distribution of certified electrical mining supplies engineered for demanding underground and surface operating environments.',
    details:
      'We supply robust, standards-compliant electrical equipment built to withstand high-load mining operations, moisture, and dust exposure—helping operations minimize downtime and maintain continuous power distribution.',
    capabilities: [
      'Heavy-duty trailing cables, switchgear, and isolation panels',
      'Substation and site-power distribution components',
      'Specification-matched procurement for mine maintenance teams',
    ],
  },
  {
    index: '03',
    title: 'Safe Equipment Supplies',
    scope: 'Personal Protective Equipment · Workforce Safety',
    description:
      'High-specification personal protective equipment (PPE) and safety gear built to protect mining personnel and maintain strict regulatory site compliance.',
    details:
      'Safety underpins every operation we serve. We procure and deliver durable, certified PPE tailored for underground crews, plant operators, and surface engineering teams in accordance with South African mine health and safety standards.',
    capabilities: [
      'Impact-rated hardhats, high-visibility workwear, and protective footwear',
      'Respiratory, hearing, and eye protection for high-dust zones',
      'Bulk replenishment schedules for active mine sites and contractors',
    ],
  },
  {
    index: '04',
    title: 'Logistics',
    scope: 'National Transport · Scheduled Distribution',
    description:
      'Reliable transport, fleet coordination, and scheduled distribution connecting equipment hubs directly to regional and national mining markets.',
    details:
      'We bridge the gap between industrial manufacturers and remote mining operations across Mpumalanga and national corridors, managing dispatch scheduling, load security, and on-site delivery accountability.',
    capabilities: [
      'Scheduled mine-site freight across regional and national routes',
      'Urgent plant and replacement-part dispatch coordination',
      'End-to-end chain-of-custody tracking to mine receiving bays',
    ],
  },
];

export const DIFFERENTIATORS: DifferentiatorItem[] = [
  {
    index: '01',
    title: 'Adaptability',
    description:
      'The operational agility to assess shifting site conditions rapidly and adjust procurement and delivery schedules without delay.',
  },
  {
    index: '02',
    title: 'Efficiency',
    description:
      'Understanding exact technical and procurement specifications upfront to deliver tailored, waste-free supply solutions.',
  },
  {
    index: '03',
    title: 'Goal Driven',
    description:
      'Accountable execution measured against turnaround milestones, compliance standards, and consistent contract performance.',
  },
  {
    index: '04',
    title: 'Leadership',
    description:
      'Building a benchmark 100% black youth-owned and led provider of mining plant, electrical infrastructure, and safety equipment.',
  },
];

export const BBBEE_CREDENTIALS = [
  { label: 'Black Ownership', value: '100%' },
  { label: 'Youth Ownership', value: '100%' },
  { label: 'Male Ownership', value: '100%' },
  { label: 'BBBEE Recognition', value: 'Level 1 Contributor' },
];

export const COLLABORATIONS = {
  lead: 'Strong partnerships with energy utilities, municipal authorities, and construction enterprises support sustainable growth and dependable long-term delivery.',
  namedPartners: ['Eskom', 'Emalahleni Local Municipality'],
  principles: [
    'Public and energy sector alignment ensuring fully compliant growth',
    'Long-term supply contracts structured for operational stability',
    'Ethical governance guiding responsible mining procurement',
  ],
};
