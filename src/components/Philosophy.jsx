import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current.querySelectorAll('.philosophy-item')

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        )
      })

      // Parallax on the bg image
      const bg = sectionRef.current.querySelector('.philosophy-bg')
      if (bg) {
        gsap.to(bg, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-40 px-6 bg-[#0A2463] overflow-hidden"
      id="lacae"
    >
      {/* Background lab image */}
      <div className="philosophy-bg absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1400&q=60&auto=format&fit=crop"
          alt="Laboratório científico"
          className="w-full h-full object-cover opacity-[0.06]"
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(123,167,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(123,167,232,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">

        {/* Label */}
        <div className="philosophy-item mb-16">
          <span className="font-mono text-xs text-[#7BA7E8]/60 uppercase tracking-widest">O manifesto da KAIROS</span>
        </div>

        {/* Contrast block 1 */}
        <div className="philosophy-item mb-12 lg:mb-16">
          <p className="font-sans font-light text-lg lg:text-xl text-white/40 mb-3">
            A maioria das empresas de tecnologia esportiva foca em:
          </p>
          <p className="font-bold text-6xl lg:text-8xl xl:text-[7rem] text-white/80 leading-none tracking-tight">
            Dados superficiais.
          </p>
        </div>

        {/* Divider */}
        <div className="philosophy-item w-16 h-px bg-[#7BA7E8]/30 mb-12 lg:mb-16" />

        {/* Contrast block 2 */}
        <div className="philosophy-item mb-16 lg:mb-20">
          <p className="font-sans font-light text-lg lg:text-xl text-white/40 mb-3">
            A KAIROS foca em:
          </p>
          <p className="font-bold text-6xl lg:text-8xl xl:text-[7rem] text-[#7BA7E8] leading-none tracking-tight">
            Ciência de verdade.
          </p>
        </div>

        {/* Body paragraph */}
        <div className="philosophy-item max-w-2xl">
          <p className="text-base lg:text-lg text-white/60 leading-relaxed">
            Enquanto outros vendem dashboards, nós entregamos diagnósticos. Cada avaliação
            da KAIROS é construída sobre metodologia científica validada, conduzida por
            pesquisadores com publicações em revistas internacionais, dentro de um laboratório
            universitário real.
          </p>

          {/* Stats mini-row */}
          <div className="flex flex-wrap gap-8 mt-12">
            {[
              { val: 'LACAE', desc: 'Laboratório universitário certificado' },
              { val: '99.5%', desc: 'Precisão do modelo preditivo' },
              { val: 'RMN', desc: 'Ressonância Magnética Nuclear' },
            ].map((s) => (
              <div key={s.val}>
                <div className="font-mono text-xl font-medium text-[#7BA7E8]">{s.val}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
