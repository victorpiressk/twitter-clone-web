import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PostDetailCard from './components/PostDetailCard'
import CommentForm from './components/CommentForm'
import PostList from '../../components/common/PostList'
import type { Post } from '../../components/common/PostCard/types'
import type { PostWithComments } from './types'
import { ContentWrapper } from '../../styles/globalStyles'
import InfoBar from '../../components/Layout/InfoBar'
import BackButton from '../../components/common/BackButton'
import * as S from './styles'

// Mock data (depois vem da API)
const mockPost: PostWithComments = {
  id: '1',
  author: {
    id: '1',
    username: 'victor',
    displayName: 'Victor Pires'
  },
  content: 'Olá mundo! Este é meu primeiro post no Twitter Clone 🚀',
  createdAt: new Date(Date.now() - 3600000).toISOString(),
  stats: {
    comments: 2,
    retweets: 5,
    likes: 42,
    views: 1234
  },
  isLiked: false,
  isRetweeted: false,
  comments: [
    {
      id: '2',
      author: {
        id: '2',
        username: 'maria',
        displayName: 'Maria Costa'
      },
      content: 'Ótimo post!',
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      stats: { comments: 0, retweets: 0, likes: 5, views: 100 },
      isLiked: false,
      isRetweeted: false
    },
    {
      id: '3',
      author: {
        id: '3',
        username: 'joao',
        displayName: 'João Silva'
      },
      content: 'Concordo! 👍',
      createdAt: new Date(Date.now() - 900000).toISOString(),
      stats: { comments: 0, retweets: 1, likes: 3, views: 50 },
      isLiked: false,
      isRetweeted: false
    }
  ]
}

const PostDetail = () => {
  const { username, postId } = useParams()
  const [post, setPost] = useState(mockPost)
  const [comments, setComments] = useState(mockPost.comments)

  // TODO: Integrar com API
  console.log('Viewing post:', username, postId)

  const handleLike = () => {
    setPost((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      stats: {
        ...prev.stats,
        likes: prev.isLiked ? prev.stats.likes - 1 : prev.stats.likes + 1
      }
    }))
  }

  const handleRetweet = () => {
    setPost((prev) => ({
      ...prev,
      isRetweeted: !prev.isRetweeted,
      stats: {
        ...prev.stats,
        retweets: prev.isRetweeted
          ? prev.stats.retweets - 1
          : prev.stats.retweets + 1
      }
    }))
  }

  const handleComment = (content: string) => {
    const newComment: Post = {
      id: Date.now().toString(),
      author: {
        id: '1',
        username: 'victor',
        displayName: 'Victor Pires'
      },
      content,
      createdAt: new Date().toISOString(),
      stats: { comments: 0, retweets: 0, likes: 0, views: 0 },
      isLiked: false,
      isRetweeted: false
    }

    setComments((prev) => [newComment, ...prev])
    setPost((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        comments: prev.stats.comments + 1
      }
    }))
  }

  const handleCommentLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              stats: {
                ...comment.stats,
                likes: comment.isLiked
                  ? comment.stats.likes - 1
                  : comment.stats.likes + 1
              }
            }
          : comment
      )
    )
  }

  const handleCommentRetweet = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isRetweeted: !comment.isRetweeted,
              stats: {
                ...comment.stats,
                retweets: comment.isRetweeted
                  ? comment.stats.retweets - 1
                  : comment.stats.retweets + 1
              }
            }
          : comment
      )
    )
  }

  const handleCommentComment = (commentId: string) => {
    console.log('Responder comentário:', commentId)
  }

  return (
    <ContentWrapper>
      <S.PostDetailContainer>
        <S.PostDetailHeader>
          <BackButton />
          <S.HeaderTitle>Post</S.HeaderTitle>
        </S.PostDetailHeader>

        <PostDetailCard
          post={post}
          onLike={handleLike}
          onRetweet={handleRetweet}
        />

        <CommentForm onSubmit={handleComment} />

        <S.CommentsSection>
          <PostList
            posts={comments}
            onLike={handleCommentLike}
            onRetweet={handleCommentRetweet}
            onComment={handleCommentComment}
          />
        </S.CommentsSection>
      </S.PostDetailContainer>
      <InfoBar />
    </ContentWrapper>
  )
}

export default PostDetail
