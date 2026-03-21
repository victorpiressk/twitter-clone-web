import * as S from './styles'
import type { SpinnerProps } from './types'

const Spinner = ({ size = 'medium', color }: SpinnerProps) => {
  return <S.SpinnerContainer $size={size} $color={color} />
}

export default Spinner
