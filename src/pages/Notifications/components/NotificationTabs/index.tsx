import Button from '../../../../components/common/Button'
import type { NotificationTabsProps } from './types'
import type { NotificationTab } from '../../types'
import * as S from './styles'

const NotificationTabs = ({
  activeTab,
  onTabChange
}: NotificationTabsProps) => {
  const tabs: { key: NotificationTab; label: string }[] = [
    { key: 'all', label: 'Tudo' },
    { key: 'mentions', label: 'Menções' }
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

export default NotificationTabs
