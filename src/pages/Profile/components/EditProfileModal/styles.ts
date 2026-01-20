import styled from 'styled-components'
import { fontSizes } from '../../../../styles/globalStyles'

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`

export const FooterContent = styled.div`
  padding: 16px;
`

export const BannerSection = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-color: ${(props) => props.theme.colors.background.secondary};
  overflow: hidden;
`

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`

export const ImageButton = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(15, 20, 25, 0.75);
  backdrop-filter: blur(4px);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  color: white;

  &:hover {
    background-color: rgba(39, 44, 48, 0.75);
  }
`

export const ProfileImageSection = styled.div`
  position: relative;
  margin: -68px 0 0 16px;
  width: 136px;
  height: 136px;
`

export const ProfileImageWrapper = styled.div`
  position: relative;
  width: 136px;
  height: 136px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid ${(props) => props.theme.colors.background.primary};
  background-color: ${(props) => props.theme.colors.background.secondary};
`

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const ProfileImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`

export const FormFields = styled.div`
  padding: 60px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const HiddenInput = styled.input`
  display: none;
`

export const BirthDateField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }
`

export const BirthDateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const BirthDateLabel = styled.span`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const BirthDateValue = styled.span`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.primary};
`

export const ChevronIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.text.secondary};
`
