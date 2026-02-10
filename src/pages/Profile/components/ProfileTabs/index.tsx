import Button from '../../../../components/common/Button'
import type { ProfileTabsProps } from './types'
import type { ProfileTab } from '../../types'
import * as S from './styles'

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  const tabs: { key: ProfileTab; label: string }[] = [
    { key: 'posts', label: 'Posts' },
    { key: 'replies', label: 'Respostas' },
    { key: 'media', label: 'Mídia' },
    { key: 'likes', label: 'Curtidas' }
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

export default ProfileTabs
