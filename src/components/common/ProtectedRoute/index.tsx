import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

const ProtectedRoute = () => {
  const { isAuthenticated, isInitialLoading } = useAuth()

  if (isInitialLoading) return <p>Carregando...</p> // Ou um Spinner/Skeleton

  if (!isAuthenticated) {
    // Se não estiver logado, manda para o Login
    return <Navigate to="/" replace />
  }

  // Se estiver logado, renderiza o que estiver dentro dele (as rotas filhas)
  return <Outlet />
}

export default ProtectedRoute
