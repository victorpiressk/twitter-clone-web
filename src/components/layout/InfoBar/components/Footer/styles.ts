import styled from 'styled-components'
import { fontSizes } from '../../../../../styles/globalStyles'

export const FooterContainer = styled.footer`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  font-size: ${fontSizes.sm};
`

export const FooterLink = styled.a`
  color: ${(props) => props.theme.colors.text.secondary};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.text.primary};
  }
`

export const FooterSeparator = styled.span`
  color: ${(props) => props.theme.colors.text.tertiary};
  user-select: none;
`

export const FooterCopyright = styled.p`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0;
`

export const FooterProjectInfo = styled.p`
  font-size: ${fontSizes.xs};
  color: ${(props) => props.theme.colors.text.tertiary};
  margin: 4px 0 0 0;
  line-height: 1.4;
`

export const FooterAuthor = styled.p`
  font-size: ${fontSizes.xs};
  color: ${(props) => props.theme.colors.text.tertiary};
  margin: 0;
`

export const AuthorLink = styled.a`
  color: ${(props) => props.theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`
