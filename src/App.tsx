import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/routes'
import { ToastProvider } from './contexts/ToastContext'
import { AppThemeProvider } from './contexts/ThemeContext'
import { MobileDrawerProvider } from './contexts/MobileDrawerContext'
import { useAppSelector } from './store/hooks'
import {
  selectIsAuthenticated,
  selectCurrentUser
} from './store/slices/auth/authSlice'
import { useGetCurrentUserQuery } from './store/slices/api/auth.api'
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
