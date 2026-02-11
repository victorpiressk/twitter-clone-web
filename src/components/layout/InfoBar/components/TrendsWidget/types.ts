import type { Trend } from '../../../../../models'

export type TrendsWidgetProps = {
  trends: Trend[] // ← Array de trends
  showAll?: boolean
}
