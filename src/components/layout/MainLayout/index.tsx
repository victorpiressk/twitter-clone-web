import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useMobileDrawer } from '../../../hooks/useMobileDrawer'
import { useAppSelector } from '../../../store/hooks'
import { selectCurrentUser } from '../../../store/slices/auth/authSlice'
import {
  HeaderSection,
  LayoutWrapper,
  MainSection
} from '../../../styles/globalStyles'
import MobileDrawer from '../MobileDrawer'
import MobileFab from '../MobileFab'
import MobileFooter from '../MobileFooter'
import SideBar from '../SideBar'
import CreatePostModal from '../SideBar/components/CreatePostModal'

const MainLayout = () => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  const user = useAppSelector(selectCurrentUser)
  const { isDrawerOpen, closeDrawer } = useMobileDrawer()

  return (
    <LayoutWrapper>
      <HeaderSection>
        <SideBar />
      </HeaderSection>

      <MainSection>
        <Outlet />
      </MainSection>

      <MobileFooter />
      <MobileFab onClick={() => setIsCreatePostModalOpen(true)} />
      <MobileDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />

      {user && (
        <CreatePostModal
          isOpen={isCreatePostModalOpen}
          onClose={() => setIsCreatePostModalOpen(false)}
          userName={user.username}
          userAvatar={user.avatar}
        />
      )}
    </LayoutWrapper>
  )
}

export default MainLayout
