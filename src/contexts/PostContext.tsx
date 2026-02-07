import { createContext, useState, useCallback, type ReactNode } from 'react'
import type { ImageFile } from '../components/common/Posts/ImagePreview/types'
import type { PostWithInteractions } from '../components/common/Posts/PostCard/types'

type PostContextType = {
  posts: PostWithInteractions[]
  createPost: (content: string, images?: ImageFile[]) => void
  likePost: (postId: number) => void
  retweetPost: (postId: number) => void
  quoteTweet: (
    originalPostId: number,
    content: string,
    images?: ImageFile[]
  ) => void
  commentPost: (content: string, images?: ImageFile[]) => void
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<PostWithInteractions[]>([])

  const createPost = useCallback((content: string, images?: ImageFile[]) => {
    const newPost: PostWithInteractions = {
      id: Date.now(),
      author: {
        id: 1,
        username: 'victor',
        first_name: 'Victor',
        last_name: 'Pires',
        profile_image: 'https://i.pravatar.cc/150?img=1', // Ajustar
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
        images?.map((img, index) => ({
          // Se o ID do front for string numérica, convertemos.
          // Se não, usamos o timestamp + index para garantir um number único no mock.
          id: isNaN(Number(img.id)) ? Date.now() + index : Number(img.id),
          type: 'image', // Como vem de ImageFile, o tipo é fixo
          url: img.preview,
          order: index // A ordem segue a posição no array
        })) || []
    }

    setPosts((prev) => [newPost, ...prev])
  }, [])

  const likePost = useCallback((postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.stats.likes,
              stats: {
                ...post.stats,
                likes: post.stats.likes
                  ? post.stats.likes - 1
                  : post.stats.likes + 1
              }
            }
          : post
      )
    )
  }, [])

  const retweetPost = useCallback((postId: number) => {
    setPosts((prev) => {
      const originalPost = prev.find((p) => p.id === postId)
      if (!originalPost) return prev

      const alreadyRetweeted = prev.some(
        (p) => p.retweet_of === postId && p.author.id === 1
      )

      if (alreadyRetweeted) {
        // Remove o retweet (Desfazer)
        return prev
          .filter((p) => !(p.retweet_of === postId && p.author.id === 1))
          .map((p) =>
            p.id === postId
              ? {
                  ...p,
                  stats: { ...p.stats, retweets: p.stats.retweets - 1 },
                  isRetweeted: false
                }
              : p
          )
      }

      // Cria o novo post de retweet seguindo seu modelo de backend
      const newRetweet: PostWithInteractions = {
        id: Date.now(), // No backend será gerado automaticamente
        content: '', // Retweet simples não tem conteúdo
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
        retweet_of: postId,
        is_bookmarked: false
      }

      // Atualiza o contador no post original e adiciona o novo na lista
      return [
        newRetweet,
        ...prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                stats: { ...p.stats, retweets: p.stats.retweets + 1 },
                isRetweeted: true
              }
            : p
        )
      ]
    })
  }, [])

  const quoteTweet = useCallback(
    (originalPostId: number, content: string, images?: ImageFile[]) => {
      // Encontra o post original
      const originalPost = posts.find((p) => p.id === originalPostId)

      if (!originalPost) {
        console.error('Post original não encontrado')
        return
      }

      // Cria novo post (Quote Tweet)
      const quotePost: PostWithInteractions = {
        id: Date.now(),
        author: {
          id: 1,
          username: 'victor',
          first_name: 'Victor Pires',
          last_name: '',
          profile_image: 'https://i.pravatar.cc/150?img=1',
          isFollowing: false,
          bio: ''
        },
        content, // ← Comentário do usuário
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
          images?.map((img, index) => ({
            // Se o ID do front for string numérica, convertemos.
            // Se não, usamos o timestamp + index para garantir um number único no mock.
            id: isNaN(Number(img.id)) ? Date.now() + index : Number(img.id),
            type: 'image', // Como vem de ImageFile, o tipo é fixo
            url: img.preview,
            order: index // A ordem segue a posição no array
          })) || [],
        retweet_comment: {
          // ← Post original embutido
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

      // Atualiza lista de posts
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

        // Adiciona o Quote Tweet no topo
        return [quotePost, ...updatedPosts]
      })
    },
    [posts]
  )

  const commentPost = useCallback((content: string, images?: ImageFile[]) => {
    console.log('Comentar no post:', content, images)
    // TODO: Implementar lógica de comentários
  }, [])

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
