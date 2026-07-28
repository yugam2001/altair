/** Positions avoiding logo, tagline (upper centre) and spaceship (lower centre). */
export const NODE_POSITIONS = [
  { left: '15%', top: '18%' },
  { left: '84%', top: '24%' },
  { left: '11%', top: '42%' },
  { left: '88%', top: '48%' },
  { left: '18%', top: '60%' },
  { left: '80%', top: '56%' },
] as const

export type NodePosition = (typeof NODE_POSITIONS)[number]

export type NodeColor = 'blue' | 'violet' | 'gold' | 'white'

export const NODE_COLORS: NodeColor[] = ['blue', 'violet', 'gold', 'white']

export function cardSide(left: string): 'left' | 'right' {
  return parseFloat(left) < 50 ? 'right' : 'left'
}

export function pickRandomColor(): NodeColor {
  return NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)]
}

export function pickRandomSize(): number {
  return 26 + Math.floor(Math.random() * 11)
}
