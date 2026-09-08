import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'
import { buildLeadMessage } from '../lib/leadLabels'

gsap.registerPlugin(ScrollTrigger)

const modalidades = [
  {
    nome: 'Natação',
    texto: 'Frequência e comprimento de braçada, simetria entre os lados, viradas e eficiência técnica, medidos por câmera fixa e cruzados com a curva de lactato feita na própria piscina.',
  },
  {
    nome: 'Ciclismo de estrada',
    texto: 'Curva de lactato em estágios, potência e cadência, balanço do quadril e assimetria de pedalada por vídeo. O protocolo que informa zonas de treino, distribuição de carga e o momento de descansar.',
  },
  {
    nome: 'Paratriatlo',
    texto: 'Avaliação nas três modalidades no mesmo atleta, filmada dos dois lados para capturar compensações, com a transição da bike para a corrida tratada como dado, não como surpresa.',
  },
]

const oQueMedimos = [
  { titulo: 'Limiar de lactato', texto: 'O ponto em que o esforço deixa de ser sustentável, medido no sangue, em estágios, na modalidade do atleta.' },
  { titulo: 'Biomecânica por vídeo', texto: 'Visão computacional sobre o movimento real do atleta: amplitude, simetria, cadência, e o estágio em que a técnica começa a ceder.' },
  { titulo: 'Metabolômica', texto: 'Amostra de urina que mostra inflamação, recuperação e o estado da barreira intestinal ao longo das semanas de treino.' },
  { titulo: 'Carga e recuperação', texto: 'Acompanhamento semana a semana da carga de treino e da resposta do atleta, para ajustar a intensidade antes que o corpo cobre.' },
]

export default function EsporteParalimpico() {
  const heroRef = useRef(null)
  const [form, setForm] = useState({ nome: '', whatsapp: '', email: '', mensagem: '' })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.fromTo('.ep-hi', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 })
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    supabase.from('leads').insert([{ ...form, pagina: 'esporte-paralimpico', created_at: new Date().toISOString() }])
      .then(({ error }) => { if (error) console.error('Falha ao registrar lead no Supabase:', error) })
    const msg = buildLeadMessage({
      intro: `Sou *${form.nome}* e gostaria de saber mais sobre o programa de esporte paralímpico da Veltron.`,
      linhas: [['Mensagem', form.mensagem]],
      email: form.email,
    })
    window.open(`https://wa.me/558299652230?text=${encodeURIComponent(msg)}`, '_blank')
    setStatus('success')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#0A0A0A]">
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 w-full">
          <div className="flex flex-col justify-center py-24 lg:py-32" style={{ maxWidth: 760 }}>
            <div className="ep-hi mb-4">
              <span className="font-sans text-xs text-white/40 uppercase tracking-widest border border-white/10 rounded-full px-4 py-1.5">
                Esporte Paralímpico
              </span>
            </div>
            <h1 className="ep-hi font-sans font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              O corpo que compensa<br />
              <span style={{ color: '#4B7BF5' }}>merece ser medido.</span>
            </h1>
            <p className="ep-hi text-white/60 leading-relaxed mb-4" style={{ fontSize: '1.05rem', maxWidth: 600 }}>
              Todo atleta compensa alguma coisa. No esporte paralímpico, a compensação é a técnica. A Veltron monitora atletas paralímpicos com o mesmo rigor do alto rendimento: lactato, biomecânica por vídeo e metabolômica, cruzados num único acompanhamento.
            </p>
            <p className="ep-hi text-white/60 leading-relaxed mb-8" style={{ fontSize: '1.05rem', maxWidth: 600 }}>
              Coordenação científica do Prof. Dr. Pedro Balikian Junior, trinta anos de pesquisa em limiares metabólicos, natação, ciclismo e triatlo.
            </p>
            <a href="#contato" className="ep-hi inline-flex items-center gap-3 hover:opacity-90 transition-opacity"
              onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#contato') }}
              style={{ background: 'white', borderRadius: 99, padding: '14px 28px', color: '#0A0A0A', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textDecoration: 'none', width: 'fit-content' }}>
              FALAR COM A EQUIPE
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ background: '#0A0A0A' }}>
                <ArrowRight size={13} color="white" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── POR QUE ─── */}
      <section className="py-16 lg:py-24 px-6" style={{ background: '#ffffff' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
            <div>
              <span className="font-sans text-xs text-[#0A2463] uppercase tracking-widest">Por que um programa próprio</span>
              <h2 className="font-sans mt-3 leading-tight mb-6" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#0A0A0A' }}>
                Tabela genérica<br /><span style={{ color: '#0A2463' }}>não serve para ninguém.</span><br />Muito menos aqui.
              </h2>
              <p className="text-[#4A4A47] leading-relaxed mb-5" style={{ fontSize: '1.05rem' }}>
                Zonas de treino por fórmula partem de um corpo médio que não existe. No esporte paralímpico, essa média está ainda mais longe: uma amputação, uma diferença de força entre os lados ou uma limitação de mobilidade mudam a economia de movimento, o custo de cada esforço e o ponto em que a técnica cede.
              </p>
              <p className="text-[#4A4A47] leading-relaxed mb-5" style={{ fontSize: '1.05rem' }}>
                Por isso o programa mede, em vez de estimar. O limiar é do atleta. A assimetria é filmada dos dois lados. A carga é acompanhada semana a semana, e a intensidade é ajustada antes que o corpo cobre em forma de lesão ou estagnação.
              </p>
              <p className="text-[#4A4A47] leading-relaxed" style={{ fontSize: '1.05rem' }}>
                O objetivo é simples: dar ao atleta paralímpico e ao seu treinador os mesmos números que decidem uma temporada no alto rendimento.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {oQueMedimos.map((m) => (
                <div key={m.titulo} className="rounded-2xl p-6" style={{ background: '#F8F8F6', border: '1px solid #E5E5E2' }}>
                  <p className="font-sans font-bold text-lg mb-2" style={{ color: '#0A2463' }}>{m.titulo}</p>
                  <p className="text-sm text-[#4A4A47] leading-relaxed">{m.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODALIDADES ─── */}
      <section className="py-16 lg:py-24 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Modalidades acompanhadas</span>
            <h2 className="font-sans mt-3 leading-tight" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'white' }}>
              Três modalidades,{' '}<span style={{ color: '#4B7BF5' }}>um método.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modalidades.map((m) => (
              <div key={m.nome} className="rounded-3xl p-8" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="font-sans font-bold text-xl text-white mb-3">{m.nome}</p>
                <p className="text-white/55 leading-relaxed text-sm">{m.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ATLETAS ─── */}
      <section className="py-16 lg:py-24 px-6" style={{ background: '#ffffff' }}>
        <div className="max-w-[1200px] mx-auto">
          <span className="font-sans text-xs text-[#0A2463] uppercase tracking-widest">Atletas do programa</span>
          <h2 className="font-sans mt-3 leading-tight mb-6" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#0A0A0A' }}>
            Quem a gente acompanha.
          </h2>
          <p className="text-[#4A4A47] leading-relaxed mb-8" style={{ fontSize: '1.05rem', maxWidth: 720 }}>
            Os atletas monitorados pela Veltron aparecem aqui com nome, modalidade e resultados públicos, sempre com autorização por escrito de cada um. Os dados das avaliações pertencem ao atleta e não são divulgados.
          </p>
          <div className="rounded-2xl p-8" style={{ background: '#F8F8F6', border: '1px dashed #C9C9C4' }}>
            <p className="text-[#4A4A47] text-sm leading-relaxed">
              Perfis em preparação, aguardando a autorização de uso de nome e imagem dos atletas.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ÉTICA ─── */}
      <section className="py-14 px-6" style={{ background: '#F8F8F6', borderTop: '1px solid #E5E5E2', borderBottom: '1px solid #E5E5E2' }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-sans text-xs text-[#0A2463] uppercase tracking-widest">Compromissos</span>
          <ul className="mt-4 space-y-3 text-[#4A4A47] leading-relaxed" style={{ fontSize: '1rem' }}>
            <li>Classificação funcional é responsabilidade das confederações e dos classificadores oficiais. A Veltron não classifica atletas e não emite laudos médicos.</li>
            <li>Diagnósticos, laudos e qualquer dado de saúde nunca são divulgados. Os resultados das avaliações pertencem ao atleta.</li>
            <li>Nenhum atleta aparece nesta página sem autorização por escrito, que pode ser retirada a qualquer momento.</li>
            <li>O acompanhamento não substitui a equipe médica nem o treinador. Ele entrega números para as decisões deles.</li>
          </ul>
        </div>
      </section>

      {/* ─── CONTATO ─── */}
      <section id="contato" className="py-16 lg:py-24 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[720px] mx-auto">
          <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Para atletas, treinadores e equipes</span>
          <h2 className="font-sans mt-3 leading-tight mb-4" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'white' }}>
            Quer entrar no programa?
          </h2>
          <p className="text-white/55 leading-relaxed mb-8">Conte quem é o atleta, a modalidade e o objetivo da temporada. A equipe responde pelo WhatsApp.</p>
          {status === 'success' ? (
            <div className="rounded-2xl p-6" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-white font-semibold">Mensagem preparada no WhatsApp. Obrigado.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required placeholder="Seu nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="rounded-xl px-4 py-3 text-sm text-white" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.1)' }} />
              <input required placeholder="WhatsApp" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="rounded-xl px-4 py-3 text-sm text-white" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.1)' }} />
              <input type="email" placeholder="E-mail (opcional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl px-4 py-3 text-sm text-white sm:col-span-2" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.1)' }} />
              <textarea rows={4} placeholder="Atleta, modalidade e objetivo" value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                className="rounded-xl px-4 py-3 text-sm text-white sm:col-span-2" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.1)' }} />
              <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
                style={{ background: 'white', borderRadius: 99, padding: '14px 28px', color: '#0A0A0A', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px' }}>
                ENVIAR PELO WHATSAPP <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
