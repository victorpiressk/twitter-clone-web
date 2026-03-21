import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useDeletePostMutation
} from '../store/slices/api/posts'
import {
  toggleLike,
  toggleBookmark,
  removePost,
  selectPostById,
  setLikeId
} from '../store/slices/posts/postsSlice'
import { useToast } from './useToast'
import type { Like } from '../types/domain/models'

// Hook para ações em um post específico
export const usePostActions = (postId: number) => {
  const dispatch = useAppDispatch()
  const { showToast } = useToast()

  // Busca post no cache global (funciona em qualquer contexto)
  const post = useAppSelector((state) => selectPostById(state, postId))

  // Mutations
  const [likePostMutation] = useLikePostMutation()
  const [unlikePostMutation] = useUnlikePostMutation()
  const [deletePostMutation] = useDeletePostMutation()

  // ============================================
  // LIKE
  // ============================================
  const likePost = useCallback(async () => {
    if (!post) return

    const wasLiked = post.isLiked

    try {
      if (wasLiked) {
        const likeId = post.likeId
        if (!likeId) {
          showToast('error', 'Erro ao descurtir post')
          return
        }
        dispatch(toggleLike(postId))
        await unlikePostMutation(likeId).unwrap()
        dispatch(setLikeId({ postId, likeId: null }))
      } else {
        dispatch(toggleLike(postId))
        const result: Like = await likePostMutation({ post: postId }).unwrap()
        dispatch(setLikeId({ postId, likeId: result.id }))
      }
    } catch (error) {
      dispatch(toggleLike(postId))
      showToast('error', 'Erro ao curtir post')
      console.error('Erro ao dar like:', error)
    }
  }, [post, postId, likePostMutation, unlikePostMutation, dispatch, showToast])

  // ============================================
  // BOOKMARK
  // ============================================
  const bookmarkPost = useCallback(() => {
    if (!post) return

    // Update otimista local (backend ainda não implementado)
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

      // Remove do Redux
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
    bookmarkPost,
    deletePost,

    // Derived states (evita post?.isLiked nos componentes)
    isLiked: post?.isLiked ?? false,
    isBookmarked: post?.isBookmarked ?? false,

    // Stats
    likesCount: post?.stats.likes ?? 0,
    commentsCount: post?.stats.replies ?? 0,
    viewsCount: post?.stats.views ?? 0
  }
}
