import type { TabItem } from '../../layout/PageHeader/types'

export type TabsProps = {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tab: string) => void
  scrollable?: boolean
}
