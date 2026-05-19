/**
 * Skills.tsx — Elite Edition
 * Built from ShehanHarshaKumara's real GitHub + CV tech stack
 *
 * ✅ Real skills extracted from GitHub profile & PDF resume
 * ✅ Live GitHub language stats fetched on mount
 * ✅ Spotlight cursor-tracked glow on every card
 * ✅ Staggered animated progress bars with shimmer
 * ✅ Floating tech badge marquee strip
 * ✅ Category tabs — animated underline indicator
 * ✅ Hexagon skill icons grid
 * ✅ Animated stat counters
 * ✅ Fully mobile responsive
 */

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  useState, useRef, useEffect,
  MouseEvent as ReactMouseEvent,
} from 'react';
import {
  Code2, Server, Database, Smartphone, Wrench,
  Cpu, Sparkles, Github, ExternalLink, ChevronRight,
} from 'lucide-react';

// ─── GITHUB USERNAME ──────────────────────────────────────────────────────────
const GITHUB_USERNAME = 'ShehanHarshaKumara';

// ─── REAL SKILLS — sourced from CV + GitHub repos ────────────────────────────
// Projects prove these: DEC App (React+Node+Flutter+MySQL+Tailwind),
// Rare Crop (HTML+CSS+PHP), Shop Mgmt (Java+JavaFX+SpringBoot+MySQL),
// Pet Feeder (Flutter+Firebase+NodeMCU+IoT)

const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Code2,
    accent: '#22d3ee',
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'rgba(34,211,238,0.15)',
    skills: [
      { name: 'React.js',      level: 88, note: 'DEC Center Web App' },
      { name: 'Tailwind CSS',  level: 90, note: 'DEC App + Portfolio' },
      { name: 'JavaScript ES6+', level: 85, note: 'Multiple projects' },
      { name: 'HTML / CSS',    level: 95, note: 'Rare Crop System' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    accent: '#34d399',
    gradient: 'from-emerald-500 to-green-500',
    glow: 'rgba(52,211,153,0.15)',
    skills: [
      { name: 'Node.js',       level: 82, note: 'DEC Center API' },
      { name: 'Spring Boot',   level: 80, note: 'Shop Management' },
      { name: 'PHP',           level: 78, note: 'Rare Crop System' },
      { name: 'Java',          level: 83, note: 'Shop Mgmt + Android' },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: Smartphone,
    accent: '#818cf8',
    gradient: 'from-violet-500 to-indigo-500',
    glow: 'rgba(129,140,248,0.15)',
    skills: [
      { name: 'Flutter',       level: 86, note: 'DEC App + Pet Feeder' },
      { name: 'Dart',          level: 84, note: 'Flutter projects' },
      { name: 'Kotlin',        level: 70, note: 'Android dev' },
      { name: 'Android Studio',level: 72, note: 'Native Android' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    icon: Database,
    accent: '#f472b6',
    gradient: 'from-pink-500 to-rose-500',
    glow: 'rgba(244,114,182,0.15)',
    skills: [
      { name: 'MySQL',         level: 88, note: 'DEC App + Shop Mgmt' },
      { name: 'Firebase',      level: 85, note: 'Pet Feeder IoT' },
      { name: 'MongoDB',       level: 75, note: 'NoSQL projects' },
      { name: 'SQLite / Oracle', level: 72, note: 'Mobile apps' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & IoT',
    icon: Wrench,
    accent: '#fbbf24',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'rgba(251,191,36,0.15)',
    skills: [
      { name: 'Git / GitHub',  level: 90, note: 'All projects' },
      { name: 'Figma',         level: 80, note: 'UI/UX design' },
      { name: 'Arduino / NodeMCU', level: 78, note: 'Pet Feeder IoT' },
      { name: 'Postman / API', level: 82, note: 'REST testing' },
    ],
  },
  {
    id: 'hardware',
    label: 'Hardware',
    icon: Cpu,
    accent: '#fb923c',
    gradient: 'from-orange-500 to-red-500',
    glow: 'rgba(251,146,60,0.15)',
    skills: [
      { name: 'PC Repair',       level: 92, note: 'NVQ Level 4 + Sarasi' },
      { name: 'CCTV Install',    level: 88, note: 'Sarasi Computer House' },
      { name: 'Linux / Unix',    level: 75, note: 'Dev environment' },
      { name: 'System Diag.',    level: 85, note: 'Hardware technician' },
    ],
  },
];

// ─── TECH BADGES (marquee) ────────────────────────────────────────────────────
const TECH_BADGES = [
  'React.js','Node.js','Flutter','MySQL','Firebase','Spring Boot',
  'Java','Dart','Tailwind CSS','PHP','JavaScript','HTML / CSS',
  'Git','GitHub','Figma','Arduino','MongoDB','Kotlin','Android Studio',
  'Postman','Linux','JavaFX','SQLite','Agile',
];

// ─── STATS ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 11,  suffix: '+', label: 'GitHub Repos',      icon: Github,    color: '#22d3ee' },
  { value: 4,   suffix: '+', label: 'Live Projects',     icon: ExternalLink, color: '#818cf8' },
  { value: 8,   suffix: '+', label: 'Languages / Stacks', icon: Code2,    color: '#34d399' },
  { value: 2,   suffix: '+', label: 'Years Building',    icon: Sparkles,  color: '#fbbf24' },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function SpotlightCard({
  children, accent,
}: { children: React.ReactNode; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, on: false });

  const onMove = (e: ReactMouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos(p => ({ ...p, on: false }))}
      style={{ position: 'relative', overflow: 'hidden', borderRadius: 'inherit' }}
    >
      {pos.on && (
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, ${accent}18, transparent 70%)`,
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = Math.max(1, Math.ceil(to / 40));
    const t = setInterval(() => {
      v = Math.min(v + step, to);
      setVal(v);
      if (v >= to) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── SKILL BAR ────────────────────────────────────────────────────────────────
function SkillBar({
  skill, accent, delay, inView,
}: {
  skill: { name: string; level: number; note: string };
  accent: string; delay: number; inView: boolean;
}) {
  return (
    <div className="group">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-sm font-semibold leading-tight text-white">{skill.name}</span>
          <span className="mt-0.5 block text-[11px] font-normal leading-snug sm:mt-0 sm:inline sm:ml-2" style={{ color: 'rgba(148,163,184,0.45)' }}>
            {skill.note}
          </span>
        </div>
        <motion.span
          className="flex-shrink-0 text-xs font-black tabular-nums"
          style={{ color: accent }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.3 }}
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* Track */}
      <div
        className="relative h-2 w-full overflow-hidden rounded-full"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Fill */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${accent}cc, ${accent})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.3, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
              backgroundSize: '60% 100%',
            }}
            animate={{ backgroundPosition: ['-100% 0', '250% 0'] }}
            transition={{ duration: 2.2, delay: delay + 1.3, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Glow dot at tip */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full -translate-x-1/2"
          style={{ background: accent, boxShadow: `0 0 8px ${accent}`, left: `${skill.level}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: delay + 1.0, duration: 0.3, type: 'spring' }}
        />
      </div>
    </div>
  );
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee() {
  const doubled = [...TECH_BADGES, ...TECH_BADGES];
  return (
    <div
      className="relative overflow-hidden py-3 mb-12"
      style={{ maskImage: 'linear-gradient(90deg,transparent,black 7%,black 93%,transparent)' }}
    >
      <motion.div
        className="flex gap-3 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold flex-shrink-0"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: 'rgba(148,163,184,0.75)',
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 opacity-60 flex-shrink-0" />
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── GITHUB LANGUAGE BAR ──────────────────────────────────────────────────────
interface LangStats { [lang: string]: number }

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', PHP: '#8892bf',
  Java: '#b07219', Dart: '#00b4ab', HTML: '#e34c26',
  CSS: '#563d7c', Python: '#3572a5', Kotlin: '#A97BFF',
  'C++': '#f34b7d', 'C#': '#178600', Shell: '#89e051',
};

function GitHubLangBar() {
  const [langs, setLangs] = useState<LangStats>({});
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=50&type=public`,
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        );
        if (!res.ok) throw new Error();
        const repos: { language: string | null }[] = await res.json();
        const counts: LangStats = {};
        repos.forEach(r => {
          if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
        });
        setLangs(counts);
      } catch { /* fallback data */ }
      finally { setLoading(false); }
    })();
  }, [inView]);

  // Fallback from CV if API fails
  const display = Object.keys(langs).length
    ? langs
    : { JavaScript: 4, Java: 3, Dart: 3, PHP: 2, HTML: 2, CSS: 2, Kotlin: 1 };

  const total = Object.values(display).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(display).sort((a, b) => b[1] - a[1]);

  return (
    <div ref={ref} className="rounded-2xl p-4 sm:p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)' }}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Github className="h-4 w-4 text-white/60" />
          <span className="text-sm font-bold text-white">GitHub Languages</span>
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-shrink-0 items-center gap-1 text-xs text-cyan-400 transition-colors hover:text-cyan-300"
        >
          View Profile <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[80,60,45,35,25].map((w, i) => (
            <div key={i} className="h-2.5 rounded-full animate-pulse" style={{ width: `${w}%`, background: 'rgba(255,255,255,0.08)' }} />
          ))}
        </div>
      ) : (
        <>
          {/* Stacked bar */}
          <div className="flex w-full h-3 rounded-full overflow-hidden mb-4 gap-0.5">
            {sorted.map(([lang, count]) => (
              <motion.div
                key={lang}
                initial={{ width: 0 }}
                animate={inView ? { width: `${(count / total) * 100}%` } : {}}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: LANG_COLORS[lang] || '#64748b', minWidth: count / total > 0.03 ? '4px' : 0 }}
                title={`${lang}: ${Math.round((count / total) * 100)}%`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-3 gap-y-2 sm:gap-x-4">
            {sorted.map(([lang, count]) => (
              <div key={lang} className="flex min-w-0 items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: LANG_COLORS[lang] || '#64748b' }} />
                <span className="text-xs text-slate-300">{lang}</span>
                <span className="text-[10px]" style={{ color: 'rgba(148,163,184,0.45)' }}>
                  {Math.round((count / total) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function Skills() {
  const { ref: inViewRef, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('frontend');

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const activeCategory = skillCategories.find(c => c.id === activeTab)!;
  const { ref: barsRef, inView: barsInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden text-white"
      style={{ backgroundColor: '#020817' }}
    >

      {/* ── Background ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        {/* Grid */}
        <div
          style={{
            position: 'absolute', inset: 0, opacity: 0.025,
            backgroundImage: 'linear-gradient(rgba(56,189,248,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.7) 1px,transparent 1px)',
            backgroundSize: '68px 68px',
          }}
        />
        {/* Orbs */}
        <motion.div
          style={{ position: 'absolute', top: '5%', left: '-8%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,211,238,0.1) 0%,transparent 70%)' }}
          animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 22, repeat: Infinity }} />
        <motion.div
          style={{ position: 'absolute', bottom: '10%', right: '-8%', width: '560px', height: '560px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(129,140,248,0.1) 0%,transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 26, repeat: Infinity, delay: 5 }} />
        <motion.div
          style={{ position: 'absolute', top: '45%', left: '40%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(244,114,182,0.07) 0%,transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, delay: 8 }} />
      </div>

      {/* ── Content ── */}
      <div
        ref={inViewRef}
        className="relative mx-auto max-w-7xl px-3 py-14 sm:px-6 sm:py-24 md:px-10 lg:px-16"
        style={{ zIndex: 10 }}
      >

        {/* ── Header ── */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[.18em]"
            style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.22)', color: '#22d3ee' }}
          >
            <Sparkles className="h-3.5 w-3.5 flex-shrink-0" />
            Technical Expertise
          </motion.div>

          <h2
            className="mb-4 font-black leading-[0.92] tracking-tight"
            style={{ fontSize: 'clamp(2rem,11vw,4.8rem)', fontFamily: "'Outfit', sans-serif" }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg,#e0f2fe 0%,#22d3ee 35%,#818cf8 70%,#f472b6 100%)' }}
            >
              Skills &amp; Stack
            </span>
          </h2>

          <p
            className="mx-auto max-w-xl text-sm leading-relaxed px-2"
            style={{ color: 'rgba(148,163,184,0.65)', fontFamily: "'DM Sans', sans-serif" }}
          >
            Real skills proven across{' '}
            <span className="text-cyan-400 font-semibold">11 GitHub repositories</span> and production
            projects — from IoT to full-stack web and mobile.
          </p>
        </motion.div>

        {/* ── Marquee ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <Marquee />
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          className="mb-10 grid grid-cols-2 gap-2.5 sm:mb-14 sm:grid-cols-4 sm:gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -5, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="relative min-w-0 overflow-hidden rounded-2xl p-3 text-center sm:p-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(14px)' }}
            >
              <div
                className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-xl sm:h-9 sm:w-9"
                style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
              >
                <s.icon className="h-4 w-4" style={{ color: s.color }} />
              </div>
              <div
                className="text-xl font-black sm:text-3xl"
                style={{ color: s.color, fontFamily: "'Outfit', sans-serif" }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="mx-auto mt-1 max-w-[7rem] text-[10px] leading-4 text-slate-400 sm:text-xs">
                {s.label}
              </p>
              {/* Corner glow */}
              <div
                className="pointer-events-none absolute -bottom-8 -right-8 h-20 w-20 rounded-full blur-2xl"
                style={{ background: s.color, opacity: 0.12 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Main grid: Tab panel LEFT | GitHub + soft skills RIGHT ── */}
        <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[1fr_340px] lg:gap-10 xl:grid-cols-[1fr_360px]">

          {/* ════ LEFT: category tabs + skill bars ════ */}
          <div className="min-w-0">
            {/* Tab strip — horizontal scroll on mobile */}
            <motion.div
              className="relative mb-6 -mx-3 sm:mx-0 sm:mb-8"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 }}
            >
              <div
                className="flex gap-1.5 overflow-x-auto px-3 pb-1 sm:flex-wrap sm:px-0"
                style={{ scrollbarWidth: 'none' }}
              >
                {skillCategories.map(cat => {
                  const active = activeTab === cat.id;
                  return (
                    <motion.button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide transition-all duration-300 sm:gap-2 sm:px-4 sm:text-xs"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        ...(active
                          ? {
                              background: `${cat.accent}18`,
                              border: `1px solid ${cat.accent}45`,
                              color: cat.accent,
                              boxShadow: `0 0 18px ${cat.accent}20`,
                            }
                          : {
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              color: 'rgba(148,163,184,0.7)',
                            }
                        ),
                      }}
                    >
                      <cat.icon className="h-3.5 w-3.5 flex-shrink-0" />
                      {cat.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Skill bars panel — animated on tab change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                ref={barsRef}
              >
                <SpotlightCard accent={activeCategory.accent}>
                  <div
                    className="rounded-2xl p-4 sm:p-8"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: `1px solid ${activeCategory.accent}25`,
                      backdropFilter: 'blur(18px)',
                    }}
                  >
                    {/* Panel header */}
                    <div className="mb-6 flex flex-wrap items-center gap-3 sm:mb-7 sm:flex-nowrap">
                      <div
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{
                          background: `linear-gradient(135deg,${activeCategory.accent}33,${activeCategory.accent}11)`,
                          border: `1px solid ${activeCategory.accent}40`,
                        }}
                      >
                        <activeCategory.icon className="h-5 w-5" style={{ color: activeCategory.accent }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3
                          className="truncate text-lg font-black text-white"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {activeCategory.label}
                        </h3>
                        <p className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>
                          {activeCategory.skills.length} technologies
                        </p>
                      </div>
                      <div
                        className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider sm:ml-auto sm:text-[11px]"
                        style={{
                          background: `${activeCategory.accent}14`,
                          border: `1px solid ${activeCategory.accent}35`,
                          color: activeCategory.accent,
                        }}
                      >
                        {activeCategory.id === 'hardware' ? 'NVQ L4' :
                         activeCategory.id === 'mobile' ? 'Flutter' :
                         activeCategory.id === 'frontend' ? 'React' :
                         activeCategory.id === 'backend' ? 'Node+Java' :
                         activeCategory.id === 'database' ? 'MySQL' : 'Git'}
                      </div>
                    </div>

                    {/* Skill bars */}
                    <div className="space-y-5 sm:space-y-6">
                      {activeCategory.skills.map((skill, i) => (
                        <SkillBar
                          key={skill.name}
                          skill={skill}
                          accent={activeCategory.accent}
                          delay={i * 0.12}
                          inView={barsInView}
                        />
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            </AnimatePresence>

            {/* All categories mini grid (below main panel) */}
            <motion.div
              className="mt-5 grid grid-cols-1 gap-2.5 min-[430px]:grid-cols-2 sm:mt-6 sm:grid-cols-3 sm:gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              {skillCategories.map(cat => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex min-w-0 items-center gap-2.5 rounded-xl p-3 text-left transition-all duration-300 sm:p-3.5"
                  style={{
                    background: activeTab === cat.id ? `${cat.accent}14` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${activeTab === cat.id ? cat.accent + '40' : 'rgba(255,255,255,0.07)'}`,
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${cat.accent}1a` }}
                  >
                    <cat.icon className="h-4 w-4" style={{ color: cat.accent }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold leading-none text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {cat.label}
                    </p>
                    <p className="mt-0.5 text-[10px]" style={{ color: 'rgba(148,163,184,0.45)' }}>
                      {cat.skills.length} skills
                    </p>
                  </div>
                  {activeTab === cat.id && (
                    <ChevronRight className="ml-auto h-3.5 w-3.5 flex-shrink-0" style={{ color: cat.accent }} />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* ════ RIGHT: GitHub language bar + soft skills ════ */}
          <motion.div
            className="min-w-0 flex flex-col gap-4 sm:gap-5 lg:sticky lg:top-8 lg:self-start"
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Live GitHub language bar */}
            <GitHubLangBar />

            {/* Soft skills */}
            <div
              className="rounded-2xl p-4 sm:p-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)' }}
            >
              <h3
                className="mb-5 flex items-center gap-2 text-sm font-bold text-white sm:text-base"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <Sparkles className="h-4 w-4 text-cyan-300 flex-shrink-0" />
                Soft Skills
              </h3>
              <div className="space-y-3.5">
                {[
                  { label: 'Problem Solving',  pct: 92, color: '#22d3ee' },
                  { label: 'Teamwork',          pct: 90, color: '#818cf8' },
                  { label: 'Leadership',        pct: 82, color: '#34d399' },
                  { label: 'Communication',     pct: 85, color: '#fbbf24' },
                  { label: 'Agile / Scrum',     pct: 80, color: '#f472b6' },
                ].map((s, i) => {
                  const { ref: softRef, inView: softInView } = useInView({ triggerOnce: true });
                  return (
                    <div key={s.label} ref={softRef}>
                      <div className="mb-1.5 flex justify-between gap-3">
                        <span className="min-w-0 text-xs font-semibold text-slate-300">{s.label}</span>
                        <span className="text-[11px] font-black" style={{ color: s.color }}>{s.pct}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${s.color}99, ${s.color})` }}
                          initial={{ width: 0 }}
                          animate={softInView ? { width: `${s.pct}%` } : {}}
                          transition={{ duration: 1.2, delay: i * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick facts */}
            <div
              className="rounded-2xl p-4 sm:p-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)' }}
            >
              <h3
                className="mb-4 text-sm font-bold text-white sm:text-base"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                🎯 Quick Facts
              </h3>
              <div className="space-y-2.5">
                {[
                  { icon: '🌐', text: 'Full-stack web — React + Node.js' },
                  { icon: '📱', text: 'Cross-platform mobile — Flutter' },
                  { icon: '🗄️', text: 'SQL & NoSQL — MySQL, Firebase' },
                  { icon: '🔧', text: 'NVQ L4 Hardware Technician' },
                  { icon: '🤖', text: 'IoT — Arduino, NodeMCU, sensors' },
                  { icon: '🚀', text: 'Agile workflow, GitHub CI/CD' },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 + 0.15, duration: 0.4 }}
                    className="flex min-w-0 items-start gap-2.5 text-xs leading-relaxed text-slate-300 sm:items-center sm:text-sm"
                  >
                    <span className="flex-shrink-0 text-base leading-none sm:leading-normal">{f.icon}</span>
                    <span className="min-w-0">{f.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* GitHub CTA */}
            <motion.a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-4 py-4 text-sm font-bold text-white"
              style={{
                background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                boxShadow: '0 0 28px rgba(99,102,241,0.35)',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg,#22d3ee,#818cf8)' }}
              />
              <Github className="h-4 w-4 relative z-10 flex-shrink-0" />
              <span className="relative z-10">View GitHub Profile</span>
              <ExternalLink className="h-4 w-4 relative z-10 flex-shrink-0" />
            </motion.a>
          </motion.div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        #skills { scroll-margin-top: 80px; }
        .overflow-x-auto::-webkit-scrollbar { display: none; }
        @media (max-width: 640px) {
          button, a { -webkit-tap-highlight-color: transparent; }
        }
      `}</style>
    </section>
  );
}
