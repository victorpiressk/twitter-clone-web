import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../components/common/Avatar'
import Button from '../../../../components/common/Button'
import { useToast } from '../../../../hooks/useToast'
import type { UserSuggestionCardProps } from './types'
import * as S from './styles'

const UserSuggestionCard = ({
  user,
  onFollowToggle,
  showSubscribe = false
}: UserSuggestionCardProps) => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUserClick = () => {
    navigate(`/${user.username}`)
  }

  const handleFollowClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)

    try {
      if (user.isFollowing) {
        showToast('info', `Você deixou de seguir @${user.username}`)
      } else {
        showToast('success', `Você agora segue @${user.username}`)
      }

      await onFollowToggle(user.id)
      setIsFollowing(!isFollowing)
    } catch {
      if (user.isFollowing) {
        showToast('error', `Erro ao deixar de seguir @${user.username}`)
      } else {
        showToast('error', `Erro ao seguir @${user.username}`)
      }
    } finally {
      setIsLoading(false)
    }
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
        <Avatar src={user.avatar} alt={user.displayName} size="small" />
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
          loading={isLoading}
        >
          {buttonText}
        </Button>
      </S.ButtonWrapper>
    </S.CardContainer>
  )
}

export default UserSuggestionCard
