import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { mediaUrl } from '../lib/supabase'

const links = [
  { label: 'Metodologia', href: '#metodologia' },
  { label: 'Avaliações', href: '#ciencia' },
  { label: 'Aplicações', href: '#produtos' },
  { label: 'Ciência', href: '#lacae' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const smoothScroll = (href) => {
    const target = document.querySelector(href)
    if (!target) return
    if (window.lenis) {
      window.lenis.scrollTo(target, { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      <div className="flex items-center justify-between px-8 py-4" style={{ position: 'relative' }}>

        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo(0, { duration: 1.4 }) }}
          style={{
            position: 'absolute',
            left: '32px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
        >
          <img
            src={mediaUrl('logokairos1.png')}
            alt="KAIRÓS"
            style={{
              height: '40px',
              width: 'auto',
              display: 'block',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </a>

        {/* Espaçador */}
        <div style={{ width: '200px' }} />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); smoothScroll(link.href) }}
              style={{
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: '0.3px',
                textDecoration: 'none',
                opacity: 1,
                transition: 'opacity 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#waitlist"
            onClick={(e) => { e.preventDefault(); smoothScroll('#waitlist') }}
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
          className="md:hidden"
          aria-label="Menu"
          style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(8px)',
            padding: '16px 32px 24px',
          }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); setMenuOpen(false); smoothScroll(link.href) }}
              style={{
                display: 'block',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.95rem',
                padding: '12px 0',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={(e) => { e.preventDefault(); setMenuOpen(false); smoothScroll('#waitlist') }}
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
              cursor: 'pointer',
            }}
          >
            Lista de espera
          </a>
        </div>
      )}
    </header>
  )
}
