'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Sparkles,
  Terminal,
  Trophy,
  X
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
];

const projects = [
  {
    name: 'Aegis',
    tag: 'MCP Security & Governance',
    desc: 'An MCP server that audits the combined effective permissions of an AI agent across all connected tools — deterministically detecting toxic capability combinations and data-exfiltration vectors before deployment, at zero LLM token cost.',
    live: 'https://nitrostack.ai',
    github: 'https://github.com/prince-rai88/aegis-mcp',
    statusLabel: '🏆 1st Place — NitroStack x SRM Agentic AI Hackathon',
    features: [
      'Audits AI agent permissions across all connected tools deterministically',
      'Detects toxic capability combos & data-exfiltration vectors at zero token cost',
      'Exposes 4 MCP tools consumable by Claude, ChatGPT, or NitroStack Studio'
    ],
    tech: ['TypeScript', 'NitroStack', 'Model Context Protocol', 'Groq'],
    deepDive: {
      problem:
        'AI agents with broad tool access can accumulate dangerous permission combinations that are invisible to operators until something goes wrong.',
      approach:
        'Built a deterministic MCP server that maps the full permission graph of connected tools and checks for toxic combinations and exfiltration paths — without spending any LLM tokens.',
      architecture: [
        'MCP Tool Layer (4 tools)',
        'Capability Graph Engine',
        'Attack-Path Detector',
        'Groq Policy Explainer'
      ],
      challenges: [
        'Mapping composite permissions across heterogeneous tools without LLM calls',
        'Designing attack-path logic that scales to arbitrary tool combinations',
        'Integrating cleanly with Claude, ChatGPT, and NitroStack Studio'
      ],
      outcome:
        'Deployed live on NitroStack cloud. Won 1st Place at the NitroStack x SRM Agentic AI Hackathon.'
    }
  },
  {
    name: 'FinAI',
    tag: 'AI Financial Advisor',
    desc: 'Full-stack expense tracker that uses OpenAI to analyze categorized transaction data and generate personalized, context-aware savings recommendations. Secure Django REST backend with JWT auth; deployed end-to-end across Vercel, Render, and Supabase.',
    live: 'https://ai-financial-advisor-rouge.vercel.app',
    github: 'https://github.com/prince-rai88/AI-Financial-Advisor',
    statusLabel: 'Live',
    features: [
      'OpenAI-powered personalized savings recommendations from transaction data',
      'Secure Django REST backend with JWT authentication',
      'End-to-end deployment: Vercel + Render + Supabase (PostgreSQL)'
    ],
    tech: ['Django', 'React', 'PostgreSQL', 'OpenAI API', 'Vercel', 'Render'],
    deepDive: {
      problem:
        'Most expense trackers visualize data but fail to provide practical, context-aware financial guidance users can act on weekly.',
      approach:
        'Engineered a pipeline that ingests transactions, categorizes spending patterns, and routes contextual prompts through an LLM layer to produce personalized guidance.',
      architecture: [
        'React Insight Dashboard',
        'Django REST API + JWT',
        'Supabase PostgreSQL Store',
        'OpenAI Recommendation Engine'
      ],
      challenges: [
        'Maintaining recommendation quality while controlling token costs',
        'Designing secure boundaries for sensitive financial data',
        'Keeping generated advice specific instead of generic'
      ],
      outcome:
        'Shipped an AI advisor that helps users convert raw spending logs into clear savings actions and better monthly planning. Live in production.'
    }
  },
  {
    name: 'LastCommit AI Agent',
    tag: 'Autonomous AI Solver',
    desc: 'A high-performance, deterministic AI agent built in 12 hours for The Last Commit Hackathon. Routes queries through a cascade of deterministic mathematical solvers before defaulting to an LLM fallback — ensuring computational perfection on math tasks while preserving intelligence for abstract queries.',
    github: 'https://github.com/prince-rai88/lastcommit-ai-agent',
    statusLabel: '🥉 3rd Place — Led competition by 9 levels',
    features: [
      'Deterministic solvers pipeline with LLM fallback via GPT-4o-mini',
      'Single POST endpoint that auto-routes to the optimal solver',
      'Built in 12 hours — led the scoreboard by 9 levels before manual intervention'
    ],
    tech: ['Python', 'FastAPI', 'OpenAI API', 'NumPy', 'SymPy', 'Playwright'],
    deepDive: {
      problem:
        'Competitive hackathon challenges require solving progressive algorithm and data-extraction tasks autonomously with maximum speed and precision.',
      approach:
        'Designed a cascading architecture: incoming queries first pass through deterministic mathematical solvers (NumPy, SymPy), and only fall back to GPT-4o-mini for abstract reasoning — combining computational perfection with LLM intelligence.',
      architecture: [
        'Single POST Endpoint',
        'Deterministic Solvers Pipeline',
        'LLM Fallback (GPT-4o-mini)',
        'Canonicalized Output'
      ],
      challenges: [
        'Building a complete autonomous agent system in 12 hours',
        'Routing between deterministic and LLM paths reliably',
        'Handling web automation for data-extraction challenges'
      ],
      outcome:
        'Dominated the scoreboard, leading by 9 levels. Placed 3rd overall at The Last Commit Hackathon (Cherry+ Network, SRM).'
    }
  }
];

const skillMap = [
  {
    category: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'Java (DSA)']
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'HTML/CSS']
  },
  {
    category: 'Backend',
    items: ['Django', 'Django REST Framework', 'NitroStack']
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'SQLite']
  },
  {
    category: 'AI / GenAI',
    items: ['OpenAI API', 'Groq', 'LangChain', 'OpenRouter', 'HuggingFace', 'OpenCV', 'MCP']
  },
  {
    category: 'Tools & Infra',
    items: ['n8n', 'Git', 'Postman', 'Vercel', 'Render', 'ngrok', 'Open Claw']
  }
];

const rotateLines = [
  'I build reliable full-stack applications',
  'I design AI and automation integrations',
  'I develop systems that solve problems'
];

const trustMetrics = [
  '🏆 1st Place — NitroStack x SRM Agentic AI Hackathon. Built and deployed a live MCP security server for AI agent governance.',
  '🥉 3rd Place — The Last Commit, Agentic AI Hackathon by Cherry+ Network, SRM. Built a working autonomous AI routing system in 12 hours as a first-year participant.',
  '🎓 9.9 / 10.0 CGPA across Year 1 — top academic performance alongside active project development, internship, and hackathon participation.'
];

const stagger = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.07
    }
  })
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentLine, setCurrentLine] = useState(0);
  const [expandedProject, setExpandedProject] = useState('Aegis');
  const [loading, setLoading] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const formRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 950);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const rotate = window.setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % rotateLines.length);
    }, 2400);
    return () => window.clearInterval(rotate);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.52, rootMargin: '-32% 0px -30% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === '/' && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
      if (event.key === 'Escape') {
        setPaletteOpen(false);
        setCaseStudyOpen(false);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const activeProject = useMemo(
    () => projects.find((project) => project.name === expandedProject) ?? projects[0],
    [expandedProject]
  );

  const activeDeepDive = activeProject.deepDive;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setPaletteOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    const form = formRef.current;
    const data = new FormData(form);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        setFormStatus('sent');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
            className="fixed inset-0 z-[120] grid place-items-center bg-[#050505]"
          >
            <div className="text-center">
              <p className="mono text-xs uppercase tracking-[0.35em] text-[#98c3ff]">Booting Portfolio Runtime</p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 220 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="mx-auto mt-5 h-1 rounded-full bg-gradient-to-r from-neonBlue via-neonViolet to-neonCyan"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-10" />
        <motion.div
          animate={{ x: [0, 22, -12, 0], y: [0, -14, 16, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#2f8bff]/15 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -30, 12, 0], y: [0, 24, -16, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-36 top-[24%] h-[26rem] w-[26rem] rounded-full bg-[#7b61ff]/12 blur-[140px]"
        />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={() => scrollToSection('home')}
            className="mono text-sm tracking-[0.25em] text-white/90 transition hover:text-neonCyan"
          >
            PRINCE_RAI
          </button>
          <nav className="hidden gap-3 md:flex">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`rounded-full px-3 py-2 text-sm transition ${activeSection === item.id
                    ? 'bg-white/12 text-white shadow-glowBlue'
                    : 'text-white/65 hover:bg-white/6 hover:text-white'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPaletteOpen(true)}
              className="mono hidden rounded-full border border-white/20 px-4 py-2 text-xs text-white/70 transition hover:border-neonBlue hover:text-white md:inline-flex"
            >
              Press / to navigate
            </button>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="rounded-lg border border-white/20 p-2 text-white/80 transition hover:border-neonBlue md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-white/10 bg-black/60 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {sections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`rounded-xl px-4 py-3 text-left text-sm transition ${activeSection === item.id
                        ? 'bg-white/12 text-white'
                        : 'text-white/65 hover:bg-white/6 hover:text-white'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="mx-auto max-w-7xl px-6">
        <section id="home" className="relative min-h-screen pt-36">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72 }}
            className="neon-border glow-card rounded-[2rem] bg-[var(--surface)] p-8 md:p-14"
          >
            <span className="mono inline-flex items-center gap-2 rounded-full border border-[#3d74ff66] bg-[#10244766] px-4 py-1 text-xs uppercase tracking-[0.2em] text-[#a8cbff]">
              <Sparkles size={14} /> Full Stack Developer | AI & Automation
            </span>
            <h1 className="mt-9 text-5xl font-semibold leading-[0.9] tracking-[-0.04em] text-white md:text-8xl">Prince Rai</h1>
            <p className="mt-5 max-w-4xl text-xl text-white md:text-3xl font-medium">
              Full-Stack Developer &amp; AI Engineer
            </p>
            <p className="mt-3 max-w-4xl text-lg text-[#b8c6e2] md:text-xl">
              Second-year CSE engineer who builds and ships production systems — full-stack web apps, LLM-powered backends, and agentic AI tools. Won 1st Place at a national hackathon, deployed multiple live applications, and actively freelancing — all in Year 1.
            </p>

            <div className="mt-8 h-8 overflow-hidden mono text-base text-neonCyan md:text-lg">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentLine}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {rotateLines[currentLine]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-11 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="group rounded-xl bg-gradient-to-r from-neonBlue to-neonViolet px-7 py-3.5 text-sm font-semibold text-white transition hover:shadow-glowBlue"
              >
                Explore My Work <ArrowUpRight className="ml-2 inline-block size-4 transition group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="rounded-xl border border-[#4a78d8] bg-[#0f172e8a] px-7 py-3.5 text-sm font-semibold text-[#d7e3ff] transition hover:border-neonCyan hover:text-white"
              >
                Hire Me
              </button>
              <a
                href="/Prince_Rai_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/90 transition hover:border-white/40"
              >
                View Resume
              </a>
            </div>

            <div className="mt-11 grid gap-3 md:grid-cols-3">
              {trustMetrics.map((metric, i) => (
                <motion.div
                  key={metric}
                  custom={i}
                  initial="hidden"
                  animate="show"
                  variants={stagger}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#d5deff]"
                >
                  {metric}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="projects" className="py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="mono text-xs uppercase tracking-[0.25em] text-[#95bfff]">Project Showcase</p>
              <h2 className="section-title mt-3">Systems That Ship, Scale, and Solve</h2>
            </div>
            <p className="max-w-xl text-sm text-[#a8b4d3]">
              Product-grade builds with architecture intent, secure APIs, and practical outcomes for real users.
            </p>
          </div>

          <div className="-mx-6 overflow-x-auto px-6 pb-5">
            <div className="flex min-w-max gap-6">
              {projects.map((project) => {
                const selected = expandedProject === project.name;
                return (
                  <motion.button
                    key={project.name}
                    onClick={() => setExpandedProject(project.name)}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className={`glow-card neon-border relative w-[20rem] rounded-2xl p-6 text-left transition md:w-[23rem] ${selected ? 'bg-[#10142b]/92 shadow-glowBlue' : 'bg-[#090d1a]/74'
                      }`}
                  >
                    <p className="mono text-xs uppercase tracking-[0.2em] text-neonCyan">{project.tag}</p>
                    <h3 className="mt-3 text-2xl font-semibold">{project.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#b9c6e2]">{project.desc}</p>
                    <span className="mt-5 inline-block rounded-full border border-white/15 px-3 py-1 text-xs text-[#9ac4ff]">
                      Hover to preview. Click to explore.
                    </span>
                    {project.statusLabel && (
                      <span className="mt-3 inline-block text-xs text-neonCyan">{project.statusLabel}</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={activeProject.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="neon-border glow-card mt-9 rounded-2xl bg-[#0b1020bf] p-6 md:p-9"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="mono text-xs uppercase tracking-[0.2em] text-neonCyan">Featured Build</p>
                  <h3 className="mt-2 text-3xl font-semibold">{activeProject.name}</h3>
                  <p className="mt-3 max-w-3xl leading-relaxed text-[#c6d2ef]">{activeProject.desc}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {activeProject.live && (
                    <a
                      href={activeProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-neonBlue/60 px-4 py-2 text-sm text-[#d8e7ff] transition hover:bg-neonBlue/20"
                    >
                      Live <ExternalLink size={16} />
                    </a>
                  )}
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-neonBlue/60 px-4 py-2 text-sm text-[#d8e7ff] transition hover:bg-neonBlue/20"
                    >
                      View Code <Github size={16} />
                    </a>
                  )}
                  {!activeProject.live && !activeProject.github && (
                    <span className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm text-white/70">
                      Coming Soon
                    </span>
                  )}
                  {activeDeepDive && (
                    <button
                      onClick={() => setCaseStudyOpen(true)}
                      className="rounded-xl bg-gradient-to-r from-neonBlue to-neonViolet px-4 py-2 text-sm font-medium text-white"
                    >
                      View Case Study
                    </button>
                  )}
                </div>
              </div>
              {activeProject.statusLabel && (
                <p className="mt-3 text-sm text-neonCyan">{activeProject.statusLabel}</p>
              )}

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mono text-xs uppercase tracking-[0.25em] text-[#9ac4ff]">Key Highlights</h4>
                  <ul className="mt-3 space-y-3 text-[#d4dcf4]">
                    {activeProject.features.map((feature) => (
                      <li key={feature} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mono text-xs uppercase tracking-[0.25em] text-[#9ac4ff]">Tech Stack</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeProject.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#79a8ff44] bg-[#152342] px-3 py-1 text-sm text-[#dce7ff]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </motion.article>
          </AnimatePresence>

          {/* Case Study Modal */}
          <AnimatePresence>
            {caseStudyOpen && activeDeepDive && (
              <CaseStudyModal
                project={activeProject}
                deepDive={activeDeepDive}
                onClose={() => setCaseStudyOpen(false)}
              />
            )}
          </AnimatePresence>
        </section>

        <section id="skills" className="py-32">
          <p className="mono text-xs uppercase tracking-[0.25em] text-[#95bfff]">Skills Architecture</p>
          <h2 className="section-title mt-3">Modern Stack for Product and AI Delivery</h2>
          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skillMap.map((group, i) => (
              <motion.div
                key={group.category}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.22 }}
                variants={stagger}
                whileHover={{ y: -4 }}
                className="glow-card neon-border rounded-2xl bg-[#0b1122c8] p-6"
              >
                <h3 className="text-lg font-semibold text-[#edf3ff]">{group.category}</h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#8ab4ff55] bg-[#132347] px-3 py-1.5 text-xs text-[#d3e1ff] transition hover:border-neonCyan hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="achievements" className="py-32">
          <p className="mono text-xs uppercase tracking-[0.25em] text-[#95bfff]">Achievements</p>
          <h2 className="section-title mt-3">Proof of Work, Not Just Talk</h2>

          <div className="mt-11 grid gap-4 md:grid-cols-2">
            {[
              {
                icon: <Trophy size={20} />,
                title: '1st Place — NitroStack x SRM Agentic AI Hackathon',
                desc: 'Built and deployed a live MCP security server for AI agent governance. Adopted at the hackathon for real-world evaluation.'
              },
              {
                icon: <Award size={20} />,
                title: '3rd Place — The Last Commit, Cherry+ Network',
                desc: 'Built a working autonomous AI routing system in 12 hours as a first-year participant at the Agentic AI Hackathon.'
              },
              {
                icon: <GraduationCap size={20} />,
                title: '9.9 / 10.0 CGPA — Year 1',
                desc: 'Top academic performance across Semesters 1 & 2, alongside active project development, internship, and hackathon participation.'
              },
              {
                icon: <Code2 size={20} />,
                title: '100+ Problems Solved — LeetCode (Java)',
                desc: 'Consistent algorithmic practice covering Arrays, Hashing, Sliding Window, Two Pointers, and Binary Search.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                custom={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
                className="neon-border rounded-2xl bg-[#0f172fa9] p-6"
              >
                <div className="mb-4 inline-flex rounded-lg border border-neonBlue/40 bg-neonBlue/10 p-2 text-neonCyan">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#a8b4d3]">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 neon-border rounded-2xl bg-gradient-to-r from-[#102142] via-[#11162d] to-[#1f1a3f] p-7 md:flex md:items-center md:justify-between">
            <div className="max-w-3xl text-[#dce4fb]">
              <p className="font-medium text-lg text-white">Actively building in Generative AI</p>
              <p className="mt-2 text-[15px] leading-relaxed text-[#a8b4d3]">Studying LLM application development through structured coursework (CampusX) and hands-on implementation with LangChain, OpenRouter, and MCP.</p>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-4 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#081328] transition hover:bg-[#dce8ff] md:mt-0"
            >
              Let&apos;s Build
            </button>
          </div>
        </section>

        <section id="experience" className="py-32">
          <p className="mono text-xs uppercase tracking-[0.25em] text-[#95bfff]">Experience & Education</p>
          <h2 className="section-title mt-3">Builder Mindset, System Thinking, Fast Delivery</h2>
          <div className="mt-11 grid gap-4 lg:grid-cols-2">
            <div className="neon-border rounded-2xl bg-[#0f162f]/70 p-6">
              <div className="mb-4 inline-flex rounded-xl border border-white/15 p-2 text-neonCyan">
                <Briefcase size={18} />
              </div>
              <div className="space-y-4 text-sm text-[#d5dff7]">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="font-semibold text-white">Web Development Intern</h3>
                  <p className="text-neonCyan text-xs mt-1 uppercase tracking-wider mono">inAmigos Foundation · 2026</p>
                  <p className="mt-2 leading-relaxed text-[#a8b4d3]">Developed and improved web pages for the inAmigos platform; identified and reported functional issues across the website to support ongoing development.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="font-semibold text-white">Freelance Full-Stack & AI Developer</h3>
                  <p className="text-neonCyan text-xs mt-1 uppercase tracking-wider mono">Fiverr · Jan 2026 – Present</p>
                  <p className="mt-2 leading-relaxed text-[#a8b4d3]">Running active gigs in full-stack web development (React + Django) and agentic AI automation — building LLM-integrated applications and AI workflow systems for clients.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="font-semibold text-white">Technical Member</h3>
                  <p className="text-neonCyan text-xs mt-1 uppercase tracking-wider mono">Google Developer Groups on Campus, SRM · Mar 2026 – Present</p>
                  <p className="mt-2 leading-relaxed text-[#a8b4d3]">Contribute to developer community initiatives, technical workshops, and open-source projects at the SRM campus chapter.</p>
                </div>
              </div>
            </div>
            <div className="neon-border rounded-2xl bg-[#0f162f]/70 p-6">
              <div className="mb-4 inline-flex rounded-xl border border-white/15 p-2 text-neonCyan">
                <GraduationCap size={18} />
              </div>
              <h3 className="text-xl font-semibold text-white">B.Tech, Computer Science Engineering</h3>
              <p className="mt-2 text-[#d5dff7]">SRM Institute of Science and Technology, Chennai</p>
              <p className="mono mt-2 text-xs uppercase tracking-[0.2em] text-[#96beff]">2025 – Present</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-neonCyan/30 bg-neonCyan/10 px-3 py-1">
                <span className="text-xs font-semibold text-neonCyan">CGPA: 9.9 / 10.0</span>
                <span className="text-xs text-[#a8b4d3]">Year 1 — Semesters 1 & 2</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="neon-border rounded-2xl bg-[#0a1122]/75 p-5">
              <p className="mono text-xs uppercase tracking-[0.22em] text-neonCyan">Terminal Snapshot</p>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4 mono text-xs text-[#8db9ff]">
                <p>$ whoami</p>
                <p className="mt-1 text-[#cddcff]">prince-rai // full-stack-developer // ai-automation</p>
                <p className="mt-3">$ start --project</p>
                <p className="mt-1 text-[#cddcff]">Building robust applications and intelligent workflows...</p>
              </div>
            </div>
            <div className="neon-border rounded-2xl bg-[#0a1122]/75 p-5">
              <p className="mono text-xs uppercase tracking-[0.22em] text-neonCyan">Focus Areas</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Full-Stack Development', 'AI Integrations', 'Workflow Automation', 'API Design', 'System Architecture'].map((focus) => (
                  <span key={focus} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-[#dce6ff]">
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="pb-28 pt-24">
          <div className="neon-border glow-card rounded-[2rem] bg-gradient-to-br from-[#0f1833dd] to-[#090d17dd] p-8 md:p-10">
            <p className="mono text-xs uppercase tracking-[0.25em] text-[#95bfff]">Contact</p>
            <h2 className="section-title mt-3">Let&apos;s Build Something Together</h2>
            <p className="mt-4 max-w-2xl text-[#c9d7f7]">
              Open to internships, freelance builds, and full-time roles where engineering quality and product speed both matter.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <a href="mailto:princer8858@gmail.com" className="neon-border rounded-xl bg-white/5 p-4 text-sm text-[#dce6ff] transition hover:bg-white/10">
                <Mail className="mb-2" size={18} />
                princer8858@gmail.com
              </a>
              <a
                href="https://github.com/prince-rai88"
                target="_blank"
                rel="noreferrer"
                className="neon-border rounded-xl bg-white/5 p-4 text-sm text-[#dce6ff] transition hover:bg-white/10"
              >
                <Github className="mb-2" size={18} />
                github.com/prince-rai88
              </a>
              <a
                href="https://linkedin.com/in/prince-rai-88pr127"
                target="_blank"
                rel="noreferrer"
                className="neon-border rounded-xl bg-white/5 p-4 text-sm text-[#dce6ff] transition hover:bg-white/10"
              >
                <Linkedin className="mb-2" size={18} />
                linkedin.com/in/prince-rai-88pr127
              </a>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
              <input type="hidden" name="access_key" value="6830a5dd-3ebb-4960-b675-97fb42282ab2" />
              <input type="hidden" name="subject" value="New Portfolio Inquiry from princerai.dev" />
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="rounded-xl border border-white/15 bg-[#0b1227] px-4 py-3 text-sm text-white outline-none transition focus:border-neonBlue"
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="rounded-xl border border-white/15 bg-[#0b1227] px-4 py-3 text-sm text-white outline-none transition focus:border-neonBlue"
              />
              <input
                name="project"
                type="text"
                placeholder="Project / Role"
                className="rounded-xl border border-white/15 bg-[#0b1227] px-4 py-3 text-sm text-white outline-none transition focus:border-neonBlue md:col-span-2"
              />
              <textarea
                name="message"
                placeholder="Tell me what you want to build"
                required
                rows={5}
                className="rounded-xl border border-white/15 bg-[#0b1227] px-4 py-3 text-sm text-white outline-none transition focus:border-neonBlue md:col-span-2"
              />
              <div className="flex items-center gap-4 md:col-span-2">
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="rounded-xl bg-gradient-to-r from-neonBlue to-neonViolet px-6 py-3 text-sm font-semibold text-white transition hover:shadow-glowBlue disabled:opacity-60 md:w-fit"
                >
                  {formStatus === 'sending' ? 'Sending...' : formStatus === 'sent' ? '✓ Sent!' : 'Send Inquiry'}
                </button>
                {formStatus === 'sent' && (
                  <span className="text-sm text-neonCyan">Message sent successfully!</span>
                )}
                {formStatus === 'error' && (
                  <span className="text-sm text-red-400">Failed to send. Try emailing directly.</span>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-sm text-white/55">
        <p>Designed and engineered by Prince Rai. Built for real products, real outcomes.</p>
      </footer>

      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] grid place-items-start bg-black/60 p-4 pt-24 backdrop-blur-md"
            onClick={() => setPaletteOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.98, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="mx-auto w-full max-w-xl rounded-2xl border border-white/15 bg-[#0a1022]/95 p-4"
            >
              <p className="mono mb-3 text-xs uppercase tracking-[0.23em] text-[#98c2ff]">Quick Navigate</p>
              <div className="space-y-2">
                {sections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-[#dde6ff] transition hover:border-neonBlue"
                  >
                    {item.label}
                    <Code2 size={14} />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed bottom-6 right-6 hidden rounded-xl border border-white/15 bg-black/50 px-3 py-2 mono text-xs text-white/70 md:block">
        <div className="flex items-center gap-2">
          <Terminal size={14} />
          <span>Press / for command palette</span>
        </div>
      </div>
    </>
  );
}

function CaseStudyCard({ title, content }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d1630] p-5">
      <p className="mono text-xs uppercase tracking-[0.25em] text-[#95bdff]">{title}</p>
      <p className="mt-3 text-sm leading-relaxed text-[#d8e3ff]">{content}</p>
    </div>
  );
}

function CaseStudyModal({ project, deepDive, onClose }) {
  return (
    <motion.div
      key="case-study-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] overflow-y-auto bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="flex min-h-full items-start justify-center p-4 pt-20 pb-20">
        <motion.div
          initial={{ scale: 0.97, y: 16, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.97, y: 8, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl rounded-2xl border border-[#76a4ff44] bg-[#080e1f] p-6 md:p-8"
        >
          {/* Header */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="mono text-xs uppercase tracking-[0.22em] text-neonCyan">Case Study</p>
              <h3 className="mt-1 text-2xl font-semibold text-white">{project.name}</h3>
              <p className="mt-1 text-sm text-[#95bfff]">{project.tag}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
            >
              Close ✕
            </button>
          </div>

          {/* Problem & Approach */}
          <div className="grid gap-4 md:grid-cols-2">
            <CaseStudyCard title="Problem" content={deepDive.problem} />
            <CaseStudyCard title="Approach" content={deepDive.approach} />
          </div>

          {/* Architecture */}
          <div className="mt-6">
            <p className="mono text-xs uppercase tracking-[0.25em] text-[#95bdff]">Architecture</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {deepDive.architecture.map((node, i) => (
                <div key={node} className="flex items-center gap-2">
                  <span className="rounded-lg border border-white/15 bg-[#111d3a] px-3 py-2 text-xs text-[#d3e1ff]">{node}</span>
                  {i < deepDive.architecture.length - 1 && (
                    <span className="mono text-xs text-neonCyan">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Outcome */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#0d1630] p-5">
              <p className="mono text-xs uppercase tracking-[0.25em] text-[#95bdff]">Challenges</p>
              <ul className="mt-3 space-y-2 text-sm text-[#d8e3ff]">
                {deepDive.challenges.map((challenge) => (
                  <li key={challenge} className="rounded-lg border border-white/10 bg-white/5 p-3">
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
            <CaseStudyCard title="Outcome" content={deepDive.outcome} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
