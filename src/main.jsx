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

// 只檢查查詢參數和 hash，避免路徑中的字串誤判
const isAdminMode = search.includes('admin') || hash.includes('admin')
const isBossMode = search.includes('boss') || hash.includes('boss')
const isSalaryMode = search.includes('salary') || hash.includes('salary')

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

