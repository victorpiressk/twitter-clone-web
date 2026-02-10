import styled from 'styled-components'
import {
  fontSizes,
  transitions
} from '../../../../../../../styles/globalStyles'

export const SchedulerContainer = styled.div`
  width: 350px;
  background-color: ${(props) => props.theme.colors.background.primary};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
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

export const DatePickerWrapper = styled.div`
  /* Estilos do react-datepicker */
  .react-datepicker {
    font-family: inherit;
    border: 1px solid ${(props) => props.theme.colors.border.primary};
    border-radius: 8px;
    background-color: ${(props) => props.theme.colors.background.primary};
  }

  .react-datepicker__header {
    background-color: ${(props) => props.theme.colors.background.secondary};
    border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker__day-name {
    color: ${(props) => props.theme.colors.text.primary};
  }

  .react-datepicker__day {
    color: ${(props) => props.theme.colors.text.primary};

    &:hover {
      background-color: ${(props) => props.theme.colors.hover.primary};
    }
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: ${(props) => props.theme.colors.background.primary};
    color: #ffffff;

    &:hover {
      background-color: ${(props) => props.theme.colors.hover.primary};
    }
  }

  .react-datepicker__day--disabled {
    color: ${(props) => props.theme.colors.text.tertiary};
    cursor: not-allowed;
  }

  .react-datepicker__time-container {
    border-left: 1px solid ${(props) => props.theme.colors.border.primary};
  }

  .react-datepicker__time-list-item {
    color: ${(props) => props.theme.colors.text.primary};

    &:hover {
      background-color: ${(props) => props.theme.colors.hover.primary};
    }
  }

  .react-datepicker__time-list-item--selected {
    background-color: ${(props) => props.theme.colors.background.primary};
    color: #ffffff;

    &:hover {
      background-color: ${(props) => props.theme.colors.hover.primary};
    }
  }
`

export const ConfirmButton = styled.button`
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

export const InfoText = styled.p`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0;
  text-align: center;
`
