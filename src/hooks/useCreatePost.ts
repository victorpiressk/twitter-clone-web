import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  useCreatePostMutation,
  useUpdatePostMutation
} from '../store/slices/api/posts'
import { useQuoteRetweetMutation } from '../store/slices/api/posts/retweets.api'
import {
  upsertPost,
  incrementComments,
  incrementRetweets
} from '../store/slices/posts/postsSlice'
import { useToast } from './useToast'
import {
  revokeMediaPreviews,
  type PostMediaWithFile
} from '../utils/mediaHelpers'

/**
 * Hook para criação e edição de posts
 */
export const useCreatePost = () => {
  const dispatch = useAppDispatch()
  const { showToast } = useToast()

  const [createPostMutation, { isLoading: isCreating }] =
    useCreatePostMutation()
  const [updatePostMutation, { isLoading: isUpdating }] =
    useUpdatePostMutation()
  const [quoteRetweetMutation, { isLoading: isQuoting }] =
    useQuoteRetweetMutation()

  const postsById = useAppSelector((state) => state.posts.byId)

  // ============================================
  // HELPER: Extrair Files
  // ============================================
  const extractFiles = useCallback(
    (medias?: PostMediaWithFile[] | File[]): File[] | undefined => {
      if (!medias || medias.length === 0) return undefined

      if (medias[0] instanceof File) {
        return medias as File[]
      }

      return (medias as PostMediaWithFile[])
        .map((m) => m._file)
        .filter((f): f is File => f instanceof File)
    },
    []
  )

  // ============================================
  // SUBMIT POST (Função interna genérica)
  // ============================================
  const submitPost = useCallback(
    async (args: {
      postId?: number
      content: string
      medias?: PostMediaWithFile[] | File[]
      inReplyTo?: number
      retweetOf?: number
      successMsg: string
    }) => {
      console.log('🔍 submitPost args:', args)

      try {
        const files = extractFiles(args.medias)
        let result

        // ============================================
        // UPDATE POST
        // ============================================
        if (args.postId) {
          result = await updatePostMutation({
            id: args.postId,
            data: { content: args.content }
          }).unwrap()

          const existingPost = postsById[args.postId]

          if (existingPost) {
            dispatch(
              upsertPost({
                ...existingPost,
                ...result,
                id: args.postId
              })
            )
          }
        }
        // ============================================
        // QUOTE RETWEET (com comentário)
        // ============================================
        else if (args.retweetOf && args.content.trim()) {
          console.log('🔍 Quote Retweet detectado')

          result = await quoteRetweetMutation({
            postId: args.retweetOf,
            content: args.content,
            mediaFiles: files
          }).unwrap()

          dispatch(
            upsertPost({
              ...result,
              isLiked: false,
              isRetweeted: false,
              isBookmarked: false
            })
          )

          dispatch(incrementRetweets(args.retweetOf))
        }
        // ============================================
        // CREATE POST (normal ou reply)
        // ============================================
        else {
          result = await createPostMutation({
            content: args.content,
            mediaFiles: files,
            inReplyTo: args.inReplyTo
          }).unwrap()

          dispatch(
            upsertPost({
              ...result,
              isLiked: false,
              isRetweeted: false,
              isBookmarked: false
            })
          )
        }

        // ✅ Se for comentário, incrementa contador
        if (args.inReplyTo) {
          dispatch(incrementComments(args.inReplyTo))
        }

        // ✅ Limpa Blobs temporários
        if (args.medias && !(args.medias[0] instanceof File)) {
          revokeMediaPreviews(args.medias as PostMediaWithFile[])
        }

        showToast('success', args.successMsg)

        return result
      } catch (error) {
        showToast('error', 'Erro ao processar a postagem')
        console.error('Submit Error:', error)
        throw error
      }
    },
    [
      createPostMutation,
      updatePostMutation,
      quoteRetweetMutation,
      dispatch,
      showToast,
      extractFiles,
      postsById
    ]
  )

  // ============================================
  // CREATE POST
  // ============================================
  const createPost = useCallback(
    async (content: string, medias?: PostMediaWithFile[] | File[]) => {
      return submitPost({
        content,
        medias,
        successMsg: 'Post criado!'
      })
    },
    [submitPost]
  )

  // ============================================
  // QUOTE TWEET
  // ============================================
  const quoteTweet = useCallback(
    async (
      originalPostId: number,
      content: string,
      medias?: PostMediaWithFile[] | File[]
    ) => {
      console.log('🔍 quoteTweet chamado:', { originalPostId, content, medias })

      return submitPost({
        content,
        medias,
        retweetOf: originalPostId,
        successMsg: 'Quote criado!'
      })
    },
    [submitPost]
  )

  // ============================================
  // COMMENT POST
  // ============================================
  const commentPost = useCallback(
    async (
      postId: number,
      content: string,
      medias?: PostMediaWithFile[] | File[]
    ) => {
      return submitPost({
        content,
        medias,
        inReplyTo: postId,
        successMsg: 'Comentário enviado!'
      })
    },
    [submitPost]
  )

  // ============================================
  // UPDATE POST
  // ============================================
  const updatePost = useCallback(
    async (
      postId: number,
      content: string,
      medias?: PostMediaWithFile[] | File[]
    ) => {
      return submitPost({
        postId,
        content,
        medias,
        successMsg: 'Post editado!'
      })
    },
    [submitPost]
  )

  // ============================================
  // RETURN
  // ============================================
  return {
    createPost,
    quoteTweet,
    commentPost,
    updatePost,
    isCreating: isCreating || isUpdating || isQuoting
  }
}
