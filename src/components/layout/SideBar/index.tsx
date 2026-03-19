// src/components/Layout/SideBar/index.tsx

import { useState, useRef, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Twitter, MoreHorizontal, Feather } from 'lucide-react'
import Button from '../../common/Button'
import Avatar from '../../common/Avatar'
import Popover from '../../common/Popovers/BasePopover'
import CreatePostModal from './components/CreatePostModal'
import { NAV_ITEMS, MORE_ITEMS, PROFILE_MENU_ITEMS } from './constants'
import { useToast } from '../../../hooks/useToast'
import { useAppSelector } from '../../../store/hooks'
import { selectCurrentUser } from '../../../store/slices/auth/authSlice'
import { useGetUnreadCountQuery } from '../../../store/slices/api/notifications.api'
import { useLogoutMutation } from '../../../store/slices/api/auth.api'
import * as S from './styles'

const SideBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const user = useAppSelector(selectCurrentUser)
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation()

  // ✅ NOVO: Buscar count de notificações não lidas
  const { data: unreadData } = useGetUnreadCountQuery()
  const unreadCount = unreadData?.count || 0

  console.log('🔔 Unread Data:', unreadData)
  console.log('🔔 Unread Count:', unreadCount)
  console.log('🔔 Should Show Badge:', unreadCount > 0)

  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  const moreButtonRef = useRef<HTMLButtonElement>(null)
  const profileButtonRef = useRef<HTMLButtonElement>(null)

  const navItems = useMemo(() => {
    return NAV_ITEMS.map((item) => {
      if (item.path === '/profile' && user) {
        return {
          ...item,
          path: `/${user.username}`
        }
      }
      return item
    })
  }, [user])

  const handleMoreItemClick = (item: (typeof MORE_ITEMS)[number]) => {
    switch (item.action) {
      case 'navigate':
        navigate(item.path!)
        break
      case 'external':
        window.open(item.url!, '_blank')
        break
    }
    setIsMoreOpen(false)
  }

  const handleProfileMenuClick = async (itemId: string) => {
    switch (itemId) {
      case 'add-account':
        console.log('Adicionar conta')
        break
      case 'logout':
        try {
          await logoutMutation().unwrap()
          showToast('success', 'Você saiu da sua conta')
        } catch {
          showToast('info', 'Você foi desconectado')
        }
        setIsProfileMenuOpen(false)
        return
    }
    setIsProfileMenuOpen(false)
  }

  return (
    <>
      <S.Aside>
        <S.Nav>
          <S.NavList>
            <li>
              <S.Logo onClick={() => navigate('/home')}>
                <Twitter size={50.4} strokeWidth={2} />
              </S.Logo>
            </li>

            {navItems.map((item) => {
              const Icon = item.icon
              const isNotifications = item.path === '/notifications'
              const showBadge = isNotifications && unreadCount > 0

              return (
                <li key={item.path}>
                  <Button
                    type="link"
                    to={item.path}
                    variant="ghost"
                    active={location.pathname === item.path}
                  >
                    {/* Wrapper do ícone com badge */}
                    <S.IconWrapper>
                      <Icon size={26.25} />
                      {showBadge && (
                        <S.NotificationBadge>
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </S.NotificationBadge>
                      )}
                    </S.IconWrapper>
                    <span>{item.label}</span>
                  </Button>
                </li>
              )
            })}

            {/* Botão Mais — apenas em desktop */}
            <S.MoreButtonWrapper>
              <S.SideButton
                ref={moreButtonRef}
                type="button"
                $variant="ghost"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
              >
                <MoreHorizontal size={24} strokeWidth={2} />
                <S.HideWhenCollapsed>Mais</S.HideWhenCollapsed>
              </S.SideButton>
            </S.MoreButtonWrapper>

            {/* MORE_ITEMS diretos — apenas quando colapsado */}
            <S.CollapsedMoreItems>
              {MORE_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <S.SideButton
                      type="button"
                      $variant="ghost"
                      onClick={() => handleMoreItemClick(item)}
                    >
                      <Icon size={24} strokeWidth={2} />
                    </S.SideButton>
                  </li>
                )
              })}
            </S.CollapsedMoreItems>

            {/* Botão Postar */}
            <li>
              <S.SideButton
                type="button"
                $variant="secondary"
                onClick={() => setIsCreatePostModalOpen(true)}
              >
                <S.PostButtonIcon>
                  <Feather size={22} />
                </S.PostButtonIcon>
                <S.PostButtonText>Postar</S.PostButtonText>
              </S.SideButton>
            </li>
          </S.NavList>

          {/* Botão Perfil */}
          <S.FooterButton
            ref={profileButtonRef}
            type="button"
            $variant="ghost"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            disabled={isLoggingOut}
          >
            {user && (
              <>
                <Avatar src={user.avatar} alt={user.username} size="small" />
                <S.UserNames>
                  <S.DisplayName>
                    {user.firstName} {user.lastName}
                  </S.DisplayName>
                  <S.Username>@{user.username}</S.Username>
                </S.UserNames>
                <S.MoreIcon>
                  <MoreHorizontal size={18} strokeWidth={2} />
                </S.MoreIcon>
              </>
            )}
          </S.FooterButton>
        </S.Nav>
      </S.Aside>

      {/* Popover "Mais" */}
      <Popover
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        triggerRef={moreButtonRef}
        position="top-right"
        strategy="fixed"
      >
        {MORE_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <S.PopoverItem
              key={item.id}
              onClick={() => handleMoreItemClick(item)}
            >
              <span style={{ marginRight: '12px', fontSize: '18px' }}>
                <Icon size={24} />
              </span>
              {item.label}
            </S.PopoverItem>
          )
        })}
      </Popover>

      {/* Popover Perfil */}
      <Popover
        isOpen={isProfileMenuOpen}
        onClose={() => setIsProfileMenuOpen(false)}
        triggerRef={profileButtonRef}
        position="top"
        variant="profile"
        strategy="fixed"
      >
        {PROFILE_MENU_ITEMS.map((item) => (
          <S.PopoverItem
            key={item.id}
            onClick={() => handleProfileMenuClick(item.id)}
            $variant="profile"
            disabled={item.id === 'logout' && isLoggingOut}
          >
            {item.id === 'logout' && isLoggingOut
              ? 'Saindo...'
              : item.id === 'logout' && user
                ? `Sair de @${user.username}`
                : item.label}
          </S.PopoverItem>
        ))}
      </Popover>

      {/* Modal Criar Post */}
      {user && (
        <CreatePostModal
          isOpen={isCreatePostModalOpen}
          onClose={() => setIsCreatePostModalOpen(false)}
          userName={user.username}
          userAvatar={user.avatar}
        />
      )}
    </>
  )
}

export default SideBar
