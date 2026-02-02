import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BossApp from './BossApp.jsx'
import AdminApp from './AdminApp.jsx'
import HomeApp from './HomeApp.jsx'
import { SettingsProvider } from './context/SettingsContext'

// 根據 URL 路徑、參數或 Hash 決定顯示哪個應用
const { search, hash } = window.location

// 只檢查查詢參數和 hash，避免路徑中的字串誤判
const isAdminMode = search.includes('admin') || hash.includes('admin')
const isBossMode = search.includes('boss') || hash.includes('boss')
const isSalaryMode = search.includes('salary') || hash.includes('salary')

// 決定要渲染的應用
const getApp = () => {
  if (isAdminMode) return <AdminApp />
  if (isBossMode) return <BossApp />
  if (isSalaryMode) return <App />
  // 預設顯示首頁
  return <HomeApp />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      {getApp()}
    </SettingsProvider>
  </StrictMode>,
)
