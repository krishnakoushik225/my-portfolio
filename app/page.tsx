"use client";

import { SiReact } from "react-icons/si";
import { FaCloud, FaShieldAlt } from "react-icons/fa";
import { BsCodeSlash, BsCpu, BsServer, BsTools } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, ExternalLink, ArrowRight, Download,
  Briefcase, GraduationCap, ChevronUp, Menu, X, Globe, MapPin, Zap, BookOpen,
} from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import Starfield from "@/components/starfields";

const featuredProjects = [
  {
    title: "ResearchFlow AI",
    description:
      "Manual research across 10+ sources takes hours and loses citation trails. ResearchFlow decomposes any query into parallel sub-tasks, retrieves and ranks web evidence, and delivers a cited, self-verified answer in under 30 seconds — using LangGraph's stateful graph to enable retry loops that a linear chain couldn't support.",
    insight:
      "Chose LangGraph over a simpler LangChain chain specifically because stateful graphs allow conditional retry edges when source relevance scores fall below a confidence threshold.",
    stack: ["Python", "FastAPI", "LangGraph", "React", "Tavily"],
    github: "https://github.com/krishnakoushik225/langgraph-research-agent",
    demo: null,
    image: "/projects/researchflow.png",
  },
  {
    title: "ContextFlow AI",
    description:
      "Most AI browser tools send your browsing data to external APIs. ContextFlow runs entirely on-device using Ollama — 100% local inference, zero external calls, no data leaves the browser. Summarises pages, explains highlighted text, and answers context-aware questions with sub-second response times on consumer hardware.",
    insight:
      "The hardest part wasn't the LLM integration — it was building a streaming response protocol between the Chrome extension content script and the background service worker without a shared DOM.",
    stack: ["React", "TypeScript", "Chrome Extension", "Ollama", "Llama 3.2"],
    github: "https://github.com/krishnakoushik225/contextflow-ai",
    demo: null,
    image: "/projects/contextflow.png",
  },
  {
    // FIX 4 — BM25 and 30% factual error claim removed; replaced with accurate description
    title: "DocuMind",
    description:
      "Unlike off-the-shelf PDF chat tools, DocuMind handles multi-document cross-referencing and always surfaces the exact passage that generated each answer — making it auditable for professional use. Built on Pinecone semantic search with GPT-4 generation and citation grounding for verifiable, transparent document Q&A.",
    insight:
      "The core design principle: every answer must be traceable to a source passage. Surfacing the exact chunk that generated the response shifts user trust from 'I hope this is right' to 'I can verify this is right' — which matters most in professional document workflows.",
    stack: ["Python", "FastAPI", "React", "Pinecone", "OpenAI"],
    github: "https://github.com/krishnakoushik225/DocuMind",
    demo: null,
    image: "/projects/documind.png",
  },
  {
    title: "ECG-PEFT Bench",
    description:
      "Fine-tuning cardiac foundation models from scratch is prohibitively expensive for most clinical teams. This benchmark compared LoRA, Adapter, Prefix, and Prompt Tuning across 3 models on a 10K+ ECG segment dataset — producing a model selection report that showed LoRA outperforming adapters by 4.2 F1 points with 60% fewer trainable parameters, directly informing compute allocation decisions for downstream clinical AI pipelines.",
    insight:
      "The clearest finding: prompt tuning degraded consistently on short ECG segments because it can't recover from insufficient context length — something that isn't obvious from NLP benchmarks.",
    stack: ["Python", "PyTorch", "Transformers", "PEFT", "Medical AI"],
    github: "https://github.com/krishnakoushik225/ecg-peft-benchmark",
    demo: null,
    image: "/projects/ecg-peft-benchmark.png",
  },
  {
    // FIX 6 — locking terminology aligned: "optimistic locking" to match resume
    title: "APSRTC Duty Management Portal",
    description:
      "Shift scheduling at scale has a classic concurrency problem: two managers assigning the same employee to overlapping duties. Built conflict-detection logic at the API layer using optimistic locking on the PostgreSQL schema, preventing double-assignment races without surfacing complexity to the UI. Serves 500+ transport authority employees across duty assignment, leave approvals, and attendance tracking.",
    insight:
      "Initially handled conflicts at the application layer — which failed under concurrent load. Moving to optimistic locking at the database transaction level made the system race-condition-free regardless of how many managers were active simultaneously.",
    stack: ["React", "Spring Boot", "PostgreSQL", "Spring Security", "Docker"],
    github: "https://github.com/krishnakoushik225/APSRTC-Duty-Management-Portal",
    demo: null,
    image: "/projects/apsrtc.png",
  },
  {
    title: "GenDiff-PEFT",
    description:
      "A research exploration into where parameter-efficient fine-tuning breaks down in generative models. Achieved a 2.1× training efficiency gain on conditional diffusion models while keeping FID scores within 8% of full fine-tuning. The findings directly shaped my PEFT strategy choices in ECG-PEFT — particularly around when adapter bottleneck sizes cause representational collapse.",
    insight:
      "This is exploratory research, not a production system. Its value is in the negative results: understanding which PEFT configurations fail and why matters as much as which ones succeed.",
    stack: ["Python", "PyTorch", "Diffusion Models", "PEFT", "Computer Vision"],
    github: "https://github.com/krishnakoushik225/GenDiff-PEFT-Efficient-Conditional-Diffusion-Optimization",
    demo: null,
    image: "/projects/GenDiff-PEFT.png",
  },
  {
    title: "CLAP-Optimized AudioLDM",
    description:
      "Text-to-audio generation at inference time produces variable-quality outputs. By generating N candidates and selecting via CLAP alignment score, improved benchmark quality by 15%+ with no model retraining — at the cost of N× inference time. The detailed cost-quality tradeoff analysis makes this a practical reference for teams deciding whether quality or latency is the bottleneck.",
    insight:
      "The tradeoff is non-linear: going from 1 to 4 candidates gives most of the quality gain; going from 4 to 8 adds cost with diminishing returns. The inflection point is the finding.",
    stack: ["Python", "PyTorch", "AudioLDM", "CLAP", "Multimodal AI"],
    github: "https://github.com/krishnakoushik225/CLAP-Optimized-Text-to-Audio-Generation-AudioLDM-",
    demo: null,
    image: "/projects/CLAP-Guided Multi-Sample Selection for AudioLDM.png",
  },
];

const enterpriseWork = [
  {
    // FIX 3 — USF: 5,000+ daily users (not 12,000+), 60% page load (not ~40%), 820ms→310ms (not ~800ms→200ms)
    title: "University of South Florida — Academic Planning Systems",
    badge: "Professional Work",
    description:
      "Led feature development and system modernization on a 4-person engineering team, owning work end-to-end from API design through AKS deployment — shipping to 5,000+ daily users across USF's academic planning infrastructure.",
    highlights: [
      "Modernised legacy PHP scheduling modules to React + TypeScript, reducing page load time by 60% and eliminating a class of session-state bugs across 8+ modules",
      "Designed ASP.NET Core APIs with Redis caching and SQL Server composite indexing, cutting average API response time from 820ms to 310ms across high-traffic enrollment windows",
      "Owned Azure AKS blue/green CI/CD pipeline — 99.6% uptime, deployment cycle reduced from 3 days to under 3 hours",
    ],
  },
  {
    // FIX 2 — Optum: Kafka at 3,500+ events/min (not 50K+ daily); MTTR 35% (not 4hrs→90min)
    title: "Optum — Healthcare Application Engineering",
    badge: "Professional Work",
    description:
      "Built HIPAA-compliant cloud-native applications processing 100K+ patient health records, with a focus on reliability, observability, and PHI-safe data handling across Azure-based services.",
    highlights: [
      "Developed Angular + ASP.NET Core microservices with HIPAA-compliant data handling — PHI never logged, cached, or surfaced in error traces",
      "Built event-driven Kafka data pipelines at 3,500+ events/min with Cosmos DB multi-region geo-replication and SQL Server + PostgreSQL optimisation (30% faster queries)",
      "Drove DRI on-call reliability via Application Insights distributed tracing and structured alerting — MTTR reduced 35%; automated 40% of manual workflows via PowerShell + Azure Functions",
    ],
  },
  {
    // FIX 5 — BNP: 4 trading desks (not 5)
    title: "BNP Paribas — Financial Workflow Platforms",
    badge: "Professional Work",
    description:
      "Contributed to internal financial platforms across a 6-month contract engagement, building real-time reporting dashboards and event-driven backend services used by trading and operations teams.",
    highlights: [
      "Built React/TypeScript P&L dashboards used by 4 trading desks for daily risk reporting, consolidating data from 3 upstream systems into a single reconciled view",
      "Developed Spring Boot REST APIs handling 10K+ daily financial workflow transactions with JWT auth, rate limiting, audit logging, and role-gated access for compliance",
      "Introduced Amazon SQS event-driven data pipelines with Celery async processing — reduced reconciliation errors 30%, saved 20 hrs/week",
    ],
  },
];

const experience = [
  {
    // FIX 1 — all dates aligned to resume: USF 08/2024, Optum 08/2023–08/2024, BNP 02/2023–07/2023, Rinex 06/2021–12/2021
    role: "Application Developer",
    org: "University of South Florida",
    period: "Aug 2024 — Present",
    summary:
      "Own full-stack feature development on a 4-person team building academic systems for 5,000+ daily users. Work spans React/TypeScript frontend, ASP.NET Core APIs with Redis and SQL Server, and Azure AKS deployments — shipping weekly releases across USF's academic planning infrastructure.",
    icon: "/companies/usf.jpeg",
  },
  {
    role: "Associate Software Developer",
    org: "Optum",
    period: "Aug 2023 — Aug 2024",
    summary:
      "Developed HIPAA-compliant cloud-native healthcare applications processing 100K+ patient records. Built Angular + ASP.NET Core microservices, Kafka event pipelines at 3,500+ events/min, and Azure observability improvements across a cross-functional team serving health plan operations.",
    icon: "/companies/optum.png",
  },
  {
    role: "Software Engineer",
    org: "BNP Paribas",
    period: "Feb 2023 — Jul 2023",
    summary:
      "Built real-time trading dashboards and Spring Boot APIs for enterprise financial workflow platforms across a 6-month contract engagement, processing 10K+ daily transactions with full audit trails for compliance.",
    icon: "/companies/BNPParibas.png",
  },
  {
    role: "Full Stack Intern",
    org: "Rinex Private Limited",
    period: "Jun 2021 — Dec 2021",
    summary:
      "Delivered workforce management features — duty scheduling, leave approval workflows, and JWT-based role access control — using React, Spring Boot, and PostgreSQL.",
    icon: "/companies/rinex.jpeg",
  },
];

const education = [
  {
    degree: "M.S. in Computer Science and Engineering",
    school: "University of South Florida",
    period: "2024 — 2026",
    details: "GPA: 3.95/4.0 • Tampa, Florida",
    icon: "/companies/usf.jpeg",
  },
  {
    degree: "B.Tech. in Computer Science and Engineering",
    school: "Amrita Vishwa Vidyapeetham",
    period: "2019 — 2023",
    details: "GPA: 8.31/10 • Coimbatore, India",
    icon: "/companies/amrita.png",
  },
];

const lookingFor = [
  {
    icon: <Briefcase className="h-5 w-5" />,
    label: "Target Roles",
    items: ["Software Engineer", "AI / ML Engineer", "Full-Stack Engineer"],
  },
  {
    icon: <Zap className="h-5 w-5" />,
    label: "Industries",
    items: ["Fintech & Payments", "AI / Cloud Platforms", "Developer Tooling"],
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Location",
    items: ["Open to relocation (US-wide)", "Remote-friendly preferred", "Available June 2026"],
  },
];

// ─── SKILLS DATA ───────────────────────────────────────────────────────────────

const DOMAIN_THEMES: Record<string, {
  accent: string; accentRgb: string; label: string;
  text: string; bg: string; border: string;
  pillBg: string; pillText: string; icon: React.ReactNode;
}> = {
  Languages: {
    accent: "#D97706", accentRgb: "217,119,6", label: "Languages",
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-400/8",
    border: "border-amber-300 dark:border-amber-400/25",
    pillBg: "bg-amber-50 border-amber-300 dark:bg-amber-400/10 dark:border-amber-400/20",
    pillText: "text-amber-700 dark:text-amber-300",
    icon: <BsCodeSlash className="h-4 w-4" />,
  },
  Frontend: {
    accent: "#0284C7", accentRgb: "2,132,199", label: "Frontend",
    text: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-400/8",
    border: "border-sky-300 dark:border-sky-400/25",
    pillBg: "bg-sky-50 border-sky-300 dark:bg-sky-400/10 dark:border-sky-400/20",
    pillText: "text-sky-700 dark:text-sky-300",
    icon: <SiReact className="h-4 w-4" />,
  },
  Backend: {
    accent: "#059669", accentRgb: "5,150,105", label: "Backend & APIs",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-400/8",
    border: "border-emerald-300 dark:border-emerald-400/25",
    pillBg: "bg-emerald-50 border-emerald-300 dark:bg-emerald-400/10 dark:border-emerald-400/20",
    pillText: "text-emerald-700 dark:text-emerald-300",
    icon: <BsServer className="h-4 w-4" />,
  },
  AI: {
    accent: "#7C3AED", accentRgb: "124,58,237", label: "AI & LLM",
    text: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-400/8",
    border: "border-violet-300 dark:border-violet-400/25",
    pillBg: "bg-violet-50 border-violet-300 dark:bg-violet-400/10 dark:border-violet-400/20",
    pillText: "text-violet-700 dark:text-violet-300",
    icon: <BsCpu className="h-4 w-4" />,
  },
  Cloud: {
    accent: "#1D4ED8", accentRgb: "29,78,216", label: "Cloud & DevOps",
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-400/8",
    border: "border-blue-300 dark:border-blue-400/25",
    pillBg: "bg-blue-50 border-blue-300 dark:bg-blue-400/10 dark:border-blue-400/20",
    pillText: "text-blue-700 dark:text-blue-300",
    icon: <FaCloud className="h-4 w-4" />,
  },
  Security: {
    accent: "#DC2626", accentRgb: "220,38,38", label: "Security",
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-400/8",
    border: "border-red-300 dark:border-red-400/25",
    pillBg: "bg-red-50 border-red-300 dark:bg-red-400/10 dark:border-red-400/20",
    pillText: "text-red-700 dark:text-red-300",
    icon: <FaShieldAlt className="h-4 w-4" />,
  },
  Tools: {
    accent: "#475569", accentRgb: "71,85,105", label: "Tools & Workflow",
    text: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-400/8",
    border: "border-slate-300 dark:border-slate-400/25",
    pillBg: "bg-slate-100 border-slate-300 dark:bg-slate-400/10 dark:border-slate-400/20",
    pillText: "text-slate-700 dark:text-slate-300",
    icon: <BsTools className="h-4 w-4" />,
  },
};

const SKILL_DOMAINS = [
  {
    id: "Languages",
    primary: ["Python", "TypeScript", "Java", "C++", "C#", "JavaScript"],
    skills: ["Java", "C++", "C", "C#", "Python", "JavaScript", "TypeScript", "Haskell", "Scala", "VB Script"],
  },
  {
    id: "Frontend",
    primary: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Angular", "Redux Toolkit"],
    skills: ["React", "Angular", "TypeScript", "Redux Toolkit", "TanStack Query", "Bootstrap", "Tailwind CSS", "Vite", "HTML5", "CSS3"],
  },
  {
    id: "Backend",
    primary: ["Spring Boot", "ASP.NET Core", "FastAPI", "Spring Security", "JPA / Hibernate"],
    skills: [
      "ASP.NET Core", "ASP.NET MVC", "Entity Framework Core", "LINQ", "Razor Pages",
      "ASP.NET Identity", "xUnit", "NUnit", "Moq",
      "Spring Boot", "Spring MVC", "Spring Security", "Spring Data JPA", "Hibernate",
      "Maven", "Gradle", "JUnit 5",
      "FastAPI", "Django", "Celery", "SQLAlchemy", "PyTest", "PyPDF2",
      "PostgreSQL", "SQL Server", "Redis", "Cosmos DB", "Pinecone",
    ],
  },
  {
    id: "AI",
    primary: ["LangGraph", "PyTorch", "RAG Pipelines", "OpenAI GPT-4", "HuggingFace"],
    skills: [
      "LangGraph", "OpenAI GPT-4 API", "Pinecone", "LlamaIndex", "HuggingFace",
      "Ollama", "Llama 3.2", "PyTorch", "PEFT", "LoRA",
      "RAG Pipelines", "Prompt Engineering", "Tool Calling",
      "GitHub Copilot", "Claude Code",
    ],
  },
  {
    id: "Cloud",
    primary: ["Azure AKS", "Docker", "Kubernetes", "GitHub Actions", "AWS Lambda"],
    skills: [
      "Azure AKS", "Azure Functions", "Azure Cosmos DB", "Azure Key Vault",
      "Azure App Insights", "Azure Service Bus", "Azure DevOps",
      "AWS EC2", "AWS S3", "AWS Lambda", "AWS ECS", "Amazon SQS",
      "Docker", "Kubernetes", "GitHub Actions", "ARM Templates", "Bicep", "CI/CD",
    ],
  },
  {
    id: "Security",
    primary: ["JWT", "OAuth 2.0", "RBAC", "Spring Security", "Azure Key Vault"],
    skills: [
      "JWT", "OAuth 2.0", "RBAC", "Azure Key Vault",
      "Spring Security", "ASP.NET Identity", "Input Validation", "Audit Logging",
    ],
  },
  {
    id: "Tools",
    primary: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Postman"],
    skills: [
      "Git", "GitHub", "VS Code", "IntelliJ IDEA", "Postman",
      "PowerShell", "Bash", "Linux", "Figma", "Jira",
      "Confluence", "npm", "Webpack",
    ],
  },
];

const ALL_TABS = ["All", "Languages", "Frontend", "Backend", "AI", "Cloud", "Security", "Tools"] as const;
type Tab = (typeof ALL_TABS)[number];

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[200] h-[2px] transition-none"
      style={{ width: `${pct}%`, background: "linear-gradient(90deg, #7C3AED, #9D4EDD)" }} />
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-slate-700 shadow-xl backdrop-blur-xl transition hover:border-[#9D4EDD]/40 hover:bg-[#9D4EDD] hover:text-white dark:border-white/10 dark:bg-[#0b1020]/80 dark:text-white/70 dark:hover:bg-[#9D4EDD] dark:hover:text-white"
          aria-label="Back to top">
          <ChevronUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function MobileMenu({ open, onClose, activeSection }: {
  open: boolean; onClose: () => void; activeSection: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm lg:hidden" />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed right-0 top-0 z-[95] flex h-full w-72 flex-col border-l border-white/10 bg-[#0b1020]/95 p-8 backdrop-blur-2xl lg:hidden">
            <div className="mb-10 flex items-center justify-between">
              <span className="text-lg font-bold text-white">
                Krishna's <span className="text-[#9D4EDD]">Portfolio</span>
              </span>
              <button onClick={onClose}
                className="rounded-full border border-white/10 p-2 text-white/60 transition hover:border-white/20 hover:text-white"
                aria-label="Close menu">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a key={link.href} href={link.href} onClick={onClose}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition ${
                      isActive ? "bg-[#9D4EDD]/15 text-[#9D4EDD]" : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}>
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <div className="mt-auto pt-8">
              <a href="mailto:krishnakoushiku@gmail.com" onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#9D4EDD] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90">
                <Mail className="h-4 w-4" /> Get in touch
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SectionTitle({ eyebrow, title, description }: {
  eyebrow: string; title: React.ReactNode; description?: string;
}) {
  return (
    <div className="max-w-4xl">
      <p className="text-[11px] uppercase tracking-[0.35em] text-black/45 dark:text-white/45">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900 dark:text-white md:text-6xl">{title}</h2>
      {description && <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-white/60">{description}</p>}
    </div>
  );
}

function DomainCard({ domain, index, expanded = false }: {
  domain: (typeof SKILL_DOMAINS)[0]; index: number; expanded?: boolean;
}) {
  const theme = DOMAIN_THEMES[domain.id];
  const secondary = domain.skills.filter((s) => !domain.primary.includes(s));
  return (
    <motion.div
      custom={index} initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} variants={fadeUp}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300
        ${expanded ? "col-span-full" : ""}
        border-slate-200 bg-white dark:border-white/8 dark:bg-white/[0.025] hover:-translate-y-0.5 hover:shadow-xl`}
      style={{ boxShadow: `0 0 0 1px rgba(${theme.accentRgb}, 0.12)` }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 0 1px rgba(${theme.accentRgb}, 0.3), 0 20px 40px rgba(${theme.accentRgb}, 0.06)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px rgba(${theme.accentRgb}, 0.08)`;
      }}>
      <div className="absolute inset-y-0 left-0 w-[3px] rounded-l-2xl transition-all duration-300 group-hover:w-[4px]"
        style={{ background: theme.accent }} />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse 60% 50% at 0% 50%, rgba(${theme.accentRgb}, 0.06) 0%, transparent 70%)` }} />
      <div className="relative px-6 py-5">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl border-2 ${theme.border} ${theme.bg} ${theme.text}`}>{theme.icon}</div>
            <span className={`text-sm font-bold uppercase tracking-[0.18em] ${theme.text}`}>{theme.label}</span>
          </div>
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold tabular-nums ${theme.border} ${theme.text}`}>{domain.skills.length} skills</span>
        </div>
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/35">Core</p>
        <div className="mb-3 flex flex-wrap gap-2">
          {domain.primary.map((skill) => (
            <span key={skill} className={`rounded-lg border px-3.5 py-1.5 text-sm font-semibold ${theme.pillBg} ${theme.pillText}`}>{skill}</span>
          ))}
        </div>
        {secondary.length > 0 && (
          <>
            <div className="my-4 h-px" style={{ background: `linear-gradient(90deg, rgba(${theme.accentRgb},0.25) 0%, transparent 80%)` }} />
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-white/35">Also used</p>
            <div className="flex flex-wrap gap-2">
              {secondary.map((skill) => (
                <span key={skill} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/8 dark:bg-white/[0.025] dark:text-white/50">{skill}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

function SkillsSection() {
  const [active, setActive] = useState<Tab>("All");
  const totalSkills = SKILL_DOMAINS.reduce((acc, d) => acc + d.skills.length, 0);
  const visibleDomains = active === "All" ? SKILL_DOMAINS : SKILL_DOMAINS.filter((d) => d.id === active);

  return (
    <section id="skills">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <SectionTitle
          eyebrow="Tech Stack"
          title={<>Technologies I build <span className="text-[#9D4EDD]">with</span></>}
          description="A structured view of the languages, frameworks, platforms, and tools I use across full-stack engineering, cloud systems, and applied AI."
        />
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
        {[
          { label: "Total Skills", value: totalSkills },
          { label: "Domains", value: SKILL_DOMAINS.length },
          { label: "Years XP", value: "3.7+" },
          { label: "Stack Depth", value: "Full" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white/40 px-4 py-2.5 backdrop-blur-xl dark:border-white/8 dark:bg-white/[0.025]">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{s.value}</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-white/35">{s.label}</span>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="mt-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ALL_TABS.map((tab) => {
          const isActive = active === tab;
          const theme = tab !== "All" ? DOMAIN_THEMES[tab] : null;
          return (
            <button key={tab} type="button" onClick={() => setActive(tab)}
              className={`shrink-0 whitespace-nowrap rounded-xl px-5 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
                isActive ? "text-white" : "border border-black/10 bg-black/[0.03] text-slate-600 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/50 dark:hover:text-white/80"
              }`}
              style={isActive ? (theme ? {
                background: `linear-gradient(135deg, rgba(${theme.accentRgb},0.25) 0%, rgba(${theme.accentRgb},0.12) 100%)`,
                border: `1px solid rgba(${theme.accentRgb},0.4)`,
                boxShadow: `0 4px 16px rgba(${theme.accentRgb},0.15)`,
                color: theme.accent,
              } : {
                background: "linear-gradient(135deg, rgba(157,78,221,0.25) 0%, rgba(124,58,237,0.12) 100%)",
                border: "1px solid rgba(157,78,221,0.4)",
                boxShadow: "0 4px 16px rgba(157,78,221,0.15)",
                color: "#C084FC",
              }) : {}}>
              {tab === "All" ? "All Domains" : DOMAIN_THEMES[tab].label}
            </button>
          );
        })}
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
          className={`mt-8 grid gap-4 ${active === "All" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 max-w-4xl"}`}>
          {visibleDomains.map((domain, i) => (
            <DomainCard key={domain.id} domain={domain} index={i} expanded={active !== "All"} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "__pf-focus";
    style.textContent = "*:focus-visible{outline:2px solid #9D4EDD!important;outline-offset:2px;border-radius:4px;}";
    if (!document.getElementById("__pf-focus")) document.head.appendChild(style);
    return () => document.getElementById("__pf-focus")?.remove();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const ids = ["home", "skills", "projects", "work", "experience", "education", "about", "contact"];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f8fc] text-slate-900 transition-colors dark:bg-[#0b1020] dark:text-white">
      <ProgressBar />
      <BackToTop />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeSection={activeSection} />
      <Starfield />

      <div className="relative z-10 mx-auto max-w-[104rem] px-6 md:px-10 xl:px-16">

        {/* ── HEADER ── */}
        <header className="sticky top-0 z-50 bg-transparent">
          <div className="flex items-center justify-between py-7">
            <a href="#home" className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white/95">
              Krishna's <span className="text-[#9D4EDD]">Portfolio</span>
            </a>
            <div className="flex items-center gap-4 xl:gap-6">
              <nav className="hidden gap-8 text-base font-medium text-slate-700 dark:text-white/80 lg:flex xl:gap-10">
                {NAV_LINKS.map((link) => {
                  const id = link.href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <a key={link.href} href={link.href}
                      className={`transition-colors duration-200 ${isActive ? "text-[#9D4EDD]" : "hover:text-slate-900 dark:hover:text-white"}`}>
                      {link.label}
                    </a>
                  );
                })}
              </nav>
              <ThemeToggle />
              <button onClick={() => setMenuOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-slate-700 transition hover:border-black/20 hover:text-slate-900 dark:border-white/10 dark:text-white/70 dark:hover:border-white/20 dark:hover:text-white lg:hidden"
                aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <main id="home" className="space-y-32 py-8 md:py-14">

          {/* ── HERO ── */}
          <section className="grid min-h-[90vh] items-center gap-14 xl:grid-cols-[1.08fr_0.92fr] xl:gap-20">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-[52rem]">
              <h2 className="mb-5 text-2xl font-extrabold tracking-tight sm:text-3xl">
                <span className="text-slate-900 dark:text-white">Hi, I'm Krishna Koushik </span>
                <span className="bg-gradient-to-r from-[#9D4EDD] to-[#7C3AED] bg-clip-text text-transparent">Unnam.</span>
              </h2>
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-5 py-2 text-[11px] uppercase tracking-[0.28em] text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:text-white/80">
                  Full-Stack Engineer • Cloud, Backend & Applied AI
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-[11px] font-medium text-violet-600 dark:text-violet-400">
                  M.S. CS @ USF · 3.95 GPA
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  Available June 2026
                </div>
              </div>
              <h1 className="max-w-[44rem] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-slate-900 dark:text-white sm:text-5xl md:text-[3.5rem] xl:text-[4.25rem]">
                I build reliable full-stack systems and AI products that ship.
              </h1>
              <p className="mt-8 max-w-[36rem] text-lg leading-8 text-slate-600 dark:text-white/60 md:text-[1.2rem]">
                Full-stack engineer with 3.7+ years across healthcare, fintech, and academic platforms —
                building with .NET, Java, Spring Boot, React, TypeScript, Azure, and LLM systems.
              </p>
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-black/8 bg-black/[0.02] px-5 py-3.5 dark:border-white/8 dark:bg-white/[0.025]">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[#9D4EDD]" />
                <p className="text-sm text-slate-600 dark:text-white/55">
                  <span className="font-medium text-slate-900 dark:text-white/85">Currently exploring: </span>
                  multi-agent coordination patterns, Rust for systems programming, and real-time inference optimisation with vLLM.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#projects" className="inline-flex items-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#9D4EDD] px-6 py-3 text-sm font-medium text-white transition hover:opacity-95">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a href="/resume.pdf"
                  className="inline-flex items-center rounded-full border border-black/12 bg-black/[0.03] px-6 py-3 text-sm text-slate-800 transition hover:bg-gradient-to-r hover:from-[#7C3AED] hover:to-[#9D4EDD] hover:text-white hover:border-transparent dark:border-white/12 dark:bg-white/[0.03] dark:text-white/85">
                  Resume <Download className="ml-2 h-4 w-4" />
                </a>
              </div>
              <div className="mt-10 flex items-center gap-4 text-slate-500 dark:text-white/55">
                {[
                  { href: "https://github.com/krishnakoushik225", icon: <Github className="h-5 w-5" />, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/krishna-koushik-unnam-a952741b5/", icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                  { href: "mailto:krishnakoushiku@gmail.com", icon: <Mail className="h-5 w-5" />, label: "Email" },
                ].map((s) => (
                  <a key={s.label} href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={s.label}
                    className="rounded-full border border-black/10 bg-black/[0.03] p-3.5 transition hover:border-black/20 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20 dark:hover:text-white">
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Avatar card */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
              className="relative flex justify-center xl:justify-end">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-[31rem] xl:max-w-[34rem]">
                <div className="absolute -inset-4 rounded-[2.3rem] bg-black/5 blur-2xl dark:bg-white/5" />
                <div className="relative overflow-hidden rounded-[2.2rem] border border-black/10 bg-white/50 p-5 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="rounded-[1.8rem] border border-black/10 bg-white/70 p-5 dark:border-white/10 dark:bg-[#0c1226]/95">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500 dark:text-white/40">Overview</p>
                      <span className="rounded-full border border-black/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:border-white/10 dark:text-white/40">
                        Software Engineer
                      </span>
                    </div>
                    <div className="relative overflow-hidden rounded-[1.6rem] border border-black/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.06),rgba(15,23,42,0.02))] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_40%)]" />
                      <div className="relative flex h-[31rem] items-end justify-center overflow-hidden">
                        <img src="/bitmoji.png" alt="Krishna Koushik avatar" className="relative z-10 h-full w-full object-cover object-center" />
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
                        <p className="text-sm text-slate-500 dark:text-white/45">Focus</p>
                        <p className="mt-2 text-base font-medium text-slate-900 dark:text-white/90">Full-Stack, Cloud, Applied AI</p>
                      </div>
                      <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
                        <p className="text-sm text-slate-500 dark:text-white/45">GPA</p>
                        <p className="mt-2 text-base font-medium text-slate-900 dark:text-white/90">3.95 / 4.0 — M.S. CS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* ── ABOUT ── */}
          <section id="about" className="grid gap-12 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <SectionTitle
                eyebrow="About"
                title={<>Engineering with <span className="text-[#9D4EDD]">opinions,</span> not just output.</>}
              />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="max-w-3xl space-y-6 text-slate-600 dark:text-white/60">
              <p className="text-xl leading-9">
                I'm a full-stack engineer with 3.7 years of enterprise experience across healthcare, fintech,
                and academic systems — and a parallel track in applied AI research. I've shipped production systems
                at Optum and BNP Paribas, owned features end-to-end at USF, and built agentic AI pipelines that
                go meaningfully beyond demo quality.
              </p>
              <p className="text-xl leading-9">
                I learned the hard way at USF that optimising for speed before observability creates a maintenance
                trap. We shipped a Redis caching layer that shaved 500ms off API responses — and then spent two
                weeks debugging a cache invalidation bug that only appeared under concurrent load. Now I instrument
                everything before I optimise anything.
              </p>
              <p className="text-xl leading-9">
                On the AI side: I'm more interested in correctness and explainability than raw benchmark scores.
                Every project I build includes citation grounding, confidence thresholds, or structured failure
                modes — because a system that fails loudly is more useful in production than one that fails silently.
              </p>
            </motion.div>
          </section>

          {/* ── SKILLS ── */}
          <SkillsSection />

          {/* ── PROJECTS ── */}
          <section id="projects">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <SectionTitle
                eyebrow="Selected Projects"
                title={<>Selected work <span className="text-[#9D4EDD]">worth exploring</span></>}
                description="Each project includes the engineering decision that mattered most — not just what was built, but why it was built that way."
              />
            </motion.div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <motion.article key={project.title} custom={index} initial="hidden" whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }} variants={fadeUp}
                  className="group overflow-hidden rounded-[1.8rem] border border-black/10 bg-white/40 backdrop-blur-xl transition hover:-translate-y-2 hover:shadow-xl hover:border-black/18 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/18">
                  <div
                    className="aspect-[16/10] overflow-hidden border-b border-black/10 dark:border-white/10"
                    style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)" }}>
                    <img src={project.image} alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-slate-900 dark:text-white">{project.title}</h3>
                      <div className="flex shrink-0 items-center gap-2">
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noreferrer"
                            className="rounded-full border border-black/10 p-2.5 text-slate-500 transition hover:border-[#9D4EDD]/40 hover:text-[#9D4EDD] dark:border-white/10 dark:text-white/50"
                            title="Live Demo">
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                        <a href={project.github} target="_blank" rel="noreferrer"
                          className="rounded-full border border-black/10 p-2.5 text-slate-500 transition hover:border-black/18 hover:text-slate-900 dark:border-white/10 dark:text-white/50 dark:hover:border-white/18 dark:hover:text-white"
                          title="GitHub">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                    <p className="mt-4 text-[0.96rem] leading-7 text-slate-600 dark:text-white/58">{project.description}</p>
                    <div className="mt-4 rounded-xl border border-[#9D4EDD]/15 bg-[#9D4EDD]/[0.04] px-4 py-3">
                      <p className="mb-1 text-[9px] uppercase tracking-[0.28em] text-[#9D4EDD]/70">Key insight</p>
                      <p className="text-[11px] leading-6 text-slate-600 dark:text-white/55">{project.insight}</p>
                    </div>
                    <div className="mt-5">
                      <p className="mb-3 text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-white/45">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span key={item} className="rounded-full border border-black/10 px-3 py-1 text-xs text-slate-600 dark:border-white/10 dark:text-white/60">{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* ── ENTERPRISE WORK ── */}
          <section id="work">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <SectionTitle
                eyebrow="Professional Work"
                title={<>Enterprise platforms <span className="text-[#9D4EDD]">I helped build</span></>}
                description="End-to-end ownership across healthcare, fintech, and academic systems — not just contributions, but shipped outcomes."
              />
            </motion.div>
            <div className="mt-14 grid gap-6 xl:grid-cols-2">
              {enterpriseWork.map((item, index) => (
                <motion.article key={item.title} custom={index} initial="hidden" whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
                  className="rounded-[1.9rem] border border-black/10 bg-white/40 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex rounded-full border border-black/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:border-white/10 dark:text-white/42">{item.badge}</span>
                      <h3 className="mt-4 text-[1.65rem] font-semibold leading-snug tracking-[-0.03em] text-slate-900 dark:text-white">{item.title}</h3>
                    </div>
                    <div className="rounded-full border border-black/10 p-3 text-slate-500 dark:border-white/10 dark:text-white/45">
                      <Briefcase className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="mt-5 text-[1rem] leading-8 text-slate-600 dark:text-white/58">{item.description}</p>
                  <ul className="mt-6 space-y-3">
                    {item.highlights.map((h) => (
                      <li key={h} className="rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-[0.96rem] leading-7 text-slate-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/72">{h}</li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </section>

          {/* ── SOCIAL PROOF STRIP ── */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="border-y border-black/8 py-10 dark:border-white/8">
            <p className="mb-7 text-center text-[10px] uppercase tracking-[0.35em] text-slate-400 dark:text-white/30">
              Enterprise experience at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10">
              {experience.map((e) => (
                <img key={e.org} src={e.icon} alt={e.org}
                  className="h-8 object-contain opacity-40 grayscale transition duration-300 hover:opacity-75 hover:grayscale-0"
                  title={e.org} />
              ))}
            </div>
          </motion.div>

          {/* ── EXPERIENCE ── */}
          <section id="experience">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <SectionTitle
                eyebrow="Experience"
                title={<>Where <span className="text-[#9D4EDD]">I've worked</span></>}
                description="Company-backed engineering across healthcare, fintech, and academic platforms — with exact dates, team context, and scope."
              />
            </motion.div>
            <div className="mt-14 space-y-5">
              {experience.map((item, index) => (
                <motion.article key={item.role + item.org} custom={index} initial="hidden" whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
                  className="rounded-[1.8rem] border border-black/10 bg-white/40 px-6 py-7 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-5">
                      <div className="flex shrink-0 items-center justify-center pt-1">
                        <img src={item.icon} alt={item.org} className="h-14 w-14 rounded-lg object-contain" />
                      </div>
                      <div>
                        <h3 className="text-[1.7rem] font-semibold tracking-[-0.03em] text-slate-900 dark:text-white">{item.role}</h3>
                        <p className="mt-1 text-lg text-slate-600 dark:text-white/55">{item.org}</p>
                      </div>
                    </div>
                    <p className="shrink-0 text-base text-slate-500 dark:text-white/42">{item.period}</p>
                  </div>
                  <p className="mt-5 max-w-5xl text-[1rem] leading-8 text-slate-600 dark:text-white/58">{item.summary}</p>
                </motion.article>
              ))}
            </div>
          </section>

          {/* ── EDUCATION ── */}
          <section id="education">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <SectionTitle
                eyebrow="Education"
                title={<>Academic <span className="text-[#9D4EDD]">foundation</span></>}
                description="Formal training in computer science, distributed systems, machine learning, and software engineering."
              />
            </motion.div>
            <div className="mt-14 grid gap-6 xl:grid-cols-2">
              {education.map((item, index) => (
                <motion.article key={item.degree + item.school} custom={index} initial="hidden" whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
                  className="rounded-[1.8rem] border border-black/10 bg-white/40 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex items-start gap-5">
                    <div className="flex shrink-0 items-center justify-center pt-1">
                      {item.icon
                        ? <img src={item.icon} alt={item.school} className="h-14 w-14 rounded-lg object-contain" />
                        : <GraduationCap className="h-10 w-10 text-slate-400 dark:text-white/40" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[1.3rem] font-semibold tracking-[-0.03em] text-slate-900 dark:text-white">{item.degree}</h3>
                      <p className="mt-1 text-lg text-slate-600 dark:text-white/60">{item.school}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-white/45">
                        <span>{item.period}</span><span>•</span><span>{item.details}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* ── CONTACT ── */}
          <motion.section id="contact" initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.15 }} variants={fadeUp}
            className="rounded-[2.2rem] border border-black/10 bg-white/40 px-8 py-16 backdrop-blur-2xl md:px-12 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500 dark:text-white/42">Contact</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-slate-900 dark:text-white md:text-6xl">
                Let's build <span className="text-[#9D4EDD]">something impactful.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-xl leading-9 text-slate-600 dark:text-white/58">
                Actively seeking roles where I can contribute across backend, full-stack, cloud, or applied AI systems —
                and grow alongside engineers who take correctness and craft seriously.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
              {lookingFor.map((card) => (
                <div key={card.label} className="rounded-2xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="mb-3 flex items-center gap-2 text-[#9D4EDD]">
                    {card.icon}
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">{card.label}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {card.items.map((item) => (
                      <li key={item} className="text-sm text-slate-600 dark:text-white/60">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="mailto:krishnakoushiku@gmail.com"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#9D4EDD] px-7 py-3.5 text-sm font-medium text-white transition hover:opacity-95">
                Get in touch <Mail className="ml-2 h-4 w-4" />
              </a>
              <a href="https://github.com/krishnakoushik225" target="_blank" rel="noreferrer"
                className="inline-flex items-center rounded-full border border-black/12 bg-black/[0.03] px-7 py-3.5 text-sm text-slate-800 transition hover:bg-gradient-to-r hover:from-[#7C3AED] hover:to-[#9D4EDD] hover:text-white hover:border-transparent dark:border-white/12 dark:bg-white/[0.03] dark:text-white/85">
                GitHub <Github className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.section>
        </main>

        {/* ── FOOTER ── */}
        <footer className="mt-16 border-t border-black/10 py-8 dark:border-white/10">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 dark:text-white/35 sm:flex-row">
            <span>© 2025 Krishna Koushik Unnam. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="mailto:krishnakoushiku@gmail.com" className="transition hover:text-slate-900 dark:hover:text-white">Email</a>
              <a href="https://www.linkedin.com/in/krishna-koushik-unnam-a952741b5/" target="_blank" rel="noreferrer" className="transition hover:text-slate-900 dark:hover:text-white">LinkedIn</a>
              <a href="https://github.com/krishnakoushik225" target="_blank" rel="noreferrer" className="transition hover:text-slate-900 dark:hover:text-white">GitHub</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}