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
