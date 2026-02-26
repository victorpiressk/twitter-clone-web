import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  useCreatePostMutation,
  useLikePostMutation,
  useRetweetPostMutation,
  useUnlikePostMutation,
  useUnretweetPostMutation
} from '../store/slices/api/posts'
import {
  toggleLike,
  toggleRetweet,
  incrementComments,
  upsertPost,
  selectFeedPosts
} from '../store/slices/posts/postsSlice'
import { useToast } from './useToast'
import {
  revokeMediaPreviews,
  type PostMediaWithFile
} from '../utils/mediaHelpers'

/**
 * Hook centralizado para operações de posts
 *
 * Agora usa Redux + API real internamente,
 * mas mantém a mesma interface para compatibilidade
 */
export const usePost = () => {
  const dispatch = useAppDispatch()
  const { showToast } = useToast()
  const posts = useAppSelector(selectFeedPosts)

  // ✅ Mutations
  const [createPostMutation] = useCreatePostMutation()
  const [likePostMutation] = useLikePostMutation()
  const [unlikePostMutation] = useUnlikePostMutation()
  const [retweetPostMutation] = useRetweetPostMutation()
  const [unretweetPostMutation] = useUnretweetPostMutation()

  // Função interna para extrair Files dos objetos de mídia da UI
  const extractFiles = (
    medias?: PostMediaWithFile[] | File[]
  ): File[] | undefined => {
    if (!medias || medias.length === 0) return undefined

    // Se o primeiro item já for File, apenas retorna o array tipado
    if (medias[0] instanceof File) {
      return medias as File[]
    }

    // Caso contrário, mapeia os objetos PostMediaWithFile pegando o _file
    return (medias as PostMediaWithFile[])
      .map((m) => m._file)
      .filter((f): f is File => f instanceof File)
  }

  // ============================================
  // CREATE (Post, Quote, Comment)
  // ============================================
  const submitPost = useCallback(
    async (args: {
      content: string
      medias?: PostMediaWithFile[] | File[]
      inReplyTo?: number
      retweetOf?: number
      successMsg: string
    }) => {
      try {
        const files = extractFiles(args.medias)
        const result = await createPostMutation({
          content: args.content,
          mediaFiles: files,
          inReplyTo: args.inReplyTo,
          retweetOf: args.retweetOf
        }).unwrap()

        dispatch(
          upsertPost({
            ...result,
            isLiked: false,
            isRetweeted: false,
            isBookmarked: false
          })
        )

        // Se for comentário, incrementa o contador no post pai
        if (args.inReplyTo) dispatch(incrementComments(args.inReplyTo))

        // Limpa os Blobs da memória se houver mídias temporárias
        if (args.medias && !(args.medias[0] instanceof File)) {
          revokeMediaPreviews(args.medias as PostMediaWithFile[])
        }

        showToast('success', args.successMsg)
      } catch (error) {
        showToast('error', 'Erro ao processar a postagem')
        console.error('Submit Error:', error)
      }
    },
    [createPostMutation, dispatch, showToast]
  )

  const createPost = (content: string, medias?: PostMediaWithFile[] | File[]) =>
    submitPost({ content, medias, successMsg: 'Post criado!' })

  const quoteTweet = (
    originalPostId: number,
    content: string,
    medias?: PostMediaWithFile[] | File[]
  ) =>
    submitPost({
      content,
      medias,
      retweetOf: originalPostId,
      successMsg: 'Quote criado!'
    })

  const commentPost = (
    postId: number,
    content: string,
    medias?: PostMediaWithFile[] | File[]
  ) =>
    submitPost({
      content,
      medias,
      inReplyTo: postId,
      successMsg: 'Comentário enviado!'
    })

  // ============================================
  // LIKE POST
  // ============================================
  const likePost = useCallback(
    async (postId: number) => {
      const post = posts.find((p) => p.id === postId)
      if (!post) return

      // Update otimista
      dispatch(toggleLike(postId))

      try {
        if (post.isLiked) {
          await unlikePostMutation(postId).unwrap()
        } else {
          await likePostMutation({ post: postId }).unwrap()
        }
      } catch (error) {
        // Reverte se falhar
        dispatch(toggleLike(postId))
        showToast('error', 'Erro ao curtir post')
        console.error('Erro ao dar like:', error)
      }
    },
    [posts, likePostMutation, unlikePostMutation, dispatch, showToast]
  )

  // ============================================
  // RETWEET POST
  // ============================================
  const retweetPost = useCallback(
    async (postId: number) => {
      const post = posts.find((p) => p.id === postId)
      if (!post) return

      // Update otimista
      dispatch(toggleRetweet(postId))

      try {
        if (post.isRetweeted) {
          await unretweetPostMutation(postId).unwrap()
        } else {
          await retweetPostMutation(postId).unwrap()
        }
      } catch (error) {
        // Reverte se falhar
        dispatch(toggleRetweet(postId))
        showToast('error', 'Erro ao retweetar')
        console.error('Erro ao retweetar:', error)
      }
    },
    [posts, retweetPostMutation, unretweetPostMutation, dispatch, showToast]
  )

  return {
    posts,
    createPost,
    likePost,
    retweetPost,
    quoteTweet,
    commentPost
  }
}
