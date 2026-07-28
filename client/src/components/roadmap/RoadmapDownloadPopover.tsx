import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ClipboardCopy, Download, FileText } from 'lucide-react'

const OPTIONS = [
  { label: 'Export as PDF', icon: FileText },
  { label: 'Export as Word (.docx)', icon: Download },
  { label: 'Copy to Clipboard', icon: ClipboardCopy },
] as const

interface RoadmapDownloadPopoverProps {
  triggerClassName?: string
}

export default function RoadmapDownloadPopover({
  triggerClassName = '',
}: RoadmapDownloadPopoverProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="Download roadmap"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-950/50 text-blue-100/70 transition-colors duration-200 hover:bg-blue-900/60 hover:text-white ${triggerClassName}`}
      >
        <Download className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Export options"
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[220px] overflow-hidden rounded-xl border border-blue-400/18 bg-[#0a1224]/85 p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl"
          >
            {OPTIONS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-blue-100/85 transition-colors duration-200 hover:bg-blue-500/10 hover:text-white"
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4 shrink-0 text-blue-300/70" aria-hidden="true" />
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
