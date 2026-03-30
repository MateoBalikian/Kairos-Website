import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Avaliações', href: '#ciencia' },
    { label: 'Produtos', href: '#produtos' },
    { label: 'LACAE', href: '#lacae' },
  ]

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`flex items-center gap-6 px-6 py-3 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border border-[#E5E5E2] shadow-[0_8px_32px_rgba(10,36,99,0.08)]'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          className="font-mono text-sm tracking-[0.25em] font-medium text-[#0A2463] uppercase mr-2"
        >
          KAIROS
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-sm text-[#4A4A47] hover:text-[#0A2463] transition-colors duration-200 hover:-translate-y-px"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#waitlist"
          className="hidden md:inline-flex btn-magnetic btn-slide items-center px-4 py-2 text-sm font-medium text-white bg-[#0A2463] rounded-full"
        >
          <div className="slide-fill bg-[#1E3A8A]" />
          <span>Lista de espera</span>
        </a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#0A2463] p-1"
          aria-label="Menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full mt-2 left-4 right-4 bg-white/95 backdrop-blur-xl border border-[#E5E5E2] rounded-3xl p-4 shadow-lg">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-sm text-[#4A4A47] hover:text-[#0A2463] border-b border-[#E5E5E2] last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setMenuOpen(false)}
            className="block mt-3 px-4 py-3 text-sm font-medium text-white bg-[#0A2463] rounded-2xl text-center"
          >
            Lista de espera
          </a>
        </div>
      )}
    </header>
  )
}
