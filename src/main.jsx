import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BossApp from './BossApp.jsx'
import AdminApp from './AdminApp.jsx'
import { SettingsProvider } from './context/SettingsContext'

// 根據 URL 路徑、參數或 Hash 決定顯示哪個應用
const { pathname, search, hash } = window.location

const isAdminMode = pathname.includes('/admin') ||
  pathname.includes('admin.html') ||
  search.includes('admin') ||
  hash.includes('admin')

const isBossMode = pathname.includes('/boss') ||
  pathname.includes('boss.html') ||
  search.includes('boss') ||
  hash.includes('boss')

// 決定要渲染的應用
const getApp = () => {
  if (isAdminMode) return <AdminApp />
  if (isBossMode) return <BossApp />
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      {getApp()}
    </SettingsProvider>
  </StrictMode>,
)
