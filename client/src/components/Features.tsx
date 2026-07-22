import {
  Map,
  Layers,
  Compass,
  GraduationCap,
  Route,
  ShieldCheck,
} from 'lucide-react'
import FeatureCard from './FeatureCard'
import SectionHeader from './SectionHeader'

const features = [
  {
    icon: Map,
    title: 'Personalized Roadmaps',
    description:
      'AI adapts recommendations based on your education level and career goal.',
  },
  {
    icon: Layers,
    title: 'Stage-Aware Guidance',
    description:
      'Recommendations change depending on where you are in your journey today.',
  },
  {
    icon: Compass,
    title: 'Career Navigation',
    description:
      'Clear direction from your current position to your target role or field.',
  },
  {
    icon: GraduationCap,
    title: 'Education Planning',
    description:
      'Structured pathways for exams, degrees, and specializations that fit your goals.',
  },
  {
    icon: Route,
    title: 'Practical Learning Paths',
    description:
      'Projects, skills, and resources organized into actionable phases.',
  },
  {
    icon: ShieldCheck,
    title: 'Responsible AI Recommendations',
    description:
      'Transparent guidance that assists your decisions without replacing them.',
  },
] as const

export default function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Key Features"
          subtitle="Everything you need to move from uncertainty to a structured plan."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
