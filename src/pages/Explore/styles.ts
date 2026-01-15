import styled from 'styled-components'

export const ExploreContainer = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.border.primary};
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
`

export const SearchBarWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.background.primary};
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
  padding: 8px 16px;
`

export const TabContent = styled.div`
  /* Conteúdo das tabs */
`

export const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};
`
