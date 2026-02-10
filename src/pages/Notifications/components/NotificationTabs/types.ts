import type { NotificationTab } from '../../types'

export type NotificationTabsProps = {
  activeTab: NotificationTab
  onTabChange: (tab: NotificationTab) => void
}
