import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { CheckCircle } from 'lucide-react'

const profiles = [
  'Treinador / Técnico',
  'Pesquisador / Acadêmico',
  'Atleta',
  'Profissional de Saúde',
  'Clube / Federação',
  'Investidor',
]

export default function Waitlist() {
  const sectionRef = useRef(null)
  const btnRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profile: '',
    message: '',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelector('.waitlist-content'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Magnetic effect on button
  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(btn, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' })
    }

    btn.addEventListener('mousemove', handleMouseMove)
    btn.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      btn.removeEventListener('mousemove', handleMouseMove)
      btn.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [submitted])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const setField = (field) => (e) => setFormData({ ...formData, [field]: e.target.value })

  const inputClass =
    'w-full rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors duration-200 font-sans'
  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: 'white',
  }
  const labelClass = 'font-mono text-[10px] uppercase tracking-wider block mb-1.5'
  const labelStyle = { color: 'rgba(255,255,255,0.5)' }

  return (
    <section ref={sectionRef} id="waitlist" className="py-24 lg:py-32 px-6 bg-[#0A0A0A]">
      <div className="max-w-[640px] mx-auto waitlist-content px-0">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest block mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
            VAGAS LIMITADAS
          </span>
          <h2 className="font-sans font-light text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white tracking-tight mb-4">
            Treine com a vantagem que{' '}
            <span style={{ color: '#4B7BF5' }}>times olímpicos têm</span>
            <br />
            <span style={{ color: '#4B7BF5' }}>— com a KAIRÓS.</span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Diagnósticos fisiológicos de precisão que antes só existiam em centros de elite. Cadastre-se e nossa equipe entrará em contato.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-4xl p-12 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <CheckCircle size={24} className="text-[#7BA7E8]" />
            </div>
            <h3 className="font-sans font-medium text-xl text-white mb-2">Você está na lista!</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Entraremos em contato em breve com atualizações exclusivas.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-4xl p-8 space-y-4"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={labelStyle}>Nome completo</label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  className={inputClass}
                  style={inputStyle}
                  value={formData.name}
                  onChange={setField('name')}
                />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>E-mail</label>
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className={inputClass}
                  style={inputStyle}
                  value={formData.email}
                  onChange={setField('email')}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} style={labelStyle}>Telefone / WhatsApp</label>
              <input
                type="tel"
                placeholder="Seu telefone ou WhatsApp"
                className={inputClass}
                style={inputStyle}
                value={formData.phone}
                onChange={setField('phone')}
              />
            </div>

            <div>
              <label className={labelClass} style={labelStyle}>Perfil</label>
              <select
                required
                className={`${inputClass} appearance-none cursor-pointer`}
                style={{ ...inputStyle, background: 'rgba(20,20,20,0.8)' }}
                value={formData.profile}
                onChange={setField('profile')}
              >
                <option value="" style={{ background: '#0A0A0A' }}>Selecione seu perfil</option>
                {profiles.map((p) => (
                  <option key={p} value={p} style={{ background: '#0A0A0A' }}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} style={labelStyle}>
                Como você usaria a KAIRÓS? <span style={{ color: 'rgba(255,255,255,0.3)' }}>(opcional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Conte-nos sobre seu contexto e necessidades..."
                className={`${inputClass} resize-none`}
                style={inputStyle}
                value={formData.message}
                onChange={setField('message')}
              />
            </div>

            <div className="pt-2 flex justify-center">
              <button
                ref={btnRef}
                type="submit"
                className="btn-slide inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-white bg-[#0A2463] rounded-full shadow-[0_8px_32px_rgba(10,36,99,0.25)]"
              >
                <div className="slide-fill bg-[#1E3A8A]" />
                <span>Entre em contato →</span>
              </button>
            </div>

            <p className="text-center font-mono text-[10px] pt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Sem spam. Apenas novidades da KAIRÓS.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
