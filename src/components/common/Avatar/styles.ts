import styled from 'styled-components'

type AvatarContainerProps = {
  size: 'small' | 'medium' | 'large'
}

const sizes = {
  small: '32px',
  medium: '40px',
  large: '64px'
}

const fontSizes = {
  small: '14px',
  medium: '18px',
  large: '28px'
}

export const AvatarContainer = styled.div<AvatarContainerProps>`
  width: ${(props) => sizes[props.size]};
  height: ${(props) => sizes[props.size]};
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const AvatarPlaceholder = styled.div<AvatarContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background.tertiary};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => fontSizes[props.size]};
  font-weight: 600;
  text-transform: uppercase;
`
