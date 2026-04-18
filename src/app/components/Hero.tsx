import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ArrowDown,
  Code2,
  Terminal,
  Sparkles,
  FileText as Resume,
  ExternalLink,
} from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { RESUME_URL } from '../constants/links';

// ─── Social data ──────────────────────────────────────────────
interface Social {
  icon: React.ElementType;
  href: string;
  label: string;
  handle: string;
  accent: string;       // border / glow color (CSS hex)
  accentText: string;   // text color on hover
  darkBg: string;       // icon bg on hover
  orbitColor: string;   // spinning ring color
}

const socials: Social[] = [
  {
    icon: Github,
    href: 'https://github.com/ShehanHarshaKumara',
    label: 'GitHub',
    handle: 'ShehanHarshaKumara',
    accent: '#30363d',
    accentText: '#e6edf3',
    darkBg: '#161b22',
    orbitColor: '#30363d',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/shehan-harsha-183532334',
    label: 'LinkedIn',
    handle: 'Shehan Harsha',
    accent: '#0a66c2',
    accentText: '#5ba4f5',
    darkBg: '#0a1628',
    orbitColor: '#0a66c2',
  },
  {
    icon: Mail,
    href: 'mailto:sadunk128@gmail.com',
    label: 'Email',
    handle: 'sadunk128@gmail.com',
    accent: '#0891b2',
    accentText: '#22d3ee',
    darkBg: '#0c1f26',
    orbitColor: '#0891b2',
  },
  {
    icon: Resume,
    href: RESUME_URL,
    label: 'Resume',
    handle: 'View / Download',
    accent: '#6d28d9',
    accentText: '#a78bfa',
    darkBg: '#13082b',
    orbitColor: '#6d28d9',
  },
];

// ─── Orbital icon button ───────────────────────────────────────
function OrbitalIcon({ social, index }: { social: Social; index: number }) {
  const { icon: Icon, href, label, accent, accentText, darkBg, orbitColor } = social;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, scale: 0.6, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.9 + index * 0.1, duration: 0.45, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.94 }}
      className="group relative w-14 h-14 flex items-center justify-center"
      style={{ outline: 'none' }}
    >
      {/* Spinning orbit ring */}
      <span
        className="absolute inset-[-7px] rounded-full border border-dashed opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          borderColor: orbitColor,
          animation: 'hero-spin 7s linear infinite',
        }}
      />

      {/* Outer glow ring */}
      <span
        className="absolute inset-0 rounded-full border border-white/10 transition-all duration-300 group-hover:scale-105"
        style={{
          boxShadow: `0 0 0 0 ${accent}00`,
        }}
      />

      {/* Icon background */}
      <span
        className="absolute inset-[3px] rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: '#0f172a',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* hover bg via inline style swap handled by CSS variable trick */}
      </span>

      {/* Actual icon */}
      <Icon
        className="relative z-10 w-5 h-5 transition-all duration-300"
        style={{ color: '#475569' }}
        // CSS can't conditionally swap here — use a wrapper data attr trick below
      />

      {/* Tooltip */}
      <span
        className="absolute -bottom-7 text-[9px] tracking-[0.18em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
        style={{ color: accentText }}
      >
        {label}
      </span>

      {/* Hover overlay using ::after via inline style — we use a pseudo overlay div */}
      <span
        className="absolute inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-[5]"
        style={{ background: darkBg, border: `1px solid ${accent}` }}
      />
      <Icon
        className="absolute z-10 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
        style={{ color: accentText }}
      />
    </motion.a>
  );
}

// ─── Profile card ──────────────────────────────────────────────
function SocialCard({ social, index }: { social: Social; index: number }) {
  const { icon: Icon, href, label, handle, accent, accentText, darkBg } = social;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 + index * 0.08, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative flex flex-col items-center gap-3 w-40 p-5 rounded-2xl no-underline overflow-hidden"
      style={{
        background: '#0f172a',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Hover border glow */}
      <span
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ border: `1px solid ${accent}`, boxShadow: `0 0 20px ${accent}33` }}
      />

      {/* Arrow indicator */}
      <ExternalLink
        className="absolute top-3 right-3 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ color: accent }}
      />

      {/* Icon box */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          background: '#1e293b',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <span
          className="absolute w-11 h-11 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: darkBg, border: `1px solid ${accent}` }}
        />
        <Icon
          className="relative z-10 w-[18px] h-[18px] transition-colors duration-300"
          style={{ color: '#475569' }}
        />
        <Icon
          className="absolute z-10 w-[18px] h-[18px] opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ color: accentText }}
        />
      </div>

      {/* Text */}
      <div className="text-center relative z-10">
        <p
          className="text-xs tracking-wide transition-colors duration-300 group-hover:font-medium"
          style={{ color: '#64748b', fontFamily: 'monospace' }}
        >
          {label}
        </p>
        <p
          className="text-[10px] mt-1 truncate max-w-[120px] transition-colors duration-300 opacity-0 group-hover:opacity-100"
          style={{ color: accentText }}
        >
          {handle}
        </p>
      </div>
    </motion.a>
  );
}

// ─── Hero ──────────────────────────────────────────────────────
export function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const heroVideo = new URL('../../assets/videos/my video2.mp4', import.meta.url).href;
  const heroImage = new URL('../../assets/images/IMG2.jpeg', import.meta.url).href;

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">

      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#071129] to-black opacity-90" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="text-center lg:text-left"
          >
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">Available for Freelance</span>
            </motion.div>

            {/* Name */}
            <div className="mb-4">
              <TypeAnimation
                sequence={['Shehan Harsha Kumara', 2000]}
                wrapper="h1"
                speed={45}
                repeat={Infinity}
                cursor
                className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text md:text-6xl lg:text-7xl"
              />
            </div>

            {/* Role */}
            <div className="mb-6 min-h-[70px]">
              <TypeAnimation
                sequence={[
                  'Software Engineer', 2000,
                  'Full Stack Developer', 2000,
                  'UI/UX Designer', 2000,
                  'Creative Problem Solver', 2000,
                ]}
                wrapper="h2"
                speed={50}
                repeat={Infinity}
                className="text-xl font-semibold text-white md:text-3xl"
              />
            </div>

            {/* Bio */}
            <motion.p
              className="mb-10 max-w-xl text-lg text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              I’m a Software Engineering undergraduate passionate about building modern web,
              mobile, and IoT applications. I specialize in creating responsive user interfaces,
              scalable backend systems, and smart digital solutions using technologies such as
              React, Flutter, Node.js, and MySQL.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="mb-10 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-600 px-7 py-4 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  <Code2 className="h-5 w-5" />
                  View Projects
                </span>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="rounded-full border border-cyan-400/40 bg-white/5 px-7 py-4 font-semibold text-cyan-300 transition hover:bg-cyan-500/10"
              >
                <span className="flex items-center justify-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Get in Touch
                </span>
              </button>
            </motion.div>

            {/* ── SOCIAL ICONS — Orbital variant ── */}
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start mb-2">
              {socials.map((s, i) => (
                <OrbitalIcon key={s.label} social={s} index={i} />
              ))}
            </div>

            {/* ── SOCIAL CARDS — uncomment to use card layout instead ──
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-6">
              {socials.map((s, i) => (
                <SocialCard key={s.label} social={s} index={i} />
              ))}
            </div>
            */}
          </motion.div>

          {/* RIGHT — Video */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-end"
          >
            <div className="video-container w-full max-w-[760px]">
              <video
                className="hero-video object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="h-6 w-6 text-blue-400" />
      </motion.div>

      {/* ── Styles ── */}
      <style>{`
        /* Video layout */
        .hero-video {
          width: clamp(100%, 135%, 145%);
          height: auto;
          max-height: 80vh;
          transform: translateX(-12%);
          display: block;
        }
        .video-container {
          transform: translateX(220px);
          overflow: visible;
        }
        @media (max-width: 1280px) {
          .hero-video { width: 125%; transform: translateX(-10%); }
          .video-container { transform: translateX(140px); }
        }
        @media (max-width: 1024px) {
          .video-container { transform: translateX(0); }
          .hero-video { width: 100%; max-height: 70vh; transform: translateX(0); }
        }

        /* Orbital spin keyframe */
        @keyframes hero-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
