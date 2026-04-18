import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import {
  Code2, Rocket, Brain, Award, Users, Coffee, Sparkles, Cpu,
  Globe, Palette, Server, Cloud, Github, BookOpen, Target,
  Trophy, Compass, ArrowUpRight, Zap, Shield, Layers,
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { RESUME_URL } from '../constants/links';

// ─── Assets ──────────────────────────────────────────────────────────────────
const aboutBg    = new URL('../../assets/images/IMG1.png',    import.meta.url).href;
const aboutVideo = new URL('../../assets/videos/video3.mp4', import.meta.url).href;

// ─── Constants ────────────────────────────────────────────────────────────────
const PLAYBACK_RATE = 0.45;

// ─── Data (updated with Shehan's real info) ───────────────────────────────────
const features = [
  {
    icon: Cpu,      title: 'Modern Stack',
    description: 'React, Next.js, TypeScript, Vue, Angular & Svelte.',
    accent: '#38bdf8', grad: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.2)', tags: ['Next.js','React 18','TS 5'],
  },
  {
    icon: Cloud,    title: 'Cloud Native',
    description: 'AWS, GCP, Azure and serverless architecture specialist.',
    accent: '#34d399', grad: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.2)', tags: ['AWS','GCP','Azure'],
  },
  {
    icon: Palette,  title: 'UI / UX Design',
    description: 'Beautiful, intuitive interfaces with modern design tools.',
    accent: '#c084fc', grad: 'rgba(192,132,252,0.08)',
    border: 'rgba(192,132,252,0.2)', tags: ['Figma','Framer','Tailwind'],
  },
  {
    icon: Server,   title: 'Backend & Mobile',
    description: 'Scalable APIs with Laravel, Node.js, Spring & Flutter.',
    accent: '#fb923c', grad: 'rgba(251,146,60,0.08)',
    border: 'rgba(251,146,60,0.2)', tags: ['Laravel','Flutter','Node.js'],
  },
];

const journey = [
  { year:'2022', title:'Computer Hardware',  desc:'Studied Computer Hardware Engineering at Balapitiya Technical College.', icon:Rocket,  color:'#38bdf8' },
  { year:'2023', title:'NIBM Enrollment',    desc:'Started Software Engineering degree at NIBM Campus, Colombo.',           icon:Target,  color:'#c084fc' },
  { year:'2023', title:'First Big Project',  desc:'Built enterprise-grade web applications & contributed to open-source.',  icon:Trophy,  color:'#fbbf24' },
  { year:'2024', title:'Frontend Developer', desc:'Working at Sri Lanka Dedicated Economic Center — pixel-perfect UIs.',    icon:Users,   color:'#34d399' },
  { year:'2025', title:'AI / ML Integration',desc:'Exploring AI/ML, LLMs and cloud-native distributed systems.',            icon:Brain,   color:'#f472b6' },
];

const achievements = [
  { icon:Award,   title:'Frontend Developer',  desc:'At Sri Lanka Dedicated Economic Center — leading responsive web & mobile apps.',  grad:'135deg,#fbbf24,#f59e0b' },
  { icon:Github,  title:'OSS Contributor',      desc:'Active GitHub contributor across multiple repositories.',                          grad:'135deg,#94a3b8,#64748b' },
  { icon:BookOpen,title:'Tech Enthusiast',      desc:'Continuous learner — always exploring cutting-edge technologies.',                 grad:'135deg,#38bdf8,#06b6d4' },
  { icon:Compass, title:'Full-Stack Mindset',   desc:'From frontend to backend, mobile to cloud — T-shaped skills.',                    grad:'135deg,#34d399,#10b981' },
];

const stats = [
  { icon:Code2,  label:'Languages',    value:'9+',   note:'Mastered',     grad:'135deg,#38bdf8,#6366f1' },
  { icon:Globe,  label:'Frameworks',   value:'15+',  note:'In arsenal',   grad:'135deg,#c084fc,#ec4899' },
  { icon:Users,  label:'Projects',     value:'10+',  note:'Shipped',      grad:'135deg,#34d399,#10b981' },
  { icon:Coffee, label:'Coffee',       value:'∞',    note:'Never Enough', grad:'135deg,#fb923c,#ef4444' },
];

const skills = [
  { label:'React / Next.js', pct:92 }, { label:'TypeScript',  pct:88 },
  { label:'Laravel / PHP',   pct:85 }, { label:'Flutter',     pct:80 },
  { label:'AWS / Cloud',     pct:78 }, { label:'UI / UX',     pct:90 },
];

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticBtn({
  children, className = '', style = {}, onClick,
}: { children: React.ReactNode; className?: string; style?: React.CSSProperties; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x   = useMotionValue(0);
  const y   = useMotionValue(0);
  const sx  = useSpring(x, { stiffness: 300, damping: 20 });
  const sy  = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r  = ref.current.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy, ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ to }: { to: string }) {
  const [display, setDisplay] = useState('0');
  const ref  = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!seen) return;
    const num = parseInt(to.replace(/\D/g, ''), 10);
    if (isNaN(num)) { setDisplay(to); return; }
    let start = 0;
    const total = 1200;
    const step  = 16;
    const inc   = num / (total / step);
    const t = setInterval(() => {
      start += inc;
      if (start >= num) { setDisplay(to); clearInterval(t); }
      else setDisplay(Math.floor(start) + (to.includes('+') ? '+' : ''));
    }, step);
    return () => clearInterval(t);
  }, [seen, to]);

  return <span ref={ref}>{display}</span>;
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  const ref   = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="mb-14 text-center">
      <motion.h3
        initial={{ opacity: 0, y: 24 }}
        animate={shown ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block text-3xl font-black tracking-tight md:text-4xl"
        style={{
          backgroundImage: 'linear-gradient(135deg,#7dd3fc 0%,#c4b5fd 50%,#f9a8d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {children}
      </motion.h3>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={shown ? { scaleX: 1 } : {}}
        transition={{ delay: 0.25, duration: 0.7 }}
        className="mx-auto mt-4 h-px w-20 rounded-full"
        style={{ background: 'linear-gradient(90deg,transparent,#7dd3fc,#c4b5fd,transparent)' }}
      />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded]     = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const heroRef    = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = PLAYBACK_RATE;
  }, []);

  const stagger = (i: number, base = 0.1) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.65, delay: i * base, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* ── Background ──────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.img
          src={aboutBg}
          alt=""
          style={{ y: bgY }}
          className="h-full w-full scale-110 object-cover"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg,#030914f0 0%,#060f1ee8 50%,#030914f0 100%)' }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px 200px' }} />
        <motion.div className="absolute -left-32 top-32 h-[520px] w-[520px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(56,189,248,.12) 0%,transparent 70%)' }}
          animate={{ scale:[1,1.1,1], opacity:[.8,1,.8] }} transition={{ duration:20, repeat:Infinity }} />
        <motion.div className="absolute -right-32 bottom-32 h-[600px] w-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(192,132,252,.1) 0%,transparent 70%)' }}
          animate={{ scale:[1,1.12,1], opacity:[.7,1,.7] }} transition={{ duration:25, repeat:Infinity, delay:4 }} />
        <motion.div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(244,114,182,.06) 0%,transparent 70%)' }}
          animate={{ scale:[1,1.08,1] }} transition={{ duration:18, repeat:Infinity, delay:8 }} />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 sm:px-6" ref={heroRef}>

        {/* HEADER */}
        <motion.div className="mb-28 text-center"
          initial={{ opacity:0, y:40 }} animate={heroInView ? { opacity:1, y:0 } : {}}
          transition={{ duration:1, ease:[0.22,1,0.36,1] }}>

          <motion.div
            initial={{ scale:.88, opacity:0 }} animate={heroInView ? { scale:1, opacity:1 } : {}}
            transition={{ delay:.1 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.18em]"
            style={{ background:'rgba(56,189,248,.07)', border:'1px solid rgba(56,189,248,.22)', color:'#7dd3fc' }}>
            <Sparkles className="h-3.5 w-3.5" />
            Innovation Meets Excellence
          </motion.div>

          <h2 className="mb-7 text-[clamp(3rem,10vw,6.5rem)] font-black leading-[.9] tracking-tight">
            <motion.span
              className="block bg-clip-text text-transparent"
              style={{ backgroundImage:'linear-gradient(135deg,#7dd3fc 0%,#c4b5fd 45%,#f9a8d4 100%)' }}
              initial={{ opacity:0, x:-30 }} animate={heroInView ? { opacity:1, x:0 } : {}}
              transition={{ delay:.2, duration:.9 }}>
              Crafting Digital
            </motion.span>
            <motion.span
              className="block text-white"
              initial={{ opacity:0, x:30 }} animate={heroInView ? { opacity:1, x:0 } : {}}
              transition={{ delay:.3, duration:.9 }}>
              Experiences
            </motion.span>
          </h2>

          <motion.p
            className="mx-auto max-w-xl text-lg leading-relaxed"
            style={{ color:'rgba(148,163,184,.85)' }}
            initial={{ opacity:0 }} animate={heroInView ? { opacity:1 } : {}}
            transition={{ delay:.45 }}>
            Software Engineering undergraduate from Sri Lanka, transforming complex problems into elegant, scalable solutions.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity:0, y:12 }} animate={heroInView ? { opacity:1, y:0 } : {}}
            transition={{ delay:.55 }}>
            {[
              { icon:Zap,    label:'Performance First'   },
              { icon:Shield, label:'Clean Code Advocate' },
              { icon:Layers, label:'Scalable by Design'  },
            ].map(({ icon: Icon, label }) => (
              <span key={label}
                className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium"
                style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', color:'rgba(148,163,184,.9)' }}>
                <Icon className="h-3 w-3 text-sky-400" />{label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* VIDEO + STORY */}
        <div className="mb-36 grid items-center gap-14 lg:grid-cols-5 xl:gap-20">

          {/* Video */}
          <motion.div
            style={{ y: videoY }}
            initial={{ opacity:0, x:-60 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:'-80px' }}
            transition={{ duration:1, ease:[0.22,1,0.36,1] }}
            className="lg:col-span-3">
            <div className="relative">
              <div className="absolute -inset-8 rounded-3xl opacity-25 blur-3xl"
                style={{ background:'linear-gradient(135deg,#38bdf8,#c084fc,#f472b6)' }} />
              <div className="absolute -inset-[1.5px] rounded-[20px]"
                style={{ background:'linear-gradient(135deg,#38bdf8,#c084fc,#f472b6)' }} />

              <div className="relative overflow-hidden rounded-[19px] bg-black">
                <video ref={videoRef}
                  className={`h-[800px] w-full object-cover transition-all duration-1000 xl:h-[840px] ${videoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}`}
                  src={aboutVideo} autoPlay muted loop playsInline
                  onLoadedData={() => setVideoLoaded(true)} />

                {!videoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#030914]">
                    <div className="relative h-14 w-14">
                      <div className="absolute inset-0 animate-spin rounded-full border-2 border-sky-500/20 border-t-sky-400" />
                      <div className="absolute inset-2 animate-[spin_1.4s_linear_infinite_reverse] rounded-full border-2 border-purple-500/20 border-b-purple-400" />
                    </div>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0"
                  style={{ background:'linear-gradient(to top,rgba(3,9,20,.85) 0%,transparent 45%,rgba(3,9,20,.2) 100%)' }} />

                <motion.div
                  initial={{ y:16, opacity:0 }}
                  animate={videoLoaded ? { y:0, opacity:1 } : {}}
                  transition={{ delay:.4 }}
                  className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-3 rounded-2xl px-5 py-3.5"
                    style={{ background:'rgba(3,9,20,.6)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,.09)' }}>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <Globe className="h-4 w-4 text-sky-400" />
                    <span className="font-semibold tracking-wide text-white text-sm">Code. Create. Innovate.</span>
                    <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">Live</span>
                  </div>
                </motion.div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y:[-4,4,-4] }} transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
                className="absolute -right-4 -top-4 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-2xl"
                style={{ background:'linear-gradient(135deg,#38bdf8,#6366f1)', boxShadow:'0 0 32px rgba(99,102,241,.5)' }}>
                🇱🇰 Sri Lanka
              </motion.div>
              <motion.div
                animate={{ y:[4,-4,4] }} transition={{ duration:6, repeat:Infinity, ease:'easeInOut', delay:.6 }}
                className="absolute -bottom-4 -left-4 rounded-2xl px-5 py-3 text-sm font-bold shadow-2xl"
                style={{ background:'rgba(16,185,129,.1)', backdropFilter:'blur(14px)', border:'1px solid rgba(16,185,129,.35)', color:'#6ee7b7', boxShadow:'0 0 24px rgba(16,185,129,.25)' }}>
                10+ Projects
              </motion.div>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity:0, x:60 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:'-80px' }}
            transition={{ duration:1, ease:[0.22,1,0.36,1] }}
            className="space-y-8 lg:col-span-2">

            <div>
              <motion.div
                initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
                transition={{ duration:.7 }}
                className="mb-5 h-[2px] w-16 origin-left rounded-full"
                style={{ background:'linear-gradient(90deg,#38bdf8,#c084fc)' }} />
              <h3 className="text-3xl font-black leading-tight tracking-tight text-white xl:text-4xl">
                Shehan Harsha
                <span className="block bg-clip-text text-transparent"
                  style={{ backgroundImage:'linear-gradient(135deg,#7dd3fc,#c4b5fd)' }}>
                  Kumara
                </span>
              </h3>
              <p className="mt-2 text-sm font-medium" style={{ color:'#7dd3fc' }}>
                Software Engineering Undergraduate · NIBM Campus
              </p>
            </div>

            <div className="space-y-4 text-[15px] leading-[1.75]" style={{ color:'rgba(148,163,184,.85)' }}>
              <p>
                I'm not just a developer — I'm a{' '}
                <span className="font-semibold text-sky-400">digital architect</span>{' '}
                from Sri Lanka who builds bridges between complex technology and human experience. Every line of code tells a story.
              </p>
              <p>
                With a <span className="font-semibold text-purple-400">full-stack mindset</span> and an eye for detail, I craft applications that don't just work — they inspire. From backend architecture with Laravel & Spring to pixel-perfect UIs with React.
              </p>
            </div>

            {/* Skill bars */}
            <div className="space-y-3 pt-2">
              {skills.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ delay: i * 0.07, duration:.5 }}>
                  <div className="mb-1 flex justify-between text-xs" style={{ color:'rgba(148,163,184,.7)' }}>
                    <span className="font-medium text-slate-300">{s.label}</span>
                    <span className="text-sky-400">{s.pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full" style={{ background:'rgba(255,255,255,.06)' }}>
                    <motion.div
                      initial={{ width:0 }}
                      whileInView={{ width:`${s.pct}%` }}
                      viewport={{ once:true }}
                      transition={{ delay: .3 + i * 0.07, duration:1.1, ease:'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background:'linear-gradient(90deg,#38bdf8,#c084fc)' }} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['React','Laravel','TypeScript','Flutter','AWS','Python','PHP','Vue.js','Docker'].map(t => (
                <motion.span key={t} whileHover={{ scale:1.08, y:-2 }}
                  className="cursor-default rounded-full px-3.5 py-1.5 text-xs font-medium transition-all"
                  style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.09)', color:'rgba(148,163,184,.8)' }}>
                  {t}
                </motion.span>
              ))}
            </div>

            <div className="flex gap-3 pt-3">
              <MagneticBtn
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
                style={{ background:'linear-gradient(135deg,#38bdf8,#6366f1)', boxShadow:'0 0 28px rgba(99,102,241,.4)' }}
                onClick={() => window.open(RESUME_URL, '_blank')}>
                <BookOpen className="h-4 w-4" /> View Resume <ArrowUpRight className="h-3.5 w-3.5" />
              </MagneticBtn>
              <MagneticBtn
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
                style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)' }}
                onClick={() => window.open('https://github.com/ShehanHarshaKumara', '_blank')}>
                <Github className="h-4 w-4" /> GitHub
              </MagneticBtn>
            </div>

            {/* Social links */}
            <div className="flex gap-2 pt-1">
              {[
                { label:'LinkedIn', url:'https://www.linkedin.com/in/shehan-harsha-kumara-183532334', color:'#0a66c2' },
                { label:'Instagram', url:'https://www.instagram.com/shehan_harsha2001/profilecard/?igsh=bnhuenV4enRrZ2xq', color:'#e1306c' },
                { label:'Facebook', url:'https://www.facebook.com/profile.php?id=100078939468123&mibextid=LQQJ4d', color:'#1877f2' },
              ].map(s => (
                <motion.a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale:1.08, y:-2 }}
                  className="rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all"
                  style={{ background:`${s.color}18`, border:`1px solid ${s.color}44`, color:s.color }}>
                  {s.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* FEATURES */}
        <section className="mb-36">
          <SectionHeading>Core Expertise</SectionHeading>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div key={f.title} {...stagger(i, .12)}
                whileHover={{ y:-10 }}
                onHoverStart={() => setHoveredFeature(i)}
                onHoverEnd={()   => setHoveredFeature(null)}>
                <div className="group relative h-full overflow-hidden rounded-2xl p-6 transition-shadow duration-300"
                  style={{ background: hoveredFeature===i ? f.grad : 'rgba(255,255,255,.025)', border:`1px solid ${hoveredFeature===i ? f.border : 'rgba(255,255,255,.07)'}`, backdropFilter:'blur(14px)', boxShadow: hoveredFeature===i ? `0 0 40px ${f.accent}22` : 'none', transition:'all .3s ease' }}>

                  <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background:`${f.accent}18`, border:`1px solid ${f.accent}33` }}>
                    <f.icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color:f.accent }} />
                  </div>

                  <h3 className="mb-2 text-base font-bold text-white">{f.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed" style={{ color:'rgba(148,163,184,.75)' }}>{f.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {f.tags.map(t => (
                      <span key={t} className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                        style={{ background:`${f.accent}14`, border:`1px solid ${f.accent}28`, color:f.accent }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{ background:`radial-gradient(circle,${f.accent},transparent)` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* JOURNEY */}
        <section className="mb-36">
          <SectionHeading>Professional Journey</SectionHeading>

          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 hidden sm:block"
              style={{ background:'linear-gradient(to bottom,transparent,#38bdf8,#c084fc,#f472b6,transparent)' }} />

            <div className="space-y-10">
              {journey.map((item, i) => (
                <motion.div key={item.year + item.title}
                  initial={{ opacity:0, x: i%2===0 ? -60 : 60 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true, margin:'-40px' }}
                  transition={{ delay: i*.12, duration:.8, ease:[0.22,1,0.36,1] }}
                  className={`relative flex items-center sm:${i%2===0 ? 'justify-start' : 'justify-end'}`}>

                  <div className={`w-full sm:w-5/12 ${i%2===0 ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:text-left'}`}>
                    <motion.div whileHover={{ scale:1.03 }}
                      className="rounded-2xl p-5 transition-all"
                      style={{ background:'rgba(255,255,255,.03)', backdropFilter:'blur(14px)', border:'1px solid rgba(255,255,255,.08)' }}>
                      <span className="mb-1 block text-2xl font-black" style={{ color:item.color }}>{item.year}</span>
                      <h4 className="mb-1 font-bold text-white">{item.title}</h4>
                      <p className="text-sm" style={{ color:'rgba(148,163,184,.75)' }}>{item.desc}</p>
                    </motion.div>
                  </div>

                  <div className="absolute left-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full sm:flex"
                    style={{ background:`${item.color}20`, border:`2px solid ${item.color}70`, boxShadow:`0 0 24px ${item.color}44` }}>
                    <item.icon className="h-4 w-4" style={{ color:item.color }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="mb-36">
          <SectionHeading>Highlights</SectionHeading>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((a, i) => (
              <motion.div key={a.title} {...stagger(i, .1)} whileHover={{ scale:1.04, y:-5 }}
                className="group relative overflow-hidden rounded-2xl p-6"
                style={{ background:'rgba(255,255,255,.025)', backdropFilter:'blur(14px)', border:'1px solid rgba(255,255,255,.07)' }}>

                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10"
                  style={{ background:`linear-gradient(${a.grad})` }} />

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background:`linear-gradient(${a.grad})` }}>
                  <a.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="mb-1.5 font-bold text-white">{a.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color:'rgba(148,163,184,.75)' }}>{a.desc}</p>

                <div className="absolute -inset-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-[400%] group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section>
          <SectionHeading>By the Numbers</SectionHeading>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...stagger(i, .1)} whileHover={{ scale:1.06 }}
                className="group relative overflow-hidden rounded-2xl p-6 text-center"
                style={{ background:'rgba(255,255,255,.025)', backdropFilter:'blur(14px)', border:'1px solid rgba(255,255,255,.07)' }}>

                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10"
                  style={{ background:`linear-gradient(${s.grad})` }} />

                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background:`linear-gradient(${s.grad})`, opacity:.18 }}>
                </div>
                <s.icon className="absolute left-1/2 top-[1.75rem] h-6 w-6 -translate-x-1/2 text-white/70 transition-transform duration-300 group-hover:scale-110" />

                <div className="mt-4 text-4xl font-black tracking-tight text-white">
                  <Counter to={s.value} />
                </div>
                <div className="mb-0.5 mt-1 text-sm font-medium text-slate-300">{s.label}</div>
                <div className="text-[11px] uppercase tracking-widest" style={{ color:'rgba(125,211,252,.6)' }}>{s.note}</div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(400%)  skewX(-12deg); }
        }
        .group:hover .shine { animation: shimmer .85s ease-in-out; }
        video {
          object-fit: cover; object-position: center;
          filter: brightness(1.02) contrast(1.04) saturate(1.03);
          backface-visibility: hidden; transform: translateZ(0);
        }
      `}</style>
    </section>
  );
}
