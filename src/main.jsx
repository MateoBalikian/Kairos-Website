import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis()
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
