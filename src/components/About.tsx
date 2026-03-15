import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCode, FiServer, FiCloud } from 'react-icons/fi'

const highlights = [
  { icon: FiCode, label: 'Frontend', desc: 'React, TypeScript, Next.js' },
  { icon: FiServer, label: 'Backend', desc: 'Node.js, Express, Python' },
  { icon: FiCloud, label: 'Cloud', desc: 'AWS, Docker, CI/CD' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-6xl sm:text-8xl font-extrabold text-white shadow-2xl shadow-blue-500/30">
                SH
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl opacity-30 blur-xl" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Full Stack Developer &amp; Software Engineer
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              I'm Shehan Harsha Kumara, a passionate full-stack developer based in Sri Lanka.
              I specialize in building modern, scalable web applications with clean code and
              great user experiences.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Currently pursuing my B.Sc. in Computer Science at the University of Moratuwa,
              I have hands-on experience with a wide range of technologies across the stack —
              from crafting pixel-perfect UIs to designing robust backend APIs and cloud deployments.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {highlights.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center hover:border-cyan-500/50 transition-colors"
                >
                  <Icon className="mx-auto mb-2 text-cyan-400" size={20} />
                  <div className="text-white text-sm font-semibold">{label}</div>
                  <div className="text-slate-500 text-xs mt-1">{desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
