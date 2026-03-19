import styled from 'styled-components'
import { breakpoints, transitions } from '../../../styles/globalStyles'

interface ContainerProps {
  $topOffset: number
}

export const InfoBarContainer = styled.aside<ContainerProps>`
  position: sticky;
  top: ${(props) => props.$topOffset}px;

  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-shrink: 0;
  width: 420px;
  padding-bottom: 64px;

  height: fit-content;

  transition: ${transitions.fast};

  @media (max-width: ${breakpoints.desktop}) {
    display: none;
  }
`
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  gap: 16px;
`

export const ScrollableContent = styled.div`
  flex: 1;
  padding: 0 0 16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Separator = styled.div`
  height: 1.5px;
  background-color: ${(props) => props.theme.colors.border.primary};
  margin-top: 12px;
`
