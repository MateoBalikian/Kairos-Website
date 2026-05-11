import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

export default function Waitlist() {
  const sectionRef = useRef(null)
  const btnRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ nome: '', whatsapp: '', email: '', servico: '', esporte: '', mensagem: '' })

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nome || !form.email) return
    setStatus('loading')
    try {
      await supabase.from('leads').insert([{ ...form, pagina: 'home', created_at: new Date().toISOString() }])
      setStatus('success')
      const msg = `Olá! Vim pelo site da Veltron 👋

Nome: ${form.nome}
WhatsApp: ${form.whatsapp}
E-mail: ${form.email}
Interesse: ${form.servico || 'Não informado'}
Esporte: ${form.esporte || 'Não informado'}
${form.mensagem ? `Mensagem: ${form.mensagem}` : ''}`
      window.open(`https://wa.me/558299652230?text=${encodeURIComponent(msg)}`, '_blank')
    } catch { setStatus('error') }
  }

  const fieldStyle = { border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: '0.95rem', outline: 'none', fontFamily: 'DM Sans, sans-serif', color: 'white', background: 'rgba(255,255,255,0.05)' }

  return (
    <section ref={sectionRef} id="waitlist" className="py-24 lg:py-32 px-6 bg-[#0A0A0A]">
      <div className="max-w-[640px] mx-auto waitlist-content">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest block mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
            VAGAS LIMITADAS
          </span>
          <h2 className="font-sans font-light text-3xl lg:text-4xl xl:text-5xl text-white tracking-tight mb-4">
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
          <form onSubmit={handleSubmit} className="rounded-3xl p-8"
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
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    style={fieldStyle} />
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label className="font-sans font-semibold text-sm text-white">Qual serviço te interessa?</label>
                <select value={form.servico} onChange={(e) => setForm({ ...form, servico: e.target.value })} style={fieldStyle}>
                  <option value="">Selecione</option>
                  <option value="biomecanica">Análise Biomecânica por vídeo</option>
                  <option value="lactato">Limiar de Lactato</option>
                  <option value="metabolomica">Metabolômica</option>
                  <option value="combo">Combo Completo</option>
                  <option value="nao-sei">Não sei ainda</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans font-semibold text-sm text-white">Esporte</label>
                <select value={form.esporte} onChange={(e) => setForm({ ...form, esporte: e.target.value })} style={fieldStyle}>
                  <option value="">Selecione</option>
                  <option value="corrida">Corrida</option>
                  <option value="ciclismo">Ciclismo</option>
                  <option value="natacao">Natação</option>
                  <option value="triathlon">Triathlon</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans font-semibold text-sm text-white">Mensagem (opcional)</label>
                <textarea placeholder="Conte um pouco sobre seu objetivo..." value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })} rows={3}
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
