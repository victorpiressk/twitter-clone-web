import styled from 'styled-components'
import { colors, fontSizes, transitions } from '../../../../styles/globalStyles'

export const ScheduleContainer = styled.div<{
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

export const ScheduleIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${colors.primary};

  svg {
    width: 16px;
    height: 16px;
  }
`

export const ScheduleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`

export const ScheduleLabel = styled.span`
  font-size: ${fontSizes.xs};
  color: ${(props) => props.theme.colors.text.secondary};
  font-weight: 500;
`

export const ScheduleText = styled.span`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 600;
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
