import { useEffect, useRef, useState } from 'react'
import type { InfoBarProps } from './types'
import SearchBar from '../../common/SearchBar'
import TrendsWidget from './components/TrendsWidget'
import WhoToFollowWidget from './components/WhoToFollowWidget'
import Footer from './components/Footer'
import { PopoverProvider } from '../../../contexts/PopoverContext'
import type { Trend } from './components/TrendsWidget/types'
import type { UserSuggestion } from './components/WhoToFollowWidget/types'
import * as S from './styles'

// Mock data
const mockTrends: Trend[] = [
  { id: '1', category: 'Tecnologia', name: '#React', tweetCount: 125000 },
  { id: '2', category: 'Entretenimento', name: '#Netflix', tweetCount: 89000 },
  { id: '3', category: 'Esportes', name: '#Futebol', tweetCount: 234000 }
]

const mockSuggestions: UserSuggestion[] = [
  {
    id: '1',
    username: 'joaosilva',
    displayName: 'João Silva',
    bio: 'Bio texte 1',
    isFollowing: false
  },
  {
    id: '2',
    username: 'mariacosta',
    displayName: 'Maria Costa',
    bio: 'Bio texte 2',
    isFollowing: false
  },
  {
    id: '3',
    username: 'pedrosantos',
    displayName: 'Pedro Santos',
    bio: 'Bio texte 3',
    isFollowing: true
  }
]

const InfoBar = ({ variant = 'default' }: InfoBarProps) => {
  const [suggestions, setSuggestions] = useState(mockSuggestions)
  const sidebarRef = useRef<HTMLElement>(null)
  const [topOffset, setTopOffset] = useState<number>(0)

  useEffect(() => {
    let lastScrollY = window.pageYOffset

    const handleScroll = () => {
      if (!sidebarRef.current) return

      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY ? 'down' : 'up'

      const viewportHeight = window.innerHeight
      const sidebarHeight = sidebarRef.current.offsetHeight

      // Se a sidebar couber na tela, ela fica sempre no topo (0)
      if (sidebarHeight <= viewportHeight) {
        setTopOffset(0)
      }
      // Se a sidebar for MAIOR que a tela
      else {
        if (direction === 'down') {
          // Quando desce: trava o FINAL da sidebar no fundo da tela
          // Ex: Tela 800px, Sidebar 1000px -> top: -200px
          setTopOffset(viewportHeight - sidebarHeight)
        } else {
          // Quando sobe: trava o INÍCIO da sidebar no topo da tela
          setTopOffset(0)
        }
      }

      lastScrollY = scrollY
    }

    // 'passive: true' ajuda na performance da rolagem
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFollowToggle = (userId: string) => {
    setSuggestions((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    )
  }

  const strategy = variant === 'minimal' ? 'fixed' : 'absolute'

  return (
    <PopoverProvider strategy={strategy}>
      <S.InfoBarContainer ref={sidebarRef} $topOffset={topOffset}>
        <S.ContentWrapper>
          {variant === 'default' ? (
            <SearchBar variant="small" />
          ) : (
            <S.Separator />
          )}
          {variant === 'default' && <TrendsWidget trends={mockTrends} />}
          <WhoToFollowWidget
            suggestions={suggestions}
            onFollowToggle={handleFollowToggle}
            user={{
              id: '',
              username: '',
              displayName: '',
              avatar: undefined,
              bio: undefined,
              stats: {
                following: 0,
                followers: 0
              },
              isFollowing: false
            }}
          />
          <Footer />
        </S.ContentWrapper>
      </S.InfoBarContainer>
    </PopoverProvider>
  )
}

export default InfoBar
