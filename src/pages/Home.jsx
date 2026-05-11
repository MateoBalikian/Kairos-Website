import React, { useEffect, useRef, useState } from 'react'
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
    slug: 'corrida',
    label: 'Corrida',
    tag: 'Sport Tech',
    desc: 'Pose estimation + cinética do lactato + metabolômica para corredores de rua e atletas de pista.',
    img: mediaUrl('herocorrida.mp4'),
    isVideo: true,
    color: '#22d3ee',
  },
  {
    slug: 'ciclismo',
    label: 'Ciclismo',
    tag: 'Sport Tech',
    desc: 'Bike fit biomecânico + limiar de lactato + perfil metabólico completo.',
    img: mediaUrl('henrique.mp4'),
    isVideo: true,
    color: '#7BA7E8',
  },
  {
    slug: 'natacao',
    label: 'Natação',
    tag: 'Sport Tech',
    desc: 'Análise de braçada por pose estimation + metabolômica.',
    img: mediaUrl('nado_web.mp4'),
    isVideo: true,
    color: '#4B7BF5',
  },
]

const diferenciais = [
  {
    tag: 'BIOMECÂNICA',
    titulo: 'Pose Estimation',
    desc: 'Nossa IA rastreia 17 pontos articulares em tempo real, sem marcadores no corpo. Oscilação, assimetria e alinhamento — visíveis frame a frame.',
    cor: '#4B7BF5',
  },
  {
    tag: 'FISIOLOGIA',
    titulo: 'Limiar de Lactato',
    desc: 'O padrão-ouro da fisiologia do exercício. Identificamos LT1 e LT2 com coleta capilar real — a métrica definitiva para prescrição de zonas de treino.',
    cor: '#4B7BF5',
  },
  {
    tag: 'METABOLÔMICA',
    titulo: 'Assinatura Molecular',
    desc: '200+ metabólitos que revelam o que nenhum exame convencional enxerga — recuperação, adaptação e deficiências invisíveis.',
    cor: '#4B7BF5',
  },
  {
    tag: 'INTELIGÊNCIA ARTIFICIAL',
    titulo: 'Core Engine AI',
    desc: 'Nossa IA cruza biomecânica, lactato e metabolômica em um único diagnóstico. O ponto onde os 3 se tornam 1.',
    cor: '#4B7BF5',
  },
]

const institutos = ['Veltron', 'Maceió, AL', 'Brasil']

function FaqSection() {
  const [open, setOpen] = React.useState(null)

  const faqs = [
    {
      q: 'Preciso de algum equipamento especial para fazer a análise?',
      a: 'Não. Para a análise biomecânica basta gravar um vídeo com qualquer smartphone — sem câmeras especiais, sem sensores e sem marcadores no corpo. Para as avaliações fisiológicas (curva de lactato e metabolômica), você comparece presencialmente na Veltron em Maceió.',
    },
    {
      q: 'Quanto tempo leva para receber o diagnóstico?',
      a: 'Após a avaliação presencial e o envio do vídeo, você recebe o laudo completo em até 48 horas. O relatório integra biomecânica, fisiologia e metabolômica em um único documento com recomendações individualizadas.',
    },
    {
      q: 'Para que tipo de atleta a Veltron é indicada?',
      a: 'Para qualquer atleta que queira tomar decisões de treino baseadas em dados reais — do corredor de rua que quer melhorar seu pace até o ciclista que quer otimizar potência e recuperação. Também atendemos treinadores, equipes e profissionais de saúde que trabalham com esporte.',
    },
    {
      q: 'O que é o Limiar de Lactato e por que é mais preciso que zonas de frequência cardíaca?',
      a: 'O Limiar de Lactato é o ponto exato de intensidade onde o lactato sanguíneo começa a se acumular mais rápido do que o corpo consegue remover. É determinado com coleta capilar real — não estimado por algoritmo. Zonas de frequência cardíaca variam com temperatura, hidratação e fadiga. O lactato não mente.',
    },
    {
      q: 'O que é metabolômica e por que ela importa para o meu treino?',
      a: 'Metabolômica é a análise de mais de 200 metabólitos do seu sangue — moléculas que revelam o que está acontecendo dentro das células. Ela identifica deficiências nutricionais invisíveis em exames convencionais, marcadores de overtraining antes dos sintomas aparecerem e o status real de recuperação muscular.',
    },
    {
      q: 'A Veltron atende apenas atletas de Maceió?',
      a: 'As avaliações fisiológicas presenciais são realizadas em Maceió, AL. A análise biomecânica por vídeo pode ser feita remotamente — você grava, envia e recebe o diagnóstico de qualquer lugar do Brasil.',
    },
  ]

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => (
        <div key={i}
          className="rounded-2xl overflow-hidden cursor-pointer"
          style={{ background: '#111111', border: `1px solid ${open === i ? 'rgba(75,123,245,0.3)' : 'rgba(255,255,255,0.07)'}`, transition: 'border-color 0.3s ease' }}
          onClick={() => setOpen(open === i ? null : i)}>
          <div className="flex items-center justify-between px-6 py-5 gap-4">
            <p className="font-sans font-semibold text-sm text-white leading-snug">{faq.q}</p>
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: open === i ? 'rgba(75,123,245,0.15)' : 'rgba(255,255,255,0.05)', transition: 'background 0.3s ease' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={open === i ? '#4B7BF5' : 'rgba(255,255,255,0.4)'} strokeWidth="2.5" strokeLinecap="round"
                style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease, stroke 0.3s ease' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
          {open === i && (
            <div className="px-6 pb-5">
              <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

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
    <div className="min-h-[100dvh] bg-[#0A0A0A]">
      <Navbar />

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-[100dvh] overflow-hidden bg-black">
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
            <span className="font-sans text-xs text-white/40 uppercase tracking-widest">
              Deep Tech · Ciência do Esporte · Maceió, AL
            </span>
          </div>

          <h1 className="hi font-sans font-bold text-white mt-4"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', lineHeight: 1.05 }}>
            Transformando movimento em<br />
            <span style={{ color: '#4B7BF5' }}>inteligência competitiva.</span>
          </h1>

          <p className="hi mt-5 text-white/65 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', maxWidth: 540 }}>
            Eliminamos a incerteza dos wearables e apps. A Veltron traduz movimento em cinética do lactato, metabolômica e biomecânica — a tríade que realmente determina performance.
          </p>

          <div className="hi flex flex-wrap gap-2 mt-5">
            {['Limiar de Lactato', 'Metabolômica', 'Rastreamento por IA', 'Veltron'].map(t => (
              <span key={t}
                className="font-sans text-[11px] text-white/50 border border-white/12 rounded-full px-3 py-1"
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

      {/* ─── COMO FUNCIONA ─── */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Como funciona</span>
            <h2 className="font-sans font-light text-3xl lg:text-5xl text-white tracking-tight mt-3">
              Simples assim.{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>3 passos.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            <div className="hidden lg:block absolute top-[52px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px"
              style={{ background: 'linear-gradient(90deg, rgba(75,123,245,0.5), rgba(123,167,232,0.5))' }} />

            {[
              {
                step: '01',
                icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>),
                titulo: 'Grave com qualquer celular',
                descricao: 'Sem câmeras especiais. Sem sensores. Sem equipamentos caros. Seu smartphone já é suficiente — em esteira, piscina, bike ou pista.',
                cor: '#4B7BF5',
              },
              {
                step: '02',
                icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>),
                titulo: 'Envie para a Veltron',
                descricao: 'Upload simples pela nossa plataforma. Nossa equipe recebe, processa e integra com os dados fisiológicos da sua avaliação presencial.',
                cor: '#4B7BF5',
              },
              {
                step: '03',
                icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>),
                titulo: 'Receba seu diagnóstico',
                descricao: 'Um laudo completo: biomecânica + fisiologia + metabolômica. Dados reais sobre como seu corpo se move e o que ele consome para fazer isso.',
                cor: '#4B7BF5',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-3xl p-8 flex flex-col gap-5"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-2xl" style={{ color: item.cor }}>
                    {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(75,123,245,0.1)', color: '#4B7BF5' }}>
                    {item.icon}
                  </div>
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="font-sans font-bold text-white text-sm mb-1">Sem burocracia. Sem equipamentos especiais.</p>
              <p className="text-white/40 text-xs leading-relaxed">
                A tecnologia que estava só nos centros olímpicos agora cabe no seu bolso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SKELETON VIDEO ─── */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Vídeo */}
            <div className="rounded-3xl overflow-hidden relative"
              style={{ border: '1px solid rgba(255,255,255,0.07)', aspectRatio: '16/10', boxShadow: 'inset 0 0 40px 40px #0A0A0A' }}>
              <video
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src={mediaUrl('skeleton.mp4')}
              />
            </div>

            {/* Texto */}
            <div>
              <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Inteligência Artificial</span>
              <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-5">
                A IA que vê o que{' '}
                <span className="font-bold" style={{ color: '#4B7BF5' }}>o olho humano não vê.</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-6">
                Nosso algoritmo de Pose Estimation rastreia cada articulação em tempo real, frame a frame. Sem marcadores, sem sensores, sem equipamentos especiais — só a câmera do seu celular.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  '17 pontos articulares rastreados simultaneamente',
                  'Análise frame a frame em tempo real',
                  'Funciona com qualquer câmera ou celular',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(75,123,245,0.15)' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4B7BF5" strokeWidth="3" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="text-sm text-white/60">{item}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── DIFERENCIAL — seção de alto contraste ─── */}
      <section ref={difRef} id="diferenciais" style={{ background: '#ffffff' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="font-sans text-xs text-[#0A2463] uppercase tracking-widest">
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
                  className="font-sans text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-4"
                  style={{
                    background: d.cor,
                    border: `1px solid ${d.cor}`,
                    color: 'white',
                    fontSize: '10px',
                    fontFamily: 'sans-serif',
                  }}>
                  {d.tag}
                </span>
                <h3 className="font-sans font-bold text-xl" style={{ color: '#0A0A0A' }}>
                  {d.titulo}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4A4A47' }}>
                  {d.desc}
                </p>
                {d.tag === 'BIOMECÂNICA' && (
                  <a href="/pose-estimation" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '12px', color: '#4B7BF5', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>
                    Saiba mais →
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Frase de impacto */}
          <div className="mt-8 rounded-3xl px-8 py-8 flex flex-col lg:flex-row items-center justify-between gap-6"
            style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-xl">
              <p className="font-sans font-bold text-xl lg:text-2xl text-white text-center lg:text-left mb-2">
                Não entregamos dados isolados.{' '}
                <span style={{ color: '#7BA7E8' }}>Entregamos uma síntese inteligente do movimento humano.</span>
              </p>
              <p className="text-white/40 text-sm text-center lg:text-left">
                Movimento mecânico + resposta do lactato + perfil molecular. Os três fatores que nenhum GPS ou wearable consegue medir.
              </p>
            </div>
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
                    <span className="font-sans text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
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

      {/* ─── CORE ENGINE AI ─── */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-sans text-xs text-white/30 uppercase tracking-widest">O grande diferencial</span>
              <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-5">
                Core Engine AI —{' '}
                <span className="font-bold" style={{ color: '#4B7BF5' }}>onde os 3 se tornam 1.</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Uma inteligência artificial desenvolvida para cruzar biomecânica, limiar de lactato e metabolômica simultaneamente. Não entrega dados isolados — entrega o diagnóstico completo do atleta em um único laudo.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { titulo: 'Cruza os 3 pilares', desc: 'Biomecânica + Lactato + Metabolômica analisados em conjunto, não separadamente.' },
                  { titulo: 'Interpreta padrões', desc: 'Identifica correlações invisíveis à análise humana isolada de cada dado.' },
                  { titulo: 'Gera o diagnóstico', desc: 'Aponta o ponto exato onde a técnica colapsa e o que fazer para mudar isso.' },
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
            <div className="rounded-3xl p-8 flex flex-col gap-4" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
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
                  <p className="font-bold text-white text-base">Core Engine AI</p>
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

      {/* ─── PHILOSOPHY ─── */}
      <Philosophy />

      {/* ─── WAITLIST ─── */}
      <Waitlist />

      {/* ─── FAQ ─── */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[800px] mx-auto">
          <div className="mb-16">
            <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Dúvidas frequentes</span>
            <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-3">
              Perguntas{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>frequentes.</span>
            </h2>
          </div>

          <FaqSection />
        </div>
      </section>

      <Footer />
    </div>
  )
}
