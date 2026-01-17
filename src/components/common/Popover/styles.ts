import styled from 'styled-components'

type PopoverContainerProps = {
  $top: number
  $left: number
  $variant?: string
}

export const PopoverContainer = styled.div<PopoverContainerProps>`
  position: fixed;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  z-index: 1000;

  background-color: ${(props) => props.theme.colors.background.primary};
  border-radius: 12px;
  box-shadow: 0px 0px 8px 1px ${(props) => props.theme.colors.shadow.primary};

  min-width: 200px;
  padding: ${(props) => (props.$variant === 'profile' ? '12px 0' : '0')};
  overflow: hidden;
`

export const PopoverContent = styled.div`
  /* Conteúdo do popover */
`
