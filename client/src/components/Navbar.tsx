import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Why ALTAIR', href: '#why-altair' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Responsible AI', href: '#responsible-ai' },
  { label: 'Vision', href: '#vision' },
] as const

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur-sm"
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Logo size="nav" />
          <span className="text-lg font-semibold tracking-tight text-deep-space">
            ALTAIR
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-medium text-secondary-text transition-colors duration-300 hover:text-primary-text"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href="#generate"
            className="inline-flex items-center rounded-lg bg-deep-space px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-midnight-blue"
          >
            Generate Roadmap
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-secondary-text transition-colors hover:bg-gray-100 hover:text-primary-text lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-gray-200/80 bg-white lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={closeMobile}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-secondary-text transition-colors hover:bg-gray-50 hover:text-primary-text"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#generate"
                  onClick={closeMobile}
                  className="block rounded-lg bg-deep-space px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-midnight-blue"
                >
                  Generate Roadmap
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
