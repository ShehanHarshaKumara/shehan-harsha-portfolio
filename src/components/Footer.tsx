import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi'

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/ShehanHarshaKumara', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/shehan-harsha', label: 'LinkedIn' },
  { icon: FiTwitter, href: 'https://twitter.com/shehanharsha', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Shehan Harsha Kumara
          </span>
          <p className="text-slate-500 text-sm mt-1">Full Stack Developer · Sri Lanka</p>
        </div>
        <div className="flex gap-5">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-slate-500 hover:text-cyan-400 transition-colors"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
        <p className="text-slate-500 text-sm flex items-center gap-1.5">
          Made with <FiHeart className="text-red-500" size={14} /> by Shehan · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
