import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eye, FlaskConical, ArrowUpRight } from 'lucide-react'
import { mediaUrl } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    id: 'trocker',
    name: 'Trocker',
    badge: null,
    badgeStyle: {},
    icon: Eye,
    description:
      'Plataforma de rastreamento inteligente de jogadores para análise tática e física no futebol. Transforme qualquer vídeo de jogo ou treino em dados precisos de desempenho coletivo e individual.',
    features: [
      'Rastreamento de múltiplos atletas',
      'Análise de sprints, saltos e direção',
      'Mapas de calor e posicionamento tático',
      'Detecção de padrões de fadiga',
    ],
    media: (
      <video
        src={mediaUrl('trocker-demo.mp4')}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    ),
  },
  {
    id: 'nmr',
    name: 'Metabolômica por RMN',
    badge: 'LACAE',
    badgeStyle: { background: '#F8F8F6', color: '#4A4A47', border: '1px solid #E5E5E2' },
    icon: FlaskConical,
    description:
      'Perfil metabólico completo via Ressonância Magnética Nuclear. Correlação entre marcadores metabólicos e desempenho esportivo — metodologia de pesquisa científica aplicada ao atleta.',
    features: [
      'Perfil de 200+ metabólitos',
      'Correlação com desempenho',
      'Diagnóstico nutricional preciso',
      'Monitoramento longitudinal',
    ],
    media: (
      <img
        src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80&auto=format&fit=crop"
        alt="Metabolômica por RMN"
        className="w-full h-full object-cover"
      />
    ),
  },
]

const INTERVAL_MS = 5000

export default function Products() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const progressBarRef = useRef(null)
  const intervalRef = useRef(null)
  const rafRef = useRef(null)
  const startTimeRef = useRef(null)

  const animatePanel = useCallback(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
    )
  }, [])

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    cancelAnimationFrame(rafRef.current)
    if (progressBarRef.current) progressBarRef.current.style.width = '0%'
    startTimeRef.current = performance.now()

    const tick = (now) => {
      const elapsed = now - startTimeRef.current
      const pct = Math.min((elapsed / INTERVAL_MS) * 100, 100)
      if (progressBarRef.current) progressBarRef.current.style.width = pct + '%'
      if (pct < 100) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    intervalRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % products.length
        animatePanel()
        return next
      })
      startTimeRef.current = performance.now()
      if (progressBarRef.current) progressBarRef.current.style.width = '0%'
    }, INTERVAL_MS)
  }, [animatePanel])

  const handleTab = (index) => {
    if (index === active) return
    animatePanel()
    setActive(index)
    startTimer()
  }

  useEffect(() => {
    startTimer()
    return () => {
      clearInterval(intervalRef.current)
      cancelAnimationFrame(rafRef.current)
    }
  }, [startTimer])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.products-header > *',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      )
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: panelRef.current, start: 'top 80%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const product = products[active]
  const Icon = product.icon

  return (
    <section ref={sectionRef} id="produtos" className="py-24 lg:py-32 px-6 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto">

        <div className="products-header mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-[#6B6B67] uppercase tracking-widest">Nossa tecnologia</span>
            <h2 className="font-sans font-light text-3xl lg:text-4xl xl:text-5xl text-white tracking-tight mt-3">
              Instrumentos científicos{' '}
              <span className="font-bold text-[#4B7BF5]">para alto rendimento</span>
            </h2>
          </div>

          <div className="flex flex-col gap-2 flex-shrink-0">
            <div className="flex gap-2">
              {products.map((p, i) => {
                const TabIcon = p.icon
                const isActive = i === active
                return (
                  <button
                    key={p.id}
                    onClick={() => handleTab(i)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200"
                    style={{
                      background: isActive ? '#0A2463' : 'transparent',
                      color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                      borderColor: isActive ? '#0A2463' : 'rgba(255,255,255,0.15)',
                    }}
                  >
                    <TabIcon size={14} />
                    {p.name}
                  </button>
                )
              })}
            </div>
            <div className="h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div
                ref={progressBarRef}
                className="h-full rounded-full"
                style={{ width: '0%', background: '#4B7BF5' }}
              />
            </div>
          </div>
        </div>

        <div
          ref={panelRef}
          className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] mb-6"
          style={{ background: '#111111', borderRadius: '1.25rem', overflow: 'hidden', border: '0.5px solid #1a1a1a' }}
        >
          <div style={{ background: '#0A0A0A', minHeight: '480px', overflow: 'hidden' }}>
            {product.media}
          </div>

          <div
            className="flex flex-col justify-between p-8"
            style={{ background: '#111111', borderLeft: '0.5px solid rgba(255,255,255,0.08)' }}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(75,123,245,0.12)' }}>
                  <Icon size={20} style={{ color: '#4B7BF5' }} />
                </div>
                {product.badge && (
                  <span
                    className="font-mono text-[10px] px-3 py-1 rounded-full"
                    style={product.badgeStyle}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              <h3 className="font-sans font-semibold text-2xl text-white tracking-tight mb-3">
                {product.name}
              </h3>

              <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {product.description}
              </p>

              <ul className="space-y-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: '#4B7BF5' }} />
                    {f}
                  </li>
                ))}
              </ul>

              {product.id === 'trocker' && (
                <div className="mt-4 p-4 rounded-2xl" style={{ background: 'rgba(75,123,245,0.08)', border: '0.5px solid rgba(75,123,245,0.2)' }}>
                  <p className="text-sm font-semibold leading-snug mb-1" style={{ color: '#4B7BF5' }}>
                    Use IA para elevar o desempenho do seu time
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Atletas, analistas e clubes já estão transformando dados em vantagem competitiva. Faça parte.
                  </p>
                </div>
              )}
            </div>

            {product.id === 'trocker' ? (
              <a
                href="#waitlist"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:-translate-y-px transition-transform duration-200 cursor-pointer"
                style={{ color: '#4B7BF5' }}
              >
                Quero começar agora <ArrowUpRight size={16} />
              </a>
            ) : (
              <button className="mt-8 inline-flex items-center gap-2 text-sm font-medium hover:-translate-y-px transition-transform duration-200 self-start" style={{ color: '#4B7BF5' }}>
                Saiba mais <ArrowUpRight size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="rounded-3xl px-8 py-5 flex items-center gap-3" style={{ background: '#111111', border: '0.5px solid rgba(255,255,255,0.1)' }}>
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'rgba(75,123,245,0.5)' }} />
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span className="font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Outros módulos em desenvolvimento:</span>{' '}
            análise de natação, corrida, monitoramento em tempo real, integração fisiológica.
          </p>
        </div>
      </div>
    </section>
  )
}
