import { useTheme } from '../../../../hooks/useTheme'
import * as S from '../../styles'
import type { ThemeName } from '../../../../contexts/ThemeContext'

const THEMES: { id: ThemeName; label: string; description: string }[] = [
  {
    id: 'light',
    label: 'Claro',
    description: 'Fundo branco com texto escuro'
  },
  {
    id: 'dim',
    label: 'Dim',
    description: 'Fundo azulado, mais suave para os olhos'
  },
  {
    id: 'dark',
    label: 'Escuro',
    description: 'Fundo preto com texto claro'
  }
]

const AppearanceSettings = () => {
  const { themeName, setTheme } = useTheme()

  return (
    <S.FormContainer>
      {THEMES.map((theme) => (
        <S.ThemeToggleRow
          key={theme.id}
          onClick={() => setTheme(theme.id)}
          style={{ cursor: 'pointer' }}
        >
          <div>
            <S.ThemeToggleLabel>{theme.label}</S.ThemeToggleLabel>
            <S.ContentDescription>{theme.description}</S.ContentDescription>
          </div>
          <S.InputRadio
            type="radio"
            name="theme"
            checked={themeName === theme.id}
            onChange={() => setTheme(theme.id)}
          />
        </S.ThemeToggleRow>
      ))}
    </S.FormContainer>
  )
}

export default AppearanceSettings
