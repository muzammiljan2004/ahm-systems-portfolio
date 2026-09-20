/* ============================================================================
 * EXPERIENCE
 * ----------------------------------------------------------------------------
 * Real engagements, newest first. Entries render as a vertical timeline.
 *
 * `isTemplate: true` marks an entry as an unfilled placeholder — the UI dims
 * the row and shows a "Template" badge. Every entry below is real, so they are
 * all set to false. When adding a new row, keep the claims to things a client
 * could actually verify.
 * ==========================================================================*/

export interface ExperienceEntry {
  id: string;
  /** e.g. "2026 — Present" */
  period: string;
  /** e.g. "Lead Generation Partner" */
  role: string;
  /** Company, client or "Independent". */
  organisation: string;
  /** Two or three sentences on what the work involved. */
  summary: string;
  /** Concrete responsibilities or outcomes. */
  highlights: string[];
  /** Service tags. */
  tags: string[];
  /**
   * True while this is still a placeholder. The UI shows a "Template" badge
   * and dims the row until you set it to false.
   */
  isTemplate: boolean;
}

export const experienceEntries: ExperienceEntry[] = [
  {
    id: 'ibcp-scada',
    period: '2026 — Ongoing',
    role: 'Systems & ML Engineering',
    organisation: 'IBCP-SCADA · Indus Basin Cyber-Physical SCADA System',
    summary:
      'Ongoing work on a unified cyber-physical platform for flood management, water distribution and agricultural intelligence across Pakistan’s Indus Basin. The engagement covers the telemetry layer, the forecasting models that sit on top of it, and the operations console that river and canal staff actually work from.',
    highlights: [
      'Designing the SCADA telemetry pipeline for barrage, canal and weather-station data',
      'Building hydrological forecasting models for flood early-warning and canal scheduling',
      'Feeding downstream crop and irrigation advisories from the same data backbone',
      'Delivering a single operations console over what were previously disconnected systems',
    ],
    tags: ['SCADA', 'Machine Learning', 'IoT', 'Data Engineering'],
    isTemplate: false,
  },
  {
    id: 'smart-agriculture',
    period: '2026 — Ongoing',
    role: 'Machine Learning Engineering',
    organisation: 'Smart Agriculture · Final Year Project',
    summary:
      'A field-level agricultural intelligence system developed in parallel with IBCP-SCADA and sharing its data layer. Sensor streams and satellite imagery are turned into irrigation schedules, crop-health alerts and yield forecasts that growers can act on without reading a dashboard.',
    highlights: [
      'Training crop-health and yield-forecast models on sensor and remote-sensing data',
      'Building the computer-vision pipeline for imagery-based crop condition detection',
      'Translating model output into plain irrigation and treatment recommendations',
    ],
    tags: ['Machine Learning', 'Computer Vision', 'AgriTech', 'Python'],
    isTemplate: false,
  },
  {
    id: 'ahm-lead-intel',
    period: '2026 — Present',
    role: 'Lead Intelligence & Sales Systems',
    organisation: 'AHM Systems',
    summary:
      'Our core service line. We define the ideal customer profile, research and verify matching accounts and decision-makers, qualify intent, and run the outreach that turns a name on a list into a booked conversation — with the CRM and automation built to hold it all together.',
    highlights: [
      'Built the in-house Lead Intel Engine: enrichment, verification and lead scoring',
      'Developed the CRM Pipeline Suite — custom stages, activity logging and forecasting',
      'Ran multi-channel outreach cadences with reply routing and calendar handoff',
      'Reported per-campaign on reply, show and conversion rates rather than raw volume',
    ],
    tags: ['Lead Intelligence', 'CRM Development', 'Appointment Setting', 'Automation'],
    isTemplate: false,
  },
  {
    id: 'flexi-pay',
    period: '2025',
    role: 'Full-Stack Development',
    organisation: 'Flexi-Pay · Smart Installment Management System',
    summary:
      'Built an installment management system covering the full lifecycle of a financed sale. The brief was to replace a spreadsheet-per-customer process with one queue that tells collections staff who owes what today.',
    highlights: [
      'Implemented plan setup, schedule generation and automated late-fee handling',
      'Built the payment capture and arrears follow-up workflow',
      'Added role-based access separating sales, collections and management views',
    ],
    tags: ['FinTech', 'Web Development', 'Database Design'],
    isTemplate: false,
  },
  {
    id: 'cpdi',
    period: '2025',
    role: 'Full-Stack Development',
    organisation: 'Centre for Peace and Development Initiatives (CPDI), Pakistan',
    summary:
      'Delivered an asset register, assignment tracker and depreciation engine for CPDI. The system was scoped around a single management question: what assets does the organisation hold, who holds them, and what are they worth today.',
    highlights: [
      'Built the asset register with custody and assignment history per item',
      'Implemented the depreciation engine producing current book value on demand',
      'Delivered management reporting over holdings, custody and valuation',
    ],
    tags: ['Web Development', 'Internal Systems', 'Reporting'],
    isTemplate: false,
  },
  {
    id: 'mobile-platforms',
    period: '2025',
    role: 'Mobile & Platform Development',
    organisation: 'We Go · Flutter App Suite',
    summary:
      'Two cross-platform builds delivered in the same period. We Go is a travel and ride-coordination platform with booking, live trip state and an admin back office; the Flutter suite covers the app patterns most client projects reuse.',
    highlights: [
      'Built the We Go booking flow, routing and review loop with an admin back office',
      'Delivered Flutter builds covering auth, state management, API and offline persistence',
      'Shipped to both Android and iOS from one codebase',
    ],
    tags: ['Flutter', 'Mobile Development', 'REST API', 'UI Engineering'],
    isTemplate: false,
  },
];

/** True when nothing real has been added yet — drives the section's notice. */
export const experienceIsEmpty = experienceEntries.every((entry) => entry.isTemplate);
