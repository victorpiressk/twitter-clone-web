import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styles/globalStyles'
import AppRoutes from './routes/routes'
import { light } from './styles/themes/light'
import { dark } from './styles/themes/dark'
import { ToastProvider } from './contexts/ToastContext'
import { AuthProvider } from './contexts/AuthContext'

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
    <ThemeProvider theme={themeName === 'light' ? light : dark}>
      <ToastProvider>
        <BrowserRouter>
          <AuthProvider>
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
              Alternar para o modo {themeName === 'light' ? 'Escuro' : 'Claro'}
            </button>
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
