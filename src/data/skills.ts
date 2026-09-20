import {
  Smartphone,
  Code2,
  Workflow,
  Sparkles,
  KanbanSquare,
  PenTool,
  type LucideIcon,
} from 'lucide-react';

/* ============================================================================
 * SKILLS / CAPABILITIES
 * ----------------------------------------------------------------------------
 * The six areas the company works in. `flagship: true` marks the core
 * offering — it gets the wider card and the accent treatment.
 *
 * Add, remove or reorder freely: the Skills section, the footer list and the
 * contact form dropdown all read from here.
 * ==========================================================================*/

export interface SkillArea {
  /** Stable key, also used as the DOM id for the expandable panel. */
  id: string;
  title: string;
  /** One line on the card face. */
  summary: string;
  /** Shown when the card is expanded. */
  description: string;
  /** Capability bullets. */
  capabilities: string[];
  icon: LucideIcon;
  flagship?: boolean;
}

export const skillAreas: SkillArea[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    summary: 'Websites, platforms and applications built to load fast and keep working as you grow.',
    description:
      'Marketing sites that convert, commerce that handles real traffic, and custom applications that replace the spreadsheet holding everything together. Typed, tested and documented, so your team is never locked out of its own product.',
    capabilities: [
      'Business websites',
      'Landing pages',
      'E-commerce',
      'Web applications',
      'SaaS platforms',
      'API integrations',
    ],
    icon: Code2,
    flagship: true,
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    summary: 'iOS and Android apps that ship, update cleanly and hold up once real users arrive.',
    description:
      'Cross-platform builds where one codebase is the right call, native where it is not. We handle the whole path — store submission, release process, crash reporting and the backend the app talks to — so the launch is not the point where things stall.',
    capabilities: [
      'iOS & Android apps',
      'React Native',
      'Cross-platform builds',
      'App store releases',
      'Push notifications',
      'Offline-first data',
    ],
    icon: Smartphone,
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    summary: 'Map the repetitive work, then remove it — handoffs, follow-ups, reporting and routing.',
    description:
      'Most sales and operations teams lose hours a week to copy-paste work. We map those flows, automate the mechanical steps, and leave people in charge of the decisions that need judgement.',
    capabilities: [
      'CRM automation',
      'Lead workflows',
      'Email automation',
      'Appointment automation',
      'Reporting',
      'Business processes',
    ],
    icon: Workflow,
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    summary: 'Applied where it measurably beats the manual alternative — qualification, support, documents.',
    description:
      'We treat AI as one tool among several, not the point of the project. Where a model genuinely reduces handling time, we build it in and measure the difference. Where a rule or a form works better, we say so.',
    capabilities: [
      'Assistants',
      'Chatbots',
      'Lead qualification',
      'Document processing',
      'Workflow steps',
      'Integrations',
    ],
    icon: Sparkles,
  },
  {
    id: 'crm-sales-systems',
    title: 'CRM & Sales Systems',
    summary: 'Pipelines, dashboards and lead management that match how your team actually sells.',
    description:
      'Off-the-shelf CRMs force your process into someone else’s shape. We either configure yours properly or build a custom system around the stages, fields and reporting your team needs.',
    capabilities: [
      'Custom CRM',
      'Sales pipelines',
      'Lead management',
      'Dashboards',
      'Analytics',
      'Team management',
    ],
    icon: KanbanSquare,
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    summary: 'Interfaces and design systems that make complex products feel obvious to use.',
    description:
      'Design grounded in the task the user is trying to finish — marketing pages that carry a clear argument, product interfaces that survive real data, and design systems that keep the tenth screen as considered as the first.',
    capabilities: [
      'Website design',
      'SaaS design',
      'Dashboard design',
      'Landing pages',
      'Design systems',
      'Product interfaces',
    ],
    icon: PenTool,
  },
];

/* ---------------------------------------------------------------- toolset */

/**
 * Tools and technologies used in delivery.
 *
 * ⚠️ EDIT THIS LIST. Only keep what the team can genuinely work in — a tools
 * list is a capability claim, and a client may ask you to prove it. Deleting a
 * whole group is fine; the grid reflows.
 */
export interface ToolGroup {
  label: string;
  items: string[];
}

export const toolGroups: ToolGroup[] = [
  {
    label: 'Front-end',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'Framer Motion'],
  },
  {
    label: 'Back-end & data',
    items: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Supabase'],
  },
  {
    label: 'Automation & CRM',
    items: ['Zapier', 'Make', 'n8n', 'HubSpot', 'Airtable', 'Google Workspace'],
  },
  {
    label: 'Design',
    items: ['Figma', 'Design systems', 'Prototyping', 'Responsive design'],
  },
];

/** Options for the contact form's service dropdown. */
export const serviceEnquiryOptions = [
  'Web Development',
  'Mobile App Development',
  'Custom Software',
  'AI Solutions',
  'AI Agents & Chatbots',
  'Automation',
  'CRM Development',
  'UI/UX Design',
  'Other',
] as const;

export type ServiceEnquiry = (typeof serviceEnquiryOptions)[number];

export const budgetRanges = [
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
  'Not sure yet',
] as const;

export type BudgetRange = (typeof budgetRanges)[number];
