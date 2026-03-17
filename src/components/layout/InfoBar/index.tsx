import { useEffect, useRef, useState } from 'react'
import SearchBar from '../../common/SearchBar'
import TrendsWidget from './components/TrendsWidget'
import WhoToFollowWidget from './components/WhoToFollowWidget'
import Footer from './components/Footer'
import { PopoverProvider } from '../../../contexts/PopoverContext'
import type { InfoBarProps } from './types'
import * as S from './styles'

const InfoBar = ({ variant = 'default' }: InfoBarProps) => {
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

          {variant === 'default' && <TrendsWidget />}

          <WhoToFollowWidget />

          <Footer />
        </S.ContentWrapper>
      </S.InfoBarContainer>
    </PopoverProvider>
  )
}

export default InfoBar
