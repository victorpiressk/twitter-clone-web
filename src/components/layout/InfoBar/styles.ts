import styled from 'styled-components'
import { transitions } from '../../../styles/globalStyles'

interface ContainerProps {
  $topOffset: number
}

export const InfoBarContainer = styled.aside<ContainerProps>`
  position: sticky;
  top: ${(props) => props.$topOffset}px;

  display: flex;
  flex-direction: column;
  padding-bottom: 64px;

  height: fit-content;

  transition: ${transitions.fast};
`
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  height: 1px;
  background-color: ${(props) => props.theme.colors.border.primary};
  margin: 16px 0;
`
