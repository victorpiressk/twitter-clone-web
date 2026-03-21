import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  useFollowUserMutation,
  useUnfollowUserMutation
} from '../store/slices/api/users.api'
import {
  selectUserById,
  selectIsFollowing,
  selectFollowId,
  toggleFollow,
  setFollowId,
  removeFollowId
} from '../store/slices/users/usersSlice'
import { useToast } from './useToast'

// ============================================
// HOOK
// ============================================

export const useUserActions = (userId: number) => {
  // ============================================
  // DEPENDENCIES
  // ============================================

  const dispatch = useAppDispatch()
  const { showToast } = useToast()

  // ============================================
  // MUTATIONS
  // ============================================

  const [followMutation, { isLoading: isFollowLoading }] =
    useFollowUserMutation()
  const [unfollowMutation, { isLoading: isUnfollowLoading }] =
    useUnfollowUserMutation()

  // ============================================
  // SELECTORS
  // ============================================

  const user = useAppSelector((state) => selectUserById(state, userId))
  const isFollowingUser = useAppSelector((state) =>
    selectIsFollowing(state, userId)
  )
  const followId = useAppSelector((state) => selectFollowId(state, userId))

  // ============================================
  // COMPUTED
  // ============================================

  const isLoading = isFollowLoading || isUnfollowLoading

  // ============================================
  // HANDLERS
  // ============================================

  const followUser = useCallback(async () => {
    if (!user) {
      showToast('error', 'Usuário não encontrado')
      return
    }

    dispatch(toggleFollow(userId))

    try {
      const result = await followMutation({ following: userId }).unwrap()
      dispatch(setFollowId({ userId, followId: result.id }))
      showToast('success', `Você agora segue @${user.username}`)
    } catch (error) {
      dispatch(toggleFollow(userId))
      showToast('error', 'Erro ao seguir usuário')
      console.error('Follow error:', error)
    }
  }, [userId, user, dispatch, followMutation, showToast])

  const unfollowUser = useCallback(async () => {
    if (!user) {
      showToast('error', 'Usuário não encontrado')
      return
    }

    if (!followId) {
      showToast('error', 'ID de follow não encontrado')
      console.error('Follow ID not found for user:', userId)
      return
    }

    dispatch(toggleFollow(userId))

    try {
      await unfollowMutation(followId).unwrap()
      dispatch(removeFollowId(userId))
      showToast('info', `Você deixou de seguir @${user.username}`)
    } catch (error) {
      dispatch(toggleFollow(userId))
      showToast('error', 'Erro ao deixar de seguir')
      console.error('Unfollow error:', error)
    }
  }, [userId, user, followId, dispatch, unfollowMutation, showToast])

  // ============================================
  // RETURN
  // ============================================

  return {
    user,
    isFollowing: isFollowingUser,
    isLoading,
    followUser,
    unfollowUser
  }
}
