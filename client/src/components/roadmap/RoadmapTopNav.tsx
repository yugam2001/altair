import { useEffect, useState } from 'react'
import { Download, Share2 } from 'lucide-react'

const NAV_ITEMS: Array<{
  label: string
  href: string
  sectionId?: string
  disabled?: boolean
}> = [
  { label: 'Learning Guide', href: '#roadmap-content', sectionId: 'roadmap-content' },
  { label: 'Adjust Course', href: '#continue-planning', sectionId: 'continue-planning' },
  { label: 'History', href: '#', disabled: true },
]

export default function RoadmapTopNav() {
  const [activeHref, setActiveHref] = useState('#roadmap-content')

  useEffect(() => {
    const sections = NAV_ITEMS.filter((item) => item.sectionId).flatMap((item) => {
      const element = document.getElementById(item.sectionId!)
      return element ? [{ href: item.href, element }] : []
    })

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length === 0) return

        const match = sections.find((section) => section.element === visible[0].target)
        if (match) setActiveHref(match.href)
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0, 0.15, 0.35, 0.55, 0.75],
      },
    )

    for (const section of sections) {
      observer.observe(section.element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-4 z-50 mx-auto w-[90%] max-w-[1400px] pt-2 sm:top-5">
      <nav
        className="flex items-center justify-between gap-4 rounded-2xl border border-blue-400/15 bg-[#0a1224]/70 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:px-5 sm:py-3.5"
        aria-label="Roadmap navigation"
      >
        <div className="min-w-0">
          <p className="font-display text-sm font-semibold tracking-[0.18em] text-white uppercase sm:text-[15px]">
            ALTAIR
          </p>
          <p className="font-space mt-0.5 truncate text-[11px] font-light tracking-[0.08em] text-blue-200/60 sm:text-xs">
            Find your way forward.
          </p>
        </div>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = !item.disabled && activeHref === item.href

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  aria-disabled={item.disabled}
                  className={`rounded-xl px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
                    item.disabled
                      ? 'cursor-not-allowed text-white/30'
                      : isActive
                        ? 'bg-blue-500/15 text-white'
                        : 'text-blue-100/60 hover:bg-blue-500/10 hover:text-white'
                  }`}
                  onClick={
                    item.disabled
                      ? (event) => event.preventDefault()
                      : () => setActiveHref(item.href)
                  }
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Download roadmap"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-950/50 text-blue-100/70 transition-colors duration-200 hover:bg-blue-900/60 hover:text-white"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Share roadmap"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-950/50 text-blue-100/70 transition-colors duration-200 hover:bg-blue-900/60 hover:text-white"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/20 bg-gradient-to-br from-blue-400/25 to-blue-950/60 text-[11px] font-semibold text-white"
            aria-label="User avatar placeholder"
          >
            Y
          </div>
        </div>
      </nav>
    </header>
  )
}
