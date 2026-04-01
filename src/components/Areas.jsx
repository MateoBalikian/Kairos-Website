import { Activity, HeartPulse, Salad } from 'lucide-react'
import CardSwap, { Card } from './CardSwap'

const areas = [
  {
    icon: Activity,
    tag: 'Sport Tech',
    title: 'Desempenho Esportivo',
    desc: 'Rastreamento inteligente, análise tática e monitoramento fisiológico para atletas e times de alto rendimento.',
    items: ['Visão computacional', 'Análise biomecânica', 'Prevenção de lesões', 'Monitoramento de carga'],
    color: '#4B7BF5',
  },
  {
    icon: HeartPulse,
    tag: 'Health Tech',
    title: 'Saúde & Diagnóstico',
    desc: 'Ferramentas preditivas para diagnóstico preventivo, monitoramento fisiológico e reabilitação baseada em dados.',
    items: ['Diagnóstico preventivo', 'Monitoramento funcional', 'Suporte à reabilitação', 'Análise de biomarcadores'],
    color: '#7BA7E8',
  },
  {
    icon: Salad,
    tag: 'Nutrição de Precisão',
    title: 'Nutrição Personalizada',
    desc: 'Avaliação nutri-metabolômica individualizada para otimização de intervenções em saúde e desempenho.',
    items: ['Perfil metabólico completo', 'Conduta nutricional precisa', 'Monitoramento biológico', 'IA preditiva nutricional'],
    color: '#7BA7E8',
  },
]

export default function Areas() {
  return (
    <section id="areas" className="py-24 lg:py-32 px-6 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-16">
          <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Nossas áreas</span>
          <h2 className="font-sans font-light text-3xl lg:text-5xl text-white tracking-tight mt-3 max-w-2xl">
            Ciência aplicada em{' '}
            <span className="font-bold text-[#4B7BF5]">três frentes de impacto</span>
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-xl">
            Cada vertical compartilha a mesma base tecnológica — IA, metabolômica e visão computacional — aplicada a contextos distintos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[560px]">

          {/* Left: card list */}
          <div className="flex flex-col gap-4">
            {areas.map((area, i) => {
              const Icon = area.icon
              return (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${area.color}18` }}>
                    <Icon size={18} style={{ color: area.color }} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: area.color }}>{area.tag}</span>
                    <h3 className="font-sans font-semibold text-white text-base mt-0.5 mb-1">{area.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{area.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right: Card Swap */}
          <div className="relative hidden lg:flex items-center justify-center" style={{ height: 560 }}>
            <CardSwap cardDistance={50} verticalDistance={60} delay={4000} pauseOnHover easing="elastic" width={460} height={380}>
              {areas.map((area, i) => {
                const Icon = area.icon
                return (
                  <Card key={i} style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${area.color}20` }}>
                          <Icon size={16} style={{ color: area.color }} />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: area.color }}>{area.tag}</span>
                      </div>
                      <h3 className="font-sans font-semibold text-white text-xl mb-3">{area.title}</h3>
                      <ul className="space-y-2">
                        {area.items.map((item, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: area.color }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/8">
                      <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">KAIRÓS · UFAL</span>
                    </div>
                  </Card>
                )
              })}
            </CardSwap>
          </div>

        </div>
      </div>
    </section>
  )
}
