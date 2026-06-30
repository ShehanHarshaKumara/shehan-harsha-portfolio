import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Pause,
  Play,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';

const experiences = [
  {
    period: 'Dec 2025 — Apr 2026',
    shortPeriod: '2025 — 2026',
    role: 'Full-Stack Developer',
    type: 'Permanent',
    company: 'CodeXpress IT Solutions (Pvt) Ltd.',
    summary: 'Built, secured, optimized, and deployed production-ready full-stack web applications for real business environments.',
    points: [
      'Developed Laravel applications with RESTful API architecture.',
      'Designed and optimized high-performance MySQL database schemas.',
      'Implemented secure authentication and Role-Based Access Control.',
      'Integrated third-party payment gateways into production systems.',
      'Deployed applications to VPS servers using Nginx and SSL.',
      'Collaborated across teams to deliver projects on schedule.',
    ],
    tech: ['Laravel', 'PHP', 'REST API', 'MySQL', 'RBAC', 'Nginx', 'VPS'],
    icon: Server,
    color: '#22d3ee',
    number: '03',
    signal: 'Production Engineering',
  },
  {
    period: 'Sep 2025 — Dec 2025',
    shortPeriod: 'Sep — Dec 2025',
    role: 'Web Developer Intern',
    type: 'Internship',
    company: 'CodeXpress IT Solutions (Pvt) Ltd.',
    summary: 'Converted academic knowledge into client-facing software and earned a permanent role through strong technical performance.',
    points: [
      'Contributed to PHP and Laravel backend development.',
      'Supported frontend integration for client-facing projects.',
      'Assisted with REST API design and database management.',
      'Completed the three-month internship and earned promotion.',
    ],
    tech: ['PHP', 'Laravel', 'Frontend', 'API Design', 'MySQL'],
    icon: Code2,
    color: '#818cf8',
    number: '02',
    signal: 'Software Foundation',
  },
  {
    period: '2022',
    shortPeriod: '2022',
    role: 'Computer Hardware Technician',
    type: 'Technical Role',
    company: 'Sarasi Computer House (Pvt) Ltd.',
    summary: 'Built a practical technology foundation through diagnostics, repair, CCTV installation, sales support, and customer service.',
    points: [
      'Diagnosed and resolved computer hardware and software issues.',
      'Installed and maintained CCTV systems.',
      'Supported computer hardware product sales.',
      'Provided customer-facing technical assistance.',
    ],
    tech: ['Hardware Repair', 'Diagnostics', 'CCTV', 'IT Support'],
    icon: Wrench,
    color: '#34d399',
    number: '01',
    signal: 'Technical Foundation',
  },
];

const metrics = [
  { value: '03', label: 'Professional roles', icon: BriefcaseBusiness, color: '#22d3ee' },
  { value: '02', label: 'Industry employers', icon: BuildingIcon, color: '#818cf8' },
  { value: '2022', label: 'Career started', icon: Rocket, color: '#34d399' },
];

function BuildingIcon({ className }: { className?: string }) {
  return <Database className={className} />;
}

function RobotScanner() {
  return (
    <div className="exp-robot-shell" aria-hidden="true">
      <div className="exp-model-viewport">
        <div className="exp-eva">
          <div className="exp-eva-head">
            <div className="exp-eye-chamber">
              <div className="exp-eye" />
              <div className="exp-eye" />
            </div>
          </div>
          <div className="exp-eva-body">
            <div className="exp-hand" />
            <div className="exp-hand" />
            <div className="exp-scanner-beam" />
            <div className="exp-scanner-origin" />
          </div>
        </div>
      </div>
      <div className="exp-robot-status">
        <span className="exp-status-dot" />
        Career scan active
      </div>
    </div>
  );
}

export function Experience() {
  const [selected, setSelected] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const experience = experiences[selected];

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setSelected((current) => (current + 1) % experiences.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused, selected]);

  const showPrevious = () => setSelected((current) => (current - 1 + experiences.length) % experiences.length);
  const showNext = () => setSelected((current) => (current + 1) % experiences.length);

  return (
    <section id="experience" className="relative isolate overflow-hidden bg-[#02050b] px-4 py-24 text-white sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,.08),transparent_25%),radial-gradient(circle_at_88%_75%,rgba(129,140,248,.08),transparent_28%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 grid items-center gap-10 lg:grid-cols-[280px_1fr]"
        >
          <div className="flex justify-center lg:justify-start">
            <RobotScanner />
          </div>

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" /> Career intelligence
            </div>
            <h2 className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[6.5rem]">
              Work
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">Experience.</span>
            </h2>
            <p className="mt-7 max-w-xl border-l border-cyan-400/30 pl-5 text-sm leading-7 text-slate-400">
              A career path moving from hands-on technical support to production full-stack engineering.
            </p>
          </div>
        </motion.header>

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ color: metric.color, background: `${metric.color}12`, border: `1px solid ${metric.color}25` }}>
                <metric.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-2xl font-black leading-none">{metric.value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">{metric.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div
          className="relative mb-6 grid gap-3 lg:grid-cols-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-emerald-400/30 via-violet-400/35 to-cyan-400/30 lg:block" />
          {[...experiences].reverse().map((item) => {
            const index = experiences.indexOf(item);
            const active = selected === index;
            return (
              <button
                key={item.role}
                type="button"
                onClick={() => setSelected(index)}
                aria-pressed={active}
                className="group relative z-10 flex items-center gap-4 rounded-2xl border p-4 text-left transition-all lg:flex-col lg:items-center lg:bg-transparent lg:text-center"
                style={{ borderColor: active ? `${item.color}40` : 'rgba(255,255,255,.06)', background: active ? `${item.color}0d` : 'rgba(255,255,255,.02)' }}
              >
                <span
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-all duration-300 group-hover:scale-105"
                  style={{ color: item.color, background: active ? `${item.color}20` : '#07101a', border: `1px solid ${active ? `${item.color}60` : `${item.color}25`}`, boxShadow: active ? `0 0 34px ${item.color}20` : 'none' }}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-black text-white">{item.role}</span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">{item.shortPeriod}</span>
                </span>
                {active && <motion.span layoutId="career-dot" className="absolute -bottom-1.5 h-1.5 w-10 rounded-full" style={{ background: item.color }} />}
              </button>
            );
          })}
        </div>

        <div
          className="relative min-h-[590px] overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#070c15]/90 shadow-[0_35px_100px_rgba(0,0,0,.45)] backdrop-blur-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={experience.role}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="grid min-h-[590px] lg:grid-cols-12"
            >
              <div className="relative overflow-hidden border-b border-white/[0.07] p-7 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-12">
                <span className="absolute -right-5 -top-12 text-[13rem] font-black leading-none text-white/[0.025]">{experience.number}</span>
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: experience.color, borderColor: `${experience.color}30`, background: `${experience.color}0d` }}>
                      <BadgeCheck className="h-3.5 w-3.5" /> {experience.type}
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600"><CalendarDays className="h-3.5 w-3.5" /> {experience.period}</span>
                  </div>

                  <div className="my-auto py-12">
                    <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl" style={{ color: experience.color, background: `${experience.color}14`, border: `1px solid ${experience.color}30` }}>
                      <experience.icon className="h-7 w-7" />
                    </div>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: experience.color }}>{experience.signal}</p>
                    <h3 className="text-4xl font-black leading-[1] tracking-[-0.045em] sm:text-5xl">{experience.role}</h3>
                    <p className="mt-5 text-sm font-semibold leading-6 text-slate-300">{experience.company}</p>
                    <p className="mt-6 text-sm leading-7 text-slate-500">{experience.summary}</p>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
                    <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative h-2 w-2 rounded-full bg-emerald-400" /></span>
                    Verified from CV
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-7 pb-24 sm:p-10 sm:pb-24 lg:col-span-7 lg:p-12 lg:pb-24">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-600">Selected impact</p>
                    <h4 className="mt-2 text-xl font-black">Responsibilities &amp; outcomes</h4>
                  </div>
                  <ShieldCheck className="hidden h-7 w-7 text-slate-700 sm:block" />
                </div>

                <div className="grid flex-1 gap-3 sm:grid-cols-2">
                  {experience.points.map((point, index) => (
                    <motion.div
                      key={point}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.055 }}
                      className="group flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition-colors hover:border-white/[0.13] hover:bg-white/[0.045]"
                    >
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg" style={{ color: experience.color, background: `${experience.color}12` }}><Check className="h-3.5 w-3.5" /></span>
                      <p className="text-sm leading-6 text-slate-400 group-hover:text-slate-300">{point}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/[0.07] pt-6">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">Technology stack</p>
                  <div className="flex flex-wrap gap-2">
                    {experience.tech.map((technology) => (
                      <span key={technology} className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1.5 text-[11px] font-semibold text-slate-400">{technology}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            key={`glow-${selected}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-none absolute -left-36 -top-36 h-96 w-96 rounded-full blur-[130px]"
            style={{ background: `${experience.color}18` }}
          />

          <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 sm:bottom-7 sm:right-7">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous experience"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/40 text-slate-400 backdrop-blur-md transition-all hover:border-white/20 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsPaused((paused) => !paused)}
              aria-label={isPaused ? 'Play experience slider' : 'Pause experience slider'}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/40 text-slate-400 backdrop-blur-md transition-all hover:border-white/20 hover:text-white"
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next experience"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/40 text-slate-400 backdrop-blur-md transition-all hover:border-white/20 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          {experiences.map((item, index) => (
            <button
              key={item.role}
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`Show ${item.role}`}
              className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]"
            >
              {selected === index && (
                <motion.span
                  key={selected}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em] text-slate-700">
          <span className="flex items-center gap-2"><Cpu className="h-3.5 w-3.5" /> {isPaused ? 'Auto slide paused' : 'Auto slide · 5 seconds'}</span>
          <span className="flex items-center gap-2">View role details <ArrowUpRight className="h-3.5 w-3.5" /></span>
        </div>
      </div>

      <style>{`
        .exp-robot-shell {
          position: relative;
          width: min(15rem, calc(100vw - 2rem));
          filter: drop-shadow(0 24px 45px rgba(34, 211, 238, .12));
        }
        .exp-model-viewport {
          perspective: 1000px;
          width: 100%;
          aspect-ratio: 1;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at 50% 40%, #07192a, #000 68%);
          border: 1px solid rgba(34, 211, 238, .18);
          box-shadow: inset 0 0 50px rgba(34, 211, 238, .08), 0 0 0 8px rgba(255,255,255,.015);
          overflow: hidden;
        }
        .exp-eva {
          --eva-duration: 4s;
          transform-style: preserve-3d;
          animation: expRotateRight var(--eva-duration) linear infinite alternate;
        }
        .exp-eva-head {
          position: relative;
          width: 4.5rem;
          height: 3rem;
          border-radius: 48% 53% 45% 55% / 79% 79% 20% 22%;
          background: linear-gradient(to right, #fff 45%, #7b8794);
        }
        .exp-eye-chamber {
          width: 3.4rem;
          height: 2.05rem;
          position: relative;
          left: 50%;
          top: 55%;
          border-radius: 45% 53% 45% 48% / 62% 59% 35% 34%;
          background-color: #0c203c;
          box-shadow: 0 0 2px 2px #fff, inset 0 0 0 2px #000;
          transform: translate(-50%, -50%);
          animation: expMoveRight var(--eva-duration) linear infinite alternate;
        }
        .exp-eye {
          width: .9rem;
          height: 1.1rem;
          position: absolute;
          top: 50%;
          border-radius: 50%;
        }
        .exp-eye:first-child {
          left: 9px;
          background: repeating-linear-gradient(65deg, #9bdaeb 0, #9bdaeb 1px, #fff 2px);
          box-shadow: inset 0 0 5px #04b8d5, 0 0 15px 1px #0bdaeb;
          transform: translateY(-50%) rotate(-65deg);
        }
        .exp-eye:nth-child(2) {
          right: 9px;
          background: repeating-linear-gradient(-65deg, #9bdaeb 0, #9bdaeb 1px, #fff 2px);
          box-shadow: inset 0 0 5px #04b8d5, 0 0 15px 1px #0bdaeb;
          transform: translateY(-50%) rotate(65deg);
        }
        .exp-eva-body {
          width: 4.5rem;
          height: 6rem;
          position: relative;
          margin-block-start: .2rem;
          border-radius: 47% 53% 45% 55% / 12% 9% 90% 88%;
          background: linear-gradient(to right, #fff 35%, #7b8794);
        }
        .exp-hand {
          position: absolute;
          left: -1.15rem;
          top: .55rem;
          width: 1.5rem;
          height: 4.15rem;
          border-radius: 40%;
          background: linear-gradient(to left, #fff 15%, #7b8794);
          box-shadow: 5px 0 5px rgba(0,0,0,.25);
          transform: rotateY(55deg) rotateZ(10deg);
          animation: expCompensate var(--eva-duration) linear infinite alternate;
        }
        .exp-hand:nth-child(2) {
          left: 92%;
          background: linear-gradient(to right, #fff 15%, #7b8794);
          transform: rotateY(55deg) rotateZ(-10deg);
          animation-name: expCompensateRight;
        }
        .exp-scanner-beam {
          width: 0;
          height: 0;
          position: absolute;
          left: 60%;
          top: 10%;
          border-top: 135px solid rgba(155, 218, 235, .9);
          border-left: 188px solid transparent;
          border-right: 188px solid transparent;
          transform-origin: top left;
          mask: linear-gradient(to right, #fff, transparent 35%);
          animation: expGlow 2s cubic-bezier(.86,0,.07,1) infinite;
        }
        .exp-scanner-origin {
          position: absolute;
          width: 6px;
          aspect-ratio: 1;
          border-radius: 50%;
          left: 60%;
          top: 10%;
          background: #9bdaeb;
          box-shadow: 0 0 12px #0bdaeb, inset 0 0 4px rgba(0,0,0,.5);
          animation: expMoveRight var(--eva-duration) linear infinite;
        }
        .exp-robot-status {
          position: absolute;
          left: 50%;
          bottom: .7rem;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: .45rem;
          white-space: nowrap;
          border: 1px solid rgba(34,211,238,.22);
          border-radius: 999px;
          padding: .35rem .7rem;
          background: rgba(2,8,18,.75);
          backdrop-filter: blur(12px);
          color: #67e8f9;
          font-size: .55rem;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
        }
        .exp-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 9px #34d399;
          animation: expPulse 1.5s ease-in-out infinite;
        }
        @keyframes expRotateRight { from { transform: rotateY(0); } to { transform: rotateY(25deg); } }
        @keyframes expMoveRight { from { transform: translate(-50%,-50%); } to { transform: translate(-40%,-50%); } }
        @keyframes expCompensate { from { transform: rotateY(55deg) rotateZ(10deg); } to { transform: rotateY(30deg) rotateZ(10deg); } }
        @keyframes expCompensateRight { from { transform: rotateY(55deg) rotateZ(-10deg); } to { transform: rotateY(70deg) rotateZ(-10deg); } }
        @keyframes expGlow { 0% { opacity:0; } 20% { opacity:.8; } 45% { transform:rotate(-25deg); } 75% { transform:rotate(5deg); } 100% { opacity:0; } }
        @keyframes expPulse { 0%,100% { opacity:.4; transform:scale(.8); } 50% { opacity:1; transform:scale(1.2); } }
        @media (max-width: 1023px) {
          .exp-robot-shell { width: 12rem; }
        }
        @media (max-width: 639px) {
          .exp-robot-shell { width: min(12rem, calc(100vw - 3rem)); }
          .exp-robot-status {
            bottom: .45rem;
            gap: .35rem;
            padding: .3rem .55rem;
            font-size: .48rem;
            letter-spacing: .1em;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .exp-eva, .exp-eye-chamber, .exp-hand, .exp-scanner-beam, .exp-scanner-origin, .exp-status-dot { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
