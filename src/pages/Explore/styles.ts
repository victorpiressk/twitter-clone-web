import styled from 'styled-components'
import { fontSizes, fontWeights } from '../../styles/globalStyles'

export const ExploreContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
  width: 600px;
  flex-shrink: 0;
`

export const SearchBarWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;

  background-color: ${(props) => props.theme.colors.background.blur};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  backdrop-filter: blur(12px);
  padding: 0 16px;
`

export const SearchBarContent = styled.div<{ $showBackButton: boolean }>`
  display: flex;

  align-items: center;
  gap: ${(props) => (props.$showBackButton ? '26px' : '0')};
  padding: ${(props) =>
    props.$showBackButton ? '0 60px 0 0' : '0 60px 0 16px'};
  margin-bottom: 8px;

  width: 100%;
`

export const TabContent = styled.div`
  /* Conteúdo das tabs */
`

export const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};
`

export const LoadingMore = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`

export const LoadingText = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const EndMessage = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${fontSizes.md};
  border-top: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const PullMessage = styled.div`
  text-align: center;
  padding: 16px;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${fontSizes.sm};
`

export const ReleaseMessage = styled.div`
  text-align: center;
  padding: 16px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.bold};
`

export const HashtagHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  background-color: ${(props) => props.theme.colors.background.primary};
  position: sticky;
  top: 0;
  z-index: 10;
`

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeights.bold};
  cursor: pointer;
  margin-bottom: 8px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`

export const HashtagTitle = styled.h1`
  font-size: ${fontSizes['2xl']};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 4px 0;
`

export const HashtagCount = styled.p`
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0;
`

export const HashtagPostsList = styled.div`
  display: flex;
  flex-direction: column;
`
