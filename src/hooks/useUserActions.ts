import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  selectUserById,
  selectIsFollowing,
  selectFollowId, // ✅ NOVO
  toggleFollow,
  setFollowId, // ✅ NOVO
  removeFollowId // ✅ NOVO
} from '../store/slices/users/usersSlice'
import {
  useFollowUserMutation,
  useUnfollowUserMutation
} from '../store/slices/api/users.api'
import { useToast } from './useToast'

export const useUserActions = (userId: number) => {
  const dispatch = useAppDispatch()
  const { showToast } = useToast()

  const [followMutation, { isLoading: isFollowLoading }] =
    useFollowUserMutation()
  const [unfollowMutation, { isLoading: isUnfollowLoading }] =
    useUnfollowUserMutation()

  const user = useAppSelector((state) => selectUserById(state, userId))
  const isFollowingUser = useAppSelector((state) =>
    selectIsFollowing(state, userId)
  )
  const followId = useAppSelector((state) => selectFollowId(state, userId)) // ✅ NOVO

  const isLoading = isFollowLoading || isUnfollowLoading

  // ============================================
  // FOLLOW
  // ============================================
  const followUser = useCallback(async () => {
    if (!user) {
      showToast('error', 'Usuário não encontrado')
      return
    }

    dispatch(toggleFollow(userId))

    try {
      const result = await followMutation({ following: userId }).unwrap()

      // ✅ SALVA o followId retornado pelo backend
      dispatch(
        setFollowId({
          userId,
          followId: result.id // ← ID da relação retornado pela API
        })
      )

      showToast('success', `Você agora segue @${user.username}`)
    } catch (error) {
      dispatch(toggleFollow(userId))
      showToast('error', 'Erro ao seguir usuário')
      console.error('Follow error:', error)
    }
  }, [userId, user, dispatch, followMutation, showToast])

  // ============================================
  // UNFOLLOW
  // ============================================
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
      // ✅ USA o followId (não o userId!)
      await unfollowMutation(followId).unwrap()

      // ✅ Remove o followId do Redux
      dispatch(removeFollowId(userId))

      showToast('info', `Você deixou de seguir @${user.username}`)
    } catch (error) {
      dispatch(toggleFollow(userId))
      showToast('error', 'Erro ao deixar de seguir')
      console.error('Unfollow error:', error)
    }
  }, [userId, user, followId, dispatch, unfollowMutation, showToast])

  return {
    user,
    isFollowing: isFollowingUser,
    isLoading,
    followUser,
    unfollowUser
  }
}
