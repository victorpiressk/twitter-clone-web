import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import AppRoutes from './routes/routes'
import { ToastProvider } from './contexts/ToastContext'
import { PostProvider } from './contexts/PostContext'
import { useAppSelector } from './store/hooks'
import {
  selectIsAuthenticated,
  selectCurrentUser
} from './store/slices/auth/authSlice'
import { useGetCurrentUserQuery } from './store/slices/api'
import { GlobalStyle } from './styles/globalStyles'
import { light } from './styles/themes/light'
import { dark } from './styles/themes/dark'

// Componente interno para usar hooks do Redux
function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const currentUser = useAppSelector(selectCurrentUser)

  // Se tem token mas não tem user, buscar automaticamente
  useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated || !!currentUser // Só busca se necessário
  })

  // Theme management
  const [themeName, setThemeName] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    return savedTheme ?? 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', themeName)
  }, [themeName])

  const toggleTheme = () => {
    setThemeName((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeProvider theme={themeName === 'light' ? light : dark}>
      <ToastProvider>
        <BrowserRouter>
          <PostProvider>
            <GlobalStyle />
            <AppRoutes />

            {/* Botão temporário de tema */}
            <button
              onClick={toggleTheme}
              style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '999px',
                border: '1px solid #ccc',
                backgroundColor: themeName === 'light' ? '#fff' : '#333',
                color: themeName === 'light' ? '#333' : '#fff',
                zIndex: 9999
              }}
            >
              Alternar para o modo {themeName === 'light' ? 'Escuro' : 'Claro'}
            </button>
          </PostProvider>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
