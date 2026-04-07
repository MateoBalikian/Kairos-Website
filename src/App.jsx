import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Methodology from './components/Methodology'
import Areas from './components/Areas'
import Institutes from './components/Institutes'
import Philosophy from './components/Philosophy'
import Cases from './components/Cases'

import Science from './components/Science'
import Products from './components/Products'
import HealthNutrition from './components/HealthNutrition'
import Waitlist from './components/Waitlist'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Methodology />
        <Areas />
        <Science />
        <Products />
        <HealthNutrition />
        <Philosophy />
        <Cases />

        <Institutes />
        <Waitlist />
      </main>
      <Footer />
    </div>
  )
}
