import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import { dispatchScrollProgress } from './scrollProgress'

const CAMERA_POSITION: [number, number, number] = [0, 0, 8]
const CAMERA_FOV = 50
const BACKGROUND_COLOR = '#14143c'

// Mirrors #layer0-wall-texture's two-segment scale formula in index.css,
// purely so the debug readout below can show its live value -- keep these
// in sync if that CSS rule's numbers ever change.
const WALL_SCALE_START = 10
const WALL_SCALE_MID = 4
const WALL_SCALE_END = 1
const WALL_MID_POINT = 0.45 // scroll fraction where scale hits WALL_SCALE_MID

function wallScaleAt(scroll: number) {
  if (scroll <= WALL_MID_POINT) {
    const t = scroll / WALL_MID_POINT
    return WALL_SCALE_START - (WALL_SCALE_START - WALL_SCALE_MID) * t
  }
  const t = (scroll - WALL_MID_POINT) / (1 - WALL_MID_POINT)
  return WALL_SCALE_MID - (WALL_SCALE_MID - WALL_SCALE_END) * t
}

function Rig() {
  const scroll = useScroll()
  const lastPublished = useRef(-1)

  useFrame(() => {
    // The DOM overlay in App.tsx (wall/window/neon) reads this CSS variable
    // for its own scroll-synced zoom. Writing a custom property triggers a
    // style recalc for every element referencing it, so only write when it's
    // actually moved instead of unconditionally every frame.
    const rounded = Math.round(scroll.offset * 500) / 500 // ~0.002 steps
    if (rounded !== lastPublished.current) {
      lastPublished.current = rounded
      document.documentElement.style.setProperty('--scroll-progress', rounded.toFixed(3))
      const debug = document.getElementById('scroll-debug')
      if (debug) debug.textContent = `scroll: ${Math.round(rounded * 100)}%`
      const wallDebug = document.getElementById('wall-scale-debug')
      if (wallDebug) wallDebug.textContent = `wall scale: ${wallScaleAt(rounded).toFixed(2)}x`
      dispatchScrollProgress(rounded)
    }
  })

  return null
}

export default function Scene() {
  return (
    <Canvas camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}>
      <color attach="background" args={[BACKGROUND_COLOR]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <ScrollControls pages={5} damping={0.25}>
        <Rig />
      </ScrollControls>
    </Canvas>
  )
}
