// src/components/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import { selectIsAuthenticated } from '../../../store/slices/auth/authSlice'

/**
 * Componente de rota protegida
 * Redireciona para / se não estiver autenticado
 */
const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
