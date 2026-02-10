import styled from 'styled-components'
import { colors, fontSizes, transitions } from '../../../../styles/globalStyles'

export const PollContainer = styled.div<{ $variant: 'editable' | 'display' }>`
  margin-top: 12px;
  padding: ${(props) => (props.$variant === 'editable' ? '12px' : '0')};
  border: ${(props) =>
    props.$variant === 'editable'
      ? `1px solid ${props.theme.colors.border.primary}`
      : 'none'};
  border-radius: ${(props) => (props.$variant === 'editable' ? '12px' : '0')};
  background-color: ${(props) =>
    props.$variant === 'editable'
      ? props.theme.colors.background.secondary
      : 'transparent'};
`

export const PollHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`

export const Question = styled.div`
  font-size: ${fontSizes.md};
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  flex: 1;
`

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
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
    width: 16px;
    height: 16px;
  }
`

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const OptionButton = styled.button<{ $hasVoted: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.background.primary};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${fontSizes.md};
  text-align: left;
  cursor: ${(props) => (props.$hasVoted ? 'default' : 'pointer')};
  transition: background-color ${transitions.normal};
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      !props.$hasVoted && props.theme.colors.hover.primary};
  }

  &:disabled {
    cursor: default;
  }
`

export const OptionText = styled.span<{ $hasVoted: boolean }>`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) =>
    props.$hasVoted
      ? props.theme.colors.text.primary
      : props.theme.colors.text.primary};
`

export const OptionPercentage = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
`

export const OptionBar = styled.div<{ $percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => props.$percentage}%;
  background-color: ${colors.primary}20;
  transition: width 0.3s ease;
  z-index: 0;
`

export const PollFooter = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${(props) => props.theme.colors.border.primary};
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const Duration = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
`

export const VoteCount = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
`
