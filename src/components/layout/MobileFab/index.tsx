import { Feather } from 'lucide-react'
import * as S from './styles'

type MobileFabProps = {
  onClick: () => void
}

const MobileFab = ({ onClick }: MobileFabProps) => {
  return (
    <S.FabButton onClick={onClick} aria-label="Criar post">
      <Feather size={22} />
    </S.FabButton>
  )
}

export default MobileFab
