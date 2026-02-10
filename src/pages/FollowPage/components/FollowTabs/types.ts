import type { FollowTab } from '../../types'

export type FollowTabsProps = {
  activeTab: FollowTab
  onTabChange: (tab: FollowTab) => void
}
