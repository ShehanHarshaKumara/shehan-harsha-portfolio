/**
 * Contact.tsx — Fixed Edition (Web3Forms)
 *
 * ✅ Web3Forms replaces EmailJS — no npm install, no complex setup
 * ✅ Get your free key at https://web3forms.com → enter sadunk128@gmail.com
 * ✅ Paste key into WEB3FORMS_ACCESS_KEY below — done!
 * ✅ All original UI preserved
 */

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  useState, useRef,
  MouseEvent as ReactMouseEvent,
} from 'react';
import {
  Mail, MapPin, Phone, Send, MessageSquare,
  Loader2, CheckCircle2, AlertCircle, Github,
  Linkedin, ExternalLink, Clock, Copy, Check,
  ArrowUpRight,
} from 'lucide-react';

// ─── Assets ──────────────────────────────────────────────────────────────────
const contactBg = new URL('../../assets/images/IMG1.png', import.meta.url).href;

// ════════════════════════════════════════════
//  🔑 PASTE YOUR WEB3FORMS KEY HERE
//  Get it free at https://web3forms.com
//  Enter sadunk128@gmail.com → Create Access Key
// ════════════════════════════════════════════
const WEB3FORMS_ACCESS_KEY = '83fe5bfc-3792-43fe-9cb2-85a6c26a47b7';
// ════════════════════════════════════════════

const CONTACT_EMAIL     = 'sadunk128@gmail.com';
const CONTACT_PHONE     = '+94 76 917 5501';
const CONTACT_PHONE_RAW = '+94769175501';
const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d80.11622!3d6.17311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnMjMuMiJOIDgwwrogMDYnNTguNCJF!5e0!3m2!1sen!2slk!4v1700000000000';

// ─── Spotlight wrapper ────────────────────────────────────────────────────────
function Spotlight({
  children, accent = '#22d3ee', radius = 320, style = {},
}: {
  children: React.ReactNode;
  accent?: string;
  radius?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState({ x: 0, y: 0, on: false });
  const onMove = (e: ReactMouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setP({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  };
  return (
    <div ref={ref} onMouseMove={onMove}
      onMouseLeave={() => setP(s => ({ ...s, on: false }))}
      style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {p.on && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: `radial-gradient(${radius}px circle at ${p.x}px ${p.y}px, ${accent}16, transparent 70%)`,
        }} />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ─── Copy button ──────────────────────────────────────────────────────────────
function CopyBtn({ value }: { value: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };
  return (
    <button onClick={copy} title="Copy"
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl transition-all active:scale-90"
      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <AnimatePresence mode="wait">
        {done
          ? <motion.div key="y" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            </motion.div>
          : <motion.div key="n" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Copy className="h-3.5 w-3.5" style={{ color: 'rgba(148,163,184,.55)' }} />
            </motion.div>
        }
      </AnimatePresence>
    </button>
  );
}

// ─── Form input / textarea ────────────────────────────────────────────────────
function Field({
  label, id, name, type = 'text', value, onChange,
  placeholder, error, rows, maxLen, accent, required = true,
}: {
  label: string; id: string; name: string; type?: string;
  value: string; onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder: string; error?: string; rows?: number; maxLen?: number;
  accent: string; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const common = {
    id, name, value, onChange, required, placeholder,
    onFocus: () => setFocused(true),
    onBlur:  () => setFocused(false),
    maxLength: maxLen,
    style: {
      width: '100%',
      padding: rows ? '14px 16px' : '12px 16px',
      background: focused ? 'rgba(255,255,255,.065)' : 'rgba(255,255,255,.04)',
      border: `1.5px solid ${error ? 'rgba(248,113,113,.6)' : focused ? `${accent}70` : 'rgba(255,255,255,.09)'}`,
      borderRadius: '14px',
      color: '#f1f5f9',
      fontSize: '14px',
      outline: 'none',
      resize: rows ? ('none' as const) : undefined,
      transition: 'border .22s, background .22s, box-shadow .22s',
      boxShadow: focused
        ? `0 0 0 3px ${error ? 'rgba(248,113,113,.1)' : `${accent}14`}`
        : 'none',
      fontFamily: "'DM Sans', sans-serif",
    } as React.CSSProperties,
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-white">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {maxLen && rows && (
          <span className="text-[11px] tabular-nums"
            style={{ color: value.length > maxLen * 0.85 ? '#fbbf24' : 'rgba(148,163,184,.4)' }}>
            {value.length}/{maxLen}
          </span>
        )}
      </div>
      {rows
        ? <textarea {...common} rows={rows} />
        : <input   {...common} type={type} />
      }
      <AnimatePresence>
        {error && (
          <motion.p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />{error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function Contact() {
  const { ref, inView } = useInView({ threshold: 0.04, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);

  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const accent = '#22d3ee';

  // Parallax on background image
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = 'Your name is required.';
    if (!form.email.trim())   e.email   = 'Email address is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.subject.trim()) e.subject = 'Subject is required.';
    if (!form.message.trim()) e.message = 'Message is required.';
    else if (form.message.length < 10)          e.message = 'At least 10 characters please.';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => { const c = { ...er }; delete c[name]; return c; });
  };

  // ── FIXED: Web3Forms submit — no npm install needed ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }



    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name:       form.name,
          email:      form.email,
          subject:    `[Portfolio Contact] ${form.subject}`,
          message:    form.message,
          // Optional: keeps spam bots out
          botcheck:   '',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        console.error('Web3Forms error:', data);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4500);
      }
    } catch (err) {
      console.error('Network error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4500);
    }
  };

  // ── Data ──
  const cards = [
    {
      icon: Mail,   label: 'Email',            value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,          sub: 'Reply within 24 hours',
      accent: '#22d3ee', copy: true,
    },
    {
      icon: Phone,  label: 'Phone / WhatsApp', value: CONTACT_PHONE,
      href: `tel:${CONTACT_PHONE_RAW}`,         sub: 'Mon – Sat  9 AM – 8 PM',
      accent: '#34d399', copy: true,
    },
    {
      icon: MapPin, label: 'Location',          value: 'Aluthwala, Galle, Sri Lanka',
      href: 'https://maps.google.com/?q=6.17311,80.11622',
      sub: '6°10\'23.2"N  80°06\'58.4"E',
      accent: '#818cf8', copy: false,
    },
  ];

  const socials = [
    {
      icon: Github,   label: 'GitHub',
      href: 'https://github.com/ShehanHarshaKumara',
      color: '#e2e8f0', bg: 'rgba(226,232,240,.1)',
    },
    {
      icon: Linkedin, label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/shehan-harsha-183532334/',
      color: '#60a5fa', bg: 'rgba(96,165,250,.1)',
    },
    {
      icon: Mail,     label: 'Gmail',
      href: `mailto:${CONTACT_EMAIL}`,
      color: '#f87171', bg: 'rgba(248,113,113,.1)',
    },
  ];

  const btnStyle: React.CSSProperties = {
    background:
      status === 'success' ? 'linear-gradient(135deg,#059669,#10b981)' :
      status === 'error'   ? 'linear-gradient(135deg,#dc2626,#ef4444)' :
                             'linear-gradient(135deg,#0ea5e9,#6366f1)',
    boxShadow:
      status === 'success' ? '0 0 28px rgba(16,185,129,.4)' :
      status === 'error'   ? '0 0 28px rgba(239,68,68,.4)'  :
                             '0 0 28px rgba(99,102,241,.38)',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden text-white"
    >
      {/* ══════════════════════════════════════════
          BACKGROUND LAYER
      ══════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.img
          src={contactBg}
          alt=""
          style={{ y: bgY }}
          className="h-full w-full scale-110 object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg,rgba(2,8,23,.94) 0%,rgba(3,12,30,.92) 50%,rgba(2,8,23,.94) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: '200px 200px',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.7) 1px,transparent 1px)',
            backgroundSize: '68px 68px',
          }}
        />
        <motion.div
          className="absolute -right-20 top-[4%] h-[520px] w-[520px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(34,211,238,.10) 0%,transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 22, repeat: Infinity }}
        />
        <motion.div
          className="absolute -left-20 bottom-[8%] h-[480px] w-[480px] rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(129,140,248,.10) 0%,transparent 70%)' }}
          animate={{ scale: [1, 1.16, 1] }}
          transition={{ duration: 26, repeat: Infinity, delay: 6 }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(244,114,182,.06) 0%,transparent 70%)' }}
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 18, repeat: Infinity, delay: 3 }}
        />
      </div>

      {/* ══════════════════════════════════════════
          CONTENT
      ══════════════════════════════════════════ */}
      <div
        ref={ref}
        className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-16"
      >

        {/* ── Header ── */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ scale: .88, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: .1 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[.18em]"
            style={{ background: 'rgba(34,211,238,.07)', border: '1px solid rgba(34,211,238,.22)', color: '#22d3ee' }}
          >
            <MessageSquare className="h-3.5 w-3.5 flex-shrink-0" /> Let's Connect
          </motion.div>

          <h2
            className="mb-4 font-black leading-[.92] tracking-tight"
            style={{ fontSize: 'clamp(2.2rem,7vw,4.8rem)', fontFamily: "'Outfit',sans-serif" }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg,#e0f2fe 0%,#22d3ee 35%,#818cf8 70%,#f472b6 100%)' }}
            >
              Get In Touch
            </span>
          </h2>

          <p
            className="mx-auto max-w-xl px-2 text-sm leading-relaxed"
            style={{ color: 'rgba(148,163,184,.65)', fontFamily: "'DM Sans',sans-serif" }}
          >
            Have a project in mind or just want to say hi? I reply within 24 hours —
            let's build something great together.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_390px] xl:grid-cols-[1fr_410px]">

          {/* ════ FORM ════ */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .8, delay: .2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Spotlight accent={accent} style={{ borderRadius: '20px' }}>
              <div
                className="rounded-[20px] p-6 sm:p-8"
                style={{
                  background: 'rgba(3,9,20,.72)',
                  border: '1px solid rgba(255,255,255,.09)',
                  backdropFilter: 'blur(24px)',
                }}
              >
                {/* Card header */}
                <div className="mb-7 flex flex-wrap items-center gap-3">
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: 'rgba(34,211,238,.14)', border: '1px solid rgba(34,211,238,.3)' }}
                  >
                    <Send className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <h3
                      className="text-base font-black text-white sm:text-lg"
                      style={{ fontFamily: "'Outfit',sans-serif" }}
                    >
                      Send a Message
                    </h3>
                    <p className="text-[11px]" style={{ color: 'rgba(148,163,184,.5)' }}>
                      Goes straight to <span style={{ color: '#22d3ee' }}>{CONTACT_EMAIL}</span>
                    </p>
                  </div>
                  {/* Live badge */}
                  <div
                    className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5"
                    style={{ background: 'rgba(52,211,153,.12)', border: '1px solid rgba(52,211,153,.3)' }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400">Available</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Row 1 — name + email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Your Name" id="name" name="name" value={form.name}
                      onChange={handleChange} placeholder="Shehan Harsha"
                      error={errors.name} accent={accent}
                    />
                    <Field
                      label="Email Address" id="email" name="email" type="email"
                      value={form.email} onChange={handleChange} placeholder="you@example.com"
                      error={errors.email} accent={accent}
                    />
                  </div>

                  {/* Subject */}
                  <div className="mt-5">
                    <Field
                      label="Subject" id="subject" name="subject" value={form.subject}
                      onChange={handleChange} placeholder="Freelance project / Collaboration / Hello!"
                      error={errors.subject} accent={accent}
                    />
                  </div>

                  {/* Message */}
                  <div className="mt-5">
                    <Field
                      label="Message" id="message" name="message" value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, deadline, budget — or just say hi 👋"
                      error={errors.message} accent={accent} rows={6} maxLen={800}
                    />
                  </div>

                  {/* Submit */}
                  <div className="mt-7">
                    <motion.button
                      type="submit"
                      disabled={status === 'sending' || status === 'success'}
                      whileHover={status === 'idle' ? { scale: 1.02, y: -2 } : {}}
                      whileTap={status === 'idle' ? { scale: .98 } : {}}
                      className="group relative w-full overflow-hidden rounded-xl py-4 text-sm font-bold text-white disabled:cursor-not-allowed"
                      style={btnStyle}
                    >
                      {status === 'idle' && (
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'linear-gradient(135deg,#22d3ee99,#8b5cf6aa)' }}
                        />
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-2.5">
                        <AnimatePresence mode="wait">
                          {status === 'idle' && (
                            <motion.span key="i" className="flex items-center gap-2.5"
                              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                              <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                              Send Message
                            </motion.span>
                          )}
                          {status === 'sending' && (
                            <motion.span key="s" className="flex items-center gap-2.5"
                              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                            </motion.span>
                          )}
                          {status === 'success' && (
                            <motion.span key="ok" className="flex items-center gap-2.5"
                              initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .8 }}>
                              <CheckCircle2 className="h-4 w-4" /> Message Sent!
                            </motion.span>
                          )}
                          {status === 'error' && (
                            <motion.span key="err" className="flex items-center gap-2.5"
                              initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .8 }}>
                              <AlertCircle className="h-4 w-4" /> Failed — Try Again
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </motion.button>

                    {/* Success message */}
                    <AnimatePresence>
                      {status === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 rounded-xl px-4 py-3 text-sm text-emerald-300"
                          style={{ background: 'rgba(16,185,129,.1)', border: '1px solid rgba(16,185,129,.25)' }}
                        >
                          🎉 Thanks! Your message was sent to <strong>{CONTACT_EMAIL}</strong>. I'll reply soon!
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Error message */}
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 rounded-xl px-4 py-3 text-sm text-red-300"
                          style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)' }}
                        >
                          ❌ Something went wrong. Please check your connection and try again.
                        </motion.div>
                      )}
                    </AnimatePresence>


                  </div>
                </form>
              </div>
            </Spotlight>
          </motion.div>

          {/* ════ RIGHT PANEL ════ */}
          <motion.div
            className="flex flex-col gap-5 lg:sticky lg:top-8 lg:self-start"
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .8, delay: .32, ease: [0.22, 1, 0.36, 1] }}
          >

            {/* Contact cards */}
            {cards.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * .1 + .42, duration: .5 }}
              >
                <Spotlight accent={c.accent} style={{ borderRadius: '16px' }}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    className="group relative overflow-hidden rounded-2xl p-4 sm:p-5"
                    style={{
                      background: 'rgba(3,9,20,.72)',
                      border: '1px solid rgba(255,255,255,.08)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg,transparent,${c.accent},transparent)` }}
                    />
                    <div className="flex items-center gap-3.5">
                      <div
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${c.accent}1a`, border: `1px solid ${c.accent}35` }}
                      >
                        <c.icon className="h-5 w-5" style={{ color: c.accent }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[10px] font-black uppercase tracking-widest mb-0.5"
                          style={{ color: 'rgba(148,163,184,.4)' }}
                        >
                          {c.label}
                        </p>
                        <a
                          href={c.href}
                          target={c.label === 'Location' ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-white block truncate transition-colors duration-200 hover:text-cyan-300"
                        >
                          {c.value}
                        </a>
                        <p className="text-[11px] mt-0.5" style={{ color: 'rgba(148,163,184,.38)' }}>
                          {c.sub}
                        </p>
                      </div>
                      {c.copy && <CopyBtn value={c.value} />}
                    </div>
                  </motion.div>
                </Spotlight>
              </motion.div>
            ))}

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: .75, duration: .55 }}
              className="overflow-hidden rounded-2xl"
              style={{ border: '1px solid rgba(255,255,255,.09)', background: 'rgba(3,9,20,.72)', backdropFilter: 'blur(20px)' }}
            >
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-violet-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-white">Aluthwala, Sri Lanka</span>
                </div>
                <a
                  href="https://maps.google.com/?q=6.17311,80.11622"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Open <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="relative" style={{ height: 220 }}>
                <iframe
                  title="Shehan location"
                  src={MAP_EMBED}
                  width="100%" height="100%"
                  style={{
                    border: 0, display: 'block',
                    filter: 'invert(.9) hue-rotate(185deg) saturate(.75) brightness(.85)',
                  }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
                <div
                  style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'linear-gradient(to bottom,transparent 60%,rgba(3,8,15,.65) 100%)',
                  }}
                />
              </div>
            </motion.div>

            {/* Availability banner */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: .86, duration: .5 }}
              className="relative overflow-hidden rounded-2xl p-5 sm:p-6"
              style={{
                background: 'linear-gradient(135deg,rgba(14,165,233,.18) 0%,rgba(99,102,241,.18) 100%)',
                border: '1px solid rgba(99,102,241,.3)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <motion.div
                className="absolute -top-10 -right-10 h-32 w-32 rounded-full"
                style={{ background: 'radial-gradient(circle,rgba(99,102,241,.3),transparent)' }}
                animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full"
                style={{ background: 'radial-gradient(circle,rgba(34,211,238,.22),transparent)' }}
                animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 8, repeat: Infinity }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                    Currently Available
                  </span>
                </div>
                <h3
                  className="text-base font-black text-white sm:text-lg"
                  style={{ fontFamily: "'Outfit',sans-serif" }}
                >
                  Open for Freelance &amp; Collaboration
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-300 sm:text-sm sm:leading-6">
                  Looking for exciting projects in web, mobile, or IoT. Let's build something amazing!
                </p>
                <div
                  className="mt-4 flex items-center gap-2 text-[11px]"
                  style={{ color: 'rgba(148,163,184,.55)' }}
                >
                  <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                  Response time: usually within 24 hours
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: .94, duration: .48 }}
              className="grid grid-cols-3 gap-3"
            >
              {socials.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.07 }}
                  whileTap={{ scale: .94 }}
                  className="group flex flex-col items-center gap-2 rounded-2xl py-4 text-center transition-all duration-300"
                  style={{
                    background: s.bg,
                    border: `1px solid ${s.color}25`,
                    backdropFilter: 'blur(16px)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${s.color}55`;
                    (e.currentTarget as HTMLElement).style.background   = s.bg.replace('.1)', '.18)');
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${s.color}25`;
                    (e.currentTarget as HTMLElement).style.background   = s.bg;
                  }}
                >
                  <s.icon
                    className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: s.color }}
                  />
                  <span
                    className="text-[11px] font-bold uppercase tracking-wide"
                    style={{ color: s.color }}
                  >
                    {s.label}
                  </span>
                  <ArrowUpRight
                    className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: s.color }}
                  />
                </motion.a>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        #contact { scroll-margin-top: 80px; }
        input, textarea { font-family: 'DM Sans', sans-serif !important; }
        input::placeholder, textarea::placeholder { color: rgba(148,163,184,.27) !important; }
        @media (max-width: 640px) { button, a { -webkit-tap-highlight-color: transparent; } }
      `}</style>
    </section>
  );
}