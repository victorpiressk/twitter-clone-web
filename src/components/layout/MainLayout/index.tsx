import { useState } from 'react'
import {
  HeaderSection,
  LayoutWrapper,
  MainSection
} from '../../../styles/globalStyles'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar'
import MobileFooter from '../MobileFooter'
import MobileFab from '../MobileFab'
import MobileDrawer from '../MobileDrawer'
import CreatePostModal from '../SideBar/components/CreatePostModal'
import { useAppSelector } from '../../../store/hooks'
import { selectCurrentUser } from '../../../store/slices/auth/authSlice'
import { useMobileDrawer } from '../../../hooks/useMobileDrawer'

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
