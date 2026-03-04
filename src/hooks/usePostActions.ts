// src/hooks/usePostActions.ts
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useRetweetPostMutation,
  useUnretweetPostMutation,
  useDeletePostMutation
} from '../store/slices/api/posts'
import {
  toggleLike,
  toggleRetweet,
  toggleBookmark,
  removePost,
  selectPostById
} from '../store/slices/posts/postsSlice'
import { useToast } from './useToast'

/**
 * Hook para ações em um post específico
 * Ideal para PostCard, botões de interação, etc.
 *
 * @param postId - ID do post
 * @returns Ações e estado do post
 */
export const usePostActions = (postId: number) => {
  const dispatch = useAppDispatch()
  const { showToast } = useToast()

  // ✅ Busca post no cache global (funciona em qualquer contexto)
  const post = useAppSelector((state) => selectPostById(state, postId))

  // ✅ Mutations
  const [likePostMutation] = useLikePostMutation()
  const [unlikePostMutation] = useUnlikePostMutation()
  const [retweetPostMutation] = useRetweetPostMutation()
  const [unretweetPostMutation] = useUnretweetPostMutation()
  const [deletePostMutation] = useDeletePostMutation()

  // ============================================
  // LIKE
  // ============================================
  const likePost = useCallback(async () => {
    if (!post) return

    // ✅ Update otimista
    dispatch(toggleLike(postId))

    try {
      if (post.isLiked) {
        await unlikePostMutation(postId).unwrap()
      } else {
        await likePostMutation({ post: postId }).unwrap()
      }
    } catch (error) {
      // ✅ Reverte se falhar
      dispatch(toggleLike(postId))
      showToast('error', 'Erro ao curtir post')
      console.error('Erro ao dar like:', error)
    }
  }, [post, postId, likePostMutation, unlikePostMutation, dispatch, showToast])

  // ============================================
  // RETWEET
  // ============================================
  const retweetPost = useCallback(async () => {
    if (!post) return

    // ✅ Update otimista
    dispatch(toggleRetweet(postId))

    try {
      if (post.isRetweeted) {
        await unretweetPostMutation(postId).unwrap()
      } else {
        await retweetPostMutation(postId).unwrap()
      }
    } catch (error) {
      // ✅ Reverte se falhar
      dispatch(toggleRetweet(postId))
      showToast('error', 'Erro ao retweetar')
      console.error('Erro ao retweetar:', error)
    }
  }, [
    post,
    postId,
    retweetPostMutation,
    unretweetPostMutation,
    dispatch,
    showToast
  ])

  // ============================================
  // BOOKMARK
  // ============================================
  const bookmarkPost = useCallback(() => {
    if (!post) return

    // ✅ Update otimista local (backend ainda não implementado)
    dispatch(toggleBookmark(postId))

    showToast(
      'success',
      post.isBookmarked ? 'Post removido dos salvos' : 'Post salvo!'
    )
  }, [post, postId, dispatch, showToast])

  // ============================================
  // DELETE
  // ============================================
  const deletePost = useCallback(async () => {
    if (!post) return

    // Confirmar antes de deletar
    if (!window.confirm('Tem certeza que deseja deletar este post?')) {
      return
    }

    try {
      await deletePostMutation(postId).unwrap()

      // ✅ Remove do Redux
      dispatch(removePost(postId))

      showToast('success', 'Post deletado!')
    } catch (error) {
      showToast('error', 'Erro ao deletar post')
      console.error('Erro ao deletar:', error)
    }
  }, [post, postId, deletePostMutation, dispatch, showToast])

  // ============================================
  // DERIVED STATES (para facilitar uso nos componentes)
  // ============================================
  return {
    // Post completo
    post,

    // Actions
    likePost,
    retweetPost,
    bookmarkPost,
    deletePost,

    // Derived states (evita post?.isLiked nos componentes)
    isLiked: post?.isLiked ?? false,
    isRetweeted: post?.isRetweeted ?? false,
    isBookmarked: post?.isBookmarked ?? false,

    // Stats
    likesCount: post?.stats.likes ?? 0,
    retweetsCount: post?.stats.retweets ?? 0,
    commentsCount: post?.stats.comments ?? 0,
    viewsCount: post?.stats.views ?? 0
  }
}
