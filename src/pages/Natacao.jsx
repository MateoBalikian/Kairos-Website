import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { mediaUrl } from '../lib/supabase'

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
    titulo: 'Análise de braçada por IA',
    desc: 'Rastreamento de articulações quadro a quadro. A IA detecta cada detalhe da técnica — sem câmeras especiais, sem sensores.',
    cor: '#4B7BF5',
  },
  {
    tag: 'BIOMECÂNICA',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    titulo: 'Métricas biomecânicas',
    desc: 'Cadência de braçadas, score SWOLF, posição corporal, rotação de quadril e análise de pernada — tudo em um relatório.',
    cor: '#7BA7E8',
  },
  {
    tag: 'FISIOLOGIA',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" />
      </svg>
    ),
    titulo: 'Avaliação fisiológica completa',
    desc: 'VO₂máx e limiar anaeróbico medidos com precisão de laboratório no LACAE · UFAL. Zonas de treino individuais para cada nadador.',
    cor: '#4B7BF5',
  },
  {
    tag: 'METABOLÔMICA',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
      </svg>
    ),
    titulo: 'Metabolômica por RMN',
    desc: '200+ metabólitos que revelam recuperação real, adaptação ao treino e deficiências nutricionais invisíveis.',
    cor: '#7BA7E8',
  },
]

const metricas = [
  { icon: '🏊', titulo: 'Cadência de braçadas', desc: 'Frequência e contagem por comprimento, comparada à eficiência ideal para o estilo.' },
  { icon: '⚡', titulo: 'Score SWOLF', desc: 'Índice que combina velocidade e economia de movimento em um único número.' },
  { icon: '📐', titulo: 'Posição corporal', desc: 'Alinhamento horizontal, inclinação do quadril e postura durante o ciclo de nado.' },
  { icon: '🔄', titulo: 'Rotação de quadril', desc: 'Amplitude e simetria da rotação lateral — um dos principais fatores de propulsão.' },
  { icon: '🦵', titulo: 'Análise de pernada', desc: 'Frequência, amplitude e eficiência das pernas — detecta assimetrias e perdas.' },
  { icon: '📄', titulo: 'Relatório em PDF', desc: 'Documento completo com dados, gráficos e recomendações de coaching personalizadas.' },
]

const passos = [
  {
    num: '01',
    titulo: 'Filme ou envie o vídeo',
    desc: 'Use qualquer celular. Filmagem lateral ou frontal, pelo menos 10 segundos de nado. Mantenha o celular fixo — quanto mais estável, mais precisa é a análise.',
  },
  {
    num: '02',
    titulo: 'Nossa IA processa tudo',
    desc: 'O sistema detecta articulações, rastreia o corpo quadro a quadro e extrai métricas com precisão de laboratório.',
  },
  {
    num: '03',
    titulo: 'Você recebe seu relatório',
    desc: 'PDF completo com dados, gráficos e recomendações. Pronto pra você e pro seu treinador.',
  },
]

export default function Natacao() {
  const heroRef = useRef(null)
  const difRef = useRef(null)
  const statsRef = useRef(null)
  const btnRef = useRef(null)
  const [statsStarted, setStatsStarted] = useState(false)

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
              Analise seu nado com{' '}
              <span style={{ color: '#4B7BF5' }}>Inteligência Artificial</span>
            </h1>

            <p className="hi mt-6 text-white/60 leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', maxWidth: 520 }}>
              Envie um vídeo e receba em minutos um relatório completo com dados biomecânicos, análise de técnica e avaliação fisiológica personalizada.
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
              Muito além da análise de vídeo.<br />
              <span style={{ color: '#0A2463' }}>A ciência completa do nadador.</span>
            </h2>
            <p className="mt-4 text-[#4A4A47] leading-relaxed" style={{ fontSize: '1.05rem' }}>
              Combinamos IA para análise biomecânica com avaliações fisiológicas de laboratório. Nenhuma outra plataforma oferece os dois.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

          <div className="mt-6 rounded-3xl px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-4"
            style={{ background: '#0A2463' }}>
            <p className="font-sans font-bold text-xl lg:text-2xl text-white text-center lg:text-left">
              "Enquanto outros analisam o vídeo,{' '}
              <span style={{ color: '#7BA7E8' }}>nós analisamos o nadador."</span>
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
                Nossa IA analisando{' '}
                <span className="font-bold" style={{ color: '#4B7BF5' }}>cada detalhe do seu nado</span>
              </h2>
              <p className="text-white/55 text-base leading-relaxed mb-6">
                O sistema detecta articulações e rastreia o corpo quadro a quadro — identificando assimetrias, perdas de propulsão e erros técnicos que o olho humano não captura.
              </p>
              <ul className="space-y-3">
                {[
                  'Detecção de 17 pontos articulares por frame',
                  'Análise de simetria entre lado direito e esquerdo',
                  'Identificação de falhas na rotação de quadril',
                  'Comparação com padrões biomecânicos ideais',
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
              { val: '<5min', label: 'Para receber o relatório', sub: 'Após envio do vídeo' },
              { val: `${v2}+`, label: 'Métricas analisadas', sub: 'Por análise' },
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
      <section id="como-funciona" className="py-24 lg:py-32 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[800px] mx-auto">
          <div className="mb-16">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Processo</span>
            <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3">
              Simples assim —{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>3 passos</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-[27px] top-8 bottom-8 w-px"
              style={{ background: 'linear-gradient(to bottom, #4B7BF5, #7BA7E8)' }} />
            <div className="flex flex-col gap-12">
              {passos.map((p, i) => (
                <div key={i} className="passo-item flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 z-10"
                    style={{ background: '#111111', border: '1px solid rgba(75,123,245,0.3)' }}>
                    <span className="font-mono text-sm font-bold" style={{ color: '#4B7BF5' }}>{p.num}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-sans font-bold text-xl text-white mb-2">{p.titulo}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
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
              Tudo que você precisa saber{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>sobre seu nado</span>
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
            Pronto para descobrir o que está{' '}
            <span className="font-bold" style={{ color: '#4B7BF5' }}>freando seu nado?</span>
          </h2>
          <p className="text-white/45 text-sm leading-relaxed mb-10">
            Nossa equipe entra em contato em até 24h para agendar sua análise.
          </p>
          <div className="rounded-3xl p-8 text-left"
            style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="space-y-4">
              {[
                { label: 'Nome completo', ph: 'Seu nome', type: 'text' },
                { label: 'E-mail', ph: 'seu@email.com', type: 'email' },
                { label: 'Telefone / WhatsApp', ph: 'Seu telefone', type: 'tel' },
                { label: 'Estilo principal', ph: 'Ex: Crawl, Costas, Peito...', type: 'text' },
              ].map(f => (
                <div key={f.label}>
                  <label className="font-mono text-[10px] uppercase tracking-wider block mb-1.5"
                    style={{ color: 'rgba(255,255,255,0.35)' }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph}
                    className="w-full rounded-2xl px-4 py-3.5 text-sm font-sans focus:outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                </div>
              ))}
              <div className="pt-2 flex justify-center">
                <button ref={btnRef}
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-full border-none cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #4B7BF5, #0A2463)', boxShadow: '0 8px 32px rgba(75,123,245,0.25)' }}>
                  Quero minha análise <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
