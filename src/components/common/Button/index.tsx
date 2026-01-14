import { ButtonContainer, ButtonLink } from './styles'
import type { ButtonProps } from './types'

const Button = ({
  type,
  title,
  to,
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  active = false
}: ButtonProps) => {
  if (type === 'button' || type === 'submit') {
    return (
      <ButtonContainer
        type={type}
        title={title}
        onClick={onClick}
        variant={variant}
        disabled={disabled}
        $active={active}
      >
        {children}
      </ButtonContainer>
    )
  }

  return (
    <ButtonLink
      type={type}
      title={title}
      to={to as string}
      variant={variant}
      $active={active}
    >
      {children}
    </ButtonLink>
  )
}

export default Button
