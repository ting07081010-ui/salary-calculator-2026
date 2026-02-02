import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BossApp from './BossApp.jsx'

// 根據 URL 路徑、參數或 Hash 決定顯示哪個應用
const { pathname, search, hash } = window.location
const isBossMode = pathname.includes('/boss') ||
  pathname.includes('boss.html') ||
  search.includes('boss') ||
  hash.includes('boss')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isBossMode ? <BossApp /> : <App />}
  </StrictMode>,
)

