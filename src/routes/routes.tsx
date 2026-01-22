import { Routes, Route } from 'react-router-dom'
import MainLayout from '../components/Layout/MainLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import PostDetail from '../pages/PostDetail'
import Explore from '../pages/Explore'
import Notifications from '../pages/Notifications'
import Connect from '../pages/Connect'
import Messages from '../pages/Messages'
import FollowPage from '../pages/FollowPage'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas SEM Sidebar */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas COM Sidebar */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/messages" element={<Messages />} />

        {/* Rotas dinâmicas */}
        <Route path="/:username/status/:postId" element={<PostDetail />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/following" element={<FollowPage />} />
        <Route path="/:username/followers" element={<FollowPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
