import { useRef, useEffect } from 'react'

export default function LogoLoop({
  items = [],
  speed = 60,
  direction = 'left',
  gap = 48,
  fadeOut = true,
  fadeColor = '#0A0A0A',
  pauseOnHover = true,
}) {
  const trackRef = useRef(null)
  const animRef = useRef(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const step = () => {
      if (!pausedRef.current) {
        posRef.current -= speed / 60
        const totalWidth = track.scrollWidth / 2
        if (Math.abs(posRef.current) >= totalWidth) posRef.current = 0
        track.style.transform = `translateX(${posRef.current}px)`
      }
      animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)

    if (pauseOnHover) {
      track.addEventListener('mouseenter', () => pausedRef.current = true)
      track.addEventListener('mouseleave', () => pausedRef.current = false)
    }

    return () => {
      cancelAnimationFrame(animRef.current)
    }
  }, [speed, pauseOnHover])

  const doubled = [...items, ...items]

  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
      {fadeOut && (
        <>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: `linear-gradient(to right, ${fadeColor}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: `linear-gradient(to left, ${fadeColor}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />
        </>
      )}
      <div ref={trackRef} style={{ display: 'flex', alignItems: 'center', gap, width: 'max-content', willChange: 'transform' }}>
        {doubled.map((item, i) => (
          <div key={i} style={{ flexShrink: 0 }}>{item}</div>
        ))}
      </div>
    </div>
  )
}
