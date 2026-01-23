import styled from 'styled-components'

export const PostSkeletonContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const AvatarSection = styled.div`
  flex-shrink: 0;
`

export const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Actions = styled.div`
  max-width: 425px;
  display: flex;
  gap: 60px;
  margin-top: 4px;
  justify-content: space-between;
`
