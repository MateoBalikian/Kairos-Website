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

const diferenciais = [
  {
    tag: 'IA',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    titulo: 'Visão Computacional',
    desc: 'Rastreamos 17 pontos articulares em tempo real sem marcadores no corpo. Oscilação, alinhamento e assimetria de braçada — visíveis frame a frame.',
    cor: '#4B7BF5',
  },
  {
    tag: 'BIOMECÂNICA',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    titulo: 'Indicadores de Braçada',
    desc: 'Frequência de ciclos, Índice SWOLF, Antebraço Vertical Precoce (EVF) e Cruzamento de Linha Média. Os dados que definem sua eficiência na água.',
    cor: '#7BA7E8',
  },
  {
    tag: 'FISIOLOGIA',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" />
      </svg>
    ),
    titulo: 'Limiar de Lactato',
    desc: 'Identificamos seus domínios de intensidade reais — Moderado, Pesado e Severo — com coleta capilar a cada estágio. Zonas de treino baseadas em biologia, não em estimativa.',
    cor: '#4B7BF5',
  },
  {
    tag: 'METABOLÔMICA',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
      </svg>
    ),
    titulo: 'Diagnóstico Integrado',
    desc: 'Nossa IA cruza eficiência mecânica com custo metabólico. Você descobre em qual intensidade sua técnica começa a colapsar — e o que fazer.',
    cor: '#7BA7E8',
  },
]

const metricas = [
  { icon: '🏊', titulo: 'Frequência de Ciclos (FC)', desc: 'Ciclos completos por minuto. O dado real que substitui a cadência genérica de braçada.' },
  { icon: '⚡', titulo: 'Índice SWOLF', desc: 'Tempo + número de braçadas por comprimento. Quanto menor o número, maior a eficiência.' },
  { icon: '📐', titulo: 'Alinhamento Axial', desc: 'Posição do eixo corporal na fase de deslize. Base da hidrodinâmica e da estabilidade no water.' },
  { icon: '🔄', titulo: 'Antebraço Vertical Precoce (EVF)', desc: 'Angulação do antebraço após o catch. O principal indicador de eficiência propulsiva da braçada.' },
  { icon: '🦵', titulo: 'Domínios de Intensidade', desc: 'Moderado, Pesado e Severo — mapeados pela cinética do lactato. Treino prescrito com precisão de laboratório.' },
]



export default function Natacao() {
  const heroRef = useRef(null)
  const difRef = useRef(null)
  const statsRef = useRef(null)
  const btnRef = useRef(null)
  const [statsStarted, setStatsStarted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', profile: '', message: '' })

  const v1 = useCounter(1000, 2000, statsStarted)
  const v2 = useCounter(7, 2000, statsStarted)

  const smoothScrollTo = (id) => {
    const target = document.getElementById(id)
    if (!target) return
    if (window.lenis) {
      window.lenis.scrollTo(target, { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
      gsap.fromTo('.dif-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: difRef.current, start: 'top 78%' }
        }
      )
      gsap.fromTo('.passo-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '#como-funciona', start: 'top 78%' }
        }
      )
      gsap.fromTo('.metrica-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '#metricas', start: 'top 78%' }
        }
      )
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 78%',
        onEnter: () => setStatsStarted(true),
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

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar forceDark hideLinks />

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #0d1a2e 50%, #0A0A0A 100%)' }}>

        {/* Decoração de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #4B7BF5 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full opacity-8"
            style={{ background: 'radial-gradient(circle, #7BA7E8 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 py-32 lg:py-0">
          <div className="max-w-[680px]">

            <div className="hi flex items-center gap-3 mb-8">
              <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-white/50 hover:text-white transition-colors">
                <ArrowLeft size={14} /> Veltron
              </Link>
              <span className="text-white/20">·</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(75,123,245,0.15)', border: '1px solid rgba(75,123,245,0.3)', color: '#4B7BF5' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B7BF5] animate-pulse" />
                Análise de Natação com IA
              </span>
            </div>

            <h1 className="hi font-sans font-bold text-white"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: 1.02 }}>
              Precisão que{' '}
              <span style={{ color: '#4B7BF5' }}>redefine o pódio.</span>
            </h1>

            <p className="hi mt-6 text-white/60 leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', maxWidth: 520 }}>
              A integração entre Visão Computacional e Perfilagem Metabólica para mapear a eficiência mecânica e energética do seu atleta.
            </p>

            <div className="hi flex flex-wrap gap-2 mt-6">
              {['Sem equipamento', 'Resultado em minutos', 'Relatório em PDF', 'Todos os estilos'].map(t => (
                <span key={t} className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/50 border border-white/12 rounded-full px-3 py-1.5"
                  style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <span className="text-[#4B7BF5]">✓</span> {t}
                </span>
              ))}
            </div>

            <div className="hi flex flex-wrap items-center gap-4 mt-10">
              <button
                onClick={() => smoothScrollTo('agendar')}
                className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer border-none"
                style={{
                  background: 'white', borderRadius: 99, padding: '14px 28px',
                  color: '#0A0A0A', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1.5px',
                }}>
                QUERO MINHA ANÁLISE
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ background: '#0A0A0A' }}>
                  <ArrowRight size={13} color="white" />
                </span>
              </button>
              <button
                onClick={() => smoothScrollTo('como-funciona')}
                className="inline-flex items-center gap-2 font-sans text-sm text-white/50 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
              >
                Como funciona →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SEÇÃO BRANCA — DIFERENCIAIS ─── */}
      <section ref={difRef} style={{ background: '#ffffff' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-24 lg:py-32">

          <div className="max-w-2xl mb-16">
            <span className="font-mono text-xs text-[#0A2463] uppercase tracking-widest">
              Por que a Veltron
            </span>
            <h2 className="font-sans mt-3 leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: '#0A0A0A' }}>
              A Tríade da Excelência Veltron.
            </h2>
            <p className="mt-4 text-[#4A4A47] leading-relaxed" style={{ fontSize: '1.05rem' }}>
              Visão Computacional, Perfilagem Metabólica Invasiva e Core Engine AI — integradas em um único diagnóstico de alta precisão.
            </p>
          </div>

          <>
            {/* Mobile: lista */}
            <div className="flex flex-col md:hidden">
              {diferenciais.map((d, i) => (
                <div key={i} className="flex gap-4 items-start py-5"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: d.cor }} />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: d.cor }}>{d.tag}</p>
                    <p className="font-sans font-bold text-base text-white mb-1">{d.titulo}</p>
                    <p className="text-xs text-white/45 leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: cards originais */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {diferenciais.map((d, i) => (
                <div key={i} className="dif-card rounded-3xl p-8 flex flex-col gap-5 group hover:-translate-y-1 transition-transform duration-300"
                  style={{ background: '#F8F8F6', border: '1px solid #E5E5E2' }}>
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${d.cor}12`, color: d.cor }}>
                      {d.icon}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
                      style={{ background: `${d.cor}12`, border: `1px solid ${d.cor}30`, color: d.cor }}>
                      {d.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-xl mb-2" style={{ color: '#0A0A0A' }}>
                      {d.titulo}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#4A4A47' }}>
                      {d.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>

          <div className="mt-6 rounded-3xl px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-4"
            style={{ background: '#0A2463' }}>
            <p className="font-sans font-bold text-xl lg:text-2xl text-white text-center lg:text-left">
              "Identificamos o exato Limiar de Lactato onde a{' '}
              <span style={{ color: '#7BA7E8' }}>Eficiência Mecânica do seu nadador colapsa."</span>
            </p>
            <button
              onClick={() => smoothScrollTo('agendar')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#0A2463] bg-white whitespace-nowrap hover:opacity-90 transition-opacity flex-shrink-0 border-none cursor-pointer">
              Quero minha análise
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── IA EM AÇÃO ─── */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="font-mono text-xs text-white/30 uppercase tracking-widest">IA em ação</span>
              <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-5">
                Rastreamento Dinâmico de{' '}
                <span className="font-bold" style={{ color: '#4B7BF5' }}>Esqueleto em ação</span>
              </h2>
              <p className="text-white/55 text-base leading-relaxed mb-6">
                A IA Veltron reconstrói o gesto técnico através de Pose Estimation sub-milimétrica. Monitoramos a Neutralidade Postural Axial e a resiliência mecânica em tempo real, sem necessidade de marcadores físicos.
              </p>
              <ul className="space-y-3">
                {[
                  'Neutralidade Postural Axial — alinhamento durante o ciclo',
                  'Angularidade de EVF — antebraço vertical precoce',
                  'Cruzamento de Linha Média — desvio lateral da tração',
                  'Ponto de ruptura técnica nos Domínios Severos',
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
                src={mediaUrl('veltronswim.mp4')} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section ref={statsRef} className="py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { val: `${v1}+`, label: 'Atletas analisados', sub: 'E crescendo' },
              { val: 'V-SCORE', label: 'Índice proprietário de performance', sub: '0 a 100 pontos' },
              { val: `${v2}+`, label: 'Indicadores cinemáticos', sub: 'Por análise' },
            ].map((s, i) => (
              <div key={i} className="rounded-3xl p-8 text-center"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="font-mono font-bold leading-none mb-3"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: i % 2 === 0 ? '#4B7BF5' : '#7BA7E8' }}>
                  {s.val}
                </p>
                <p className="font-sans font-semibold text-white text-base mb-1">{s.label}</p>
                <p className="font-mono text-[10px] text-white/30 uppercase tracking-wide">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA ─── */}
      <section className="py-24 lg:py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">O processo</span>
            <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3">
              Da piscina ao diagnóstico{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>em 3 passos.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 relative">
            <div className="hidden lg:block absolute top-[52px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px"
              style={{ background: 'linear-gradient(90deg, rgba(75,123,245,0.4), rgba(123,167,232,0.4))' }} />

            {[
              {
                step: '01',
                icon: '📱',
                titulo: 'Envie o vídeo',
                descricao: 'Filme com qualquer celular — lateral ou frontal, pelo menos 10 segundos de nado. Sem câmeras especiais, sem marcadores no corpo.',
                cor: '#4B7BF5',
              },
              {
                step: '02',
                icon: '🧪',
                titulo: 'Avaliação presencial',
                descricao: 'Na Veltron, realizamos os protocolos fisiológicos: coleta de lactato, VO₂máx e metabolômica. Conduzido por pesquisadores.',
                cor: '#7BA7E8',
              },
              {
                step: '03',
                icon: '📊',
                titulo: 'Diagnóstico integrado',
                descricao: 'Biomecânica + fisiologia + metabolômica em um único laudo. Você recebe recomendações individualizadas para técnica e treino.',
                cor: '#4B7BF5',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-3xl p-8 flex flex-col gap-5 relative"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
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
                <div className="h-0.5 rounded-full mt-auto"
                  style={{ background: `linear-gradient(90deg, ${item.cor}, transparent)` }} />
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6"
            style={{ background: 'rgba(75,123,245,0.04)', border: '1px solid rgba(75,123,245,0.12)' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(75,123,245,0.1)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B7BF5" strokeWidth="2" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <p className="font-sans font-bold text-white text-sm mb-1">Diagnóstico completo e individualizado</p>
              <p className="text-white/40 text-xs leading-relaxed">
                Dados fisiológicos e biomecânicos unidos em um único laudo. Ciência aplicada diretamente à sua natação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── O QUE ESTÁ INCLUÍDO ─── */}
      <section id="metricas" className="py-24 lg:py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-14">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">O que está incluído</span>
            <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3">
              Indicadores Técnicos{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>e Biomecânicos</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {metricas.map((m, i) => (
              <div key={i} className="metrica-card rounded-3xl p-7"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="text-3xl mb-4 block">{m.icon}</span>
                <h3 className="font-sans font-bold text-white text-lg mb-2">{m.titulo}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="agendar" className="py-24 lg:py-32 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[560px] mx-auto text-center">
          <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Próximo passo</span>
          <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-4">
            A medalha é uma{' '}
            <span className="font-bold" style={{ color: '#4B7BF5' }}>consequência dos dados.</span>
          </h2>
          <p className="text-white/45 text-sm leading-relaxed mb-10">
            Implemente a análise Veltron e substitua a percepção subjetiva pela certeza biomecânica e metabólica.
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
                        pagina: 'natacao',
                        campo_extra: formData.profile,
                        campo_extra_label: 'Perfil',
                      })
                      setLoading(false)
                      if (!error) setSubmitted(true)
                    }}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-full cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #4B7BF5, #0A2463)', boxShadow: '0 8px 32px rgba(75,123,245,0.25)', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Enviando...' : <>Quero minha análise <ChevronRight size={16} /></>}
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
