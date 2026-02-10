import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../../../styles/globalStyles'

export const PopoverItem = styled.button`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.secondary};
  }

  svg {
    flex-shrink: 0;
  }
`
