import styled from 'styled-components'

export const NotificationSkeletonContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const IconSection = styled.div`
  flex-shrink: 0;
  width: 32px;
  display: flex;
  justify-content: center;
`

export const ContentSection = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const AvatarRow = styled.div`
  display: flex;
  gap: 4px;
`

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`
