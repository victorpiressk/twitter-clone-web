import { useNavigate } from 'react-router-dom'
import { ScrollToTop } from '../../../../hooks/useScrollToTop'
import { formatNumber } from '../../../../utils/formatNumber'
import * as S from './styles'
import type { ProfileStatsProps } from './types'

const ProfileStats = ({ user }: ProfileStatsProps) => {
  const navigate = useNavigate()

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
