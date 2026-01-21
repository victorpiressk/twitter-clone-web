import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Twitter, MoreHorizontal } from 'lucide-react'
import Button from '../../common/Button'
import Avatar from '../../common/Avatar'
import Popover from '../../common/Popover'
import CreatePostModal from './components/CreatePostModal'
import { NAV_ITEMS, MORE_ITEMS, PROFILE_MENU_ITEMS } from './constants'
import * as S from './styles'

const SideBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  const moreButtonRef = useRef<HTMLButtonElement>(null)
  const profileButtonRef = useRef<HTMLButtonElement>(null)

  // Mock user data (depois vem do contexto/API)
  const currentUser = {
    displayName: 'Victor Pires',
    username: 'victor',
    avatar: undefined
  }

  const handleMoreItemClick = (item: (typeof MORE_ITEMS)[number]) => {
    switch (item.action) {
      case 'navigate':
        navigate(item.path!)
        break
      case 'external':
        window.open(item.url!, '_blank')
        break
      case 'custom':
        console.log(`${item.id} clicked`)
        break
    }
    setIsMoreOpen(false)
  }

  const handleProfileMenuClick = (itemId: string) => {
    switch (itemId) {
      case 'add-account':
        console.log('Adicionar conta')
        break
      case 'logout':
        console.log('Logout')
        navigate('/login')
        break
    }
    setIsProfileMenuOpen(false)
  }

  const handleCreatePost = (content: string) => {
    console.log('Post criado:', content)
    // TODO: Integrar com API
  }

  return (
    <>
      <S.Aside>
        <S.Nav>
          <S.NavList>
            <li>
              <S.Logo onClick={() => navigate('/home')}>
                <Twitter size={50.4} strokeWidth={2} />
              </S.Logo>
            </li>

            {/* Navegação principal */}
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.path}>
                  <Button
                    type="link"
                    to={item.path}
                    variant="ghost"
                    active={location.pathname === item.path}
                  >
                    <Icon size={26.25} />
                    <span>{item.label}</span>
                  </Button>
                </li>
              )
            })}

            {/* Botão Mais */}
            <li>
              <S.SideButton
                ref={moreButtonRef}
                type="button"
                variant="ghost"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
              >
                <MoreHorizontal size={24} strokeWidth={2} />
                <span>Mais</span>
              </S.SideButton>
            </li>

            {/* Botão Postar */}
            <li>
              <S.SideButton
                type="button"
                variant="secondary"
                onClick={() => setIsCreatePostModalOpen(true)}
              >
                Postar
              </S.SideButton>
            </li>
          </S.NavList>

          {/* Botão Perfil */}
          <S.FooterButton
            ref={profileButtonRef}
            type="button"
            variant="ghost"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <Avatar
              src={currentUser.avatar}
              alt={currentUser.displayName}
              size="medium"
            />
            <S.UserNames>
              <S.DisplayName>{currentUser.displayName}</S.DisplayName>
              <S.Username>@{currentUser.username}</S.Username>
            </S.UserNames>
            <S.MoreIcon>
              <MoreHorizontal size={18} strokeWidth={2} />
            </S.MoreIcon>
          </S.FooterButton>
        </S.Nav>
      </S.Aside>

      {/* Popover "Mais" */}
      <Popover
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        triggerRef={moreButtonRef}
        position="top-left"
      >
        {MORE_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <S.PopoverItem
              key={item.id}
              onClick={() => handleMoreItemClick(item)}
            >
              <span style={{ marginRight: '12px', fontSize: '18px' }}>
                <Icon size={24} />
              </span>
              {item.label}
            </S.PopoverItem>
          )
        })}
      </Popover>

      {/* Popover Perfil */}
      <Popover
        isOpen={isProfileMenuOpen}
        onClose={() => setIsProfileMenuOpen(false)}
        triggerRef={profileButtonRef}
        position="top"
        variant="profile"
      >
        {PROFILE_MENU_ITEMS.map((item) => (
          <S.PopoverItem
            key={item.id}
            onClick={() => handleProfileMenuClick(item.id)}
            $variant="profile"
          >
            {item.id === 'logout'
              ? `${item.label} de @${currentUser.username}`
              : item.label}
          </S.PopoverItem>
        ))}
      </Popover>

      {/* Modal Criar Post */}
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onSubmit={handleCreatePost}
        userName={currentUser.displayName}
        userAvatar={currentUser.avatar}
      />
    </>
  )
}

export default SideBar
