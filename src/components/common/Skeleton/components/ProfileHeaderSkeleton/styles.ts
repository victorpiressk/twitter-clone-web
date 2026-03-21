import styled from 'styled-components'

export const HeaderContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const Banner = styled.div`
  width: 100%;
  height: 200px;
`

export const ProfileInfo = styled.div`
  padding: 16px;
`

export const AvatarSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: -88px;
  margin-bottom: 8px;
`

export const AvatarWrapper = styled.div`
  border: 4px solid ${(props) => props.theme.colors.background.primary};
  border-radius: 50%;
`

export const ActionButton = styled.div`
  margin-bottom: 22px;
`

export const UserNames = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Bio = styled.div`
  margin: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Metadata = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 12px 0;
`

export const StatsSection = styled.div``
