import { useRef, useState, useEffect } from 'react'
import Button from '../Button'
import type { TabsProps } from './types'
import * as S from './styles'

const Tabs = ({
  tabs,
  activeTab,
  onTabChange,
  scrollable = false
}: TabsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const checkScroll = () => {
    if (!containerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    setShowLeft(scrollLeft > 5)
    setShowRight(scrollLeft < scrollWidth - clientWidth - 5)
  }

  useEffect(() => {
    if (!scrollable) return
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [scrollable])

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return
    containerRef.current.scrollTo({
      left:
        containerRef.current.scrollLeft + (direction === 'left' ? -200 : 200),
      behavior: 'smooth'
    })
    setTimeout(checkScroll, 300)
  }

  return (
    <S.TabsWrapper
      onMouseEnter={() => scrollable && setIsHovering(true)}
      onMouseLeave={() => scrollable && setIsHovering(false)}
    >
      {scrollable && showLeft && isHovering && (
        <S.ScrollButton $position="left" onClick={() => scroll('left')}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
            </g>
          </svg>
        </S.ScrollButton>
      )}

      <S.TabsContainer
        ref={containerRef}
        onScroll={checkScroll}
        $scrollable={scrollable}
      >
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

      {scrollable && showRight && isHovering && (
        <S.ScrollButton $position="right" onClick={() => scroll('right')}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M16.586 13l-5.043 5.04 1.414 1.42L20.414 12l-7.457-7.46-1.414 1.42L16.586 11H3v2h13.586z" />
            </g>
          </svg>
        </S.ScrollButton>
      )}
    </S.TabsWrapper>
  )
}

export default Tabs
