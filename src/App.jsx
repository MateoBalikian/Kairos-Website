import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Areas from './components/Areas'
import Institutes from './components/Institutes'
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
        <Features />
        <Areas />
        <Science />
        <Products />
        <Philosophy />
        <Protocol />
        <Institutes />
        <Waitlist />
      </main>
      <Footer />
    </div>
  )
}
