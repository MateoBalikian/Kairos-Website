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
    tag: 'BIOMECÂNICA',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>),
    titulo: 'Pose Estimation na Pedalada',
    desc: 'Rastreamento sub-milimétrico de quadril, joelho e tornozelo via IA (YOLO-Pose). Detectamos assimetrias de pedalada imperceptíveis ao olho humano e reconstruímos o ciclo completo de movimento.',
    cor: '#4B7BF5',
  },
  {
    tag: 'FISIOLOGIA',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>),
    titulo: 'Lactacidemia: LT1, LT2 e MLSS',
    desc: 'Construção da curva Lactato × Potência com coleta capilar a cada estágio. Identificação exata do LT1 (Limiar Aeróbio) e LT2 (OBLA) para prescrição milimétrica de zonas de treinamento.',
    cor: '#7BA7E8',
  },
  {
    tag: 'INTEGRAÇÃO',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>),
    titulo: 'V-Metabolic Cycling',
    desc: 'O diferencial Veltron: identificamos em qual potência (W) o atleta começa a perder eficiência mecânica e aumentar o custo energético. A relação direta entre erro técnico e aumento de lactato.',
    cor: '#4B7BF5',
  },
  {
    tag: 'METABOLÔMICA',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" /></svg>),
    titulo: 'Metabolômica por RMN',
    desc: '200+ metabólitos que explicam o custo metabólico por ciclo de pedalada — por que as pernas pesam mesmo após descanso e o que fazer para otimizar a recuperação.',
    cor: '#7BA7E8',
  },
]

const passos = [
  { num: '01', titulo: 'Avaliação fisiológica na Veltron', desc: 'VO₂máx, curva de lactato (LT1/LT2/MLSS), Wingate e coleta para metabolômica por RMN. Protocolo conduzido por pesquisadores em ambiente laboratorial.' },
  { num: '02', titulo: 'Análise biomecânica na bike', desc: 'Você pedala enquanto a IA rastreia quadril, joelho e tornozelo em tempo real. Identificamos assimetrias, ângulos críticos e o ponto de ruptura técnica sob fadiga.' },
  { num: '03', titulo: 'Diagnóstico V-Metabolic integrado', desc: 'Biomecânica + fisiologia + metabolômica unidos em um único laudo. Você descobre em qual potência sua técnica colapsa, quais zonas treinar e como recuperar melhor.' },
]

export default function Ciclismo() {
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const btnRef = useRef(null)
  const [statsStarted, setStatsStarted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', profile: '', message: '' })

  const v1 = useCounter(142, 1800, statsStarted)
  const v2 = useCounter(91, 1800, statsStarted)
  const v3 = useCounter(68, 1800, statsStarted)
  const v4 = useCounter(200, 1800, statsStarted)

  const smoothScrollTo = (id) => {
    const target = document.getElementById(id)
    if (!target) return
    if (window.lenis) window.lenis.scrollTo(target, { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    else target.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current.querySelectorAll('.hi'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: 'power3.out', delay: 0.3 })
      gsap.fromTo('.dif-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#diferenciais', start: 'top 78%' }
        })
      gsap.fromTo('.passo-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '#como-funciona', start: 'top 78%' }
        })
      ScrollTrigger.create({
        trigger: statsRef.current, start: 'top 78%',
        onEnter: () => setStatsStarted(true),
      })
    })

    const btn = btnRef.current
    if (btn) {
      const mv = (e) => { const r = btn.getBoundingClientRect(); gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.4, ease: 'power2.out' }) }
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

      {/* ─── HERO — SPLIT COM PAINEL DE DADOS ─── */}
      <section ref={heroRef} className="relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
        style={{ minHeight: '100dvh' }}>

        {/* Esquerda — texto */}
        <div className="relative flex flex-col justify-center px-8 lg:px-16 py-24 lg:py-0 bg-[#0A0A0A]"
          style={{ minHeight: '500px' }}>
          <div className="absolute right-0 top-1/4 bottom-1/4 w-px hidden lg:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(75,123,245,0.3), transparent)' }} />
          <div className="max-w-[480px]">
            <div className="hi flex items-center gap-3 mb-8">
              <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-white/50 hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                <ArrowLeft size={14} /> Veltron
              </Link>
              <span className="text-white/20">·</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(75,123,245,0.15)', border: '1px solid rgba(75,123,245,0.3)', color: '#4B7BF5' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B7BF5] animate-pulse" />
                Ciclismo de Elite: IA &amp; Biometabólica
              </span>
            </div>
            <h1 className="hi font-sans font-bold text-white"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)', lineHeight: 1.05 }}>
              Seu ciclômetro<br />mede watts.<br />
              <span style={{ color: '#4B7BF5' }}>A Veltron explica<br />por que você<br />perdeu potência.</span>
            </h1>
            <p className="hi mt-6 text-white/55 leading-relaxed" style={{ fontSize: '1rem', maxWidth: 400 }}>
              A análise integrada que mapeia o Custo Metabólico da Técnica — correlacionando Visão Computacional com a curva de Lactato × Potência para identificar o colapso técnico no domínio severo.
            </p>
            <div className="hi flex flex-wrap items-center gap-4 mt-8">
              <button onClick={() => smoothScrollTo('agendar')}
                className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer border-none"
                style={{ background: 'white', borderRadius: 99, padding: '14px 28px', color: '#0A0A0A', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1.5px' }}>
                QUERO MEU DIAGNÓSTICO
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ background: '#0A0A0A' }}>
                  <ArrowRight size={13} color="white" />
                </span>
              </button>
              <button onClick={() => smoothScrollTo('como-funciona')}
                className="font-sans text-sm text-white/40 hover:text-white transition-colors cursor-pointer border-none bg-transparent">
                Como funciona →
              </button>
            </div>
          </div>
        </div>

        {/* Direita — painel biomecanico */}
        <div className="relative flex flex-col justify-center px-8 lg:px-12 py-16 lg:py-0"
          style={{ background: '#080808', minHeight: '500px' }}>
          <div className="hi">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4B7BF5' }} />
              <span className="font-mono text-[10px] text-[#4B7BF5] uppercase tracking-widest">Análise biomecanica · Bike fit</span>
            </div>

            {/* Métrica principal — ângulo do joelho com barra de range */}
            <div className="mb-6 rounded-3xl p-6" style={{ background: '#0f0f0f', border: '1px solid rgba(75,123,245,0.15)' }}>
              <div className="flex items-end justify-between mb-2">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Ângulo do joelho</span>
                <span className="font-mono text-[10px] px-2 py-1 rounded-full" style={{ background: 'rgba(75,123,245,0.15)', color: '#4B7BF5' }}>✓ Ideal</span>
              </div>
              <div className="flex items-end gap-3">
                <span className="font-mono font-bold text-white" style={{ fontSize: '3.5rem', lineHeight: 1 }}>142</span>
                <span className="font-mono text-2xl text-white/50 mb-1">°</span>
              </div>
              {/* Barra de range */}
              <div className="mt-3 relative">
                <div className="h-1.5 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="absolute top-0 h-1.5 rounded-full" style={{ background: '#4B7BF5', left: '45%', width: '25%' }} />
                <div className="absolute top-0 w-2.5 h-2.5 rounded-full -translate-y-[3px]" style={{ background: 'white', left: 'calc(55% - 5px)', boxShadow: '0 0 8px rgba(75,123,245,0.8)' }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono text-[9px] text-white/20">130°</span>
                <span className="font-mono text-[9px] text-[#4B7BF5]">Ideal: 135–145°</span>
                <span className="font-mono text-[9px] text-white/20">155°</span>
              </div>
            </div>

            {/* Três métricas menores */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Cadência', val: '88', unit: 'rpm', sub: 'Ideal: 85–95', col: '#7BA7E8' },
                { label: 'Simetria', val: '94', unit: '%', sub: 'Direita/Esquerda', col: '#4B7BF5' },
                { label: 'Drop', val: '4.2', unit: 'cm', sub: 'Posição aero', col: '#7BA7E8' },
              ].map((m, i) => (
                <div key={i} className="rounded-2xl p-4 flex flex-col gap-1 text-center"
                  style={{ background: '#0f0f0f', border: `1px solid ${m.col}20` }}>
                  <span className="font-mono text-[8px] text-white/25 uppercase tracking-wider">{m.label}</span>
                  <div>
                    <span className="font-mono font-bold text-xl" style={{ color: m.col }}>{m.val}</span>
                    <span className="font-mono text-xs text-white/30">{m.unit}</span>
                  </div>
                  <span className="font-mono text-[8px] text-white/20">{m.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── IA EM AÇÃO · BIKE FIT ─── */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-3xl overflow-hidden" style={{ height: 400, background: '#0A0A0A' }}>
              <video autoPlay muted loop playsInline className="w-full h-full object-cover"
                src={mediaUrl('henrique.mp4')} />
            </div>
            <div>
              <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Bike fit · IA</span>
              <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-5">
                Análise biomecânica da{' '}
                <span className="font-bold" style={{ color: '#4B7BF5' }}>pedalada em tempo real</span>
              </h2>
              <p className="text-white/55 text-base leading-relaxed mb-6">
                A IA detecta articulações e rastreia o movimento completo da pedalada — identificando assimetrias, ângulos fora do ideal e compensações que reduzem a eficiência e aumentam o risco de lesão.
              </p>
              <ul className="space-y-3">
                {[
                  'Ângulo do joelho em cada fase da pedalada',
                  'Posição do quadril e assimetrias laterais',
                  'Alinhamento de cotovelo e postura no guidão',
                  'Comparação com parâmetros biomecânicos ideais',
                ].map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/65">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#4B7BF5' }} />{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* SEÇÃO BRANCA */}
      <section id="diferenciais" style={{ background: '#ffffff' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="max-w-xl mb-14">
            <span className="font-mono text-xs text-[#0A2463] uppercase tracking-widest">Por que a Veltron</span>
            <h2 className="font-sans mt-3 leading-tight"
              style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', fontWeight: 800, color: '#0A0A0A' }}>
              Seu ciclômetro diz que você perdeu potência.<br />
              <span style={{ color: '#0A2463' }}>A Veltron diz por quê — e o que fazer.</span>
            </h2>
            <p className="mt-4 text-[#4A4A47] leading-relaxed" style={{ fontSize: '1.05rem' }}>
              Combinamos análise biomecânica por IA com avaliações fisiológicas de laboratório. Dois dados que sozinhos não explicam nada — juntos, mudam tudo.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {diferenciais.map((d, i) => (
              <div key={i} className="dif-card rounded-3xl p-8 flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300"
                style={{ background: '#F8F8F6', border: '1px solid #E5E5E2' }}>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${d.cor}12`, color: d.cor }}>{d.icon}</div>
                  <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: `${d.cor}12`, border: `1px solid ${d.cor}30`, color: d.cor }}>{d.tag}</span>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-xl mb-2" style={{ color: '#0A0A0A' }}>{d.titulo}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A4A47' }}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-3xl px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-4"
            style={{ background: '#0A0A0A' }}>
            <p className="font-sans font-bold text-xl lg:text-2xl text-white text-center lg:text-left">
              "Outros medem o movimento.{' '}
              <span style={{ color: '#4B7BF5' }}>Nós medimos o ciclista."</span>
            </p>
            <button onClick={() => smoothScrollTo('agendar')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap hover:opacity-90 transition-opacity flex-shrink-0 border-none cursor-pointer"
              style={{ background: '#4B7BF5', color: 'white' }}>
              Quero meu diagnóstico <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* DASHBOARD MONITOR */}
      <section ref={statsRef} className="py-24 lg:py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Dados reais</span>
            <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3">
              O diagnóstico completo{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>em números</span>
            </h2>
          </div>
          <div className="rounded-3xl overflow-hidden" style={{ background: '#080808', border: '1px solid rgba(75,123,245,0.2)' }}>
            <div className="flex items-center justify-between px-6 py-3"
              style={{ background: '#0d0d0d', borderBottom: '1px solid rgba(75,123,245,0.15)' }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4B7BF5' }} />
                <span className="font-mono text-[10px] text-[#4B7BF5] uppercase tracking-widest">Veltron · Laudo de Ciclismo</span>
              </div>
              <span className="font-mono text-[10px] text-white/20">PROTOCOLO COMPLETO</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'CADÊNCIA IDEAL', val: `${v1}`, sub: 'Assinatura de torque angular', col: '#4B7BF5' },
                { label: 'SIMETRIA DE PEDALADA', val: `${v2}%`, sub: 'L/R precisão laboratorial', col: '#7BA7E8' },
                { label: 'ÂNGULO CRÍTICO JOELHO', val: `${v3}°`, sub: 'Fase propulsiva otimizada', col: '#4B7BF5' },
                { label: 'METABÓLITOS ANALISADOS', val: `${v4}+`, sub: 'Perfil por RMN', col: '#7BA7E8' },
              ].map((m, i) => (
                <div key={i} className="p-6 lg:p-8 flex flex-col gap-2"
                  style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">{m.label}</span>
                  <span className="font-mono font-bold leading-none"
                    style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: m.col }}>{m.val}</span>
                  <span className="font-mono text-[9px] text-white/25">{m.sub}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-5 flex flex-col lg:flex-row items-start lg:items-center gap-3"
              style={{ borderTop: '1px solid rgba(75,123,245,0.15)', background: 'rgba(75,123,245,0.05)' }}>
              <span className="font-mono text-[10px] text-[#4B7BF5] uppercase tracking-widest flex-shrink-0">Recomendação →</span>
              <p className="font-sans text-sm text-white/60 leading-relaxed">
                Ângulo do joelho dentro do ideal. Potência anaeróbica acima da média. Limiar anaeróbico define zonas de treino para as próximas 8 semanas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COACHING + NUTRIÇÃO */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-14">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Além do diagnóstico</span>
            <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3">
              Não entregamos só os dados.<br />
              <span className="font-bold" style={{ color: '#4B7BF5' }}>Entregamos o que fazer com eles.</span>
            </h2>
            <p className="text-white/40 text-base mt-4 max-w-xl leading-relaxed">
              Com base nos seus resultados, a Veltron entrega um plano completo — treino, nutrição e acompanhamento — personalizado para o seu perfil fisiológico real.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              {
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>),
                tag: 'TREINO',
                titulo: 'Plano de treino personalizado',
                desc: 'Baseado no seu VO₂máx, limiar anaeróbico e Wingate. Zonas de intensidade individuais, volumes e sessões prescritas para o seu nível e objetivo.',
                cor: '#4B7BF5',
              },
              {
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" /><path d="M12 6v6l4 2" /></svg>),
                tag: 'NUTRIÇÃO',
                titulo: 'Prescrição nutricional por RMN',
                desc: 'A metabolômica revela o que seu corpo precisa no nível molecular. A prescrição nutricional é baseada nos seus biomarcadores reais, não em tabelas genéricas.',
                cor: '#7BA7E8',
              },
              {
                icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>),
                tag: 'EVOLUÇÃO',
                titulo: 'Acompanhamento longitudinal',
                desc: 'Reavalie a cada ciclo de treino e veja sua evolução com dados. Não com percepção — com métricas reais comparadas ao baseline inicial.',
                cor: '#4B7BF5',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-3xl p-7 flex flex-col gap-5"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.cor}15`, color: item.cor }}>{item.icon}</div>
                  <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: `${item.cor}12`, border: `1px solid ${item.cor}25`, color: item.cor }}>{item.tag}</span>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-white mb-2">{item.titulo}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ANÁLISE EM CAMPO · NETO ─── */}
      <section className="py-24 lg:py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Análise em campo</span>
            <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3">
              Rastreamento em{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>condições reais de treino</span>
            </h2>
            <p className="text-white/45 text-sm mt-3 max-w-xl leading-relaxed">
              Não precisamos de laboratório. O rastreamento funciona em estrada, pista ou rolo — com qualquer câmera ou smartphone.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden"
            style={{ background: '#000', aspectRatio: '16/9', width: '100%' }}>
            <video autoPlay muted loop playsInline
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              src={mediaUrl('neto_web.mp4')} />
          </div>
          <div className="flex flex-wrap gap-6 mt-6">
            {['Funciona com qualquer câmera', 'Análise em estrada, pista ou rolo', 'Keypoints detectados automaticamente', 'Relatório gerado a partir do vídeo'].map(f => (
              <div key={f} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#7BA7E8' }} />
                <span className="text-sm text-white/50">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-24 lg:py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-16">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Processo</span>
            <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3">
              Do pedal ao diagnóstico em{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>3 passos</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-[27px] top-8 bottom-8 w-px hidden lg:block"
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

      {/* CTA */}
      <section id="agendar" className="py-24 lg:py-32 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[560px] mx-auto text-center">
          <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Próximo passo</span>
          <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-4">
            Pronto para pedalar com{' '}
            <span className="font-bold" style={{ color: '#4B7BF5' }}>dados reais?</span>
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
                        pagina: 'ciclismo',
                        campo_extra: formData.profile,
                        campo_extra_label: 'Perfil',
                      })
                      setLoading(false)
                      if (!error) setSubmitted(true)
                    }}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-full cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #4B7BF5, #0A2463)', boxShadow: '0 8px 32px rgba(75,123,245,0.25)', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Enviando...' : <>Quero meu diagnóstico <ChevronRight size={16} /></>}
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
