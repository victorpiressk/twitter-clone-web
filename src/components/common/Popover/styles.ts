import styled from 'styled-components'

type PopoverContainerProps = {
  $top: number
  $left: number
}

export const PopoverContainer = styled.div<PopoverContainerProps>`
  position: fixed;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  z-index: 1000;

  background-color: ${(props) => props.theme.colors.background.primary};
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

  min-width: 200px;
  overflow: hidden;
`

export const PopoverContent = styled.div`
  /* Conteúdo do popover */
`
