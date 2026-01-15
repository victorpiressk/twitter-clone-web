export type Trend = {
  id: string
  category: string
  name: string
  tweetCount: number
}

export type TrendsWidgetProps = {
  trends: Trend[]
  showAll?: boolean
}
