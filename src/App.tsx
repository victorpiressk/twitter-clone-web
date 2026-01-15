import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styles/globalStyles'
import AppRoutes from './routes/routes'
import { light } from './styles/themes/light'
import { dark } from './styles/themes/dark'

function App() {
  const [isDark, setIsDark] = useState(false)

  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <BrowserRouter>
        <GlobalStyle />
        <AppRoutes />

        {/* Botão temporário para testar */}
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          Trocar Tema
        </button>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
