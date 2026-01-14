import Avatar from '../../../../common/Avatar'
import Button from '../../../../common/Button'
import type { WhoToFollowWidgetProps } from './types'
import * as S from './styles'

const WhoToFollowWidget = ({
  suggestions,
  onFollowToggle
}: WhoToFollowWidgetProps) => {
  return (
    <S.Widget>
      <S.WidgetHeader>
        <S.WidgetTitle>Quem seguir</S.WidgetTitle>
      </S.WidgetHeader>

      <S.SuggestionsList>
        {suggestions.map((user) => (
          <S.SuggestionItem key={user.id}>
            <Avatar src={user.avatar} alt={user.displayName} size="medium" />

            <S.UserInfo>
              <S.DisplayName>{user.displayName}</S.DisplayName>
              <S.Username>@{user.username}</S.Username>
            </S.UserInfo>

            <Button
              type="button"
              variant={user.isFollowing ? 'outline' : 'secondary'}
              onClick={() => onFollowToggle(user.id)}
            >
              {user.isFollowing ? 'Seguindo' : 'Seguir'}
            </Button>
          </S.SuggestionItem>
        ))}
      </S.SuggestionsList>

      <S.ShowMore>
        <Button type="link" to="/explore" variant="ghost">
          Mostrar mais
        </Button>
      </S.ShowMore>
    </S.Widget>
  )
}

export default WhoToFollowWidget
