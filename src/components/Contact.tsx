import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMail, FiSend, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi'

interface FormState {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const mailto = `mailto:shehan.harsha@example.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.email)}`
    window.location.href = mailto
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-900/50 rounded-xl text-blue-400">
                  <FiMail size={20} />
                </div>
                <div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider">Email</div>
                  <div className="text-white font-medium">shehan.harsha@example.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-900/50 rounded-xl text-cyan-400">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider">Location</div>
                  <div className="text-white font-medium">Sri Lanka 🇱🇰</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <p className="text-slate-400 text-sm mb-4">Find me on:</p>
              <div className="flex gap-4">
                {[
                  { icon: FiGithub, href: 'https://github.com/ShehanHarshaKumara', label: 'GitHub' },
                  { icon: FiLinkedin, href: 'https://linkedin.com/in/shehan-harsha', label: 'LinkedIn' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    <Icon size={16} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 space-y-4"
          >
            <div>
              <label className="block text-slate-400 text-sm mb-2" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow"
            >
              {submitted ? '✓ Message Sent!' : <><FiSend /> Send Message</>}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
