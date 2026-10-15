import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@mantine/core/styles.css"
import { AppProviders } from './providers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>,
)
