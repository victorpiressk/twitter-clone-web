import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostCard from '../../components/common/Posts/PostCard'
import PostList from '../../components/common/Posts/PostList'
import InfoBar from '../../components/Layout/InfoBar'
import BackButton from '../../components/common/BackButton'
import PostDetailSkeleton from '../../components/common/Skeleton/components/PostDetailSkeleton'
import PostListSkeleton from '../../components/common/Skeleton/components/PostSkeleton/PostListSkeleton'
import ScrollToTop from '../../hooks/useScrollToTop'
import { usePost } from '../../hooks/usePost'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

const PostDetail = () => {
  const { posts, likePost, retweetPost, quoteTweet, commentPost } = usePost()
  const { postId } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [postId])

  // ✅ Encontra o post específico pelo ID
  const post = useMemo(() => {
    return posts.find((p) => p.id === Number(postId))
  }, [posts, postId])

  // ✅ Filtra comentários do post (TODO: quando implementar comentários)
  const comments = useMemo(() => {
    // Por enquanto, retorna array vazio
    // Quando implementar comentários, filtrar posts onde parentId === postId
    return []
  }, [])

  // ✅ Se post não existe, redireciona (post deletado ou ID inválido)
  useEffect(() => {
    if (!isLoading && !post) {
      navigate('/home')
    }
  }, [isLoading, post, navigate])

  // ✅ Se ainda carregando ou post não encontrado, mostra skeleton
  if (isLoading || !post) {
    return (
      <>
        <ScrollToTop />
        <ContentWrapper>
          <S.PostDetailContainer>
            <S.PostDetailHeader>
              <BackButton />
              <S.HeaderTitle>Post</S.HeaderTitle>
            </S.PostDetailHeader>
            <PostDetailSkeleton />
            <S.CommentsSection>
              <PostListSkeleton count={5} />
            </S.CommentsSection>
          </S.PostDetailContainer>
          <InfoBar />
        </ContentWrapper>
      </>
    )
  }

  return (
    <>
      <ScrollToTop />
      <ContentWrapper>
        <S.PostDetailContainer>
          <S.PostDetailHeader>
            <BackButton />
            <S.HeaderTitle>Post</S.HeaderTitle>
          </S.PostDetailHeader>

          {/* ✅ Passa objeto único (post) */}
          <PostCard
            post={post}
            onLike={likePost}
            onRetweet={retweetPost}
            onQuoteTweet={quoteTweet}
            onComment={commentPost}
            variant="detailed"
          />

          {/* ✅ Seção de comentários */}
          <S.CommentsSection>
            {comments.length > 0 ? (
              <PostList
                posts={comments}
                onLike={likePost}
                onRetweet={retweetPost}
                onQuoteTweet={quoteTweet}
                onComment={commentPost}
              />
            ) : (
              <S.NoComments>
                <S.NoCommentsText>
                  Nenhum comentário ainda. Seja o primeiro a comentar!
                </S.NoCommentsText>
              </S.NoComments>
            )}
          </S.CommentsSection>
        </S.PostDetailContainer>
        <InfoBar />
      </ContentWrapper>
    </>
  )
}

export default PostDetail
