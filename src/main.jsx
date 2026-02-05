import { StrictMode, lazy, Suspense } from 'react'
const App = lazy(() => import('./App.jsx'))
const BossApp = lazy(() => import('./BossApp.jsx'))
const AdminApp = lazy(() => import('./AdminApp.jsx'))
const HomeApp = lazy(() => import('./HomeApp.jsx'))

import { createRoot } from 'react-dom/client'
import './index.css'
import { SettingsProvider } from './context/SettingsContext'
import PinGuard from './components/common/PinGuard'
import Loading from './components/common/Loading'
import ErrorBoundary from './components/common/ErrorBoundary'

// 根據 URL 路徑、參數或 Hash 決定顯示哪個應用
const { search, hash } = window.location
const params = new URLSearchParams(search)
const normalizedHash = hash.replace(/^#/, '').toLowerCase()
const hashSegments = normalizedHash.split(/[/?&=]/).filter(Boolean)

const isModeEnabled = (mode) => {
  const lowerMode = mode.toLowerCase()
  const modeParam = (params.get('mode') || '').toLowerCase()

  return (
    modeParam === lowerMode ||
    params.has(lowerMode) ||
    hashSegments.includes(lowerMode)
  )
}

const isAdminMode = isModeEnabled('admin')
const isBossMode = isModeEnabled('boss')
const isSalaryMode = isModeEnabled('salary')

// 決定要渲染的應用
const AppRoute = () => {
  if (isAdminMode) {
    return (
      <PinGuard target="admin">
        <AdminApp />
      </PinGuard>
    )
  }
  if (isBossMode) {
    return (
      <PinGuard target="boss">
        <BossApp />
      </PinGuard>
    )
  }
  if (isSalaryMode) return <App />
  // 預設顯示首頁
  return <HomeApp />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <AppRoute />
        </Suspense>
      </ErrorBoundary>
    </SettingsProvider>
  </StrictMode>,
)
