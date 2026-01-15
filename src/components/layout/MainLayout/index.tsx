import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar'
import { Container } from '../../../styles/globalStyles'

const MainLayout = () => {
  return (
    <Container>
      <SideBar />
      <Outlet /> {/* ← Renderiza as rotas filhas */}
    </Container>
  )
}

export default MainLayout
