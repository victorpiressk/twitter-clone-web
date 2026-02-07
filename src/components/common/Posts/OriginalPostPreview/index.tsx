import Avatar from '../../Avatar'
import type { OriginalPostPreviewProps } from './types'
import * as S from './styles'

const OriginalPostPreview = ({
  post,
  showConnector = false
}: OriginalPostPreviewProps) => {
  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds}s`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`

    const diffInDays = Math.floor(diffInSeconds / 86400)
    if (diffInDays < 7) return `${diffInDays}d`

    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  }

  return (
    <>
      <S.Container $showConnector={showConnector}>
        <Avatar src={post.author.avatar} alt={post.author.name} size="small" />

        <S.Content>
          <S.Header>
            <S.AuthorName>{post.author.name}</S.AuthorName>
            <S.Username>@{post.author.username}</S.Username>
            <S.Timestamp>{formatTimestamp(post.createdAt)}</S.Timestamp>
          </S.Header>

          <S.PostContent>{post.content}</S.PostContent>

          {post.images && post.images.length > 0 && (
            <S.ImagesGrid $count={post.images.length}>
              {post.images.slice(0, 4).map((image, index) => (
                <S.PostImage
                  key={index}
                  src={image}
                  alt={`Imagem ${index + 1}`}
                />
              ))}
            </S.ImagesGrid>
          )}
        </S.Content>
      </S.Container>

      {showConnector && (
        <S.ReplyingTo>
          Respondendo a <span>@{post.author.username}</span>
        </S.ReplyingTo>
      )}
    </>
  )
}

export default OriginalPostPreview
