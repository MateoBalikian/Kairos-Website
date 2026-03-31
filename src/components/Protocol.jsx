import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/* ─── SVG Animations ─── */
function PoseEstimation() {
  const joints = [
    { x: 100, y: 30 },  // head
    { x: 100, y: 70 },  // neck
    { x: 70, y: 90 },   // left shoulder
    { x: 130, y: 90 },  // right shoulder
    { x: 55, y: 130 },  // left elbow
    { x: 145, y: 130 }, // right elbow
    { x: 45, y: 165 },  // left wrist
    { x: 155, y: 165 }, // right wrist
    { x: 100, y: 140 }, // hip center
    { x: 80, y: 140 },  // left hip
    { x: 120, y: 140 }, // right hip
    { x: 70, y: 190 },  // left knee
    { x: 130, y: 190 }, // right knee
    { x: 65, y: 240 },  // left ankle
    { x: 135, y: 240 }, // right ankle
  ]

  const connections = [
    [0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7],
    [1, 8], [8, 9], [8, 10], [9, 11], [10, 12], [11, 13], [12, 14],
  ]

  return (
    <svg viewBox="0 0 200 270" className="w-full h-full max-h-64 opacity-80">
      <defs>
        <radialGradient id="jointGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7BA7E8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7BA7E8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Connections */}
      {connections.map(([a, b], i) => (
        <line
          key={i}
          x1={joints[a].x}
          y1={joints[a].y}
          x2={joints[b].x}
          y2={joints[b].y}
          stroke="#7BA7E8"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
      ))}

      {/* Joint points */}
      {joints.map((j, i) => (
        <g key={i}>
          <circle
            cx={j.x}
            cy={j.y}
            r="7"
            fill="#7BA7E8"
            fillOpacity="0.05"
          />
          <circle
            cx={j.x}
            cy={j.y}
            r="4"
            fill="#7BA7E8"
            className="joint-circle"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        </g>
      ))}

      {/* Angle annotations */}
      <text x="148" y="135" fontSize="7" fill="#7BA7E8" opacity="0.5" fontFamily="DM Mono">142°</text>
      <text x="20" y="135" fontSize="7" fill="#7BA7E8" opacity="0.5" fontFamily="DM Mono">138°</text>
    </svg>
  )
}

function LaserScan() {
  return (
    <div className="w-full h-48 relative overflow-hidden">
      {/* Data grid */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-1 p-4">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className="rounded-sm bg-[#7BA7E8] transition-opacity duration-500"
            style={{
              opacity: 0.05 + (Math.sin(i * 0.8) + 1) * 0.15,
              height: '100%',
            }}
          />
        ))}
      </div>

      {/* Laser line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#7BA7E8] to-transparent opacity-70"
        style={{
          animation: 'scan-line 2.5s ease-in-out infinite',
          left: '0',
        }}
      />

      {/* Data labels */}
      <div className="absolute top-2 left-2 font-mono text-[9px] text-[#7BA7E8] opacity-40">
        {['cadência', 'força', 'torque', 'potência'].map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
    </div>
  )
}

function EKGWave() {
  const pathRef = useRef(null)

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength()
      pathRef.current.style.strokeDasharray = len
      pathRef.current.style.strokeDashoffset = len

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 0.5,
      })
    }
  }, [])

  return (
    <svg viewBox="0 0 400 80" className="w-full opacity-80">
      <path
        ref={pathRef}
        d="M0,40 L40,40 L55,40 L60,10 L65,70 L70,15 L75,40 L100,40 L115,40 L120,10 L125,70 L130,15 L135,40 L200,40 L215,40 L220,10 L225,70 L230,15 L235,40 L300,40 L315,40 L320,10 L325,70 L330,15 L335,40 L400,40"
        fill="none"
        stroke="#7BA7E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const steps = [
  {
    number: '01',
    title: 'Avaliação Inicial',
    description:
      'VO₂ máximo, metabolômica por RMN, biomecânica por visão computacional e análise fisiológica completa — tudo em um único protocolo integrado, conduzido por pesquisadores do LACAE.',
    animation: <PoseEstimation />,
    tag: 'Protocolo LACAE',
  },
  {
    number: '02',
    title: 'Processamento por IA',
    description:
      'Nossos modelos de IA foram treinados com dados biomecânicos reais e alcançam 99.5% de precisão na classificação de risco. A IA não substitui o pesquisador — ela amplifica o diagnóstico.',
    animation: <LaserScan />,
    tag: 'Modelo XGBoost',
  },
  {
    number: '03',
    title: 'Laudo e Predição',
    description:
      'Do vídeo ao laudo biomecânico em 3 passos. Do perfil metabólico à predição de performance. Decisões baseadas em dados que antes só existiam em centros olímpicos de elite.',
    animation: <EKGWave />,
    tag: 'Predição validada',
  },
]

export default function Protocol() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.protocol-card')

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6 bg-[#0A0A0A] rounded-t-[2rem]" style={{ borderRadius: '2.5rem 2.5rem 0 0', marginTop: '-2.5rem', position: 'relative', zIndex: 1 }}>
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-16">
          <span className="font-mono text-xs text-white/50 uppercase tracking-widest">Como funciona</span>
          <h2 className="font-sans font-light text-3xl lg:text-4xl xl:text-5xl text-white tracking-tight mt-3 max-w-xl">
            Do movimento ao{' '}
            <span className="font-bold text-[#7BA7E8]">diagnóstico científico</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="protocol-card bg-white/5 border border-white/10 rounded-4xl p-8 flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-4xl font-light text-white/20">{step.number}</span>
                <span className="font-mono text-[10px] text-white/70 border border-white/20 rounded-full px-2 py-1">
                  {step.tag}
                </span>
              </div>

              <div className="flex-1 flex items-center justify-center mb-6 min-h-[160px]">
                {step.animation}
              </div>

              <h3 className="font-sans font-medium text-xl text-white mb-3">{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
