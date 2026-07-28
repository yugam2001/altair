/** Faint navigation grid — white and deep blue only. */
export default function RoadmapGuidanceOverlay() {
  return (
    <div className="roadmap-guidance-overlay absolute inset-0" aria-hidden="true">
      <div className="absolute left-1/2 top-[38%] h-[min(520px,60vw)] w-[min(920px,95vw)] -translate-x-1/2 rounded-[50%] border border-blue-400/[0.07]" />
      <div className="absolute left-1/2 top-[40%] h-[min(420px,50vw)] w-[min(740px,82vw)] -translate-x-1/2 rounded-[50%] border border-white/[0.04]" />

      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-blue-300/[0.06] to-transparent" />
      <div className="absolute left-0 top-[32%] h-px w-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      <div className="absolute left-[18%] top-[22%] h-8 w-px bg-white/[0.06]" />
      <div className="absolute left-[18%] top-[22%] h-px w-8 bg-white/[0.06]" />
      <div className="absolute right-[18%] top-[22%] h-8 w-px bg-white/[0.06]" />
      <div className="absolute right-[18%] top-[22%] h-px w-8 bg-white/[0.06]" />

      <div className="absolute left-1/2 top-[19%] h-2 w-2 -translate-x-1/2 rotate-45 border border-blue-300/30 bg-blue-400/10" />
    </div>
  )
}
