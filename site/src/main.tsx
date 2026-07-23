import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/index.css'
import App from './App.tsx'
import MenuOverlay from './Components/MenuOverlay.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <MenuOverlay />
  </StrictMode>,
)
