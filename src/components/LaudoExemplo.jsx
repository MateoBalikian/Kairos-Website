import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Laudo Veltron de exemplo (perfil de elite), recriado no site com valores de
// referência reais. Serve os 3 esportes — na Home roda com seletor; nas
// páginas de esporte, fixo na modalidade da página.

const LAUDOS = {
  corrida: {
    nome: 'Corrida',
    titulo: 'Análise Biomecânica — Corrida',
    scoreBig: '92', scoreSuffix: '/100', scoreLabel: 'Pontuação geral',
    d1: { val: '185', unit: 'passos/min' }, d2: { label: 'Estilo', val: 'médio-pé' },
    metricasLabel: 'Análise de ângulos',
    metricas: [
      { label: 'Overstride', val: '4°', ideal: '-10° a 10°', status: 'OK' },
      { label: 'Inclinação do tronco', val: '9°', ideal: '6° a 12°', status: 'OK' },
      { label: 'Joelho da frente (impacto)', val: '165°', ideal: '145° a 180°', status: 'OK' },
      { label: 'Posição do braço', val: '67°', ideal: '70° a 90°', status: 'ATENÇÃO' },
    ],
    lactato: [{ x: 'Repouso', v: 1.1 }, { x: 'Leve', v: 1.7 }, { x: 'Mod.', v: 2.5 }, { x: 'Pesado', v: 4.4 }],
    analise: 'Mecânica eficiente e lactato controlado — o LT2 só é cruzado a 4 mM. O ponto de atenção é o braço, que fecha um pouco abaixo do ideal no balanço: ajuste simples que libera mais propulsão. As zonas de treino saem prescritas a partir dos limiares reais.',
    link: '/corrida',
  },
  ciclismo: {
    nome: 'Ciclismo',
    titulo: 'Bike Fit & Lactato — Ciclismo',
    scoreBig: '90', scoreSuffix: '/100', scoreLabel: 'Pontuação bike fit',
    d1: { val: '92', unit: 'rpm' }, d2: { label: 'Bike', val: 'Speed' },
    metricasLabel: 'Ângulos do bike fit',
    metricas: [
      { label: 'Joelho (ponto morto inferior)', val: '143°', ideal: '135° a 145°', status: 'OK' },
      { label: 'Joelho (ponto morto superior)', val: '71°', ideal: '65° a 75°', status: 'OK' },
      { label: 'Ângulo do quadril', val: '47°', ideal: '40° a 50°', status: 'OK' },
      { label: 'Inclinação do tronco', val: '48°', ideal: '40° a 45°', status: 'ATENÇÃO' },
    ],
    lactato: [{ x: 'Repouso', v: 0.9 }, { x: 'Z2', v: 2.1 }, { x: 'Z3', v: 3.4 }, { x: 'Z4', v: 5.6 }],
    analise: 'Posição eficiente e potência sustentada: o LT2 só aparece na Z4. O tronco está um pouco ereto — descer levemente o guidão melhora a aerodinâmica sem perder conforto. As zonas de potência saem prescritas pelos limiares reais.',
    link: '/ciclismo',
  },
  natacao: {
    nome: 'Natação',
    titulo: 'Lactato & Eficiência de Braçada — Natação',
    scoreBig: '3.6', scoreSuffix: '', scoreLabel: 'Stroke Index · nível Elite',
    d1: { val: '1.8', unit: 'm/s' }, d2: { label: 'DPB', val: '2.30 m' },
    metricasLabel: 'Eficiência de braçada',
    metricas: [
      { label: 'Distância por braçada', val: '2.30 m', ideal: '> 2.20 m', status: 'OK' },
      { label: 'Stroke Index', val: '3.60', ideal: '> 3.50', status: 'OK' },
      { label: 'Frequência de braçada', val: '38/min', ideal: '—', status: 'OK' },
      { label: 'Perda de DPB sob fadiga', val: '-11%', ideal: '< 10%', status: 'ATENÇÃO' },
    ],
    lactato: [{ x: 'Repouso', v: 1.0 }, { x: 'Leve', v: 1.5 }, { x: 'Mod.', v: 2.6 }, { x: 'Pesado', v: 5.0 }],
    analise: 'Eficiência de elite na braçada (DPB e Stroke Index acima da faixa). Sob fadiga, a distância por braçada cai 11% — sinal de perda técnica no fim das séries, um alvo claro de treino. As zonas saem prescritas pela curva de lactato real.',
    link: '/natacao',
  },
}

const statusStyle = (s) =>
  s === 'OK'
    ? { background: 'rgba(46,204,113,0.15)', color: '#2ECC71' }
    : { background: 'rgba(234,179,8,0.15)', color: '#EAB308' }

function CurvaLactato({ pontos }) {
  const y = (v) => 200 - (v / 6) * 170
  const n = pontos.length
  const px = (i) => 90 + i * (240 / (n - 1))
  const pts = pontos.map((p, i) => ({ ...p, px: px(i), py: y(p.v) }))
  const linha = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.px},${p.py}`).join(' ')

  return (
    <svg viewBox="0 0 400 230" style={{ width: '100%', height: 'auto', display: 'block' }}>
      {[2, 4, 6].map((mM) => (
        <g key={mM}>
          <line x1="50" y1={y(mM)} x2="380" y2={y(mM)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x="42" y={y(mM) + 3} textAnchor="end" fontFamily="DM Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.3)">{mM}</text>
        </g>
      ))}
      <text transform="translate(16,120) rotate(-90)" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.3)">Lactato (mM)</text>

      <line x1="50" y1={y(2)} x2="380" y2={y(2)} stroke="#2ECC71" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      <text x="376" y={y(2) - 5} textAnchor="end" fontFamily="DM Mono, monospace" fontSize="9" fontWeight="700" fill="#2ECC71">LT1</text>
      <line x1="50" y1={y(4)} x2="380" y2={y(4)} stroke="#EF4444" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      <text x="376" y={y(4) - 5} textAnchor="end" fontFamily="DM Mono, monospace" fontSize="9" fontWeight="700" fill="#EF4444">LT2</text>

      <path d={linha} fill="none" stroke="#4B7BF5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.px} cy={p.py} r="4.5" fill="#4B7BF5" />
          <circle cx={p.px} cy={p.py} r="8" fill="none" stroke="#4B7BF5" strokeWidth="1" opacity="0.3" />
        </g>
      ))}

      <line x1="50" y1="200" x2="380" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {pts.map((p, i) => (
        <text key={i} x={p.px} y="216" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.35)">{p.x}</text>
      ))}
    </svg>
  )
}

function LaudoCard({ d }) {
  return (
    <div className="rounded-3xl overflow-hidden" style={{ background: '#0d0d0d', border: '1px solid rgba(75,123,245,0.22)', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}>
      {/* Barra do documento */}
      <div className="flex items-center justify-between px-5 lg:px-7 py-4 gap-3" style={{ background: '#111111', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: '#4B7BF5' }} />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-white/60 truncate">Veltron · {d.titulo}</span>
        </div>
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest px-3 py-1 rounded-full flex-shrink-0" style={{ background: 'rgba(75,123,245,0.15)', color: '#7BA7E8', border: '1px solid rgba(75,123,245,0.25)' }}>Perfil de Elite</span>
      </div>

      <div className="p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Esquerda: score + métricas */}
        <div>
          <div className="flex items-end gap-5 mb-8">
            <div className="flex items-baseline">
              <span className="font-mono font-bold leading-none" style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', color: '#4B7BF5' }}>{d.scoreBig}</span>
              {d.scoreSuffix && <span className="font-mono text-2xl text-white/30">{d.scoreSuffix}</span>}
            </div>
            <div className="flex flex-col gap-1.5 pb-2">
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-xl font-bold text-white leading-none">{d.d1.val}</span>
                <span className="text-white/40 text-xs">{d.d1.unit}</span>
              </div>
              <div className="text-xs"><span className="text-white/40">{d.d2.label}:</span> <span className="text-white">{d.d2.val}</span></div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mt-0.5">{d.scoreLabel}</p>
            </div>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-3">{d.metricasLabel}</p>
          <div className="flex flex-col gap-2.5">
            {d.metricas.map((a) => (
              <div key={a.label} className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="min-w-0">
                  <p className="text-white/70 text-sm truncate">{a.label}</p>
                  <p className="font-mono text-[9px] text-white/25">Ideal: {a.ideal}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-mono text-white text-sm">{a.val}</span>
                  <span className="font-mono text-[9px] uppercase px-2 py-1 rounded-full" style={statusStyle(a.status)}>{a.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direita: curva + análise */}
        <div className="flex flex-col">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-3">Curva de lactato</p>
          <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <CurvaLactato pontos={d.lactato} />
          </div>
          <div className="mt-4 rounded-2xl p-5 flex-1" style={{ background: 'rgba(75,123,245,0.05)', border: '1px solid rgba(75,123,245,0.15)' }}>
            <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: '#7BA7E8' }}>Análise integrada</p>
            <p className="text-white/65 text-sm leading-relaxed">{d.analise}</p>
          </div>
        </div>
      </div>

      <div className="px-5 lg:px-7 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="font-mono text-[9px] text-white/25">Exemplo ilustrativo · valores de referência de atletas de elite</p>
      </div>
    </div>
  )
}

export default function LaudoExemplo({ esporte = 'corrida', seletor = false, link = false }) {
  const [sel, setSel] = useState(esporte)
  const d = LAUDOS[sel] || LAUDOS.corrida

  return (
    <section id="laudo" className="py-16 lg:py-24 xl:py-32 px-5 md:px-6" style={{ background: '#0A0A0A' }}>
      <div className="max-w-[1100px] mx-auto">

        <div className="text-center mb-10 lg:mb-12">
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#4B7BF5' }}>O que você recebe</span>
          <h2 className="font-sans font-bold text-white mt-3 leading-tight" style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.8rem)' }}>
            Não é um número solto.<br />
            <span style={{ color: '#4B7BF5' }}>É o raio-x completo do seu desempenho.</span>
          </h2>
          <p className="text-white/50 mt-4 mx-auto leading-relaxed" style={{ maxWidth: 560, fontSize: '1rem' }}>
            Você sai com um laudo que cruza a sua biomecânica com a sua fisiologia. Veja um exemplo — aqui, o perfil de um atleta de elite.
          </p>
        </div>

        {/* Seletor de modalidade (só na Home) */}
        {seletor && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.keys(LAUDOS).map((key) => {
              const active = key === sel
              return (
                <button key={key} type="button" onClick={() => setSel(key)}
                  className="font-sans text-sm rounded-full px-5 py-2 transition-all"
                  style={{ background: active ? '#4B7BF5' : 'rgba(255,255,255,0.05)', color: active ? 'white' : 'rgba(255,255,255,0.6)', border: active ? '1px solid #4B7BF5' : '1px solid rgba(255,255,255,0.12)', cursor: 'pointer' }}>
                  {LAUDOS[key].nome}
                </button>
              )
            })}
          </div>
        )}

        <LaudoCard d={d} />

        {/* Link pra página do esporte (só na Home) */}
        {link && (
          <div className="text-center mt-8">
            <Link to={d.link} className="inline-flex items-center gap-2 font-sans font-semibold text-sm hover:gap-3 transition-all" style={{ color: '#4B7BF5' }}>
              Ver tudo sobre {d.nome}
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
