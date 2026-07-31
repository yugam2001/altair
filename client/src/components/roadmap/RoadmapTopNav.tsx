import { useCallback, useEffect, useState } from 'react'
import { Share2 } from 'lucide-react'
import type { RoadmapData } from '../../types/roadmap'
import { useToast } from '../ui/ToastProvider'
import { shareRoadmap } from '../../utils/shareRoadmap'
import { getInitialFromCareerGoal } from './roadmapSections'
import RoadmapDownloadPopover from './RoadmapDownloadPopover'

const NAV_ITEMS: Array<{
  label: string
  href: string
  disabled?: boolean
  isRefine?: boolean
}> = [
  { label: 'Roadmap', href: '#roadmap-content' },
  { label: 'Refine Roadmap', href: '#continue-planning', isRefine: true },
  { label: 'History', href: '#', disabled: true },
]

interface RoadmapTopNavProps {
  roadmap: RoadmapData
  isRefining: boolean
  onRefine: () => void
  avatarInitial?: string
}

export default function RoadmapTopNav({
  roadmap,
  isRefining,
  onRefine,
  avatarInitial,
}: RoadmapTopNavProps) {
  const [activeHref, setActiveHref] = useState('#roadmap-content')
  const { showToast, showErrorToast } = useToast()

  const handleShare = useCallback(async () => {
    try {
      const result = await shareRoadmap(roadmap.overview.title)

      if (result === 'copied') {
        showToast('Link copied to clipboard.')
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }

      showErrorToast()
    }
  }, [roadmap.overview.title, showErrorToast, showToast])

  useEffect(() => {
    const refineSection = document.getElementById('continue-planning')

    function updateActiveSection() {
      if (!refineSection) {
        setActiveHref('#roadmap-content')
        return
      }

      const rect = refineSection.getBoundingClientRect()
      const activationLine = window.innerHeight * 0.42

      if (rect.top <= activationLine && rect.bottom > window.innerHeight * 0.15) {
        setActiveHref('#continue-planning')
      } else {
        setActiveHref('#roadmap-content')
      }
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [isRefining])

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
                  className={`rounded-xl px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                    item.disabled
                      ? 'cursor-not-allowed text-white/30'
                      : isActive
                        ? 'bg-blue-500/15 text-white'
                        : 'text-blue-100/60 hover:bg-blue-500/10 hover:text-white'
                  }`}
                  onClick={(event) => {
                    if (item.disabled) {
                      event.preventDefault()
                      return
                    }

                    setActiveHref(item.href)

                    if (item.isRefine && !isRefining) {
                      event.preventDefault()
                      onRefine()
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <RoadmapDownloadPopover roadmap={roadmap} />
          <button
            type="button"
            aria-label="Share roadmap"
            onClick={() => void handleShare()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-950/50 text-blue-100/70 transition-colors duration-200 hover:bg-blue-900/60 hover:text-white"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/20 bg-gradient-to-br from-blue-400/25 to-blue-950/60 text-[11px] font-semibold text-white"
            aria-label="User avatar"
          >
            {getInitialFromCareerGoal(avatarInitial ?? '')}
          </div>
        </div>
      </nav>
    </header>
  )
}
