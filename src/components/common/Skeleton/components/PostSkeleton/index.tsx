import Skeleton from '../../index'
import * as S from './styles'

const PostSkeleton = () => {
  return (
    <S.PostSkeletonContainer>
      {/* Avatar */}
      <S.AvatarSection>
        <Skeleton variant="circle" width={40} height={40} />
      </S.AvatarSection>

      {/* Conteúdo */}
      <S.ContentSection>
        {/* Header (Nome + Username) */}
        <S.Header>
          <Skeleton variant="text" width="40%" height={16} />
        </S.Header>

        {/* Conteúdo do post (2-3 linhas) */}
        <S.Content>
          <Skeleton variant="text" width="100%" height={16} />
          <Skeleton variant="text" width="90%" height={16} />
          <Skeleton variant="text" width="60%" height={16} />
        </S.Content>

        {/* Ações (ícones) */}
        <S.Actions>
          <Skeleton variant="text" width={40} height={18} />
          <Skeleton variant="text" width={40} height={18} />
          <Skeleton variant="text" width={40} height={18} />
          <Skeleton variant="text" width={40} height={18} />
        </S.Actions>
      </S.ContentSection>
    </S.PostSkeletonContainer>
  )
}

export default PostSkeleton
