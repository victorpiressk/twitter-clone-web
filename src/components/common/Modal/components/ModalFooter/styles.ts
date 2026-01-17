import styled from 'styled-components'

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid ${(props) => props.theme.colors.border.primary};
  flex-shrink: 0;
`
