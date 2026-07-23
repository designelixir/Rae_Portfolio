import { useEffect, useRef } from 'react'
import neonSignSvg from '../../public/objects/neon-sign.svg?raw'


// Letter -> glow pairing computed from actual rendered geometry
// (getBoundingClientRect nearest-neighbor match) -- the glow layer's own
// ids/data-names in this file don't reliably match the letters they belong
// to, so name-matching would have paired several wrong.
const PAIRS: [string, string][] = [
  ['R', 'R-Glow'], ['I-2', 'I-0-Glow'], ['X', 'X-Glow'], ['I-1', 'I-Glow'],
  ['L', 'E-0-Glow'], ['E-1', 'E-0-Glow-2'], ['N', 'N-Glow'], ['G', 'G-Glow'],
  ['I-0', 'I-0-Glow-2'], ['S', 'S-Glow'], ['E-0', 'E-0-Glow-3'], ['D', 'D-Glow'],
]
const STUDIO_IDS = ['studio-1', 'studio-2', 'studio-3', 'studio-4', 'studio-5', 'studio-6']

type Target = { outline: SVGElement; glow: SVGElement | null }

export default function NeonSign() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const studioGlow = root.querySelector<SVGElement>('#studio-glow image')

    const targets: Target[] = [
      ...PAIRS.map(([outlineId, glowId]) => ({
        outline: root.querySelector<SVGElement>(`#${CSS.escape(outlineId)}`),
        glow: root.querySelector<SVGElement>(`#${CSS.escape(glowId)}`),
      })),
      ...STUDIO_IDS.map((id) => ({
        outline: root.querySelector<SVGElement>(`#${CSS.escape(id)}`),
        glow: studioGlow,
      })),
    ].filter((t): t is Target => t.outline !== null)

    let timeoutId: number

    function blink(target: Target) {
      const { outline, glow } = target
      outline.style.fill = '#888888'
      outline.style.stroke = '#333333'
      if (glow) glow.style.opacity = '0.25'
      window.setTimeout(() => {
        outline.style.fill = ''
        outline.style.stroke = ''
        if (glow) glow.style.opacity = ''
      }, 100)
    }

    function pickRandom(count: number): Target[] {
      const pool = targets.slice()
      const picked: Target[] = []
      while (picked.length < count && pool.length) {
        const i = Math.floor(Math.random() * pool.length)
        picked.push(pool.splice(i, 1)[0])
      }
      return picked
    }

    function trigger() {
      const count = 1 + Math.floor(Math.random() * 3) // 1-3 at a time
      pickRandom(count).forEach(blink)
      schedule()
    }

    function schedule() {
      const delay = 5000 + Math.random() * 5000 // 5-10s
      timeoutId = window.setTimeout(trigger, delay)
    }

    schedule()

    return () => window.clearTimeout(timeoutId)
  }, [])

  return <div id="neon-image" ref={containerRef} dangerouslySetInnerHTML={{ __html: neonSignSvg }}/>
}
