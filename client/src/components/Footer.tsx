import Logo from './Logo'

const footerLinks = [
  { label: 'Why ALTAIR', href: '#why-altair' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Responsible AI', href: '#responsible-ai' },
  { label: 'Our Vision', href: '#vision' },
] as const

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="about" className="border-t border-gray-200 bg-white px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Logo size="footer" />
              <span className="text-base font-semibold text-deep-space">
                ALTAIR
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-secondary-text">
              Find your way forward.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-sm font-semibold text-deep-space">Quick Links</p>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-secondary-text transition-colors duration-300 hover:text-primary-text"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social links">
            <p className="text-sm font-semibold text-deep-space">Connect</p>
            <ul className="mt-4 flex flex-col gap-3">
              {socialLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-secondary-text transition-colors duration-300 hover:text-primary-text"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-gray-100 pt-8 text-center text-xs text-secondary-text lg:text-left">
          &copy; {year} ALTAIR. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
