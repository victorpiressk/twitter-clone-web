import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../../styles/globalStyles'

export const TextareaContainer = styled.div`
  width: 100%;
  position: relative;
`

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 12px 0;

  font-family: inherit;
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeights.regular};
  line-height: 1.5;

  color: ${(props) => props.theme.colors.text.primary};
  background-color: transparent;

  border: none;
  outline: none;
  resize: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary};
  }
`

export const CharCounter = styled.span<{ isLimit: boolean }>`
  position: absolute;
  bottom: 8px;
  right: 8px;

  font-size: ${fontSizes.sm};
  color: ${(props) =>
    props.isLimit
      ? props.theme.colors.text.primary
      : props.theme.colors.text.tertiary};
`
