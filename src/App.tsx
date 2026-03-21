import { BrowserRouter } from 'react-router-dom'
import { MobileDrawerProvider } from './contexts/MobileDrawerContext'
import { AppThemeProvider } from './contexts/ThemeContext'
import { ToastProvider } from './contexts/ToastContext'
import AppRoutes from './routes/routes'
import { useAppSelector } from './store/hooks'
import { useGetCurrentUserQuery } from './store/slices/api/auth.api'
import {
  selectIsAuthenticated,
  selectCurrentUser
} from './store/slices/auth/authSlice'
import { GlobalStyle } from './styles/globalStyles'

function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const currentUser = useAppSelector(selectCurrentUser)

  useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated || !!currentUser
  })

  return (
    <AppThemeProvider>
      <ToastProvider>
        <MobileDrawerProvider>
          <BrowserRouter>
            <GlobalStyle />
            <AppRoutes />
          </BrowserRouter>
        </MobileDrawerProvider>
      </ToastProvider>
    </AppThemeProvider>
  )
}

export default App
