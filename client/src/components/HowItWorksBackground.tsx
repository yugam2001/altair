import { memo } from 'react'

const HowItWorksBackground = memo(function HowItWorksBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_0%,rgba(20,184,166,0.06),transparent_68%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_100%_50%,rgba(250,204,21,0.04),transparent_55%)]" />

      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
        <line x1="8%" y1="55%" x2="92%" y2="55%" stroke="rgba(20,184,166,0.1)" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="8%" cy="55%" r="2.5" fill="rgba(20,184,166,0.2)" />
        <circle cx="50%" cy="55%" r="2.5" fill="rgba(20,184,166,0.25)" />
        <circle cx="92%" cy="55%" r="2.5" fill="rgba(20,184,166,0.2)" />
      </svg>
    </div>
  )
})

export default HowItWorksBackground
