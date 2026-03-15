import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiReact, SiTypescript, SiNextdotjs, SiHtml5, SiCss, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPython,
  SiMongodb, SiPostgresql, SiMysql, SiFirebase,
  SiGit, SiDocker, SiFigma,
} from 'react-icons/si'
import { FaAws, FaJava } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'

const skillCategories = [
  {
    title: 'Frontend',
    color: 'from-blue-500 to-blue-700',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss, color: '#1572B6' },
      { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    title: 'Backend',
    color: 'from-purple-500 to-purple-700',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Java', icon: FaJava, color: '#007396' },
    ],
  },
  {
    title: 'Database',
    color: 'from-green-500 to-green-700',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    ],
  },
  {
    title: 'Tools & Cloud',
    color: 'from-orange-500 to-orange-700',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'VS Code', icon: VscVscode, color: '#007ACC' },
    ],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tech <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Stack</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Technologies and tools I work with on a daily basis
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-slate-500 transition-colors"
            >
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${category.color} text-white mb-5`}>
                {category.title}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {category.skills.map(({ name, icon: Icon, color }, skillIdx) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: catIdx * 0.1 + skillIdx * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-slate-700/50 transition-colors cursor-default group"
                    title={name}
                  >
                    <Icon size={28} style={{ color }} />
                    <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors text-center leading-tight">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
