import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { mediaUrl } from '../lib/supabase'

const dataPoints = [
  { label: 'VO2', value: '68.4', unit: 'ml/kg/min' },
  { label: 'Lactato', value: '2.1', unit: 'mmol/L' },
  { label: 'Potência', value: '342', unit: 'W' },
  { label: 'FC', value: '171', unit: 'bpm' },
  { label: 'Cadência', value: '94', unit: 'rpm' },
]

function DataTypewriter() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const point = dataPoints[currentIndex]
    const fullText = `${point.label}: ${point.value} ${point.unit}`

    if (isTyping) {
      if (displayed.length < fullText.length) {
        const t = setTimeout(() => setDisplayed(fullText.slice(0, displayed.length + 1)), 60)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setIsTyping(false), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30)
        return () => clearTimeout(t)
      } else {
        setCurrentIndex((i) => (i + 1) % dataPoints.length)
        setIsTyping(true)
      }
    }
  }, [displayed, isTyping, currentIndex])

  const point = dataPoints[currentIndex];
  return (
    <div className="inline-flex items-center gap-3 bg-[#0A2463] rounded-2xl px-5 py-3 shadow-[0_4px_20px_rgba(10,36,99,0.25)]">
      <span className="font-mono text-xs text-white/50 uppercase tracking-wider min-w-[60px]">{point.label}</span>
      <div className="w-px h-4 bg-white/20" />
      <div className="flex items-baseline gap-1.5 min-w-[130px]">
        <span className="font-mono text-xl font-semibold text-white tracking-tight leading-none">{displayed.split(': ')[1]?.split(' ')[0] ?? ''}</span>
        <span className="font-mono text-xs text-white/50">{point.unit}</span>
        <span className="cursor-blink font-mono text-white/40 text-base leading-none">|</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const subtitleRef = useRef(null)
  const ctasRef = useRef(null)
  const dataBarRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([line1Ref.current, line2Ref.current, subtitleRef.current, ctasRef.current, dataBarRef.current], {
        opacity: 0,
        y: 40,
      })

      gsap.to([line1Ref.current, line2Ref.current, subtitleRef.current, ctasRef.current, dataBarRef.current], {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.3,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-white"
    >
      {/* Video is intentionally positioned outside the grid so it bleeds to the viewport edge */}
      <div className="hidden lg:block absolute top-0 right-0 h-full w-[60%] z-0">
        <video
          src={mediaUrl('gui-tracked.mp4')}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-top"
        />
        {/* Blend só na borda esquerda — transição suave para o branco do texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" style={{ width: '40%' }} />
        <div className="absolute left-0 top-0 h-full w-[35%] bg-gradient-to-r from-white to-transparent" />

        {/* Badge Ao vivo */}
        <div className="absolute top-8 right-8 flex items-center gap-2 bg-white/80 backdrop-blur-md border border-[#E5E5E2] rounded-full px-3 py-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-[10px] text-[#0A0A0A] uppercase tracking-widest">Ao vivo</span>
        </div>

        {/* Data overlay card */}
        <div className="absolute bottom-16 right-8 bg-white/90 backdrop-blur-md border border-[#E5E5E2] rounded-3xl p-5 w-60 shadow-[0_8px_40px_rgba(10,36,99,0.14)]">
          <div className="font-mono text-[10px] text-[#4A4A47] uppercase tracking-widest mb-3">Análise em tempo real</div>
          <div className="space-y-2.5">
            {[
              { label: 'VO₂ máx', value: '68.4 ml/kg/min' },
              { label: 'Risco lesão', value: 'BAIXO' },
              { label: 'Performance', value: '94/100' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-xs text-[#4A4A47]">{item.label}</span>
                <span className="font-mono text-xs font-semibold text-[#0A2463]">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-[#E5E5E2]">
            <div className="flex justify-between mb-1.5">
              <span className="font-mono text-[10px] text-[#4A4A47]">Rastreamento</span>
              <span className="font-mono text-[10px] text-[#0A2463]">98%</span>
            </div>
            <div className="w-full h-1 bg-[#E5E5E2] rounded-full overflow-hidden">
              <div className="h-full bg-[#0A2463] rounded-full" style={{ width: '98%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Left content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-[40%_60%] gap-0 items-center min-h-[100dvh]">

          {/* Text column */}
          <div className="flex flex-col justify-center py-24 lg:py-0 pr-0 lg:pr-12">

            {/* Label */}
            <div ref={dataBarRef} className="mb-8">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-[#4A4A47] border border-[#E5E5E2] rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A2463] animate-pulse" />
                Conectado ao LACAE
              </span>
            </div>

            {/* Headline */}
            <div className="mb-6">
              <div ref={line1Ref}>
                <p className="font-sans font-semibold text-4xl lg:text-5xl xl:text-6xl text-[#0A0A0A] tracking-tight leading-none mb-1">
                  Ciência no
                </p>
              </div>
              <div ref={line2Ref}>
                <p className="font-bold text-5xl lg:text-7xl xl:text-[5.5rem] text-[#0A2463] leading-none tracking-tight">
                  momento certo.
                </p>
              </div>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-base lg:text-lg text-[#4A4A47] leading-relaxed max-w-md mb-10"
            >
              Inteligência artificial, biomecânica e metabolômica para predição
              de desempenho, prevenção de lesões e monitoramento fisiológico de
              atletas de alto rendimento.
            </p>

            {/* CTAs */}
            <div ref={ctasRef} className="flex flex-wrap gap-3">
              <a
                href="#waitlist"
                className="btn-magnetic btn-slide inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-[#0A2463] rounded-full"
              >
                <div className="slide-fill bg-[#1E3A8A]" />
                <span>Entrar na lista de espera</span>
                <ArrowRight size={16} />
              </a>
              <a
                href="#avaliacoes"
                className="btn-magnetic inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-[#0A2463] border border-[#E5E5E2] rounded-full hover:border-[#0A2463] transition-colors duration-200"
              >
                Conhecer nossas avaliações
              </a>
            </div>

            {/* Live data — redesigned */}
            <div className="mt-10 pt-8 border-t border-[#E5E5E2]">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#0A2463] animate-pulse" />
                <span className="font-mono text-xs text-[#4A4A47] uppercase tracking-widest">Leitura ao vivo</span>
              </div>
              <DataTypewriter />
              <div className="flex gap-5 mt-4 flex-wrap">
                {dataPoints.map((p) => (
                  <div key={p.label} className="flex flex-col">
                    <span className="font-mono text-[10px] text-[#4A4A47]/60 uppercase tracking-wider">{p.label}</span>
                    <span className="font-mono text-sm font-bold text-[#0A2463]">{p.value} <span className="text-[10px] font-normal text-[#4A4A47]">{p.unit}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#4A4A47] animate-bounce">
        <ChevronDown size={20} />
      </div>
    </section>
  )
}
