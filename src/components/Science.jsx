import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Wind, Activity, Zap, FlaskConical } from 'lucide-react'
import { mediaUrl } from '../lib/supabase'

const evaluations = [
  {
    id: 'vo2max',
    num: '01',
    icon: Wind,
    title: 'VO₂máx',
    subtitle: 'Consumo Máximo de Oxigênio',
    image: mediaUrl('vo2max.png'),
    tag: 'Capacidade Aeróbica',
    modalities: ['Ciclistas', 'Triatletas', 'Corredores', 'Nadadores'],
    cta_headline: 'Descubra o teto aeróbico que está te limitando',
    description:
      'Seu VO₂máx define o quanto de oxigênio seu corpo consegue usar em esforço máximo. É esse número que separa atletas que travam nos momentos decisivos dos que aceleram. Meça com precisão de laboratório e saiba exatamente onde investir no seu treinamento.',
    science:
      'O atleta é monitorado em tempo real por ergoespirometria durante teste incremental em esteira ou cicloergômetro. A KAIRÓS integra consumo ventilatório, frequência cardíaca e percepção subjetiva de esforço, gerando um perfil funcional preciso e replicável.',
    metrics: [
      { label: 'Precisão', value: '±2%' },
      { label: 'Variáveis', value: '12+' },
      { label: 'Correlação', value: 'r=0.94' },
    ],
  },
  {
    id: 'lactato',
    num: '02',
    icon: Activity,
    title: 'Limiar Anaeróbico',
    subtitle: 'Avaliação por Lactato Sanguíneo',
    image: mediaUrl('limiarlactato.png'),
    tag: 'Limiar Metabólico',
    modalities: ['Ciclistas', 'Triatletas', 'Corredores'],
    cta_headline: 'Pare de treinar no escuro',
    description:
      'Você sabe em qual intensidade seu corpo começa a acumular fadiga de verdade? Sem essa resposta, qualquer plano de treino é um chute. O limiar anaeróbico define a linha entre progredir e estagnar — e a KAIRÓS te mostra exatamente onde ela está.',
    science:
      'Coletas de sangue capilar a cada estágio incremental. A KAIRÓS analisa a cinética do lactato com algoritmos de detecção de ponto de inflexão, identificando LT1, LT2/MLSS e zonas fisiologicamente fundamentadas.',
    metrics: [
      { label: 'Coletas', value: '6–8' },
      { label: 'Zonas', value: '5' },
      { label: 'Precisão LT2', value: '±3W' },
    ],
  },
  {
    id: 'wingate',
    num: '03',
    icon: Zap,
    title: 'Teste de Wingate',
    subtitle: 'Potência Anaeróbica Máxima',
    image: mediaUrl('wingate.png'),
    tag: 'Força & Potência',
    modalities: ['Futebolistas', 'Ciclistas', 'Sprinters'],
    cta_headline: 'Quanto de potência você realmente tem?',
    description:
      'Nos 30 segundos mais intensos da sua vida esportiva, o que o seu corpo entrega? O Wingate revela seu pico de potência, sua média e o quanto você cai — dados que definem sprints, acelerações e toda situação de esforço explosivo no esporte.',
    science:
      'A KAIRÓS captura a curva de potência instante a instante (10 ms), calculando potência absoluta e relativa (W/kg), índice de fadiga e taxa de declínio com comparação a bancos de dados normativos estratificados.',
    metrics: [
      { label: 'Duração', value: '30s' },
      { label: 'Métricas', value: '8' },
      { label: 'Resolução', value: '10ms' },
    ],
  },
]

export default function Science() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const autoRef = useRef(null)
  const imgElRefs = useRef([])
  const contentRef = useRef(null)
  const [barWidth, setBarWidth] = useState(0)
  const [barTransition, setBarTransition] = useState('none')

  const current = evaluations[active]

  const goTo = (index) => {
    if (index === active) return
    gsap.to(contentRef.current, {
      opacity: 0, y: 12, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        setActive(index)
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
        )
      }
    })
  }

  const startAuto = () => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % evaluations.length)
    }, 6000)
  }

  useEffect(() => {
    startAuto()
    return () => clearInterval(autoRef.current)
  }, [])

  const handleNav = (i) => { goTo(i); startAuto() }

  // Progress bar — reset and restart on active change
  useEffect(() => {
    setBarTransition('none')
    setBarWidth(0)
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setBarTransition('width 6s linear')
        setBarWidth(100)
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [active])

  // Scroll entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sci-head > *', {
        opacity: 0, y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })
      gsap.from('.sci-panel', {
        opacity: 0, y: 36,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.sci-panel', start: 'top 80%', once: true },
      })
      gsap.from('.sci-sidebar > *', {
        opacity: 0, x: 20,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.sci-sidebar', start: 'top 78%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Parallax on images
  useEffect(() => {
    const triggers = []
    imgElRefs.current.forEach((img) => {
      if (!img) return
      gsap.set(img, { y: '-30%' })
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const y = gsap.utils.interpolate(-30, 30, self.progress)
          gsap.set(img, { y: `${y}%` })
        },
      })
      triggers.push(st)
    })
    return () => triggers.forEach(st => st.kill())
  }, [])

  return (
    <section
      ref={sectionRef}
      id="ciencia"
      className="py-24 lg:py-32 px-6 bg-[#0A0A0A] overflow-hidden rounded-t-[2rem]"
      style={{ borderRadius: '2.5rem 2.5rem 0 0', marginTop: '-2.5rem', position: 'relative', zIndex: 1 }}
    >
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="sci-head mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#0A2463]" />
              <span className="font-mono text-[10px] text-[#6B6B67] uppercase tracking-widest">
                Nossas avaliações
              </span>
            </div>
            <h2 className="font-sans text-3xl lg:text-5xl text-white tracking-tight leading-tight">
              Avaliações que revelam o{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>seu potencial real</span>
            </h2>
          </div>
          <p className="text-[#6B6B67] text-sm leading-relaxed max-w-sm lg:text-right">
            Diagnósticos fisiológicos de elite, antes exclusivos de centros olímpicos. Agora disponíveis para atletas, times e clubes que levam performance a sério.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">

          {/* Left: Big panel */}
          <div className="sci-panel relative bg-[#111111] rounded-3xl overflow-hidden" style={{ minHeight: 'min(560px, 80vw)', isolation: 'isolate' }}>

            {/* Background image — all 3 stacked, only active visible */}
            {evaluations.map((ev, i) => (
              <div
                key={ev.id}
                className="absolute inset-0 transition-opacity duration-700 overflow-hidden"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                <img
                  ref={el => imgElRefs.current[i] = el}
                  src={ev.image}
                  alt={ev.title}
                  className="block"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '110%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(to top, #111111 0%, rgba(17,17,17,0.6) 40%, transparent 100%), linear-gradient(to right, rgba(17,17,17,0.5) 0%, transparent 55%)'
                }} />
              </div>
            ))}

            {/* Oversized number */}
            <div
              className="absolute top-6 right-8 font-mono font-bold text-white/5 select-none leading-none"
              style={{ fontSize: 'clamp(60px, 18vw, 160px)' }}
            >
              {current.num}
            </div>

            {/* Content overlay */}
            <div ref={contentRef} className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-12" style={{ minHeight: 'min(560px, 80vw)' }}>

              {/* Tag */}
              <span className="inline-flex w-fit font-mono text-[10px] uppercase tracking-widest border border-white/20 text-white/60 px-3 py-1.5 rounded-full mb-5 backdrop-blur-sm">
                {current.tag}
              </span>


              {/* Title */}
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-sans font-bold text-3xl lg:text-4xl text-white leading-none">
                  {current.title}
                </h3>
              </div>
              <p className="font-mono text-xs text-white/50 mb-5">{current.subtitle}</p>

              {/* CTA headline */}
              <p className="font-sans font-semibold text-lg text-white leading-snug mb-3">
                {current.cta_headline}
              </p>

              {/* Description */}
              <p className="text-sm text-white/70 leading-relaxed max-w-lg mb-7">
                {current.description}
              </p>

              {/* Metrics row */}
              <div className="flex flex-wrap gap-3">
                {current.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5 text-center"
                  >
                    <p className="font-mono font-bold text-white text-base leading-none">{m.value}</p>
                    <p className="font-mono text-[9px] text-white/40 uppercase tracking-wide mt-1">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: 9999, marginTop: '12px' }}>
                <div
                  style={{
                    height: 2,
                    width: `${barWidth}%`,
                    background: '#4B7BF5',
                    borderRadius: 9999,
                    transition: barTransition,
                  }}
                />
              </div>

            </div>


            {/* Bottom nav bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-8 lg:px-12 py-5">
              <div className="flex gap-2">
                {evaluations.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleNav(i)}
                    className="transition-all duration-400 rounded-full"
                    style={{
                      width: i === active ? 28 : 6,
                      height: 6,
                      background: i === active ? '#4B7BF5' : 'rgba(255,255,255,0.2)'
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleNav((active - 1 + evaluations.length) % evaluations.length)}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-all duration-200"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => handleNav((active + 1) % evaluations.length)}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-all duration-200"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="sci-sidebar flex flex-col gap-4 mt-6 lg:mt-0">

            {/* Methodology box */}
            <div className="bg-[#111111] rounded-3xl p-6 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <FlaskConical size={14} style={{ color: '#4B7BF5' }} />
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#4B7BF5' }}>
                  Metodologia KAIRÓS
                </span>
              </div>
              <p className="text-sm text-[#8B8B87] leading-relaxed">{current.science}</p>

              {/* Badges de modalidade */}
              <div className="flex flex-wrap gap-2 mb-4">
                {current.modalities.map((mod) => (
                  <span
                    key={mod}
                    className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(75,123,245,0.1)',
                      border: '1px solid rgba(75,123,245,0.2)',
                      color: '#4B7BF5',
                    }}
                  >
                    {mod}
                  </span>
                ))}
              </div>
              <a
                href="#waitlist"
                onClick={(e) => {
                  e.preventDefault()
                  const t = document.querySelector('#waitlist')
                  if (window.lenis) window.lenis.scrollTo(t, { duration: 1.4, easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)) })
                  else t?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center justify-center gap-2 mt-5 px-4 py-2.5 rounded-full text-sm font-medium w-full transition-all duration-200 hover:opacity-90"
                style={{ background: '#4B7BF5', color: 'white' }}
              >
                Agende sua avaliação
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Evaluation tabs */}
            <div className="bg-[#111111] rounded-3xl p-3 flex flex-col gap-1">
              {evaluations.map((ev, i) => {
                const TabIcon = ev.icon
                return (
                  <button
                    key={ev.id}
                    onClick={() => handleNav(i)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 group"
                    style={{
                      background: i === active ? 'rgba(75,123,245,0.12)' : 'transparent',
                      borderLeft: i === active ? '2px solid #4B7BF5' : '2px solid transparent',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{
                        background: i === active ? 'rgba(75,123,245,0.2)' : 'rgba(255,255,255,0.05)',
                      }}
                    >
                      <TabIcon
                        size={14}
                        style={{ color: i === active ? '#4B7BF5' : '#6B6B67' }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium leading-none mb-0.5"
                        style={{ color: i === active ? 'white' : '#6B6B67' }}
                      >
                        {ev.title}
                      </p>
                      <p className="font-mono text-[10px] text-[#4A4A47]">{ev.subtitle}</p>
                    </div>
                    <span
                      className="ml-auto font-mono text-[10px]"
                      style={{ color: i === active ? '#4B7BF5' : '#3A3A37' }}
                    >
                      {ev.num}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Bottom badge */}
            <div className="bg-[#111111] rounded-3xl px-5 py-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#4B7BF5', boxShadow: '0 0 6px #4B7BF5' }} />
              <p className="text-xs text-[#6B6B67] leading-relaxed">
                Protocolos baseados em literatura científica revisada por pares. Precisão clínica aplicada ao esporte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
