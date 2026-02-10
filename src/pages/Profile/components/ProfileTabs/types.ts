import type { ProfileTab } from '../../types'

export type ProfileTabsProps = {
  activeTab: ProfileTab
  onTabChange: (tab: ProfileTab) => void
}
