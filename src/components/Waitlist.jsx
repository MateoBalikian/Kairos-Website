import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

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

  const inputClass =
    'w-full bg-white border border-[#E5E5E2] rounded-2xl px-4 py-3.5 text-sm text-[#0A0A0A] placeholder-[#4A4A47]/50 focus:outline-none focus:border-[#0A2463] focus:ring-1 focus:ring-[#0A2463]/20 transition-colors duration-200 font-sans'

  return (
    <section ref={sectionRef} id="waitlist" className="py-24 lg:py-32 px-6 bg-[#F8F8F6]">
      <div className="max-w-[640px] mx-auto waitlist-content">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-[#4A4A47] uppercase tracking-widest block mb-4">
            Acesso antecipado
          </span>
          <h2 className="font-sans font-light text-3xl lg:text-4xl xl:text-5xl text-[#0A0A0A] tracking-tight mb-4">
            Seja o primeiro a{' '}
            <span className="font-bold text-[#0A2463]">acessar a KAIROS</span>
          </h2>
          <p className="text-base text-[#4A4A47] leading-relaxed">
            Estamos em desenvolvimento. Selecione seu perfil e entre na lista — você receberá
            acesso antecipado e atualizações diretas da equipe.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white border border-[#E5E5E2] rounded-4xl p-12 text-center">
            <div className="w-12 h-12 bg-[#0A2463]/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={24} className="text-[#0A2463]" />
            </div>
            <h3 className="font-sans font-medium text-xl text-[#0A0A0A] mb-2">Você está na lista!</h3>
            <p className="text-sm text-[#4A4A47]">
              Entraremos em contato em breve com atualizações exclusivas.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-[#E5E5E2] rounded-4xl p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-[#4A4A47] uppercase tracking-wider block mb-1.5">
                  Nome completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  className={inputClass}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-[#4A4A47] uppercase tracking-wider block mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className={inputClass}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-[#4A4A47] uppercase tracking-wider block mb-1.5">
                Perfil
              </label>
              <select
                required
                className={`${inputClass} appearance-none cursor-pointer`}
                value={formData.profile}
                onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
              >
                <option value="">Selecione seu perfil</option>
                {profiles.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-mono text-[10px] text-[#4A4A47] uppercase tracking-wider block mb-1.5">
                Como você usaria a KAIROS? <span className="text-[#4A4A47]/50">(opcional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Conte-nos sobre seu contexto e necessidades..."
                className={`${inputClass} resize-none`}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <div className="pt-2 flex justify-center">
              <button
                ref={btnRef}
                type="submit"
                className="btn-slide inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-white bg-[#0A2463] rounded-full shadow-[0_8px_32px_rgba(10,36,99,0.25)]"
              >
                <div className="slide-fill bg-[#1E3A8A]" />
                <span>Quero acesso antecipado</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <p className="text-center font-mono text-[10px] text-[#4A4A47]/50 pt-1">
              Sem spam. Apenas atualizações da KAIROS.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
