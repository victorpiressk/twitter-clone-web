import {
  createContext,
  useState,
  useCallback,
  type ReactNode,
  useMemo
} from 'react'
import type { PostMedia, PostWithInteractions } from '../models'
import { MOCK_CURRENT_USER } from '../mocks/user'

type PostContextType = {
  posts: PostWithInteractions[]
  createPost: (content: string, medias?: PostMedia[]) => void
  likePost: (postId: number) => void
  retweetPost: (postId: number) => void
  quoteTweet: (
    originalPostId: number,
    content: string,
    medias?: PostMedia[]
  ) => void
  commentPost: (postId: number, content: string, medias?: PostMedia[]) => void
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<PostWithInteractions[]>([])

  // ✅ MOCK: Usuário atual (TODO: Substituir por Redux)

  const localCurrentUser = useMemo(() => {
    return MOCK_CURRENT_USER
  }, [])

  // ============================================
  // CREATE POST
  // ============================================
  const createPost = useCallback(
    (content: string, medias?: PostMedia[]) => {
      const newPost: PostWithInteractions = {
        id: Date.now(),
        content,
        author: localCurrentUser, // ✅ Reutiliza constante
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        isPublished: true,
        stats: {
          comments: 0,
          retweets: 0,
          likes: 0,
          views: 0
        },
        isLiked: false,
        isRetweeted: false,
        isBookmarked: false,
        media: medias || []
      }

      setPosts((prev) => [newPost, ...prev])
    },
    [localCurrentUser]
  )

  // ============================================
  // LIKE POST
  // ============================================
  const likePost = useCallback((postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked, // ✅ CORRIGIDO: camelCase
              stats: {
                ...post.stats,
                likes: post.isLiked
                  ? post.stats.likes - 1
                  : post.stats.likes + 1
              }
            }
          : post
      )
    )
  }, [])

  // ============================================
  // RETWEET POST (Simples)
  // ============================================
  const retweetPost = useCallback(
    (postId: number) => {
      setPosts((prev) => {
        const originalPost = prev.find((p) => p.id === postId)
        if (!originalPost) return prev

        // ✅ CORRIGIDO: Verifica retweet simples (content vazio)
        const alreadyRetweeted = prev.some(
          (p) =>
            p.retweetOf === postId &&
            !p.content.trim() && // ← Retweet SIMPLES
            p.author.id === 1 // ← Do usuário atual
        )

        if (alreadyRetweeted) {
          // ========== DESFAZER RETWEET ==========
          return prev
            .filter(
              (p) =>
                !(
                  p.retweetOf === postId &&
                  !p.content.trim() &&
                  p.author.id === 1
                )
            )
            .map((p) =>
              p.id === postId
                ? {
                    ...p,
                    stats: {
                      ...p.stats,
                      retweets: Math.max(0, p.stats.retweets - 1)
                    },
                    isRetweeted: false // ✅ CORRIGIDO: camelCase + seta no original
                  }
                : p
            )
        }

        // ========== CRIAR RETWEET ==========
        const newRetweet: PostWithInteractions = {
          id: Date.now(),
          content: '', // ← Retweet simples: content vazio
          author: localCurrentUser, // ✅ Reutiliza constante
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
          isPublished: true,
          stats: {
            comments: 0,
            retweets: 0,
            likes: 0,
            views: 0
          },
          isLiked: false,
          isRetweeted: false, // ✅ CORRIGIDO: camelCase
          isBookmarked: false,
          retweetOf: postId
        }

        return [
          newRetweet,
          ...prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  stats: { ...p.stats, retweets: p.stats.retweets + 1 },
                  isRetweeted: true // ✅ CORRIGIDO: camelCase
                }
              : p
          )
        ]
      })
    },
    [localCurrentUser]
  )

  // ============================================
  // QUOTE TWEET (Retweet com Comentário)
  // ============================================
  const quoteTweet = useCallback(
    (originalPostId: number, comment: string, medias?: PostMedia[]) => {
      const originalPost = posts.find((p) => p.id === originalPostId)

      if (!originalPost) {
        console.error('Post original não encontrado')
        return
      }

      const quotePost: PostWithInteractions = {
        id: Date.now(),
        content: comment, // ← Quote Tweet: content preenchido
        author: localCurrentUser, // ✅ Reutiliza constante
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        isPublished: true,
        stats: {
          comments: 0,
          retweets: 0,
          likes: 0,
          views: 0
        },
        isLiked: false,
        isRetweeted: false,
        isBookmarked: false,
        media: medias || [],
        retweetOf: originalPostId
      }

      setPosts((prev) => {
        const updatedPosts = prev.map((post) =>
          post.id === originalPostId
            ? {
                ...post,
                stats: {
                  ...post.stats,
                  retweets: post.stats.retweets + 1
                }
              }
            : post
        )

        return [quotePost, ...updatedPosts]
      })
    },
    [posts, localCurrentUser]
  )

  // ============================================
  // COMMENT POST (Resposta/Reply)
  // ============================================
  const commentPost = useCallback(
    (postId: number, content: string, medias?: PostMedia[]) => {
      const originalPost = posts.find((p) => p.id === postId)

      if (!originalPost) {
        console.error('Post original não encontrado')
        return
      }

      const commentPost: PostWithInteractions = {
        id: Date.now(),
        content,
        author: localCurrentUser, // ✅ Reutiliza constante
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(), // ✅ ADICIONADO
        isPublished: true,
        stats: {
          comments: 0,
          retweets: 0,
          likes: 0,
          views: 0
        },
        isLiked: false,
        isRetweeted: false,
        isBookmarked: false,
        media: medias || [],
        inReplyTo: postId
      }

      setPosts((prev) => {
        const updatedPosts = prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                stats: {
                  ...post.stats,
                  comments: post.stats.comments + 1
                }
              }
            : post
        )

        return [commentPost, ...updatedPosts]
      })
    },
    [posts, localCurrentUser]
  )

  return (
    <PostContext.Provider
      value={{
        posts,
        createPost,
        likePost,
        retweetPost,
        quoteTweet,
        commentPost
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export default PostContext
