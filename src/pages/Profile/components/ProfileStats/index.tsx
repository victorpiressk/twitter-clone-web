import { useNavigate } from 'react-router-dom'
import type { ProfileStatsProps } from './types'
import ScrollToTop from '../../../../hooks/useScrollToTop'
import * as S from './styles'

const ProfileStats = ({ user }: ProfileStatsProps) => {
  const navigate = useNavigate()

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <>
      <ScrollToTop />
      <S.StatsContainer>
        <S.StatItem onClick={() => navigate(`/${user.username}/following`)}>
          <S.StatNumber>{formatNumber(user.stats.following)}</S.StatNumber>
          <S.StatLabel>Seguindo</S.StatLabel>
        </S.StatItem>

        <S.StatItem onClick={() => navigate(`/${user.username}/followers`)}>
          <S.StatNumber>{formatNumber(user.stats.followers)}</S.StatNumber>
          <S.StatLabel>Seguidores</S.StatLabel>
        </S.StatItem>
      </S.StatsContainer>
    </>
  )
}

export default ProfileStats
