import { Navigate, Outlet } from 'react-router-dom'
import { useSyncFollows } from '../../../hooks/useSyncFollows'
import { useAppSelector } from '../../../store/hooks'
import { selectIsAuthenticated } from '../../../store/slices/auth/authSlice'

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  useSyncFollows()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
