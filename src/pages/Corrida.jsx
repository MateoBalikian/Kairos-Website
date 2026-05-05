import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { mediaUrl, saveLead } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

function useCounter(target, duration = 2000, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return value
}

function GraficoLactato() {
  return (
    <svg width="100%" viewBox="0 0 560 340" style={{ display: 'block' }}>
      <rect x="0" y="0" width="560" height="340" fill="#0d0d0d" rx="12" />
      <text x="280" y="28" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700" fill="white">Treinamento pelo Limiar de Lactato</text>
      <text x="280" y="44" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.3)" letterSpacing="2">Veltron</text>
      <line x1="60" y1="270" x2="520" y2="270" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="60" y1="210" x2="520" y2="210" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="60" y1="150" x2="520" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="60" y1="90" x2="520" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="60" y1="65" x2="60" y2="270" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text transform="translate(16,175) rotate(-90)" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="10" fill="rgba(255,255,255,0.35)">Acido Latico</text>
      <text x="52" y="274" textAnchor="end" fontFamily="DM Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.25)">Baixo</text>
      <text x="52" y="154" textAnchor="end" fontFamily="DM Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.25)">Medio</text>
      <text x="52" y="94" textAnchor="end" fontFamily="DM Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.25)">Alto</text>
      <text x="290" y="298" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="10" fill="rgba(255,255,255,0.35)">Velocidade</text>
      <path d="M120,258 C180,255 240,245 290,185 C330,130 370,95 430,82" fill="none" stroke="#7BA7E8" strokeWidth="2" strokeDasharray="6 3" opacity="0.8" />
      <path d="M120,262 C200,258 270,252 350,210 C410,175 450,125 500,88" fill="none" stroke="#4B7BF5" strokeWidth="2.5" />
      <line x1="290" y1="65" x2="290" y2="270" stroke="#7BA7E8" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
      <line x1="390" y1="65" x2="390" y2="270" stroke="#4B7BF5" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
      <circle cx="290" cy="185" r="4" fill="#7BA7E8" opacity="0.9" />
      <circle cx="390" cy="175" r="4" fill="#4B7BF5" />
      <text x="276" y="178" textAnchor="end" fontFamily="DM Mono, monospace" fontSize="8" fill="#7BA7E8">antes</text>
      <text x="402" y="168" textAnchor="start" fontFamily="DM Mono, monospace" fontSize="8" fill="#4B7BF5">apos treino</text>
    </svg>
  )
}

function GraficoMetabolomica() {
  const points = {
    JDM: [[45, 120], [80, 145], [55, 95], [90, 110], [70, 130], [100, 100], [60, 115], [85, 125]],
    US: [[180, 140], [200, 120], [170, 155], [210, 135], [190, 115], [220, 145], [175, 125], [205, 110]],
    HC: [[290, 130], [310, 115], [280, 145], [320, 120], [300, 105], [330, 135], [270, 118], [315, 140]],
  }
  const colors = { JDM: '#F5A623', US: '#4B7BF5', HC: '#2ECC71' }
  return (
    <svg width="100%" viewBox="0 0 400 220" style={{ display: 'block' }}>
      <rect x="0" y="0" width="400" height="220" fill="#0d0d0d" rx="12" />
      <text x="200" y="18" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="700" fill="white">Analise de Componentes Principais (PCA)</text>
      <text x="200" y="30" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="8" fill="rgba(255,255,255,0.3)" letterSpacing="1">Separação metabólica por RMN · Veltron</text>
      <line x1="30" y1="175" x2="380" y2="175" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="30" y1="40" x2="30" y2="175" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="205" y="192" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="8" fill="rgba(255,255,255,0.3)">PC1 (14.4%)</text>
      {Object.entries(points).map(([group, pts]) =>
        pts.map(([x, y], i) => (
          <circle key={`${group}-${i}`} cx={x} cy={y} r="5" fill={colors[group]} opacity="0.85" />
        ))
      )}
      {Object.entries(colors).map(([group, color], i) => (
        <g key={group}>
          <circle cx={45 + i * 52} cy="50" r="4" fill={color} opacity="0.85" />
          <text x={52 + i * 52} y="54" fontFamily="DM Sans, sans-serif" fontSize="9" fill="rgba(255,255,255,0.6)">{group}</text>
        </g>
      ))}
    </svg>
  )
}

const avaliacoes = [
  {
    tag: 'Visão Computacional',
    titulo: 'Pose Estimation',
    subtitulo: 'Rastreamento de 17 pontos articulares em 120 FPS',
    problema: 'Você treina pela sensação, mas a câmera não mente. Oscilação vertical excessiva, ataque de calcanhar sob fadiga e assimetria de voo são invisíveis a olho nu — e custam minutos na sua prova.',
    oQueMede: 'Rastreamento biomecânico completo via visão computacional: Oscilação Vertical, Tempo de Contato com o Solo, Angulação de Ataque do Pé e Simetria L/R em tempo real.',
    oQueRevela: [
      'Oscilação vertical excessiva que desperdiça energia elástica',
      'Ataque de calcanhar como escolha técnica ou consequência da fadiga',
      'Assimetria entre perna direita e esquerda que prediz lesão',
      'Degradação biomecânica acima da velocidade de limiar',
    ],
    comoFazemos: 'Upload de vídeo em esteira ou outdoor. O algoritmo Veltron rastreia 17 pontos articulares frame a frame e gera relatório com índices de eficiência e alertas técnicos.',
    grafico: null,
    cor: '#22d3ee',
  },
  {
    tag: 'Fisiologia',
    titulo: 'Limiar Anaeróbico',
    subtitulo: 'A intensidade exata onde a fadiga começa',
    problema: 'Seu pace de GPS não sabe onde está o seu limiar. Você pode estar treinando na zona errada há meses — acumulando fadiga crônica ou subutilizando seu potencial aeróbico.',
    oQueMede: 'O ponto exato de velocidade onde o lactato sanguíneo começa a acumular mais rápido do que o corpo remove. Base científica para prescrição de zonas de treino individuais.',
    oQueRevela: [
      'Sua vLT1 e vLT2 reais — não estimativas de app',
      'Por que você trava no final de provas mesmo parecendo bem treinado',
      'Como distribuir intensidade em treinos longos sem acumular fadiga',
      'O ritmo sustentável real para cada distância de prova',
    ],
    comoFazemos: 'Protocolo incremental em esteira com coletas de sangue capilar a cada estágio. Análise da cinética do lactato com identificação de LT1 e LT2/MLSS. Conduzido na Veltron com pesquisadores.',
    grafico: 'lactato',
    cor: '#4B7BF5',
  },
  {
    tag: 'Metabolômica',
    titulo: 'Metabolômica por RMN',
    subtitulo: '200+ metabólitos que revelam o que nenhum teste convencional enxerga',
    problema: 'Fadiga persistente, recuperação lenta, desempenho estagnado. Os exames convencionais voltam normais. Mas o problema está no metabolismo — e só a metabolômica consegue mapear.',
    oQueMede: 'Perfil metabólico completo via Ressonância Magnética Nuclear: 200+ metabólitos envolvidos em recuperação, adaptação ao treino, deficiências nutricionais e status energético celular.',
    oQueRevela: [
      'Deficiências nutricionais invisíveis que limitam recuperação',
      'Status de adaptação muscular ao volume de treino atual',
      'Marcadores de overtraining antes dos sintomas aparecerem',
      'Assinatura metabólica individual para otimização de suplementação',
    ],
    comoFazemos: 'Coleta de sangue com análise por RMN de alta resolução. Relatório com mapeamento dos principais vias metabólicas e recomendações individualizadas baseadas no seu perfil.',
    grafico: 'metabolomica',
    cor: '#10b981',
  },
]

export default function Corrida() {
  const heroRef = useRef(null)
  const metricsRef = useRef(null)
  const btnRef = useRef(null)
  const [metricsStarted, setMetricsStarted] = useState(false)
  const [activeAv, setActiveAv] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', profile: '', message: '' })

  const v1 = useCounter(185, 1800, metricsStarted)
  const v2 = useCounter(17, 1800, metricsStarted)
  const v3 = useCounter(200, 1800, metricsStarted)

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hi'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo('.av-card', { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.av-section', start: 'top 80%' }
        })
      ScrollTrigger.create({
        trigger: metricsRef.current, start: 'top 75%',
        onEnter: () => setMetricsStarted(true),
      })
    })
    const btn = btnRef.current
    if (btn) {
      const mv = (e) => {
        const r = btn.getBoundingClientRect()
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.4, ease: 'power2.out' })
      }
      const ml = () => gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' })
      btn.addEventListener('mousemove', mv)
      btn.addEventListener('mouseleave', ml)
      return () => { ctx.revert(); btn.removeEventListener('mousemove', mv); btn.removeEventListener('mouseleave', ml) }
    }
    return () => ctx.revert()
  }, [])

  const av = avaliacoes[activeAv]

  const smoothScrollTo = (id) => {
    const target = document.getElementById(id)
    if (!target) return
    if (window.lenis) {
      window.lenis.scrollTo(target, { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar forceDark hideLinks />

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-black">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"
          src={mediaUrl('herocorrida.mp4')} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.75) 100%)' }} />

        {/* Floating stat cards — desktop */}
        <div className="hi absolute right-[clamp(24px,5vw,80px)] bottom-[clamp(80px,18vh,200px)] hidden lg:flex flex-col gap-4 z-10">
          <div className="rounded-2xl px-5 py-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(123,167,232,0.35)' }}>
            <p className="font-mono font-bold text-3xl" style={{ color: '#7BA7E8' }}>185</p>
            <p className="font-mono text-xs text-white/50 mt-1 max-w-[160px]">Passadas por Minuto (SPM)</p>
          </div>
          <div className="rounded-2xl px-5 py-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(46,204,113,0.35)' }}>
            <p className="font-mono font-bold text-3xl" style={{ color: '#2ECC71' }}>vL2</p>
            <p className="font-mono text-xs text-white/50 mt-1 max-w-[160px]">Velocidade de Limiar</p>
          </div>
        </div>

        <div className="absolute z-10 left-[clamp(24px,5vw,72px)] right-[clamp(24px,5vw,64px)] bottom-[clamp(80px,12vh,140px)] max-w-[640px]">
          <div className="hi flex items-center gap-3 mb-6">
            <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-white/50 hover:text-white transition-colors">
              <ArrowLeft size={14} /> Veltron
            </Link>
            <span className="text-white/20">·</span>
            <span className="font-mono text-xs text-[#22d3ee] uppercase tracking-widest">Running Elite: Vision IA &amp; Metatreadmill</span>
          </div>
          <h1 className="hi font-sans font-bold text-white" style={{ fontSize: 'clamp(2.2rem,5vw,4.5rem)', lineHeight: 1.05 }}>
            A Ciência da<br />
            <span style={{ background: 'linear-gradient(90deg, #22d3ee, #4B7BF5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Economia de Corrida</span>
          </h1>
          <p className="hi mt-5 text-white/70 leading-relaxed" style={{ fontSize: 'clamp(1rem,1.5vw,1.15rem)', maxWidth: 520 }}>
            A única plataforma que correlaciona Cinemetria em Tempo Real com Cinética do Lactato para identificar o colapso técnico sob fadiga.
          </p>
          <div className="hi flex flex-wrap gap-2 mt-5">
            {['Pose Estimation', 'Limiar Anaeróbico', 'Metabolômica por RMN', 'Vision IA', 'Metatreadmill'].map(t => (
              <span key={t} className="font-mono text-[11px] text-white/50 border border-white/15 rounded-full px-3 py-1"
                style={{ backdropFilter: 'blur(4px)', background: 'rgba(255,255,255,0.04)' }}>{t}</span>
            ))}
          </div>
          <a href="#agendar" onClick={(e) => { e.preventDefault(); smoothScrollTo('agendar') }} className="hi inline-flex items-center gap-3 mt-8 hover:opacity-90 transition-opacity"
            style={{ background: 'white', borderRadius: 99, padding: '14px 28px', color: '#0A0A0A', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1.5px', textDecoration: 'none' }}>
            FALE CONOSCO
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ background: '#0A0A0A' }}>
              <ArrowRight size={13} color="white" />
            </span>
          </a>
        </div>
      </section>

      {/* DIFERENCIAL */}
      <section className="py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto">
          <div className="rounded-3xl px-8 py-7 flex flex-col lg:flex-row items-start lg:items-center gap-6"
            style={{ background: 'rgba(75,123,245,0.07)', border: '1px solid rgba(75,123,245,0.2)' }}>
            <div className="flex-1">
              <p className="font-mono text-xs text-[#4B7BF5] uppercase tracking-widest mb-2">Por que a Veltron é diferente</p>
              <p className="font-sans font-bold text-white text-xl lg:text-2xl leading-snug">
                Apps de corrida dizem o que você fez.{' '}
                <span style={{ color: '#4B7BF5' }}>A Veltron diz por que você rendeu assim — e o que fazer.</span>
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              {[
                'Pace por GPS',
                'VO₂ estimado por app',
                'Cadência por relógio',
              ].map(c => (
                <div key={c} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px]"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}>✕</span>
                  <span className="font-mono text-xs text-white/30">{c}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 mt-1">
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px]"
                  style={{ background: 'rgba(75,123,245,0.2)', color: '#4B7BF5' }}>v</span>
                <span className="font-mono text-xs text-[#4B7BF5]">Veltron — biologia real, não estimativa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AVALIACOES */}
      <section className="av-section py-24 lg:py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Nossas avaliações</span>
            <h2 className="font-sans font-light text-3xl lg:text-5xl text-white tracking-tight mt-3">
              3 avaliações que revelam{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>o que o GPS nunca vai mostrar</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-10">
            {avaliacoes.map((a, i) => (
              <button key={i} onClick={() => setActiveAv(i)}
                className="px-4 py-2.5 rounded-full text-sm font-mono transition-all duration-200"
                style={{
                  background: activeAv === i ? a.cor : 'rgba(255,255,255,0.05)',
                  color: activeAv === i ? 'white' : 'rgba(255,255,255,0.4)',
                  border: activeAv === i ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}>
                {a.titulo}
              </button>
            ))}
          </div>
          <div className="av-card rounded-3xl overflow-hidden"
            style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-10 flex flex-col gap-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-4"
                    style={{ background: `${av.cor}15`, border: `1px solid ${av.cor}30`, color: av.cor }}>
                    {av.tag}
                  </span>
                  <h3 className="font-sans font-bold text-3xl lg:text-4xl text-white mb-1">{av.titulo}</h3>
                  <p className="font-sans text-base text-white/40 mb-5">{av.subtitulo}</p>
                  <div className="rounded-2xl p-5 mb-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest mb-2">O problema que resolve</p>
                    <p className="text-sm text-white/60 leading-relaxed italic">"{av.problema}"</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest mb-2">O que mede</p>
                    <p className="text-sm text-white/55 leading-relaxed">{av.oQueMede}</p>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest mb-2">Como fazemos</p>
                  <p className="text-sm text-white/45 leading-relaxed">{av.comoFazemos}</p>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex flex-col gap-6"
                style={{ background: `${av.cor}08`, borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-5" style={{ color: av.cor }}>
                    O que revela para você
                  </p>
                  <div className="flex flex-col gap-4">
                    {av.oQueRevela.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                          style={{ background: av.cor }}
                        />
                        <p className="text-sm text-white/70 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {av.grafico === 'lactato' && (
                  <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                    <GraficoLactato />
                  </div>
                )}
                {av.grafico === 'metabolomica' && (
                  <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                    <GraficoMetabolomica />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POSE ESTIMATION */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Visão Computacional</span>
              <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-6">
                Cada articulação,{' '}
                <span className="font-bold" style={{ color: '#22d3ee' }}>frame a frame.</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                O algoritmo Veltron rastreia 17 pontos articulares em tempo real.
                Oscilação vertical, tempo de contato e angulação de ataque —
                dados que nenhum GPS consegue capturar.
              </p>
              <ul className="space-y-3">
                {[
                  'Simetria L/R de voo e contato com o solo',
                  'Degradação biomecânica acima da velocidade de limiar',
                  'Ataque de calcanhar: técnica ou consequência da fadiga?',
                  'Relatório gerado automaticamente após o upload do vídeo',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#22d3ee' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <img
                src={mediaUrl('imgatletismoia')}
                alt="Pose Estimation - Análise Biomecânica Veltron"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* METRICAS */}
      <section ref={metricsRef} className="py-24 lg:py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Resultados reais</span>
            <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3">
              Dados que <span className="font-bold" style={{ color: '#4B7BF5' }}>comprovam a diferenca</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { val: `${v1}`, label: 'Passadas/min', sub: 'SPM ideal de corrida' },
              { val: 'vLT2', label: 'Velocidade de Limiar', sub: 'Zonas reais de treino' },
              { val: `${v2}pts`, label: 'Articulações rastreadas', sub: 'Pose Estimation' },
              { val: `${v3}+`, label: 'Metabólitos', sub: 'Análise por RMN' },
            ].map((m, i) => (
              <div key={i} className="rounded-3xl p-6 text-center"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="font-mono font-bold text-3xl lg:text-4xl leading-none mb-3"
                  style={{ color: i % 2 === 0 ? '#4B7BF5' : '#7BA7E8' }}>{m.val}</p>
                <p className="font-mono text-[10px] text-white/50 uppercase tracking-wide leading-relaxed mb-1">{m.label}</p>
                <p className="font-mono text-[9px] text-white/25 uppercase tracking-wide">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#080808' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">O processo</span>
            <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3">
              Do vídeo ao diagnóstico{' '}
              <span className="font-bold" style={{ color: '#22d3ee' }}>em 3 passos.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 relative">
            {/* Linha conectora desktop */}
            <div className="hidden lg:block absolute top-[52px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px"
              style={{ background: 'linear-gradient(90deg, rgba(34,211,238,0.4), rgba(75,123,245,0.4))' }} />

            {[
              {
                step: '01',
                icon: '📹',
                titulo: 'Envie o vídeo',
                descricao: 'Grave seu treino em esteira ou outdoor com qualquer celular. Sem câmeras especiais, sem marcadores no corpo.',
                cor: '#22d3ee',
              },
              {
                step: '02',
                icon: '🧬',
                titulo: 'Avaliação presencial',
                descricao: 'Na Veltron, realizamos os protocolos fisiológicos: coleta de lactato, VO₂máx e metabolômica. Conduzido por pesquisadores.',
                cor: '#4B7BF5',
              },
              {
                step: '03',
                icon: '📊',
                titulo: 'Diagnóstico integrado',
                descricao: 'Você recebe um laudo completo: biomecânica + fisiologia unidos em um único relatório com recomendações individualizadas.',
                cor: '#7BA7E8',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-3xl p-8 flex flex-col gap-5 relative"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                {/* Número do passo */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest"
                    style={{ color: item.cor }}>
                    PASSO {item.step}
                  </span>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-xl text-white mb-3">{item.titulo}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.descricao}</p>
                </div>
                {/* Linha colorida no fundo do card */}
                <div className="h-0.5 rounded-full mt-auto"
                  style={{ background: `linear-gradient(90deg, ${item.cor}, transparent)` }} />
              </div>
            ))}
          </div>

          {/* Resultado final */}
          <div className="mt-8 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6"
            style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(34,211,238,0.1)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <p className="font-sans font-bold text-white text-sm mb-1">Resultado: Diagnóstico completo e individualizado</p>
              <p className="text-white/40 text-xs leading-relaxed">
                Dados fisiológicos e biomecânicos unidos em um único laudo. Ciência aplicada diretamente à sua corrida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="agendar" className="py-24 lg:py-32 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[560px] mx-auto text-center">
          <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Proximo passo</span>
          <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-4">
            Pronto para entender sua corrida{' '}
            <span className="font-bold" style={{ color: '#4B7BF5' }}>de verdade?</span>
          </h2>
          <p className="text-white/45 text-sm leading-relaxed mb-10">
            Nossa equipe entrará em contato em breve.
          </p>
          {submitted ? (
            <div className="rounded-3xl p-8 text-left" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(75,123,245,0.15)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4B7BF5" strokeWidth="2" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-sans font-bold text-xl text-white mb-2">Mensagem enviada!</h3>
                <p className="text-sm text-white/50">Nossa equipe entrará em contato em breve.</p>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl p-8 text-left"
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="space-y-4">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider block mb-1.5"
                    style={{ color: 'rgba(255,255,255,0.35)' }}>Nome completo</label>
                  <input type="text" placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full rounded-2xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider block mb-1.5"
                    style={{ color: 'rgba(255,255,255,0.35)' }}>E-mail</label>
                  <input type="email" placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full rounded-2xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider block mb-1.5"
                    style={{ color: 'rgba(255,255,255,0.35)' }}>Telefone / WhatsApp</label>
                  <input type="tel" placeholder="Seu telefone ou WhatsApp"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    className="w-full rounded-2xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider block mb-1.5"
                    style={{ color: 'rgba(255,255,255,0.35)' }}>Perfil</label>
                  <select
                    value={formData.profile}
                    onChange={(e) => setFormData({...formData, profile: e.target.value})}
                    className="w-full rounded-2xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors appearance-none cursor-pointer"
                    style={{ background: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                    <option value="" style={{ background: '#0A0A0A' }}>Selecione seu perfil</option>
                    {['Atleta', 'Treinador / Técnico', 'Clube / Federação', 'Profissional de Saúde', 'Outro'].map(p => (
                      <option key={p} value={p} style={{ background: '#0A0A0A' }}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider block mb-1.5"
                    style={{ color: 'rgba(255,255,255,0.35)' }}>Como você usaria a Veltron? <span style={{ color: 'rgba(255,255,255,0.3)' }}>(opcional)</span></label>
                  <textarea
                    rows={3}
                    placeholder="Conte-nos sobre seu contexto e necessidades..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full rounded-2xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors resize-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                </div>
                <div className="pt-2 flex justify-center">
                  <button ref={btnRef}
                    onClick={async () => {
                      if (!formData.nome || !formData.email) return
                      setLoading(true)
                      const { error } = await saveLead({
                        nome: formData.nome,
                        email: formData.email,
                        telefone: formData.telefone,
                        pagina: 'corrida',
                        campo_extra: formData.profile,
                        campo_extra_label: 'Perfil',
                      })
                      setLoading(false)
                      if (!error) setSubmitted(true)
                    }}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-full cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #4B7BF5, #0A2463)', boxShadow: '0 8px 32px rgba(75,123,245,0.25)', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Enviando...' : <>Fale conosco <ChevronRight size={16} /></>}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
