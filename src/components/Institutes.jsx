import { useState, useEffect } from 'react'

const institutes = [
  {
    sigla: 'UFAL',
    nome: 'Universidade Federal de Alagoas',
    desc: 'Ecossistema central de pesquisa, inovação e desenvolvimento tecnológico da KAIRÓS.',
    img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80&auto=format&fit=crop',
  },
  {
    sigla: 'IEFE',
    nome: 'Instituto de Educação Física e Esporte',
    desc: 'Competências em saúde, desempenho esportivo, reabilitação e monitoramento funcional.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80&auto=format&fit=crop',
  },
  {
    sigla: 'IQB',
    nome: 'Instituto de Química e Biotecnologia',
    desc: 'Metabolômica, caracterização molecular e identificação de compostos bioativos.',
    img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80&auto=format&fit=crop',
  },
  {
    sigla: 'ICF',
    nome: 'Instituto de Ciências Farmacêuticas',
    desc: 'Funcionalidade biológica, nutrição de precisão e validação aplicada translacional.',
    img: 'https://images.unsplash.com/photo-1583912267550-d974ead0a197?w=600&q=80&auto=format&fit=crop',
  },
  {
    sigla: 'IC',
    nome: 'Instituto de Computação',
    desc: 'IA, visão computacional, ciência de dados e plataformas digitais escaláveis.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&auto=format&fit=crop',
  },
  {
    sigla: 'LACAE',
    nome: 'Lab. de Ciência Aplicada ao Esporte',
    desc: 'Testagem prática, acompanhamento de atletas e geração de evidências aplicadas.',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&auto=format&fit=crop',
  },
  {
    sigla: 'HUPAA',
    nome: 'Hospital Universitário · EBSERH',
    desc: 'Centro de pesquisa clínica translacional e validação em contextos reais de saúde.',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80&auto=format&fit=crop',
  },
  {
    sigla: 'GETE',
    nome: 'Grupo de Estudos em Treinamento Esportivo',
    desc: 'Pesquisa aplicada ao treinamento, adaptação fisiológica e performance atlética.',
    img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80&auto=format&fit=crop',
  },
]

const CARD_W = 260
const GAP = 16
const VISIBLE = 3

export default function Institutes() {
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)
  const steps = institutes.length - VISIBLE + 1

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCur(prev => prev >= steps - 1 ? 0 : prev + 1)
    }, 3000)
    return () => clearInterval(timer)
  }, [steps, paused])

  const go = (n) => setCur(Math.max(0, Math.min(n, steps - 1)))

  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">
              Base institucional
            </span>
            <h2 className="font-sans font-light text-3xl lg:text-4xl text-white tracking-tight mt-2">
              Sustentado por{' '}
              <span className="font-bold text-[#4B7BF5]">instituições de pesquisa</span>
            </h2>
          </div>
          {/* Nav arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => go(cur - 1)}
              disabled={cur === 0}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'transparent', color: 'white',
                fontSize: 18, cursor: cur === 0 ? 'not-allowed' : 'pointer',
                opacity: cur === 0 ? 0.3 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.2s, opacity 0.2s',
              }}
            >
              ←
            </button>
            <button
              onClick={() => go(cur + 1)}
              disabled={cur >= steps - 1}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'transparent', color: 'white',
                fontSize: 18, cursor: cur >= steps - 1 ? 'not-allowed' : 'pointer',
                opacity: cur >= steps - 1 ? 0.3 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.2s, opacity 0.2s',
              }}
            >
              →
            </button>
          </div>
        </div>

        {/* Track */}
        <div style={{ overflow: 'hidden' }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div
            style={{
              display: 'flex',
              gap: GAP,
              transform: `translateX(-${cur * (CARD_W + GAP)}px)`,
              transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {institutes.map((inst, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  width: CARD_W,
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: '#111111',
                  transition: 'border-color 0.2s, transform 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(75,123,245,0.4)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Image */}
                <img
                  src={inst.img}
                  alt={inst.nome}
                  style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
                />
                {/* Body */}
                <div style={{ padding: 16 }}>
                  <span style={{
                    display: 'inline-block',
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 10, fontWeight: 600,
                    color: '#4B7BF5',
                    background: 'rgba(75,123,245,0.12)',
                    border: '1px solid rgba(75,123,245,0.2)',
                    borderRadius: 99, padding: '3px 10px',
                    letterSpacing: '0.08em', marginBottom: 8,
                  }}>
                    {inst.sigla}
                  </span>
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 13, fontWeight: 600,
                    color: 'white', margin: '0 0 6px',
                    lineHeight: 1.3,
                  }}>
                    {inst.nome}
                  </p>
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 11, color: 'rgba(255,255,255,0.4)',
                    lineHeight: 1.5, margin: 0,
                  }}>
                    {inst.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 6, marginTop: 20, justifyContent: 'center' }}>
          {Array.from({ length: steps }).map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: i === cur ? 20 : 6,
                height: 6,
                borderRadius: 99,
                background: i === cur ? '#4B7BF5' : 'rgba(255,255,255,0.2)',
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
