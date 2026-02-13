import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import AppRoutes from './routes/routes'
import { ToastProvider } from './contexts/ToastContext'
import { AuthProvider } from './contexts/AuthContext'
import { PostProvider } from './contexts/PostContext'
import { store } from './store'
import { GlobalStyle } from './styles/globalStyles'
import { light } from './styles/themes/light'
import { dark } from './styles/themes/dark'

function App() {
  // 1. Inicialização Preguiçosa: Lê o localStorage antes do primeiro render
  const [themeName, setThemeName] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    return savedTheme ?? 'light'
  })

  // 2. Sincronização: Sempre que o themeName mudar, salvamos no localStorage
  useEffect(() => {
    localStorage.setItem('theme', themeName)
  }, [themeName])

  // 3. Função para alternar o tema
  const toggleTheme = () => {
    setThemeName((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={themeName === 'light' ? light : dark}>
        <ToastProvider>
          <BrowserRouter>
            <AuthProvider>
              <PostProvider>
                <GlobalStyle />
                <AppRoutes />

                {/* Botão temporário corrigido */}
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
                  Alternar para o modo{' '}
                  {themeName === 'light' ? 'Escuro' : 'Claro'}
                </button>
              </PostProvider>
            </AuthProvider>
          </BrowserRouter>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
