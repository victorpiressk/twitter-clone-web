import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../components/common/Avatar'
import Button from '../../../../components/common/Button'
import { useUserActions } from '../../../../hooks/useUserActions'
import * as S from './styles'
import type { UserSuggestionCardProps } from './types'

const UserSuggestionCard = ({
  user,
  showSubscribe = false
}: UserSuggestionCardProps) => {
  const navigate = useNavigate()

  const { isFollowing, isLoading, followUser, unfollowUser } = useUserActions(
    user.id
  )

  const handleUserClick = () => {
    navigate(`/${user.username}`)
  }

  const handleFollowClick = (e?: React.MouseEvent) => {
    e?.stopPropagation()

    if (isFollowing) {
      unfollowUser()
    } else {
      followUser()
    }
  }

  const buttonText = showSubscribe
    ? isFollowing
      ? 'Inscrito'
      : 'Inscrever-se'
    : isFollowing
      ? 'Seguindo'
      : 'Seguir'

  return (
    <S.CardContainer>
      <S.AvatarWrapper onClick={handleUserClick}>
        <Avatar
          src={user.avatar}
          alt={user.firstName}
          size="small"
          showProfilePopover={true}
          userProfileData={user}
          onFollowToggle={handleFollowClick}
        />
      </S.AvatarWrapper>

      <S.UserInfo onClick={handleUserClick}>
        <S.DisplayName>
          {user.firstName} {user.lastName}
        </S.DisplayName>
        <S.Username>@{user.username}</S.Username>
        {user.bio && <S.Bio>{user.bio}</S.Bio>}
      </S.UserInfo>

      <S.ButtonWrapper>
        <Button
          type="button"
          variant={isFollowing ? 'outline' : 'secondary'}
          onClick={handleFollowClick}
          loading={isLoading}
        >
          {buttonText}
        </Button>
      </S.ButtonWrapper>
    </S.CardContainer>
  )
}

export default UserSuggestionCard
