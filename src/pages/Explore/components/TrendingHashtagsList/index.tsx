// src/pages/Explore/components/TrendingHashtagsList/index.tsx

import { useNavigate } from 'react-router-dom'
import type { TrendingHashtag } from '../../../../types/domain/models'
import * as S from './styles'

type TrendingHashtagsListProps = {
  hashtags: TrendingHashtag[]
}

const TrendingHashtagsList = ({ hashtags }: TrendingHashtagsListProps) => {
  const navigate = useNavigate()

  const handleHashtagClick = (hashtagName: string) => {
    // Navega para modo filtrado
    navigate(`/explore?q=${encodeURIComponent(hashtagName)}&tab=trending`)
  }

  return (
    <S.TrendingList>
      {hashtags.map((hashtag, index) => (
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
  )
}

export default TrendingHashtagsList
