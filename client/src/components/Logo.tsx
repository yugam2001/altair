import type { RefObject } from 'react'

type LogoSize = 'nav' | 'hero' | 'footer'

const sizeStyles: Record<
  LogoSize,
  { wrapper: string; image: string }
> = {
  nav: {
    wrapper: 'rounded-xl p-1.5 shadow-sm ring-1 ring-gray-100/80',
    image: 'h-9 w-9',
  },
  hero: {
    wrapper: 'rounded-3xl p-6 shadow-lg ring-1 ring-gray-100/80 sm:p-8',
    image: 'h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36',
  },
  footer: {
    wrapper: 'rounded-xl p-1.5 shadow-sm ring-1 ring-gray-100/80',
    image: 'h-8 w-8',
  },
}

interface LogoProps {
  size?: LogoSize
  className?: string
  imageRef?: RefObject<HTMLImageElement | null>
}

export default function Logo({
  size = 'nav',
  className = '',
  imageRef,
}: LogoProps) {
  const styles = sizeStyles[size]

  return (
    <div
      className={`inline-flex items-center justify-center bg-white ${styles.wrapper} ${className}`}
    >
      <img
        ref={imageRef}
        src="/logo.png"
        alt="ALTAIR logo"
        className={`object-contain ${styles.image}`}
      />
    </div>
  )
}
