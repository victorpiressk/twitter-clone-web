import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRenderHashtags } from '../../../../../../hooks/useRenderHashtags'
import { useAppSelector } from '../../../../../../store/hooks'
import { selectPostById } from '../../../../../../store/slices/posts/postsSlice'
import { formatDate } from '../../../../../../utils/formatDate'
import LocationPreview from '../../../../Forms/LocationPreview'
import PollPreview from '../../../../Forms/PollPreview'
import SchedulePreview from '../../../../Forms/SchedulePreview'
import OriginalPostEmbed from '../../../OriginalPostEmbed'
import * as S from './styles'
import type { PostCardContentProps } from './types'

const PostCardContent = ({ post, variant }: PostCardContentProps) => {
  const navigate = useNavigate()
  const [hasVoted, setHasVoted] = useState(false)

  const retweetOfId = typeof post.retweetOf === 'number' ? post.retweetOf : null

  const originalPost = useAppSelector((state) =>
    retweetOfId ? selectPostById(state, retweetOfId) : null
  )

  const contentWithHashtags = useRenderHashtags({ content: post.content })

  if (!post) return null

  const isQuoteTweet = !!post.retweetOf && !!post.content.trim()

  const createTime = new Date(post.createdAt).getTime()
  const updateTime = new Date(post.updatedAt).getTime()
  const isEdited = post.updatedAt && updateTime - createTime > 1000

  const handleClickProfile = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/${post.author.username}`)
  }

  const handleVote = () => {
    // TODO: implementar votação via API
    setHasVoted(true)
  }

  return (
    <S.PostContent>
      {variant === 'default' && (
        <S.PostHeader>
          <S.DisplayName onClick={handleClickProfile}>
            {post.author.firstName} {post.author.lastName}
          </S.DisplayName>
          <S.Username onClick={handleClickProfile}>
            @{post.author.username}
          </S.Username>
          <S.Separator>·</S.Separator>
          {post.updatedAt ? (
            <S.PostDate>
              {formatDate(isEdited ? post.updatedAt : post.createdAt, 'feed')}
              {isEdited && (
                <>
                  {' '}
                  <S.Separator>·</S.Separator> Editado
                </>
              )}
            </S.PostDate>
          ) : (
            <S.PostDate>{formatDate(post.createdAt, 'feed')}</S.PostDate>
          )}
        </S.PostHeader>
      )}

      <S.PostText $variant={variant}>{contentWithHashtags}</S.PostText>

      {post.media && post.media.length > 0 && (
        <S.ImagesGrid $count={post.media.length}>
          {post.media.map((media, idx) => (
            <S.PostImage key={media.id || idx} src={media.url} alt="Media" />
          ))}
        </S.ImagesGrid>
      )}

      {isQuoteTweet && originalPost && (
        <OriginalPostEmbed post={originalPost} />
      )}

      {post.poll && (
        <PollPreview
          question={post.poll.question || ''}
          options={post.poll.options}
          variant="display"
          totalVotes={post.poll.totalVotes || 0}
          votes={post.poll.options.reduce(
            (acc, opt) => {
              acc[opt.text] = opt.votes
              return acc
            },
            {} as Record<string, number>
          )}
          hasVoted={hasVoted}
          onVote={handleVote}
        />
      )}

      {post.scheduledFor && (
        <SchedulePreview
          scheduledDate={new Date(post.scheduledFor)}
          variant="display"
        />
      )}

      {post.location && (
        <LocationPreview locationName={post.location.name} variant="display" />
      )}
    </S.PostContent>
  )
}

export default PostCardContent
