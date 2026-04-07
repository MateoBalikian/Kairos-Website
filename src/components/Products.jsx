import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import { Activity, Zap, Wind } from 'lucide-react'
import { mediaUrl } from '../lib/supabase'

const products = [
  {
    id: 'futebol',
    name: 'Futebol',
    badge: 'Trocker · LACAE',
    badgeStyle: { background: 'rgba(75,123,245,0.12)', color: '#4B7BF5', border: '1px solid rgba(75,123,245,0.25)' },
    icon: Activity,
    cta: { label: 'Quero aplicar no meu time →', style: 'gradient' },
    description:
      'Rastreamento automático de múltiplos atletas durante o Teste Yo-Yo IR1 — distância percorrida, velocidade de pico e índice de fadiga calculados frame a frame, sem câmeras especiais ou sensores.',
    features: [
      'Rastreamento multi-atleta simultâneo',
      'Distância percorrida por estágio',
      'Detecção automática de fadiga',
      'Exportação de laudo em PDF',
    ],
    highlight: {
      label1: 'Distância máxima',
      value1: '1.760m',
      label2: 'Velocidade de pico',
      value2: '18.4 km/h',
    },
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
    id: 'ciclismo',
    name: 'Ciclismo',
    badge: 'Pose Estimation · LACAE',
    badgeStyle: { background: 'rgba(75,123,245,0.12)', color: '#4B7BF5', border: '1px solid rgba(75,123,245,0.25)' },
    icon: Zap,
    cta: { label: 'Quero avaliar minha pedalada →', style: 'gradient' },
    description:
      'Keypoints rastreados em tempo real identificam ângulo do joelho, quadril e cotovelo durante a pedalada. Combinado com o Wingate, entregamos posição ideal na bike e zonas de potência personalizadas.',
    features: [
      'Análise biomecânica da pedalada',
      'Detecção de assimetrias e compensações',
      'Potência anaeróbica via Wingate',
      'Prescrição de zonas de treino',
    ],
    highlight: {
      label1: 'Ângulo ideal do joelho',
      value1: '142°',
      label2: 'Potência de pico',
      value2: '9.1 W/kg',
    },
    media: (
      <video
        src={mediaUrl('henrique.mp4')}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    ),
  },
  {
    id: 'natacao',
    name: 'Natação',
    badge: 'VO₂máx · RMN · LACAE',
    badgeStyle: { background: 'rgba(75,123,245,0.12)', color: '#4B7BF5', border: '1px solid rgba(75,123,245,0.25)' },
    icon: Wind,
    cta: { label: 'Quero meu perfil fisiológico →', style: 'gradient' },
    description:
      'Keypoints rastreados em tempo real identificam padrões de braçada, assimetrias e eficiência técnica durante a nado. Combinado com VO₂máx e metabolômica por RMN, entregamos o perfil fisiológico completo da nadadora.',
    features: [
      'Análise biomecânica da braçada por pose estimation',
      'Detecção de assimetrias e compensações técnicas',
      'VO₂máx e limiar anaeróbico em protocolo aquático',
      'Perfil metabólico completo por RMN',
    ],
    highlight: {
      label1: 'VO₂máx',
      value1: '71 ml/kg/min',
      label2: 'Metabólitos analisados',
      value2: '200+',
    },
    media: (
      <video
        src={mediaUrl('nado_web.mp4')}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    ),
  },
]


const INTERVAL_MS = 8000

export default function Products() {
  const [active, setActive] = useState(0)
  const [panelVisible, setPanelVisible] = useState(true)
  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const progressBarRef = useRef(null)
  const intervalRef = useRef(null)
  const rafRef = useRef(null)
  const mediaRef = useRef(null)
  const startTimeRef = useRef(null)
  const switchingToRef = useRef(null)

  // Fade switch: out 150ms → swap → in 300ms
  const switchTo = useCallback((next) => {
    if (switchingToRef.current !== null) return
    switchingToRef.current = next
    setPanelVisible(false)
    setTimeout(() => {
      setActive(next)
      switchingToRef.current = null
      setPanelVisible(true)
    }, 150)
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
        switchTo(next)
        return prev
      })
      startTimeRef.current = performance.now()
      if (progressBarRef.current) progressBarRef.current.style.width = '0%'
    }, INTERVAL_MS)
  }, [switchTo])

  const handleTab = (index) => {
    if (index === active) return
    switchTo(index)
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

  // Listener para seleção de produto via evento (ex: links do Footer)
  useEffect(() => {
    const handler = (e) => {
      const idx = products.findIndex((p) => p.id === e.detail)
      if (idx !== -1) {
        switchTo(idx)
        startTimer()
      }
    }
    window.addEventListener('selectProduct', handler)
    return () => window.removeEventListener('selectProduct', handler)
  }, [switchTo, startTimer])

  useEffect(() => {
    if (!mediaRef.current) return
    const el = mediaRef.current
    gsap.set(el, { y: '-10%' })
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const y = gsap.utils.interpolate(-10, 10, self.progress)
        gsap.set(el, { y: `${y}%` })
      },
    })
    return () => st.kill()
  }, [active])


  const product = products[active]
  const Icon = product.icon

  return (
    <section ref={sectionRef} id="produtos" className="py-24 lg:py-32 px-6 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto">

        <div className="products-header mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-[#6B6B67] uppercase tracking-widest">Nossas aplicações</span>
            <h2 className="font-sans font-light text-3xl lg:text-4xl xl:text-5xl text-white tracking-tight mt-3">
              Ciência aplicada{' '}
              <span className="font-bold text-[#4B7BF5]">a cada modalidade</span>
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
          style={{
            background: '#111111',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            border: '0.5px solid #1a1a1a',
            minHeight: '520px',
            opacity: panelVisible ? 1 : 0,
            transition: panelVisible ? 'opacity 300ms ease' : 'opacity 150ms ease',
          }}
        >
          <div style={{ background: '#0A0A0A', height: '480px', overflow: 'hidden' }}>
            <div ref={mediaRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }}>{product.media}</div>
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


              {product.highlight && (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div
                    className="rounded-2xl p-4 text-center"
                    style={{ background: 'rgba(75,123,245,0.08)', border: '1px solid rgba(75,123,245,0.15)' }}
                  >
                    <p className="font-mono font-bold text-xl text-white leading-none">
                      {product.highlight.value1}
                    </p>
                    <p className="font-mono text-[10px] text-white/40 uppercase tracking-wide mt-1.5">
                      {product.highlight.label1}
                    </p>
                  </div>
                  <div
                    className="rounded-2xl p-4 text-center"
                    style={{ background: 'rgba(75,123,245,0.08)', border: '1px solid rgba(75,123,245,0.15)' }}
                  >
                    <p className="font-mono font-bold text-xl text-white leading-none">
                      {product.highlight.value2}
                    </p>
                    <p className="font-mono text-[10px] text-white/40 uppercase tracking-wide mt-1.5">
                      {product.highlight.label2}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#waitlist"
              onClick={(e) => {
                e.preventDefault()
                const t = document.querySelector('#waitlist')
                if (window.lenis) window.lenis.scrollTo(t, { duration: 1.4, easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)) })
                else t?.scrollIntoView({ behavior: 'smooth' })
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: product.cta.style === 'gradient'
                  ? 'linear-gradient(135deg, #4B7BF5, #0A2463)'
                  : 'white',
                color: product.cta.style === 'gradient' ? 'white' : '#0A0A0A',
                padding: '14px 28px',
                borderRadius: '99px',
                fontWeight: '600',
                fontSize: '0.95rem',
                letterSpacing: product.cta.style === 'gradient' ? '0.02em' : undefined,
                marginTop: '24px',
                transition: 'opacity 0.2s ease',
                cursor: 'pointer',
              }}
            >
              {product.cta.label}
            </a>
          </div>
        </div>


      </div>
    </section>
  )
}
