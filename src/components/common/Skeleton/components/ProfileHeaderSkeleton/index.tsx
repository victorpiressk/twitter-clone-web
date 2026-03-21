import Skeleton from '../../index'
import * as S from './styles'

const ProfileHeaderSkeleton = () => {
  return (
    <S.HeaderContainer>
      {/* Banner */}
      <S.Banner>
        <Skeleton variant="rect" width="100%" height="200px" borderRadius="0" />
      </S.Banner>

      <S.ProfileInfo>
        {/* Avatar Section (Avatar + Botão de ação) */}
        <S.AvatarSection>
          {/* Avatar */}
          <S.AvatarWrapper>
            <Skeleton variant="circle" width={134} height={134} />
          </S.AvatarWrapper>

          {/* Botão de ação (Seguir/Editar perfil) */}
          <S.ActionButton>
            <Skeleton
              variant="rect"
              width={120}
              height={36}
              borderRadius="18px"
            />
          </S.ActionButton>
        </S.AvatarSection>

        {/* User Names (DisplayName + Username) */}
        <S.UserNames>
          <Skeleton variant="text" width="50%" height={24} />
          <Skeleton variant="text" width="35%" height={16} />
        </S.UserNames>

        {/* Bio (2 linhas) */}
        <S.Bio>
          <Skeleton variant="text" width="100%" height={16} />
          <Skeleton variant="text" width="80%" height={16} />
        </S.Bio>

        {/* Metadata (Localização, Website, Nascimento, Entrada) */}
        <S.Metadata>
          <Skeleton variant="text" width={120} height={14} />
          <Skeleton variant="text" width={140} height={14} />
          <Skeleton variant="text" width={160} height={14} />
          <Skeleton variant="text" width={130} height={14} />
        </S.Metadata>

        {/* Stats (Seguindo / Seguidores) */}
        <S.StatsSection>
          <Skeleton variant="text" width="40%" height={16} />
        </S.StatsSection>
      </S.ProfileInfo>
    </S.HeaderContainer>
  )
}

export default ProfileHeaderSkeleton
