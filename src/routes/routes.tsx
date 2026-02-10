import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../components/Layout/MainLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import PostDetail from '../pages/PostDetail'
import Explore from '../pages/Explore'
import Notifications from '../pages/Notifications'
import Connect from '../pages/Connect'
import Messages from '../pages/Messages'
import FollowPage from '../pages/FollowPage'
import ProtectedRoute from '../components/common/ProtectedRoute'
import { useAuth } from '../hooks/useAuth'

const AppRoutes = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* 1. Rota de Login (Pública, mas com redirecionamento se já logado) */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />}
      />

      {/* 2. Rotas Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/messages" element={<Messages />} />

          <Route path="/:username/status/:postId" element={<PostDetail />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/:username/following" element={<FollowPage />} />
          <Route path="/:username/followers" element={<FollowPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? '/home' : '/'} replace />}
      />
    </Routes>
  )
}

export default AppRoutes
