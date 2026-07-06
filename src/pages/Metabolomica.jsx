import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { mediaUrl, supabase } from '../lib/supabase'
import { buildLeadMessage } from '../lib/leadLabels'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Metabolomica() {
  const heroRef = useRef(null)
  const [form, setForm] = useState({ nome: '', whatsapp: '', email: '', mensagem: '' })
  const [status, setStatus] = useState('idle')
  const [faqOpen, setFaqOpen] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.met-hi', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 })
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // registra o lead em segundo plano (best-effort, nao bloqueia a abertura do WhatsApp)
    supabase.from('leads').insert([{ ...form, pagina: 'metabolomica', created_at: new Date().toISOString() }])
      .then(({ error }) => { if (error) console.error('Falha ao registrar lead no Supabase:', error) })
    const msg = buildLeadMessage({
      intro: `Sou *${form.nome}* e gostaria de saber mais sobre a análise de Metabolômica de vocês.`,
      linhas: [['Mensagem', form.mensagem]],
      email: form.email,
    })
    window.open(`https://wa.me/558299652230?text=${encodeURIComponent(msg)}`, '_blank')
    setStatus('success')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* ─── HERO (alinhado à esquerda com imagem) ─── */}
      <section ref={heroRef} className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.3fr] gap-8 xl:gap-12 items-center min-h-[85vh] lg:min-h-screen py-16 lg:py-32">
            <div>
              <div className="met-hi mb-4">
                <span className="font-sans text-xs text-white/40 uppercase tracking-widest border border-white/10 rounded-full px-4 py-1.5">
                  Metabolômica · Precisão Molecular
                </span>
              </div>
              <h1 className="met-hi font-sans font-bold text-white leading-tight mb-6"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>
                O exame que enxerga{' '}
                <span style={{ color: '#4B7BF5' }}>o que nenhum outro vê.</span>
              </h1>
              <p className="met-hi text-white/60 leading-relaxed mb-4" style={{ fontSize: '1.05rem', maxWidth: 520 }}>
                Hemograma, glicemia, colesterol — esses exames mostram a superfície. A metabolômica mergulha nas suas células e analisa centenas de metabólitos que revelam o que realmente está acontecendo dentro do seu corpo.
              </p>
              <p className="met-hi text-white/60 leading-relaxed mb-8" style={{ fontSize: '1.05rem', maxWidth: 520 }}>
                Deficiências invisíveis. Sinais de overtraining antes dos sintomas. O estado real da sua recuperação. Tudo em uma coleta simples de saliva ou urina.
              </p>
              <a href="#agendar" onClick={(e) => { e.preventDefault(); const t = document.getElementById('agendar'); if (t && window.lenis) { window.lenis.scrollTo(t, { duration: 1.4 }) } else if (t) { t.scrollIntoView({ behavior: 'smooth' }) } }}
                className="met-hi inline-flex items-center gap-3 hover:opacity-90 transition-opacity"
                style={{ background: 'white', borderRadius: 99, padding: '14px 28px', color: '#0A0A0A', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textDecoration: 'none' }}>
                AGENDE SUA AVALIAÇÃO
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ background: '#0A0A0A' }}>
                  <ArrowRight size={13} color="white" />
                </span>
              </a>
            </div>
            <div className="met-hi hidden xl:flex items-center justify-end self-stretch">
              <img src={mediaUrl('metabolomica1.png')} alt="Metabolômica Veltron"
                style={{ width: '100%', height: '100%', maxHeight: '520px', objectFit: 'cover', borderRadius: '24px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── O QUE É (texto + imagem + comparação) ─── */}
      <section className="py-16 lg:py-24 xl:py-32 px-6" style={{ background: '#ffffff' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16 items-center mb-20">
            <div>
              <span className="font-sans text-xs text-[#0A2463] uppercase tracking-widest">Entenda a análise</span>
              <h2 className="font-sans mt-3 leading-tight mb-6" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#0A0A0A' }}>
                O que é<br />
                <span style={{ color: '#0A2463' }}>Metabolômica?</span>
              </h2>
              <p className="text-[#4A4A47] leading-relaxed mb-4" style={{ fontSize: '1.05rem' }}>
                Metabólitos são as moléculas que seu corpo produz, consome e descarta a cada segundo — aminoácidos, ácidos graxos, vitaminas, hormônios, subprodutos do metabolismo energético. São o retrato mais fiel do que está acontecendo nas suas células naquele momento.
              </p>
              <p className="text-[#4A4A47] leading-relaxed mb-4" style={{ fontSize: '1.05rem' }}>
                A metabolômica analisa centenas desses metabólitos em uma amostra de saliva ou urina. É como fazer um raio-X bioquímico do seu corpo — só que em vez de ossos, você vê o funcionamento celular.
              </p>
              <p className="text-[#4A4A47] leading-relaxed" style={{ fontSize: '1.05rem' }}>
                Enquanto um exame convencional diz se algo já está fora da faixa, a metabolômica identifica tendências e desequilíbrios antes de virarem problema — especialmente em atletas, cujo metabolismo opera em regimes que exames tradicionais não foram feitos para avaliar.
              </p>
            </div>
            <div style={{ border: '1px solid #E5E5E2', borderRadius: '24px', overflow: 'hidden', padding: '16px' }}>
              <img src={mediaUrl('metabolomica2.png')} alt="Análise Molecular"
                style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block', borderRadius: '16px' }} />
            </div>
          </div>

          {/* Comparação lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl p-6 lg:p-8" style={{ background: '#F8F8F6', border: '1px solid #E5E5E2' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#E5E5E2' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
                <p className="font-sans font-bold text-lg" style={{ color: '#999' }}>Exame convencional</p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  'Poucos marcadores genéricos — hemograma, glicemia, colesterol',
                  'Mostra se algo já está fora da faixa de referência',
                  'Detecta o problema quando já se instalou',
                  'Faixas genéricas iguais pra todo mundo',
                  'Não diferencia atleta de sedentário',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#ccc] mt-0.5 flex-shrink-0">—</span>
                    <p className="text-sm leading-relaxed" style={{ color: '#777' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl p-6 lg:p-8" style={{ background: '#0A2463' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(75,123,245,0.3)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B7BF5" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <p className="font-sans font-bold text-lg text-white">Metabolômica Veltron</p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  'Centenas de metabólitos analisados simultaneamente',
                  'Identifica tendências antes de virar problema',
                  'Detecta overtraining antes dos sintomas aparecerem',
                  'Perfil individualizado para o SEU metabolismo',
                  'Otimizado para demandas de atletas de endurance',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(255,255,255,0.2)' }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <p className="text-sm leading-relaxed text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── O QUE A METABOLÔMICA REVELA (editorial, sem cards) ─── */}
      <section className="py-16 lg:py-24 xl:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <span className="font-sans text-xs text-white/30 uppercase tracking-widest">O que ela revela</span>
            <h2 className="font-sans mt-3 leading-tight" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'white' }}>
              Informações que{' '}
              <span style={{ color: '#4B7BF5' }}>mudam decisões.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-0">
            {[
              {
                titulo: 'Status de Recuperação',
                desc: 'Marcadores inflamatórios e de estresse oxidativo mostram se seu corpo está recuperado de verdade ou só parecendo. Evite treinar pesado quando a célula ainda não se recuperou.',
              },
              {
                titulo: 'Deficiências Nutricionais',
                desc: 'Vitaminas, minerais e aminoácidos que não aparecem no exame de sangue comum. Aquela suplementação "no chute" vira prescrição precisa baseada no que seu corpo realmente precisa.',
              },
              {
                titulo: 'Sinais de Overtraining',
                desc: 'Marcadores de catabolismo muscular e fadiga metabólica que aparecem semanas antes do atleta "quebrar". O corpo avisa antes — mas só se você souber ler.',
              },
              {
                titulo: 'Eficiência Energética',
                desc: 'Como seu corpo usa carboidrato, gordura e proteína como combustível. Isso define a estratégia de nutrição periodizada ideal para o seu metabolismo — não uma dieta genérica.',
              },
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-16 py-8 lg:py-10"
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <h3 className="font-sans font-bold text-white" style={{ fontSize: '1.3rem' }}>{item.titulo}</h3>
                <p className="text-white/50 leading-relaxed" style={{ fontSize: '1rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA (3 passos em linha) ─── */}
      <section className="py-16 lg:py-24 xl:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Como funciona</span>
            <h2 className="font-sans mt-3 leading-tight" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'white' }}>
              Simples.{' '}
              <span style={{ color: '#4B7BF5' }}>Sem complicação.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px rounded-3xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
            {[
              {
                num: '01',
                titulo: 'Agende sua coleta',
                desc: 'O exame é presencial em Maceió. Agende pelo formulário ou WhatsApp. Recomendamos jejum de 8-12 horas e sem treino pesado nas últimas 24h.',
              },
              {
                num: '02',
                titulo: 'Coleta simples',
                desc: 'Uma coleta não invasiva de saliva ou urina — sem agulha, sem picada. Feita na hora, em poucos minutos. A amostra é processada e enviada para análise.',
              },
              {
                num: '03',
                titulo: 'Laudo completo',
                desc: 'Você recebe o relatório com o perfil dos seus metabólitos, interpretação individualizada e recomendações práticas de nutrição e ajuste de treino.',
              },
            ].map((item, i) => (
              <div key={i} className="p-8 flex flex-col gap-4" style={{ background: '#111111' }}>
                <span className="font-sans font-bold" style={{ fontSize: '3rem', lineHeight: 1, color: 'rgba(75,123,245,0.15)' }}>{item.num}</span>
                <h3 className="font-sans font-bold text-white" style={{ fontSize: '1.2rem' }}>{item.titulo}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 lg:py-24 xl:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[700px] mx-auto">
          <div className="mb-12">
            <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Dúvidas frequentes</span>
            <h2 className="font-sans mt-3 leading-tight" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 800, color: 'white' }}>
              Perguntas que nossos{' '}
              <span style={{ color: '#4B7BF5' }}>clientes fazem.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                q: 'Precisa de jejum?',
                a: 'Sim, recomendamos jejum de 8 a 12 horas antes da coleta para resultados mais precisos. Água pode beber normalmente.',
              },
              {
                q: 'Dói? Como é a coleta?',
                a: 'É uma coleta simples de saliva ou urina — não invasiva, sem agulha, sem picada. Feita na hora, em poucos minutos.',
              },
              {
                q: 'Em quanto tempo recebo o resultado?',
                a: 'O laudo completo é entregue em até 15 dias úteis após a coleta, pois a amostra passa por análise laboratorial especializada.',
              },
              {
                q: 'Preciso ser atleta profissional?',
                a: 'Não. Qualquer pessoa que treina com regularidade e quer entender o que acontece dentro do seu corpo se beneficia. De amadores a profissionais.',
              },
              {
                q: 'Qual a diferença pra um exame de sangue normal?',
                a: 'Um hemograma analisa poucos marcadores genéricos. A metabolômica analisa centenas de metabólitos específicos do seu metabolismo celular — recuperação, inflamação, estresse oxidativo, eficiência energética. São camadas completamente diferentes de informação.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden"
                style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
                  <span className="font-sans font-bold text-sm pr-4">{item.q}</span>
                  <span className="flex-shrink-0 text-white/30 text-xl transition-transform duration-300"
                    style={{ transform: faqOpen === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-6">
                    <p className="text-white/50 text-sm leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORMULÁRIO ─── */}
      <section id="agendar" className="py-16 lg:py-24 xl:py-32 px-6" style={{ background: '#0A0A0A' }}>
        <div className="max-w-[600px] mx-auto">
          <span className="font-sans text-xs text-white/30 uppercase tracking-widest">Agende sua avaliação</span>
          <h2 className="font-sans mt-3 mb-3 leading-tight" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'white' }}>
            Comece agora.
          </h2>
          <p className="text-white/50 mb-3 leading-relaxed">
            Quer saber mais sobre essa tecnologia? Fale com a gente.
          </p>
          <p className="text-white/30 text-sm mb-10">
            Coleta simples de saliva ou urina. Jejum de 8-12h recomendado.
          </p>

          {status === 'success' ? (
            <div className="rounded-3xl p-10 text-center" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="font-sans font-bold text-white text-xl mb-2">Recebemos sua mensagem!</p>
              <p className="text-white/50 text-sm">Entraremos em contato em breve para agendar sua coleta.</p>
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
