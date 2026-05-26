import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { mediaUrl, supabase } from '../lib/supabase'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function PoseEstimation() {
  const heroRef = useRef(null)
  const [form, setForm] = useState({ nome: '', whatsapp: '', email: '', mensagem: '' })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pe-hi', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 })
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await supabase.from('leads').insert([{ ...form, pagina: 'pose-estimation', created_at: new Date().toISOString() }])
      setStatus('success')
      const msg = `Olá! Vim pelo site da Veltron 👋\n\n*Interesse em Pose Estimation*\n\nNome: ${form.nome}\nWhatsApp: ${form.whatsapp}\nE-mail: ${form.email}\n${form.mensagem ? `Mensagem: ${form.mensagem}` : ''}`
      window.open(`https://wa.me/558299652230?text=${encodeURIComponent(msg)}`, '_blank')
    } catch { setStatus('error') }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.4fr] gap-8 xl:gap-12 items-center min-h-[85vh] lg:min-h-screen pt-24 pb-16">
            <div style={{ paddingLeft: '0' }}>
              <div className="pe-hi mb-4">
                <span className="font-sans text-xs text-white/40 uppercase tracking-widest border border-white/10 rounded-full px-4 py-1.5">
                  Biomecânica · Visão Computacional
                </span>
              </div>
              <h1 className="pe-hi font-sans font-bold text-white leading-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                A IA que vê o que<br />
                <span style={{ color: '#4B7BF5' }}>o olho humano não vê.</span>
              </h1>
              <p className="pe-hi text-white/60 leading-relaxed mb-8" style={{ fontSize: '1.05rem', maxWidth: 480 }}>
                Enviou um vídeo. Recebeu um laudo biomecânico completo. Sem câmeras especiais, sem marcadores no corpo — só a câmera do seu celular e nossa IA.
              </p>
              <a href="#enviar" className="pe-hi inline-flex items-center gap-3 hover:opacity-90 transition-opacity"
                onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#enviar') }}
                style={{ background: 'white', borderRadius: 99, padding: '14px 28px', color: '#0A0A0A', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textDecoration: 'none' }}>
                ENVIE SEU VÍDEO AGORA
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ background: '#0A0A0A' }}>
                  <ArrowRight size={13} color="white" />
                </span>
              </a>
            </div>
            <div className="pe-hi hidden xl:flex items-center justify-end">
              <img src={mediaUrl('heropose1.jpeg')} alt="Grave com seu celular"
                style={{ width: '150%', maxWidth: 680, objectFit: 'contain', borderRadius: '24px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── O QUE É ─── */}
      <section className="py-16 lg:py-24 xl:py-32 px-6" style={{ background: '#ffffff' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-[0.85fr_1.15fr] gap-8 xl:gap-20 items-center">
            <div>
              <span className="font-sans text-xs text-[#0A2463] uppercase tracking-widest">O que é</span>
              <h2 className="font-sans mt-3 leading-tight mb-6" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#0A0A0A' }}>
                Seu celular.<br />
                <span style={{ color: '#0A2463' }}>Um laboratório de biomecânica.</span>
              </h2>
              <p className="text-[#4A4A47] leading-relaxed mb-6" style={{ fontSize: '1.05rem' }}>
                Pose Estimation é uma tecnologia de Inteligência Artificial que identifica e rastreia os pontos articulares do corpo humano a partir de um vídeo comum. Frame a frame, a IA mapeia ombros, cotovelos, quadris, joelhos e tornozelos — construindo um esqueleto digital do atleta em movimento.
              </p>
              <p className="text-[#4A4A47] leading-relaxed" style={{ fontSize: '1.05rem' }}>
                Antes essa tecnologia exigia laboratórios com câmeras de captura de movimento que custam centenas de milhares de reais. Hoje a Veltron entrega o mesmo nível de análise a partir do vídeo do seu celular.
              </p>
            </div>
            <div style={{ border: '1px solid #E5E5E2', borderRadius: '24px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
              <img src={mediaUrl('poseimg.png')} alt="Pose Estimation Veltron"
                style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA ─── */}
      <section className="py-16 lg:py-24 xl:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-20">
            <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Como funciona</span>
            <h2 className="font-sans font-light text-2xl md:text-3xl lg:text-5xl text-white tracking-tight mt-3">
              Simples assim.{' '}
              <span className="font-bold" style={{ color: '#4B7BF5' }}>3 passos.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-0">
            {[
              {
                num: '01',
                titulo: 'Grave com qualquer celular',
                desc: 'Posicione o celular de lado, a uns 3-4 metros de distância. Grave pelo menos 10-15 segundos do movimento — corrida, pedalada ou braçada. Não precisa de tripé, câmera especial ou iluminação de estúdio.',
                cor: '#4B7BF5',
              },
              {
                num: '02',
                titulo: 'Envie para a Veltron',
                desc: 'Mande o vídeo pelo WhatsApp ou pelo formulário abaixo. Nossa equipe recebe, processa o vídeo com o algoritmo de Pose Estimation e extrai todos os dados biomecânicos.',
                cor: '#4B7BF5',
              },
              {
                num: '03',
                titulo: 'Receba seu laudo',
                desc: 'Em até 48 horas você recebe um laudo completo com os indicadores do seu movimento — ângulos articulares, assimetrias, oscilação e alinhamento — com recomendações práticas para melhorar.',
                cor: '#4B7BF5',
              },
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-16 py-10 lg:py-12"
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
      <section className="py-16 lg:py-24 xl:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <span className="font-sans text-xs text-white/30 uppercase tracking-widest">O laudo</span>
              <h2 className="font-sans mt-3 leading-tight mb-6" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'white' }}>
                O que você<br />
                <span style={{ color: '#4B7BF5' }}>vai receber.</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-10" style={{ fontSize: '1.05rem' }}>
                O laudo de Pose Estimation da Veltron não é só uma lista de números. É uma interpretação do que os dados significam para o seu treino e performance.
              </p>
              <div className="flex flex-col gap-6">
                {[
                  { titulo: 'Ângulos articulares', desc: 'Medição precisa dos ângulos de joelho, quadril, tornozelo e ombro em cada fase do movimento.' },
                  { titulo: 'Simetria L/D', desc: 'Comparação entre lado esquerdo e direito — assimetrias são um dos principais preditores de lesão.' },
                  { titulo: 'Oscilação e alinhamento', desc: 'Quanto seu corpo oscila verticalmente e lateralmente — dado crítico para economia de movimento.' },
                  { titulo: 'Recomendações práticas', desc: 'Não entregamos só dados. Dizemos o que fazer com eles — ajustes de técnica e pontos de atenção.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start py-5"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(75,123,245,0.1)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4B7BF5" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans font-bold text-white mb-1">{item.titulo}</p>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-32">
              <div className="rounded-3xl p-6 lg:p-8" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Por esporte</span>
                <h3 className="font-sans font-bold text-white mt-3 mb-6" style={{ fontSize: '1.3rem' }}>
                  Indicadores específicos
                </h3>
                {[
                  { esporte: 'Corrida', indicadores: 'SPM, oscilação vertical, tempo de contato, ataque do pé, simetria de voo', href: '/corrida' },
                  { esporte: 'Ciclismo', indicadores: 'Ângulo de joelho, recuo do selim, simetria de pedalada, ângulo do tronco', href: '/ciclismo' },
                  { esporte: 'Natação', indicadores: 'EVF, SWOLF, frequência de ciclos, alinhamento axial, cruzamento de linha média', href: '/natacao' },
                ].map((item, i) => (
                  <a key={i} href={item.href}
                    className="flex items-center justify-between py-4 hover:opacity-70 transition-opacity"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', textDecoration: 'none' }}>
                    <div>
                      <p className="font-sans font-bold text-white text-sm mb-1">{item.esporte}</p>
                      <p className="text-white/50 text-xs leading-relaxed">{item.indicadores}</p>
                    </div>
                    <ArrowRight size={16} color="white" className="flex-shrink-0 ml-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── POR QUE ISSO IMPORTA ─── */}
      <section className="py-16 lg:py-24 xl:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Por que importa</span>
              <h2 className="font-sans font-light text-2xl md:text-3xl lg:text-4xl text-white tracking-tight mt-3 mb-8">
                Você treina pela sensação.<br />
                <span className="font-bold" style={{ color: '#4B7BF5' }}>A câmera não mente.</span>
              </h2>
              <div className="flex flex-col gap-10">
                {[
                  { titulo: 'Previna lesões antes que aconteçam', desc: 'Assimetrias de movimento são o principal preditor de lesão por sobrecarga. A análise biomecânica identifica esses padrões antes que virem dor.' },
                  { titulo: 'Melhore performance com dados reais', desc: 'Pequenos ajustes técnicos têm impacto direto em economia de movimento, velocidade e resistência. Sem dados, são só suposições.' },
                  { titulo: 'Acompanhe sua evolução', desc: 'Repita a análise após algumas semanas de treino e veja objetivamente o que mudou. Não com percepção — com métricas reais.' },
                ].map((item, i) => (
                  <div key={i}>
                    <h3 className="font-sans font-bold text-white mb-2" style={{ fontSize: '1.1rem' }}>{item.titulo}</h3>
                    <p className="text-white/50 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)', aspectRatio: '4/3' }}>
              <video autoPlay muted loop playsInline className="w-full h-full object-cover" src={mediaUrl('skeleton.mp4')} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FORMULÁRIO ─── */}
      <section id="enviar" className="py-16 lg:py-24 xl:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[600px] mx-auto">
          <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Envie seu vídeo</span>
          <h2 className="font-sans mt-3 mb-3 leading-tight" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'white' }}>
            Comece agora.
          </h2>
          <p className="text-white/50 mb-10 leading-relaxed">
            Quer saber mais sobre essa tecnologia? Fale com a gente.
          </p>

          {status === 'success' ? (
            <div className="rounded-3xl p-10 text-center" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="font-sans font-bold text-white text-xl mb-2">Recebemos sua mensagem!</p>
              <p className="text-white/50 text-sm">Entraremos em contato em breve para receber seu vídeo.</p>
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
                <label className="font-sans font-semibold text-sm text-white">Mensagem (opcional)</label>
                <textarea placeholder="Conte um pouco sobre o que você procura..." value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })} rows={3}
                  style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', color: 'white', background: 'rgba(255,255,255,0.05)', resize: 'none' }} />
              </div>
              <button onClick={handleSubmit} disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-3 hover:opacity-90 transition-opacity mt-2"
                style={{ background: '#0A2463', borderRadius: 99, padding: '16px 32px', color: 'white', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', border: 'none', cursor: 'pointer', width: '100%' }}>
                {status === 'loading' ? 'ENVIANDO...' : 'FALE CONOSCO'}
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
