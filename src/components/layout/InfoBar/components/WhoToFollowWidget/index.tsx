import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../common/Avatar'
import Button from '../../../../common/Button'
import { useToast } from '../../../../../hooks/useToast'
import type { WhoToFollowWidgetProps } from './types'
import * as S from './styles'

const WhoToFollowWidget = ({
  user,
  suggestions,
  onFollowToggle
}: WhoToFollowWidgetProps) => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // ✅ Handler para clicar no card (exceto no botão)
  const handleUserClick = (username: string, e: React.MouseEvent) => {
    // Se clicou no botão, não navega
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    navigate(`/${username}`)
  }

  // ✅ Handler para o botão de seguir (previne navegação)
  const handleFollowClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)

    try {
      if (user.isFollowing) {
        showToast('info', `Você deixou de seguir @${user.username}`)
      } else {
        showToast('success', `Você agora segue @${user.username}`)
      }

      await onFollowToggle(user.id) // Simula API call
      setIsFollowing(!isFollowing)
    } catch {
      if (isFollowing) {
        showToast('error', `Erro ao deixar de seguir @${user.username}`)
      } else {
        showToast('error', `Erro ao seguir @${user.username}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <S.Widget>
      <S.WidgetHeader>
        <S.WidgetTitle>Quem seguir</S.WidgetTitle>
      </S.WidgetHeader>

      <S.SuggestionsList>
        {suggestions.map((user) => (
          <S.SuggestionItem
            key={user.id}
            onClick={(e) => handleUserClick(user.username, e)}
          >
            <Avatar
              src={user.avatar}
              alt={user.displayName}
              size="small"
              showProfilePopover={true}
              userProfileData={{
                id: user.id,
                username: user.username,
                displayName: user.displayName,
                avatar: user.avatar,
                bio: user.bio,
                stats: {
                  following: 123, // mock
                  followers: 456 // mock
                },
                isFollowing: user.isFollowing
              }}
              onFollowToggle={(userId) => console.log('Follow toggle:', userId)}
            />

            <S.UserInfo>
              <S.DisplayName>{user.displayName}</S.DisplayName>
              <S.Username>@{user.username}</S.Username>
            </S.UserInfo>

            <Button
              type="button"
              variant={user.isFollowing ? 'outline' : 'secondary'}
              onClick={handleFollowClick}
              loading={isLoading}
            >
              {user.isFollowing ? 'Seguindo' : 'Seguir'}
            </Button>
          </S.SuggestionItem>
        ))}
      </S.SuggestionsList>

      <S.ShowMore>
        <Button type="link" to="/connect" variant="ghost">
          Mostrar mais
        </Button>
      </S.ShowMore>
    </S.Widget>
  )
}

export default WhoToFollowWidget
