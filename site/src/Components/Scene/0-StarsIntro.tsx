import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { onScrollProgress } from '../../scrollProgress'

// --- Tunable scroll breakpoints, in order along the timeline --------------

// 0% -> TEXT_FADE_END: everything tagged .welcome-text-animate fades from
// opacity 1 to 0.
const TEXT_FADE_END = 0.1

// 0% -> SCALE_SETTLE_START: #layer0a-mountains holds at SCALE_START (a big
// establishing-shot zoom-in). SCALE_SETTLE_START -> SCALE_SETTLE_END: eases
// down to SCALE_MID.
const SCALE_START = 2
const SCALE_MID = 1
const SCALE_SETTLE_START = 0.15
const SCALE_SETTLE_END = 0.45

// SCALE_SETTLE_END -> SCALE_SHRINK_START: holds at SCALE_MID.
// SCALE_SHRINK_START -> SCALE_SHRINK_END: eases down to SCALE_END, landing
// #layer0a-mountains in its final size/position to match the room's
// window-cut, right as the room finishes scaling out around it.
const SCALE_END = 0.3
const SCALE_SHRINK_START = 0.56
const SCALE_SHRINK_END = 1

// How far #layer0a-mountains' anchor point (`top`) climbs during the
// SCALE_SHRINK_START -> SCALE_SHRINK_END shrink, in percentage points --
// tuned to land it in the room's window-cut spot by SCALE_SHRINK_END.
const TOP_SWING = 25.1856

// Linear throughout, to match #layer0-wall-texture's own pace/pattern in
// index.css (a plain calc() ramp with no easing applied).
function mountainsScaleAt(scroll: number) {
  if (scroll <= SCALE_SETTLE_START) return SCALE_START
  if (scroll <= SCALE_SETTLE_END) {
    const t = (scroll - SCALE_SETTLE_START) / (SCALE_SETTLE_END - SCALE_SETTLE_START)
    return gsap.utils.interpolate(SCALE_START, SCALE_MID, t)
  }
  if (scroll <= SCALE_SHRINK_START) return SCALE_MID
  if (scroll <= SCALE_SHRINK_END) {
    const t = (scroll - SCALE_SHRINK_START) / (SCALE_SHRINK_END - SCALE_SHRINK_START)
    return gsap.utils.interpolate(SCALE_MID, SCALE_END, t)
  }
  return SCALE_END
}

function mountainsTopAt(scroll: number) {
  // The anchor point only moves during the final shrink phase -- before
  // that it sits dead-center (50%).
  const t = gsap.utils.clamp(0, 1, (scroll - SCALE_SHRINK_START) / (SCALE_SHRINK_END - SCALE_SHRINK_START))
  return `${50 - TOP_SWING * t}%`
}

export default function StarsIntro() {
  const mountainsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const textEls = gsap.utils.toArray<HTMLElement>('.welcome-text-animate')
    const fadeOut = gsap.timeline({ paused: true }).to(textEls, { opacity: 0, ease: 'none' })

    // xPercent/yPercent replace the CSS translate(-50%,-50%) centering trick
    // -- once GSAP owns `scale` on this element it owns the whole transform,
    // so the centering has to be expressed as GSAP properties too or it gets
    // clobbered.
    gsap.set(mountainsRef.current, { xPercent: -50, yPercent: -50 })

    const unsubscribe = onScrollProgress((progress) => {
      fadeOut.progress(gsap.utils.clamp(0, 1, progress / TEXT_FADE_END))
      if (mountainsRef.current) {
        gsap.set(mountainsRef.current, { scale: mountainsScaleAt(progress), top: mountainsTopAt(progress) })
      }
    })

    return () => {
      unsubscribe()
      fadeOut.kill()
    }
  }, [])

  return (
    <>
      <style>{`
        
        #layer0-intro-frame { position: fixed; inset: 0; overflow: hidden; z-index: 0; pointer-events: none; }
        #layer0a-mountains {position: absolute; top: 50%; left: 50%; height: 100vh; aspect-ratio: 1544.35 / 1114.14; overflow: hidden; background: var(--blue-9); background-image: url('/scene/layer0a-mountains.svg'); background-size: cover; background-position: center bottom; background-repeat: no-repeat; pointer-events: none; }
        #layer0b-stars {background-image: url('/scene/layer0b-stars.svg'); width: 100%; height: 100%; background-repeat: no-repeat; background-position: center top; background-size: 100vh auto;}
        #layer0c-intro {height: 100%;}


        #layer0d-welcome { width: 15vw; border: 1px solid teal; min-width: 200px; margin-top: 5vh; }
        #layer0d-logo-placeholder {height: 40vh;}
        #layer0d-all-in-one { min-width: 400px; width: 40vw; }
        #layer0d-arrow {height: 25px;}

      `}</style>
      <div id="layer0-intro-frame">
        <div id="layer0a-mountains" ref={mountainsRef} className="flex-center-center">
          <div id="layer0b-stars" className='flex-center-center flex-column'>
              <div id="layer0c-intro" className="slide-in-fwd-center flex-center-start flex-column full-width">
                  <img id="layer0d-welcome" className="welcome-text-animate vibrate-1" src="/scene/text/welcome.svg"></img>
                  <div id="layer0d-logo-placeholder"></div>
                  <img className="welcome-text-animate vibrate-1" id="layer0d-all-in-one"  src="/scene/text/all-in-one.svg"></img>
              </div>
              <div id="layer0d-scroll-indicator" className='flex-center-center flex-column'>
                      <img id="layer0d-arrow" className="bounce" src="/objects/down-arrow.svg" alt="scroll down indicator arrow"></img>
                      <p className="white-text welcome-text-animate">come on in, scroll a while</p>
                  </div>


          </div>
        </div>
      </div>
    </>
  )
}
