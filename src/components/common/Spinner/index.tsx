import type { SpinnerProps } from './types'
import * as S from './styles'

const Spinner = ({ size = 'medium', color }: SpinnerProps) => {
  return <S.SpinnerContainer $size={size} $color={color} />
}

export default Spinner
