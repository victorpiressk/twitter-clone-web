import { createContext, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { dark } from '../styles/themes/dark'
import { dim } from '../styles/themes/dim'
import { light } from '../styles/themes/light'

export type ThemeName = 'light' | 'dark' | 'dim'

const themes = { light, dark, dim }

type ThemeContextType = {
  themeName: ThemeName
  setTheme: (name: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextType>({
  themeName: 'light',
  setTheme: () => {}
})

export const AppThemeProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const saved = localStorage.getItem('theme') as ThemeName | null
    return saved ?? 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', themeName)
  }, [themeName])

  const setTheme = (name: ThemeName) => setThemeName(name)

  return (
    <ThemeContext.Provider value={{ themeName, setTheme }}>
      <ThemeProvider theme={themes[themeName]}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeContext
