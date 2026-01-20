import { useRef, useState, useEffect } from 'react'
import Button from '../../../../components/common/Button'
import type { ExploreTabsProps } from './types'
import type { ExploreTab } from '../../types'
import * as S from './styles'

const ExploreTabs = ({ activeTab, onTabChange }: ExploreTabsProps) => {
  const tabsRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const tabs: { key: ExploreTab; label: string }[] = [
    { key: 'for-you', label: 'Para você' },
    { key: 'trending', label: 'Assuntos do Momento' },
    { key: 'news', label: 'Notícias' },
    { key: 'sports', label: 'Esportes' },
    { key: 'entertainment', label: 'Entretenimento' }
  ]

  const checkScroll = () => {
    if (!tabsRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current

    // Seta esquerda: mostra se scrollou pra direita (scrollLeft > 0)
    setShowLeftArrow(scrollLeft > 5) // ← Tolerância de 5px

    // Seta direita: mostra se ainda tem conteúdo à direita
    const maxScrollLeft = scrollWidth - clientWidth
    setShowRightArrow(scrollLeft < maxScrollLeft - 5) // ← Tolerância de 5px
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!tabsRef.current) return

    const scrollAmount = 200
    const newScrollLeft =
      direction === 'left'
        ? tabsRef.current.scrollLeft - scrollAmount
        : tabsRef.current.scrollLeft + scrollAmount

    tabsRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })

    // Atualiza setas após scroll
    setTimeout(checkScroll, 300)
  }

  return (
    <S.TabsWrapper
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Seta Esquerda */}
      {showLeftArrow && isHovering && (
        <S.ScrollButton $position="left" onClick={() => scroll('left')}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
            </g>
          </svg>
        </S.ScrollButton>
      )}

      {/* Tabs */}
      <S.TabsContainer ref={tabsRef} onScroll={checkScroll}>
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            type="button"
            variant="tab"
            active={activeTab === tab.key}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </S.TabsContainer>

      {/* Seta Direita */}
      {showRightArrow && isHovering && (
        <S.ScrollButton $position="right" onClick={() => scroll('right')}>
          <svg viewBox="0 0 24 24">
            <g>
              <path d="M16.586 13l-5.043 5.04 1.414 1.42L20.414 12l-7.457-7.46-1.414 1.42L16.586 11H3v2h13.586z"></path>
            </g>
          </svg>
        </S.ScrollButton>
      )}
    </S.TabsWrapper>
  )
}

export default ExploreTabs
