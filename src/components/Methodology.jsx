import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { mediaUrl } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    tag: 'Visão Computacional · IA',
    title: 'Biomecânica e Inteligência Artificial',
    desc: 'Câmeras e algoritmos de IA rastreiam cada milímetro do movimento — assimetrias, compensações e padrões técnicos que limitam o desempenho sem que atleta ou treinador perceba. Sem sensores, sem marcadores.',
    techs: ['YOLO', 'Pose Estimation', 'BoxMOT', 'Markerless'],
    img: mediaUrl('imgatletismoia.jpeg'),
    bg: '#0a0f1a',
  },
  {
    num: '02',
    tag: 'Fisiologia do Exercício',
    title: 'Avaliação Fisiológica de Precisão',
    desc: 'VO₂máx, limiar anaeróbico e potência explosiva medidos com precisão laboratorial em protocolos conduzidos por pesquisadores do LACAE. Dados que definem zonas de treino e revelam o potencial real de cada atleta.',
    techs: ['VO₂máx', 'Ergoespirometria', 'Lactato', 'Wingate'],
    img: mediaUrl('vo2.png'),
    bg: '#0a0a0f',
  },
  {
    num: '03',
    tag: 'RMN · Biomarcadores',
    title: 'Metabolômica por Ressonância Magnética',
    desc: '200+ metabólitos que revelam recuperação, adaptação ao treino e necessidades nutricionais únicas de cada atleta. Ciência que vai além do exame de sangue convencional.',
    techs: ['RMN', 'Metabolômica', '200+ Metabólitos', 'IQB · UFAL'],
    img: mediaUrl('metabolomica.png'),
    bg: '#0a0d0f',
  },
  {
    num: '04',
    tag: 'Prescrição · Nutrição de Precisão',
    title: 'Intervenção Integrada. Resultado Real.',
    desc: 'Fisiologia, biomecânica e metabolômica integradas em uma prescrição de treino e estratégia nutricional personalizada. Cada decisão é derivada diretamente dos dados coletados. Menos achismo, mais resultado.',
    techs: ['Prescrição de Treino', 'Nutrição de Precisão', 'Monitoramento'],
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=80&auto=format&fit=crop',
    bg: '#0f0a0a',
  },
]

export default function Methodology() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Aplica z-index via data-index — igual ao original
      // Imagem 01 (index 0) = z-index mais alto = aparece na frente
      document.querySelectorAll('.meth-img-wrapper').forEach((el) => {
        const idx = parseInt(el.getAttribute('data-index'))
        el.style.zIndex = idx
      })

      const imgs = gsap.utils.toArray('.meth-img-wrapper img')

      // Estado inicial — todas visíveis com clipPath inset(0)
      // A ordem z-index garante que 01 aparece na frente
      gsap.set(imgs, {
        clipPath: 'inset(0)',
        objectPosition: '0px 0%',
      })

      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.meth-arch',
          start: 'top top',
          end: 'bottom bottom',
          pin: '.meth-right',
          scrub: true,
        },
      })

      imgs.forEach((_, index) => {
        const currentImage = imgs[index]
        const nextImage = imgs[index + 1] || null
        const sectionTimeline = gsap.timeline()

        if (nextImage) {
          sectionTimeline
            .to(sectionRef.current, {
              backgroundColor: steps[index + 1].bg,
              duration: 1.5,
              ease: 'power2.inOut',
            }, 0)
            .to(currentImage, {
              clipPath: 'inset(0px 0px 100%)',
              objectPosition: '0px 60%',
              duration: 1.5,
              ease: 'none',
            }, 0)
            .to(nextImage, {
              objectPosition: '0px 40%',
              duration: 1.5,
              ease: 'none',
            }, 0)
        }

        mainTimeline.add(sectionTimeline)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: steps[0].bg }}
    >
      {/* Spacer topo */}
      <div style={{ height: '30vh' }} />

      {/* Header */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 2rem',
        marginBottom: '10vh',
      }}>
        <span style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: 11,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 16,
        }}>
          Nossa metodologia
        </span>
        <h2 style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 300,
          color: 'white',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          maxWidth: 700,
        }}>
          Como a KAIRÓS transforma{' '}
          <strong style={{ fontWeight: 800, color: '#4B7BF5' }}>
            dados em performance
          </strong>
        </h2>
      </div>

      {/* Arch — estrutura idêntica ao original */}
      <div
        className="meth-arch"
        style={{
          display: 'flex',
          gap: 60,
          justifyContent: 'space-between',
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        {/* LEFT — textos scrolláveis, cada bloco 100vh, centrado verticalmente */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 320,
          maxWidth: 400,
        }}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                height: '100vh',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <div>
                {/* número */}
                <span style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.15em',
                  display: 'block',
                  marginBottom: 14,
                }}>
                  {step.num} / 04
                </span>

                {/* tag */}
                <span style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 10,
                  color: '#4B7BF5',
                  background: 'rgba(75,123,245,0.1)',
                  border: '1px solid rgba(75,123,245,0.2)',
                  borderRadius: 99,
                  padding: '4px 14px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  marginBottom: 20,
                }}>
                  {step.tag}
                </span>

                {/* título */}
                <h3 style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 'clamp(2rem, 3vw, 2.75rem)',
                  fontWeight: 800,
                  color: 'white',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}>
                  {step.title}
                </h3>

                {/* linha azul */}
                <div style={{
                  width: 36,
                  height: 2,
                  background: '#4B7BF5',
                  borderRadius: 99,
                  marginBottom: 20,
                  opacity: 0.5,
                }} />

                {/* descrição */}
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 16,
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.75,
                  letterSpacing: '-0.01em',
                  marginBottom: 24,
                }}>
                  {step.desc}
                </p>

                {/* tech badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {step.techs.map((tech) => (
                    <span key={tech} style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.3)',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 4,
                      padding: '3px 10px',
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — pinned via ScrollTrigger
            Imagens absolutas empilhadas
            data-index: 01 = steps.length (frente), 04 = 1 (fundo) */}
        <div
          className="meth-right"
          style={{
            flexShrink: 1,
            height: '100vh',
            width: '100%',
            maxWidth: 580,
            position: 'relative',
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="meth-img-wrapper"
              data-index={steps.length - i}
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
                height: '80vh',
                width: '100%',
                borderRadius: 16,
                overflow: 'hidden',
              }}
            >
              <img
                src={step.img}
                alt={step.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
              {/* overlay escuro sutil no fundo */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10,10,10,0.45) 0%, transparent 50%)',
              }} />
              {/* badge etapa */}
              <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                <span style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.55)',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 99,
                  padding: '5px 14px',
                  backdropFilter: 'blur(8px)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  {step.num} · {step.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer fundo */}
      <div style={{ height: '30vh' }} />
    </section>
  )
}
