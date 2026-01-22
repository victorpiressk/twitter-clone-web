import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../common/Avatar'
import Button from '../../../../common/Button'
import type { WhoToFollowWidgetProps } from './types'
import * as S from './styles'

const WhoToFollowWidget = ({
  suggestions,
  onFollowToggle
}: WhoToFollowWidgetProps) => {
  const navigate = useNavigate()

  // ✅ Handler para clicar no card (exceto no botão)
  const handleUserClick = (username: string, e: React.MouseEvent) => {
    // Se clicou no botão, não navega
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    navigate(`/${username}`)
  }

  // ✅ Handler para o botão de seguir (previne navegação)
  const handleFollowClick = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Impede que o click do card seja acionado
    onFollowToggle(userId)
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
              onClick={(e) => handleFollowClick(user.id, e)}
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
