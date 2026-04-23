import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Prevent image zoom/save on mobile and desktop
if (typeof window !== 'undefined') {
  // Disable pinch-to-zoom (iOS gesture events)
  const blockGesture = (e: Event) => e.preventDefault()
  document.addEventListener('gesturestart', blockGesture)
  document.addEventListener('gesturechange', blockGesture)
  document.addEventListener('gestureend', blockGesture)

  // Disable double-tap zoom
  let lastTouchEnd = 0
  document.addEventListener(
    'touchend',
    (e) => {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) e.preventDefault()
      lastTouchEnd = now
    },
    { passive: false },
  )

  // Disable right-click / context menu on images
  document.addEventListener('contextmenu', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'IMG') e.preventDefault()
  })

  // Disable image drag globally
  document.addEventListener('dragstart', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'IMG') e.preventDefault()
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
