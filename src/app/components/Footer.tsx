import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

function SocialSpaceCard() {
  const links = [
    { icon: Github, href: 'https://github.com/ShehanHarshaKumara', label: 'GitHub', color: '#f8fafc' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/shehan-harsha-183532334/', label: 'LinkedIn', color: '#60a5fa' },
    { icon: Mail, href: 'mailto:sadunk128@gmail.com', label: 'Email', color: '#67e8f9' },
  ];

  return (
    <div className="footer-space-card">
      <div className="footer-space-stars" />
      <span className="footer-shooting-star footer-shooting-star-one" />
      <span className="footer-shooting-star footer-shooting-star-two" />
      <img src="https://uiverse.io/astronaut.png" alt="Floating astronaut" className="footer-astronaut" />
      <div className="footer-space-heading">Connect With Me</div>
      <p className="footer-space-copy">Let&apos;s build something meaningful together.</p>
      <div className="footer-space-icons">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.label !== 'Email' ? '_blank' : undefined}
            rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
            aria-label={link.label}
            style={{ '--social-color': link.color } as React.CSSProperties}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </a>
        ))}
      </div>
      <div className="footer-space-status"><span /> Available for collaboration</div>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Education', id: 'education' },
    { name: 'Skills', id: 'skills' },
    { name: 'References', id: 'references' },
    { name: 'Contact', id: 'contact' },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030712] px-4 py-14 md:px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.06]" />
        <div className="absolute left-[8%] top-[-60px] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-80px] right-[10%] h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent,rgba(255,255,255,0.01))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Top Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr]"
        >
          {/* Brand Card */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium tracking-wide text-cyan-300">
              <Sparkles className="h-4 w-4" />
              Portfolio Footer
            </div>

            <h3 className="mb-4 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-2xl font-extrabold text-transparent md:text-3xl">
              Shehan Harsha Kumara
            </h3>

            <p className="max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              Software Engineer passionate about crafting modern digital
              experiences, scalable applications, and intelligent solutions with
              clean design, performance, and real-world impact.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                React
              </span>
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                Flutter
              </span>
              <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                Node.js
              </span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                UI/UX
              </span>
            </div>
          </motion.div>

          {/* Quick Links Card */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          >
            <h4 className="mb-5 text-lg font-semibold text-white">Quick Links</h4>

            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="group flex w-full items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-left text-slate-400 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-300"
                >
                  <span>{link.name}</span>
                  <ExternalLink className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Connect Card */}
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6 }}
            className="h-full min-w-0"
          >
            <SocialSpaceCard />
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-col gap-2">
            <p className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 fill-red-500 text-red-500 animate-pulse" />
              <span>by Shehan Harsha Kumara</span>
            </p>

            <p className="text-xs text-slate-500">
              © {currentYear} All rights reserved. Designed and developed with a
              modern dark-tech aesthetic.
            </p>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 px-5 py-3 text-sm font-medium text-blue-300 shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-200 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent);
        }
        .footer-space-card {
          position:relative;
          width:100%;
          height:100%;
          min-height:25rem;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:.85rem;
          overflow:hidden;
          border:1px solid rgba(255,255,255,.1);
          border-radius:1.5rem;
          padding:1.5rem;
          color:#fff;
          background:radial-gradient(circle at 50% 48%,rgba(139,92,246,.18),transparent 28%),#090b12;
          box-shadow:0 10px 40px rgba(0,0,0,.3);
          isolation:isolate;
        }
        .footer-space-card::before {
          content:"";
          position:absolute;
          width:12rem;
          height:12rem;
          left:50%;
          top:46%;
          transform:translate(-50%,-50%);
          border-radius:50%;
          background:#f8fafc;
          box-shadow:0 0 90px rgba(193,119,241,.75),0 0 150px rgba(135,42,211,.5),inset 0 0 40px -12px #9b40fc;
          z-index:-2;
          transition:.5s ease;
        }
        .footer-space-card:hover::before { box-shadow:0 0 150px rgba(193,119,241,.9),0 0 220px rgba(135,42,211,.7),inset 0 0 40px -12px #9b40fc; }
        .footer-space-card::after {
          content:"";
          position:absolute;
          inset:2px;
          border-radius:calc(1.5rem - 2px);
          background:rgba(10,11,18,.74);
          z-index:-1;
          backdrop-filter:blur(5px);
        }
        .footer-space-stars,.footer-space-stars::before,.footer-space-stars::after {
          position:absolute;
          inset:0;
          content:"";
          background-image:radial-gradient(circle,#fff 1px,transparent 1.5px);
          background-size:43px 43px;
          opacity:.28;
          animation:footerStars 1.8s linear infinite alternate;
          z-index:-1;
        }
        .footer-space-stars::before { transform:translate(18px,12px); background-size:67px 67px; animation-delay:.5s; }
        .footer-space-stars::after { transform:translate(-12px,25px); background-size:89px 89px; animation-delay:1s; }
        .footer-astronaut {
          width:10.5rem;
          max-width:70%;
          z-index:2;
          user-select:none;
          animation:footerAstronautMove 10s ease-in-out infinite;
          filter:drop-shadow(0 18px 24px rgba(0,0,0,.35));
        }
        .footer-astronaut:hover { cursor:grab; }
        .footer-astronaut:active { cursor:grabbing; }
        .footer-space-heading { z-index:2; font-size:1.05rem; font-weight:800; letter-spacing:.01em; transition:.35s ease; }
        .footer-space-card:hover .footer-space-heading { letter-spacing:.05em; }
        .footer-space-copy { z-index:2; max-width:15rem; text-align:center; color:#94a3b8; font-size:.75rem; line-height:1.5; }
        .footer-space-icons { z-index:3; display:grid; grid-template-columns:repeat(3,1fr); gap:.55rem; width:100%; margin-top:.25rem; }
        .footer-space-icons a {
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:.35rem;
          border:1px solid rgba(255,255,255,.09);
          border-radius:.85rem;
          padding:.7rem .35rem;
          color:#94a3b8;
          background:rgba(255,255,255,.035);
          transition:.3s ease;
        }
        .footer-space-icons a span { font-size:.58rem; font-weight:700; text-transform:uppercase; letter-spacing:.08em; }
        .footer-space-icons a:hover { color:var(--social-color); border-color:color-mix(in srgb,var(--social-color) 40%,transparent); background:rgba(255,255,255,.07); transform:translateY(-4px) scale(1.03); box-shadow:0 10px 28px rgba(0,0,0,.25); }
        .footer-space-status { z-index:2; display:flex; align-items:center; gap:.45rem; margin-top:.25rem; color:#64748b; font-size:.58rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; }
        .footer-space-status span { width:6px; height:6px; border-radius:50%; background:#34d399; box-shadow:0 0 8px #34d399; animation:footerStatusPulse 1.5s ease-in-out infinite; }
        .footer-shooting-star { position:absolute; width:5rem; height:1px; background:linear-gradient(90deg,#fff,transparent); rotate:-45deg; z-index:1; animation:footerShootingStar 5s ease-in-out infinite; }
        .footer-shooting-star-one { right:-5rem; top:20%; }
        .footer-shooting-star-two { right:-7rem; top:48%; animation-delay:2.5s; }
        @keyframes footerAstronautMove { 0%,100% { transform:translate(0,0) rotate(0); } 25% { transform:translate(-.75rem,-.75rem) rotate(-8deg); } 50% { transform:translate(-.65rem,.6rem); } 75% { transform:translate(.75rem,-.9rem) rotate(8deg); } }
        @keyframes footerStars { from { opacity:.14; } to { opacity:.48; } }
        @keyframes footerShootingStar { 0% { transform:translate(0,0); opacity:0; } 15% { opacity:1; } 65% { transform:translate(-34rem,0); opacity:1; } 80%,100% { transform:translate(-42rem,0); opacity:0; } }
        @keyframes footerStatusPulse { 0%,100% { opacity:.4; transform:scale(.8); } 50% { opacity:1; transform:scale(1.2); } }
        @media (prefers-reduced-motion:reduce) { .footer-astronaut,.footer-space-stars,.footer-space-stars::before,.footer-space-stars::after,.footer-shooting-star,.footer-space-status span { animation:none !important; } }
      `}</style>
    </footer>
  );
}
