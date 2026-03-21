import { MapPin, Link as LinkIcon, Calendar, Cake } from 'lucide-react'
import Avatar from '../../../../components/common/Avatar'
import Button from '../../../../components/common/Button'
import { formatDate } from '../../../../utils/formatDate'
import ProfileStats from '../ProfileStats'
import * as S from './styles'
import type { ProfileHeaderProps } from './types'

const ProfileHeader = ({
  user,
  isOwnProfile,
  onFollowToggle,
  isFollowLoading,
  onEditProfile
}: ProfileHeaderProps) => {
  return (
    <S.HeaderContainer>
      <S.Banner $imageUrl={user.banner} />

      <S.ProfileInfo>
        <S.AvatarSection>
          <S.AvatarWrapper>
            <Avatar src={user.avatar} alt={user.firstName} size="large" />
          </S.AvatarWrapper>

          {!isOwnProfile && (
            <Button
              type="button"
              variant={user.isFollowing ? 'outline' : 'secondary'}
              onClick={onFollowToggle}
              loading={isFollowLoading}
            >
              {user.isFollowing ? 'Seguindo' : 'Seguir'}
            </Button>
          )}

          {isOwnProfile && (
            <Button type="button" variant="outline" onClick={onEditProfile}>
              Editar perfil
            </Button>
          )}
        </S.AvatarSection>

        <S.UserNames>
          <S.DisplayName>
            {user.firstName} {user.lastName}
          </S.DisplayName>
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
          {user.birthDate && (
            <S.MetadataItem>
              <Cake size={18} strokeWidth={2} />
              Nascido(a) em {formatDate(user.birthDate, 'full')}
            </S.MetadataItem>
          )}

          {/* Data de entrada */}
          <S.MetadataItem>
            <Calendar size={18} strokeWidth={2} />
            Entrou em {formatDate(user.createdAt, 'joined')}
          </S.MetadataItem>
        </S.Metadata>

        <ProfileStats user={user} />
      </S.ProfileInfo>
    </S.HeaderContainer>
  )
}

export default ProfileHeader
