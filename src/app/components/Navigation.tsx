import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Sun, Moon, Home, User, Code2, 
  Wrench, Mail, GraduationCap, ChevronRight, ContactRound, BriefcaseBusiness,
  Sparkles, Github, Linkedin, Twitter,
  Download, LogOut, Settings, HelpCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { RESUME_URL } from '../constants/links';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  gradient: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home', icon: Home, gradient: 'from-blue-400 to-cyan-400' },
  { name: 'About', href: '#about', icon: User, gradient: 'from-purple-400 to-pink-400' },
  { name: 'Experience', href: '#experience', icon: BriefcaseBusiness, gradient: 'from-cyan-400 to-indigo-400' },
  { name: 'Projects', href: '#projects', icon: Code2, gradient: 'from-green-400 to-emerald-400' },
  { name: 'Education', href: '#education', icon: GraduationCap, gradient: 'from-indigo-400 to-purple-400' },
  { name: 'Skills', href: '#skills', icon: Wrench, gradient: 'from-orange-400 to-red-400' },
  { name: 'References', href: '#references', icon: ContactRound, gradient: 'from-cyan-400 to-blue-400' },
  { name: 'Contact', href: '#contact', icon: Mail, gradient: 'from-pink-400 to-rose-400' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/ShehanHarshaKumara', label: 'GitHub', color: 'hover:text-[#333]' },
  { icon: Linkedin, href: 'https://linkedin.com/in/shehan-harsha-183532334/', label: 'LinkedIn', color: 'hover:text-[#0077b5]' },
  { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations
  const { scrollY } = useScroll();
  const navHeight = useTransform(scrollY, [0, 100], [80, 60]);
  const navBlur = useTransform(scrollY, [0, 100], [0, 20]);
  const navOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section with improved detection
      const sections = navItems.map(item => item.href.replace('#', ''));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = 100;
          return rect.top <= offset && rect.bottom >= offset;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        style={{ scaleX: useTransform(scrollY, [0, document.body.scrollHeight], [0, 1]), transformOrigin: '0%' }}
      />

      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        style={{
          height: navHeight,
          backdropFilter: `blur(${navBlur}px)`,
          backgroundColor: scrolled 
            ? theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'
            : 'transparent',
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'shadow-2xl' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo with 3D Effect */}
            <motion.button
              onClick={() => scrollToSection('#home')}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-30 blur-xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
               
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '');
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => scrollToSection(item.href)}
                    onHoverStart={() => setHoveredItem(item.name)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className="relative px-2.5 py-2 rounded-xl transition-all group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Background glow */}
                    <AnimatePresence>
                      {(isActive || hoveredItem === item.name) && (
                        <motion.div
                          layoutId="navGlow"
                          className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.gradient} opacity-10`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <div className="relative z-10 flex items-center gap-2">
                      <Icon className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300'
                      }`} />
                      <span className={`text-sm font-medium transition-colors ${
                        isActive ? 'text-blue-400' : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                      }`}>
                        {item.name}
                      </span>
                    </div>
                  </motion.button>
                );
              })}

              {/* Profile Menu */}
              <div className="relative ml-4">
                <motion.button
                  onClick={() => setShowProfile(!showProfile)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]"
                >
                  <div className="w-full h-full rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center">
                    <img
                      src="https://github.com/ShehanHarshaKumara.png"
                      alt="Profile"
                      className="w-8 h-8 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/32';
                      }}
                    />
                  </div>
                </motion.button>

                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 rounded-xl overflow-hidden shadow-2xl z-50"
                      style={{
                        background: theme === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {/* Profile Header */}
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://github.com/ShehanHarshaKumara.png"
                            alt="Profile"
                            className="w-12 h-12 rounded-xl"
                          />
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white">Shehan Harsha</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">@shehan_harsha</p>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="p-2">
                        {[
                          { icon: Settings, label: 'Settings' },
                          { icon: HelpCircle, label: 'Help' },
                          { icon: LogOut, label: 'Sign Out' },
                        ].map((item) => (
                          <motion.button
                            key={item.label}
                            whileHover={{ x: 5 }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <item.icon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
                          </motion.button>
                        ))}
                      </div>

                      {/* Social Links */}
                      <div className="p-4 border-t border-white/10">
                        <div className="flex justify-center gap-3">
                          {socialLinks.map((social) => (
                            <motion.a
                              key={social.label}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ y: -3 }}
                              className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors ${social.color}`}
                            >
                              <social.icon className="w-4 h-4" />
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                onClick={toggleTheme}
                className="ml-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition-all group"
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <Sun className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Moon className="w-5 h-5 text-blue-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-400" />
                )}
              </motion.button>

              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
              style={{
                background: theme === 'dark' ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  const Icon = item.icon;

                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(item.href)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? `bg-gradient-to-r ${item.gradient} bg-opacity-10 text-blue-400 border border-blue-500/30`
                          : 'text-gray-600 dark:text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        isActive ? 'translate-x-1' : ''
                      }`} />
                    </motion.button>
                  );
                })}

                {/* Mobile Social Links */}
                <div className="flex justify-center gap-4 pt-6 mt-4 border-t border-white/10">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>

                {/* Resume Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(RESUME_URL, '_blank')}
                  className="w-full mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Floating Action Button for Mobile */}
      <AnimatePresence>
        {scrolled && !isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => scrollToSection('#contact')}
            className="fixed bottom-6 right-6 md:hidden z-50 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Mail className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
