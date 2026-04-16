'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Sparkles,
  Terminal
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type Project = {
  name: string;
  tag: string;
  desc: string;
  live?: string;
  github?: string;
  statusLabel?: string;
  features: string[];
  tech: string[];
  deepDive?: {
    problem: string;
    approach: string;
    architecture: string[];
    challenges: string[];
    outcome: string;
  };
};

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'What I Build' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
];

const projects: Project[] = [
  {
    name: 'FinAI',
    tag: 'AI-Powered Financial Advisor',
    desc: 'A production-focused financial intelligence platform that turns transaction streams into actionable savings plans and behavior insights.',
    live: 'https://ai-financial-advisor-rouge.vercel.app',
    statusLabel: 'Live',
    features: [
      'OpenAI-powered analysis of spending behavior',
      'Personalized savings recommendations and forecast summaries',
      'Secure JWT authentication with protected API boundaries'
    ],
    tech: ['Django', 'React', 'PostgreSQL', 'OpenAI API'],
    deepDive: {
      problem:
        'Most expense trackers visualize data but fail to provide practical, context-aware financial guidance users can act on weekly.',
      approach:
        'Engineered a pipeline that ingests transactions, categorizes spending patterns, and routes contextual prompts through an LLM layer to produce personalized guidance.',
      architecture: [
        'React Insight Dashboard',
        'Django REST API + JWT',
        'PostgreSQL Financial Store',
        'OpenAI Recommendation Engine'
      ],
      challenges: [
        'Maintaining recommendation quality while controlling token costs',
        'Designing secure boundaries for sensitive financial data',
        'Keeping generated advice specific instead of generic'
      ],
      outcome:
        'Shipped a deployable AI advisor that helps users convert raw spending logs into clear savings actions and better monthly planning.'
    }
  },
  {
    name: 'Agentic AI Bots',
    tag: 'Autonomous Workflow Systems',
    desc: 'Built autonomous agents for multi-step task execution, combining planning, decisioning, and tool-driven action chains for real-world applications.',
    statusLabel: 'Coming soon',
    features: [
      'Agent workflows orchestrated via LangChain / LangGraph',
      'Task planning and execution pipelines with memory-aware state transitions',
      'Real-world automation flows for repetitive operational tasks'
    ],
    tech: ['Python', 'OpenAI API', 'LangChain', 'LangGraph'],
    deepDive: {
      problem:
        'Teams lose speed on repetitive but decision-heavy workflows that are too complex for simple scripts and too frequent for manual execution.',
      approach:
        'Designed agent graphs with explicit planning nodes, execution nodes, and validation checkpoints so bots can reason, act, and recover from intermediate failures.',
      architecture: [
        'Workflow Trigger Layer',
        'Planner + Tool Router',
        'LangGraph State Machine',
        'Execution + Review Loop'
      ],
      challenges: [
        'Balancing agent autonomy with guardrails for safe execution',
        'Preventing tool-call drift in long multi-step runs',
        'Designing retry logic without creating infinite loops'
      ],
      outcome:
        'Delivered reliable autonomous pipelines that reduced manual execution time and enabled production-ready, scalable solutions.'
    }
  },
  {
    name: 'Crossword',
    tag: 'Department Management System',
    desc: 'A full-stack academic operations platform that centralizes scheduling, attendance, assignments, and role-driven access across departments.',
    statusLabel: 'Deployment in progress - available soon',
    features: [
      'Timetable + attendance + assignment workflows in one system',
      'RBAC-first backend for Admin, Teacher, and Student roles',
      'Interactive crossword module to improve learner engagement'
    ],
    tech: ['Django REST Framework', 'React', 'PostgreSQL', 'JWT']
  },
  {
    name: 'GeoTracker',
    tag: 'Real-Time Tracking Platform',
    desc: 'A scalable location intelligence system designed to process concurrent updates and deliver low-latency map visibility.',
    github: 'https://github.com/prince-rai88/GeoTracker.git',
    features: [
      'Live map-based tracking with continuous updates',
      'Concurrent event handling for multi-user sessions',
      'Scalable API architecture for high-frequency location writes'
    ],
    tech: ['FastAPI', 'WebSockets', 'Redis', 'PostgreSQL']
  }
];

const skillMap = [
  { category: 'Frontend', items: ['React.js', 'Next.js', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Django', 'Django REST Framework'] },
  {
    category: 'AI / GenAI',
    items: [
      'OpenAI API',
      'LangChain',
      'LangGraph',
      'Retrieval-Augmented Generation (RAG)',
      'Agentic Systems / Autonomous Agents',
      'OpenClaw Bots'
    ]
  },
  { category: 'Databases', items: ['PostgreSQL', 'MongoDB'] },
  { category: 'Tools & Systems', items: ['Git, GitHub', 'Postman', 'Vercel', 'Render'] },
  {
    category: 'Concepts',
    items: ['REST APIs', 'JWT Authentication', 'RBAC', 'Scalable Architecture', 'Real-time Systems']
  }
];

const rotateLines = [
  'I build scalable full-stack products',
  'I design GenAI and RAG integrations',
  'I ship agentic systems that execute'
];

const trustMetrics = [
  'Built and deployed AI applications',
  'Built production-ready systems',
  'Designed scalable solutions for real-world applications'
];

const stagger = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
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
  const [expandedProject, setExpandedProject] = useState('FinAI');
  const [loading, setLoading] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);

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
    const onKey = (event: KeyboardEvent) => {
      if (event.key === '/' && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
      if (event.key === 'Escape') setPaletteOpen(false);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const activeProject = useMemo(
    () => projects.find((project) => project.name === expandedProject) ?? projects[0],
    [expandedProject]
  );

  const activeDeepDive = activeProject.deepDive;
  const caseStudyId = `${activeProject.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-case-study`;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setPaletteOpen(false);
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
                className={`rounded-full px-3 py-2 text-sm transition ${
                  activeSection === item.id
                    ? 'bg-white/12 text-white shadow-glowBlue'
                    : 'text-white/65 hover:bg-white/6 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => setPaletteOpen(true)}
            className="mono rounded-full border border-white/20 px-4 py-2 text-xs text-white/70 transition hover:border-neonBlue hover:text-white"
          >
            Press / to navigate
          </button>
        </div>
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
              <Sparkles size={14} /> Full Stack Engineer | AI & Agentic Systems
            </span>
            <h1 className="mt-9 text-5xl font-semibold leading-[0.9] tracking-[-0.04em] text-white md:text-8xl">Prince Rai</h1>
            <p className="mt-5 max-w-4xl text-xl text-[#d8e2ff] md:text-2xl">
              I build full-stack applications and intelligent AI systems, including agentic workflows that solve real-world problems.
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
                href="#"
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
                    className={`glow-card neon-border relative w-[20rem] rounded-2xl p-6 text-left transition md:w-[23rem] ${
                      selected ? 'bg-[#10142b]/92 shadow-glowBlue' : 'bg-[#090d1a]/74'
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
                  {!activeProject.live && activeProject.github && (
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
                      onClick={() =>
                        document.getElementById(caseStudyId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                      className="rounded-xl bg-gradient-to-r from-neonBlue to-neonViolet px-4 py-2 text-sm font-medium text-white"
                    >
                      View Case Study
                    </button>
                  )}
                </div>
              </div>
              {activeProject.statusLabel && !activeProject.live && (
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

              {activeDeepDive && (
                <div id={caseStudyId} className="mt-12 rounded-2xl border border-[#76a4ff44] bg-[#0f162f]/80 p-6 md:p-7">
                  <h4 className="section-title text-[2rem]">{activeProject.name} Case Study</h4>
                  <div className="mt-8 grid gap-4 lg:grid-cols-2">
                    <CaseStudyCard title="Problem" content={activeDeepDive.problem} />
                    <CaseStudyCard title="Approach" content={activeDeepDive.approach} />
                  </div>

                  <div className="mt-8">
                    <p className="mono text-xs uppercase tracking-[0.25em] text-[#95bdff]">Architecture</p>
                    <div className="mt-4 grid gap-3 md:grid-cols-4">
                      {activeDeepDive.architecture.map((node, i) => (
                        <div key={node} className="rounded-xl border border-white/15 bg-[#111d3a] px-4 py-4 text-sm">
                          <p>{node}</p>
                          {i < activeDeepDive.architecture.length - 1 && (
                            <p className="mt-3 mono text-xs text-neonCyan">{`-->`}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-[#0d1630] p-5">
                      <p className="mono text-xs uppercase tracking-[0.25em] text-[#95bdff]">Challenges</p>
                      <ul className="mt-3 space-y-2 text-sm text-[#d8e3ff]">
                        {activeDeepDive.challenges.map((challenge) => (
                          <li key={challenge} className="rounded-lg border border-white/10 bg-white/5 p-3">
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <CaseStudyCard title="Outcome" content={activeDeepDive.outcome} />
                  </div>
                </div>
              )}
            </motion.article>
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

        <section id="services" className="py-32">
          <p className="mono text-xs uppercase tracking-[0.25em] text-[#95bfff]">What I Build</p>
          <h2 className="section-title mt-3">Built to Convert Ideas Into Operating Systems</h2>

          <div className="mt-11 grid gap-4 md:grid-cols-2">
            {[
              'Scalable full-stack applications',
              'AI-powered features and integrations',
              'Agentic workflows and automation systems',
              'Backend architectures and APIs'
            ].map((item, index) => (
              <motion.div
                key={item}
                custom={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
                className="neon-border rounded-2xl bg-[#0f172fa9] p-6"
              >
                <div className="mb-4 inline-flex rounded-lg border border-neonBlue/40 bg-neonBlue/10 p-2 text-neonCyan">
                  <Layers size={18} />
                </div>
                <p className="text-lg text-[#dbe5ff]">{item}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 neon-border rounded-2xl bg-gradient-to-r from-[#102142] via-[#11162d] to-[#1f1a3f] p-7 md:flex md:items-center md:justify-between">
            <p className="max-w-2xl text-[#dce4fb]">
              I partner with teams that want strong execution, clear architecture decisions, and reliable shipping velocity.
            </p>
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
              <ul className="space-y-3 text-sm text-[#d5dff7]">
                <li className="rounded-lg border border-white/10 bg-white/5 p-3">Built production-ready systems for real-world applications</li>
                <li className="rounded-lg border border-white/10 bg-white/5 p-3">Built and deployed an AI product in first year</li>
                <li className="rounded-lg border border-white/10 bg-white/5 p-3">Consistent focus on shipping production-ready systems</li>
              </ul>
            </div>
            <div className="neon-border rounded-2xl bg-[#0f162f]/70 p-6">
              <div className="mb-4 inline-flex rounded-xl border border-white/15 p-2 text-neonCyan">
                <GraduationCap size={18} />
              </div>
              <h3 className="text-xl font-semibold text-white">B.Tech CSE</h3>
              <p className="mt-2 text-[#d5dff7]">SRM Institute of Science and Technology, Chennai</p>
              <p className="mono mt-2 text-xs uppercase tracking-[0.2em] text-[#96beff]">2025 - Present</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="neon-border rounded-2xl bg-[#0a1122]/75 p-5">
              <p className="mono text-xs uppercase tracking-[0.22em] text-neonCyan">Terminal Snapshot</p>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4 mono text-xs text-[#8db9ff]">
                <p>$ whoami</p>
                <p className="mt-1 text-[#cddcff]">prince-rai // full-stack-engineer // ai-agentic-systems</p>
                <p className="mt-3">$ ship --mode production</p>
                <p className="mt-1 text-[#cddcff]">Deploying scalable products and intelligent workflows...</p>
              </div>
            </div>
            <div className="neon-border rounded-2xl bg-[#0a1122]/75 p-5">
              <p className="mono text-xs uppercase tracking-[0.22em] text-neonCyan">Focus Areas</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Full-Stack Systems', 'AI Integrations', 'Agentic Workflows', 'API Security', 'Scalable Architectures'].map((focus) => (
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

            <form className="mt-8 grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name"
                className="rounded-xl border border-white/15 bg-[#0b1227] px-4 py-3 text-sm text-white outline-none transition focus:border-neonBlue"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="rounded-xl border border-white/15 bg-[#0b1227] px-4 py-3 text-sm text-white outline-none transition focus:border-neonBlue"
              />
              <input
                type="text"
                placeholder="Project / Role"
                className="rounded-xl border border-white/15 bg-[#0b1227] px-4 py-3 text-sm text-white outline-none transition focus:border-neonBlue md:col-span-2"
              />
              <textarea
                placeholder="Tell me what you want to build"
                rows={5}
                className="rounded-xl border border-white/15 bg-[#0b1227] px-4 py-3 text-sm text-white outline-none transition focus:border-neonBlue md:col-span-2"
              />
              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-neonBlue to-neonViolet px-6 py-3 text-sm font-semibold text-white transition hover:shadow-glowBlue md:w-fit"
              >
                Send Inquiry
              </button>
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

function CaseStudyCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d1630] p-5">
      <p className="mono text-xs uppercase tracking-[0.25em] text-[#95bdff]">{title}</p>
      <p className="mt-3 text-sm leading-relaxed text-[#d8e3ff]">{content}</p>
    </div>
  );
}
