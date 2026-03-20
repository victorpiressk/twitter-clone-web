import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Search, Bell, Mail } from 'lucide-react'
import { useGetUnreadCountQuery } from '../../../store/slices/api/notifications.api'
import * as S from './styles'

const FOOTER_ITEMS = [
  { path: '/home', icon: Home },
  { path: '/explore', icon: Search },
  { path: '/notifications', icon: Bell },
  { path: '/messages', icon: Mail }
]

const MobileFooter = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { data: unreadData } = useGetUnreadCountQuery()
  const unreadCount = unreadData?.count || 0

  return (
    <S.FooterContainer>
      {FOOTER_ITEMS.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path
        const isNotifications = item.path === '/notifications'

        return (
          <S.FooterItem
            key={item.path}
            $active={isActive}
            onClick={() => navigate(item.path)}
          >
            <S.IconWrapper>
              <Icon size={24} />
              {isNotifications && unreadCount > 0 && (
                <S.Badge>{unreadCount > 99 ? '99+' : unreadCount}</S.Badge>
              )}
            </S.IconWrapper>
          </S.FooterItem>
        )
      })}
    </S.FooterContainer>
  )
}

export default MobileFooter
