// Carrega os textos do blog a partir de src/content/blog/*.md
// Cada arquivo tem um cabeçalho (frontmatter) entre linhas "---" e o texto em Markdown.

const files = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }
  return { data, content: match[2] }
}

const posts = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '')
    const { data, content } = parseFrontmatter(raw)
    return { slug, ...data, date: data.date || '', content }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getPosts() {
  return posts
}

export function getPost(slug) {
  return posts.find((p) => p.slug === slug)
}

export function formatDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}
