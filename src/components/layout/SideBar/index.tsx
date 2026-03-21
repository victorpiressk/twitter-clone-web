import { useState, useRef, useMemo } from 'react'
import { Twitter, MoreHorizontal, Feather } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useToast } from '../../../hooks/useToast'
import { useAppSelector } from '../../../store/hooks'
import { useLogoutMutation } from '../../../store/slices/api/auth.api'
import { useGetUnreadCountQuery } from '../../../store/slices/api/notifications.api'
import { selectCurrentUser } from '../../../store/slices/auth/authSlice'
import Avatar from '../../common/Avatar'
import Button from '../../common/Button'
import Popover from '../../common/Popovers/BasePopover'
import CreatePostModal from './components/CreatePostModal'
import { NAV_ITEMS, MORE_ITEMS, PROFILE_MENU_ITEMS } from './constants'
import * as S from './styles'

const SideBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const user = useAppSelector(selectCurrentUser)
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation()

  const { data: unreadData } = useGetUnreadCountQuery()
  const unreadCount = unreadData?.count || 0

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
        showToast('info', 'Funcionalidade disponível em breve!')
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
