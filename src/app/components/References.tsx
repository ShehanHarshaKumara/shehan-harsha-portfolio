import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Pause,
  Play,
  Phone,
  Quote,
  ShieldCheck,
} from 'lucide-react';

type Reference = {
  name: string;
  role: string;
  organization: string;
  shortOrganization: string;
  address?: string[];
  phone?: string;
  phoneHref?: string;
  email?: string;
  color: string;
  initials: string;
};

const references: Reference[] = [
  {
    name: 'A.L.A. Chathura Sudarshana',
    role: 'Director',
    organization: 'CodeXpress IT Solutions',
    shortOrganization: 'CodeXpress',
    address: ['No. 324/5, Divulapitiya Road', 'Naiwala'],
    phone: '+94 77 767 4308',
    phoneHref: '+94777674308',
    color: '#22d3ee',
    initials: 'CS',
  },
  {
    name: 'Shamali Asanthi Kurukulasuriya',
    role: 'Lecturer',
    organization: 'National Institute of Business Management (NIBM), Galle',
    shortOrganization: 'NIBM Galle',
    phone: '+94 71 835 9303',
    phoneHref: '+94718359303',
    email: 'asanthi@nibm.lk',
    color: '#818cf8',
    initials: 'AK',
  },
  {
    name: 'Supun Asanga',
    role: 'Lecturer',
    organization: 'National Institute of Business Management (NIBM), Galle',
    shortOrganization: 'NIBM Galle',
    phone: '+94 77 217 7832',
    phoneHref: '+94772177832',
    email: 'supuna@nibm.lk',
    color: '#c084fc',
    initials: 'SA',
  },
  {
    name: 'Priyashantha De Silva',
    role: 'Director',
    organization: 'Sarasi Computer House (Pvt) Ltd.',
    shortOrganization: 'Sarasi Computer House',
    address: ['No. 489/A, Elpitiya Road', 'Baghawaththa, Ambalangoda'],
    color: '#34d399',
    initials: 'PD',
  },
];

export function References() {
  const [selected, setSelected] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reference = references[selected];

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setSelected((current) => (current + 1) % references.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused, selected]);

  const showPrevious = () => {
    setSelected((current) => (current - 1 + references.length) % references.length);
  };

  const showNext = () => {
    setSelected((current) => (current + 1) % references.length);
  };

  return (
    <section id="references" className="relative isolate overflow-hidden bg-[#02050b] px-4 py-24 text-white sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(6,182,212,.06),transparent_35%,transparent_65%,rgba(139,92,246,.07))]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:100%_80px]" />
        <motion.div
          className="absolute left-[15%] top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px]"
          animate={{ x: [0, 90, 0], y: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-300">
              <ShieldCheck className="h-4 w-4" />
              Verified professional contacts
            </div>
            <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              References<span className="text-cyan-400">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-400">
            Select a contact to view their professional information and reach them directly.
          </p>
        </motion.div>

        <div
          className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#060b14]/85 shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-2xl lg:grid-cols-[360px_1fr]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="border-b border-white/10 bg-black/20 p-3 lg:border-b-0 lg:border-r lg:p-4">
            <div className="mb-3 flex items-center justify-between px-3 py-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-600">Directory</span>
              <span className="flex items-center gap-2 rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                <span className={`h-1.5 w-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'animate-pulse bg-emerald-400'}`} />
                {isPaused ? 'Paused' : 'Auto slide'}
              </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {references.map((item, index) => {
                const active = selected === index;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelected(index)}
                    className="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl px-3 py-3.5 text-left transition-colors sm:px-4"
                    style={{ background: active ? `${item.color}12` : 'transparent' }}
                    aria-pressed={active}
                  >
                    {active && (
                      <motion.span
                        layoutId="reference-active"
                        className="absolute inset-0 rounded-2xl border"
                        style={{ borderColor: `${item.color}35` }}
                        transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                      />
                    )}
                    <span
                      className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xs font-black"
                      style={{ color: item.color, background: `${item.color}16`, border: `1px solid ${item.color}28` }}
                    >
                      {item.initials}
                    </span>
                    <span className="relative min-w-0 flex-1">
                      <span className={`block truncate text-sm font-bold transition-colors ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                        {item.name}
                      </span>
                      <span className="mt-1 block truncate text-[11px] text-slate-600">{item.shortOrganization}</span>
                    </span>
                    <ArrowRight className={`relative h-4 w-4 shrink-0 transition-all ${active ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60'}`} style={{ color: item.color }} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[570px] overflow-hidden p-6 pb-20 sm:p-10 sm:pb-24 lg:p-14 lg:pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={reference.name}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex h-full flex-col"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="grid h-20 w-20 shrink-0 place-items-center rounded-[1.4rem] text-xl font-black shadow-2xl"
                      style={{ color: reference.color, background: `${reference.color}16`, border: `1px solid ${reference.color}35`, boxShadow: `0 18px 50px ${reference.color}12` }}
                    >
                      {reference.initials}
                    </div>
                    <div>
                      <div className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: reference.color }}>
                        <BadgeCheck className="h-3.5 w-3.5" /> Professional reference
                      </div>
                      <p className="text-sm font-semibold text-slate-400">{reference.role}</p>
                    </div>
                  </div>
                  <span className="hidden text-7xl font-black leading-none text-white/[0.035] sm:block">0{selected + 1}</span>
                </div>

                <div className="mt-10 max-w-3xl">
                  <Quote className="mb-5 h-7 w-7" style={{ color: reference.color }} />
                  <h3 className="text-3xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl">
                    {reference.name}
                  </h3>
                  <div className="mt-6 flex items-start gap-3 text-sm leading-7 text-slate-300 sm:text-base">
                    <Building2 className="mt-1.5 h-5 w-5 shrink-0" style={{ color: reference.color }} />
                    {reference.organization}
                  </div>
                </div>

                <div className="mt-auto grid gap-3 pt-10 sm:grid-cols-2">
                  {reference.phone && (
                    <a href={`tel:${reference.phoneHref}`} className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]">
                      <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ color: reference.color, background: `${reference.color}14` }}><Phone className="h-4 w-4" /></span>
                      <span><span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">Phone</span><span className="mt-1 block text-sm font-semibold text-slate-300 group-hover:text-white">{reference.phone}</span></span>
                    </a>
                  )}

                  {reference.email && (
                    <a href={`mailto:${reference.email}`} className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]">
                      <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ color: reference.color, background: `${reference.color}14` }}><Mail className="h-4 w-4" /></span>
                      <span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">Email</span><span className="mt-1 block truncate text-sm font-semibold text-slate-300 group-hover:text-white">{reference.email}</span></span>
                    </a>
                  )}

                  {reference.address && (
                    <div className={`${reference.phone ? '' : 'sm:col-span-2'} flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4`}>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ color: reference.color, background: `${reference.color}14` }}><MapPin className="h-4 w-4" /></span>
                      <span><span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">Address</span><span className="mt-1 block text-sm font-semibold leading-6 text-slate-300">{reference.address.join(', ')}</span></span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              key={`glow-${selected}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full blur-[120px]"
              style={{ background: `${reference.color}18` }}
            />
            <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 border-b border-r border-white/[0.025] [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 sm:bottom-7 sm:right-7">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous reference"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/30 text-slate-400 backdrop-blur-md transition-all hover:border-white/20 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsPaused((paused) => !paused)}
                aria-label={isPaused ? 'Play reference slider' : 'Pause reference slider'}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/30 text-slate-400 backdrop-blur-md transition-all hover:border-white/20 hover:text-white"
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next reference"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/30 text-slate-400 backdrop-blur-md transition-all hover:border-white/20 hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 px-1">
          {references.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`Show ${item.name}`}
              className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]"
            >
              {selected === index && (
                <motion.span
                  key={selected}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
