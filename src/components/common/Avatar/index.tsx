import type { AvatarProps } from './types'
import * as S from './styles'

const Avatar = ({ src, alt = 'User', size = 'medium' }: AvatarProps) => {
  // Pega primeira letra do nome
  const getInitial = () => {
    return alt.charAt(0).toUpperCase()
  }

  return (
    <S.AvatarContainer size={size}>
      {src ? (
        <S.AvatarImage src={src} alt={alt} />
      ) : (
        <S.AvatarPlaceholder size={size}>{getInitial()}</S.AvatarPlaceholder>
      )}
    </S.AvatarContainer>
  )
}

export default Avatar
