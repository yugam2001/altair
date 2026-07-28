import { motion } from 'framer-motion'
import type { NodeColor } from './nodeConfig'

interface CelestialNodeProps {
  color: NodeColor
  size?: number
}

const COLOR_CLASS: Record<NodeColor, string> = {
  blue: 'celestial-node--blue',
  violet: 'celestial-node--violet',
  gold: 'celestial-node--gold',
  white: 'celestial-node--white',
}

export default function CelestialNode({ color, size = 30 }: CelestialNodeProps) {
  return (
    <motion.div
      className={`celestial-node ${COLOR_CLASS[color]}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <span className="celestial-node__bloom" />
      <span className="celestial-node__fill" />
      <span className="celestial-node__radiance" />
      <span className="celestial-node__hotspot" />
    </motion.div>
  )
}
