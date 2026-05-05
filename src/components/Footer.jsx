import { Mail, ExternalLink } from 'lucide-react'

const columns = [
  {
    title: 'Aplicações',
    links: [
      { label: 'Futebol', href: '/futebol', isRoute: true },
      { label: 'Ciclismo', href: '/ciclismo', isRoute: true },
      { label: 'Natação', href: '/natacao', isRoute: true },
    ],
  },
  {
    title: 'Contato',
    links: [
      { label: 'contato@veltrontech.com.br', href: 'mailto:contato@veltrontech.com.br' },
      { label: '@veltrontech_', href: 'https://instagram.com/veltrontech_', external: true },
      { label: 'Parcerias', href: '#' },
    ],
  },
]


export default function Footer() {
  return (
    <footer className="bg-[#0A2463] rounded-t-[3rem] mt-auto" style={{ borderRadius: '2.5rem 2.5rem 0 0', marginTop: '-2.5rem', position: 'relative', zIndex: 1 }}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 pt-16 pb-8">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 mb-16">
          {/* Brand */}
          <div className="max-w-xs mx-auto lg:mx-0 text-center lg:text-left">
            <div className="font-mono text-lg tracking-[0.3em] font-medium text-white uppercase mb-3">
              Veltron
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
                Veltron — Sistema Ativo
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col justify-start gap-3">
            <a
              href="#waitlist"
              onClick={(e) => {
                e.preventDefault()
                const t = document.querySelector('#waitlist')
                if (window.lenis) window.lenis.scrollTo(t, { duration: 1.4, easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)) })
                else t?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-magnetic btn-slide inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#0A2463] bg-white rounded-full"
            >
              <div className="slide-fill bg-[#F8F8F6]" />
              <span>Entre em contato</span>
            </a>
            <a
              href="mailto:contato@veltrontech.com.br"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200 justify-center"
            >
              <Mail size={14} />
              contato@veltrontech.com.br
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 mb-16 border-t border-white/10 pt-10">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.isRoute ? (
                      <a
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white transition-colors duration-200 hover:-translate-y-px inline-block"
                      >
                        {link.label}
                      </a>
                    ) : link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/50 hover:text-white transition-colors duration-200 hover:-translate-y-px inline-block"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (link.href.startsWith('#')) {
                            e.preventDefault()
                            const target = document.querySelector(link.href)
                            if (window.lenis) window.lenis.scrollTo(target, { duration: 1.4, easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)) })
                            else target?.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                        className="text-sm text-white/50 hover:text-white transition-colors duration-200 hover:-translate-y-px inline-block"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-white/30">
            © 2025 Veltron — Ciência aplicada ao desempenho humano
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
