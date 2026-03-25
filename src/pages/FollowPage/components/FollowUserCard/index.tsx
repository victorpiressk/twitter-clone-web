import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../components/common/Avatar'
import Button from '../../../../components/common/Button'
import { useUserActions } from '../../../../hooks/useUserActions'
import * as S from './styles'
import type { FollowUserCardProps } from './types'

const FollowUserCard = ({ user }: FollowUserCardProps) => {
  const navigate = useNavigate()

  const { isFollowing, isLoading, followUser, unfollowUser } = useUserActions(
    user.id
  )

  const userWithFollowStatus = useMemo(
    () => ({
      ...user,
      isFollowing
    }),
    [user, isFollowing]
  )

  const handleCardClick = () => {
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

  return (
    <S.CardContainer onClick={handleCardClick}>
      <Avatar
        src={user.avatar}
        alt={user.firstName}
        size="small"
        showProfilePopover={true}
        userProfileData={userWithFollowStatus}
        onFollowToggle={handleFollowClick}
      />

      <S.UserInfo>
        <S.UserNames>
          <S.DisplayName>
            {user.firstName} {user.lastName}
          </S.DisplayName>
          <S.Username>@{user.username}</S.Username>
        </S.UserNames>
        {user.bio && <S.Bio>{user.bio}</S.Bio>}
      </S.UserInfo>

      <S.ActionButton>
        <Button
          type="button"
          variant={isFollowing ? 'outline' : 'secondary'}
          onClick={handleFollowClick}
          loading={isLoading}
        >
          {isFollowing ? 'Seguindo' : 'Seguir'}
        </Button>
      </S.ActionButton>
    </S.CardContainer>
  )
}

export default FollowUserCard
