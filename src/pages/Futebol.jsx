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
    tag: 'Capacidade Aeróbica',
    titulo: 'VO2max',
    subtitulo: 'O teto aerobico de cada jogador',
    problema: 'Seu jogador trava nos ultimos 20 minutos. Sem VO2max, voce nunca vai saber se e falta de preparo, de estrategia ou de recuperacao.',
    oQueMede: 'O volume maximo de oxigenio que o sistema cardiovascular consegue entregar aos musculos em esforco maximo. E o numero que separa jogadores que aceleram no segundo tempo dos que travam.',
    oQueRevela: [
      'Quem tem capacidade aerobica para sustentar alta intensidade nos 90 minutos',
      'Zonas de treino individuais precisas - sem achismo',
      'Potencial aerobico nao desenvolvido em jogadores subutilizados',
      'Comparativo entre posicoes: quem precisa de mais base aerobica',
    ],
    comoFazemos: 'Ergoespirometria com mascara de captacao de gases na Veltron. Protocolo incremental em esteira ou cicloergometro, conduzido por pesquisadores com publicacoes cientificas.',
    grafico: null,
    cor: '#4B7BF5',
  },
  {
    tag: 'Limiar de Fadiga',
    titulo: 'Limiar de Lactato',
    subtitulo: 'A intensidade exata onde a fadiga comeca',
    problema: 'GPS mostra que seu volante correu 12km. Mas nao mostra que 4km foram acima do limiar - acumulando lactato, perdendo precisao tecnica, chegando ao intervalo ja comprometido.',
    oQueMede: 'O ponto de intensidade onde o lactato sanguineo comeca a acumular mais rapido do que o corpo consegue remover. Acima desse ponto, a fadiga se instala rapidamente.',
    oQueRevela: [
      'A intensidade maxima sustentavel de cada jogador por posicao',
      'Por que alguns jogadores travam mesmo parecendo fisicamente bem',
      'Como prescrever treino de alta intensidade sem acumular fadiga cronica',
      'Quem esta sendo sobrecarregado e quem esta sendo subutilizado',
    ],
    comoFazemos: 'Protocolo incremental com coletas de sangue capilar a cada estagio. Analise da cinetica do lactato com identificacao de LT1, LT2/MLSS. Conduzido na Veltron.',
    grafico: 'lactato',
    cor: '#7BA7E8',
  },
  {
    tag: 'Potencia Explosiva',
    titulo: 'Teste de Wingate',
    subtitulo: 'A potencia anaerobica maxima em 30 segundos',
    problema: 'Dois atacantes com o mesmo sprint de 30m. Qual deles vai ganhar o duelo na area apos 80 minutos de jogo? Sem Wingate, e chute.',
    oQueMede: 'A capacidade de gerar potencia maxima em esforco anaerobico curto e intenso - o tipo de esforco que decide disputas de bola, arrancadas, saltos e recuperacoes defensivas.',
    oQueRevela: [
      'Potencia de pico - capacidade explosiva maxima de cada jogador',
      'Indice de fadiga - quem mantem a explosividade no fim do jogo',
      'Perfil de potencia por posicao: atacantes, laterais, volantes',
      'Resposta ao treinamento de forca e potencia ao longo da temporada',
    ],
    comoFazemos: 'Cicloergometro Monark com resistencia maxima por 30 segundos. Software de analise em tempo real. Protocolo padrao com warm-up e cooldown supervisionados.',
    grafico: null,
    cor: '#4B7BF5',
  },
  {
    tag: '200+ Metabolitos · RMN',
    titulo: 'Metabolômica',
    subtitulo: 'O que acontece dentro do atleta que o exame comum nao mostra',
    problema: 'Seu atleta dormiu 8h, treinou bem, parece recuperado. Mas rendeu 60% no jogo seguinte. A metabolômica revela o que o olho - e o GPS - nao conseguem ver.',
    oQueMede: 'O perfil completo de 200+ metabolitos via Ressonancia Magnetica Nuclear - aminoacidos, acidos organicos, lipideos e marcadores de estresse oxidativo que revelam o estado real de recuperacao e adaptacao ao treino.',
    oQueRevela: [
      'Se o atleta realmente recuperou entre dois jogos',
      'Deficiencias nutricionais especificas que comprometem rendimento',
      'Resposta metabolica individual ao treinamento',
      'Base para prescricao nutricional individual com precisao de laboratorio',
    ],
    comoFazemos: 'Coleta simples de urina ou sangue. Analise por Ressonancia Magnetica Nuclear pela nossa equipe.',
    grafico: 'metabolomica',
    cor: '#7BA7E8',
  },
]

export default function Futebol() {
  const heroRef = useRef(null)
  const metricsRef = useRef(null)
  const btnRef = useRef(null)
  const [metricsStarted, setMetricsStarted] = useState(false)
  const [activeAv, setActiveAv] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', profile: '', message: '' })

  const v1 = useCounter(1760, 1800, metricsStarted)
  const v2 = useCounter(184, 1800, metricsStarted)
  const v3 = useCounter(995, 1800, metricsStarted)
  const v4 = useCounter(200, 1800, metricsStarted)

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
          src={mediaUrl('dois.mp4')} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.75) 100%)' }} />
        <div className="absolute z-10 left-[clamp(24px,5vw,72px)] right-[clamp(24px,5vw,64px)] bottom-[clamp(80px,12vh,140px)] max-w-[640px]">
          <div className="hi flex items-center gap-3 mb-6">
            <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-white/50 hover:text-white transition-colors">
              <ArrowLeft size={14} /> Veltron
            </Link>
            <span className="text-white/20">·</span>
            <span className="font-mono text-xs text-[#4B7BF5] uppercase tracking-widest">Futebol</span>
          </div>
          <h1 className="hi font-sans font-bold text-white" style={{ fontSize: 'clamp(2.2rem,5vw,4.5rem)', lineHeight: 1.05 }}>
            Seu time treina duro.<br />
            <span style={{ color: '#4B7BF5' }}>Mas voce sabe quem esta pronto para jogar?</span>
          </h1>
          <p className="hi mt-5 text-white/70 leading-relaxed" style={{ fontSize: 'clamp(1rem,1.5vw,1.15rem)', maxWidth: 520 }}>
            GPS mostra distancia e velocidade. A Veltron mostra o que esta dentro do atleta - capacidade aerobica, limiar de fadiga, estado metabolico real - integrados com rastreamento por IA.
          </p>
          <div className="hi flex flex-wrap gap-2 mt-5">
            {['VO2max', 'Limiar de Lactato', 'Wingate', 'Metabolômica', 'Rastreamento por IA'].map(t => (
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
              <p className="font-mono text-xs text-[#4B7BF5] uppercase tracking-widest mb-2">Por que a Veltron e diferente</p>
              <p className="font-sans font-bold text-white text-xl lg:text-2xl leading-snug">
                GPS e rastreamento dizem o que seu jogador fez.{' '}
                <span style={{ color: '#4B7BF5' }}>A Veltron diz por que ele rendeu assim - e o que fazer.</span>
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              {[
                'Rastreamento de movimento — distância e velocidade',
                'Rastreamento de toque na bola',
                'Rastreamento de posição via GPS',
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
                <span className="font-mono text-xs text-[#4B7BF5]">Veltron - rastreia o atleta inteiro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METODOLOGIA */}
      <section className="py-16 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">A metodologia</span>
            <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3">
              Avaliação fisiológica + IA:{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>dois lados do mesmo diagnóstico</span>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              As avaliações fisiológicas revelam o que está dentro do atleta. O Trocker revela o que ele faz em campo. Juntos, entregam um diagnóstico que nenhum dos dois consegue sozinho.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1 — Fisiologia */}
            <div className="rounded-3xl p-8 lg:p-10"
              style={{ background: '#111111', border: '1px solid rgba(123,167,232,0.25)' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(123,167,232,0.12)', border: '1px solid rgba(123,167,232,0.2)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7BA7E8" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[#7BA7E8] uppercase tracking-widest mb-0.5">Camada 01 · Veltron</p>
                  <h3 className="font-sans font-bold text-xl text-white">Avaliações Fisiológicas</h3>
                </div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                Medimos o que está dentro do atleta — capacidade aeróbica, limiar de fadiga, potência anaeróbica e perfil metabólico completo. Dados que o GPS jamais vai capturar.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['VO₂máx', 'Limiar de Lactato', 'Teste de Wingate', 'Metabolômica'].map((item, i) => (
                  <div key={i} className="rounded-2xl px-4 py-3 flex items-center gap-2"
                    style={{ background: 'rgba(123,167,232,0.06)', border: '1px solid rgba(123,167,232,0.12)' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#7BA7E8' }}/>
                    <span className="text-sm text-white/70 font-mono text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2 — Trocker */}
            <div className="rounded-3xl p-8 lg:p-10"
              style={{ background: '#111111', border: '1px solid rgba(75,123,245,0.25)' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(75,123,245,0.12)', border: '1px solid rgba(75,123,245,0.2)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4B7BF5" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[#4B7BF5] uppercase tracking-widest mb-0.5">Camada 02 · Trocker · IA</p>
                  <h3 className="font-sans font-bold text-xl text-white">Rastreamento em Campo</h3>
                </div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                Rastreamos cada atleta frame a frame — sem GPS, sem colete, sem câmeras especiais. Qualquer vídeo de treino ou teste Yo-Yo vira dados precisos de distância, velocidade e fadiga.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['Rastreamento multi-atleta', 'Distância por estágio', 'Velocidade de pico', 'Detecção de fadiga'].map((item, i) => (
                  <div key={i} className="rounded-2xl px-4 py-3 flex items-center gap-2"
                    style={{ background: 'rgba(75,123,245,0.06)', border: '1px solid rgba(75,123,245,0.12)' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#4B7BF5' }}/>
                    <span className="text-sm text-white/70 font-mono text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Conector — resultado integrado */}
          <div className="mt-5 rounded-3xl px-8 py-5 flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left"
            style={{ background: 'linear-gradient(135deg, rgba(123,167,232,0.08), rgba(75,123,245,0.08))', border: '1px solid rgba(75,123,245,0.2)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(75,123,245,0.15)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B7BF5" strokeWidth="2" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <p className="font-sans font-bold text-white text-base">Resultado: Laudo Integrado por Atleta</p>
              <p className="font-sans text-sm text-white/40 mt-0.5">Dados fisiológicos + biomecânicos unidos em um diagnóstico único. Do dado à decisão em até 48h.</p>
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
              4 avaliações que revelam{' '}
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
                    O que revela para o seu clube
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

      {/* TROCKER */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Rastreamento por IA</span>
              <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-5">
                Trocker - cada atleta,{' '}
                <span className="font-bold" style={{ color: '#4B7BF5' }}>frame a frame</span>
              </h2>
              <p className="text-white/55 text-base leading-relaxed mb-6">
                O Trocker rastreia cada jogador automaticamente - sem GPS, sem colete, sem cameras especiais. Qualquer video de treino ou teste Yo-Yo vira dados precisos de distancia, velocidade e fadiga, integrados com o laudo fisiologico.
              </p>
              <ul className="space-y-3">
                {[
                  'Rastreamento de multiplos atletas simultaneamente',
                  'Distancia percorrida por estagio no Yo-Yo IR1',
                  'Velocidade de pico e indice de fadiga por atleta',
                  'Integrado com o perfil fisiologico de cada jogador',
                ].map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/65">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#4B7BF5' }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ height: 380, background: '#0A0A0A' }}>
              <video autoPlay muted loop playsInline className="w-full h-full object-cover"
                src={mediaUrl('trocker-demo.mp4')} />
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
              { val: `${v1.toLocaleString('pt-BR')}m`, label: 'Distancia maxima no Yo-Yo IR1', sub: 'Trocker · IA' },
              { val: `${(v2 / 10).toFixed(1)} km/h`, label: 'Velocidade de pico', sub: 'Sem GPS' },
              { val: `${(v3 / 10).toFixed(1)}%`, label: 'Precisao do modelo preditivo', sub: 'XGBoost · Veltron' },
              { val: `${v4}+`, label: 'Metabolitos analisados', sub: 'Metabolômica · Veltron' },
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

      {/* CTA */}
      <section id="agendar" className="py-24 lg:py-32 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[560px] mx-auto text-center">
          <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Proximo passo</span>
          <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-4">
            Pronto para conhecer seu time{' '}
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
                        pagina: 'futebol',
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
