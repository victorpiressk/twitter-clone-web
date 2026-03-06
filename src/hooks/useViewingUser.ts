import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  selectViewingUser,
  selectViewingLoading,
  setViewingUser,
  clearViewing
} from '../store/slices/users/usersSlice'
import {
  useGetUsersQuery,
  useGetUserByIdQuery
} from '../store/slices/api/users.api'

/**
 * Hook para gerenciar o usuário sendo visualizado (Profile/FollowPage)
 *
 * @param username - Username do perfil sendo visualizado
 * @returns Dados do usuário e estados de loading
 *
 * @example
 * ```tsx
 * const { viewingUser, isLoading } = useViewingUser(username)
 *
 * if (isLoading) return <Skeleton />
 * return <ProfileHeader user={viewingUser} />
 * ```
 */
export const useViewingUser = (username: string | undefined) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // ============================================
  // PASSO 1: Busca lista de usuários
  // ============================================
  const { data: usersData } = useGetUsersQuery()

  // ============================================
  // PASSO 2: Encontra usuário pelo username
  // ============================================
  const userFromList = useMemo(() => {
    if (!usersData?.results || !username) return null
    return usersData.results.find((u) => u.username === username)
  }, [usersData, username])

  // ============================================
  // PASSO 3: Busca detalhes completos
  // ============================================
  const {
    data: userDetails,
    isLoading: isLoadingDetails,
    error: userError
  } = useGetUserByIdQuery(userFromList?.id || 0, {
    skip: !userFromList?.id
  })

  // ============================================
  // Redux state
  // ============================================
  const viewingUser = useAppSelector(selectViewingUser)
  const isLoadingViewing = useAppSelector(selectViewingLoading)

  // ============================================
  // SYNC: Sincroniza com Redux
  // ============================================
  useEffect(() => {
    if (userDetails) {
      dispatch(setViewingUser(userDetails))
    }
  }, [userDetails, dispatch])

  // ============================================
  // CLEANUP: Limpa ao desmontar
  // ============================================
  useEffect(() => {
    return () => {
      dispatch(clearViewing())
    }
  }, [dispatch])

  // ============================================
  // 404: Redireciona se usuário não existe
  // ============================================
  useEffect(() => {
    if (usersData && !userFromList) {
      navigate('/home')
    }

    if (userError) {
      navigate('/home')
    }
  }, [usersData, userFromList, userError, navigate])

  // ============================================
  // Return
  // ============================================
  const isLoading = isLoadingDetails || isLoadingViewing || !viewingUser

  return {
    viewingUser,
    isLoading
  }
}
