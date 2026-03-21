import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  useGetUsersQuery,
  useGetUserByIdQuery
} from '../store/slices/api/users.api'
import {
  selectViewingUser,
  selectViewingLoading,
  setViewingUser,
  clearViewing
} from '../store/slices/users/usersSlice'

// ============================================
// HOOK
// ============================================

export const useViewingUser = (username: string | undefined) => {
  // ============================================
  // DEPENDENCIES
  // ============================================

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // ============================================
  // QUERIES
  // ============================================

  // Passo 1: Busca lista de usuários
  const { data: usersData } = useGetUsersQuery()

  // Passo 2: Encontra usuário pelo username
  const userFromList = useMemo(() => {
    if (!usersData?.results || !username) return null
    return usersData.results.find((u) => u.username === username)
  }, [usersData, username])

  // Passo 3: Busca detalhes completos
  const {
    data: userDetails,
    isLoading: isLoadingDetails,
    error: userError
  } = useGetUserByIdQuery(userFromList?.id || 0, {
    skip: !userFromList?.id
  })

  // ============================================
  // SELECTORS
  // ============================================

  const viewingUser = useAppSelector(selectViewingUser)
  const isLoadingViewing = useAppSelector(selectViewingLoading)

  // ============================================
  // EFFECTS
  // ============================================

  // Sincroniza dados do usuário com Redux
  useEffect(() => {
    if (userDetails) {
      dispatch(setViewingUser(userDetails))
    }
  }, [userDetails, dispatch])

  // Limpa o estado ao desmontar
  useEffect(() => {
    return () => {
      dispatch(clearViewing())
    }
  }, [dispatch])

  // Redireciona para home se usuário não existe
  useEffect(() => {
    if (usersData && !userFromList) navigate('/home')
    if (userError) navigate('/home')
  }, [usersData, userFromList, userError, navigate])

  // ============================================
  // COMPUTED
  // ============================================

  const isLoading = isLoadingDetails || isLoadingViewing || !viewingUser

  // ============================================
  // RETURN
  // ============================================

  return {
    viewingUser,
    isLoading
  }
}
