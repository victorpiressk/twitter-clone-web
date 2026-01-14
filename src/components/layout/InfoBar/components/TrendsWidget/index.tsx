import type { TrendsWidgetProps } from './types'
import * as S from './styles'
import Button from '../../../../common/Button'

const TrendsWidget = ({ trends }: TrendsWidgetProps) => {
  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <S.Widget>
      <S.WidgetHeader>
        <S.WidgetTitle>O que está acontecendo</S.WidgetTitle>
      </S.WidgetHeader>

      <S.TrendsList>
        {trends.map((trend) => (
          <S.TrendItem key={trend.id}>
            <S.TrendCategory>{trend.category}</S.TrendCategory>
            <S.TrendName>{trend.name}</S.TrendName>
            <S.TrendCount>{formatCount(trend.tweetCount)} posts</S.TrendCount>
          </S.TrendItem>
        ))}
      </S.TrendsList>

      <S.ShowMore>
        <Button type="link" to="/explore" variant="ghost">
          Mostrar mais
        </Button>
      </S.ShowMore>
    </S.Widget>
  )
}

export default TrendsWidget
