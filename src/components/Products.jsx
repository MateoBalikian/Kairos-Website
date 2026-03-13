import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eye, FlaskConical, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    id: 'trocker',
    name: 'Trocker',
    badge: 'Em desenvolvimento',
    badgeStyle: 'bg-[#0A2463]/10 text-[#0A2463] border border-[#0A2463]/20',
    borderStyle: 'border-[#0A2463]',
    icon: Eye,
    description:
      'Plataforma de análise de movimento por visão computacional. Pose estimation, ângulos biomecânicos e classificação de risco em vídeos comuns — sem câmeras especiais, sem sensores.',
    features: [
      'Análise de pose em tempo real',
      'Cálculo de ângulos articulares',
      'Classificação de risco XGBoost',
      'Laudos biomecânicos automatizados',
    ],
    image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'nmr',
    name: 'Metabolômica por RMN',
    badge: 'LACAE',
    badgeStyle: 'bg-[#F8F8F6] text-[#4A4A47] border border-[#E5E5E2]',
    borderStyle: 'border-[#E5E5E2]',
    icon: FlaskConical,
    description:
      'Perfil metabólico completo via Ressonância Magnética Nuclear. Correlação entre marcadores metabólicos e desempenho esportivo — metodologia de pesquisa científica aplicada ao atleta.',
    features: [
      'Perfil de 200+ metabólitos',
      'Correlação com desempenho',
      'Diagnóstico nutricional preciso',
      'Monitoramento longitudinal',
    ],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80&auto=format&fit=crop',
  },
]

export default function Products() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.product-card'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="produtos" className="py-24 lg:py-32 px-6 bg-[#F8F8F6]">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-16">
          <span className="font-mono text-xs text-[#4A4A47] uppercase tracking-widest">Nossa tecnologia</span>
          <h2 className="font-sans font-light text-3xl lg:text-4xl xl:text-5xl text-[#0A0A0A] tracking-tight mt-3">
            Instrumentos científicos{' '}
            <span className="font-bold text-[#0A2463]">para alto rendimento</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {products.map((product) => {
            const Icon = product.icon
            return (
              <div
                key={product.id}
                className={`product-card bg-white border-2 ${product.borderStyle} rounded-4xl overflow-hidden group`}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#0A2463]/5 rounded-2xl flex items-center justify-center">
                        <Icon size={20} className="text-[#0A2463]" />
                      </div>
                      <h3 className="font-sans font-medium text-xl text-[#0A0A0A]">{product.name}</h3>
                    </div>
                    <span className={`font-mono text-[10px] px-2 py-1 rounded-full ${product.badgeStyle}`}>
                      {product.badge}
                    </span>
                  </div>

                  <p className="text-sm text-[#4A4A47] leading-relaxed mb-6">{product.description}</p>

                  <ul className="space-y-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-[#4A4A47]">
                        <span className="w-1 h-1 rounded-full bg-[#0A2463]" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button className="btn-magnetic mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#0A2463] hover:-translate-y-px transition-transform duration-200">
                    Saiba mais <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Coming soon */}
        <div className="bg-white border border-[#E5E5E2] rounded-3xl px-8 py-5 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#0A2463]/40 animate-pulse" />
          <p className="text-sm text-[#4A4A47]">
            <span className="font-medium text-[#0A0A0A]">Outros módulos em desenvolvimento:</span>{' '}
            análise de natação, corrida, monitoramento em tempo real, integração fisiológica.
          </p>
        </div>
      </div>
    </section>
  )
}
