# Site da Veltron (veltrontech.com.br)

Site institucional da Veltron — ciência aplicada ao desempenho humano (limiar de
lactato, biomecânica por vídeo, metabolômica). React + Vite + Tailwind, hospedado
na Vercel. O repositório se chama `Kairos-Website` por razões históricas, mas é o
site da Veltron.

## Quem é quem

- **Pedro** — fundador da Veltron. É professor, **não é desenvolvedor**. Conversa
  em português e pede alterações em linguagem comum. Não usa git nem terminal.
- **Mateo** — filho do Pedro, desenvolvedor, dono do repositório. Continua
  recebendo notificações de tudo e pode reverter qualquer publicação, mas não
  precisa mais aprovar cada alteração — o merge é feito pelo Claude após a
  aprovação em palavras do Pedro.
- **João** — sócio, aprova decisões administrativas de rotina. Não mexe no site.

---

## FLUXO DE TRABALHO OBRIGATÓRIO

Igual ao do site pessoal do Pedro (`MateoBalikian/pedro-balikian`). Siga em ordem.

### 1. Nunca trabalhe no `main`

```
git checkout main
git pull
git checkout -b <descricao-curta-em-kebab-case>
```

### 2. Faça a alteração

### 3. Mostre pro Pedro ANTES de commitar

```
npm run dev
```

O site fica em `http://localhost:5173`. Diga ao Pedro a **URL exata** da página
que mudou e descreva em palavras o que mudou. O site usa animações de entrada
(GSAP/Motion); para conferir texto, prefira ler a página do que tirar screenshot.

### 4. Espere a aprovação dele em palavras

"Pode subir", "aprovado", "ficou bom". Silêncio não é aprovação.

### 5. Só depois: commit, push e PR

```
git add -A
git commit -m "<mensagem curta em português>"
git push -u origin <nome-da-branch>
gh pr create --title "<título em português>" --body "<descrição>"
```

O PR deve ter: o que mudou em português simples, quais páginas foram afetadas, e a
linha `Solicitado por: Pedro`.

### 6. Publicar a alteração

Depois da aprovação do Pedro em palavras, e com build e preview da Vercel
passando, o Claude publica com:

```
gh pr merge --squash --delete-branch
```

Mudanças na lista "Não mexa sem avisar" continuam sendo enviadas ao Mateo antes.

### 7. Avise o Mateo do que foi publicado

Depois do merge, avise o Mateo (por mensagem) do que foi ao ar: link do PR
mergeado, resumo curto do que mudou, e a URL da página no site já atualizada.
A Vercel deploya automaticamente em ~1 minuto após o merge no `main`.

---

## Como conversar com o Pedro

- Sempre em português, sem jargão. Descreva a mudança em palavras, não em código.
- Pedido ambíguo? Pergunte antes.
- Mudança que afeta o site inteiro (cores, fontes, menu, rodapé, Navbar, Footer)?
  Avise que é ampla e confirme antes.

---

## Onde fica cada coisa

### Páginas (rotas em `src/App.jsx`)

| Página no site | Arquivo |
| --- | --- |
| Home (`/`) | `src/pages/Home.jsx` |
| Corrida (`/corrida`) | `src/pages/Corrida.jsx` |
| Ciclismo (`/ciclismo`) | `src/pages/Ciclismo.jsx` |
| Natação (`/natacao`) | `src/pages/Natacao.jsx` |
| Futebol (`/futebol`) | `src/pages/Futebol.jsx` |
| Limiar de lactato (`/limiar-de-lactato`) | `src/pages/LimiarLactato.jsx` |
| Metabolômica (`/metabolomica`) | `src/pages/Metabolomica.jsx` |
| Visão computacional (`/pose-estimation`) | `src/pages/PoseEstimation.jsx` |

Cabeçalho e rodapé: `src/components/Navbar.jsx` e `src/components/Footer.jsx`
(afetam todas as páginas). Outros blocos reutilizados: `EntendaCiencia.jsx`,
`LaudoExemplo.jsx`, `Philosophy.jsx`, `Waitlist.jsx` (formulário de lead, grava
no Supabase).

### Conteúdo

Os textos estão dentro dos próprios arquivos `.jsx` das páginas. Ao editar,
mexa só em strings de texto; não altere estrutura de componentes sem avisar.

Não existe blog ainda. Os textos da série "Sinais do Corpo" destinados à Veltron
ficam prontos em `OneDrive\2026\VELTRON\06_MARKETING_E_CONTEUDO\PLANO EDITORIAL DIARIO`
até o Mateo decidir como o blog entra no site.

### Imagens

Imagens locais em `public/`. Algumas imagens são servidas do Supabase Storage
(bucket `kairos-media`).

---

## Antes de abrir o PR, sempre

```
npm run build
```

Build quebrado não publica. Corrija antes.

---

## Não mexa sem avisar

- `vite.config.js`, `vercel.json`, `tailwind.config.js`, `postcss.config.js`
- `package.json` / `package-lock.json`
- `.env` (chave do Supabase) e `.gitignore`
- `src/App.jsx` (rotas) e `src/lib/` (cliente Supabase)
- este arquivo

---

## Documentação

- Vite: https://vite.dev/guide/
- React Router: https://reactrouter.com/
- Tailwind v3: https://v3.tailwindcss.com/docs
