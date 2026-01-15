import { Routes, Route } from 'react-router-dom'
import MainLayout from '../components/Layout/MainLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas SEM Sidebar */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Rotas COM Sidebar (usa MainLayout) */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
