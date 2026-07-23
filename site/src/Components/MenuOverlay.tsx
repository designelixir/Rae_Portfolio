import { useEffect, useRef, useState, type CSSProperties } from 'react'

type Bubble = {
  id: number
  dx: number
  dy: number
  size: number
  delay: number
}

function makeBubbles(count: number, seed: number): Bubble[] {
  return Array.from({ length: count }, (_, i) => ({
    id: seed + i,
    dx: 10 + Math.random() * 22,
    dy: (Math.random() - 0.5) * 30,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 0.12,
  }))
}

function MenuOverlay() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const nextBubbleId = useRef(0)
  const navRef = useRef<HTMLElement>(null)
  const [navSize, setNavSize] = useState({ width: 0, height: 0 })

  // Measured from the real nav's content, not guessed -- scrollWidth reads
  // the full unclipped content size even while max-width:0 hides it, so this
  // stays accurate whether the menu is open or closed. (Padding is no longer
  // part of the open/close transition, on purpose: animating it would also
  // change scrollWidth/offsetHeight mid-transition and make the blob chase a
  // moving target.)
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const measure = () => setNavSize({ width: nav.scrollWidth, height: nav.offsetHeight })
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(nav)
    return () => observer.disconnect()
  }, [])

  const toggleMenu = () => {
    const opening = !isMenuOpen
    setIsMenuOpen(opening)

    if (opening) {
      const fresh = makeBubbles(6, nextBubbleId.current)
      nextBubbleId.current += fresh.length
      setBubbles(fresh)
      window.setTimeout(() => setBubbles([]), 700)
    }
  }

  return (
    <div
      id="menu-overlay"
      className={`slide-in-bottom flex-center-center no-flex-grow${isMenuOpen ? ' is-open' : ''}`}
      style={ { '--menu-shift': isMenuOpen ? `${(10 + navSize.width) / 2}px` : '0px', } as CSSProperties }
    >
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="menu-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -11"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>

      <div className="menu-goo-layer" style={ { '--menu-blob-open-w': `${navSize.width}px`, '--menu-blob-open-h': `${navSize.height}px`, } as CSSProperties } >
        <div className="menu-blob menu-blob-button" />
        <div className={`menu-blob menu-blob-nav${isMenuOpen ? ' is-open' : ''}`} />
      </div>

      <div className="menu-bubble-layer">
        {bubbles.map((b) => (
          <span key={b.id} className="menu-bubble" style={ { width: b.size, height: b.size, animationDelay: `${b.delay}s`, '--bubble-dx': `${b.dx}px`, '--bubble-dy': `${b.dy}px`, } as CSSProperties } />
        ))}
      </div>

      <button type="button" className="site-nav-toggle-button" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} onClick={toggleMenu} >
        <span className={`hamburger-icon${isMenuOpen ? ' is-open' : ''}`}>
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </span>
      </button>
      <nav ref={navRef} className={`site-nav flex-center-center no-flex-grow${isMenuOpen ? ' is-open' : ''}`}>
        <a className="site-nav-link" href="/work"> Projects </a>
        <img src="/public/star.svg" className="star-icon" alt="star decorative icon"></img>
        <a className="site-nav-link" href="/work"> About </a>
        <img src="/public/star.svg" className="star-icon" alt="star decorative icon"></img>
        <a className="site-nav-link" href="/work"> Contact </a>
        <img src="/public/star.svg" className="star-icon" alt="star decorative icon"></img>
        <a className="site-nav-bubble hover" href="https://www.linkedin.com/in/meganraebyers/" target="_blank"><img src="/public/icons/linkedin.png" alt="LinkedIn icon"></img></a>

      </nav>
    </div>
  )
}

export default MenuOverlay
