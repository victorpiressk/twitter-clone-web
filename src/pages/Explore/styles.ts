import styled from 'styled-components'

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
