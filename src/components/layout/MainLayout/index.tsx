import {
  HeaderSection,
  LayoutWrapper,
  MainSection
} from '../../../styles/globalStyles'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar'

const MainLayout = () => {
  return (
    <LayoutWrapper>
      <HeaderSection>
        <SideBar /> {/* Sua Sidebar vai aqui dentro */}
      </HeaderSection>

      <MainSection>
        <Outlet /> {/* ← Renderiza as rotas filhas */}
      </MainSection>
    </LayoutWrapper>
  )
}

export default MainLayout
