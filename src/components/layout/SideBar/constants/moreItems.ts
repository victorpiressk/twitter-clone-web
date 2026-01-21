import { Settings, Info, Github, Dock } from 'lucide-react'

export const MORE_ITEMS = [
  {
    id: 'settings',
    label: 'Configurações e privacidade',
    icon: Settings,
    action: 'navigate' as const,
    path: '/settings'
  },
  {
    id: 'about',
    label: 'Sobre o projeto',
    icon: Info,
    action: 'custom' as const
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: Github,
    action: 'external' as const,
    url: 'https://github.com/victorpiressk'
  },
  {
    id: 'docs',
    label: 'Documentação da API',
    icon: Dock,
    action: 'custom' as const
  }
] as const
