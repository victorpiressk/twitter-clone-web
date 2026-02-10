import { createContext, useState, useCallback, type ReactNode } from 'react'
import type { MediaFile } from '../components/common/Forms/MediaPreview/types'
import type { PostWithInteractions } from '../components/common/Posts/PostCard/types'

type PostContextType = {
  posts: PostWithInteractions[]
  createPost: (content: string, medias?: MediaFile[]) => void
  likePost: (postId: number) => void
  retweetPost: (postId: number) => void
  quoteTweet: (
    originalPostId: number,
    content: string,
    medias?: MediaFile[]
  ) => void
  commentPost: (postId: number, content: string, medias?: MediaFile[]) => void
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<PostWithInteractions[]>([])

  // ============================================
  // CREATE POST
  // ============================================
  const createPost = useCallback((content: string, medias?: MediaFile[]) => {
    const newPost: PostWithInteractions = {
      id: Date.now(),
      author: {
        id: 1,
        username: 'victor',
        first_name: 'Victor',
        last_name: 'Pires',
        profile_image: 'https://i.pravatar.cc/150?img=1',
        bio: '',
        isFollowing: false
      },
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_published: true,
      stats: {
        comments: 0,
        retweets: 0,
        likes: 0,
        views: 0
      },
      is_liked: false,
      is_retweeted: false,
      is_bookmarked: false,
      media:
        medias?.map((media, index) => ({
          id: isNaN(Number(media.id)) ? Date.now() + index : Number(media.id),
          type: media.type, // ← Agora usa o tipo correto (image/gif/video)
          url: media.preview,
          order: index
        })) || []
    }

    setPosts((prev) => [newPost, ...prev])
  }, [])

  // ============================================
  // LIKE POST
  // ============================================
  const likePost = useCallback((postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              is_liked: !post.is_liked, // ← Toggle correto
              stats: {
                ...post.stats,
                likes: post.is_liked
                  ? post.stats.likes - 1 // Já curtido → remove like
                  : post.stats.likes + 1 // Não curtido → adiciona like
              }
            }
          : post
      )
    )
  }, [])

  // ============================================
  // RETWEET POST (Simples)
  // ============================================
  const retweetPost = useCallback((postId: number) => {
    setPosts((prev) => {
      const originalPost = prev.find((p) => p.id === postId)
      if (!originalPost) return prev

      // Verifica se o usuário atual já retweetou este post
      const alreadyRetweeted = prev.some(
        (p) =>
          p.retweet_of === postId && !p.retweet_comment && p.author.id === 1
      )

      if (alreadyRetweeted) {
        // ========== DESFAZER RETWEET ==========
        return prev
          .filter(
            // Remove o retweet simples do usuário atual
            (p) =>
              !(
                p.retweet_of === postId &&
                !p.retweet_comment &&
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
                  is_retweeted: false // ← Toggle para false
                }
              : p
          )
      }

      // ========== CRIAR RETWEET ==========
      const newRetweet: PostWithInteractions = {
        id: Date.now(),
        content: '', // Retweet simples não tem conteúdo próprio
        author: {
          id: 1,
          username: 'victor',
          first_name: 'Victor',
          last_name: 'Pires',
          profile_image: 'https://i.pravatar.cc/150?img=1',
          bio: '',
          isFollowing: false
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_published: true,
        stats: { comments: 0, retweets: 0, likes: 0, views: 0 },
        is_liked: false,
        is_retweeted: false,
        is_bookmarked: false,
        retweet_of: postId // ← Referência ao post original
        // retweet_comment ausente → é um retweet simples
      }

      return [
        newRetweet,
        ...prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                stats: { ...p.stats, retweets: p.stats.retweets + 1 },
                is_retweeted: true // ← Toggle para true
              }
            : p
        )
      ]
    })
  }, [])

  // ============================================
  // QUOTE TWEET (Retweet com Comentário)
  // ============================================
  const quoteTweet = useCallback(
    (originalPostId: number, content: string, medias?: MediaFile[]) => {
      const originalPost = posts.find((p) => p.id === originalPostId)

      if (!originalPost) {
        console.error('Post original não encontrado')
        return
      }

      const quotePost: PostWithInteractions = {
        id: Date.now(),
        author: {
          id: 1,
          username: 'victor',
          first_name: 'Victor',
          last_name: 'Pires',
          profile_image: 'https://i.pravatar.cc/150?img=1',
          isFollowing: false,
          bio: ''
        },
        content, // ← Comentário do usuário sobre o post original
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_published: true,
        stats: {
          comments: 0,
          retweets: 0,
          likes: 0,
          views: 0
        },
        is_liked: false,
        is_retweeted: false,
        is_bookmarked: false,
        media:
          medias?.map((media, index) => ({
            id: isNaN(Number(media.id)) ? Date.now() + index : Number(media.id),
            type: media.type, // ← Tipo correto (image/gif/video)
            url: media.preview,
            order: index
          })) || [],
        retweet_of: originalPostId, // ← Referência ao post original
        retweet_comment: {
          // ← Dados do post original embutidos
          id: originalPost.id,
          author: {
            id: originalPost.author.id,
            first_name: originalPost.author.first_name,
            last_name: originalPost.author.last_name,
            username: originalPost.author.username,
            profile_image: originalPost.author.profile_image,
            bio: originalPost.author.bio,
            isFollowing: originalPost.author.isFollowing
          },
          content: originalPost.content,
          createdAt: originalPost.created_at,
          media: originalPost.media
        }
      }

      setPosts((prev) => {
        // Incrementa contador de retweets do post original
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
    [posts]
  )

  // ============================================
  // COMMENT POST (Resposta/Reply)
  // ============================================
  const commentPost = useCallback(
    (postId: number, content: string, medias?: MediaFile[]) => {
      const originalPost = posts.find((p) => p.id === postId)

      if (!originalPost) {
        console.error('Post original não encontrado')
        return
      }

      // Cria novo post como comentário/resposta
      const commentPost: PostWithInteractions = {
        id: Date.now(),
        author: {
          id: 1,
          username: 'victor',
          first_name: 'Victor',
          last_name: 'Pires',
          profile_image: 'https://i.pravatar.cc/150?img=1',
          bio: '',
          isFollowing: false
        },
        content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_published: true,
        stats: {
          comments: 0,
          retweets: 0,
          likes: 0,
          views: 0
        },
        is_liked: false,
        is_retweeted: false,
        is_bookmarked: false,
        media:
          medias?.map((media, index) => ({
            id: isNaN(Number(media.id)) ? Date.now() + index : Number(media.id),
            type: media.type, // ← Tipo correto
            url: media.preview,
            order: index
          })) || [],
        in_reply_to: postId // ← Referência ao post pai (comentário)
      }

      setPosts((prev) => {
        // Incrementa contador de comentários do post original
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

        // Adiciona comentário no topo (ou você pode adicionar abaixo do post pai)
        return [commentPost, ...updatedPosts]
      })
    },
    [posts]
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
