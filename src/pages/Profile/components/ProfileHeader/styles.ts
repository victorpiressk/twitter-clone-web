import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../../../styles/globalStyles'
import { ButtonContainer } from '../../../../components/common/Button/styles'

export const HeaderContainer = styled.div``

export const Banner = styled.div<{ $imageUrl?: string | null }>`
  width: 100%;
  height: 200px;
  background-color: ${(props) => props.theme.colors.background.tertiary};
  background-image: ${(props) =>
    props.$imageUrl ? `url(${props.$imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
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

  ${ButtonContainer} {
    margin-bottom: 22px;
  }
`

export const AvatarWrapper = styled.div`
  border: 4px solid ${(props) => props.theme.colors.background.primary};
  border-radius: 50%;
`

export const UserNames = styled.div`
  margin-bottom: 12px;
`

export const DisplayName = styled.span`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.heavy};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const Username = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const Bio = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.primary};
  line-height: 1.5;
  margin: 12px 0;
  white-space: pre-wrap;
`

export const Metadata = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 12px 0;
`

export const MetadataItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};

  svg {
    flex-shrink: 0;
    stroke: currentColor;
  }

  a {
    color: ${(props) => props.theme.colors.text.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`
