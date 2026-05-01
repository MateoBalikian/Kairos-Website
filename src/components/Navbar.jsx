import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { mediaUrl } from '../lib/supabase'

const links = [
  { label: 'Futebol', href: '/futebol', isRoute: true },
  { label: 'Ciclismo', href: '/ciclismo', isRoute: true },
  { label: 'Natação', href: '/natacao', isRoute: true },
  { label: 'Diferenciais', href: '#diferenciais', isRoute: false },
]

export default function Navbar({ forceDark = false, hideLinks = false }) {
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
        background: forceDark || scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
        backdropFilter: forceDark || scrolled ? 'blur(8px)' : 'none',
        borderBottom: forceDark || scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
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
            src={mediaUrl('veltronlogocortado.png')}
            alt="Veltron"
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
        {!hideLinks ? (
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              link.isRoute ? (
                <a
                  key={link.label}
                  href={link.href}
                  style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.3px', textDecoration: 'none', opacity: 1, transition: 'opacity 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    if (window.lenis) {
                      const target = document.querySelector(link.href)
                      if (target) window.lenis.scrollTo(target, { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
                    } else {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.3px', textDecoration: 'none', opacity: 1, transition: 'opacity 0.2s ease', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {link.label}
                </a>
              )
            ))}
            <a
              href="#waitlist"
              onClick={(e) => { e.preventDefault(); smoothScroll('#waitlist') }}
              style={{ background: '#0A2463', color: 'white', borderRadius: 99, padding: '8px 20px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Entre em contato
            </a>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-6">
            <a href="/"
              style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              ← Veltron
            </a>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
            <a href="/futebol"
              style={{ color: window.location.pathname === '/futebol' ? 'white' : 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.color = window.location.pathname === '/futebol' ? 'white' : 'rgba(255,255,255,0.4)')}>
              Futebol
            </a>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
            <a href="/ciclismo"
              style={{ color: window.location.pathname === '/ciclismo' ? 'white' : 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.color = window.location.pathname === '/ciclismo' ? 'white' : 'rgba(255,255,255,0.4)')}>
              Ciclismo
            </a>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
            <a href="/natacao"
              style={{ color: window.location.pathname === '/natacao' ? 'white' : 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.color = window.location.pathname === '/natacao' ? 'white' : 'rgba(255,255,255,0.4)')}>
              Natação
            </a>
            <a href="#agendar"
              onClick={(e) => {
                e.preventDefault()
                const target = document.getElementById('agendar')
                if (!target) return
                if (window.lenis) {
                  window.lenis.scrollTo(target, { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
                } else {
                  target.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              style={{ background: '#0A2463', color: 'white', borderRadius: 99, padding: '8px 20px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Fale conosco
            </a>
          </div>
        )}

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
          {!hideLinks && (
            <>
              {links.map((link) => (
                link.isRoute ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      padding: '12px 0',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      setMenuOpen(false)
                      if (window.lenis) {
                        const target = document.querySelector(link.href)
                        if (target) window.lenis.scrollTo(target, { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
                      } else {
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
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
                )
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
            </>
          )}
        </div>
      )}
    </header>
  )
}
