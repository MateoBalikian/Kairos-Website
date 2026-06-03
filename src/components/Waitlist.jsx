import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { buildLeadMessage } from '../lib/leadLabels'

gsap.registerPlugin(ScrollTrigger)

export default function Waitlist() {
  const sectionRef = useRef(null)
  const btnRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ nome: '', whatsapp: '', email: '', servico: '', esporte: '', mensagem: '' })
  const [errors, setErrors] = useState({})

  const servicoLabels = {
    express: 'Avaliação Express — R$250',
    performance: 'Avaliação Performance — R$450',
    reavaliacao: 'Reavaliação / Follow-up — R$290',
    mapa: 'Mapa Fisiometabólico — R$1.850',
    evolution: 'Veltron Evolution — R$3.900',
    'nao-sei': 'Ainda não sei',
  }
  const esporteLabels = {
    corrida: 'Corrida',
    ciclismo: 'Ciclismo',
    natacao: 'Natação',
    triathlon: 'Triathlon',
    outro: 'Outro',
  }
  const buildWhatsAppMessage = (f) => buildLeadMessage({
    intro: `Me chamo *${f.nome}* e gostaria de evoluir minha performance com o acompanhamento de vocês.`,
    linhas: [
      ['Interesse', servicoLabels[f.servico] || f.servico],
      ['Modalidade', esporteLabels[f.esporte] || f.esporte],
      ['Objetivo', f.mensagem],
    ],
    email: f.email,
  })

  const validate = (f) => {
    const errs = {}
    if (!f.nome.trim()) errs.nome = 'Preencha seu nome'
    if (!f.whatsapp.trim()) errs.whatsapp = 'Preencha seu WhatsApp'
    if (!f.email.trim()) {
      errs.email = 'Preencha seu e-mail'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) {
      errs.email = 'E-mail inválido (ex: nome@email.com)'
    }
    if (!f.servico) errs.servico = 'Selecione um serviço'
    if (!f.esporte) errs.esporte = 'Selecione um esporte'
    return errs
  }

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelector('.waitlist-content'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return
    const mv = (e) => {
      const r = btn.getBoundingClientRect()
      gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.4, ease: 'power2.out' })
    }
    const ml = () => gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' })
    btn.addEventListener('mousemove', mv)
    btn.addEventListener('mouseleave', ml)
    return () => { btn.removeEventListener('mousemove', mv); btn.removeEventListener('mouseleave', ml) }
  }, [status])

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    // registra o lead em segundo plano (best-effort, nao bloqueia a abertura do WhatsApp)
    supabase.from('leads').insert([{ ...form, pagina: 'home', created_at: new Date().toISOString() }])
      .then(({ error }) => { if (error) console.error('Falha ao registrar lead no Supabase:', error) })
    const msg = buildWhatsAppMessage(form)
    window.open(`https://wa.me/558299652230?text=${encodeURIComponent(msg)}`, '_blank')
    setStatus('success')
  }

  const fieldStyle = { border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', color: 'white', background: 'rgba(255,255,255,0.05)' }

  return (
    <section ref={sectionRef} id="waitlist" className="py-16 lg:py-24 xl:py-32 px-6 bg-[#0A0A0A]">
      <div className="max-w-[640px] mx-auto waitlist-content">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest block mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
            VAGAS LIMITADAS
          </span>
          <h2 className="font-sans font-light text-xl sm:text-2xl lg:text-4xl xl:text-5xl text-white tracking-tight mb-4" style={{ wordBreak: 'break-word' }}>
            Treine com a vantagem que{' '}
            <span style={{ color: '#4B7BF5' }}>times olímpicos têm</span>
            <br />
            <span style={{ color: '#4B7BF5' }}>— com a Veltron.</span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Diagnósticos fisiológicos de precisão que antes só existiam em centros de elite. Cadastre-se e nossa equipe entrará em contato.
          </p>
        </div>

        {status === 'success' ? (
          <div className="rounded-3xl p-12 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(75,123,245,0.15)' }}>
              <CheckCircle size={24} color="#4B7BF5" />
            </div>
            <h3 className="font-sans font-bold text-xl text-white mb-2">Mensagem enviada!</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Nossa equipe entrará em contato em breve.
            </p>
            <p className="text-white/50 text-sm mt-2">Você será redirecionado para o WhatsApp. Se não abrir automaticamente, <a href="https://wa.me/558299652230" target="_blank" style={{ color: '#4B7BF5', textDecoration: 'underline' }}>clique aqui</a>.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl p-6 lg:p-8"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex flex-col gap-4">
              {[
                { key: 'nome', label: 'Nome completo', type: 'text', placeholder: 'Seu nome' },
                { key: 'whatsapp', label: 'WhatsApp', type: 'tel', placeholder: '(82) 99999-9999' },
                { key: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com' },
              ].map((field) => (
                <div key={field.key} className="flex flex-col gap-2">
                  <label className="font-sans font-semibold text-sm text-white">{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} value={form[field.key]}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    style={{ ...fieldStyle, ...(errors[field.key] ? { border: '1px solid rgba(255,107,107,0.6)' } : {}) }} />
                  {errors[field.key] && (
                    <span style={{ fontSize: '0.75rem', color: '#ff6b6b' }}>{errors[field.key]}</span>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label className="font-sans font-semibold text-sm text-white">Qual serviço te interessa?</label>
                <select value={form.servico} onChange={(e) => updateField('servico', e.target.value)}
                  style={{ border: errors.servico ? '1px solid rgba(255,107,107,0.6)' : '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', color: 'white', background: '#1a1a1a', colorScheme: 'dark' }}>
                  <option value="" style={{ background: '#1a1a1a', color: 'white' }}>Selecione</option>
                  <option value="express" style={{ background: '#1a1a1a', color: 'white' }}>Avaliação Express — R$250</option>
                  <option value="performance" style={{ background: '#1a1a1a', color: 'white' }}>Avaliação Performance — R$450</option>
                  <option value="reavaliacao" style={{ background: '#1a1a1a', color: 'white' }}>Reavaliação / Follow-up — R$290</option>
                  <option value="mapa" style={{ background: '#1a1a1a', color: 'white' }}>Mapa Fisiometabólico — R$1.850</option>
                  <option value="evolution" style={{ background: '#1a1a1a', color: 'white' }}>Veltron Evolution — R$3.900</option>
                  <option value="nao-sei" style={{ background: '#1a1a1a', color: 'white' }}>Ainda não sei</option>
                </select>
                {errors.servico && (
                  <span style={{ fontSize: '0.75rem', color: '#ff6b6b' }}>{errors.servico}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans font-semibold text-sm text-white">Esporte</label>
                <select value={form.esporte} onChange={(e) => updateField('esporte', e.target.value)}
                  style={{ ...fieldStyle, ...(errors.esporte ? { border: '1px solid rgba(255,107,107,0.6)' } : {}) }}>
                  <option value="" style={{ color: '#1a1a1a', background: '#ffffff' }}>Selecione</option>
                  <option value="corrida" style={{ color: '#1a1a1a', background: '#ffffff' }}>Corrida</option>
                  <option value="ciclismo" style={{ color: '#1a1a1a', background: '#ffffff' }}>Ciclismo</option>
                  <option value="natacao" style={{ color: '#1a1a1a', background: '#ffffff' }}>Natação</option>
                  <option value="triathlon" style={{ color: '#1a1a1a', background: '#ffffff' }}>Triathlon</option>
                  <option value="outro" style={{ color: '#1a1a1a', background: '#ffffff' }}>Outro</option>
                </select>
                {errors.esporte && (
                  <span style={{ fontSize: '0.75rem', color: '#ff6b6b' }}>{errors.esporte}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans font-semibold text-sm text-white">Mensagem (opcional)</label>
                <textarea placeholder="Conte um pouco sobre seu objetivo..." value={form.mensagem}
                  onChange={(e) => updateField('mensagem', e.target.value)} rows={3}
                  style={{ ...fieldStyle, resize: 'none' }} />
              </div>

              {status === 'error' && (
                <p className="text-center text-sm" style={{ color: '#ff6b6b' }}>Erro ao enviar. Tente novamente.</p>
              )}

              <div className="pt-2 flex justify-center">
                <button ref={btnRef} type="submit" disabled={status === 'loading'}
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-full transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #4B7BF5, #0A2463)', boxShadow: '0 8px 32px rgba(75,123,245,0.25)', opacity: status === 'loading' ? 0.7 : 1 }}>
                  {status === 'loading' ? 'Enviando...' : 'Entre em contato →'}
                </button>
              </div>
              <p className="text-center font-mono text-[10px] pt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Sem spam. Apenas novidades da Veltron.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
