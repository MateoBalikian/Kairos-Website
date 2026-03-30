import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import Features from './components/Features'
import Philosophy from './components/Philosophy'
import Protocol from './components/Protocol'
import Science from './components/Science'
import Products from './components/Products'
import Waitlist from './components/Waitlist'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Features />
        <Products />
        <Philosophy />
        <Protocol />
        <Science />
        <Waitlist />
      </main>
      <Footer />
    </div>
  )
}
