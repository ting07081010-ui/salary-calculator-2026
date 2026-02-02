import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BossApp from './BossApp.jsx'

// 根據 URL 路徑決定顯示哪個應用
const pathname = window.location.pathname
const isBossMode = pathname.includes('/boss') || pathname.includes('boss.html')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isBossMode ? <BossApp /> : <App />}
  </StrictMode>,
)

