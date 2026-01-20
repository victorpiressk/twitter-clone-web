import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../../styles/globalStyles'

export const TextareaContainer = styled.div`
  width: 100%;
  position: relative;
`

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 28px;

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

export const CounterContainer = styled.div`
  width: 100%;
  padding-top: 12px;
  margin-top: 12px;
  border-top: 1px solid ${(props) => props.theme.colors.border.primary};
  display: flex;
  justify-content: flex-end;
`

export const CharCounter = styled.span<{ isLimit: boolean }>`
  padding: 0 16px;
  font-size: ${fontSizes.sm};
  color: ${(props) =>
    props.isLimit
      ? props.theme.colors.text.primary
      : props.theme.colors.text.tertiary};
`
