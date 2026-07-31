import { memo } from 'react'

const ResponsibleAIBackground = memo(function ResponsibleAIBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(20,184,166,0.06),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_0%_30%,rgba(15,23,42,0.04),transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 75%)',
        }}
      />
    </div>
  )
})

export default ResponsibleAIBackground
