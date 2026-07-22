"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  ArrowRight,
  Download,
  BookOpen,
  Briefcase,
  Code2,
  Server,
  Brain,
  Cloud,
  Database,
  Cpu,
  Activity,
  Users,
  Layers,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: (i as number) * 0.08 },
  }),
};

// ─── SKILLS (aligned to resume Technical Skills headings) ────────────────────

const skillDomains = [
  {
    id: "languages",
    label: "PROGRAMMING LANGUAGES",
    tabLabel: "Languages",
    border: "#f97316",
    icon: <Code2 size={15} />,
    iconCls: "bg-orange-500/15 text-orange-400",
    labelCls: "text-orange-400",
    coreCls: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
    alsoCls: "bg-white/5 text-slate-400 border border-white/8",
    core: ["Python", "SQL", "Java", "Go", "C++", "CUDA"],
    also: ["Bash"],
  },
  {
    id: "ai",
    label: "AI / ML & GENERATIVE AI",
    tabLabel: "AI / ML & GenAI",
    border: "#8b5cf6",
    icon: <Brain size={15} />,
    iconCls: "bg-purple-500/15 text-purple-400",
    labelCls: "text-purple-400",
    coreCls: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    alsoCls: "bg-white/5 text-slate-400 border border-white/8",
    core: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Hugging Face Transformers",
      "LLMs",
      "Multimodal AI",
      "Foundation Models",
      "Mixture of Experts (MoE)",
      "RLHF",
      "DPO",
      "SFT",
      "AI Agents",
      "Agentic AI",
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "MCP",
      "Multi-Agent Systems",
    ],
    also: [
      "AI Agent Orchestration",
      "Tool Calling",
      "Function Calling",
      "Workflow Automation",
      "RAG",
      "Embedding Models",
      "Vector Search",
      "Computer Vision",
      "OpenCV",
      "YOLO",
      "XGBoost",
      "LoRA",
      "PEFT",
      "Prompt Engineering",
      "Knowledge Distillation",
    ],
  },
  {
    id: "training",
    label: "DISTRIBUTED TRAINING & MODEL SERVING",
    tabLabel: "Training & Serving",
    border: "#06b6d4",
    icon: <Cpu size={15} />,
    iconCls: "bg-cyan-500/15 text-cyan-400",
    labelCls: "text-cyan-400",
    coreCls: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
    alsoCls: "bg-white/5 text-slate-400 border border-white/8",
    core: [
      "PyTorch Distributed",
      "FSDP",
      "DeepSpeed",
      "Megatron-LM",
      "Ray",
      "NCCL",
      "vLLM",
      "TensorRT-LLM",
    ],
    also: [
      "Model Quantization",
      "GPU Optimization",
      "Distributed Inference",
      "HPC",
      "Tensor Parallelism",
      "Pipeline Parallelism",
      "Data Parallelism",
    ],
  },
  {
    id: "data",
    label: "DATA ENGINEERING & BIG DATA",
    tabLabel: "Data Engineering",
    border: "#eab308",
    icon: <Database size={15} />,
    iconCls: "bg-yellow-500/15 text-yellow-400",
    labelCls: "text-yellow-400",
    coreCls: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    alsoCls: "bg-white/5 text-slate-400 border border-white/8",
    core: ["Apache Spark", "Databricks", "Apache Airflow", "Apache Kafka", "ETL Pipelines"],
    also: [
      "Data Processing",
      "Feature Engineering",
      "Data Validation",
      "Data Quality",
      "Synthetic Data Generation",
      "Streaming Data Pipelines",
      "IoT Data Processing",
    ],
  },
  {
    id: "cloud",
    label: "CLOUD PLATFORMS & INFRASTRUCTURE",
    tabLabel: "Cloud & Infra",
    border: "#3b82f6",
    icon: <Cloud size={15} />,
    iconCls: "bg-blue-500/15 text-blue-400",
    labelCls: "text-blue-400",
    coreCls: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    alsoCls: "bg-white/5 text-slate-400 border border-white/8",
    core: [
      "AWS (S3, SageMaker, Glue, Lambda, EKS, IoT Core)",
      "Microsoft Azure",
      "Google Cloud Platform (GCP)",
      "Kubernetes",
      "Docker",
    ],
    also: ["Service Mesh", "Infrastructure as Code (IaC)", "Terraform"],
  },
  {
    id: "mlops",
    label: "MLOPS, DEVOPS, TESTING & MONITORING",
    tabLabel: "MLOps & DevOps",
    border: "#22c55e",
    icon: <Server size={15} />,
    iconCls: "bg-green-500/15 text-green-400",
    labelCls: "text-green-400",
    coreCls: "bg-green-500/20 text-green-300 border border-green-500/30",
    alsoCls: "bg-white/5 text-slate-400 border border-white/8",
    core: ["MLflow", "Git", "GitHub Actions", "CI/CD", "ArgoCD", "Pytest", "Model Deployment", "Model Versioning"],
    also: [
      "Model Monitoring",
      "Experiment Tracking",
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
      "Kubernetes Operations",
      "Feature Stores",
      "AI Application Deployment",
    ],
  },
  {
    id: "backend",
    label: "BACKEND, APIS & APPLICATION DEVELOPMENT",
    tabLabel: "Backend & APIs",
    border: "#ec4899",
    icon: <Layers size={15} />,
    iconCls: "bg-pink-500/15 text-pink-400",
    labelCls: "text-pink-400",
    coreCls: "bg-pink-500/20 text-pink-300 border border-pink-500/30",
    alsoCls: "bg-white/5 text-slate-400 border border-white/8",
    core: ["FastAPI", "Spring Boot", "React", "REST APIs", "Microservices"],
    also: ["gRPC", "SSE"],
  },
  {
    id: "eval-data",
    label: "EVALUATION, DATABASES, VECTOR STORES & ANALYTICS",
    tabLabel: "Eval & Data Stores",
    border: "#14b8a6",
    icon: <Activity size={15} />,
    iconCls: "bg-teal-500/15 text-teal-400",
    labelCls: "text-teal-400",
    coreCls: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
    alsoCls: "bg-white/5 text-slate-400 border border-white/8",
    core: [
      "MMLU",
      "GPQA",
      "HumanEval",
      "Custom Model Benchmarking",
      "PostgreSQL",
      "pgvector",
      "Pinecone",
      "Redis",
      "FAISS",
    ],
    also: [
      "A/B Testing",
      "MySQL",
      "Power BI",
      "Performance Optimization",
      "Explainable AI (XAI)",
      "LangSmith",
    ],
  },
  {
    id: "professional",
    label: "PROFESSIONAL SKILLS",
    tabLabel: "Professional",
    border: "#a855f7",
    icon: <Users size={15} />,
    iconCls: "bg-violet-500/15 text-violet-400",
    labelCls: "text-violet-400",
    coreCls: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
    alsoCls: "bg-white/5 text-slate-400 border border-white/8",
    core: [
      "System Design",
      "Distributed Systems",
      "Cross-Functional Collaboration",
      "Technical Leadership",
      "Analytical Thinking",
    ],
    also: [
      "Agile Development",
      "Mentoring",
      "Project Ownership",
      "Documentation",
      "Debugging",
      "Innovation",
      "Time Management",
      "Continuous Learning",
    ],
  },
];

const totalSkills = skillDomains.reduce((s, d) => s + d.core.length + d.also.length, 0);
const filterTabs = ["All Domains", ...skillDomains.map((d) => d.tabLabel)];

// ─── WORK ────────────────────────────────────────────────────────────────────

const workCards = [
  {
    company: "Meta — Multimodal Foundation Models",
    desc: "AI/ML Engineer building large-scale multimodal foundation model training, MoE optimization, RLHF/DPO alignment, RAG, agentic platforms, and inference serving more than 600 million global users daily across AWS, Azure, GCP, and hyperscale private data centers.",
    achievements: [
      "Developed multimodal foundation model training pipelines with Python, PyTorch, Transformers, and distributed GPU infrastructure — processing trillions of tokens and improving reasoning/coding benchmark accuracy 18%",
      "Built MoE architectures with PyTorch, CUDA, FSDP, and Megatron-LM — optimizing expert routing and cutting training time 32%; implemented RLHF/DPO preference optimization (+21% human eval scores)",
      "Designed Spark/Ray/Airflow data pipelines for petabyte-scale multimodal datasets; shipped FAISS RAG (+24% response accuracy) and evaluation frameworks with MMLU, GPQA, HumanEval, and custom benchmarks",
      "Deployed vLLM / TensorRT-LLM inference (−35% cost), containerized AI microservices on Docker/Kubernetes for 600M+ daily users, and MLOps/CI/CD with MLflow, GitHub Actions, ArgoCD, Prometheus, and Grafana; built agentic AI platforms with RAG, workflow orchestration, and tool-calling",
    ],
  },
  {
    company: "Accenture — Industrial AI & MLOps",
    desc: "Machine Learning Engineer delivering predictive maintenance, computer vision, digital twins, and cloud-native ML platforms for manufacturing — from billions of sensor records through real-time scoring APIs.",
    achievements: [
      "Developed Python predictive maintenance pipelines over real-time IoT data from 15,000+ industrial assets — cutting unplanned downtime 32%; built TensorFlow/XGBoost models improving failure prediction accuracy 21% for 5,000+ users",
      "Optimized real-time inference via feature engineering, model tuning, and MLflow — 38% lower prediction latency and 27% lower annual cloud inference cost",
      "Shipped CV inspection with OpenCV/PyTorch/YOLO; Spark/Databricks workflows; AWS S3/Glue/Lambda/SageMaker platforms; Spring Boot & FastAPI scoring microservices on EKS; digital twins with AWS IoT Core; and Power BI executive dashboards",
    ],
  },
];

// ─── PROJECTS ────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "Helix",
    image: "/projects/helix.svg",
    desc: "Production multi-provider LLM inference gateway with score-based routing, pgvector semantic caching, JWT tenant auth, Redis token-bucket rate limiting, circuit-breaker fallback, SSE streaming, and Prometheus/Grafana observability — load-tested at 0% failures, 18.43 req/s, 567 ms p95, and 99.97% cache hit rate across 3,885 requests at 100 VUs.",
    insight: "Semantic cache writes run in a background goroutine so they add zero latency to the caller — the cost lever only works if cache population never blocks the hot path.",
    tags: ["Go", "PostgreSQL", "pgvector", "Redis", "Docker", "Prometheus", "Grafana", "React"],
    href: "https://github.com/krishnakoushik225/helix",
  },
  {
    title: "Multi-Agent Code Repair",
    image: "/projects/multi-agent-code-repair.svg",
    desc: "Stateful issue-to-pull-request workflow — repository research, minimal-fix planning, commit-pinned patch generation, Docker-isolated validation, structured retry feedback, and human escalation. Validated on real Click issues: 1,136–1,436 tests passing, clean Ruff/Mypy, zero retries, ~2 min runtime, ~$0.35–$0.36 model cost.",
    insight: "Unified diffs fail on pinned historical SHAs because models invent context lines — search/replace blocks fetched at base_commit_sha sidestep that entire class of apply failures.",
    tags: ["Python", "LangGraph", "LiteLLM", "GitHub API", "tree-sitter", "Docker", "Pytest"],
    href: "https://github.com/krishnakoushik225/multi-agent-code-repair",
  },
  {
    title: "DocuMind",
    image: "/projects/documind.svg",
    desc: "Explainable enterprise RAG platform — extracts and chunks PDFs, stores document-scoped vectors in Pinecone, and serves context-grounded answers via FastAPI + React. Document/chunk metadata filtering, retrieved-source evidence, empty-retrieval handling, and LlamaIndex relevancy evaluation reduce cross-document contamination.",
    insight: "The core design principle: every answer must be traceable to a source passage. Surfacing the exact chunk shifts user trust from 'I hope this is right' to 'I can verify this is right.'",
    tags: ["Python", "FastAPI", "React", "Pinecone", "LangChain", "LlamaIndex", "OpenAI API"],
    href: "https://github.com/krishnakoushik225/DocuMind",
  },
  {
    title: "ECG-PEFT Benchmark",
    image: "/projects/ecg-peft.svg",
    desc: "Benchmarked LoRA vs Adapter fine-tuning across 3 cardiac foundation models on 65K+ ECG segments. Wav2Vec2+LoRA achieved best balanced performance (F1: 0.589, AUC: 0.620) with 60% fewer trainable parameters than full fine-tuning.",
    insight: "Audio models have no token embeddings — injecting LoRA required patching enable_input_require_grads to a no-op, then using mask-aware mean pooling across downsampled sequence lengths.",
    tags: ["PyTorch", "HuggingFace", "LoRA", "Wav2Vec2", "Medical AI"],
    href: "https://github.com/krishnakoushik225/ecg-peft-benchmark",
  },
  {
    title: "ResearchFlow AI",
    image: "/projects/researchflow.svg",
    desc: "ResearchFlow decomposes any query into parallel sub-tasks, retrieves and ranks web evidence, and delivers a cited, self-verified answer in under 30 seconds — using LangGraph's stateful graph to enable retry loops that a linear chain couldn't support.",
    insight: "Chose LangGraph over a simpler LangChain chain specifically because stateful graphs allow conditional retry edges when source relevance scores fall below a confidence threshold.",
    tags: ["Python", "LangGraph", "FastAPI", "Tavily", "React", "Ollama"],
    href: "https://github.com/krishnakoushik225/langgraph-research-agent",
  },
  {
    title: "ContextFlow AI",
    image: "/projects/contextflow.svg",
    desc: "ContextFlow runs entirely on-device using Ollama — 100% local inference, zero external calls, no data leaves the browser. Summarises pages, explains highlighted text, and answers context-aware questions with sub-second response times on consumer hardware.",
    insight: "The hardest part wasn't the LLM integration — it was building a streaming response protocol between the Chrome extension content script and the background service worker without a shared DOM.",
    tags: ["Chrome MV3", "TypeScript", "React", "Ollama", "Llama 3.2"],
    href: "https://github.com/krishnakoushik225/contextflow-ai",
  },
  {
    title: "APSRTC Duty Management Portal",
    image: "/projects/apsrtc.svg",
    desc: "Workforce management system for 500+ transport authority employees — Spring Boot REST APIs with JWT/RBAC across 5 roles, optimistic locking on shift-assignment records, duty assignment and leave approval workflows. Scheduling overhead reduced 40%.",
    insight: "Optimistic locking prevents a subtle race condition where two admins simultaneously assign the same employee to overlapping shifts — catching the conflict at the database level rather than application level.",
    tags: ["Spring Boot", "React", "PostgreSQL", "JWT", "Docker"],
    href: "https://github.com/krishnakoushik225/APSRTC-Duty-Management-Portal",
  },
  {
    title: "GenDiff-PEFT",
    image: "/projects/gendiff.svg",
    desc: "17.1% FID improvement (290.19→240.48) with 85% reduction in training time. Enhanced conditional UNet with 16×16 multi-head self-attention, DDIM sampling extended 50→100 steps. CFG ablation: higher guidance = better fidelity, lower = better diversity.",
    insight: "Fine-tuning outperforms training from scratch for conditional generation — the pretrained UNet already encodes useful low-level structure that would take thousands of steps to relearn.",
    tags: ["PyTorch", "DDIM", "CFG", "CIFAR-10", "Diffusion"],
    href: "https://github.com/krishnakoushik225/GenDiff-PEFT-Efficient-Conditional-Diffusion-Optimization",
  },
  {
    title: "CLAP Text-to-Audio Generation",
    image: "/projects/clap-audio.svg",
    desc: "Inference-time best-of-n selection using CLAP (text-audio alignment) scoring — ~40% CLAPScore improvement at n=5 with no training cost. Includes spectrogram comparisons and cost-benefit analysis showing clear diminishing returns beyond ~7 samples.",
    insight: "Best-of-n selection shifts quality from 'average output' to 'peak capability of the model' — the real challenge is that CLAP scoring itself costs ~2s per candidate, so the cost-benefit curve peaks around n=5.",
    tags: ["AudioLDM", "CLAP", "PyTorch", "Text-to-Audio", "Diffusion"],
    href: "https://github.com/krishnakoushik225/CLAP-Optimized-Text-to-Audio-Generation-AudioLDM-",
  },
  {
    title: "CycleGAN Monet Translation",
    image: "/projects/cyclegan.svg",
    desc: "Unpaired image-to-image translation between Monet paintings and photographs. Ablation studies on cycle-consistency (λ_cyc ∈ {5,10,20}) and identity loss. λ_cyc=10 produced the most visually balanced results with stable colour preservation.",
    insight: "λ_cyc=10 is the sweet spot: lower values allow stylistic flexibility but weaker reconstruction fidelity; higher values over-constrain the generator and limit the range of stylization.",
    tags: ["PyTorch", "CycleGAN", "GAN", "Ablation", "Image Translation"],
    href: "https://github.com/krishnakoushik225/CycleGAN-Monet-Photo-Translation-Cycle-Identity-Loss-Ablations-",
  },
  {
    title: "APSRTC Portal · .NET Edition",
    image: "/projects/apsrtc-dotnet.svg",
    desc: "Full-stack alternate implementation using ASP.NET Core + Entity Framework Core. JWT/HMAC-SHA256 auth, Redis-backed token blacklisting for stateless auth with revocation, rate limiting middleware, layered architecture with OpenAPI docs.",
    insight: "Redis-backed JWT blacklisting enables stateless auth with revocation — solving the logout problem without session state by keeping a small TTL-expiring blacklist that mirrors token lifetime.",
    tags: ["ASP.NET Core", "React", "PostgreSQL", "Redis", "Docker"],
    href: "https://github.com/krishnakoushik225/apsrtc-portal",
  },
];

// ─── TIMELINE ────────────────────────────────────────────────────────────────

const timeline = [
  {
    role: "AI/ML Engineer",
    company: "Meta",
    period: "Feb 2025 — Present",
    location: "Menlo Park, CA",
    logo: "/companies/meta.png",
    desc: "Develop large-scale multimodal foundation model training, MoE architectures, RLHF/DPO alignment, RAG systems, evaluation frameworks, MLOps, and high-throughput inference (vLLM, TensorRT-LLM) — serving more than 600 million global users daily across AWS, Azure, GCP, and hyperscale private data centers.",
  },
  {
    role: "Machine Learning Engineer",
    company: "Accenture",
    period: "Mar 2021 — Jun 2024",
    location: "India",
    logo: "/companies/accenture.png",
    desc: "Built industrial ML spanning predictive maintenance on 15,000+ IoT assets, computer vision inspection (YOLO), digital twins, Spark/Databricks platforms, and AWS SageMaker MLOps — delivering real-time scoring APIs with Java/Spring Boot and FastAPI, plus Power BI stakeholder dashboards.",
  },
];

const education = [
  {
    degree: "Master of Science in Computer Science & Engineering",
    school: "University of South Florida",
    logo: "/companies/usf.png",
  },
];

const certifications = [
  {
    name: "AWS Certified Generative AI Developer – Professional (AIP-C01)",
    logo: "/companies/aws.jpg",
    alt: "AWS",
  },
  {
    name: "Databricks Certified Machine Learning Professional",
    logo: "/companies/databricks.png",
    alt: "Databricks",
  },
  {
    name: "Certified Kubernetes Application Developer (CKAD)",
    logo: "/companies/kubernetes.svg",
    alt: "Kubernetes",
  },
  {
    name: "Microsoft Certified: Azure AI Apps and Agents Developer Associate (AI-103)",
    logo: "/companies/microsoft.png",
    alt: "Microsoft",
  },
];

const companyLogos = [
  { src: "/companies/meta.png", alt: "Meta" },
  { src: "/companies/accenture.png", alt: "Accenture" },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All Domains");

  const visibleDomains =
    activeFilter === "All Domains"
      ? skillDomains
      : skillDomains.filter((d) => d.tabLabel === activeFilter);

  return (
    <main className="relative min-h-screen text-slate-100">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative z-10 min-h-[100dvh] flex items-center w-full max-w-[100rem] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 pt-16"
      >
        <div className="w-full grid lg:grid-cols-[minmax(0,1fr)_28rem] gap-8 xl:gap-14 items-center py-8 lg:py-10">

          {/* Left */}
          <div className="text-left flex flex-col min-w-0">
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={0}
              className="text-slate-100 text-xl sm:text-2xl font-semibold mb-3"
            >
              Hi, I&apos;m Krishna Koushik{" "}
              <span className="text-purple-400 font-bold">Unnam.</span>
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="flex flex-wrap items-center gap-2 mb-2"
            >
              <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-medium border border-white/20 bg-transparent text-slate-300 uppercase tracking-[0.14em]">
                AI/ML Engineer · Foundation Models &amp; GenAI
              </span>
              <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-medium border border-purple-500/40 bg-purple-500/10 text-purple-300 uppercase tracking-[0.14em]">
                M.S. CS &amp; Engineering @ USF
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={1.2}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-green-500/10 border border-green-500/30 text-green-400 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                At Meta · Feb 2025 — Present
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-[2.75rem] sm:text-5xl lg:text-[3.5rem] xl:text-[3.75rem] font-bold text-white leading-[1.08] tracking-[-0.02em] mb-6 max-w-4xl"
            >
              I train and ship large-scale AI systems that run in production.
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={3}
              className="text-slate-400 text-[15px] sm:text-base font-normal leading-[1.65] mb-6 max-w-2xl"
            >
              AI/ML Engineer with 5+ years designing, training, and deploying foundation models,
              multimodal LLMs, RAG, RLHF, and enterprise ML — from GPU clusters to cloud inference
              serving millions of users.
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={3.5}
              className="flex items-start gap-2.5 p-4 rounded-xl border border-white/8 bg-white/[0.03] mb-8 max-w-2xl"
            >
              <BookOpen size={16} className="text-purple-400 shrink-0 mt-0.5" />
              <p className="text-[13px] sm:text-sm text-slate-400 font-normal leading-relaxed">
                <span className="text-slate-300 font-medium">Currently building: </span>
                multimodal foundation model training, Mixture-of-Experts architectures, RLHF/DPO
                alignment, RAG systems, and agentic AI platforms at Meta.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={4}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 !text-white font-medium text-sm transition-colors"
              >
                View Projects
                <ArrowRight size={15} />
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-transparent hover:bg-white/5 text-slate-300 font-medium text-sm transition-colors"
              >
                Resume
                <Download size={14} />
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={4.5}
              className="flex items-center gap-3 mt-6"
            >
              {[
                { icon: Github, href: "https://github.com/krishnau225", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/krishna-u225/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:krishnakoushikunnam1@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-purple-400 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Profile Card (fixed width/height; does not stretch with layout) */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="hidden lg:flex justify-end"
          >
            <div className="w-full max-w-md h-[36rem] flex flex-col rounded-2xl border border-white/10 bg-[#12122a]/80 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 shrink-0">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Overview
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-slate-300 border border-white/15">
                  AI/ML Engineer
                </span>
              </div>
              <div className="flex-1 min-h-0 px-4 pb-4 flex flex-col">
                <div className="rounded-2xl bg-white overflow-hidden flex-1 min-h-0 flex items-center justify-center">
                  <img
                    src="/avatar.png"
                    alt="Krishna Koushik Unnam"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 px-4 pb-4 shrink-0">
                <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                  <p className="text-xs text-slate-500 mb-1 font-normal">Focus</p>
                  <p className="text-sm font-medium text-white leading-snug">Foundation Models, RAG, MLOps</p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                  <p className="text-xs text-slate-500 mb-1 font-normal">Based in</p>
                  <p className="text-sm font-medium text-white leading-snug">Menlo Park, CA</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="relative z-10 max-w-[100rem] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">About</p>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Research-grade models,{" "}
              <span className="text-purple-400">production-grade</span>
              <br />
              engineering.
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
            className="space-y-5 pt-8 lg:pt-0"
          >
            <p className="text-slate-300 leading-relaxed">
              I&apos;m an AI/ML Engineer with 5+ years of experience designing, training, and
              deploying large-scale AI systems — including foundation models, multimodal LLMs, and
              enterprise machine learning solutions. Experienced in distributed model training,
              Generative AI, RAG, RLHF, MLOps, and scalable inference across GPU clusters and cloud
              platforms, delivering production-ready AI for millions of users.
            </p>
            <p className="text-slate-300 leading-relaxed">
              At Meta, I lead multimodal training pipelines, Mixture-of-Experts optimization,
              SFT/RLHF/DPO alignment, RAG systems, and inference platforms that serve hundreds of
              millions of requests daily. Before that at Accenture, I shipped industrial predictive
              maintenance, computer vision inspection, digital twins, and cloud-native MLOps from
              petabyte-scale sensor data to real-time scoring APIs.
            </p>
            <p className="text-slate-300 leading-relaxed">
              I&apos;m passionate about building intelligent systems that combine cutting-edge
              research with robust engineering — measurable quality gains, governed LLMOps, and
              inference that stays reliable and cost-efficient at scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────────── */}
      <section id="skills" className="relative z-10 max-w-[100rem] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Tech Stack</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
            Technologies I build{" "}
            <span className="text-purple-400">with</span>
          </h2>
          <p className="text-slate-400 max-w-xl">
            Languages, frameworks, training stacks, data platforms, and MLOps tooling I use to
            design, train, evaluate, and serve large-scale AI systems.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
          className="flex flex-wrap gap-3 mb-8"
        >
          {[
            { value: String(totalSkills), label: "TOTAL SKILLS" },
            { value: String(skillDomains.length), label: "DOMAINS" },
            { value: "5+", label: "YEARS XP" },
            { value: "AI/ML", label: "FOCUS" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-baseline gap-2 px-4 py-2 rounded-lg border border-white/8 bg-white/3 text-sm"
            >
              <span className="font-bold text-white">{s.value}</span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2}
          className="flex flex-wrap gap-2 mb-8"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeFilter === tab
                  ? "bg-purple-600 !text-white"
                  : "border border-white/10 text-slate-400 hover:text-white hover:border-white/25"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Skill cards — uniform height matches densest first-row tile */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {visibleDomains.map((domain, i) => (
            <motion.div
              key={domain.id}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="rounded-xl border border-white/8 bg-white/3 p-5 relative flex h-[34rem] flex-col overflow-hidden md:h-[36rem] lg:h-[38rem]"
              style={{ borderLeft: `3px solid ${domain.border}` }}
            >
              <div className="flex items-start justify-between mb-4 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${domain.iconCls}`}>
                    {domain.icon}
                  </div>
                  <span className={`text-xs font-bold tracking-widest ${domain.labelCls}`}>
                    {domain.label}
                  </span>
                </div>
                <span className="skill-count">
                  {domain.core.length + domain.also.length} skills
                </span>
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Core</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {domain.core.map((s) => (
                    <span key={s} className={`px-2 py-0.5 rounded-md text-xs font-medium ${domain.coreCls}`}>
                      {s}
                    </span>
                  ))}
                </div>

                {domain.also.length > 0 && (
                  <>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Also Used</p>
                    <div className="flex flex-wrap gap-1.5">
                      {domain.also.map((s) => (
                        <span key={s} className={`px-2 py-0.5 rounded-md text-xs ${domain.alsoCls}`}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WORK ─────────────────────────────────────────────────────────── */}
      <section id="work" className="relative z-10 max-w-[100rem] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            Enterprise AI platforms I helped
            <br />
            <span className="text-purple-400">build</span>
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl">
            End-to-end ownership across foundation model training, alignment, RAG, industrial ML,
            and production inference — shipped outcomes at scale.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5">
          {workCards.map((job, i) => (
            <motion.div
              key={job.company}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="rounded-xl border border-white/8 bg-white/3 p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 border border-white/8 px-2 py-1 rounded-full">
                  Professional Work
                </span>
                <Briefcase size={14} className="text-slate-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 leading-snug">{job.company}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{job.desc}</p>
              <div className="space-y-2">
                {job.achievements.map((a, j) => (
                  <div key={j} className="text-xs text-slate-400 leading-relaxed p-3 rounded-lg bg-white/3 border border-white/5">
                    {a}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="relative z-10 max-w-[100rem] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Selected Projects</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            Selected work{" "}
            <span className="text-purple-400">worth exploring</span>
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl">
            Each project includes the engineering decision that mattered most — not just what was
            built, but why it was built that way.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="rounded-xl border border-white/8 bg-white/3 overflow-hidden group hover:border-purple-500/30 transition-all duration-300"
            >
                    {/* Project banner image */}
              <div className="w-full overflow-hidden" style={{ height: 180 }}>
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-white text-base leading-snug group-hover:text-purple-300 transition-colors">
                    {p.title}
                  </h3>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-purple-400 hover:border-purple-500/40 transition-all shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{p.desc}</p>

                {/* Key insight */}
                <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/15 mb-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-yellow-500/80 mb-1.5">
                    Key Insight
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.insight}</p>
                </div>

                {/* Tech stack */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-slate-400 border border-white/8"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" className="relative z-10 max-w-[100rem] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-24">
        {/* Company logos strip */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-4 text-center">
            Enterprise Experience At
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {companyLogos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="w-12 h-12 rounded-xl border border-white/8 object-cover"
              />
            ))}
          </div>
          <div className="mt-8 h-px bg-white/5" />
        </motion.div>

        {/* Where I've worked */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Experience</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            Where{" "}
            <span className="text-purple-400">I&apos;ve worked</span>
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl">
            Company-backed AI/ML engineering across foundation models and industrial machine
            learning — with exact dates, locations, and scope.
          </p>
        </motion.div>

        <div className="space-y-4 mb-20">
          {timeline.map((job, i) => (
            <motion.div
              key={job.company}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="rounded-xl border border-white/8 bg-white/3 p-5"
            >
              <div className="flex items-start gap-4">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-11 h-11 rounded-xl border border-white/8 object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-white text-base">{job.role}</h3>
                      <p className="text-sm text-slate-400">{job.company} · {job.location}</p>
                    </div>
                    <span className="text-sm text-slate-500 shrink-0">{job.period}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{job.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Education</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            Academic{" "}
            <span className="text-purple-400">foundation</span>
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl">
            Formal training in computer science and engineering, backed by cloud and ML
            certifications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 gap-5 mb-10 max-w-2xl">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="rounded-xl border border-white/8 bg-white/3 p-5 flex items-start gap-4"
            >
              <img
                src={edu.logo}
                alt={edu.school}
                className="w-11 h-11 rounded-xl border border-white/8 object-cover shrink-0"
              />
              <div>
                <h3 className="font-semibold text-white text-base leading-snug">{edu.degree}</h3>
                <p className="text-sm text-slate-400 mt-0.5">{edu.school}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mb-6"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Certifications</p>
          <h3 className="text-2xl font-bold text-white">
            Credentials that{" "}
            <span className="text-purple-400">back the work</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="rounded-xl border border-white/8 bg-white/3 p-4 flex items-start gap-3"
            >
              <img
                src={cert.logo}
                alt={cert.alt}
                className="w-10 h-10 rounded-lg border border-white/8 object-contain bg-white shrink-0 p-1"
              />
              <p className="text-sm text-slate-300 leading-snug pt-1.5">{cert.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="relative z-10 max-w-[100rem] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-24">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Contact</p>
          <h2 className="text-4xl font-black text-white mb-3">
            Let&apos;s <span className="text-purple-400">connect</span>
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed max-w-2xl">
            Open to AI/ML, foundation model, and GenAI roles. Whether you have an opportunity, a
            collaboration in mind, or just want to say hi — my inbox is open.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {[
              { icon: Mail, label: "krishnakoushikunnam1@gmail.com", href: "mailto:krishnakoushikunnam1@gmail.com" },
              { icon: Linkedin, label: "linkedin.com/in/krishna-u225", href: "https://www.linkedin.com/in/krishna-u225/" },
              { icon: Github, label: "github.com/krishnau225", href: "https://github.com/krishnau225" },
              { icon: Phone, label: "(510) 516-3735", href: "tel:+15105163735" },
              { icon: MapPin, label: "Menlo Park, CA", href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/3 hover:border-purple-500/40 hover:bg-purple-500/5 text-slate-300 hover:text-white transition-all text-sm min-w-0"
              >
                <Icon size={16} className="text-purple-400 shrink-0" />
                <span className="truncate">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/5 text-center py-6 text-xs text-slate-600">
        © {new Date().getFullYear()} Krishna Koushik Unnam · Built with Next.js &amp; Tailwind CSS
      </footer>
    </main>
  );
}
