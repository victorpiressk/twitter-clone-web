import type { TabItem } from '../../Layout/PageHeader/types'

export type TabsProps = {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tab: string) => void
  scrollable?: boolean
}
