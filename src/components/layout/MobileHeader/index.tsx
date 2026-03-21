import { useState } from 'react'
import { Twitter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import { selectCurrentUser } from '../../../store/slices/auth/authSlice'
import Avatar from '../../common/Avatar'
import MobileDrawer from '../MobileDrawer'
import * as S from './styles'

const MobileHeader = () => {
  const navigate = useNavigate()
  const user = useAppSelector(selectCurrentUser)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <S.HeaderContainer>
        <S.AvatarButton onClick={() => setIsDrawerOpen(true)}>
          <Avatar
            src={user?.avatar || null}
            alt={user?.username || ''}
            size="small"
          />
        </S.AvatarButton>

        <S.LogoButton onClick={() => navigate('/home')}>
          <Twitter size={28} strokeWidth={2} />
        </S.LogoButton>

        <S.RightPlaceholder />
      </S.HeaderContainer>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  )
}

export default MobileHeader
