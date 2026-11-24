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
  legalName: 'Usizolethu Technologies (Pty) Ltd',
  shortName: 'Usizolethu Technologies',
  regNo: '2023/551466/07',
  supplierNo: 'MAAA1615450',
  director: 'Vuyo Nyathikazi',
  directorEmail: 'info@usizolethu.co.za',
  enquiriesEmail: 'info@usizolethu.co.za',
  phoneDisplay: '+27 72 951 3106',
  phoneHref: 'tel:+27729513106',
  website: 'www.usizolethu.com',
  address: 'Stand no. 80888, Daantjie Trust, 1216',
  logoSrc: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_17.36.14_2cc48165.jpeg',
  profilePdfSrc: '/assets/aistudio/Mining_Company_Profile_8fd0e86e.pdf',
};

export const ABOUT_SUMMARY =
  'Usizolethu Technologies (Pty) Ltd is a specialized consultancy and supply enterprise strategically positioned to serve South Africa’s mining and water treatment sectors. Founded by a young black Chief Executive Officer, the company pairs disciplined technical delivery with community empowerment and environmentally responsible operations.';

export const ABOUT_HIGHLIGHTS = [
  'Trusted mining & water treatment supplier',
  'Committed to eco-friendly operations',
  'Operating nationally with local focus',
  'Innovation-driven safe efficiency',
];

export const STRATEGIC_PILLARS: StrategicPillar[] = [
  {
    title: 'Vision',
    description:
      'To be the national benchmark in the efficient delivery of electrical mining supplies, water treatment chemicals, and critical infrastructure support.',
  },
  {
    title: 'Mission',
    description:
      'Delivering essential mining and water treatment resources responsibly while maximizing long-term stakeholder value.',
  },
  {
    title: 'Commitment',
    description:
      'Prioritizing workplace safety, environmentally responsible water and site practices, and compliant execution across every project.',
  },
  {
    title: 'Approach',
    description:
      'Driving practical engineering coordination and accountable supply management in every phase of operations.',
  },
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    index: '01',
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
    index: '02',
    title: 'Water Treatment Chemicals and Supplies',
    scope: 'Process Water · Effluent & Potable Treatment',
    description:
      'Consistent procurement and bulk delivery of industrial water treatment chemicals, dosing consumables, and plant supplies for municipal and mine-water facilities.',
    details:
      'Clean process water and compliant effluent management are essential to mine and municipal continuity. We supply quality-assured treatment chemicals and plant consumables tailored to raw-water clarification, pH correction, and disinfection.',
    capabilities: [
      'Coagulants, flocculants, and pH-balancing treatment chemicals',
      'Dosing consumables, filtration media, and testing supplies',
      'Scheduled bulk replenishment for municipal and mine treatment plants',
    ],
  },
  {
    index: '03',
    title: 'Project Management for Mining and Water Treatment Infrastructure Projects',
    scope: 'Capital Delivery · Technical Coordination',
    description:
      'Structured end-to-end project management covering planning, contractor coordination, procurement scheduling, and commissioning for mining and water treatment infrastructure.',
    details:
      'We guide complex infrastructure upgrades and new installations from initial scope definition through handover—aligning engineering milestones, safety compliance, and material lead times to keep sites on budget and on schedule.',
    capabilities: [
      'Scope scheduling, resource planning, and milestone governance',
      'Multi-contractor coordination for plant and reticulation builds',
      'Quality assurance, SHEQ compliance, and commissioning handover',
    ],
  },
  {
    index: '04',
    title: 'General Mining and Water Treatment Site Support Supplies',
    scope: 'Site Operations · PPE & Maintenance Consumables',
    description:
      'Comprehensive day-to-day operational supplies—including certified PPE, maintenance hardware, and site support consumables—delivered directly to active mining and water sites.',
    details:
      'Keep active crews equipped and sites compliant with one accountable supply partner. We consolidate routine site consumables, safety gear, and mechanical hardware into dependable scheduled deliveries.',
    capabilities: [
      'Certified personal protective equipment (PPE) for site personnel',
      'Valves, fittings, tools, and routine plant maintenance hardware',
      'Direct-to-site logistics for regional and national operations',
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
      'Building a benchmark 100% black youth-owned and led provider of mining and water treatment infrastructure and supplies.',
  },
];

export const BBBEE_CREDENTIALS = [
  { label: 'Black Ownership', value: '100%' },
  { label: 'Youth Ownership', value: '100%' },
  { label: 'Male Ownership', value: '100%' },
  { label: 'BBBEE Recognition', value: 'Level 1 Contributor' },
];

export const COLLABORATIONS = {
  lead: 'Strong partnerships across municipal authorities, national energy utilities, catchment agencies, and active mining operations drive compliant, long-term delivery.',
  namedPartners: [
    'Emalahleni Local Municipality',
    'ESKOM',
    'Inkomati-Usuthu Catchment Area',
    'Fairview Mine',
  ],
  principles: [
    'Municipal, catchment, and energy alignment ensuring compliant growth',
    'Long-term supply and infrastructure contracts structured for stability',
    'Ethical governance guiding responsible mining and water practices',
  ],
};
