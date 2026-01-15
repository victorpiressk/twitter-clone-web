import type { ProfileStatsProps } from './types'
import * as S from './styles'

const ProfileStats = ({ user }: ProfileStatsProps) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <S.StatsContainer>
      <S.StatItem onClick={() => console.log('Ver seguindo')}>
        <S.StatNumber>{formatNumber(user.stats.following)}</S.StatNumber>
        <S.StatLabel>Seguindo</S.StatLabel>
      </S.StatItem>

      <S.StatItem onClick={() => console.log('Ver seguidores')}>
        <S.StatNumber>{formatNumber(user.stats.followers)}</S.StatNumber>
        <S.StatLabel>Seguidores</S.StatLabel>
      </S.StatItem>
    </S.StatsContainer>
  )
}

export default ProfileStats
