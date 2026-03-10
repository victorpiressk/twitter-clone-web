// src/components/Layout/InfoBar/components/TrendsWidget/index.tsx

import { useNavigate } from 'react-router-dom'
import { useGetTrendingHashtagsQuery } from '../../../../../store/slices/api/hashtags.api'
import Button from '../../../../common/Button'
import * as S from './styles'

const TrendsWidget = () => {
  const navigate = useNavigate()

  // ✅ Buscar top 3 trending hashtags
  const { data: trendingHashtags, isLoading } = useGetTrendingHashtagsQuery({
    period: 'week',
    limit: 3
  })

  const handleHashtagClick = (hashtagName: string) => {
    navigate(`/explore?q=${encodeURIComponent(hashtagName)}&tab=trending`)
  }

  // Loading state
  if (isLoading) {
    return (
      <S.Widget>
        <S.WidgetHeader>
          <S.WidgetTitle>O que está acontecendo</S.WidgetTitle>
        </S.WidgetHeader>
        <S.LoadingState>Carregando...</S.LoadingState>
      </S.Widget>
    )
  }

  // Empty state
  if (!trendingHashtags || trendingHashtags.length === 0) {
    return (
      <S.Widget>
        <S.WidgetHeader>
          <S.WidgetTitle>O que está acontecendo</S.WidgetTitle>
        </S.WidgetHeader>
        <S.EmptyState>Nenhum trend no momento</S.EmptyState>
      </S.Widget>
    )
  }

  return (
    <S.Widget>
      <S.WidgetHeader>
        <S.WidgetTitle>O que está acontecendo</S.WidgetTitle>
      </S.WidgetHeader>

      <S.TrendingList>
        {trendingHashtags.map((hashtag, index) => (
          <S.TrendingItem
            key={hashtag.id}
            onClick={() => handleHashtagClick(hashtag.name)}
          >
            <S.TrendingInfo>
              <S.TrendingRank>
                {index + 1} <S.Separator>·</S.Separator> Assunto do Momento{' '}
                <S.Separator>·</S.Separator>{' '}
                <S.TrendingStats>
                  {hashtag.postsCount.toLocaleString('pt-BR')} posts
                </S.TrendingStats>
              </S.TrendingRank>
              <S.TrendingName>#{hashtag.name}</S.TrendingName>
            </S.TrendingInfo>
          </S.TrendingItem>
        ))}
      </S.TrendingList>

      <S.ShowMore>
        <Button type="link" to="/explore?tab=trending" variant="ghost">
          Mostrar mais
        </Button>
      </S.ShowMore>
    </S.Widget>
  )
}

export default TrendsWidget
