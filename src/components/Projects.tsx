import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import axios from 'axios'
import { FiGithub, FiExternalLink, FiStar, FiGitBranch, FiAlertCircle } from 'react-icons/fi'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  Java: '#007396',
  'C++': '#f34b7d',
  CSS: '#1572B6',
  HTML: '#E34F26',
  Go: '#00ADD8',
  Rust: '#dea584',
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get<GitHubRepo[]>(
          'https://api.github.com/users/ShehanHarshaKumara/repos',
          { params: { sort: 'updated', per_page: 6, type: 'public' } }
        )
        setRepos(response.data.filter((r) => !r.name.startsWith('.')))
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.status === 404 ? 'GitHub user not found.' : 'Failed to load repositories.')
        } else {
          setError('An unexpected error occurred.')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Live projects pulled from my GitHub profile
          </p>
        </motion.div>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-3/4 mb-3" />
                <div className="h-3 bg-slate-700 rounded w-full mb-2" />
                <div className="h-3 bg-slate-700 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 text-red-400 bg-red-900/20 border border-red-800 rounded-xl p-4 max-w-md mx-auto">
            <FiAlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, idx) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex flex-col hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <FiGithub size={22} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  <div className="flex gap-3">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-cyan-400 transition-colors"
                      aria-label="GitHub repo"
                    >
                      <FiGithub size={18} />
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-cyan-400 transition-colors"
                        aria-label="Live demo"
                      >
                        <FiExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                  {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
                </h3>
                <p className="text-slate-400 text-sm flex-1 mb-4 leading-relaxed">
                  {repo.description || 'No description provided.'}
                </p>
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 text-xs bg-blue-900/40 text-blue-300 rounded-full border border-blue-800/50">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between text-slate-500 text-sm pt-3 border-t border-slate-700">
                  <div className="flex items-center gap-1">
                    {repo.language && (
                      <>
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: LANG_COLORS[repo.language] || '#ccc' }}
                        />
                        <span>{repo.language}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <FiStar size={13} /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiGitBranch size={13} /> {repo.forks_count}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/ShehanHarshaKumara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 rounded-full text-slate-300 hover:border-cyan-500 hover:text-cyan-400 transition-colors font-medium"
          >
            <FiGithub /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
