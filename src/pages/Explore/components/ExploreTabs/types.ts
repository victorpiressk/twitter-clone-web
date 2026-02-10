import type { ExploreTab } from '../../types'

export type ExploreTabsProps = {
  activeTab: ExploreTab
  onTabChange: (tab: ExploreTab) => void
}
