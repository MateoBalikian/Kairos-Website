import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { mediaUrl, supabase } from '../lib/supabase'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function LimiarLactato() {
  const heroRef = useRef(null)
  const [form, setForm] = useState({ nome: '', whatsapp: '', email: '', esporte: '', experiencia: '', jaFezTeste: '', periodo: '', mensagem: '' })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.lt-hi', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 })
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await supabase.from('leads').insert([{ ...form, pagina: 'limiar-de-lactato', created_at: new Date().toISOString() }])
      setStatus('success')
      const msg = `Olá! Vim pelo site da Veltron 🩸

*Avaliação de Limiar de Lactato*

Nome: ${form.nome}
WhatsApp: ${form.whatsapp}
E-mail: ${form.email}
Esporte: ${form.esporte || 'Não informado'}
Experiência: ${form.experiencia || 'Não informado'}
Já fez teste de lactato: ${form.jaFezTeste || 'Não informado'}
Melhor período: ${form.periodo || 'Não informado'}
${form.mensagem ? `Mensagem: ${form.mensagem}` : ''}`
      window.open(`https://wa.me/558299652230?text=${encodeURIComponent(msg)}`, '_blank')
    } catch { setStatus('error') }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 w-full">
          <div className="flex flex-col justify-center min-h-screen py-32" style={{ maxWidth: 720 }}>
            <div className="lt-hi mb-4">
              <span className="font-sans text-xs text-white/40 uppercase tracking-widest border border-white/10 rounded-full px-4 py-1.5">
                Fisiologia do Exercício
              </span>
            </div>
            <h1 className="lt-hi font-sans font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}>
              Pare de adivinhar<br />
              <span style={{ color: '#4B7BF5' }}>suas zonas de treino.</span>
            </h1>
            <p className="lt-hi text-white/60 leading-relaxed mb-4" style={{ fontSize: '1.05rem', maxWidth: 560 }}>
              Relógios estimam. Fórmulas generalizam. O seu corpo é único — e as suas zonas de treino deveriam ser únicas também.
            </p>
            <p className="lt-hi text-white/60 leading-relaxed mb-8" style={{ fontSize: '1.05rem', maxWidth: 560 }}>
              O teste de Limiar de Lactato mede diretamente no seu sangue o ponto exato onde seu corpo muda de marcha. Sem estimativa, sem fórmula — dado real.
            </p>
            <a href="#agendar" className="lt-hi inline-flex items-center gap-3 hover:opacity-90 transition-opacity"
              onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#agendar') }}
              style={{ background: 'white', borderRadius: 99, padding: '14px 28px', color: '#0A0A0A', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textDecoration: 'none', width: 'fit-content' }}>
              AGENDE SUA AVALIAÇÃO
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ background: '#0A0A0A' }}>
                <ArrowRight size={13} color="white" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── O QUE É (explicação didática) ─── */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#ffffff' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          <div>
            <span className="font-sans text-xs text-[#0A2463] uppercase tracking-widest">Entenda o teste</span>
            <h2 className="font-sans mt-3 leading-tight mb-8" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#0A0A0A' }}>
              O que é o<br />
              <span style={{ color: '#0A2463' }}>Limiar de Lactato?</span>
            </h2>
            <p className="text-[#4A4A47] leading-relaxed mb-6" style={{ fontSize: '1.05rem' }}>
              Quando você treina, seu corpo produz lactato como subproduto do esforço. Em intensidades leves, seu corpo consegue eliminar esse lactato sem problema. Mas existe um ponto — um limite — onde o lactato começa a se acumular mais rápido do que seu corpo consegue processar. Esse ponto é o seu Limiar de Lactato.
            </p>
            <p className="text-[#4A4A47] leading-relaxed mb-6" style={{ fontSize: '1.05rem' }}>
              Na prática, é aquele momento em que o exercício começa a "pesar" — as pernas ficam pesadas, a respiração dispara, e você sabe que não vai aguentar muito tempo naquele ritmo. Saber exatamente onde esse ponto acontece muda completamente a forma como você treina.
            </p>
            <p className="text-[#4A4A47] leading-relaxed mb-6" style={{ fontSize: '1.05rem' }}>
              O teste identifica dois limiares importantes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl p-6" style={{ background: '#F8F8F6', border: '1px solid #E5E5E2' }}>
                <p className="font-sans font-bold text-lg mb-2" style={{ color: '#0A2463' }}>LT1 — Limiar Aeróbio</p>
                <p className="text-sm text-[#4A4A47] leading-relaxed">
                  A intensidade máxima que você sustenta por horas. É a base do seu treino de resistência — seu ritmo de longão, de prova longa.
                </p>
              </div>
              <div className="rounded-2xl p-6" style={{ background: '#F8F8F6', border: '1px solid #E5E5E2' }}>
                <p className="font-sans font-bold text-lg mb-2" style={{ color: '#0A2463' }}>LT2 — Limiar Anaeróbio</p>
                <p className="text-sm text-[#4A4A47] leading-relaxed">
                  A intensidade acima da qual você "explode" em poucos minutos. Seu teto. É aqui que se define o pace de prova curta e os intervalados.
                </p>
              </div>
            </div>
            <p className="text-[#4A4A47] leading-relaxed" style={{ fontSize: '1.05rem' }}>
              Esses dois pontos definem todas as suas zonas de treino reais. Não é uma tabela genérica da internet — são os seus números, medidos do seu sangue.
            </p>
          </div>
          <div style={{ border: '1px solid #E5E5E2', borderRadius: '24px', overflow: 'hidden', padding: '16px' }}>
            <img src={mediaUrl('lactato.jpg')} alt="Avaliação de Limiar de Lactato Veltron"
              style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block', borderRadius: '16px' }} />
          </div>
        </div>
        </div>
      </section>

      {/* ─── GRÁFICO DA CURVA DE LACTATO ─── */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Visualize</span>
            <h2 className="font-sans mt-3 leading-tight" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: 'white' }}>
              A curva que define{' '}
              <span style={{ color: '#4B7BF5' }}>seu treino.</span>
            </h2>
            <p className="text-white/50 mt-4 leading-relaxed mx-auto" style={{ maxWidth: 560 }}>
              Este é o tipo de gráfico que você recebe no seu laudo. Cada ponto é uma coleta real de sangue — e os dois limiares aparecem com clareza.
            </p>
          </div>

          <div className="rounded-3xl p-8 lg:p-12" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
            <svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
              {[80, 140, 200, 260, 320].map((y, i) => (
                <line key={i} x1="80" y1={y} x2="650" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}
              <text x="70" y="325" textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily="DM Sans, sans-serif">1</text>
              <text x="70" y="265" textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily="DM Sans, sans-serif">2</text>
              <text x="70" y="205" textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily="DM Sans, sans-serif">4</text>
              <text x="70" y="145" textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily="DM Sans, sans-serif">6</text>
              <text x="70" y="85" textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily="DM Sans, sans-serif">10</text>
              <text x="30" y="200" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="DM Sans, sans-serif" transform="rotate(-90, 30, 200)">Lactato (mmol/L)</text>
              {[
                { x: 120, label: '8' },
                { x: 200, label: '10' },
                { x: 280, label: '12' },
                { x: 360, label: '14' },
                { x: 440, label: '16' },
                { x: 520, label: '18' },
                { x: 600, label: '20' },
              ].map((item, i) => (
                <text key={i} x={item.x} y="365" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily="DM Sans, sans-serif">{item.label}</text>
              ))}
              <text x="365" y="390" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="DM Sans, sans-serif">Velocidade (km/h)</text>
              <path
                d="M 120 320 C 160 318, 200 310, 240 305 C 280 298, 320 285, 360 270 C 400 248, 440 210, 480 165 C 520 120, 560 90, 600 65"
                fill="none"
                stroke="#4B7BF5"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {[
                { x: 120, y: 320 },
                { x: 200, y: 310 },
                { x: 280, y: 298 },
                { x: 360, y: 270 },
                { x: 440, y: 210 },
                { x: 520, y: 120 },
                { x: 600, y: 65 },
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#4B7BF5" />
                  <circle cx={pt.x} cy={pt.y} r="8" fill="none" stroke="#4B7BF5" strokeWidth="1.5" opacity="0.3" />
                </g>
              ))}
              <line x1="280" y1="298" x2="280" y2="350" stroke="#22C55E" strokeWidth="2" strokeDasharray="6 4" />
              <rect x="240" y="335" width="80" height="24" rx="12" fill="#22C55E" fillOpacity="0.15" stroke="#22C55E" strokeWidth="1" />
              <text x="280" y="351" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="700" fontFamily="DM Sans, sans-serif">LT1</text>
              <line x1="440" y1="210" x2="440" y2="350" stroke="#EF4444" strokeWidth="2" strokeDasharray="6 4" />
              <rect x="400" y="335" width="80" height="24" rx="12" fill="#EF4444" fillOpacity="0.15" stroke="#EF4444" strokeWidth="1" />
              <text x="440" y="351" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="700" fontFamily="DM Sans, sans-serif">LT2</text>
              <text x="200" y="55" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="DM Sans, sans-serif">ZONA AERÓBIA</text>
              <text x="360" y="55" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="10" fontFamily="DM Sans, sans-serif">TRANSIÇÃO</text>
              <text x="540" y="55" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="DM Sans, sans-serif">ZONA ANAERÓBIA</text>
              <rect x="80" y="60" width="200" height="280" fill="#22C55E" fillOpacity="0.02" />
              <rect x="280" y="60" width="160" height="280" fill="#EAB308" fillOpacity="0.02" />
              <rect x="440" y="60" width="210" height="280" fill="#EF4444" fillOpacity="0.02" />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="rounded-2xl p-5 text-center" style={{ background: '#111111', border: '1px solid rgba(34,197,94,0.2)' }}>
              <p className="font-sans font-bold text-sm" style={{ color: '#22C55E' }}>Abaixo do LT1</p>
              <p className="text-white/40 text-xs mt-1">Treino de base e recuperação</p>
            </div>
            <div className="rounded-2xl p-5 text-center" style={{ background: '#111111', border: '1px solid rgba(234,179,8,0.2)' }}>
              <p className="font-sans font-bold text-sm" style={{ color: '#EAB308' }}>Entre LT1 e LT2</p>
              <p className="text-white/40 text-xs mt-1">Zona de desenvolvimento</p>
            </div>
            <div className="rounded-2xl p-5 text-center" style={{ background: '#111111', border: '1px solid rgba(239,68,68,0.2)' }}>
              <p className="font-sans font-bold text-sm" style={{ color: '#EF4444' }}>Acima do LT2</p>
              <p className="text-white/40 text-xs mt-1">Alta intensidade — tempo limitado</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── POR QUE NÃO CONFIAR NO RELÓGIO ─── */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Por que fazer o teste</span>
            <h2 className="font-sans font-light text-3xl lg:text-5xl text-white tracking-tight mt-3">
              Seu relógio{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>não sabe disso.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                titulo: 'Relógios estimam por fórmula',
                desc: 'Garmin, Apple Watch e Polar usam fórmulas genéricas baseadas em idade e frequência cardíaca máxima. Isso funciona para a média — mas você não é a média. Dois atletas da mesma idade podem ter limiares completamente diferentes.',
              },
              {
                titulo: 'FC varia todo dia',
                desc: 'Sua frequência cardíaca muda com sono, estresse, hidratação, temperatura e cafeína. Um treino na "zona 2" do relógio pode ser zona 3 real num dia ruim. O lactato não mente — ele reflete o que está acontecendo dentro do músculo.',
              },
              {
                titulo: 'Treinar errado custa caro',
                desc: 'Treinar acima do limiar achando que está na zona leve causa overtraining, estagnação e lesão. Treinar abaixo achando que está no limiar desperdiça meses de evolução. Saber o número exato muda tudo.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-3xl p-8" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h3 className="font-sans font-bold text-white mb-3" style={{ fontSize: '1.2rem' }}>{item.titulo}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA ─── */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-20">
            <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Como funciona</span>
            <h2 className="font-sans font-light text-3xl lg:text-5xl text-white tracking-tight mt-3">
              O que você vai fazer.{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>Passo a passo.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-0">
            {[
              {
                num: '01',
                titulo: 'Agende e compareça',
                desc: 'O teste é presencial em Maceió. Você agenda pelo formulário ou WhatsApp e comparece no dia marcado. Dura cerca de 40 minutos — venha com roupa de treino e tênis. Recomendamos estar descansado e hidratado, sem treino pesado nas últimas 24 horas.',
              },
              {
                num: '02',
                titulo: 'Protocolo incremental',
                desc: 'Você começa em uma intensidade bem leve e a cada 3 minutos aumentamos um pouco o ritmo. A cada estágio, fazemos uma pequena coleta de sangue capilar no lóbulo da orelha — é uma picadinha rápida, praticamente indolor. Continuamos até o ponto onde o lactato dispara.',
              },
              {
                num: '03',
                titulo: 'Receba seu laudo',
                desc: 'Em até 48 horas você recebe o laudo completo: seus valores de LT1 e LT2, a frequência cardíaca e velocidade (ou potência) correspondente a cada limiar, e suas zonas de treino individualizadas com recomendações práticas de prescrição.',
              },
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 py-12"
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-start gap-4 lg:flex-col lg:gap-2">
                  <span className="font-sans font-bold text-white/10" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1 }}>{item.num}</span>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-sans font-bold text-white mb-3" style={{ fontSize: '1.4rem' }}>{item.titulo}</h3>
                  <p className="text-white/50 leading-relaxed" style={{ fontSize: '1rem', maxWidth: 600 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── O QUE VOCÊ RECEBE ─── */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Seu laudo</span>
            <h2 className="font-sans font-light text-3xl lg:text-5xl text-white tracking-tight mt-3">
              O que vem no{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>resultado.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { titulo: 'LT1 e LT2 exatos', desc: 'Os dois limiares medidos diretamente do seu sangue, com a concentração de lactato em cada estágio do teste.' },
              { titulo: 'FC de cada limiar', desc: 'A frequência cardíaca correspondente ao seu LT1 e LT2 — agora seu relógio vai mostrar zonas que fazem sentido.' },
              { titulo: 'Velocidade ou Potência', desc: 'O pace (min/km) ou watts exatos de cada limiar. É o número que define seu treino intervalado e seu ritmo de prova.' },
              { titulo: 'Zonas de treino reais', desc: 'Suas zonas individualizadas — não uma tabela genérica. Cada zona calculada a partir dos seus limiares reais.' },
              { titulo: 'Curva de lactato completa', desc: 'O gráfico mostrando como seu lactato subiu a cada estágio. Você vê exatamente onde seu corpo mudou de marcha.' },
              { titulo: 'Recomendações de treino', desc: 'Orientações práticas de como usar as zonas na sua planilha — o que treinar em cada zona e quanto tempo.' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'rgba(75,123,245,0.15)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4B7BF5" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-sans font-bold text-white mb-2" style={{ fontSize: '1.05rem' }}>{item.titulo}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AVALIAÇÕES ─── */}
      <section className="py-24 lg:py-32 px-6" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Valores</span>
            <h2 className="font-sans mt-3 leading-tight" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: 'white' }}>
              Invista no dado que{' '}
              <span style={{ color: '#4B7BF5' }}>muda seu treino.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Produto 1 */}
            <div className="rounded-3xl p-8 flex flex-col justify-between gap-8"
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div>
                <div className="flex items-start justify-between mb-6">
                  <span className="font-sans text-xs uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'white/70', border: '1px solid rgba(255,255,255,0.1)' }}>
                    Avulso
                  </span>
                  <div className="text-right">
                    <p className="font-sans font-bold text-white" style={{ fontSize: '2rem', lineHeight: 1 }}>R$450</p>
                    <p className="text-white/40 text-xs mt-1">1 avaliação completa</p>
                  </div>
                </div>
                <h3 className="font-sans font-bold text-white mb-3" style={{ fontSize: '1.3rem' }}>
                  Análise de Limiar de Lactato
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Protocolo incremental completo com coleta capilar, identificação de LT1 e LT2, e laudo com zonas de treino individualizadas.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    'Protocolo incremental presencial',
                    'Coleta capilar a cada estágio',
                    'Identificação de LT1 e LT2',
                    'Zonas de treino individualizadas',
                    'Curva de lactato completa',
                    'Recomendações de prescrição',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <p className="text-white/60 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <a href="#agendar"
                onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#agendar') }}
                className="inline-flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
                style={{ background: '#4B7BF5', borderRadius: 99, padding: '14px 28px', color: 'white', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textDecoration: 'none', textAlign: 'center' }}>
                QUERO MINHA AVALIAÇÃO
                <ArrowRight size={16} color="white" />
              </a>
            </div>

            {/* Produto 2 */}
            <div className="rounded-3xl p-8 flex flex-col justify-between gap-8"
              style={{ background: '#0A2463', border: '1px solid rgba(75,123,245,0.4)' }}>
              <div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-sans text-xs uppercase tracking-widest px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                      Acompanhamento
                    </span>
                    <span className="font-sans text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
                      Melhor custo
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div />
                    <div className="text-right">
                      <p className="font-sans font-bold text-white" style={{ fontSize: '1.8rem', lineHeight: 1 }}>R$600</p>
                      <p className="text-white/50 text-xs mt-1">2 avaliações</p>
                    </div>
                  </div>
                </div>
                <h3 className="font-sans font-bold text-white mb-3" style={{ fontSize: '1.3rem' }}>
                  Acompanhamento de Lactato
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-2">
                  Duas avaliações para acompanhar sua evolução. Faça o primeiro teste, treine com as zonas certas, e depois de algumas semanas repita para ver o quanto evoluiu.
                </p>
                <p className="text-white/40 text-xs mb-6">
                  Equivale a R$300 por avaliação — economia de R$300 vs duas avulsas.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    '2 avaliações completas de lactato',
                    'Relatório comparativo de evolução',
                    'Verificação se os limiares melhoraram',
                    'Ajuste das zonas de treino após reteste',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.2)' }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <p className="text-white/80 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <a href="#agendar"
                onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#agendar') }}
                className="inline-flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
                style={{ background: 'white', borderRadius: 99, padding: '14px 28px', color: '#0A2463', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textDecoration: 'none', textAlign: 'center' }}>
                QUERO MEU ACOMPANHAMENTO
                <ArrowRight size={16} color="#0A2463" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FORMULÁRIO ─── */}
      <section id="agendar" className="py-24 lg:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[600px] mx-auto">
          <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Agende sua avaliação</span>
          <h2 className="font-sans mt-3 mb-3 leading-tight" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: 'white' }}>
            Comece agora.
          </h2>
          <p className="text-white/50 mb-3 leading-relaxed">
            Preencha o formulário e entraremos em contato para agendar sua avaliação presencial em Maceió.
          </p>
          <p className="text-white/30 text-sm mb-10">
            O teste dura cerca de 40 minutos. Recomendamos estar descansado e hidratado.
          </p>

          {status === 'success' ? (
            <div className="rounded-3xl p-10 text-center" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="font-sans font-bold text-white text-xl mb-2">Recebemos sua mensagem!</p>
              <p className="text-white/50 text-sm">Entraremos em contato em breve para agendar sua avaliação.</p>
              <p className="text-white/50 text-sm">Você será redirecionado para o WhatsApp. Se não abrir automaticamente, <a href="https://wa.me/558299652230" target="_blank" style={{ color: '#4B7BF5', textDecoration: 'underline' }}>clique aqui</a>.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {[
                { key: 'nome', label: 'Nome completo', type: 'text', placeholder: 'Seu nome' },
                { key: 'whatsapp', label: 'WhatsApp', type: 'tel', placeholder: '(82) 99999-9999' },
                { key: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com' },
              ].map((field) => (
                <div key={field.key} className="flex flex-col gap-2">
                  <label className="font-sans font-semibold text-sm text-white">{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', color: 'white', background: 'rgba(255,255,255,0.05)' }} />
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label className="font-sans font-semibold text-sm text-white">Esporte principal</label>
                <select value={form.esporte} onChange={(e) => setForm({ ...form, esporte: e.target.value })}
                  style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', color: 'white', background: 'rgba(255,255,255,0.05)' }}>
                  <option value="">Selecione</option>
                  <option value="corrida">Corrida</option>
                  <option value="ciclismo">Ciclismo</option>
                  <option value="natacao">Natação</option>
                  <option value="triathlon">Triathlon</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans font-semibold text-sm text-white">Treina há quanto tempo?</label>
                <select value={form.experiencia} onChange={(e) => setForm({ ...form, experiencia: e.target.value })}
                  style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', color: 'white', background: 'rgba(255,255,255,0.05)' }}>
                  <option value="">Selecione</option>
                  <option value="menos-1-ano">Menos de 1 ano</option>
                  <option value="1-3-anos">1-3 anos</option>
                  <option value="3-5-anos">3-5 anos</option>
                  <option value="mais-5-anos">Mais de 5 anos</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans font-semibold text-sm text-white">Já fez teste de lactato antes?</label>
                <select value={form.jaFezTeste} onChange={(e) => setForm({ ...form, jaFezTeste: e.target.value })}
                  style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', color: 'white', background: 'rgba(255,255,255,0.05)' }}>
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                  <option value="nao-sei">Não sei o que é</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans font-semibold text-sm text-white">Melhor período pra agendar</label>
                <select value={form.periodo} onChange={(e) => setForm({ ...form, periodo: e.target.value })}
                  style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', color: 'white', background: 'rgba(255,255,255,0.05)' }}>
                  <option value="">Selecione</option>
                  <option value="manha">Manhã</option>
                  <option value="tarde">Tarde</option>
                  <option value="qualquer">Qualquer um</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans font-semibold text-sm text-white">Mensagem (opcional)</label>
                <textarea placeholder="Algo mais que queira nos dizer..." value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })} rows={3}
                  style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', color: 'white', background: 'rgba(255,255,255,0.05)', resize: 'none' }} />
              </div>
              <button onClick={handleSubmit} disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-3 hover:opacity-90 transition-opacity mt-2"
                style={{ background: '#0A2463', borderRadius: 99, padding: '16px 32px', color: 'white', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', border: 'none', cursor: 'pointer', width: '100%' }}>
                {status === 'loading' ? 'ENVIANDO...' : 'AGENDAR MINHA AVALIAÇÃO'}
                {status !== 'loading' && <ArrowRight size={16} color="white" />}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
