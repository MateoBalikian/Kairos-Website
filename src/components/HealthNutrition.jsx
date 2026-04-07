import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HeartPulse, Salad } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function useCounter(target, duration = 2000, start = false) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])

  return value
}

const cards = [
  {
    id: 'health',
    icon: HeartPulse,
    tag: 'Health Tech',
    title: 'Diagnóstico Clínico de Precisão',
    description:
      'Avaliações fisiológicas aplicadas à saúde preventiva e reabilitação. Monitoramento funcional baseado em dados para profissionais de saúde, pacientes e programas de reabilitação.',
    features: [
      'Diagnóstico fisiológico preventivo',
      'Monitoramento funcional longitudinal',
      'Suporte à reabilitação baseada em dados',
      'Integração com HUPAA · EBSERH',
    ],
    metrics: [
      { label: 'Pacientes avaliados', value: 50, suffix: '+', prefix: '' },
      { label: 'Biomarcadores monitorados', value: 28, suffix: '', prefix: '' },
    ],
    color: '#7BA7E8',
  },
  {
    id: 'nutricao',
    icon: Salad,
    tag: 'Nutrição de Precisão',
    title: 'Perfil Nutri-Metabólico Individual',
    description:
      'Avaliação nutricional baseada em metabolômica por RMN — 200+ metabólitos que revelam o perfil biológico único de cada indivíduo para prescrição nutricional personalizada e precisa.',
    features: [
      'Metabolômica por Ressonância Magnética Nuclear',
      'Identificação de deficiências nutricionais',
      'Prescrição nutricional baseada em biomarcadores',
      'Monitoramento de resposta à intervenção',
    ],
    metrics: [
      { label: 'Metabólitos analisados', value: 200, suffix: '+', prefix: '' },
      { label: 'Precisão diagnóstica', value: 99, suffix: '.5%', prefix: '' },
    ],
    color: '#4B7BF5',
  },
]

function MetricCounter({ value, suffix, prefix, label, start }) {
  const count = useCounter(value, 1800, start)
  return (
    <div
      className="rounded-2xl p-4 text-center"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <p className="font-mono font-bold text-2xl text-white leading-none">
        {prefix}{count}{suffix}
      </p>
      <p className="font-mono text-[10px] text-white/40 uppercase tracking-wide mt-1.5">
        {label}
      </p>
    </div>
  )
}

export default function HealthNutrition() {
  const sectionRef = useRef(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hn-header > *', {
        opacity: 0, y: 24,
        duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })
      gsap.from('.hn-card', {
        opacity: 0, y: 40,
        duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hn-card',
          start: 'top 80%',
          once: true,
          onEnter: () => setTriggered(true),
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto">

        <div className="hn-header mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#0A2463]" />
              <span className="font-mono text-[10px] text-[#6B6B67] uppercase tracking-widest">
                Além do esporte
              </span>
            </div>
            <h2 className="font-sans text-3xl lg:text-5xl text-white tracking-tight leading-tight">
              Ciência aplicada à{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>saúde e nutrição</span>
            </h2>
          </div>
          <p className="text-[#6B6B67] text-sm leading-relaxed max-w-sm lg:text-right">
            A mesma base tecnológica da KAIRÓS — metabolômica por RMN e avaliação fisiológica — aplicada ao diagnóstico preventivo e à nutrição personalizada.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.id}
                className="hn-card rounded-3xl p-8 lg:p-10 flex flex-col justify-between"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.07)',
                  minHeight: 480,
                }}
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ background: `${card.color}18` }}
                    >
                      <Icon size={18} style={{ color: card.color }} />
                    </div>
                    <span
                      className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
                      style={{
                        background: `${card.color}12`,
                        border: `1px solid ${card.color}30`,
                        color: card.color,
                      }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-bold text-2xl lg:text-3xl text-white leading-tight mb-4">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/55 leading-relaxed mb-6">
                    {card.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8">
                    {card.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                          style={{ background: card.color }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics + CTA */}
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {card.metrics.map((m) => (
                      <MetricCounter
                        key={m.label}
                        value={m.value}
                        suffix={m.suffix}
                        prefix={m.prefix}
                        label={m.label}
                        start={triggered}
                      />
                    ))}
                  </div>

                  <a
                    href="#waitlist"
                    onClick={(e) => {
                      e.preventDefault()
                      const t = document.querySelector('#waitlist')
                      if (window.lenis) window.lenis.scrollTo(t, { duration: 1.4, easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)) })
                      else t?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full text-sm font-semibold transition-opacity duration-200 hover:opacity-85"
                    style={{ background: card.color, color: 'white' }}
                  >
                    Agende sua avaliação
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
