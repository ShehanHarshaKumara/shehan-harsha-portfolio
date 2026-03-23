/**
 * Projects.tsx — Elite Edition (Fixed & Mobile Responsive)
 *
 * ✅ Background image FIXED — proper absolute fill with parallax wrapper
 * ✅ "Explore All on GitHub" button BELOW cards grid
 * ✅ Fully mobile responsive — single col, horizontal pill scroll, video below
 * ✅ Live GitHub API + README images + smart cache
 * ✅ Search, Sort, Category filter, Pagination
 * ✅ Spotlight cursor glow, animated counters, marquee strip
 * ✅ Toast notifications, skeleton shimmer
 * ✅ FIXED: Display projects sorted by recently updated first
 */

import {
  motion, useScroll, useTransform, AnimatePresence,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  useState, useEffect, useRef, useCallback,
  useMemo, MouseEvent as ReactMouseEvent,
} from 'react';
import {
  Github, ExternalLink, Star, GitFork, Eye,
  Sparkles, Code2, Play, Pause, Volume2, VolumeX,
  ArrowUpRight, ChevronRight, Terminal, Globe,
  Activity, Zap, Lock, RefreshCw, AlertCircle,
  Search, SlidersHorizontal, TrendingUp, Clock,
  CheckCircle2, X, ChevronDown,
} from 'lucide-react';

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const GITHUB_USERNAME = 'ShehanHarshaKumara';
const CACHE_KEY       = `gh_projects_${GITHUB_USERNAME}`;
const CACHE_TTL_MS    = 30 * 60 * 1000;
const MAX_REPOS       = 50;
const FEATURED_COUNT  = 4;
const PAGE_SIZE       = 8;

// ─── Assets ───────────────────────────────────────────────────────────────────
const projectBg    = new URL('../../assets/images/IMG1.png',   import.meta.url).href;
const projectVideo = new URL('../../assets/videos/video1.mp4', import.meta.url).href;

// ─── Types ────────────────────────────────────────────────────────────────────
interface GithubRepo {
  id: number; name: string; description: string | null;
  html_url: string; homepage: string | null;
  stargazers_count: number; forks_count: number; watchers_count: number;
  language: string | null; topics: string[]; updated_at: string;
  owner: { login: string }; default_branch: string;
}
interface Project extends GithubRepo {
  featured: boolean; category: string; readmeImage: string | null;
}
type SortKey = 'stars' | 'forks' | 'updated' | 'name';

// ─── Language palette ─────────────────────────────────────────────────────────
const LANG_CONFIG: Record<string, { color: string; glow: string; dot: string }> = {
  TypeScript:  { color: '#60a5fa', glow: 'rgba(96,165,250,.2)',   dot: '#60a5fa' },
  JavaScript:  { color: '#fbbf24', glow: 'rgba(251,191,36,.2)',   dot: '#fbbf24' },
  Python:      { color: '#34d399', glow: 'rgba(52,211,153,.2)',   dot: '#34d399' },
  Go:          { color: '#22d3ee', glow: 'rgba(34,211,238,.2)',   dot: '#22d3ee' },
  Rust:        { color: '#fb923c', glow: 'rgba(251,146,60,.2)',   dot: '#fb923c' },
  Java:        { color: '#f87171', glow: 'rgba(248,113,113,.2)',  dot: '#f87171' },
  'C++':       { color: '#a78bfa', glow: 'rgba(167,139,250,.2)',  dot: '#a78bfa' },
  'C#':        { color: '#818cf8', glow: 'rgba(129,140,248,.2)',  dot: '#818cf8' },
  PHP:         { color: '#c084fc', glow: 'rgba(192,132,252,.2)',  dot: '#c084fc' },
  Dart:        { color: '#67e8f9', glow: 'rgba(103,232,249,.2)',  dot: '#67e8f9' },
  HTML:        { color: '#fdba74', glow: 'rgba(253,186,116,.2)',  dot: '#fdba74' },
  CSS:         { color: '#38bdf8', glow: 'rgba(56,189,248,.2)',   dot: '#38bdf8' },
  Kotlin:      { color: '#a3e635', glow: 'rgba(163,230,53,.2)',   dot: '#a3e635' },
  Swift:       { color: '#f97316', glow: 'rgba(249,115,22,.2)',   dot: '#f97316' },
};
const lc = (l: string | null) =>
  LANG_CONFIG[l ?? ''] ?? { color: '#94a3b8', glow: 'rgba(148,163,184,.1)', dot: '#94a3b8' };

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

const deriveCategory = (repo: GithubRepo): string => {
  const all = [...(repo.topics ?? []), (repo.language ?? '').toLowerCase()];
  if (all.some(x => ['ai','ml','openai','nlp','llm','deep-learning'].includes(x))) return 'AI / ML';
  if (all.some(x => ['react','vue','angular','nextjs','frontend'].includes(x))) return 'Frontend';
  if (all.some(x => ['nodejs','express','fastapi','django','backend'].includes(x))) return 'Backend';
  if (all.some(x => ['mobile','flutter','react-native','android','ios','dart','kotlin'].includes(x))) return 'Mobile';
  if (all.some(x => ['docker','kubernetes','ci-cd','devops','terraform'].includes(x))) return 'DevOps';
  if (all.some(x => ['tool','cli','utility','plugin','extension'].includes(x))) return 'Tools';
  if (all.some(x => ['iot','arduino','embedded','hardware','nodemcu'].includes(x))) return 'IoT';
  return 'Full Stack';
};

const extractReadmeImage = (base64: string, repoUrl: string): string | null => {
  try {
    const text = atob(base64.replace(/\n/g, ''));
    const md = text.match(/!\[[^\]]*\]\(([^)]+)\)/);
    if (md?.[1]) {
      const url = md[1].split(' ')[0].trim();
      if (!url.startsWith('http')) {
        const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/');
        return `https://raw.githubusercontent.com/${owner}/${repo}/main/${url.replace(/^\.?\//,'')}`;
      }
      return url.includes('github.com') && !url.includes('raw.')
        ? url.replace('github.com','raw.githubusercontent.com').replace('/blob/','/')
        : url;
    }
    const html = text.match(/<img[^>]+src=["']([^"']+)["']/i);
    return html?.[1] ?? null;
  } catch { return null; }
};

// ─── GitHub API ───────────────────────────────────────────────────────────────
async function fetchRepos(): Promise<GithubRepo[]> {
  const r = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${MAX_REPOS}&type=public`,
    { headers: { Accept: 'application/vnd.github.mercy-preview+json' } }
  );
  if (!r.ok) throw new Error(`${r.status}`);
  return r.json();
}
async function fetchReadmeImage(owner: string, repo: string): Promise<string | null> {
  try {
    const r = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`,
      { headers: { Accept: 'application/vnd.github.v3+json' } });
    if (!r.ok) return null;
    const d = await r.json();
    return extractReadmeImage(d.content, `https://github.com/${owner}/${repo}`);
  } catch { return null; }
}

// ─── Cache ────────────────────────────────────────────────────────────────────
const saveCache = (p: Project[]) => {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: p })); } catch { /**/ }
};
const loadCache = (): Project[] | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    return Date.now() - ts > CACHE_TTL_MS ? null : data;
  } catch { return null; }
};

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }: { msg: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: .9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: .9 }}
      className="fixed bottom-5 right-4 left-4 sm:left-auto sm:right-6 sm:w-auto z-[999] flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold shadow-2xl"
      style={{
        background: type === 'success' ? 'rgba(16,185,129,.15)' : 'rgba(239,68,68,.15)',
        border: `1px solid ${type === 'success' ? 'rgba(16,185,129,.4)' : 'rgba(239,68,68,.4)'}`,
        backdropFilter: 'blur(20px)',
        color: type === 'success' ? '#34d399' : '#f87171',
      }}>
      {type === 'success'
        ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
        : <AlertCircle className="h-4 w-4 flex-shrink-0" />}
      <span className="flex-1">{msg}</span>
      <button onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0" title="Close">
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

// ─── SPOTLIGHT CARD ───────────────────────────────────────────────────────────
function SpotlightCard({ children, color }: { children: React.ReactNode; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, on: false });

  const onMove = (e: ReactMouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setPos(p => ({ ...p, on: false }))}
      style={{ position: 'relative', overflow: 'hidden' }}>
      {pos.on && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: `radial-gradient(260px circle at ${pos.x}px ${pos.y}px, ${color}16, transparent 70%)`,
        }} />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = Math.max(1, Math.ceil(to / 40));
    const t = setInterval(() => {
      v += step;
      if (v >= to) { setVal(to); clearInterval(t); }
      else setVal(v);
    }, 30);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── MARQUEE STRIP ────────────────────────────────────────────────────────────
const TECH_BADGES = [
  'React.js','Node.js','TypeScript','Flutter','MySQL','MongoDB',
  'Spring Boot','Java','Dart','Firebase','Tailwind CSS','PHP',
  'JavaFX','Arduino','GitHub Actions','Figma','REST API',
];
function MarqueeStrip() {
  const doubled = [...TECH_BADGES, ...TECH_BADGES];
  return (
    <div className="relative overflow-hidden py-3"
      style={{ maskImage: 'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)' }}>
      <motion.div
        className="flex gap-3 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}>
        {doubled.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold flex-shrink-0"
            style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.09)',
              color: 'rgba(148,163,184,.75)',
            }}>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 opacity-60 flex-shrink-0" />
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── README THUMBNAIL ─────────────────────────────────────────────────────────
function ReadmeThumbnail({ src, color, name }: { src: string | null; color: string; name: string }) {
  const [err, setErr] = useState(false);
  if (!src || err) {
    const seed = name.charCodeAt(0) * 7 + name.charCodeAt(name.length - 1) * 13;
    const shapes = Array.from({ length: 5 }, (_, i) => ({
      r: 18 + (seed * (i + 3)) % 38,
      cx: ((seed * (i + 1) * 37) % 200) + 20,
      cy: ((seed * (i + 2) * 53) % 100) + 10,
      o: 0.05 + i * 0.025,
    }));
    return (
      <div className="flex h-full w-full items-center justify-center overflow-hidden"
        style={{ background: `${color}08` }}>
        <svg width="100%" height="100%" viewBox="0 0 240 120" preserveAspectRatio="xMidYMid slice">
          {shapes.map((s, i) => <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={color} opacity={s.o} />)}
          <text x="120" y="68" textAnchor="middle" fontSize="10" fill={color} opacity="0.3"
            fontFamily="monospace">{name.slice(0, 20)}</text>
        </svg>
      </div>
    );
  }
  return (
    <img src={src} alt="preview" onError={() => setErr(true)}
      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onHover, featured }: {
  project: Project; index: number;
  onHover: (p: Project | null) => void; featured?: boolean;
}) {
  const cfg = lc(project.language);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: .6, delay: Math.min(index, 4) * .06, ease: [0.22, 1, 0.36, 1] }}
      className={featured ? 'sm:col-span-2' : ''}
    >
      <SpotlightCard color={cfg.color}>
        <motion.div
          onHoverStart={() => onHover(project)}
          onHoverEnd={() => onHover(null)}
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="group relative flex flex-col h-full overflow-hidden rounded-2xl"
          style={{
            background: 'rgba(8,15,30,.72)',
            border: '1px solid rgba(255,255,255,.07)',
            backdropFilter: 'blur(18px)',
            boxShadow: '0 4px 24px rgba(0,0,0,.28)',
          }}>

          {/* Glowing top border on hover */}
          <div className="absolute top-0 left-0 right-0 h-px z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `linear-gradient(90deg,transparent,${cfg.color},transparent)` }} />

          {/* Thumbnail */}
          <div className="relative overflow-hidden flex-shrink-0"
            style={{ height: featured ? '180px' : '140px' }}>
            <ReadmeThumbnail src={project.readmeImage} color={cfg.color} name={project.name} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom,transparent 35%,rgba(8,15,30,.95) 100%)' }} />

            {/* Badges */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between z-10">
              {project.featured ? (
                <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: 'rgba(251,191,36,.18)', border: '1px solid rgba(251,191,36,.35)', color: '#fbbf24', backdropFilter: 'blur(8px)' }}>
                  <Zap className="h-2.5 w-2.5" /> Featured
                </span>
              ) : <span />}
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{ background: `${cfg.color}1a`, border: `1px solid ${cfg.color}40`, color: cfg.color, backdropFilter: 'blur(8px)' }}>
                {project.category}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-4 gap-3">

            {/* Title */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                style={{ background: cfg.glow, border: `1px solid ${cfg.color}28` }}>
                <Terminal className="h-4 w-4" style={{ color: cfg.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-white text-sm leading-snug truncate transition-colors duration-300 group-hover:text-sky-300"
                  style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {project.name.replace(/-/g, ' ')}
                </h3>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px]"
                  style={{ color: 'rgba(148,163,184,.5)' }}>
                  <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
                  {project.language ?? 'N/A'}
                  <span className="opacity-30">·</span>
                  {new Date(project.updated_at).toLocaleDateString('en', { month: 'short', year: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs leading-relaxed line-clamp-2 flex-1"
              style={{ color: 'rgba(148,163,184,.68)', fontFamily: "'DM Sans', sans-serif" }}>
              {project.description ?? 'No description provided.'}
            </p>

            {/* Topics */}
            {project.topics.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {project.topics.slice(0, featured ? 5 : 3).map(t => (
                  <span key={t} className="rounded-md px-1.5 py-0.5 text-[10px] font-medium"
                    style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', color: 'rgba(148,163,184,.6)' }}>
                    #{t}
                  </span>
                ))}
                {project.topics.length > (featured ? 5 : 3) && (
                  <span className="text-[10px] px-1" style={{ color: 'rgba(148,163,184,.3)' }}>
                    +{project.topics.length - (featured ? 5 : 3)}
                  </span>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-3 text-xs pt-2"
              style={{ borderTop: '1px solid rgba(255,255,255,.05)', color: 'rgba(148,163,184,.65)' }}>
              <span className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                <span className="font-bold text-white">{fmt(project.stargazers_count)}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <GitFork className="h-3.5 w-3.5 text-sky-400 flex-shrink-0" />
                <span className="font-bold text-white">{fmt(project.forks_count)}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-violet-400 flex-shrink-0" />
                <span className="font-bold text-white">{fmt(project.watchers_count)}</span>
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <a href={project.html_url} target="_blank" rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-all hover:border-white/20 active:scale-95"
                style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', color: 'rgba(148,163,184,.8)' }}>
                <Github className="h-3.5 w-3.5 flex-shrink-0" /> Code
              </a>
              {project.homepage ? (
                <a href={project.homepage} target="_blank" rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold text-white transition-all active:scale-95"
                  style={{ background: `linear-gradient(135deg,${cfg.color}dd,${cfg.color}88)`, boxShadow: `0 0 14px ${cfg.color}28` }}>
                  <Globe className="h-3.5 w-3.5 flex-shrink-0" /> Live <ChevronRight className="h-3 w-3" />
                </a>
              ) : (
                <span className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold"
                  style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.04)', color: 'rgba(148,163,184,.28)' }}>
                  <Lock className="h-3.5 w-3.5 flex-shrink-0" /> No Site
                </span>
              )}
            </div>
          </div>

          {/* Corner glow */}
          <div className="pointer-events-none absolute -bottom-14 -right-14 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
            style={{ background: `radial-gradient(circle,${cfg.color},transparent)` }} />
        </motion.div>
      </SpotlightCard>
    </motion.div>
  );
}

// ─── SKELETON ─────────────────────────────────────────────────────────────────
function Skeleton({ wide = false }: { wide?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-2xl ${wide ? 'sm:col-span-2' : ''}`}
      style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)' }}>
      <div className="skeleton-shimmer" style={{ height: wide ? '180px' : '140px' }} />
      <div className="p-4 space-y-3">
        <div className="flex gap-2.5">
          <div className="h-9 w-9 rounded-xl skeleton-shimmer flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-2/3 rounded-lg skeleton-shimmer" />
            <div className="h-3 w-1/3 rounded-lg skeleton-shimmer" />
          </div>
        </div>
        <div className="h-3 w-full rounded skeleton-shimmer" />
        <div className="h-3 w-5/6 rounded skeleton-shimmer" />
        <div className="flex gap-2 mt-3">
          <div className="h-9 flex-1 rounded-xl skeleton-shimmer" />
          <div className="h-9 flex-1 rounded-xl skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

// ─── VIDEO PANEL ──────────────────────────────────────────────────────────────
function VideoPanel({ active, total }: { active: Project | null; total: number }) {
  const vidRef  = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted,   setMuted]   = useState(true);
  const [loaded,  setLoaded]  = useState(false);

  const toggle = () => {
    if (!vidRef.current) return;
    playing ? vidRef.current.pause() : vidRef.current.play();
    setPlaying(p => !p);
  };

  return (
    <div className="flex flex-col gap-5">

      {/* Video frame */}
      <div className="relative overflow-hidden rounded-2xl"
        style={{ background: '#03080f', border: '1px solid rgba(255,255,255,.07)' }}>

        {/* Animated pulse border */}
        <motion.div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl z-20"
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          style={{
            background: 'linear-gradient(135deg,#38bdf8,#818cf8,#f472b6)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px',
          }} />

        {/* Film grain */}
        <div className="pointer-events-none absolute inset-0 z-20 opacity-[.03]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: '160px 160px',
          }} />

        <video ref={vidRef} src={projectVideo}
          className={`relative z-10 w-full aspect-[9/16] object-cover transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay muted loop playsInline
          onLoadedData={() => setLoaded(true)} />

        {!loaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#03080f]">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-sky-500/20 border-t-sky-400" />
              <div className="absolute inset-2 animate-[spin_1.3s_linear_infinite_reverse] rounded-full border-2 border-violet-500/20 border-b-violet-400" />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3"
          style={{ background: 'linear-gradient(to bottom,rgba(3,8,15,.92),transparent)' }}>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Live</span>
          </div>
          <div className="flex gap-2">
            {([
              { Icon: muted ? VolumeX : Volume2, fn: () => { setMuted(m => !m); if (vidRef.current) vidRef.current.muted = !muted; }, on: !muted, title: muted ? 'Unmute' : 'Mute' },
              { Icon: playing ? Pause : Play, fn: toggle, on: playing, title: playing ? 'Pause' : 'Play' },
            ] as const).map(({ Icon, fn, on, title }, i) => (
              <button
                key={i}
                onClick={fn}
                className="project-control-btn"
                title={title}
              >
                <Icon className="project-control-icon" aria-hidden="true" />
                <span className="sr-only">{title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-4"
          style={{ background: 'linear-gradient(to top,rgba(3,8,15,.98) 0%,transparent 100%)' }}>
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div key={active.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                transition={{ duration: .3 }}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1"
                  style={{ color: 'rgba(148,163,184,.45)' }}>Now Previewing</p>
                <p className="font-bold text-white text-sm truncate capitalize"
                  style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {active.name.replace(/-/g, ' ')}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs" style={{ color: 'rgba(148,163,184,.65)' }}>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-400" />{fmt(active.stargazers_count)}</span>
                  <span className="flex items-center gap-1"><GitFork className="h-3 w-3 text-sky-400" />{fmt(active.forks_count)}</span>
                  <span className="ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ background: lc(active.language).glow, color: lc(active.language).color }}>
                    <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: lc(active.language).dot }} />
                    {active.language ?? 'N/A'}
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-xs" style={{ color: 'rgba(148,163,184,.4)' }}>
                Hover a project to preview
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        {([
          { Icon: Code2,    label: 'Repos',   value: total || 10, suffix: '+', color: '#60a5fa' },
          { Icon: Star,     label: 'Stars',   value: 32,          suffix: '+', color: '#fbbf24' },
          { Icon: Activity, label: 'Commits', value: 180,         suffix: '+', color: '#34d399' },
        ] as const).map(s => (
          <motion.div key={s.label} whileHover={{ y: -3, scale: 1.04 }}
            className="flex flex-col items-center gap-1.5 rounded-2xl py-4 text-center"
            style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}>
            <s.Icon className="h-4 w-4" style={{ color: s.color }} />
            <span className="text-sm font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <Counter to={s.value} suffix={s.suffix} />
            </span>
            <span className="text-[9px] uppercase tracking-widest" style={{ color: 'rgba(148,163,184,.4)' }}>{s.label}</span>
          </motion.div>
        ))}
      </div>

      {/* GitHub CTA */}
      <motion.a
        href={`https://github.com/${GITHUB_USERNAME}`}
        target="_blank" rel="noopener noreferrer"
        whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: .97 }}
        className="group flex items-center justify-center gap-2.5 rounded-2xl py-4 text-sm font-bold text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', boxShadow: '0 0 28px rgba(99,102,241,.38)' }}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(135deg,#38bdf8,#8b5cf6)' }} />
        <Github className="h-4 w-4 relative z-10 flex-shrink-0" />
        <span className="relative z-10">Explore All on GitHub</span>
        <ArrowUpRight className="h-4 w-4 relative z-10 flex-shrink-0" />
      </motion.a>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function Projects() {
  const { ref: inViewRef, inView } = useInView({ threshold: 0.04, triggerOnce: true });
  const sectionRef = useRef<HTMLDivElement>(null);

  const [projects,       setProjects]       = useState<Project[]>([]);
  const [loading,        setLoading]        = useState(true);
  const [activeProject,  setActiveProject]  = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories,     setCategories]     = useState<string[]>(['All']);
  const [query,          setQuery]          = useState('');
  const [sort,           setSort]           = useState<SortKey>('updated'); // Changed default to 'updated'
  const [page,           setPage]           = useState(1);
  const [toast,          setToast]          = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [showSort,       setShowSort]       = useState(false);

  // ── Parallax — wraps the bg image in its own container so height is always correct
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  const loadProjects = useCallback(async (force = false) => {
    setLoading(true);
    if (!force) {
      const cached = loadCache();
      if (cached?.length) {
        // Sort cached projects by updated date (latest first)
        const sorted = [...cached].sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        setProjects(sorted);
        setCategories(['All', ...Array.from(new Set(sorted.map(p => p.category))).sort()]);
        setLoading(false);
        return;
      }
    }
    try {
      const repos = await fetchRepos();
      // repos are already sorted by updated date from API (sort=updated)
      const byStar = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
      const featuredIds = new Set(byStar.slice(0, FEATURED_COUNT).map(r => r.id));
      const enriched: Project[] = [];
      
      for (let i = 0; i < repos.length; i += 8) {
        const batch = repos.slice(i, i + 8);
        const results = await Promise.all(batch.map(async (r): Promise<Project> => ({
          ...r, language: r.language ?? null, topics: r.topics ?? [],
          featured: featuredIds.has(r.id),
          category: deriveCategory(r),
          readmeImage: await fetchReadmeImage(r.owner.login, r.name),
        })));
        enriched.push(...results);
      }
      
      // Sort: featured first, then by updated date (latest first)
      enriched.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });
      
      setCategories(['All', ...Array.from(new Set(enriched.map(p => p.category))).sort()]);
      setProjects(enriched);
      saveCache(enriched);
      if (force) setToast({ msg: 'Projects refreshed from GitHub!', type: 'success' });
    } catch {
      if (force) setToast({ msg: 'Failed to reach GitHub API.', type: 'error' });
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const { data } = JSON.parse(raw);
          if (data?.length) {
            const sorted = [...data].sort((a, b) => 
              new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
            );
            setProjects(sorted);
            setCategories(['All', ...Array.from(new Set(sorted.map((p: Project) => p.category))).sort()]);
          }
        }
      } catch { /**/ }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProjects(); }, [loadProjects]);

  const filtered = useMemo(() => {
    let list = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q) ||
        p.topics.some(t => t.includes(q))
      );
    }
    
    // Apply sorting based on user selection
    const sorted = [...list].sort((a, b) => {
      if (sort === 'stars')   return b.stargazers_count - a.stargazers_count;
      if (sort === 'forks')   return b.forks_count - a.forks_count;
      if (sort === 'updated') return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      if (sort === 'name')    return a.name.localeCompare(b.name);
      return 0;
    });
    
    return sorted;
  }, [projects, activeCategory, query, sort]);

  // Separate latest projects (first 4 after filtering) and remaining projects
  const latestProjects = filtered.slice(0, FEATURED_COUNT);
  const otherProjects = filtered.slice(FEATURED_COUNT);
  
  // Handle pagination for other projects only (latest projects always show full)
  const paginatedOther = otherProjects.slice(0, page * PAGE_SIZE);
  const hasMore = paginatedOther.length < otherProjects.length;

  const SORT_OPTIONS: { key: SortKey; label: string; Icon: React.ElementType }[] = [
    { key: 'stars',   label: 'Most Stars',        Icon: Star },
    { key: 'forks',   label: 'Most Forks',        Icon: GitFork },
    { key: 'updated', label: 'Recently Updated',  Icon: Clock },
    { key: 'name',    label: 'Name A–Z',           Icon: TrendingUp },
  ];

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#02060f]">

      {/* ─────────────────────────────────────────────────────────────────────
          BACKGROUND IMAGE — Fixed approach:
          - Outer div is absolute inset-0 with overflow-hidden
          - Inner div holds the img and parallax transform
          - This keeps height 100% always and parallax works correctly
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Parallax wrapper — translate only this div, not the clip */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-[-10%] w-[120%] h-[120%]"
        >
          <img
            src={projectBg}
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.18 }}
          />
        </motion.div>

        {/* Dark overlay gradient */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg,rgba(2,6,15,.94) 0%,rgba(4,13,26,.90) 55%,rgba(2,6,15,.92) 100%)' }} />

        {/* Grid lines */}
        <div className="absolute inset-0"
          style={{
            opacity: 0.022,
            backgroundImage: 'linear-gradient(rgba(56,189,248,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.7) 1px,transparent 1px)',
            backgroundSize: '70px 70px',
          }} />

        {/* Ambient orbs */}
        <motion.div
          className="absolute rounded-full"
          style={{
            left: '-10%', top: '20%',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle,rgba(14,165,233,.08) 0%,transparent 70%)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 22, repeat: Infinity }} />
        <motion.div
          className="absolute rounded-full"
          style={{
            right: '-10%', bottom: '20%',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle,rgba(99,102,241,.06) 0%,transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 26, repeat: Infinity, delay: 5 }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:py-24 sm:px-6" ref={inViewRef}>

        {/* ── Header ── */}
        <motion.div className="mb-8 text-center"
          initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .85, ease: [0.22, 1, 0.36, 1] }}>

          <motion.div
            initial={{ scale: .9, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: .1 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[.18em]"
            style={{ background: 'rgba(14,165,233,.07)', border: '1px solid rgba(14,165,233,.22)', color: '#7dd3fc' }}>
            <Sparkles className="h-3.5 w-3.5 flex-shrink-0" /> Featured Work
          </motion.div>

          <h2 className="mb-3 font-black leading-[.92] tracking-tight"
            style={{ fontSize: 'clamp(2.2rem,7vw,4.8rem)', fontFamily: "'Outfit', sans-serif" }}>
            <span className="block bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg,#e0f2fe 0%,#7dd3fc 40%,#a5b4fc 70%,#f9a8d4 100%)' }}>
              Latest Projects
            </span>
          </h2>

          <p className="mx-auto max-w-md text-sm leading-relaxed px-4"
            style={{ color: 'rgba(148,163,184,.65)', fontFamily: "'DM Sans', sans-serif" }}>
            Auto-synced from GitHub · README previews · real-time stars &amp; forks
          </p>
        </motion.div>

        {/* ── Marquee ── */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: .25 }} className="mb-10">
          <MarqueeStrip />
        </motion.div>

        {/* ── Search + Sort + Refresh ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: .35 }}
          className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">

          {/* Search — full width on mobile */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 flex-shrink-0"
              style={{ color: 'rgba(148,163,184,.45)' }} />
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search projects, topics..."
              className="w-full rounded-xl py-2.5 pl-10 pr-10 text-sm outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(255,255,255,.09)',
                color: '#e2e8f0',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(56,189,248,.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56,189,248,.07)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.09)'; e.currentTarget.style.boxShadow = 'none'; }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Sort + Refresh row — side by side on mobile */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative flex-1 sm:flex-none">
              <button onClick={() => setShowSort(s => !s)}
                className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all"
                style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.09)', color: 'rgba(148,163,184,.8)', minWidth: '140px' }}>
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{SORT_OPTIONS.find(s => s.key === sort)?.label}</span>
                </span>
                <ChevronDown className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${showSort ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: .97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: .97 }}
                    className="absolute top-full mt-2 left-0 sm:right-0 sm:left-auto z-50 rounded-2xl overflow-hidden py-1.5 w-full sm:min-w-[180px]"
                    style={{ background: 'rgba(6,12,26,.96)', border: '1px solid rgba(255,255,255,.1)', backdropFilter: 'blur(24px)', boxShadow: '0 20px 60px rgba(0,0,0,.55)' }}>
                    {SORT_OPTIONS.map(opt => (
                      <button key={opt.key}
                        onClick={() => { setSort(opt.key); setShowSort(false); setPage(1); }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors text-left"
                        style={{ color: sort === opt.key ? '#38bdf8' : 'rgba(148,163,184,.8)' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.05)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        <opt.Icon className="h-3.5 w-3.5 flex-shrink-0" />
                        {opt.label}
                        {sort === opt.key && <CheckCircle2 className="h-3.5 w-3.5 ml-auto text-sky-400 flex-shrink-0" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button onClick={() => loadProjects(true)}
              whileHover={{ scale: 1.06 }} whileTap={{ scale: .94 }}
              title="Refresh from GitHub"
              className="flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all flex-shrink-0"
              style={{ border: '1px solid rgba(255,255,255,.07)', color: 'rgba(148,163,184,.5)', background: 'rgba(255,255,255,.03)' }}>
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </motion.button>
          </div>
        </motion.div>

        {/* ── Category pills — horizontal scroll on mobile ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: .42 }}
          className="mb-8 -mx-4 sm:mx-0">
          <div className="flex gap-2 overflow-x-auto px-4 sm:px-0 sm:flex-wrap pb-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map(cat => (
              <motion.button key={cat}
                onClick={() => { setActiveCategory(cat); setPage(1); }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
                className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-all duration-300 flex-shrink-0"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  ...(activeCategory === cat
                    ? { background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', color: '#fff', boxShadow: '0 0 20px rgba(14,165,233,.35)' }
                    : { background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.09)', color: 'rgba(148,163,184,.75)' }
                  ),
                }}>
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── MAIN LAYOUT: cards LEFT | video RIGHT (video moves below on mobile) ── */}
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1fr_320px] xl:lg:grid-cols-[1fr_340px]">

          {/* ── CARDS COLUMN ── */}
          <div className="min-w-0">
            {loading ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} wide={i === 0} />)}
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory}-${sort}-${query}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: .28 }}
                    className="space-y-12">
                    
                    {/* Latest Projects Section */}
                    {latestProjects.length > 0 && (
                      <div>
                        <div className="mb-4 flex items-center gap-3">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400/70 flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5" />
                            Recently Updated
                          </h3>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {latestProjects.map((p, i) => (
                            <ProjectCard
                              key={p.id} project={p} index={i}
                              onHover={setActiveProject}
                              featured={p.featured}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Other Projects Section */}
                    {paginatedOther.length > 0 && (
                      <div>
                        <div className="mb-4 flex items-center gap-3">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" />
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400/60 flex items-center gap-2">
                            <Code2 className="h-3.5 w-3.5" />
                            All Projects
                          </h3>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {paginatedOther.map((p, i) => (
                            <ProjectCard
                              key={p.id} project={p} index={i}
                              onHover={setActiveProject}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {filtered.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="h-16 w-16 rounded-2xl flex items-center justify-center"
                          style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}>
                          <Search className="h-6 w-6" style={{ color: 'rgba(148,163,184,.3)' }} />
                        </div>
                        <p className="text-sm text-center px-4"
                          style={{ color: 'rgba(148,163,184,.45)', fontFamily: "'DM Sans', sans-serif" }}>
                          No projects found for{' '}
                          <strong className="text-slate-400">"{query || activeCategory}"</strong>
                        </p>
                        <button onClick={() => { setQuery(''); setActiveCategory('All'); }}
                          className="text-xs text-sky-400 hover:text-sky-300 transition-colors underline underline-offset-2">
                          Clear filters
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* ── Footer: count + Load More + GitHub CTA ── */}
                <div className="mt-8 flex flex-col items-center gap-4">
                  <p className="text-xs" style={{ color: 'rgba(148,163,184,.35)', fontFamily: "'DM Sans', sans-serif" }}>
                    Showing{' '}
                    <span className="text-slate-400 font-semibold">{latestProjects.length + paginatedOther.length}</span>{' '}
                    of{' '}
                    <span className="text-slate-400 font-semibold">{filtered.length}</span>{' '}
                    repositories
                  </p>

                  {hasMore && (
                    <motion.button
                      onClick={() => setPage(p => p + 1)}
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}
                      className="flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition-all w-full sm:w-auto justify-center"
                      style={{
                        background: 'rgba(255,255,255,.04)',
                        border: '1px solid rgba(255,255,255,.1)',
                        color: 'rgba(148,163,184,.8)',
                      }}>
                      <ChevronDown className="h-4 w-4 flex-shrink-0" />
                      Load More Projects
                    </motion.button>
                  )}

                  {/* ── "Explore All on GitHub" button UNDER cards (visible always) ── */}
                  <motion.a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: .97 }}
                    className="group flex items-center justify-center gap-2.5 rounded-2xl py-3.5 px-8 text-sm font-bold text-white relative overflow-hidden w-full sm:w-auto"
                    style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', boxShadow: '0 0 28px rgba(99,102,241,.35)' }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(135deg,#38bdf8,#8b5cf6)' }} />
                    <Github className="h-4 w-4 relative z-10 flex-shrink-0" />
                    <span className="relative z-10">Explore All on GitHub</span>
                    <ArrowUpRight className="h-4 w-4 relative z-10 flex-shrink-0" />
                  </motion.a>
                </div>
              </>
            )}
          </div>

          {/* ── VIDEO PANEL — sticky on desktop, normal flow on mobile ── */}
          <motion.div
            initial={{ opacity: 0, x: 0, y: 20 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: .85, delay: .3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-8 lg:self-start">
            <VideoPanel active={activeProject} total={projects.length} />
          </motion.div>

        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

        /* Scrollbar hide for category pills */
        .overflow-x-auto::-webkit-scrollbar { display: none; }

        /* Skeleton shimmer */
        .skeleton-shimmer {
          background: linear-gradient(90deg,
            rgba(255,255,255,.04) 0%,
            rgba(255,255,255,.09) 50%,
            rgba(255,255,255,.04) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.9s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Input placeholder */
        input::placeholder { color: rgba(148,163,184,.3); }
        input:focus { outline: none; }

        /* Video perf */
        video {
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        /* Mobile touch targets */
        @media (max-width: 640px) {
          button, a { -webkit-tap-highlight-color: transparent; }
        }

        /* Video control button styles */
        .project-control-btn {
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          transition: all 0.2s ease;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .project-control-btn:hover {
          background: rgba(0,0,0,0.7);
          transform: scale(1.05);
        }
        .project-control-icon {
          width: 14px;
          height: 14px;
          color: white;
        }
      `}</style>
    </section>
  );
}