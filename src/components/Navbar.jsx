import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { mediaUrl } from '../lib/supabase'

const navLinks = [
  { label: 'Corrida', href: '/corrida' },
  { label: 'Ciclismo', href: '/ciclismo' },
  { label: 'Natação', href: '/natacao' },
  { label: 'Biomecânica', href: '/pose-estimation' },
  { label: 'Fisiologia', href: '/limiar-de-lactato' },
  { label: 'Metabolômica', href: '/metabolomica' },
  { label: 'Paralímpico', href: '/esporte-paralimpico' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

  const scrollToContact = (e) => {
    e.preventDefault()
    const target =
      document.getElementById('contato') ||
      document.getElementById('agendar') ||
      document.getElementById('enviar') ||
      document.getElementById('waitlist')
    if (target && window.lenis) {
      window.lenis.scrollTo(target, { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="navbar-safe-area" />
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: (scrolled || menuOpen) ? 'rgba(0,0,0,0.95)' : 'transparent',
          backdropFilter: (scrolled || menuOpen) ? 'blur(8px)' : 'none',
          borderBottom: (scrolled || menuOpen) ? '1px solid rgba(255,255,255,0.08)' : 'none',
          transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">

          {/* Logo → Home */}
          <a href="/" style={{ flexShrink: 0, textDecoration: 'none' }}>
            <img
              src={mediaUrl('veltronlogocortado.png')}
              alt="Veltron"
              style={{
                height: '36px',
                width: 'auto',
                display: 'block',
                filter: 'brightness(0) invert(1)',
              }}
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-6 flex-nowrap whitespace-nowrap">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '0.3px',
                  textDecoration: 'none',
                  opacity: currentPath === link.href ? 1 : 0.6,
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = currentPath === link.href ? '1' : '0.6')}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={scrollToContact}
              style={{
                background: '#0A2463',
                color: 'white',
                borderRadius: 99,
                padding: '8px 20px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Entre em contato
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="xl:hidden"
            aria-label="Menu"
            style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            background: 'rgba(0,0,0,0.98)',
            backdropFilter: 'blur(12px)',
            padding: 'clamp(12px, 4vw, 16px) clamp(16px, 5vw, 32px) 24px',
          }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  color: currentPath === link.href ? 'white' : 'rgba(255,255,255,0.7)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  padding: '12px 0',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={(e) => { scrollToContact(e); setMenuOpen(false) }}
              style={{
                display: 'block',
                marginTop: '16px',
                background: '#0A2463',
                color: 'white',
                borderRadius: 99,
                padding: '10px 20px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Entre em contato
            </a>
          </div>
        )}
      </header>
    </>
  )
}
