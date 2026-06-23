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

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/ShehanHarshaKumara',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/shehan-harsha-183532334/',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: 'mailto:sadunk128@gmail.com',
      label: 'Email',
    },
  ];

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
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
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          >
            <h4 className="mb-5 text-lg font-semibold text-white">Connect With Me</h4>

            <div className="mb-5 flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0.8, y: 16 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-3.5 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:shadow-[0_12px_30px_rgba(34,211,238,0.12)]"
                >
                  <social.icon className="h-5 w-5 text-slate-300 transition-colors duration-300 group-hover:text-cyan-300" />
                </motion.a>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm leading-6 text-slate-400">
                Open for freelance work, collaborations, internships, and new
                opportunities in software engineering and product development.
              </p>
            </div>
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
      `}</style>
    </footer>
  );
}
