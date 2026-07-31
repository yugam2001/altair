import { memo } from 'react'

const FeaturesBackground = memo(function FeaturesBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(20,184,166,0.05),transparent_68%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_100%_80%,rgba(15,23,42,0.04),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_30%_at_0%_70%,rgba(250,204,21,0.04),transparent_55%)]" />
    </div>
  )
})

export default FeaturesBackground
