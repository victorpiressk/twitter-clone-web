import styled from 'styled-components'

export const UserCardSkeletonContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const AvatarSection = styled.div`
  flex-shrink: 0;
`

export const ContentSection = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Bio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const ActionSection = styled.div`
  flex-shrink: 0;
`
