import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../components/common/Avatar'
import Button from '../../../../components/common/Button'
import type { UserSuggestionCardProps } from './types'
import * as S from './styles'

const UserSuggestionCard = ({
  user,
  onFollowToggle,
  showSubscribe = false
}: UserSuggestionCardProps) => {
  const navigate = useNavigate()

  const handleUserClick = () => {
    navigate(`/${user.username}`)
  }

  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Não navega ao clicar no botão
    onFollowToggle(user.id)
  }

  const buttonText = showSubscribe
    ? user.isFollowing
      ? 'Inscrito'
      : 'Inscrever-se'
    : user.isFollowing
      ? 'Seguindo'
      : 'Seguir'

  return (
    <S.CardContainer>
      <S.AvatarWrapper onClick={handleUserClick}>
        <Avatar src={user.avatar} alt={user.displayName} size="large" />
      </S.AvatarWrapper>

      <S.UserInfo onClick={handleUserClick}>
        <S.DisplayName>{user.displayName}</S.DisplayName>
        <S.Username>@{user.username}</S.Username>
        {user.bio && <S.Bio>{user.bio}</S.Bio>}
      </S.UserInfo>

      <S.ButtonWrapper>
        <Button
          type="button"
          variant={user.isFollowing ? 'outline' : 'secondary'}
          onClick={handleFollowClick}
        >
          {buttonText}
        </Button>
      </S.ButtonWrapper>
    </S.CardContainer>
  )
}

export default UserSuggestionCard
