import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'

// Componente de rotas principais
const AppRoutes = () => (
  <Routes>
    <Route path="/home" element={<Home />} />
  </Routes>
)

export default AppRoutes
