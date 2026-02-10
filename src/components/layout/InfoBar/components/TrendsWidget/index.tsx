import { useNavigate } from 'react-router-dom'
import type { TrendsWidgetProps } from './types'
import Button from '../../../../common/Button'
import * as S from './styles'

const TrendsWidget = ({ trends, showAll = false }: TrendsWidgetProps) => {
  const navigate = useNavigate()

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const displayTrends = showAll ? trends : trends.slice(0, 3)

  // ✅ Handler para clicar no trend
  const handleTrendClick = (trendName: string) => {
    // Remove # se existir e faz encode para URL
    const query = trendName.replace('#', '')
    navigate(`/explore?q=${encodeURIComponent(query)}&tab=trending`)
  }

  return (
    <S.Widget>
      <S.WidgetHeader>
        <S.WidgetTitle>O que está acontecendo</S.WidgetTitle>
      </S.WidgetHeader>

      <S.TrendsList>
        {displayTrends.map((trend) => (
          <S.TrendItem
            key={trend.id}
            onClick={() => handleTrendClick(trend.name)}
          >
            <S.TrendCategory>{trend.category}</S.TrendCategory>
            <S.TrendName>{trend.name}</S.TrendName>
            <S.TrendCount>{formatCount(trend.tweetCount)} posts</S.TrendCount>
          </S.TrendItem>
        ))}
      </S.TrendsList>

      {!showAll && (
        <S.ShowMore>
          <Button type="link" to="/explore" variant="ghost">
            Mostrar mais
          </Button>
        </S.ShowMore>
      )}
    </S.Widget>
  )
}

export default TrendsWidget
