import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../../../store/hooks'
import { selectPostById } from '../../../../../../store/slices/posts/postsSlice'
import { useRenderHashtags } from '../../../../../../hooks/useRenderHashtags'
import LocationPreview from '../../../../Forms/LocationPreview'
import PollPreview from '../../../../Forms/PollPreview'
import SchedulePreview from '../../../../Forms/SchedulePreview'
import OriginalPostEmbed from '../../../OriginalPostEmbed'
import { formatDate } from '../../../../../../utils/formatDate'
import type { PostCardContentProps } from './types'
import * as S from './styles'

const PostCardContent = ({ post, variant }: PostCardContentProps) => {
  const navigate = useNavigate()
  const [hasVoted, setHasVoted] = useState(false)

  // ✅ Hook SEMPRE é chamado (sem condicional)
  const retweetOfId = typeof post.retweetOf === 'number' ? post.retweetOf : null

  // ✅ Busca post original do Redux (hook incondicionalmente)
  const originalPost = useAppSelector((state) =>
    retweetOfId ? selectPostById(state, retweetOfId) : null
  )

  // ✅ NOVO: Renderizar hashtags clicáveis
  const contentWithHashtags = useRenderHashtags({ content: post.content })

  // ✅ Safety check
  if (!post) return null

  const isQuoteTweet = !!post.retweetOf && !!post.content.trim()

  const createTime = new Date(post.createdAt).getTime()
  const updateTime = new Date(post.updatedAt).getTime()
  const isEdited = post.updatedAt && updateTime - createTime > 1000

  const handleClickProfile = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/${post.author.username}`)
  }

  const handleVote = (optionIndex: number) => {
    console.log('Votou na opção:', optionIndex)
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

      {/* Usa contentWithHashtags em vez de post.content */}
      <S.PostText $variant={variant}>{contentWithHashtags}</S.PostText>

      {/* Mídias */}
      {post.media && post.media.length > 0 && (
        <S.ImagesGrid $count={post.media.length}>
          {post.media.map((media, idx) => (
            <S.PostImage key={media.id || idx} src={media.url} alt="Media" />
          ))}
        </S.ImagesGrid>
      )}

      {/* ✅ Quote Tweet - Usa originalPost do Redux */}
      {isQuoteTweet && originalPost && (
        <OriginalPostEmbed post={originalPost} />
      )}

      {/* Poll */}
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

      {/* Schedule */}
      {post.scheduledFor && (
        <SchedulePreview
          scheduledDate={new Date(post.scheduledFor)}
          variant="display"
        />
      )}

      {/* Location */}
      {post.location && (
        <LocationPreview locationName={post.location.name} variant="display" />
      )}
    </S.PostContent>
  )
}

export default PostCardContent
