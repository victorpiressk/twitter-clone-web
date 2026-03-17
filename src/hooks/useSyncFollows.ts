// src/hooks/useSyncFollows.ts

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectCurrentUser } from '../store/slices/auth/authSlice'
import { useGetMyFollowsQuery } from '../store/slices/api/users.api'
import { usersApi } from '../store/slices/api/users.api'
import {
  setFollowState,
  setFollowId,
  resetUsersState
} from '../store/slices/users/usersSlice'

export const useSyncFollows = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)

  const { data: follows, isSuccess } = useGetMyFollowsQuery(undefined, {
    skip: !currentUser
  })

  // ✅ Sincroniza follows (COM FILTRO POR USUÁRIO LOGADO)
  useEffect(() => {
    if (isSuccess && follows && currentUser) {
      // ✅ FILTRAR apenas follows do usuário logado
      const myFollows = follows.filter(
        (follow) => follow.follower === currentUser.id
      )

      console.log('🔄 Sincronizando follows do usuário:', currentUser.id)
      console.log('📊 Total de follows:', follows.length)
      console.log('✅ Meus follows:', myFollows.length)

      myFollows.forEach((follow) => {
        dispatch(
          setFollowState({
            userId: follow.following,
            isFollowing: true
          })
        )

        dispatch(
          setFollowId({
            userId: follow.following,
            followId: follow.id
          })
        )
      })
    }
  }, [isSuccess, follows, currentUser, dispatch])

  // ✅ Limpa no logout
  useEffect(() => {
    if (!currentUser) {
      console.log('🧹 Resetando users state + RTK Query cache (logout)')
      dispatch(resetUsersState())
      dispatch(usersApi.util.resetApiState())
    }
  }, [currentUser, dispatch])
}
