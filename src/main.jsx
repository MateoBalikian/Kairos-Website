import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lê o valor real do safe-area-inset-top via JS (mais confiável que env() puro no iOS 18)
function applySafeAreaVar() {
  const el = document.createElement('div')
  el.style.cssText = 'position:fixed;top:0;left:0;padding-top:env(safe-area-inset-top,0px);visibility:hidden;pointer-events:none;'
  document.body.appendChild(el)
  document.documentElement.style.setProperty('--sat', getComputedStyle(el).paddingTop)
  document.body.removeChild(el)
}
applySafeAreaVar()
window.addEventListener('resize', applySafeAreaVar)

const lenis = new Lenis()
window.lenis = lenis
const lenisRafCallback = (time) => lenis.raf(time * 1000)
gsap.ticker.add(lenisRafCallback)
gsap.ticker.lagSmoothing(0)

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    gsap.ticker.remove(lenisRafCallback)
    lenis.destroy()
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
