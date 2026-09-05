import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { mediaUrl } from '../lib/supabase'
import { getPost, getPosts, formatDate } from '../lib/posts'

// Capa pode ser um arquivo em public/ (começa com "/") ou um nome no bucket do Supabase
const coverUrl = (cover) => (cover.startsWith('/') ? cover : mediaUrl(cover))

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) return <Navigate to="/blog" replace />

  const others = getPosts().filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* ─── CABEÇALHO ─── */}
      <section className="relative bg-[#0A0A0A]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-32 pb-12 lg:pt-44 lg:pb-16">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8" style={{ textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Voltar para o blog
          </Link>
          <div style={{ maxWidth: 760 }}>
            <span className="font-sans text-xs text-white/40 uppercase tracking-widest border border-white/10 rounded-full px-4 py-1.5">
              {post.category}
            </span>
            <h1 className="font-sans font-bold text-white leading-tight mt-6 mb-5" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.4rem)' }}>
              {post.title}
            </h1>
            <p className="text-white/60 leading-relaxed mb-6" style={{ fontSize: '1.1rem' }}>
              {post.description}
            </p>
            <p className="text-sm text-white/40">
              Veltron · com o Prof. Pedro Balikian · {formatDate(post.date)}{post.readingTime ? ` · ${post.readingTime}` : ''}
            </p>
          </div>
        </div>
      </section>

      {/* ─── TEXTO ─── */}
      <section className="px-6" style={{ background: '#ffffff', borderRadius: '2.5rem 2.5rem 0 0', position: 'relative', zIndex: 2 }}>
        <div className="max-w-[760px] mx-auto py-14 lg:py-20">
          {post.cover && (
            <div className="mb-12" style={{ border: '1px solid #E5E5E2', borderRadius: 24, overflow: 'hidden', padding: 12 }}>
              <img src={coverUrl(post.cover)} alt={post.title} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 14 }} />
            </div>
          )}
          <article className="post-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>

          {others.length > 0 && (
            <div className="mt-16 pt-10" style={{ borderTop: '1px solid #E5E5E2' }}>
              <span className="font-sans text-xs uppercase tracking-widest" style={{ color: '#0A2463' }}>Leia também</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {others.map((p) => (
                  <Link key={p.slug} to={`/blog/${p.slug}`} className="rounded-2xl p-5 transition-transform hover:-translate-y-0.5" style={{ background: '#F8F8F6', border: '1px solid #E5E5E2', textDecoration: 'none' }}>
                    <p className="font-sans font-bold leading-snug mb-2" style={{ color: '#0A0A0A' }}>{p.title}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: '#0A2463' }}>Ler <ArrowRight size={12} /></span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
