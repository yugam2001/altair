import { useEffect, useState } from 'react'
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

type NavHref = (typeof navLinks)[number]['href']

const SCROLL_SPY_OFFSET = 96

function getActiveSectionHref(): NavHref {
  let activeHref: NavHref = navLinks[0].href

  for (const { href } of navLinks) {
    const section = document.getElementById(href.slice(1))
    if (!section) continue

    if (section.getBoundingClientRect().top <= SCROLL_SPY_OFFSET) {
      activeHref = href
    }
  }

  return activeHref
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeHref, setActiveHref] = useState<NavHref>(navLinks[0].href)

  const closeMobile = () => setMobileOpen(false)

  useEffect(() => {
    function updateActiveSection() {
      setActiveHref(getActiveSectionHref())
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  const linkClassName = (href: NavHref, mobile = false) => {
    const isActive = activeHref === href

    if (mobile) {
      return `block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-gray-50 hover:text-primary-text ${
        isActive
          ? 'font-semibold text-primary-text'
          : 'font-medium text-secondary-text'
      }`
    }

    return `text-sm transition-colors duration-300 hover:text-primary-text ${
      isActive
        ? 'font-semibold text-primary-text'
        : 'font-medium text-secondary-text'
    }`
  }

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
          href="/#home"
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
                href={`/${href}`}
                aria-current={activeHref === href ? 'true' : undefined}
                className={linkClassName(href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

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
                    href={`/${href}`}
                    onClick={closeMobile}
                    aria-current={activeHref === href ? 'true' : undefined}
                    className={linkClassName(href, true)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
