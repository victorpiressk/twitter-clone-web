import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../components/common/Avatar'
import Button from '../../../../components/common/Button'
import type { FollowUserCardProps } from './types'
import * as S from './styles'

const FollowUserCard = ({ user, onFollowToggle }: FollowUserCardProps) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/${user.username}`)
  }

  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFollowToggle(user.id)
  }

  return (
    <S.CardContainer onClick={handleCardClick}>
      <Avatar src={user.avatar} alt={user.displayName} size="medium" />

      <S.UserInfo>
        <S.UserNames>
          <S.DisplayName>{user.displayName}</S.DisplayName>
          <S.Username>@{user.username}</S.Username>
        </S.UserNames>
        {user.bio && <S.Bio>{user.bio}</S.Bio>}
      </S.UserInfo>

      <S.ActionButton>
        <Button
          type="button"
          variant={user.isFollowing ? 'outline' : 'secondary'}
          onClick={handleFollowClick}
        >
          {user.isFollowing ? 'Seguindo' : 'Seguir'}
        </Button>
      </S.ActionButton>
    </S.CardContainer>
  )
}

export default FollowUserCard
