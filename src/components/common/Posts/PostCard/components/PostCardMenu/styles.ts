import styled from 'styled-components'
import {
  colors,
  fontSizes,
  fontWeights
} from '../../../../../../styles/globalStyles'

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.hover.primary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  padding: 8px 0;
`

export const MenuItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: ${({ theme, $danger }) =>
    $danger ? colors.error : theme.colors.text.primary};
  font-size: 0.938rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.hover.primary};
  }

  svg {
    flex-shrink: 0;
  }
`

export const ModalContent = styled.div`
  padding: 32px;
  max-width: 320px;
`

export const Title = styled.h2`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 8px 0;
`

export const Description = styled.p`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0 0 24px 0;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
