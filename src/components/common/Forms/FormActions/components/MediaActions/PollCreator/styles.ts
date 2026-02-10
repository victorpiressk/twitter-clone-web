import styled from 'styled-components'
import {
  colors,
  fontSizes,
  transitions
} from '../../../../../../../styles/globalStyles'

export const PollCreatorContainer = styled.div`
  width: 400px;
  background-color: ${(props) => props.theme.colors.background.primary};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const Title = styled.h3`
  font-size: ${fontSizes.md};
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.primary};
  transition: background-color ${transitions.normal};

  &:hover {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

export const QuestionInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.background.primary};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${fontSizes.md};
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.border.primary};
  }
`

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const OptionRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const OptionInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.background.primary};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${fontSizes.sm};
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.border.primary};
  }
`

export const RemoveOptionButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.secondary};
  transition: all ${transitions.normal};

  &:hover {
    background-color: ${colors.hover.like};
    color: ${colors.like};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

export const AddOptionButton = styled.button`
  padding: 8px 12px;
  background: none;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  border-radius: 8px;
  color: ${colors.primary};
  font-size: ${fontSizes.sm};
  cursor: pointer;
  transition: all ${transitions.normal};
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

export const DurationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const DurationLabel = styled.label`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const DurationSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid ${(props) => props.theme.colors.border.primary};
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.background.primary};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${fontSizes.sm};
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: ${(props) => props.theme.colors.border.primary};
  }
`

export const CreateButton = styled.button`
  padding: 12px;
  background-color: ${(props) => props.theme.colors.background.primary};
  color: #ffffff;
  border: none;
  border-radius: 20px;
  font-size: ${fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: background-color ${transitions.normal};

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.hover.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
