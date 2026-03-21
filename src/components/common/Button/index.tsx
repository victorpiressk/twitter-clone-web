import Spinner from '../Spinner'
import * as S from './styles'
import type { ButtonProps } from './types'

const Button = ({
  children,
  type,
  variant = 'primary',
  onClick,
  to,
  active = false,
  disabled = false,
  loading = false
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return
    onClick?.(e)
  }

  const content = loading ? <Spinner size="small" /> : <>{children}</>

  if (type === 'submit' || type === 'button') {
    return (
      <S.ButtonContainer
        type={type}
        onClick={handleClick}
        $variant={variant}
        $active={active}
        disabled={disabled || loading}
        $loading={loading}
      >
        {content}
      </S.ButtonContainer>
    )
  }

  return (
    <S.ButtonLink
      to={to as string}
      $variant={variant}
      $active={active}
      $loading={loading}
    >
      {content}
    </S.ButtonLink>
  )
}

export default Button
