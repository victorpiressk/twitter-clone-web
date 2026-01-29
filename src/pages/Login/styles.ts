import styled from 'styled-components'
import { colors, fontSizes, fontWeights } from '../../styles/globalStyles'

export const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background.primary};
`

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

// Container 1: Logo (esquerda)
export const LogoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;

  svg {
    width: 436px;
    height: 436px;
    color: ${(props) => props.theme.colors.text.primary};
  }

  @media (max-width: 1024px) {
    svg {
      width: 50px;
      height: 50px;
    }
  }
`

// Container 2: Formulário (direita)
export const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 36px;
  gap: 0;
`

export const Title = styled.h1`
  font-size: ${fontSizes['5xl']}; // ← Usa globalStyles (64px)
  font-weight: ${fontWeights.heavy};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 48px 0;
  line-height: 1.2;

  @media (max-width: 1024px) {
    font-size: ${fontSizes['4xl']}; // 40px
    margin-bottom: 32px;
  }
`

export const Subtitle = styled.h2`
  font-size: ${fontSizes['4xl']}; // ← Usa globalStyles (32px)
  font-weight: ${fontWeights.heavy};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 32px 0;
  line-height: 1.2;

  @media (max-width: 1024px) {
    font-size: ${fontSizes['2xl']}; // 24px
  }
`

export const SignupButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
`

export const SocialButton = styled.button<{ $provider: 'google' | 'apple' }>`
  width: 300px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${(props) => props.theme.colors.background.primary};
  color: ${(props) => props.theme.colors.text.primary};
  border: 1px solid ${(props) => props.theme.colors.border.secondary};
  border-radius: 9999px;
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.regular};
  cursor: pointer;
  transition: background-color 0.2s;

  /* Sizing dos ícones */
  img {
    width: 20px;
    height: 20px;
    object-fit: contain; /* Garante que o logo não distorça */
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`

export const SignupDivisor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.regular};

  div {
    height: 1px;
    width: 130px;
    margin: 0 4px;
    background-color: ${(props) => props.theme.colors.border.primary};
  }
`

export const SignupButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: ${colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.medium};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`

export const Terms = styled.p`
  font-size: ${fontSizes.xs};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0 0 40px 0;
  max-width: 300px;
  line-height: 1.4;

  a {
    color: ${colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`

export const LoginSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`

export const LoginText = styled.p`
  font-size: ${fontSizes.lg};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const LoginButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: transparent;
  color: ${colors.primary};
  border: 1px solid ${(props) => props.theme.colors.border.secondary};
  border-radius: 9999px;
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.secondary};
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`

// Container 3: Footer
export const Footer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 16px 20px;
`

export const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: ${fontSizes.md};
    color: ${(props) => props.theme.colors.text.secondary};
    padding: 0 8px;
  }
`

export const FooterLink = styled.a`
  font-size: ${fontSizes.xs};
  color: ${(props) => props.theme.colors.text.secondary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
