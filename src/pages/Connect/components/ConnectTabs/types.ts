import type { ConnectTab } from '../../types'

export type ConnectTabsProps = {
  activeTab: ConnectTab
  onTabChange: (tab: ConnectTab) => void
}
