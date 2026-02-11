import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../components/common/Avatar'
import Button from '../../../../components/common/Button'
import { useToast } from '../../../../hooks/useToast'
import type { FollowUserCardProps } from './types'
import * as S from './styles'

const FollowUserCard = ({ user, onFollowToggle }: FollowUserCardProps) => {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCardClick = () => {
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

  return (
    <S.CardContainer onClick={handleCardClick}>
      <Avatar src={user.avatar} alt={user.firstName} size="small" />

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
          variant={user.isFollowing ? 'outline' : 'secondary'}
          onClick={handleFollowClick}
          loading={isLoading}
        >
          {user.isFollowing ? 'Seguindo' : 'Seguir'}
        </Button>
      </S.ActionButton>
    </S.CardContainer>
  )
}

export default FollowUserCard
