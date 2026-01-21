import { Home, Search, Bell, Mail, UserPlus, User } from 'lucide-react'

export const NAV_ITEMS = [
  {
    path: '/home',
    label: 'Página Inicial',
    icon: Home
  },
  {
    path: '/explore',
    label: 'Explorar',
    icon: Search
  },
  {
    path: '/notifications',
    label: 'Notificações',
    icon: Bell
  },
  {
    path: '/connect',
    label: 'Seguir',
    icon: UserPlus
  },
  {
    path: '/messages',
    label: 'Bate-papo',
    icon: Mail
  },
  {
    path: '/profile',
    label: 'Perfil',
    icon: User
  }
] as const
