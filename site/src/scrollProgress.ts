// Scroll lives inside drei's <ScrollControls>, not the real page, so nothing
// outside the R3F tree can read it directly. Scene.tsx's Rig is the one place
// that already computes it each frame; this is just how it broadcasts that
// value out to plain DOM components (GSAP-driven or otherwise) that want to
// react to it without reaching back into the canvas.
export const SCROLL_PROGRESS_EVENT = 'scene:scroll-progress'

export function dispatchScrollProgress(progress: number) {
  window.dispatchEvent(new CustomEvent<number>(SCROLL_PROGRESS_EVENT, { detail: progress }))
}

/** Subscribes to scroll progress (0-1). Returns an unsubscribe function. */
export function onScrollProgress(handler: (progress: number) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<number>).detail)
  window.addEventListener(SCROLL_PROGRESS_EVENT, listener)
  return () => window.removeEventListener(SCROLL_PROGRESS_EVENT, listener)
}
