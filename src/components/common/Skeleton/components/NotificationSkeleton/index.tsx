import Skeleton from '../../index'
import * as S from './styles'

const NotificationSkeleton = () => {
  return (
    <S.NotificationSkeletonContainer>
      {/* Ícone da notificação */}
      <S.IconSection>
        <Skeleton variant="circle" width={32} height={32} />
      </S.IconSection>

      {/* Conteúdo */}
      <S.ContentSection>
        {/* Avatar(s) + Texto */}
        <S.AvatarRow>
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton variant="text" width="40%" height={18} />
        </S.AvatarRow>

        {/* Texto da notificação (2 linhas) */}
        <S.TextContent>
          <Skeleton variant="text" width="90%" height={14} />
          <Skeleton variant="text" width="70%" height={14} />
        </S.TextContent>

        {/* Timestamp */}
        <Skeleton variant="text" width="10%" height={12} />
      </S.ContentSection>
    </S.NotificationSkeletonContainer>
  )
}

export default NotificationSkeleton
