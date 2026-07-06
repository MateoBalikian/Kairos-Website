import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LaudoExemplo from '../components/LaudoExemplo'
import EntendaCiencia from '../components/EntendaCiencia'
import { mediaUrl, supabase } from '../lib/supabase'
import { planoLabels, objetivoLabels, buildLeadMessage, introEsporte } from '../lib/leadLabels'

gsap.registerPlugin(ScrollTrigger)

const diferenciais = [
  {
    tag: 'BIOMECÂNICA',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
    titulo: 'Pose Estimation na Pedalada',
    desc: 'Nossa IA identifica quadril, joelho e tornozelo em tempo real, sem marcadores no corpo. Assimetrias imperceptíveis ao olho humano ficam visíveis — e corrigíveis.',
    cor: '#4B7BF5',
    cta: 'Envie seu vídeo',
    link: '/pose-estimation',
  },
  {
    tag: 'FISIOLOGIA',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>),
    titulo: 'Limiar de Lactato',
    desc: 'Curva Lactato × Potência com coleta capilar real. Identificamos seu LT1 e LT2 para prescrição exata de zonas de treino.',
    cor: '#4B7BF5',
    cta: 'Agende sua análise',
    link: '/limiar-de-lactato',
  },
  {
    tag: 'METABOLÔMICA',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" /></svg>),
    titulo: 'Assinatura Molecular',
    desc: 'Metabólitos que explicam por que as pernas pesam mesmo após descanso. Sinais de inflamação e overtraining aparecem semanas antes do sintoma — preditivo, não reativo.',
    cor: '#4B7BF5',
    cta: 'Agende sua análise',
    link: '/metabolomica',
  },
  {
    tag: 'INTELIGÊNCIA ARTIFICIAL',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" /><path d="M12 6v6l4 2" /></svg>),
    titulo: 'Veltron Engine AI',
    desc: 'Nossa IA converge biomecânica, lactato e metabolômica em um único diagnóstico. Identifica em qual potência sua técnica colapsa — e o que fazer para mudar isso.',
    cor: '#4B7BF5',
    cta: 'Conheça a tecnologia',
    link: '#contato',
  },
]



export default function Ciclismo() {
  const heroRef = useRef(null)
  const btnRef = useRef(null)
  const [form, setForm] = useState({ nome: '', whatsapp: '', email: '', modalidades: ['Ciclismo'], plano: '', objetivo: '', mensagem: '' })
  const [status, setStatus] = useState('idle')

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
    <div className="min-h-screen min-h-[100dvh] bg-[#0A0A0A]">
      <Navbar />

      {/* ─── HERO — SPLIT COM PAINEL DE DADOS ─── */}
      <section ref={heroRef} className="relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
        style={{ minHeight: '100dvh', background: '#000000ff' }}>
        <img
          src={mediaUrl('herociclismo.jpeg')}
          alt=""
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center center', opacity: 0.95 }}
          onError={(e) => e.target.style.display = 'none'}
        />

        {/* Esquerda — texto */}
        <div className="relative flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-10 sm:py-16 lg:py-0"
          style={{ minHeight: 'clamp(300px, 75vh, 500px)' }}>
          <div className="max-w-[480px]">
            <div className="hi flex items-center gap-3 mb-8">
              <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-white/50 hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                <ArrowLeft size={14} /> Veltron
              </Link>
              <span className="text-white/20">·</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(75,123,245,0.15)', border: '1px solid rgba(75,123,245,0.3)', color: '#4B7BF5' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B7BF5] animate-pulse" />
                Ciclismo · Avaliação Científica
              </span>
            </div>
            <h1 className="hi font-sans font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05 }}>
              Você pedala forte.<br />
              <span style={{ color: '#4B7BF5' }}>Mas estoura antes da hora?</span>
            </h1>
            <p className="hi mt-6 text-white/55 leading-relaxed" style={{ fontSize: '1rem', maxWidth: 400 }}>
              Medimos a potência que você sustenta, a simetria da sua pedalada e onde o seu corpo trava — pra você andar mais com o mesmo esforço.
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
              <button onClick={() => smoothScrollTo('laudo')}
                className="font-sans text-sm text-white/40 hover:text-white transition-colors cursor-pointer border-none bg-transparent">
                Ver exemplo de laudo →
              </button>
            </div>
          </div>
        </div>

        {/* Direita — painel biomecanico */}
        <div className="relative flex flex-col justify-center px-8 lg:px-12 py-16 lg:py-0"
          style={{ background: 'transparent', minHeight: 'clamp(280px, 60vh, 500px)' }}>
          <div className="hi" style={{ marginTop: 'auto' }}>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4B7BF5' }} />
              <span className="font-sans text-[10px] text-[#4B7BF5] uppercase tracking-widest">Análise biomecanica · Bike fit</span>
            </div>

            {/* Métrica principal — ângulo do joelho com barra de range */}
            <div className="mb-6 rounded-3xl p-4" style={{ background: '#0f0f0f', border: '1px solid rgba(75,123,245,0.15)' }}>
              <div className="flex items-end justify-between mb-2">
                <span className="font-sans text-[10px] text-white/30 uppercase tracking-widest">Ângulo do joelho</span>
                <span className="font-sans text-[10px] px-2 py-1 rounded-full" style={{ background: 'rgba(75,123,245,0.15)', color: '#4B7BF5' }}>✓ Ideal</span>
              </div>
              <div className="flex items-end gap-3">
                <span className="font-sans font-bold text-white" style={{ fontSize: '2.2rem', lineHeight: 1 }}>142</span>
                <span className="font-sans text-2xl text-white/50 mb-1">°</span>
              </div>
              {/* Barra de range */}
              <div className="mt-3 relative">
                <div className="h-1.5 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="absolute top-0 h-1.5 rounded-full" style={{ background: '#4B7BF5', left: '45%', width: '25%' }} />
                <div className="absolute top-0 w-2.5 h-2.5 rounded-full -translate-y-[3px]" style={{ background: 'white', left: 'calc(55% - 5px)', boxShadow: '0 0 8px rgba(75,123,245,0.8)' }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-sans text-[9px] text-white/20">130°</span>
                <span className="font-sans text-[9px] text-[#4B7BF5]">Ideal: 135–145°</span>
                <span className="font-sans text-[9px] text-white/20">155°</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── IA EM AÇÃO · BIKE FIT ─── */}
      <section className="py-16 lg:py-24 xl:py-32 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-8 lg:gap-16 items-start">
            <div className="rounded-3xl overflow-hidden" style={{ aspectRatio: '16/9', background: '#0A0A0A' }}>
              <video autoPlay muted loop playsInline className="w-full h-full object-cover"
                src={mediaUrl('pougaard1_web.mp4')} />
            </div>
            <div>
              <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Pose Estimation · Os melhores do mundo</span>
              <h2 className="font-sans font-light text-2xl md:text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-5">
                Vingegaard vs Pogaçar.{' '}
                <span className="font-bold" style={{ color: '#4B7BF5' }}>A diferença está na técnica.</span>
              </h2>
              <p className="text-white/55 text-base leading-relaxed mb-6">
                Com nossa tecnologia de Pose Estimation, conseguimos mapear e comparar a biomecânica de pedalada dos dois melhores ciclistas do mundo frame a frame — identificando as diferenças técnicas que separam atletas de elite. A mesma análise que aplicamos nos campeões, disponível para o seu treino.
              </p>
              <ul className="space-y-3">
                {[
                  'Comparação de biomecânica entre atletas em tempo real',
                  'Ângulos articulares medidos quadro a quadro por IA',
                  'Assimetrias e padrões técnicos identificados automaticamente',
                  'A mesma tecnologia aplicada aos melhores do mundo',
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
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16 lg:py-24 xl:py-32">
          <div className="max-w-xl mb-14">
            <span className="font-mono text-xs text-[#0A2463] uppercase tracking-widest">Por que a Veltron</span>
            <h2 className="font-sans mt-3 leading-tight"
              style={{ fontSize: 'clamp(1.4rem,3.5vw,2.8rem)', fontWeight: 800, color: '#0A0A0A' }}>
              Seu velocímetro diz que você perdeu potência.<br />
              <span style={{ color: '#0A2463' }}>A Veltron diz por quê — e o que fazer.</span>
            </h2>
            <p className="mt-4 text-[#4A4A47] leading-relaxed" style={{ fontSize: '1.05rem' }}>
              Combinamos análise biomecânica por IA com avaliações fisiológicas de laboratório. Dois dados que sozinhos não explicam nada — juntos, mudam tudo.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {diferenciais.map((d, i) => (
              <div key={i} className="dif-card rounded-3xl p-6 lg:p-8 flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300"
                style={{ background: '#F8F8F6', border: '1px solid #E5E5E2' }}>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${d.cor}12`, color: d.cor }}>{d.icon}</div>
                  <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: d.cor, border: `1px solid ${d.cor}`, color: 'white' }}>{d.tag}</span>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-xl mb-2" style={{ color: '#0A0A0A' }}>{d.titulo}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A4A47' }}>{d.desc}</p>
                </div>
                <a href={d.link}
                  className="inline-flex items-center gap-2 mt-auto pt-4 group/cta"
                  style={{
                    color: '#0A2463',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '0.3px',
                  }}>
                  {d.cta}
                  <span className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1">→</span>
                </a>
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

      {/* ─── VELTRON ENGINE AI ─── */}
      <section className="py-16 lg:py-24 xl:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="text-xs text-white/30 uppercase tracking-widest">O grande diferencial</span>
              <h2 className="font-sans font-light text-2xl md:text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-5">
                Veltron Engine AI —{' '}
                <span className="font-bold" style={{ color: '#4B7BF5' }}>onde os 3 se tornam 1.</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Uma inteligência artificial desenvolvida para convergir biomecânica, limiar de lactato e metabolômica simultaneamente. Não entrega dados isolados — entrega o diagnóstico completo do ciclista em um único laudo.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { titulo: 'Converge os 3 pilares', desc: 'Biomecânica + Lactato + Metabolômica analisados em conjunto, não separadamente.' },
                  { titulo: 'Interpreta padrões', desc: 'Identifica em qual potência o erro mecânico e o aumento de lactato se encontram.' },
                  { titulo: 'Gera o diagnóstico', desc: 'Aponta o ponto exato onde a eficiência colapsa e o que ajustar na pedalada e no treino.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(75,123,245,0.15)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4B7BF5" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans font-bold text-sm text-white mb-1">{item.titulo}</p>
                      <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl p-6 lg:p-8 flex flex-col gap-4" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex flex-col gap-3">
                {[
                  { tag: 'Biomecânica', titulo: 'Pose Estimation', cor: '#4B7BF5' },
                  { tag: 'Fisiologia', titulo: 'Limiar de Lactato', cor: '#4B7BF5' },
                  { tag: 'Metabolômica', titulo: 'Assinatura Molecular', cor: '#4B7BF5' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-4 rounded-2xl px-5 py-4"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.cor }} />
                      <div className="flex-1">
                        <p className="text-xs text-white/35 mb-0.5">{item.tag}</p>
                        <p className="text-sm font-semibold text-white">{item.titulo}</p>
                      </div>
                    </div>
                    {i < 2 && (
                      <div className="flex justify-center py-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(75,123,245,0.4)" strokeWidth="2" strokeLinecap="round">
                          <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 px-2">
                <div className="flex-1 h-px" style={{ background: 'rgba(75,123,245,0.3)' }} />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4B7BF5" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                </svg>
                <div className="flex-1 h-px" style={{ background: 'rgba(75,123,245,0.3)' }} />
              </div>
              <div className="rounded-2xl px-5 py-5 flex items-center gap-4" style={{ background: '#4B7BF5' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/70 mb-0.5">Inteligência Artificial</p>
                  <p className="font-bold text-white text-base">Veltron Engine AI</p>
                </div>
                <div className="ml-auto">
                  <p className="text-xs text-white/60 text-right">Diagnóstico</p>
                  <p className="text-sm font-bold text-white text-right">Integrado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BIKE FIT ─── */}
      <section className="py-16 lg:py-24 xl:py-32 px-6" style={{ background: '#ffffff' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Imagem */}
            <div className="rounded-3xl overflow-hidden"
              style={{ border: '1px solid #E5E5E2', minHeight: 'clamp(250px, 50vh, 480px)' }}>
              <img
                src={mediaUrl('bikefit.png')}
                alt="Bike Fit Veltron"
                style={{ width: '100%', height: '100%', minHeight: 'clamp(250px, 50vh, 480px)', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Texto */}
            <div>
              <span className="font-sans text-xs text-[#0A2463] uppercase tracking-widest">Bike Fit Online</span>
              <h2 className="font-sans mt-3 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: '#0A0A0A' }}>
                Bike Fit online.<br />
                <span style={{ color: '#0A2463' }}>Sem sair de casa.</span>
              </h2>
              <p className="mt-4 text-[#4A4A47] leading-relaxed" style={{ fontSize: '1rem', maxWidth: 480 }}>
                A nossa IA auxilia o treinador a calcular a posição ideal para sua fisiologia e objetivo. Você envia suas medidas, o algoritmo processa e entrega os dados que o profissional precisa para ajustar seu posicionamento — sem precisar ir a um estúdio.
              </p>

              {/* Medidas que pedimos */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { label: 'Você envia', items: ['Altura total', 'Comprimento de perna', 'Envergadura', 'Comprimento do tronco'] },
                  { label: 'Você recebe', items: ['Altura do selim', 'Recuo do selim', 'Alcance ao guidão', 'Ângulo do tronco'] },
                ].map((col, i) => (
                  <div key={i} className="rounded-2xl p-5"
                    style={{ background: '#F8F8F6', border: '1px solid #E5E5E2' }}>
                    <p className="font-sans font-bold text-xs uppercase tracking-widest mb-3"
                      style={{ color: '#0A2463' }}>{col.label}</p>
                    <ul className="space-y-2">
                      {col.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm" style={{ color: '#4A4A47' }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#4B7BF5' }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Benefícios */}
              <div className="mt-6 flex flex-col gap-3">
                {[
                  'Evite lesões causadas por posição incorreta na bike',
                  'Melhore potência e performance com o encaixe certo',
                  'Tudo remotamente — você envia as medidas pelo WhatsApp',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(75,123,245,0.1)' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4B7BF5" strokeWidth="3" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="text-sm" style={{ color: '#4A4A47' }}>{item}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => smoothScrollTo('agendar')}
                className="mt-8 inline-flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer border-none"
                style={{ background: '#0A2463', borderRadius: 99, padding: '14px 28px', color: 'white', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1.5px' }}>
                QUERO MEU BIKE FIT
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <ArrowRight size={13} color="white" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ANÁLISE EM CAMPO · NETO ─── */}
      <section className="py-16 lg:py-24 xl:py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Análise em campo</span>
            <h2 className="font-sans font-light text-2xl md:text-3xl lg:text-4xl text-white tracking-tight mt-3">
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
              src={mediaUrl('henrique.mp4')} />
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

      {/* ─── ENTENDA A CIÊNCIA (glossário sem jargão) ─── */}
      <EntendaCiencia esporte="ciclismo" />

      {/* ─── O QUE VOCÊ RECEBE — LAUDO ─── */}
      <LaudoExemplo esporte="ciclismo" />

      {/* ─── AVALIAÇÕES ─── */}
      <section className="py-16 lg:py-24 xl:py-32 px-5 md:px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Avaliações</span>
            <h2 className="font-sans mt-3 leading-tight" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'white' }}>
              Avaliações e{' '}
              <span style={{ color: '#4B7BF5' }}>Ciclo de Evolução.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="rounded-3xl p-6 lg:p-8 flex flex-col justify-between gap-6"
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div>
                <div className="flex items-start justify-between mb-6">
                  <span className="font-sans text-xs uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>Express</span>
                  <p className="font-sans font-bold text-white" style={{ fontSize: '2rem', lineHeight: 1 }}>R$250</p>
                </div>
                <h3 className="font-sans font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Avaliação Express</h3>
                <p className="italic mb-3" style={{ color: '#7BA7E8', fontSize: '0.85rem' }}>o check-up rápido pra achar suas zonas de treino</p>
                <p className="text-white/50 text-sm leading-relaxed mb-2">Vídeo da sua técnica + 1 medição de lactato + relatório com as suas zonas.</p>
                <p className="text-white/30 text-xs mb-6">Foco: Triagem e zonas essenciais.</p>
                <div className="flex flex-col gap-3">
                  {['Vídeo analítica básica', '1 ponto de lactato', 'Relatório simplificado', 'Zonas essenciais de treino'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <p className="text-white/60 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-white/30 text-xs">Ideal para atletas iniciantes ou triagem rápida de retorno.</p>
              <a href="#agendar" onClick={(e) => { e.preventDefault(); const t = document.getElementById('agendar'); if (t && window.lenis) { window.lenis.scrollTo(t, { duration: 1.4 }) } else if (t) { t.scrollIntoView({ behavior: 'smooth' }) } }}
                className="inline-flex items-center justify-center gap-3 hover:opacity-90 transition-opacity w-full"
                style={{ background: '#4B7BF5', borderRadius: 99, padding: '14px 28px', color: 'white', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textDecoration: 'none', textAlign: 'center' }}>
                QUERO MINHA AVALIAÇÃO
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </a>
            </div>
            <div className="rounded-3xl p-6 lg:p-8 flex flex-col justify-between gap-6"
              style={{ background: '#0A2463', border: '1px solid rgba(75,123,245,0.4)' }}>
              <div>
                <div className="flex items-start justify-between mb-6">
                  <span className="font-sans text-xs uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Performance</span>
                  <span className="font-sans text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>Melhor custo-benefício</span>
                </div>
                <p className="font-sans font-bold text-white text-right mb-6" style={{ fontSize: '2rem', lineHeight: 1 }}>R$450</p>
                <h3 className="font-sans font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Avaliação Performance</h3>
                <p className="italic mb-3" style={{ color: '#7BA7E8', fontSize: '0.85rem' }}>a avaliação completa: técnica no vídeo + curva de lactato no sangue</p>
                <p className="text-white/70 text-sm leading-relaxed mb-2">Análise biomecânica completa por IA + curva de lactato com vários pontos + relatório com zonas e recomendações.</p>
                <p className="text-white/40 text-xs mb-6">Foco: Otimização real de treinos.</p>
                <div className="flex flex-col gap-3">
                  {['Análise biomecânica completa por IA', 'Curva de lactato com múltiplos pontos', 'Relatório técnico com indicadores', 'Recomendações de prescrição'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <p className="text-white/80 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-white/40 text-xs">Ideal para ciclistas, corredores e nadadores em evolução.</p>
              <a href="#agendar" onClick={(e) => { e.preventDefault(); const t = document.getElementById('agendar'); if (t && window.lenis) { window.lenis.scrollTo(t, { duration: 1.4 }) } else if (t) { t.scrollIntoView({ behavior: 'smooth' }) } }}
                className="inline-flex items-center justify-center gap-3 hover:opacity-90 transition-opacity w-full"
                style={{ background: 'white', borderRadius: 99, padding: '14px 28px', color: '#0A2463', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textDecoration: 'none', textAlign: 'center' }}>
                QUERO MINHA AVALIAÇÃO
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A2463" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </a>
            </div>
            <div className="rounded-3xl p-6 lg:p-8 flex flex-col justify-between gap-6"
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div>
                <div className="flex items-start justify-between mb-6">
                  <span className="font-sans text-xs uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>Follow-up</span>
                  <p className="font-sans font-bold text-white" style={{ fontSize: '2rem', lineHeight: 1 }}>R$290</p>
                </div>
                <h3 className="font-sans font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>Reavaliação / Follow-up</h3>
                <p className="italic mb-3" style={{ color: '#7BA7E8', fontSize: '0.85rem' }}>a mesma avaliação, semanas depois, pra medir o que evoluiu</p>
                <p className="text-white/50 text-sm leading-relaxed mb-2">Refazemos a avaliação completa depois de um ciclo de treino e comparamos com a anterior.</p>
                <p className="text-white/30 text-xs mb-6">Foco: Medição objetiva de evolução.</p>
                <div className="flex flex-col gap-3">
                  {['Repetição completa do protocolo', 'Comparativo com avaliação anterior', 'Evolução das métricas biomecânicas', 'Ajuste de zonas e prescrição'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <p className="text-white/60 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-white/30 text-xs">Para quem já realizou a Avaliação Performance (4 a 8 semanas pós-teste).</p>
              <a href="#agendar" onClick={(e) => { e.preventDefault(); const t = document.getElementById('agendar'); if (t && window.lenis) { window.lenis.scrollTo(t, { duration: 1.4 }) } else if (t) { t.scrollIntoView({ behavior: 'smooth' }) } }}
                className="inline-flex items-center justify-center gap-3 hover:opacity-90 transition-opacity w-full"
                style={{ background: '#4B7BF5', borderRadius: 99, padding: '14px 28px', color: 'white', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textDecoration: 'none', textAlign: 'center' }}>
                QUERO MINHA REAVALIAÇÃO
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EVOLUÇÃO CIENTÍFICA AVANÇADA ─── */}
      <section className="py-16 lg:py-24 xl:py-32 px-5 md:px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-12">
            <span className="font-sans text-xs text-white/40 uppercase tracking-widest">Para quem quer ir além</span>
            <h2 className="font-sans mt-3 leading-tight" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'white' }}>
              Evolução Científica{' '}
              <span style={{ color: '#4B7BF5' }}>Avançada.</span>
            </h2>
          </div>

          {/* Mapa Fisiometabólico */}
          <div className="rounded-3xl p-6 lg:p-10 mb-6 relative overflow-hidden"
            style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(75,123,245,0.5), transparent)' }} />
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
              <div>
                <span className="font-sans text-xs uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-4"
                  style={{ background: 'rgba(75,123,245,0.15)', color: '#7BA7E8', border: '1px solid rgba(75,123,245,0.25)' }}>
                  8 Semanas · 2 Encontros
                </span>
                <h3 className="font-sans font-bold text-white" style={{ fontSize: '1.4rem' }}>
                  Mapa Fisiometabólico Veltron
                </h3>
                <p className="italic mt-2" style={{ color: '#7BA7E8', fontSize: '0.9rem' }}>o raio-x completo: do seu movimento à sua célula</p>
              </div>

            </div>
            <p className="text-white/60 leading-relaxed mb-8" style={{ fontSize: '0.95rem', maxWidth: 700 }}>
              A análise mais completa da Veltron: junta biomecânica, lactato e metabolômica num retrato só do seu corpo. São <span className="text-white font-semibold">2 encontros ao longo de 4 a 8 semanas</span> pra achar os gargalos escondidos que causam fadiga precoce e seguram o seu rendimento.
            </p>
            <p className="font-sans text-xs text-white/30 uppercase tracking-widest mb-4">Inclui 1 Mapa Fisiometabólico completo no ciclo</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                'Análise biomecânica completa por IA (vídeo)',
                'Limiares de lactato medidos no sangue',
                'Leitura metabolômica de saliva ou urina (centenas de marcadores)',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span style={{ color: '#4B7BF5', marginTop: '2px', flexShrink: 0 }}>✦</span>
                  <p className="text-white/60 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <a href="#agendar" onClick={(e) => { e.preventDefault(); smoothScrollTo('agendar') }}
              className="inline-flex items-center justify-center gap-3 mt-8 hover:opacity-90 transition-opacity"
              style={{ background: '#4B7BF5', borderRadius: 99, padding: '14px 28px', color: 'white', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textDecoration: 'none' }}>
              QUERO O MAPA FISIOMETABÓLICO
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Veltron Evolution — premium */}
          <div className="rounded-3xl p-6 lg:p-10 relative overflow-hidden"
            style={{ background: '#111111', border: '1px solid rgba(75,123,245,0.4)', boxShadow: '0 0 50px rgba(75,123,245,0.1)' }}>
            <div className="absolute top-0 left-0 right-0" style={{ height: '3px', background: 'linear-gradient(90deg, transparent, #4B7BF5, transparent)' }} />
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: '#4B7BF5', color: 'white' }}>
                    Premium · 6 Meses
                  </span>
                </div>
                <h3 className="font-sans font-bold text-white" style={{ fontSize: '1.4rem' }}>
                  Veltron Evolution
                </h3>
                <p className="italic mt-2" style={{ color: '#7BA7E8', fontSize: '0.9rem' }}>acompanhamento de 6 meses: avalia, ajusta e reavalia sempre</p>
              </div>

            </div>
            <p className="text-white/60 leading-relaxed mb-8" style={{ fontSize: '0.95rem', maxWidth: 700 }}>
              Acompanhamento científico contínuo: <span className="text-white font-semibold">6 encontros ao longo de 6 meses</span>, com reavaliações e suporte ativo pra ajustar o seu treino o tempo todo. Para atletas de elite e entusiastas de alta performance.
            </p>
            <p className="font-sans text-xs text-white/30 uppercase tracking-widest mb-4">Inclui 2 Mapas Fisiometabólicos completos no ciclo</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                'Leitura metabolômica de saliva ou urina (centenas de marcadores)',
                'Reavaliações de biomecânica e lactato ao longo do programa',
                'Painel com a evolução das suas métricas',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span style={{ color: '#4B7BF5', marginTop: '2px', flexShrink: 0 }}>✦</span>
                  <p className="text-white/60 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <a href="#agendar" onClick={(e) => { e.preventDefault(); smoothScrollTo('agendar') }}
              className="inline-flex items-center justify-center gap-3 mt-8 hover:opacity-90 transition-opacity"
              style={{ background: 'white', borderRadius: 99, padding: '14px 28px', color: '#0A2463', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textDecoration: 'none' }}>
              QUERO O VELTRON EVOLUTION
              <ArrowRight size={16} color="#0A2463" />
            </a>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section id="agendar" className="py-16 lg:py-24 xl:py-32 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[560px] mx-auto text-center">
          <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Próximo passo</span>
          <h2 className="font-sans font-light text-2xl md:text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-4">
            Pronto para pedalar com{' '}
            <span className="font-bold" style={{ color: '#4B7BF5' }}>dados reais?</span>
          </h2>
          <p className="text-white/45 text-sm leading-relaxed mb-10">
            Nossa equipe entrará em contato em breve.
          </p>
          {status === 'success' ? (
            <div className="rounded-3xl p-6 lg:p-8 text-left" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(75,123,245,0.15)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4B7BF5" strokeWidth="2" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-sans font-bold text-xl text-white mb-2">Mensagem enviada!</h3>
                <p className="text-sm text-white/50">Nossa equipe entrará em contato em breve.</p>
                <p className="text-white/50 text-sm mt-2">Você será redirecionado para o WhatsApp. Se não abrir automaticamente, <a href="https://wa.me/558299652230" target="_blank" style={{ color: '#4B7BF5', textDecoration: 'underline' }}>clique aqui</a>.</p>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl p-6 lg:p-8 text-left"
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex flex-col gap-4">
                {[
                  { key: 'nome', label: 'Nome completo', type: 'text', placeholder: 'Seu nome' },
                  { key: 'whatsapp', label: 'WhatsApp', type: 'tel', placeholder: '(82) 99999-9999' },
                  { key: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com' },
                ].map((field) => (
                  <div key={field.key} className="flex flex-col gap-2">
                    <label className="font-sans font-semibold text-sm text-white">{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', color: 'white', background: 'rgba(255,255,255,0.05)' }} />
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-semibold text-sm text-white">Quais modalidades você treina?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Corrida', 'Ciclismo', 'Natação', 'Triathlon'].map((m) => {
                      const active = form.modalidades.includes(m)
                      return (
                        <button type="button" key={m}
                          onClick={() => setForm((f) => ({ ...f, modalidades: f.modalidades.includes(m) ? f.modalidades.filter((x) => x !== m) : [...f.modalidades, m] }))}
                          className="font-sans text-sm rounded-full px-4 py-2 transition-all"
                          style={{ background: active ? '#4B7BF5' : 'rgba(255,255,255,0.05)', color: active ? 'white' : 'rgba(255,255,255,0.6)', border: active ? '1px solid #4B7BF5' : '1px solid rgba(255,255,255,0.12)', cursor: 'pointer' }}>
                          {m}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-semibold text-sm text-white">Plano de interesse</label>
                  <select value={form.plano} onChange={(e) => setForm({ ...form, plano: e.target.value })}
                    style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', color: 'white', background: '#1a1a1a', colorScheme: 'dark' }}>
                    <option value="" style={{ background: '#1a1a1a', color: 'white' }}>Selecione</option>
                    <option value="express" style={{ background: '#1a1a1a', color: 'white' }}>Avaliação Express — R$250</option>
                    <option value="performance" style={{ background: '#1a1a1a', color: 'white' }}>Avaliação Performance — R$450</option>
                    <option value="reavaliacao" style={{ background: '#1a1a1a', color: 'white' }}>Reavaliação / Follow-up — R$290</option>
                    <option value="mapa" style={{ background: '#1a1a1a', color: 'white' }}>Mapa Fisiometabólico</option>
                    <option value="evolution" style={{ background: '#1a1a1a', color: 'white' }}>Veltron Evolution</option>
                    <option value="nao-sei" style={{ background: '#1a1a1a', color: 'white' }}>Ainda não sei</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-semibold text-sm text-white">Qual seu objetivo?</label>
                  <select value={form.objetivo} onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
                    style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', color: 'white', background: '#1a1a1a', colorScheme: 'dark' }}>
                    <option value="" style={{ background: '#1a1a1a', color: 'white' }}>Selecione</option>
                    <option value="melhorar-performance" style={{ background: '#1a1a1a', color: 'white' }}>Melhorar performance</option>
                    <option value="prevenir-lesao" style={{ background: '#1a1a1a', color: 'white' }}>Prevenir lesão</option>
                    <option value="acompanhar-evolucao" style={{ background: '#1a1a1a', color: 'white' }}>Acompanhar evolução</option>
                    <option value="outro" style={{ background: '#1a1a1a', color: 'white' }}>Outro</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans font-semibold text-sm text-white">Mensagem (opcional)</label>
                  <textarea placeholder="Algo mais que queira nos dizer..." value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })} rows={3}
                    style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', color: 'white', background: 'rgba(255,255,255,0.05)', resize: 'none' }} />
                </div>
                <div className="pt-2 flex justify-center">
                  <button ref={btnRef}
                    onClick={() => {
                      // registra o lead em segundo plano (best-effort, nao bloqueia a abertura do WhatsApp)
                      const { modalidades, ...rest } = form
                      supabase.from('leads').insert([{ ...rest, esporte: modalidades.join(', '), pagina: 'ciclismo', created_at: new Date().toISOString() }])
                        .then(({ error }) => { if (error) console.error('Falha ao registrar lead no Supabase:', error) })
                      const msg = buildLeadMessage({
                        intro: `Sou *${form.nome}* e quero uma avaliação científica${introEsporte(form.modalidades)} para entender melhor meu desempenho e evoluir com segurança.`,
                        linhas: [
                          ['Modalidades', modalidades.join(', ')],
                          ['Avaliação', planoLabels[form.plano]],
                          ['Objetivo', objetivoLabels[form.objetivo]],
                          ['Contexto', form.mensagem],
                        ],
                        email: form.email,
                      })
                      window.open(`https://wa.me/558299652230?text=${encodeURIComponent(msg)}`, '_blank')
                      setStatus('success')
                    }}
                    disabled={status === 'loading'}
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-full cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #4B7BF5, #0A2463)', boxShadow: '0 8px 32px rgba(75,123,245,0.25)', opacity: status === 'loading' ? 0.7 : 1 }}>
                    {status === 'loading' ? 'Enviando...' : <>Quero meu diagnóstico <ChevronRight size={16} /></>}
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
