import { Mail, ExternalLink } from 'lucide-react'

const columns = [
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre', href: '#sobre' },
      { label: 'LACAE', href: '#lacae' },
      { label: 'Pesquisa', href: '#' },
      { label: 'Time', href: '#' },
    ],
  },
  {
    title: 'Produtos',
    links: [
      { label: 'Trocker', href: '#produtos' },
      { label: 'Metabolômica', href: '#produtos' },
      { label: 'Em breve', href: '#' },
    ],
  },
  {
    title: 'Contato',
    links: [
      { label: 'contato@kairostechs.com', href: 'mailto:contato@kairostechs.com' },
      { label: 'Parcerias', href: '#' },
      { label: 'Imprensa', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A2463] rounded-t-[3rem] mt-auto" style={{ borderRadius: '2.5rem 2.5rem 0 0', marginTop: '-2.5rem', position: 'relative', zIndex: 1 }}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 pt-16 pb-8">

        {/* Top row */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 mb-16">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="font-mono text-lg tracking-[0.3em] font-medium text-white uppercase mb-3">
              KAIRÓS
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Ciência aplicada ao momento certo.
            </p>
            <p className="text-xs text-white/30 mt-4 leading-relaxed">
              Startup brasileira de ciência do esporte. Combinando IA, visão computacional
              e metabolômica para diagnóstico e predição de desempenho atlético.
            </p>

            {/* System status */}
            <div className="mt-6 inline-flex items-center gap-2 border border-white/10 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7BA7E8] animate-pulse" />
              <span className="font-mono text-[10px] text-[#7BA7E8] uppercase tracking-wider">
                LACAE — Sistema Ativo
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col justify-start gap-3">
            <a
              href="#waitlist"
              className="btn-magnetic btn-slide inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#0A2463] bg-white rounded-full"
            >
              <div className="slide-fill bg-[#F8F8F6]" />
              <span>Entre em contato</span>
            </a>
            <a
              href="mailto:contato@kairostechs.com"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200 justify-center"
            >
              <Mail size={14} />
              contato@kairostechs.com
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-16 border-t border-white/10 pt-10">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200 hover:-translate-y-px inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-white/30">
            © 2025 KAIROS — Ciência aplicada ao desempenho humano
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors duration-200">
              Privacidade
            </a>
            <a href="#" className="font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors duration-200">
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
