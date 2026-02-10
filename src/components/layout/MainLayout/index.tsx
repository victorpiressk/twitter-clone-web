import {
  HeaderSection,
  LayoutWrapper,
  MainSection
} from '../../../styles/globalStyles'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar'
import type { MainLayoutProps } from './types'
import { usePost } from '../../../hooks/usePost'

const MainLayout = ({
  userAvatar,
  userName,
  userDisplayName
}: MainLayoutProps) => {
  const { createPost } = usePost()

  return (
    <LayoutWrapper>
      <HeaderSection>
        <SideBar
          userName={userName}
          userAvatar={userAvatar}
          userDisplayName={userDisplayName}
          onCreatePost={createPost}
        />
      </HeaderSection>

      <MainSection>
        <Outlet /> {/* ← Renderiza as rotas filhas */}
      </MainSection>
    </LayoutWrapper>
  )
}

export default MainLayout
