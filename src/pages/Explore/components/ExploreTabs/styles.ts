import styled from 'styled-components'
import { ButtonContainer } from '../../../../components/common/Button/styles'

export const TabsWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const TabsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  ${ButtonContainer} {
    flex-shrink: 0;
    min-width: fit-content;
    white-space: nowrap;
  }
`

export const ScrollButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => props.$position}: 0;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.colors.background.reverseBlur};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;

  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.colors.text.reverse};
  }
`
