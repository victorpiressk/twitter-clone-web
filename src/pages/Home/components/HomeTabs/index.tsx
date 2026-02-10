import Button from '../../../../components/common/Button'
import type { HomeTabsProps } from './types'
import * as S from './styles'

const HomeTabs = ({ activeTab, onTabChange }: HomeTabsProps) => {
  return (
    <S.HeaderContainer>
      <Button
        type="button"
        variant="tab"
        onClick={() => onTabChange('forYou')}
        active={activeTab === 'forYou'}
      >
        Para você
      </Button>

      <Button
        type="button"
        variant="tab"
        onClick={() => onTabChange('following')}
        active={activeTab === 'following'}
      >
        Seguindo
      </Button>
    </S.HeaderContainer>
  )
}

export default HomeTabs
