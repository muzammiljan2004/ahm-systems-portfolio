/* ============================================================================
 * PROJECTS
 * ----------------------------------------------------------------------------
 * Published work. The Projects section renders the placeholder state while this
 * array is empty and switches to the full grid as soon as entries exist.
 *
 * TO ADD A PROJECT, push an object like:
 *
 *   {
 *     id: 'acme-crm',
 *     title: 'Acme CRM',
 *     category: 'Web Development · CRM',
 *     description: 'What the client needed and what was built.',
 *     tags: ['React', 'Node.js', 'PostgreSQL'],
 *     year: '2026',
 *     liveUrl: 'https://example.com',   // omit if there is nothing public
 *     repoUrl: null,
 *     accent: 'primary',                // 'primary' | 'violet' | 'cyan'
 *   }
 *
 * Only publish client names and links you have permission to use.
 * ==========================================================================*/

export interface Project {
  id: string;
  title: string;
  /** Short line under the title, e.g. "Web Development · CRM". */
  category: string;
  description: string;
  /** Technology or service tags. */
  tags: string[];
  year: string;
  /** Public link, or null if there isn't one. */
  liveUrl?: string | null;
  repoUrl?: string | null;
  /** Card accent colour. */
  accent?: 'primary' | 'violet' | 'cyan';
}

export const projects: Project[] = [
  /* ------------------------------------------------------------- ongoing */
  {
    id: 'ibcp-scada',
    title: 'IBCP-SCADA',
    category: 'Cyber-Physical Systems · ML · In progress',
    description:
      'The Indus Basin Cyber-Physical SCADA System — a unified platform for flood management, water distribution and agricultural intelligence across Pakistan’s Indus Basin. Telemetry from barrages, canals and weather stations feeds a forecasting layer that drives flood early-warning, equitable canal scheduling and downstream crop advisories from a single operations console.',
    tags: [
      'SCADA',
      'IoT Telemetry',
      'Machine Learning',
      'Hydrological Forecasting',
      'Time-Series',
      'Python',
      'Digital Twin',
    ],
    year: '2026 — Ongoing',
    liveUrl: null,
    repoUrl: null,
    accent: 'cyan',
  },
  {
    id: 'smart-agriculture',
    title: 'Smart Agriculture',
    category: 'Machine Learning · AgriTech · In progress',
    description:
      'A field-level intelligence system built alongside IBCP-SCADA. Soil, moisture and micro-climate sensor streams are combined with satellite imagery to produce irrigation scheduling, crop-health detection and yield forecasts, delivered to growers as plain recommendations rather than raw dashboards.',
    tags: [
      'Machine Learning',
      'Computer Vision',
      'Remote Sensing',
      'IoT Sensors',
      'Python',
      'Yield Forecasting',
    ],
    year: '2026 — Ongoing',
    liveUrl: null,
    repoUrl: null,
    accent: 'cyan',
  },

  /* ----------------------------------------------------------- completed */
  {
    id: 'cpdi-asset-management',
    title: 'CPDI Asset Management System',
    category: 'Web Development · Internal Systems',
    description:
      'An asset register, assignment tracker and depreciation engine built for the Centre for Peace and Development Initiatives (CPDI), Pakistan. At any point in time the system answers one question for management: what assets does the organisation hold, who holds them, and what are they worth today.',
    tags: [
      'Asset Register',
      'Depreciation Engine',
      'Custody Tracking',
      'Reporting',
      'Web App',
      'Relational DB',
    ],
    year: '2025',
    liveUrl: null,
    repoUrl: null,
    accent: 'primary',
  },
  {
    id: 'flexi-pay',
    title: 'Flexi-Pay',
    category: 'FinTech · Installment Management',
    description:
      'A smart installment management system covering the full lifecycle of a financed sale — plan setup, customer onboarding, schedule generation, payment capture, late-fee handling and arrears follow-up. Collections staff get a single queue of who owes what today instead of a spreadsheet per customer.',
    tags: [
      'Installment Plans',
      'Payment Scheduling',
      'Arrears Tracking',
      'Invoicing',
      'Web App',
      'Role-Based Access',
    ],
    year: '2025',
    liveUrl: null,
    repoUrl: null,
    accent: 'violet',
  },
  {
    id: 'we-go',
    title: 'We Go',
    category: 'Mobile & Web · Travel Platform',
    description:
      'A travel and ride-coordination platform connecting travellers with routes, operators and companions. Covers search and discovery, the booking flow, live trip state and a review loop, with an admin side for managing listings and users.',
    tags: ['Mobile App', 'Booking Flow', 'Maps & Routing', 'Authentication', 'REST API'],
    year: '2025',
    liveUrl: null,
    repoUrl: null,
    accent: 'primary',
  },
  {
    id: 'flutter-app-suite',
    title: 'Flutter App Suite',
    category: 'Mobile Development · Cross-Platform',
    description:
      'A set of cross-platform Flutter builds covering the patterns most client apps need: state management, authentication, API integration, local persistence and responsive layouts that behave the same on Android and iOS.',
    tags: ['Flutter', 'Dart', 'Cross-Platform', 'State Management', 'REST API', 'Firebase'],
    year: '2025',
    liveUrl: null,
    repoUrl: null,
    accent: 'violet',
  },

  /* --------------------------------------------------- lead intel / CRM */
  {
    id: 'lead-intel-engine',
    title: 'Lead Intel Engine',
    category: 'Lead Intelligence · Internal Platform',
    description:
      'Our in-house prospect research pipeline. An ideal-customer profile is turned into a scored, verified account list: firmographic enrichment, decision-maker mapping, email and phone verification, and a qualification score that decides what reaches the outreach queue and what gets discarded.',
    tags: [
      'Lead Research',
      'Data Enrichment',
      'Email Verification',
      'Lead Scoring',
      'Automation',
      'Python',
    ],
    year: '2026',
    liveUrl: null,
    repoUrl: null,
    accent: 'primary',
  },
  {
    id: 'crm-pipeline-suite',
    title: 'CRM Pipeline Suite',
    category: 'CRM Development · Sales Operations',
    description:
      'A configurable sales CRM for teams that have outgrown their spreadsheet. Custom pipeline stages, activity and call logging, task reminders, deal forecasting and role-based dashboards, with an import layer that accepts verified lead lists without manual re-keying.',
    tags: ['CRM', 'Pipeline Management', 'Deal Forecasting', 'Dashboards', 'React', 'PostgreSQL'],
    year: '2026',
    liveUrl: null,
    repoUrl: null,
    accent: 'violet',
  },
  {
    id: 'outreach-automation',
    title: 'Outreach Automation Stack',
    category: 'Automation · Appointment Setting',
    description:
      'The sequencing layer that sits between the lead engine and the CRM. Multi-channel cadences across email and LinkedIn, reply detection and routing, calendar handoff for booked calls, and per-campaign reporting on reply, show and conversion rates.',
    tags: [
      'Cold Email',
      'Multi-Channel Cadence',
      'Calendar Booking',
      'Reply Routing',
      'Campaign Analytics',
      'Workflow Automation',
    ],
    year: '2026',
    liveUrl: null,
    repoUrl: null,
    accent: 'cyan',
  },
];
