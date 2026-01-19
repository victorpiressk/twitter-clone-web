export type ActiveTab = 'forYou' | 'following'

export type HomeTabsProps = {
  activeTab: ActiveTab
  onTabChange: (tab: ActiveTab) => void
}
