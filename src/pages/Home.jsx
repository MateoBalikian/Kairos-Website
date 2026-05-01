import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Philosophy from '../components/Philosophy'
import Waitlist from '../components/Waitlist'
import Footer from '../components/Footer'
import { mediaUrl } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const modalidades = [
  {
    slug: 'futebol',
    label: 'Futebol',
    tag: 'Sport Tech',
    desc: 'Rastreamento por IA + fisiologia de laboratório para clubes e atletas.',
    img: mediaUrl('trocker-demo.mp4'),
    isVideo: true,
    color: '#4B7BF5',
  },
  {
    slug: 'ciclismo',
    label: 'Ciclismo',
    tag: 'Sport Tech',
    desc: 'Bike fit biomecânico + potência anaeróbica + perfil metabólico completo.',
    img: mediaUrl('henrique.mp4'),
    isVideo: true,
    color: '#7BA7E8',
  },
  {
    slug: 'natacao',
    label: 'Natação',
    tag: 'Sport Tech',
    desc: 'Análise de braçada por pose estimation + VO₂máx + metabolômica por RMN.',
    img: mediaUrl('nado_web.mp4'),
    isVideo: true,
    color: '#4B7BF5',
  },
]

const diferenciais = [
  {
    tag: 'FISIOLOGIA',
    titulo: 'VO₂máx',
    desc: 'O teto aeróbico de cada atleta. Medido com precisão de laboratório no LACAE · UFAL.',
    cor: '#7BA7E8',
  },
  {
    tag: 'FISIOLOGIA',
    titulo: 'Limiar Anaeróbico',
    desc: 'A intensidade exata onde a fadiga começa. Coleta de lactato sanguíneo estágio a estágio.',
    cor: '#4B7BF5',
  },
  {
    tag: 'METABOLÔMICA',
    titulo: 'Metabolômica por RMN',
    desc: '200+ metabólitos que revelam recuperação, adaptação e deficiências nutricionais invisíveis.',
    cor: '#7BA7E8',
  },
  {
    tag: 'IA',
    titulo: 'IA em Campo',
    desc: 'Inteligência artificial que rastreia cada atleta frame a frame — sem câmeras especiais, sem GPS, sem sensores.',
    cor: '#4B7BF5',
  },
]

const institutos = ['UFAL', 'LACAE', 'IQB', 'HUPAA · EBSERH', 'IEFE', 'IC']

export default function Home() {
  const heroRef = useRef(null)
  const difRef = useRef(null)
  const modRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hi'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: 'power3.out', delay: 0.3 }
      )

      // Diferenciais stagger
      gsap.fromTo('.dif-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: difRef.current, start: 'top 78%' }
        }
      )

      // Modalidades stagger
      gsap.fromTo('.mod-card',
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: modRef.current, start: 'top 78%' }
        }
      )
    })
    return () => ctx.revert()
  }, [])

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
      <Navbar />

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-black">
        <video autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={mediaUrl('heromidia.mp4')} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.85) 100%)'
        }} />

        <div className="absolute z-10"
          style={{
            bottom: 'clamp(100px, 12vh, 160px)',
            left: 'clamp(24px, 5vw, 72px)',
            right: 'clamp(24px, 5vw, 64px)',
            maxWidth: 680,
          }}>

          <div className="hi">
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
              Deep Tech · Ciência do Esporte · Maceió, AL
            </span>
          </div>

          <h1 className="hi font-sans font-bold text-white mt-4"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', lineHeight: 1.05 }}>
            A ciência que estava<br />
            <span style={{ color: '#4B7BF5' }}>só nos centros olímpicos.</span>
          </h1>

          <p className="hi mt-5 text-white/65 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', maxWidth: 540 }}>
            Avaliações fisiológicas de laboratório — VO₂máx, limiar anaeróbico, metabolômica por RMN — integradas com rastreamento por inteligência artificial. Para atletas, times e profissionais de saúde.
          </p>

          <div className="hi flex flex-wrap gap-2 mt-5">
            {['VO₂máx', 'Limiar Anaeróbico', 'Metabolômica por RMN', 'Rastreamento por IA', 'LACAE · UFAL'].map(t => (
              <span key={t}
                className="font-mono text-[11px] text-white/50 border border-white/12 rounded-full px-3 py-1"
                style={{ backdropFilter: 'blur(4px)', background: 'rgba(255,255,255,0.04)' }}>
                {t}
              </span>
            ))}
          </div>

          <a href="#modalidades"
            onClick={(e) => { e.preventDefault(); smoothScrollTo('modalidades') }}
            className="hi inline-flex items-center gap-3 mt-8 hover:opacity-90 transition-opacity"
            style={{
              background: 'white', borderRadius: 99, padding: '14px 28px',
              color: '#0A0A0A', fontWeight: 600, fontSize: '0.85rem',
              letterSpacing: '1.5px', textDecoration: 'none',
            }}>
            ESCOLHA SUA MODALIDADE
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full"
              style={{ background: '#0A0A0A' }}>
              <ArrowRight size={13} color="white" />
            </span>
          </a>
        </div>
      </section>

      {/* ─── DIFERENCIAL — seção de alto contraste ─── */}
      <section ref={difRef} id="diferenciais" style={{ background: '#ffffff' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs text-[#0A2463] uppercase tracking-widest">
              Por que a Veltron
            </span>
            <h2 className="font-sans mt-3 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#0A0A0A' }}>
              GPS mostra o que o atleta fez.<br />
              <span style={{ color: '#0A2463' }}>A Veltron mostra por que ele rendeu assim.</span>
            </h2>
            <p className="mt-5 text-[#4A4A47] leading-relaxed"
              style={{ fontSize: '1.1rem', maxWidth: 560 }}>
              Nenhuma outra plataforma no Brasil combina avaliação fisiológica de laboratório com rastreamento por IA. São os dois lados do mesmo diagnóstico.
            </p>
          </div>

          {/* Grid de diferenciais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {diferenciais.map((d, i) => (
              <div key={i} className="dif-item rounded-3xl p-7 flex flex-col gap-4"
                style={{ background: '#F8F8F6', border: '1px solid #E5E5E2' }}>
                <span
                  className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-4"
                  style={{
                    background: `${d.cor}15`,
                    border: `1px solid ${d.cor}40`,
                    color: d.cor,
                  }}>
                  {d.tag}
                </span>
                <h3 className="font-sans font-bold text-xl" style={{ color: '#0A0A0A' }}>
                  {d.titulo}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4A4A47' }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Frase de impacto */}
          <div className="mt-8 rounded-3xl px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-4"
            style={{ background: '#0A0A0A' }}>
            <p className="font-sans font-bold text-xl lg:text-2xl text-white text-center lg:text-left">
              "Enquanto outros medem o movimento,{' '}
              <span style={{ color: '#7BA7E8' }}>nós medimos o atleta."</span>
            </p>
            <a href="#modalidades"
              onClick={(e) => { e.preventDefault(); smoothScrollTo('modalidades') }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#0A2463] bg-white whitespace-nowrap hover:opacity-90 transition-opacity flex-shrink-0">
              Ver aplicações
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── PORTAL DE MODALIDADES ─── */}
      <section id="modalidades" ref={modRef} className="py-24 lg:py-32 px-6 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">
              Para qual modalidade?
            </span>
            <h2 className="font-sans font-light text-3xl lg:text-5xl text-white tracking-tight mt-3">
              Escolha sua modalidade e veja{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>
                como a Veltron trabalha para você
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {modalidades.map((mod, i) => (
              <Link key={i} to={`/${mod.slug}`}
                className="mod-card group relative overflow-hidden rounded-3xl block"
                style={{ height: 480, textDecoration: 'none' }}>

                {/* Media de fundo */}
                <video autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={mod.img} />

                {/* Overlay gradiente */}
                <div className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)'
                  }} />

                {/* Borda colorida no hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ border: `2px solid ${mod.color}` }} />

                {/* Conteúdo */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
                      style={{
                        background: `${mod.color}20`,
                        border: `1px solid ${mod.color}40`,
                        color: mod.color,
                      }}>
                      {mod.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans font-bold text-white mb-2"
                      style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: 1.1 }}>
                      {mod.label}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-5">
                      {mod.desc}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all duration-300"
                      style={{ color: mod.color }}>
                      Ver avaliações
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CREDIBILIDADE ─── */}
      <section style={{ background: '#0A0A0A' }} className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-md">
              <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                Base institucional
              </span>
              <h2 className="font-sans font-bold text-2xl lg:text-3xl text-white mt-3 leading-snug">
                Ciência universitária.<br />
                <span style={{ color: '#7BA7E8' }}>Aplicação real.</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mt-3">
                Deep tech vinculada à UFAL. Pesquisa clínica validada no HUPAA · EBSERH. Metodologia revisada por pares.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
              {institutos.map((inst, i) => (
                <div key={i}
                  className="rounded-2xl px-5 py-3 font-mono text-sm font-medium"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.7)',
                  }}>
                  {inst}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-12"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {[
              { val: '99.5%', label: 'Precisão do modelo preditivo' },
              { val: '200+', label: 'Metabólitos por RMN' },
              { val: '4', label: 'Protocolos integrados' },
              { val: 'UFAL', label: 'Universidade Federal de Alagoas' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-mono font-bold text-2xl lg:text-3xl text-white">{s.val}</p>
                <p className="font-mono text-[10px] text-white/35 uppercase tracking-wide mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <Philosophy />

      {/* ─── WAITLIST ─── */}
      <Waitlist />

      <Footer />
    </div>
  )
}
