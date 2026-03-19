import styled from 'styled-components'
import { breakpoints } from '../../../styles/globalStyles'
import { ButtonContainer } from '../Button/styles'

export const TabsWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const TabsContainer = styled.div<{ $scrollable?: boolean }>`
  display: flex;

  ${ButtonContainer} {
    flex: 1;
  }

  ${({ $scrollable }) =>
    $scrollable &&
    `
    overflow-x: auto;
    scrollbar-width: none;
    scroll-behavior: smooth;
    &::-webkit-scrollbar { display: none; }

    ${ButtonContainer} {
      flex: unset;
      flex-shrink: 0;
      min-width: fit-content;
      white-space: nowrap;
    }
  `}
`

export const ScrollButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position }) => $position}: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.reverseBlur};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.colors.text.reverse};
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`
