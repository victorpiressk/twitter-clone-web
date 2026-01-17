import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../common/Button'
import Avatar from '../../common/Avatar'
import Popover from '../../common/Popover'
import * as S from './styles'

const SideBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const moreButtonRef = useRef<HTMLButtonElement>(null)
  const profileButtonRef = useRef<HTMLButtonElement>(null)

  // Mock user data (depois vem do contexto/API)
  const currentUser = {
    displayName: 'Victor Pires',
    username: 'victor',
    avatar: undefined
  }

  const navItems = [
    { path: '/home', label: 'Página Inicial' },
    { path: '/explore', label: 'Explorar' },
    { path: '/notifications', label: 'Notificações' },
    { path: '/connect', label: 'Seguir' },
    { path: '/messages', label: 'Bate-papo' },
    { path: '/profile', label: 'Perfil' }
  ]

  const moreItems = [
    {
      label: 'Configurações e privacidade',
      icon: '⚙️',
      action: () => navigate('/settings')
    },
    {
      label: 'Sobre o projeto',
      icon: 'ℹ️',
      action: () => console.log('Sobre')
    },
    {
      label: 'GitHub',
      icon: '👤',
      action: () => window.open('https://github.com/seu-usuario', '_blank')
    },
    {
      label: 'Documentação da API',
      icon: '📝',
      action: () => console.log('Docs')
    }
  ]

  const profileMenuItems = [
    {
      label: 'Adicionar conta existente',
      action: () => {
        console.log('Adicionar conta')
        setIsProfileMenuOpen(false)
      }
    },
    {
      label: `Sair de @${currentUser.username}`,
      action: () => {
        console.log('Logout')
        setIsProfileMenuOpen(false)
        navigate('/login')
      }
    }
  ]

  const handleMoreItemClick = (action: () => void) => {
    action()
    setIsMoreOpen(false)
  }

  return (
    <>
      <S.Aside>
        <S.Nav>
          <S.NavList>
            <li>
              <S.Logo onClick={() => navigate('/home')}>𝕏</S.Logo>
            </li>

            {navItems.map((item) => (
              <li key={item.path}>
                <Button
                  type="link"
                  to={item.path}
                  variant="ghost"
                  active={location.pathname === item.path}
                >
                  {item.label}
                </Button>
              </li>
            ))}

            <li>
              <S.SideButton
                ref={moreButtonRef}
                type="button"
                variant="ghost"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
              >
                Mais
              </S.SideButton>
            </li>

            <li>
              <S.SideButton
                type="button"
                variant="secondary"
                onClick={() => console.log('Abrir modal de post')}
              >
                Postar
              </S.SideButton>
            </li>
          </S.NavList>

          <S.SideButton
            ref={profileButtonRef}
            type="button"
            variant="ghost"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <Avatar
              src={currentUser.avatar}
              alt={currentUser.displayName}
              size="medium"
            />
            <S.UserNames>
              <S.DisplayName>{currentUser.displayName}</S.DisplayName>
              <S.Username>@{currentUser.username}</S.Username>
            </S.UserNames>
          </S.SideButton>
        </S.Nav>
      </S.Aside>

      {/* Popover do botão Mais */}
      <Popover
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        triggerRef={moreButtonRef}
        position="top-left"
      >
        {moreItems.map((item, index) => (
          <S.PopoverItem
            key={index}
            onClick={() => handleMoreItemClick(item.action)}
          >
            <span style={{ marginRight: '12px', fontSize: '18px' }}>
              {item.icon}
            </span>
            {item.label}
          </S.PopoverItem>
        ))}
      </Popover>

      {/* Popover do menu Perfil */}
      <Popover
        isOpen={isProfileMenuOpen}
        onClose={() => setIsProfileMenuOpen(false)}
        triggerRef={profileButtonRef}
        position="top"
        variant="profile"
      >
        {profileMenuItems.map((item, index) => (
          <S.PopoverItem key={index} onClick={item.action} $variant="profile">
            {item.label}
          </S.PopoverItem>
        ))}
      </Popover>
    </>
  )
}

export default SideBar
