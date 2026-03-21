import { formatDate } from '../../../../utils/formatDate'
import Avatar from '../../Avatar'
import * as S from './styles'
import type { OriginalPostEmbedProps } from './types'

const OriginalPostEmbed = ({ post }: OriginalPostEmbedProps) => {
  return (
    <S.Container>
      <S.Header>
        <Avatar
          src={post.author.avatar}
          alt={post.author.username}
          size="small"
        />

        <S.AuthorInfo>
          <S.TopRow>
            <S.AuthorName>
              {post.author.firstName} {post.author.lastName}
            </S.AuthorName>
            <S.Username>@{post.author.username}</S.Username>
            <S.Timestamp>{formatDate(post.createdAt, 'feed')}</S.Timestamp>
          </S.TopRow>
        </S.AuthorInfo>
      </S.Header>

      <S.PostContent>{post.content}</S.PostContent>

      {post.media && post.media.length > 0 && (
        <S.ImagesGrid $count={post.media.length}>
          {post.media.slice(0, 4).map((media, index) => (
            <S.PostImage
              key={index}
              src={media.url}
              alt={`Media ${index + 1}`}
            />
          ))}
        </S.ImagesGrid>
      )}
    </S.Container>
  )
}

export default OriginalPostEmbed
