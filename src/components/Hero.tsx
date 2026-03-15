import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiDownload, FiMail } from 'react-icons/fi'

const roles = [
  'Full Stack Developer',
  'Software Engineer',
  'React Enthusiast',
  'Problem Solver',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, charIndex + 1))
        setCharIndex((c) => c + 1)
      }, 80)
    } else if (!deleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, charIndex - 1))
        setCharIndex((c) => c - 1)
      }, 40)
    } else if (deleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setDeleting(false)
        setRoleIndex((i) => (i + 1) % roles.length)
      }, 0)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, roleIndex])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-cyan-400 font-mono text-sm sm:text-base mb-4 tracking-widest">
            👋 Hello, I'm
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Shehan Harsha
            </span>
            <br />
            <span className="text-white">Kumara</span>
          </h1>
          <div className="h-10 sm:h-12 flex items-center justify-center mb-8">
            <span className="text-xl sm:text-2xl text-slate-400 font-mono">
              {displayed}
              <span className="animate-pulse text-cyan-400">|</span>
            </span>
          </div>
          <p className="max-w-xl mx-auto text-slate-400 text-base sm:text-lg mb-10 leading-relaxed">
            Passionate full-stack developer with expertise in React, Node.js, and cloud technologies.
            I love building beautiful, performant web applications and solving complex problems.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full font-semibold text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
            >
              <FiMail /> Contact Me
            </motion.a>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 border border-slate-600 rounded-full font-semibold text-slate-300 hover:border-cyan-500 hover:text-cyan-400 transition-colors"
            >
              <FiDownload /> Download CV
            </motion.a>
          </div>
          <div className="flex gap-6 justify-center mt-10">
            {[
              { icon: FiGithub, href: 'https://github.com/ShehanHarshaKumara', label: 'GitHub' },
              { icon: FiLinkedin, href: 'https://linkedin.com/in/shehan-harsha', label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#06b6d4' }}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label={label}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600"
      >
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-cyan-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
