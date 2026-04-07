import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { mediaUrl } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const avaliacoes = [
  'VO₂máx', 'Limiar Anaeróbico', 'Teste de Wingate', 'Metabolômica por RMN', 'Biomecânica Computacional'
]

export default function Cases() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Parallax na foto
      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })

      // Fade in no conteúdo
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-xs text-white/30 uppercase tracking-widest">
            Resultados reais
          </span>
          <h2 className="font-sans font-light text-3xl lg:text-5xl text-white tracking-tight mt-3">
            Ciência aplicada{' '}
            <span className="font-bold text-[#4B7BF5]">a atletas reais</span>
          </h2>
        </div>

        {/* Card do atleta */}
        <div
          className="grid lg:grid-cols-2 gap-0 overflow-hidden"
          style={{ borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Foto */}
          <div className="relative overflow-hidden" style={{ minHeight: 520 }}>
            <img
              ref={imgRef}
              src={mediaUrl('gustavo-carvalho.jpeg')}
              alt="Gustavo Carvalho"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '90%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
            {/* Overlay gradiente */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, transparent 60%, #111111 100%), linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 40%)',
              }}
            />
            {/* Badge no canto */}
            <div className="absolute bottom-6 left-6">
              <span
                className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(75,123,245,0.15)',
                  border: '1px solid rgba(75,123,245,0.3)',
                  color: '#4B7BF5',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Triatleta · Ex-nadador profissional
              </span>
            </div>
          </div>

          {/* Conteúdo */}
          <div
            ref={contentRef}
            className="flex flex-col justify-center p-10 lg:p-14"
            style={{ background: '#111111' }}
          >
            {/* Nome */}
            <div>
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-2">
                Atleta avaliado
              </p>
              <h3 className="font-sans font-bold text-3xl text-white mb-1">
                Gustavo Carvalho
              </h3>
              <p className="font-mono text-sm text-white/40 mb-8">
                Nadador profissional 1999–2009 · Triatleta desde 2014
              </p>
            </div>

            {/* Resultado destaque */}
            <div
              className="p-5 rounded-2xl mb-8"
              style={{ background: 'rgba(75,123,245,0.08)', border: '1px solid rgba(75,123,245,0.2)' }}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#4B7BF5] mb-2">
                Resultado em prova
              </p>
              <p className="font-sans font-bold text-2xl text-white">
                Ironman 70.3 São Paulo
              </p>
              <p className="font-mono text-lg text-[#4B7BF5] mt-1">
                4h07min05 · Pódio de categoria
              </p>
            </div>

            {/* Avaliações */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">
                Avaliações realizadas na KAIRÓS
              </p>
              <div className="flex flex-col gap-2">
                {avaliacoes.map((av, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: '#4B7BF5' }}
                    />
                    <span className="font-sans text-sm text-white/70">{av}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Texto de validação */}
            <p className="font-sans text-sm text-white/40 leading-relaxed mt-8 pt-8 border-t border-white/8">
              Performance comprovada em prova. Precisão validada em laboratório.
              A KAIRÓS integra fisiologia, biomecânica e metabolômica para transformar
              dados em decisões de alta performance.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
