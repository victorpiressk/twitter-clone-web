import styled from 'styled-components'
import { transitions } from '../../../styles/globalStyles'

export const PreviewContainer = styled.div<{ $count: number }>`
  display: grid;
  gap: 2px;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 12px;
  border: 1px solid ${(props) => props.theme.colors.border.primary};

  /* Layout baseado na quantidade de imagens */
  ${({ $count }) => {
    if ($count === 1) {
      return `
        grid-template-columns: 1fr;
        max-height: 510px;
      `
    }
    if ($count === 2) {
      return `
        grid-template-columns: 1fr 1fr;
        max-height: 285px;
      `
    }
    if ($count === 3) {
      return `
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        max-height: 285px;

        > :first-child {
          grid-row: 1 / 3;
        }
      `
    }
    if ($count === 4) {
      return `
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        max-height: 285px;
      `
    }
  }}
`

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 140px;
  background-color: ${(props) => props.theme.colors.background.secondary};
  overflow: hidden;
`

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(15, 20, 25, 0.75);
  backdrop-filter: blur(4px);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  transition: ${transitions.fast};

  &:hover {
    background-color: rgba(39, 44, 48, 0.75);
  }

  svg {
    stroke: currentColor;
  }
`
