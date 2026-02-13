import {
  HeaderSection,
  LayoutWrapper,
  MainSection
} from '../../../styles/globalStyles'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar'
import { usePost } from '../../../hooks/usePost'

const MainLayout = () => {
  const { createPost } = usePost()

  return (
    <LayoutWrapper>
      <HeaderSection>
        <SideBar onCreatePost={createPost} />
      </HeaderSection>

      <MainSection>
        <Outlet /> {/* ← Renderiza as rotas filhas */}
      </MainSection>
    </LayoutWrapper>
  )
}

export default MainLayout
