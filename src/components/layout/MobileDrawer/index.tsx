import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../../hooks/useToast'
import { useAppSelector } from '../../../store/hooks'
import { useLogoutMutation } from '../../../store/slices/api/auth.api'
import { selectCurrentUser } from '../../../store/slices/auth/authSlice'
import { formatNumber } from '../../../utils/formatNumber'
import Avatar from '../../common/Avatar'
import { MORE_ITEMS } from '../SideBar/constants/moreItems'
import { NAV_ITEMS } from '../SideBar/constants/navItems'
import * as S from './styles'

const DRAWER_NAV_ITEMS = NAV_ITEMS.filter(
  (item) =>
    item.path !== '/home' &&
    item.path !== '/explore' &&
    item.path !== '/notifications' &&
    item.path !== '/messages'
)

type MobileDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const user = useAppSelector(selectCurrentUser)
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation()

  if (!user) return null

  const handleNavigate = (path: string) => {
    navigate(path)
    onClose()
  }

  const handleStatClick = (e: React.MouseEvent<HTMLElement>, path: string) => {
    e.stopPropagation()
    navigate(path)
    onClose()
  }

  const handleMoreItemClick = (item: (typeof MORE_ITEMS)[number]) => {
    switch (item.action) {
      case 'navigate':
        navigate(item.path!)
        break
      case 'external':
        window.open(item.url!, '_blank')
        break
    }
    onClose()
  }

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap()
      showToast('success', 'Você saiu da sua conta')
    } catch {
      showToast('info', 'Você foi desconectado')
    }
    onClose()
  }

  const renderNavItems = () =>
    DRAWER_NAV_ITEMS.map((item) => {
      const Icon = item.icon
      const path = item.path === '/profile' ? `/${user.username}` : item.path
      return (
        <S.NavItem key={item.path} onClick={() => handleNavigate(path)}>
          <Icon size={22} />
          <span>{item.label}</span>
        </S.NavItem>
      )
    })

  const renderMoreItems = () =>
    MORE_ITEMS.map((item) => {
      const Icon = item.icon
      return (
        <S.NavItem key={item.id} onClick={() => handleMoreItemClick(item)}>
          <Icon size={22} />
          <span>{item.label}</span>
        </S.NavItem>
      )
    })

  return (
    <>
      <S.Overlay $isOpen={isOpen} onClick={onClose} />
      <S.DrawerContainer $isOpen={isOpen}>
        <S.UserInfo onClick={() => handleNavigate(`/${user.username}`)}>
          <Avatar src={user.avatar || null} alt={user.username} size="small" />
          <S.UserNames>
            <S.DisplayName>
              {user.firstName} {user.lastName}
            </S.DisplayName>
            <S.Username>@{user.username}</S.Username>
          </S.UserNames>

          <S.StatsContainer>
            <S.StatItem
              onClick={(e) => handleStatClick(e, `/${user.username}/following`)}
            >
              <S.StatNumber>{formatNumber(user.stats.following)}</S.StatNumber>
              <S.StatLabel>Seguindo</S.StatLabel>
            </S.StatItem>

            <S.StatItem
              onClick={(e) => handleStatClick(e, `/${user.username}/followers`)}
            >
              <S.StatNumber>{formatNumber(user.stats.followers)}</S.StatNumber>
              <S.StatLabel>Seguidores</S.StatLabel>
            </S.StatItem>
          </S.StatsContainer>
        </S.UserInfo>

        {renderNavItems()}
        {renderMoreItems()}

        <S.LogoutButton onClick={handleLogout} disabled={isLoggingOut}>
          <LogOut size={22} />
          <span>{isLoggingOut ? 'Saindo...' : 'Sair'}</span>
        </S.LogoutButton>
      </S.DrawerContainer>
    </>
  )
}

export default MobileDrawer
