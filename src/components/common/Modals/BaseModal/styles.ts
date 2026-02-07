import styled, { keyframes } from 'styled-components'
import { light } from '../../../../styles/themes/light'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

type OverlayProps = {
  $showOverlay: boolean
}

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) =>
    props.$showOverlay ? 'rgba(0, 0, 0, 0.4)' : 'transparent'};

  animation: ${fadeIn} 0.2s ease-out;
`

type ModalContainerProps = {
  $size: 'small' | 'medium' | 'large' | 'fullscreen'
}

const getModalWidth = (size: string) => {
  switch (size) {
    case 'small':
      return '320px'
    case 'medium':
      return '600px'
    case 'large':
      return '800px'
    case 'fullscreen':
      return '100vw'
    default:
      return 'auto'
  }
}

const getModalHeight = (size: string) => {
  switch (size) {
    case 'fullscreen':
      return '100vh'
    default:
      return 'auto'
  }
}

export const ModalContainer = styled.div<ModalContainerProps>`
  position: relative;
  width: ${(props) => getModalWidth(props.$size)};
  max-width: ${(props) => (props.$size === 'fullscreen' ? '100vw' : '90vw')};
  max-height: ${(props) => (props.$size === 'fullscreen' ? '100vh' : '90vh')};
  height: ${(props) => getModalHeight(props.$size)};

  background-color: ${(props) => props.theme.colors.background.primary};
  border-radius: ${(props) => (props.$size === 'fullscreen' ? '0' : '16px')};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);

  display: flex;
  flex-direction: column;
  overflow: hidden;

  animation: ${slideUp} 0.3s ease-out;
`

export const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overscroll-behavior-y: none;
  color-scheme: ${(props) => (props.theme === light ? 'light' : 'dark')};
`
