import Button from '../../../../components/common/Button'
import type { FollowTabsProps } from './types'
import * as S from './styles'

const FollowTabs = ({ activeTab, onTabChange }: FollowTabsProps) => {
  return (
    <S.TabsContainer>
      <Button
        type="button"
        variant="tab"
        active={activeTab === 'followers'}
        onClick={() => onTabChange('followers')}
      >
        Seguidores
      </Button>
      <Button
        type="button"
        variant="tab"
        active={activeTab === 'following'}
        onClick={() => onTabChange('following')}
      >
        Seguindo
      </Button>
    </S.TabsContainer>
  )
}

export default FollowTabs
