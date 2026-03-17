// src/components/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import { selectIsAuthenticated } from '../../../store/slices/auth/authSlice'
import { useSyncFollows } from '../../../hooks/useSyncFollows'

/**
 * Componente de rota protegida
 * Redireciona para / se não estiver autenticado
 */
const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  useSyncFollows()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
