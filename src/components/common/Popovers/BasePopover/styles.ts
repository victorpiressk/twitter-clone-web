import styled from 'styled-components'

type PopoverContainerProps = {
  $variant?: string
}

export const PopoverContainer = styled.div<PopoverContainerProps>`
  z-index: 3000;

  background-color: ${(props) => props.theme.colors.background.primary};
  border-radius: 12px;
  box-shadow: 0px 0px 8px 1px ${(props) => props.theme.colors.shadow.primary};

  padding: ${(props) => (props.$variant === 'profile' ? '12px 0' : '0')};
  overflow: hidden;
`

export const PopoverContent = styled.div``
