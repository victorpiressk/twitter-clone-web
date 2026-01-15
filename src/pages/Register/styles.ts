import styled from 'styled-components'
import { colors, fontSizes, fontWeights } from '../../styles/globalStyles'

export const RegisterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background.primary};
`

export const RegisterCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 48px 32px;
  background-color: ${(props) => props.theme.colors.background.primary};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;

  font-size: ${fontSizes.xxxl};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
`

export const Title = styled.h1`
  font-size: ${fontSizes.xxl};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  text-align: center;
  margin-bottom: 32px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const ErrorMessage = styled.div`
  padding: 12px;
  background-color: rgba(244, 33, 46, 0.1);
  border: 1px solid ${colors.error};
  border-radius: 8px;

  font-size: ${fontSizes.sm};
  color: ${colors.error};
  text-align: center;
`

export const Divider = styled.div`
  margin: 24px 0;
  text-align: center;
  color: ${(props) => props.theme.colors.text.tertiary};
  font-size: ${fontSizes.sm};
`

export const LoginLink = styled.p`
  text-align: center;
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};

  a {
    color: ${(props) => props.theme.colors.text.primary};
    text-decoration: none;
    font-weight: ${fontWeights.medium};

    &:hover {
      text-decoration: underline;
    }
  }
`
