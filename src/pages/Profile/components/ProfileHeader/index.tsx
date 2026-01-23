import { useState } from 'react'
import { MapPin, Link as LinkIcon, Calendar, Cake } from 'lucide-react'
import Avatar from '../../../../components/common/Avatar'
import Button from '../../../../components/common/Button'
import ProfileStats from '../ProfileStats'
import { useToast } from '../../../../hooks/useToast'
import type { ProfileHeaderProps } from './types'
import * as S from './styles'

const ProfileHeader = ({
  user,
  onFollowToggle,
  onEditProfile
}: ProfileHeaderProps) => {
  const { showToast } = useToast()
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
      if (user.isFollowing) {
        showToast('error', `Erro ao deixar de seguir @${user.username}`)
      } else {
        showToast('error', `Erro ao seguir @${user.username}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (
    dateString: string,
    mode: 'short' | 'full' = 'short'
  ): string => {
    // Remove a parte de hora se existir (ex: "2020-01-15T00:00:00Z" -> "2020-01-15")
    const dateOnly = dateString.split('T')[0]
    const [year, month, day] = dateOnly.split('-').map(Number)
    const date = new Date(year, month - 1, day) // Cria data local

    if (mode === 'full') {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }

    const monthName = date.toLocaleDateString('pt-BR', { month: 'short' })
    return `${monthName} de ${year}`
  }
  return (
    <S.HeaderContainer>
      <S.Banner $imageUrl={user.banner} />

      <S.ProfileInfo>
        <S.AvatarSection>
          <S.AvatarWrapper>
            <Avatar src={user.avatar} alt={user.displayName} size="large" />
          </S.AvatarWrapper>

          {!user.isOwnProfile && (
            <Button
              type="button"
              variant={user.isFollowing ? 'outline' : 'secondary'}
              onClick={handleFollowClick}
              loading={isLoading}
            >
              {user.isFollowing ? 'Seguindo' : 'Seguir'}
            </Button>
          )}

          {user.isOwnProfile && (
            <Button type="button" variant="outline" onClick={onEditProfile}>
              Editar perfil
            </Button>
          )}
        </S.AvatarSection>

        <S.UserNames>
          <S.DisplayName>{user.displayName}</S.DisplayName>
          <S.Username>@{user.username}</S.Username>
        </S.UserNames>

        {user.bio && <S.Bio>{user.bio}</S.Bio>}

        <S.Metadata>
          {/* Localização */}
          {user.location && (
            <S.MetadataItem>
              <MapPin size={18} strokeWidth={2} />
              {user.location}
            </S.MetadataItem>
          )}

          {/* Website */}
          {user.website && (
            <S.MetadataItem>
              <LinkIcon size={18} strokeWidth={2} />
              <a href={user.website} target="_blank" rel="noopener noreferrer">
                {user.website.replace(/^https?:\/\//, '')}
              </a>
            </S.MetadataItem>
          )}

          {/* Data de nascimento */}
          <S.MetadataItem>
            <Cake size={18} strokeWidth={2} />
            Nascido(a) em {formatDate(user.birthDate, 'full')}
          </S.MetadataItem>

          {/* Data de entrada */}
          <S.MetadataItem>
            <Calendar size={18} strokeWidth={2} />
            Entrou em {formatDate(user.joinedAt)}
          </S.MetadataItem>
        </S.Metadata>

        <ProfileStats user={user} />
      </S.ProfileInfo>
    </S.HeaderContainer>
  )
}

export default ProfileHeader
