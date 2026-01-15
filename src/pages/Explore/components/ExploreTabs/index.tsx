import Button from '../../../../components/common/Button'
import type { ExploreTabsProps } from './types'
import type { ExploreTab } from '../../types'
import * as S from './styles'

const ExploreTabs = ({ activeTab, onTabChange }: ExploreTabsProps) => {
  const tabs: { key: ExploreTab; label: string }[] = [
    { key: 'for-you', label: 'Para você' },
    { key: 'trending', label: 'Tendências' },
    { key: 'news', label: 'Notícias' },
    { key: 'sports', label: 'Esportes' },
    { key: 'entertainment', label: 'Entretenimento' }
  ]

  return (
    <S.TabsContainer>
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
  )
}

export default ExploreTabs
