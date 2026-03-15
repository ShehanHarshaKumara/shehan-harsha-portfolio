import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiBook, FiBriefcase } from 'react-icons/fi'

interface TimelineItem {
  type: 'education' | 'experience'
  title: string
  organization: string
  period: string
  description: string
  tags?: string[]
}

const timelineData: TimelineItem[] = [
  {
    type: 'education',
    title: 'B.Sc. in Computer Science',
    organization: 'University of Moratuwa',
    period: '2020 – 2024',
    description:
      'Pursued a Bachelor of Science in Computer Science, covering data structures, algorithms, software engineering, databases, and distributed systems.',
    tags: ['Algorithms', 'Software Engineering', 'Databases'],
  },
  {
    type: 'experience',
    title: 'Software Engineer Intern',
    organization: 'XYZ Tech',
    period: '2023 (6 months)',
    description:
      'Worked on full-stack features for a SaaS product using React and Node.js. Contributed to RESTful API design, database optimization, and CI/CD pipelines.',
    tags: ['React', 'Node.js', 'REST APIs', 'CI/CD'],
  },
]

export default function Timeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Education &amp;{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-cyan-500 opacity-30 sm:-translate-x-1/2" />

          <div className="space-y-10">
            {timelineData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={`relative flex flex-col sm:flex-row gap-6 ${
                  idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 border-4 border-[#0a0a0f] z-10" />

                {/* Card */}
                <div className={`ml-14 sm:ml-0 sm:w-[calc(50%-2rem)] ${idx % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'}`}>
                  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 rounded-lg ${
                          item.type === 'education'
                            ? 'bg-blue-900/50 text-blue-400'
                            : 'bg-purple-900/50 text-purple-400'
                        }`}
                      >
                        {item.type === 'education' ? <FiBook size={16} /> : <FiBriefcase size={16} />}
                      </div>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          item.type === 'education' ? 'text-blue-400' : 'text-purple-400'
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-cyan-400 font-medium text-sm mb-1">{item.organization}</p>
                    <p className="text-slate-500 text-xs mb-3">{item.period}</p>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>
                    {item.tags && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs bg-slate-700 text-slate-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
