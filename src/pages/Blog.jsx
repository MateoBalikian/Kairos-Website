import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { mediaUrl } from '../lib/supabase'
import { getPosts, formatDate } from '../lib/posts'

// Capa pode ser um arquivo em public/ (começa com "/") ou um nome no bucket do Supabase
const coverUrl = (cover) => (cover.startsWith('/') ? cover : mediaUrl(cover))

export default function Blog() {
  const posts = getPosts()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative flex items-center overflow-hidden bg-[#0A0A0A]">
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 w-full">
          <div className="flex flex-col justify-center pt-32 pb-16 lg:pt-44 lg:pb-24" style={{ maxWidth: 720 }}>
            <div className="mb-4">
              <span className="font-sans text-xs text-white/40 uppercase tracking-widest border border-white/10 rounded-full px-4 py-1.5">
                Blog
              </span>
            </div>
            <h1 className="font-sans font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              Sinais do corpo,<br />
              <span style={{ color: '#4B7BF5' }}>medidos.</span>
            </h1>
            <p className="text-white/60 leading-relaxed" style={{ fontSize: '1.05rem', maxWidth: 560 }}>
              O que acontece por dentro de quem treina, e como a gente mede. Textos da Veltron com o Prof. Pedro Balikian.
            </p>
          </div>
        </div>
      </section>

      {/* ─── LISTA ─── */}
      <section className="py-16 lg:py-24 px-6" style={{ background: '#ffffff', borderRadius: '2.5rem 2.5rem 0 0', position: 'relative', zIndex: 2 }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col rounded-3xl overflow-hidden transition-transform hover:-translate-y-1"
                style={{ background: '#F8F8F6', border: '1px solid #E5E5E2', textDecoration: 'none' }}
              >
                {post.cover && (
                  <div style={{ aspectRatio: '16 / 10', overflow: 'hidden' }}>
                    <img
                      src={coverUrl(post.cover)}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6 lg:p-8 flex flex-col flex-1">
                  <span className="font-sans text-xs uppercase tracking-widest" style={{ color: '#0A2463' }}>
                    {post.category}
                  </span>
                  <h2 className="font-sans font-bold mt-3 mb-3 leading-tight" style={{ fontSize: '1.35rem', color: '#0A0A0A' }}>
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#4A4A47] leading-relaxed mb-6">
                    {post.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-xs text-[#4A4A47]">
                    <span>{formatDate(post.date)}{post.readingTime ? ` · ${post.readingTime}` : ''}</span>
                    <span className="inline-flex items-center gap-1 font-semibold" style={{ color: '#0A2463' }}>
                      Ler <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
