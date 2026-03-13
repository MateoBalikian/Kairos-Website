import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  {
    value: '99.5%',
    label: 'Precisão do modelo preditivo de risco',
  },
  {
    value: '3 passos',
    label: 'Do vídeo ao laudo biomecânico completo',
  },
  {
    value: 'VO₂ máximo',
    label: 'Avaliação disponível no LACAE',
  },
  {
    value: 'LACAE',
    label: 'Respaldo científico universitário',
  },
]

export default function StatsBar() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelectorAll('.stat-item'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="bg-[#F8F8F6] border-y border-[#E5E5E2] py-10 px-6"
      id="sobre"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-[#E5E5E2]">
        {stats.map((stat) => (
          <div
            key={stat.value}
            className="stat-item flex flex-col items-center text-center lg:px-8"
          >
            <span className="font-mono text-2xl lg:text-3xl font-medium text-[#0A2463] mb-1 tracking-tight">
              {stat.value}
            </span>
            <span className="text-xs text-[#4A4A47] leading-relaxed max-w-[140px]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
