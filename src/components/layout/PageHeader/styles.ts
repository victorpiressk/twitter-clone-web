import styled, { css } from 'styled-components'
import {
  breakpoints,
  fontSizes,
  fontWeights
} from '../../../styles/globalStyles'
import { ButtonContainer } from '../../common/Button/styles'

export const HeaderContainer = styled.div<{ $hidden?: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background.blur};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

  @media (max-width: ${breakpoints.mobile}) {
    position: sticky;
    transform: ${({ $hidden }) =>
      $hidden ? 'translateY(-100%)' : 'translateY(0)'};
    opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  }
`

export const HeaderRow = styled.div<{ $mainVariant?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  min-height: 56px;
  gap: 12px;

  ${({ $mainVariant }) =>
    $mainVariant &&
    `
    @media (min-width: 641px) {
      display: none;
    }
  `}
`

export const HeaderTitle = styled.h2`
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  flex: 1;
`

export const HeaderSubtitle = styled.p`
  font-size: ${fontSizes.xs};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0;
`

export const MobileTitle = styled.div`
  display: none;
  flex-direction: column;
  flex: 1;

  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
  }
`

export const TabsRow = styled.div`
  display: flex;

  ${ButtonContainer} {
    flex: 1;
  }
`

export const AvatarButton = styled.button<{ $hidden?: boolean }>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
    display: ${({ $hidden }) => ($hidden ? 'none' : 'flex')};
    align-items: center;
    justify-content: center;
  }
`

export const LogoCenter = styled.div`
  display: none;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.text.primary};

  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
  }
`

export const BackButtonWrapper = styled.div<{ $mobileOnly?: boolean }>`
  display: flex;

  ${({ $mobileOnly }) =>
    $mobileOnly &&
    css`
      @media (min-width: ${breakpoints.desktop}) {
        display: none;
      }
    `}
`

export const DesktopTitle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`

export const MobileRightPlaceholder = styled.div`
  display: none;
  width: 32px;

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
  }
`

export const SearchBarWrapper = styled.div`
  padding: 8px 16px;
`

export const ExploreTabsWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const ExploreTabsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  ${ButtonContainer} {
    flex-shrink: 0;
    min-width: fit-content;
    white-space: nowrap;
  }
`

export const ExploreScrollButton = styled.button<{
  $position: 'left' | 'right'
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => props.$position}: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background.reverseBlur};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.colors.text.reverse};
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`

export const SearchBarWrapperInline = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
`
