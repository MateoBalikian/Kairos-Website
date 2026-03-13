import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Card 1: Diagnostics List ─── */
const diagnostics = [
  { tag: 'VO₂ máximo', desc: 'Consumo máximo de oxigênio', badge: 'Ergoespirometria', icon: '◎' },
  { tag: 'Metabolômica por RMN', desc: 'Perfil metabólico completo via ressonância nuclear', badge: 'RMN', icon: '⬡' },
  { tag: 'Biomecânica computacional', desc: 'Visão computacional sem sensores ou câmeras especiais', badge: 'Pose estimation', icon: '◈' },
  { tag: 'Predição de lesão', desc: 'Modelo XGBoost com 99.5% de precisão', badge: '99.5%', icon: '◉' },
]

function DiagnosticList() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % diagnostics.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="bg-white border border-[#E5E5E2] rounded-4xl p-6 h-full flex flex-col">
      <div className="mb-5">
        <span className="font-mono text-[10px] text-[#4A4A47] uppercase tracking-widest">Avaliações exclusivas</span>
        <p className="font-sans font-semibold text-base text-[#0A0A0A] mt-1 leading-snug">
          4 protocolos que nenhuma outra empresa no Brasil oferece
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {diagnostics.map((d, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex items-start gap-3 p-4 rounded-2xl transition-all duration-400 text-left w-full ${
              active === i
                ? 'bg-[#0A2463] shadow-[0_4px_20px_rgba(10,36,99,0.22)]'
                : 'bg-[#F8F8F6] hover:bg-[#EFEFED]'
            }`}
          >
            <span className={`text-lg mt-0.5 leading-none ${active === i ? 'text-white/70' : 'text-[#0A2463]'}`}>
              {d.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className={`font-sans font-semibold text-sm leading-tight ${active === i ? 'text-white' : 'text-[#0A0A0A]'}`}>
                {d.tag}
              </p>
              <p className={`font-sans text-xs mt-1 leading-snug ${active === i ? 'text-white/65' : 'text-[#4A4A47]'}`}>
                {d.desc}
              </p>
            </div>
            {active === i && (
              <span className="font-mono text-[9px] text-white/50 uppercase tracking-wider mt-0.5 whitespace-nowrap hidden sm:block">
                {d.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[#E5E5E2]">
        <p className="text-xs text-[#4A4A47]">Avaliações que você não encontra em qualquer lugar</p>
      </div>
    </div>
  )
}

/* ─── Card 2: Telemetry Terminal ─── */
const telemetryLines = [
  { text: '> Analisando padrão de pedalada...', type: 'muted' },
  { text: '> Ângulo do joelho: 142° — dentro do ideal', type: 'normal' },
  { text: '> Risco biomecânico: BAIXO', type: 'highlight' },
  { text: '> Correlacionando com perfil metabólico...', type: 'muted' },
  { text: '> Relatório gerado em 2.3s', type: 'success' },
]

function TelemetryCard() {
  const [lines, setLines] = useState([])
  const [typing, setTyping] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const line = telemetryLines[lineIdx]
    if (!line) {
      const t = setTimeout(() => { setLines([]); setLineIdx(0); setCharIdx(0) }, 2500)
      return () => clearTimeout(t)
    }
    if (charIdx <= line.text.length) {
      const t = setTimeout(() => { setTyping(line.text.slice(0, charIdx)); setCharIdx((c) => c + 1) }, 22)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, line])
        setTyping('')
        setCharIdx(0)
        setLineIdx((i) => i + 1)
      }, 220)
      return () => clearTimeout(t)
    }
  }, [charIdx, lineIdx])

  return (
    <div className="bg-[#0A2463] rounded-4xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#7BA7E8] animate-pulse" />
          <span className="font-mono text-[10px] text-[#7BA7E8] uppercase tracking-widest">Processando ao vivo</span>
        </div>
        <div className="flex gap-1.5">
          {[0,1,2].map(i => <span key={i} className="w-2 h-2 rounded-full bg-white/15" />)}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 font-mono text-sm overflow-hidden">
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === 'highlight'
                ? 'text-[#7BA7E8] font-semibold'
                : line.type === 'success'
                ? 'text-white font-medium'
                : line.type === 'muted'
                ? 'text-white/40'
                : 'text-white/80'
            }
          >
            {line.text}
          </div>
        ))}
        {typing && (
          <div className="text-white/90 flex items-end">
            {typing}
            <span className="cursor-blink ml-0.5 text-[#7BA7E8]">|</span>
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-white/10">
        <p className="font-sans font-semibold text-sm text-white">
          IA que transforma movimento em diagnóstico
        </p>
        <p className="font-sans text-xs text-white/50 mt-1">
          Modelos treinados com dados biomecânicos reais
        </p>
      </div>
    </div>
  )
}

/* ─── Card 3: Weekly Schedule ─── */
const scheduleSlots = [
  { day: 0, time: 0, label: 'Avaliação VO₂' },
  { day: 1, time: 1, label: 'Biomecânica' },
  { day: 2, time: 2, label: 'Coleta RMN' },
  { day: 3, time: 0, label: 'Avaliação VO₂' },
  { day: 4, time: 3, label: 'Revisão Laudo' },
  { day: 1, time: 2, label: 'Coleta RMN' },
]

const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
const times = ['09:00', '10:30', '14:00', '16:00']

function ScheduleCard() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % scheduleSlots.length), 1600)
    return () => clearInterval(t)
  }, [])

  const activeSlot = scheduleSlots[activeIdx]

  return (
    <div className="bg-white border border-[#E5E5E2] rounded-4xl p-6 h-full flex flex-col">
      <div className="mb-5">
        <span className="font-mono text-[10px] text-[#4A4A47] uppercase tracking-widest">LACAE — Semana atual</span>
        <p className="font-sans font-semibold text-base text-[#0A0A0A] mt-1 leading-snug">
          Agenda de avaliações científicas
        </p>
      </div>

      <div className="flex-1">
        {/* Header */}
        <div className="grid grid-cols-[40px_repeat(5,1fr)] gap-1.5 mb-2">
          <div />
          {days.map((d) => (
            <div key={d} className="font-mono text-[9px] text-[#4A4A47] text-center uppercase tracking-wide">
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        {times.map((time, tIdx) => (
          <div key={time} className="grid grid-cols-[40px_repeat(5,1fr)] gap-1.5 mb-1.5">
            <div className="font-mono text-[9px] text-[#4A4A47] flex items-center">{time}</div>
            {days.map((_, dIdx) => {
              const slot = scheduleSlots.find((s) => s.day === dIdx && s.time === tIdx)
              const isActive = slot && activeSlot.day === dIdx && activeSlot.time === tIdx
              return (
                <div
                  key={dIdx}
                  className={`h-10 rounded-xl flex items-center justify-center px-1 transition-all duration-500 ${
                    slot
                      ? isActive
                        ? 'bg-[#0A2463] scale-[1.06] shadow-[0_4px_12px_rgba(10,36,99,0.28)]'
                        : 'bg-[#F8F8F6] border border-[#E5E5E2]'
                      : 'bg-transparent'
                  }`}
                >
                  {slot && (
                    <span
                      className={`text-[8px] font-mono text-center leading-tight px-0.5 ${
                        isActive ? 'text-white font-semibold' : 'text-[#4A4A47]'
                      }`}
                    >
                      {slot.label}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="mt-3 pt-4 border-t border-[#E5E5E2]">
        <p className="text-xs text-[#4A4A47]">
          Pesquisadores universitários com publicações científicas
        </p>
      </div>
    </div>
  )
}

/* ─── Main section ─── */
export default function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.feature-card'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )
      gsap.fromTo(
        sectionRef.current.querySelector('.features-headline'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="avaliacoes" className="py-24 lg:py-32 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="features-headline mb-16">
          <span className="font-mono text-xs text-[#4A4A47] uppercase tracking-widest">
            O que nos torna únicos
          </span>
          <h2 className="font-sans font-semibold text-3xl lg:text-4xl text-[#0A0A0A] tracking-tight mt-3 max-w-2xl">
            Por que a KAIROS é diferente de{' '}
            <span className="text-[#0A2463]">tudo que você já viu</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 h-auto lg:h-[540px]">
          <div className="feature-card h-[500px] lg:h-full">
            <DiagnosticList />
          </div>
          <div className="feature-card h-[500px] lg:h-full">
            <TelemetryCard />
          </div>
          <div className="feature-card h-[500px] lg:h-full">
            <ScheduleCard />
          </div>
        </div>
      </div>
    </section>
  )
}
