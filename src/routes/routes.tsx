import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/common/ProtectedRoute'
import MainLayout from '../components/layout/MainLayout'
import { useAppSelector } from '../store/hooks'
import { selectIsAuthenticated } from '../store/slices/auth/authSlice'

// Lazy load de todas as páginas
const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
const Profile = lazy(() => import('../pages/Profile'))
const PostDetail = lazy(() => import('../pages/PostDetail'))
const Explore = lazy(() => import('../pages/Explore'))
const Notifications = lazy(() => import('../pages/Notifications'))
const Connect = lazy(() => import('../pages/Connect'))
const Messages = lazy(() => import('../pages/Messages'))
const FollowPage = lazy(() => import('../pages/FollowPage'))
const Settings = lazy(() => import('../pages/Settings'))

const AppRoutes = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Login />
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/:username/status/:postId" element={<PostDetail />} />
            <Route path="/:username" element={<Profile />} />
            <Route path="/:username/following" element={<FollowPage />} />
            <Route path="/:username/followers" element={<FollowPage />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/home' : '/'} replace />}
        />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
