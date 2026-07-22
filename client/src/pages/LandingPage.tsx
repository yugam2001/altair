import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WhyAltair from '../components/WhyAltair'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import ResponsibleAI from '../components/ResponsibleAI'
import OurVision from '../components/OurVision'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-svh">
      <Navbar />
      <main>
        <Hero />
        <WhyAltair />
        <Features />
        <HowItWorks />
        <ResponsibleAI />
        <OurVision />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
