import { useNavigate } from 'react-router-dom'
import type { BackButtonProps } from './types'
import * as S from './styles'

const BackButton = ({ onClick }: BackButtonProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <S.BackButtonContainer onClick={handleClick} aria-label="Voltar">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
        </g>
      </svg>
    </S.BackButtonContainer>
  )
}

export default BackButton
