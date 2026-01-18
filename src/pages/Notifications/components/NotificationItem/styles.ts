import styled from 'styled-components'
import {
  fontSizes,
  fontWeights,
  transitions
} from '../../../../styles/globalStyles'

export const NotificationContainer = styled.div<{ $isRead: boolean }>`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  background-color: ${(props) =>
    props.$isRead
      ? props.theme.colors.background.primary
      : props.theme.colors.background.secondary};
  cursor: pointer;
  transition: ${transitions.fast};

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`

export const IconWrapper = styled.div<{ $color: string }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;
    fill: ${(props) => props.$color};
  }
`

export const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`

export const NotificationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 4px;
`

export const AvatarWrapper = styled.div`
  flex-shrink: 0;
`

export const NotificationText = styled.div`
  flex: 1;
  min-width: 0;

  font-size: ${fontSizes.lg};
`

export const Username = styled.span`
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};

  &:hover {
    text-decoration: underline;
  }
`

export const ActionText = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-left: 4px;
`

export const PostPreview = styled.p`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 8px 0 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const TimeStamp = styled.span`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.tertiary};
  margin-top: 4px;
  display: block;
`
