/**
 * Single source of truth for every piece of copy on the site.
 * Derived from the CV. Components import from here — never hardcode copy.
 */

export const site = {
  name: "Mustafa Al-Mosuli",
  /** Latin transliteration used on the CV; kept for structured data. */
  altName: "Mustafa A'mer",
  role: "Senior Backend & AI Engineer",
  disciplines: [
    "Microservices",
    "Event-Driven Systems",
    "Data at Scale",
    "AI-Native Engineering",
  ],
  location: "Baghdad, Iraq",
  timezone: "Asia/Baghdad",
  utcOffset: "UTC+3",
  email: "mamer.ma1234@gmail.com",
  phone: "+964 781 094 0050",
  phoneHref: "+9647810940050",
  url: "https://mustafaa.xyz",
  available: true,  
  resumeUrl: "/assets/files/MustafaAmer.pdf",
  socials: {
    github: "https://github.com/mamer12",
    linkedin: "https://www.linkedin.com/in/mamerma1234/",
  },
} as const;

/**
 * Status copy shown in the nav, hero, and footer. Derived from `site.available`
 * so flipping that one boolean updates every surface at once.
 */
export const availabilityLabel = site.available
  ? "Available for new opportunities"
  : "Not currently taking new work";

export const summary =
  "Six years of backend systems across telecom and fintech — microservices, event-driven pipelines, and PostgreSQL at scale for a 10M+ subscriber base. I work AI-native: orchestrating multi-agent workflows with Claude Code, Gemini, and Codex, and shipping LLM pipelines to production.";

/* -------------------------------------------------------------------------
   Concepts — the engineering practices behind the résumé lines. These are
   what the Profile section actually shows; prose stays short.
   ---------------------------------------------------------------------- */

export interface ConceptGroup {
  readonly id: string;
  readonly label: string;
  readonly items: readonly string[];
}

export const conceptGroups: readonly ConceptGroup[] = [
  {
    id: "systems",
    label: "Systems",
    items: [
      "Microservices",
      "Event-Driven Architecture",
      "API Design & Gateways",
      "Zero-Downtime Releases",
      "Caching & Performance",
      "Workflow Automation (BPMN)",
    ],
  },
  {
    id: "data",
    label: "Data",
    items: [
      "PostgreSQL at Scale",
      "Zero-Loss Data Migrations",
      "Data Pipelines (CDC / ETL)",
      "Database Partitioning",
      "Query & Performance Tuning",
      "Redis Queues",
    ],
  },
  {
    id: "ai",
    label: "AI Engineering",
    items: [
      "Agentic Workflows",
      "Agent Orchestration",
      "Context Engineering",
      "AI Tool Integrations (MCP)",
      "AI Search (RAG)",
      "LLM Data Extraction",
      "Prompt Engineering",
    ],
  },
];

/* -------------------------------------------------------------------------
   Headline metrics — every figure here is stated on the CV. No estimates.
   ---------------------------------------------------------------------- */

export interface Metric {
  readonly value: number;
  readonly display: string;
  readonly suffix?: string;
  readonly label: string;
  readonly detail: string;
}

export const heroMetrics: readonly Metric[] = [
  {
    value: 10,
    display: "10M",
    suffix: "+",
    label: "Subscribers served",
    detail: "Zain Iraq subscriber base",
  },
  {
    value: 10000,
    display: "10K",
    suffix: "/s",
    label: "Event throughput",
    detail: "Messages ingested and filtered per second",
  },
  {
    value: 0,
    display: "0",
    label: "Data loss",
    detail: "10M-record NoSQL to PostgreSQL migration",
  },
  {
    value: 6,
    display: "6",
    suffix: "yrs",
    label: "In production",
    detail: "Telecom and fintech systems since 2020",
  },
];

export const impactMetrics: readonly Metric[] = [
  {
    value: 10,
    display: "10M",
    suffix: "+",
    label: "Records migrated",
    detail:
      "Strangler-fig cutover from NoSQL to PostgreSQL, both systems running in parallel. Zero data loss, no service interruption, delivered ahead of schedule.",
  },
  {
    value: 4,
    display: "4M",
    suffix: "+",
    label: "Active users",
    detail:
      "Backend features for a consumer application — 10 features shipped across 6 releases.",
  },
  {
    value: 50,
    display: "50",
    suffix: "%",
    label: "Latency reduction",
    detail:
      "A caching layer that cut API response times by half and halved infrastructure resource consumption.",
  },
  {
    value: 10000,
    display: "10,000",
    suffix: "+",
    label: "Messages / second",
    detail:
      "High-throughput event pipeline ingesting and filtering for real-time notification dispatch across the subscriber base.",
  },
  {
    value: 4,
    display: "4",
    label: "Zero-downtime releases",
    detail:
      "Deployment and scaling strategy for a monolith-to-cloud migration on mission-critical telecom infrastructure.",
  },
  {
    value: 30,
    display: "30",
    suffix: "%",
    label: "Faster operations",
    detail:
      "Backend tools and internal systems that cut task completion time for operations teams.",
  },
];

/* -------------------------------------------------------------------------
   Experience
   ---------------------------------------------------------------------- */

export interface Role {
  readonly id: string;
  readonly company: string;
  readonly title: string;
  readonly period: string;
  readonly start: string;
  readonly end: string;
  readonly location: string;
  readonly mode: string;
  readonly note?: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
}

export const roles: readonly Role[] = [
  {
    id: "zain",
    company: "Zain Iraq",
    title: "Senior Software Engineer",
    period: "Feb 2025 — Present",
    start: "2025-02",
    end: "Present",
    location: "Baghdad, Iraq",
    mode: "On-site",
    summary:
      "Mission-critical telecom infrastructure at national scale — a 10M+ subscriber base behind every deploy.",
    highlights: [
      "Led a strangler-fig migration of 10M+ user records from NoSQL to PostgreSQL, running both systems in parallel and cutting over incrementally — zero data loss, no service interruption, delivered ahead of schedule.",
      "Delivered backend features for a consumer application serving 4M+ active users, shipping 10 features across 6 releases.",
      "Engineered a caching layer that cut API response times by 50% and halved infrastructure resource consumption.",
      "Designed a high-throughput event pipeline ingesting and filtering 10,000+ messages per second for real-time notification dispatch across the subscriber base.",
      "Defined deployment and scaling strategy for a monolith-to-cloud migration, holding a zero-downtime record across 4 production releases.",
    ],
    stack: ["PostgreSQL", "Redis", "FastAPI", "Kafka", "Docker", "RHEL"],
  },
  {
    id: "ffc",
    company: "First Finance Company",
    title: "Senior Software Engineer",
    period: "Nov 2023 — Feb 2025",
    start: "2023-11",
    end: "2025-02",
    location: "Baghdad, Iraq",
    mode: "Hybrid",
    note: "Part-time to Mar 2024, full-time thereafter",
    summary:
      "Greenfield ownership — built the entire digital product stack of a fintech from nothing.",
    highlights: [
      "Architected and built the company's entire digital product stack from greenfield, covering public-facing digital channels and SME lending integration.",
      "Built an internal Loan Management System with dynamic BPMN approval workflows, eliminating manual handoffs from loan processing.",
      "Designed a high-volume logging database using Redis queue extraction and table partitioning, sustaining sub-second queries across millions of records.",
      "Shipped the mobile banking backend, integrating directly with the in-house core banking system to enable end-to-end digital loan origination.",
      "Engineered middleware bridging core banking, ERP, and mobile applications.",
      "Built full-stack internal operations portals delivering real-time reporting dashboards to business teams.",
    ],
    stack: ["FastAPI", "PostgreSQL", "Redis", "BPMN", "NestJS", "Docker"],
  },
  {
    id: "earthlink",
    company: "Earthlink Telecommunications",
    title: "Software Engineer",
    period: "Jul 2022 — Mar 2024",
    start: "2022-07",
    end: "2024-03",
    location: "Baghdad, Iraq",
    mode: "Hybrid",
    summary:
      "Internal automation for Iraq's largest ISP, accelerating its digital transformation roadmap.",
    highlights: [
      "Delivered 8+ internal workflow automations handling sensitive customer data, all on schedule and with zero post-release defects.",
      "Built backend tools and internal systems that cut task completion time for operations teams by 30%.",
      "Shipped backend features across product sprints in an Agile environment, aligned to stakeholder requirements.",
    ],
    stack: ["Python", "Node.js", "PostgreSQL", "Workflow Automation"],
  },
  {
    id: "pure",
    company: "Pure Platform",
    title: "Software Engineer",
    period: "May 2020 — Aug 2023",
    start: "2020-05",
    end: "2023-08",
    location: "United States",
    mode: "Fully remote",
    note: "Intern May–Aug 2020, part-time thereafter",
    summary:
      "Three years of remote collaboration with a US engineering team, across two continents and eight time zones.",
    highlights: [
      "Built serverless web-scraping pipelines on AWS Lambda and Puppeteer, automating large-scale data collection.",
      "Implemented Google OAuth and JWT authentication across microservices, meeting security review requirements.",
      "Managed multi-database integration spanning PostgreSQL, MongoDB, and Firebase, maintaining consistency across heterogeneous data stores.",
      "Mentored incoming trainees and new hires — reviewed their work, delivered structured feedback to management, and supported onboarding.",
      "Collaborated with distributed teams across US and Middle East time zones with consistent on-time delivery over three years.",
    ],
    stack: ["AWS Lambda", "Node.js", "MongoDB", "PostgreSQL", "OAuth / JWT"],
  },
];

/* -------------------------------------------------------------------------
   Projects
   ---------------------------------------------------------------------- */

export interface Project {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly kind: string;
  readonly year: string;
  readonly stack: readonly string[];
  readonly summary: string;
  readonly points: readonly string[];
  readonly url?: string;
  readonly repo?: string;
}

export const projects: readonly Project[] = [
  {
    id: "zuwada",
    index: "01",
    title: "Zuwada",
    kind: "Commerce & booking platform",
    year: "2026",
    stack: ["Flutter", "Go", "PostgreSQL", "OpenAPI"],
    summary:
      "A storefront and booking platform — subscription plans, venue bookings, and a hub connecting storefront owners with their customers.",
    points: [
      "Go backend with clean domain architecture: storefronts, plans, bookings, check-ins.",
      "OpenAPI-first — the backend publishes the contract, the Dart API client is generated.",
      "Built AI-native end to end with multi-agent Claude Code workflows, from spec to release.",
    ],
  },
  {
    id: "madhmoon",
    index: "02",
    title: "Madhmoon",
    kind: "Commerce super-app",
    year: "2025",
    stack: ["Flutter", "Go", "PostgreSQL", "ZainCash"],
    summary:
      "A multi-vendor Arabic commerce super-app for the Iraqi market, spanning four distinct verticals under one roof.",
    points: [
      "Four verticals in one product: auctions, shops, thrift and bulk, and C2C used goods.",
      "Social commerce features layered over the marketplace primitives.",
      "ZainCash escrow payment flow holding funds until both sides settle.",
    ],
  },
  {
    id: "smart-search",
    index: "03",
    title: "Arabic Real-Estate Smart Search",
    kind: "LLM extraction pipeline",
    year: "2025",
    stack: ["Python", "PostgreSQL", "pgvector", "Gemini", "Ollama"],
    summary:
      "An extraction pipeline that turns free-text Arabic property listings into structured, queryable records.",
    points: [
      "LLM extraction converting unstructured Arabic listings into typed records.",
      "Provider-agnostic model layer — Gemini by default, local Ollama as fallback.",
      "Hybrid retrieval combining pgvector similarity with structured SQL filters.",
    ],
  },
  {
    id: "bunyan",
    index: "04",
    title: "Bunyan",
    kind: "Multi-stakeholder platform",
    year: "2025",
    stack: ["React", "Convex", "TypeScript"],
    summary:
      "A unified platform connecting the five parties in a construction project who normally never share a system.",
    points: [
      "One workspace for investors, developers, contractors, buyers, and government stakeholders.",
      "Real-time data model built on Convex, no bespoke sync layer required.",
    ],
  },
];

/* -------------------------------------------------------------------------
   AI practice — how AI tooling shows up in the day-to-day work.
   Grounded in real usage and shipped systems, not aspiration.
   ---------------------------------------------------------------------- */

export interface AiCapability {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly tools: readonly string[];
  readonly summary: string;
  readonly points: readonly string[];
  /** Bento emphasis — "xl" takes the flagship cell. */
  readonly size: "xl" | "md";
}

export const aiCapabilities: readonly AiCapability[] = [
  {
    id: "agentic",
    index: "01",
    title: "Agentic workflows & orchestration",
    tools: ["Claude Code", "MCP", "Multi-Agent"],
    summary:
      "Claude Code is my daily driver — not autocomplete, an engineering loop. I design and run multi-agent workflows: orchestrating fleets of agents in parallel, managing their context windows, and shipping production features with AI in the loop from plan to verified deploy.",
    points: [
      "Agent orchestration — parallel agents, controlled and verified",
      "Context engineering — the right knowledge in every agent's window",
      "MCP integrations wiring internal APIs and databases into the loop",
      "Plan → implement → review → verify, run as a workflow",
    ],
    size: "xl",
  },
  {
    id: "llm-production",
    index: "02",
    title: "LLM systems in production",
    tools: ["Gemini", "Ollama", "pgvector"],
    summary:
      "Shipped an Arabic real-estate search pipeline: LLMs turn free-text listings into clean, searchable records. Works with any model provider — Gemini by default, local Ollama as fallback.",
    points: [
      "LLM data extraction from unstructured Arabic text",
      "AI search (RAG) — vector similarity + SQL filters",
    ],
    size: "md",
  },
  {
    id: "multi-model",
    index: "03",
    title: "Multi-model workflows",
    tools: ["Claude", "Gemini", "Codex"],
    summary:
      "Different models for different jobs: cross-checking plans, parallel implementation tracks, and model-vs-model review before anything merges. The tooling changes monthly — the discipline doesn't.",
    points: [
      "Parallel model tracks for design, build, and review",
      "Prompt engineering as a first-class deliverable",
    ],
    size: "md",
  },
  {
    id: "ai-migration",
    index: "04",
    title: "AI-assisted data migration",
    tools: ["Claude Code", "PostgreSQL"],
    summary:
      "The 10M-record NoSQL-to-PostgreSQL migration ran with agent-written reconciliation scripts and continuous verification — AI accelerated the work, the zero-data-loss guarantee stayed on me.",
    points: [
      "Agent-generated schema mappings and reconciliation checks",
      "Human-owned invariants: parity counts, cutover gates, rollback",
    ],
    size: "md",
  },
] as const;

/** Ticker feed for the AI section marquee. */
export const aiTickerItems: readonly string[] = [
  "CLAUDE CODE",
  "GEMINI",
  "CODEX",
  "AGENT ORCHESTRATION",
  "MULTI-AGENT WORKFLOWS",
  "CONTEXT ENGINEERING",
  "MCP",
  "PGVECTOR",
  "OLLAMA",
  "AI SEARCH / RAG",
  "PROMPT ENGINEERING",
  "LLM PIPELINES",
];

/* -------------------------------------------------------------------------
   Stack
   ---------------------------------------------------------------------- */

export interface StackGroup {
  readonly id: string;
  readonly label: string;
  readonly items: readonly string[];
}

export const stackGroups: readonly StackGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Go"],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      "FastAPI",
      "Node.js",
      "NestJS",
      "REST APIs",
      "Microservices",
      "API Gateway Design",
      "Event-Driven Architecture",
      "ETL",
      "CDC",
      "JWT / OAuth",
    ],
  },
  {
    id: "data",
    label: "Data",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Data Modeling",
      "Query Optimization",
      "Partitioning",
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    items: [
      "AWS Lambda",
      "AWS S3",
      "CloudWatch",
      "Docker",
      "CI/CD",
      "Kafka",
      "RabbitMQ",
      "Git",
      "RHEL",
    ],
  },
  {
    id: "ai",
    label: "AI Engineering",
    items: [
      "Claude Code",
      "Gemini",
      "Codex",
      "MCP",
      "Agentic Workflows",
      "pgvector",
      "Ollama",
      "RAG / Hybrid Retrieval",
      "Prompt Engineering",
    ],
  },
  {
    id: "domain",
    label: "Domain",
    items: [
      "ERP Integration",
      "BPMN Workflow Automation",
      "Loan Management Systems",
    ],
  },
];

/** Flat list used by the hero ticker. */
export const tickerItems: readonly string[] = [
  "10M+ SUBSCRIBERS",
  "10,000 MSG / SEC",
  "ZERO DATA LOSS",
  "POSTGRESQL AT SCALE",
  "EVENT-DRIVEN",
  "FASTAPI",
  "KAFKA",
  "50% LATENCY CUT",
  "ZERO DOWNTIME",
  "MICROSERVICES",
  "REDIS",
  "GREENFIELD OWNERSHIP",
];

/* -------------------------------------------------------------------------
   Education & languages
   ---------------------------------------------------------------------- */

export const education = {
  school: "Al Rafidain University College",
  degree: "B.Sc. Software Engineering",
  year: "2021",
  location: "Baghdad, Iraq",
} as const;

export const spokenLanguages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
] as const;

/* -------------------------------------------------------------------------
   Navigation
   ---------------------------------------------------------------------- */

export const navSections = [
  { id: "index", label: "Index", num: "00" },
  { id: "profile", label: "Profile", num: "01" },
  { id: "ai", label: "AI Practice", num: "02" },
  { id: "impact", label: "Impact", num: "03" },
  { id: "trajectory", label: "Trajectory", num: "04" },
  { id: "work", label: "Work", num: "05" },
  { id: "stack", label: "Stack", num: "06" },
  { id: "contact", label: "Contact", num: "07" },
] as const;

export type NavSectionId = (typeof navSections)[number]["id"];
