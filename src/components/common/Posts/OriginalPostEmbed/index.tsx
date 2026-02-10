import Avatar from '../../Avatar'
import * as S from './styles'
import { formatDate } from '../../../../utils/formatDate'
import type { PostWithInteractions } from '../PostCard/types'

const OriginalPostEmbed = ({
  author,
  created_at,
  content,
  media
}: PostWithInteractions) => {
  return (
    <S.Container>
      <S.Header>
        <Avatar
          src={author.profile_image}
          alt={author.first_name}
          size="small"
        />

        <S.AuthorInfo>
          <S.TopRow>
            <S.AuthorName>{author.first_name}</S.AuthorName>
            <S.Username>@{author.username}</S.Username>
            <S.Timestamp>{formatDate(created_at, 'feed')}</S.Timestamp>
          </S.TopRow>
        </S.AuthorInfo>
      </S.Header>

      <S.PostContent>{content}</S.PostContent>

      {media && media.length > 0 && (
        <S.ImagesGrid $count={media.length}>
          {media.slice(0, 4).map((media, index) => (
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
