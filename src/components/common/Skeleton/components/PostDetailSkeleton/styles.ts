import styled from 'styled-components'

export const PostDetailSkeletonContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const Header = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`

export const AvatarSection = styled.div`
  flex-shrink: 0;
`

export const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Content = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Timestamp = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  margin-bottom: 16px;
`

export const Stats = styled.div`
  display: flex;
  gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 12px;
`
