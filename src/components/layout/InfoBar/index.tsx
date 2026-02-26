import { useEffect, useRef, useState } from 'react'
import SearchBar from '../../common/SearchBar'
import TrendsWidget from './components/TrendsWidget'
import WhoToFollowWidget from './components/WhoToFollowWidget'
import Footer from './components/Footer'
import { PopoverProvider } from '../../../contexts/PopoverContext'
import type { UserCardWithStats, Trend } from '../../../types/domain/models'
import type { InfoBarProps } from './types'
import * as S from './styles'

// ✅ Mock data tipado corretamente
const mockTrends: Trend[] = [
  {
    id: 1,
    name: '#React',
    category: 'technology',
    tweetCount: 15420,
    description: 'Discussões sobre React e desenvolvimento web',
    rank: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    location: 'Brasil'
  },
  {
    id: 2,
    name: '#TypeScript',
    category: 'technology',
    tweetCount: 8900,
    rank: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// ✅ Mock sugestões tipado corretamente
const mockSuggestions: UserCardWithStats[] = [
  {
    id: 1,
    username: 'reactjs',
    firstName: 'React',
    lastName: 'Community',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'The official React community',
    isFollowing: false,
    stats: {
      following: 120,
      followers: 450000
    }
  },
  {
    id: 2,
    username: 'typescript',
    firstName: 'TypeScript',
    lastName: '',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'TypeScript is a superset of JavaScript',
    isFollowing: true,
    stats: {
      following: 50,
      followers: 250000
    }
  }
]

// ✅ Mock usuário atual (normalmente viria do auth context/redux)
const mockCurrentUser: UserCardWithStats = {
  id: 999,
  username: 'victor',
  firstName: 'Victor',
  lastName: 'Pires',
  avatar: 'https://i.pravatar.cc/150?img=10',
  bio: 'Desenvolvedor Full Stack',
  isFollowing: false,
  stats: {
    following: 150,
    followers: 320
  }
}

const InfoBar = ({ variant = 'default' }: InfoBarProps) => {
  const [suggestions, setSuggestions] =
    useState<UserCardWithStats[]>(mockSuggestions)
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

      if (sidebarHeight <= viewportHeight) {
        setTopOffset(0)
      } else {
        if (direction === 'down') {
          setTopOffset(viewportHeight - sidebarHeight)
        } else {
          setTopOffset(0)
        }
      }

      lastScrollY = scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ✅ CORREÇÃO: userId é number
  const handleFollowToggle = (userId: number) => {
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
            user={mockCurrentUser}
            suggestions={suggestions}
            onFollowToggle={handleFollowToggle}
          />

          <Footer />
        </S.ContentWrapper>
      </S.InfoBarContainer>
    </PopoverProvider>
  )
}

export default InfoBar
