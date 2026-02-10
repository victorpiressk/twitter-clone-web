import Button from '../../../../components/common/Button'
import type { ConnectTabsProps } from './types'
import type { ConnectTab } from '../../types'
import * as S from './styles'

const ConnectTabs = ({ activeTab, onTabChange }: ConnectTabsProps) => {
  const tabs: { key: ConnectTab; label: string }[] = [
    { key: 'suggestions', label: 'Quem seguir' },
    { key: 'creators', label: 'Criadores para você' }
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

export default ConnectTabs
