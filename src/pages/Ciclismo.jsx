import Navbar from '../components/Navbar'
import Waitlist from '../components/Waitlist'
import Footer from '../components/Footer'

export default function Ciclismo() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <main>
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-white text-4xl font-bold">Ciclismo — em construção</h1>
        </div>
        <Waitlist />
      </main>
      <Footer />
    </div>
  )
}
