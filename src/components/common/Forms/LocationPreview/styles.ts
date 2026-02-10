import styled from 'styled-components'
import { fontSizes, transitions, colors } from '../../../../styles/globalStyles'

export const LocationContainer = styled.div<{
  $variant: 'editable' | 'display'
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${(props) => (props.$variant === 'editable' ? '8px 12px' : '4px 0')};
  margin-top: ${(props) => (props.$variant === 'editable' ? '12px' : '8px')};
  border-radius: ${(props) => (props.$variant === 'editable' ? '8px' : '0')};
  background-color: ${(props) =>
    props.$variant === 'editable'
      ? props.theme.colors.background.secondary
      : 'transparent'};
  border: ${(props) =>
    props.$variant === 'editable'
      ? `1px solid ${props.theme.colors.border.primary}`
      : 'none'};
  width: fit-content;
  max-width: 100%;
`

export const LocationIcon = styled.span`
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
`

export const LocationText = styled.span`
  font-size: ${fontSizes.sm};
  color: ${colors.primary};
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.secondary};
  transition: all ${transitions.normal};
  flex-shrink: 0;

  &:hover {
    background-color: ${colors.hover.like};
    color: ${colors.error};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`
