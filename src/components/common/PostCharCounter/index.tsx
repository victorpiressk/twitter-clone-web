import type { PostCharCounterProps } from './types'
import * as S from './styles'

const PostCharCounter = ({
  currentLength,
  maxLength
}: PostCharCounterProps) => {
  const isNearLimit = currentLength >= maxLength * 0.9

  if (currentLength === 0) return null

  return (
    <S.CounterContainer>
      <S.CharCounter $isLimit={!!isNearLimit}>
        {currentLength}/{maxLength}
      </S.CharCounter>
    </S.CounterContainer>
  )
}

export default PostCharCounter
