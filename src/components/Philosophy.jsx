import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const IMG_PADDING = 12

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[120vh] lg:h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  )
}

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0"
        style={{ opacity, background: 'rgba(10,10,10,0.6)' }}
      />
    </motion.div>
  )
}

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [250, -250])
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0])

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white px-6"
    >
      <p className="mb-3 text-center text-xl md:text-2xl font-light text-white/60 font-sans">
        {subheading}
      </p>
      <p className="text-center text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight font-sans">
        {heading}
      </p>
    </motion.div>
  )
}

const ContentBlock = ({ children }) => (
  <div className="bg-[#0A0A0A] px-5 py-12 md:px-8 md:py-24">
    <div className="max-w-[1200px] mx-auto">
      {children}
    </div>
  </div>
)

export default function Philosophy() {
  return (
    <section id="lacae" className="bg-[#0A0A0A]" style={{ borderRadius: '2.5rem 2.5rem 0 0', marginTop: '-2.5rem', position: 'relative', zIndex: 1 }}>

      {/* Seção 1 */}
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1400&q=80&auto=format&fit=crop"
        subheading="Durante décadas,"
        heading="essa tecnologia existiu apenas em centros olímpicos."
      >
        <ContentBlock>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <span className="font-mono text-xs text-[#4B7BF5] uppercase tracking-widest">O manifesto da KAIRÓS</span>
              <h3 className="font-sans font-bold text-3xl lg:text-4xl text-white mt-4 leading-tight">
                Reservada para poucos.<br />
                <span className="text-[#4B7BF5]">Agora disponível para todos.</span>
              </h3>
            </div>
            <div>
              <p className="text-white/60 text-base lg:text-lg leading-relaxed">
                Diagnósticos fisiológicos de precisão — VO₂máx, metabolômica por RMN, biomecânica computacional — eram ferramentas exclusivas de grandes centros esportivos e laboratórios de pesquisa de elite. Atletas comuns, times regionais e profissionais de saúde simplesmente não tinham acesso.
              </p>
            </div>
          </div>
        </ContentBlock>
      </TextParallaxContent>

      {/* Seção 2 */}
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1400&q=80&auto=format&fit=crop"
        subheading="A KAIRÓS"
        heading="mudou isso."
      >
        <ContentBlock>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="font-mono text-xs text-[#4B7BF5] uppercase tracking-widest">Base institucional</span>
              <h3 className="font-sans font-bold text-3xl lg:text-4xl text-white mt-4 leading-tight">
                Ciência universitária.<br />
                <span className="text-[#4B7BF5]">Aplicação real.</span>
              </h3>
            </div>
            <div>
              <p className="text-white/60 text-base lg:text-lg leading-relaxed mb-8">
                A KAIRÓS é uma deep tech vinculada ao ecossistema de inovação da{' '}
                <span className="text-white font-medium">Universidade Federal de Alagoas (UFAL)</span>,
                com pesquisa clínica validada no{' '}
                <span className="text-white font-medium">Hospital Universitário Professor Alberto Antunes (HUPAA/EBSERH)</span>.
                Cada avaliação é construída sobre metodologia científica revisada por pares.
              </p>
              <div className="flex flex-wrap gap-8">
                {[
                  { val: 'UFAL', desc: 'Universidade Federal de Alagoas' },
                  { val: '99.5%', desc: 'Precisão do modelo preditivo' },
                  { val: 'HUPAA', desc: 'Pesquisa clínica translacional' },
                  { val: 'RMN', desc: 'Ressonância Magnética Nuclear' },
                ].map((s) => (
                  <div key={s.val}>
                    <div className="font-mono text-xl font-medium text-[#4B7BF5]">{s.val}</div>
                    <div className="text-xs text-white/40 mt-0.5">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContentBlock>
      </TextParallaxContent>

    </section>
  )
}
