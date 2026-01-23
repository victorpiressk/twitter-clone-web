import Skeleton from '../../index'
import * as S from './styles'

const UserCardSkeleton = () => {
  return (
    <S.UserCardSkeletonContainer>
      {/* Avatar */}
      <S.AvatarSection>
        <Skeleton variant="circle" width={40} height={40} />
      </S.AvatarSection>

      {/* Conteúdo */}
      <S.ContentSection>
        {/* Nome + Username */}
        <S.Header>
          <Skeleton variant="text" width="50%" height={16} />
          <Skeleton variant="text" width="35%" height={14} />
        </S.Header>

        {/* Bio (2 linhas) */}
        <S.Bio>
          <Skeleton variant="text" width="100%" height={14} />
          <Skeleton variant="text" width="80%" height={14} />
        </S.Bio>
      </S.ContentSection>

      {/* Botão Seguir */}
      <S.ActionSection>
        <Skeleton variant="rect" width={90} height={32} borderRadius="9999px" />
      </S.ActionSection>
    </S.UserCardSkeletonContainer>
  )
}

export default UserCardSkeleton
