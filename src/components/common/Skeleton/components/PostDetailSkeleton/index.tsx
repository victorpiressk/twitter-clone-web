import Skeleton from '../../index'
import * as S from './styles'

const PostDetailSkeleton = () => {
  return (
    <S.PostDetailSkeletonContainer>
      {/* Linha 1: Header (Avatar + Nome + Username) */}
      <S.Header>
        <S.AvatarSection>
          <Skeleton variant="circle" width={40} height={40} />
        </S.AvatarSection>

        <S.UserInfo>
          <Skeleton variant="text" width="40%" height={18} />
          <Skeleton variant="text" width="30%" height={14} />
        </S.UserInfo>
      </S.Header>

      {/* Linha 2: Conteúdo (3-4 linhas) */}
      <S.Content>
        <Skeleton variant="text" width="100%" height={18} />
        <Skeleton variant="text" width="95%" height={18} />
        <Skeleton variant="text" width="85%" height={18} />
        <Skeleton variant="text" width="60%" height={18} />
      </S.Content>

      {/* Linha 3: Data e Hora */}
      <S.Timestamp>
        <Skeleton variant="text" width="50%" height={14} />
      </S.Timestamp>

      {/* Linha 4: Stats (Comentários, Retweets, Curtidas, Views) */}
      <S.Stats>
        <S.StatItem>
          <Skeleton variant="text" width={80} height={16} />
        </S.StatItem>
        <S.StatItem>
          <Skeleton variant="text" width={80} height={16} />
        </S.StatItem>
        <S.StatItem>
          <Skeleton variant="text" width={80} height={16} />
        </S.StatItem>
        <S.StatItem>
          <Skeleton variant="text" width={100} height={16} />
        </S.StatItem>
      </S.Stats>

      {/* Linha 5: Botões de Ação */}
      <S.Actions>
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton variant="circle" width={40} height={40} />
      </S.Actions>
    </S.PostDetailSkeletonContainer>
  )
}

export default PostDetailSkeleton
