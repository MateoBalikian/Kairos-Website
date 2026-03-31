import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { mediaUrl } from '../lib/supabase'

export default function Hero() {
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.14, delay: 0.4 }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] overflow-hidden bg-black">

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={mediaUrl('heromidia.mp4')}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)' }} />

      {/* Bottom-left text content */}
      <div
        ref={contentRef}
        className="absolute z-10"
        style={{
          bottom: 'clamp(100px, 12vh, 160px)',
          left: 'clamp(24px, 5vw, 72px)',
          right: 'clamp(24px, 5vw, 64px)',
          maxWidth: 600,
        }}
      >
        <h1
          className="font-sans text-white"
          style={{
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 1.1,
          }}
        >
          Inteligência Científica para a Saúde, o Esporte e a Performance
        </h1>

        <p
          style={{
            marginTop: '1rem',
            fontWeight: 400,
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.8)',
            maxWidth: 520,
          }}
        >
          Integramos inteligência artificial, visão computacional e metabolômica
          para transformar a forma como entendemos o corpo humano em movimento.
        </p>

        <a
          href="#produtos"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="inline-flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity duration-200"
          style={{
            marginTop: '2rem',
            background: 'white',
            border: 'none',
            borderRadius: 99,
            padding: '14px 28px',
            color: '#0A0A0A',
            fontWeight: 600,
            fontSize: '0.85rem',
            letterSpacing: '1.5px',
            textDecoration: 'none',
          }}
        >
          NOSSAS SOLUÇÕES
          <span
            className="inline-flex items-center justify-center"
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: '#0A0A0A',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </a>
      </div>

    </section>
  )
}
