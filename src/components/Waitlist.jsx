import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle } from 'lucide-react'
import { saveLead } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const profiles = [
  'Atleta',
  'Treinador / Técnico',
  'Clube / Federação',
  'Profissional de Saúde',
  'Pesquisador / Acadêmico',
  'Outro',
]

export default function Waitlist() {
  const sectionRef = useRef(null)
  const btnRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', profile: '', message: ''
  })

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
  }, [submitted])

  const setField = (field) => (e) => setFormData({ ...formData, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.nome || !formData.email) return
    setLoading(true)
    setErro(null)
    const { error } = await saveLead({
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      pagina: 'home',
      campo_extra: formData.profile,
      campo_extra_label: 'Perfil',
    })
    setLoading(false)
    if (error) {
      setErro('Erro ao enviar. Tente novamente.')
      console.error('Erro Supabase:', error)
    } else {
      setSubmitted(true)
    }
  }

  const inputClass = 'w-full rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors duration-200 font-sans'
  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }
  const labelClass = 'font-mono text-[10px] uppercase tracking-wider block mb-1.5'
  const labelStyle = { color: 'rgba(255,255,255,0.5)' }

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

        {submitted ? (
          <div className="rounded-3xl p-12 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(75,123,245,0.15)' }}>
              <CheckCircle size={24} color="#4B7BF5" />
            </div>
            <h3 className="font-sans font-bold text-xl text-white mb-2">Mensagem enviada!</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Nossa equipe entrará em contato em breve.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl p-8 space-y-4"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={labelStyle}>Nome completo</label>
                <input type="text" required placeholder="Seu nome"
                  className={inputClass} style={inputStyle}
                  value={formData.nome} onChange={setField('nome')} />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>E-mail</label>
                <input type="email" required placeholder="seu@email.com"
                  className={inputClass} style={inputStyle}
                  value={formData.email} onChange={setField('email')} />
              </div>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Telefone / WhatsApp</label>
              <input type="tel" placeholder="Seu telefone ou WhatsApp"
                className={inputClass} style={inputStyle}
                value={formData.telefone} onChange={setField('telefone')} />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Perfil</label>
              <select required className={`${inputClass} appearance-none cursor-pointer`}
                style={{ ...inputStyle, background: 'rgba(20,20,20,0.8)' }}
                value={formData.profile} onChange={setField('profile')}>
                <option value="" style={{ background: '#0A0A0A' }}>Selecione seu perfil</option>
                {profiles.map((p) => (
                  <option key={p} value={p} style={{ background: '#0A0A0A' }}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>
                Como você usaria a Veltron? <span style={{ color: 'rgba(255,255,255,0.3)' }}>(opcional)</span>
              </label>
              <textarea rows={3} placeholder="Conte-nos sobre seu contexto e necessidades..."
                className={`${inputClass} resize-none`} style={inputStyle}
                value={formData.message} onChange={setField('message')} />
            </div>

            {erro && (
              <p className="text-center text-sm" style={{ color: '#ff6b6b' }}>{erro}</p>
            )}

            <div className="pt-2 flex justify-center">
              <button ref={btnRef} type="submit" disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-full transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #4B7BF5, #0A2463)', boxShadow: '0 8px 32px rgba(75,123,245,0.25)', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Enviando...' : 'Entre em contato →'}
              </button>
            </div>
            <p className="text-center font-mono text-[10px] pt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Sem spam. Apenas novidades da Veltron.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
