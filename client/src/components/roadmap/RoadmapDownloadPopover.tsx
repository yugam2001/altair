import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ClipboardCopy, Download, FileText } from 'lucide-react'
import type { RoadmapData } from '../../types/roadmap'
import { useToast } from '../ui/ToastProvider'
import { copyRoadmapToClipboard } from '../../utils/exportRoadmapText'

const OPTIONS = [
  { id: 'pdf', label: 'Export as PDF', icon: FileText },
  { id: 'docx', label: 'Export as Word (.docx)', icon: Download },
  { id: 'clipboard', label: 'Copy to Clipboard', icon: ClipboardCopy },
] as const

type ExportOptionId = (typeof OPTIONS)[number]['id']

interface RoadmapDownloadPopoverProps {
  roadmap: RoadmapData
  triggerClassName?: string
}

export default function RoadmapDownloadPopover({
  roadmap,
  triggerClassName = '',
}: RoadmapDownloadPopoverProps) {
  const [open, setOpen] = useState(false)
  const [activeOption, setActiveOption] = useState<ExportOptionId | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { showToast, showErrorToast } = useToast()

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

  const handleExport = useCallback(
    async (optionId: ExportOptionId) => {
      setActiveOption(optionId)

      try {
        switch (optionId) {
          case 'pdf': {
            const { exportRoadmapPdf } = await import('../../utils/exportRoadmapPdf')
            exportRoadmapPdf(roadmap)
            break
          }
          case 'docx': {
            const { exportRoadmapDocx } = await import('../../utils/exportRoadmapDocx')
            await exportRoadmapDocx(roadmap)
            break
          }
          case 'clipboard':
            await copyRoadmapToClipboard(roadmap)
            showToast('Roadmap copied successfully.')
            break
        }

        setOpen(false)
      } catch {
        showErrorToast()
      } finally {
        setActiveOption(null)
      }
    },
    [roadmap, showErrorToast, showToast],
  )

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
            {OPTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="menuitem"
                disabled={activeOption !== null}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-blue-100/85 transition-colors duration-200 hover:bg-blue-500/10 hover:text-white disabled:cursor-wait disabled:opacity-60"
                onClick={() => void handleExport(id)}
              >
                <Icon className="h-4 w-4 shrink-0 text-blue-300/70" aria-hidden="true" />
                {activeOption === id ? 'Working…' : label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
