import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Seção "tradutora": pega cada termo técnico da Veltron e explica em linguagem
// simples (o que é numa frase + por que importa). Lista aberta, sem jargão.
// Reutilizada na Home e nas páginas de esporte; o exemplo da biomecânica
// se adapta à modalidade via prop `esporte`.

const EXEMPLOS_BIO = {
  corrida: 'a perna que empurra mais que a outra, o tronco que cede quando bate o cansaço',
  ciclismo: 'o joelho que foge da linha na pedalada, o quadril que balança na sela',
  natacao: 'a braçada que encurta no fim da série, a rotação desigual do corpo na água',
  geral: 'a perna que empurra mais, o quadril que cede quando bate o cansaço',
}

const termos = (esporte) => [
  {
    nome: 'Biomecânica',
    sub: 'Pose Estimation',
    trad: 'uma câmera comum que vira laboratório de movimento',
    texto: `A IA marca suas articulações quadro a quadro no vídeo — sem sensor nenhum no corpo — e mede ângulos, simetria e técnica. Mostra o que o olho não pega: ${EXEMPLOS_BIO[esporte] || EXEMPLOS_BIO.geral}.`,
    link: '/pose-estimation',
  },
  {
    nome: 'Limiar de Lactato',
    sub: null,
    trad: 'o ponto em que o esforço vira ladeira',
    texto: 'Seu corpo sempre produz lactato. Em ritmo leve, ele é reaproveitado na mesma velocidade que aparece — dá pra segurar por horas. Passando de um certo ponto, ele acumula rápido e o cansaço dispara. Esse ponto é o seu limiar: saber onde ele está define o ritmo certo de treino e de prova.',
    link: '/limiar-de-lactato',
  },
  {
    nome: 'Metabolômica',
    sub: 'o Mapa Fisiometabólico',
    trad: 'o raio-x do seu motor por dentro',
    texto: 'A leitura de centenas de moléculas da sua saliva ou urina — as que o corpo usa pra gerar energia, se recuperar e se defender. O resultado é o seu Mapa Fisiometabólico: aponta overtraining, inflamação e carências semanas antes de você sentir, coisas que o exame de sangue comum não mostra.',
    link: '/metabolomica',
  },
  {
    nome: 'Veltron Engine AI',
    sub: null,
    trad: 'onde os três viram um diagnóstico só',
    texto: 'Biomecânica, lactato e metabolômica analisados juntos por inteligência artificial. Em vez de três exames soltos, um retrato único: onde a sua técnica, o seu motor e a sua recuperação se encontram — e o que fazer com isso.',
    link: null,
  },
]

export default function EntendaCiencia({ esporte = 'geral' }) {
  const itens = termos(esporte)

  return (
    <section className="py-16 lg:py-24 xl:py-32 px-5 md:px-6" style={{ background: '#0A0A0A' }}>
      <div className="max-w-[1100px] mx-auto">

        <div className="mb-12 lg:mb-16 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#4B7BF5' }}>Sem jargão</span>
          <h2 className="font-sans font-bold text-white mt-3 leading-tight" style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.8rem)' }}>
            O que isso significa,{' '}
            <span style={{ color: '#4B7BF5' }}>na real.</span>
          </h2>
          <p className="text-white/50 mt-4 leading-relaxed" style={{ fontSize: '1rem' }}>
            Sem termo difícil: o que cada análise da Veltron mede de verdade — e por que isso muda o seu treino.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-9 lg:gap-y-11">
          {itens.map((t) => (
            <div key={t.nome} className="pt-6" style={{ borderTop: '1px solid rgba(75,123,245,0.25)' }}>
              <div className="flex items-baseline gap-2 flex-wrap mb-2">
                <h3 className="font-sans font-bold text-white" style={{ fontSize: '1.15rem' }}>{t.nome}</h3>
                {t.sub && <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">· {t.sub}</span>}
              </div>
              <p className="italic mb-3 leading-snug" style={{ color: '#7BA7E8', fontSize: '0.98rem' }}>"{t.trad}"</p>
              <p className="text-white/55 text-sm leading-relaxed">{t.texto}</p>
              {t.link && (
                <Link to={t.link} className="inline-flex items-center gap-1.5 mt-3 font-sans font-semibold text-xs hover:gap-2.5 transition-all" style={{ color: '#4B7BF5' }}>
                  Entenda a fundo <ArrowRight size={13} />
                </Link>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
