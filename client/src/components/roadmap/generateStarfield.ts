export type StarLayer = 1 | 2 | 3

/** Monochrome space palette — white and deep blue only. */
export type StarColor = 'white' | 'blue-white' | 'deep-blue'

export interface RoadmapStar {
  id: number
  x: number
  y: number
  size: number
  layer: StarLayer
  color: StarColor
  opacity: number
  twinkle: boolean
  twinkleDelay: number
  twinkleDuration: number
}

function createRng(seed: number) {
  let state = seed % 2147483647
  if (state <= 0) state += 2147483646

  return () => {
    state = (state * 16807) % 2147483647
    return (state - 1) / 2147483646
  }
}

function pickColor(rng: () => number): StarColor {
  const roll = rng()
  if (roll < 0.62) return 'white'
  if (roll < 0.88) return 'blue-white'
  return 'deep-blue'
}

function randomBetween(rng: () => number, min: number, max: number) {
  return min + rng() * (max - min)
}

function createStar(
  rng: () => number,
  id: number,
  layer: StarLayer,
): RoadmapStar {
  let size: number
  let opacity: number
  let twinkle: boolean

  switch (layer) {
    case 1:
      size = randomBetween(rng, 1, 1.75)
      opacity = randomBetween(rng, 0.25, 0.55)
      twinkle = rng() < 0.58
      break
    case 2:
      size = randomBetween(rng, 1.75, 2.75)
      opacity = randomBetween(rng, 0.35, 0.65)
      twinkle = rng() < 0.54
      break
    case 3:
      size = randomBetween(rng, 2.75, 3.5)
      opacity = randomBetween(rng, 0.45, 0.75)
      twinkle = rng() < 0.46
      break
  }

  return {
    id,
    x: randomBetween(rng, 0.5, 99.5),
    y: randomBetween(rng, 0.5, 99.5),
    size,
    layer,
    color: pickColor(rng),
    opacity,
    twinkle,
    twinkleDelay: randomBetween(rng, 0, 10),
    twinkleDuration: randomBetween(rng, 3.5, 8),
  }
}

/** Dense natural starfield — like viewing space through a viewport. */
export function generateStarfield(
  seed = 20260429,
  counts: { layer1: number; layer2: number; layer3: number } = {
    layer1: 340,
    layer2: 90,
    layer3: 24,
  },
): RoadmapStar[] {
  const rng = createRng(seed)
  const stars: RoadmapStar[] = []
  let id = 0

  for (let i = 0; i < counts.layer1; i++) {
    stars.push(createStar(rng, id++, 1))
  }
  for (let i = 0; i < counts.layer2; i++) {
    stars.push(createStar(rng, id++, 2))
  }
  for (let i = 0; i < counts.layer3; i++) {
    stars.push(createStar(rng, id++, 3))
  }

  return stars
}

export const ROADMAP_STARS = generateStarfield()

export const STARS_BY_LAYER = {
  1: ROADMAP_STARS.filter((s) => s.layer === 1),
  2: ROADMAP_STARS.filter((s) => s.layer === 2),
  3: ROADMAP_STARS.filter((s) => s.layer === 3),
} as const
