import styled from 'styled-components'

export const Container = styled.div<{ $isModal?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: ${(props) => (props.$isModal ? '16px' : '12px 16px')};
  border-bottom: ${(props) =>
    props.$isModal ? 'none' : `1px solid ${props.theme.colors.border.primary}`};
`

export const ExtraContentWrapper = styled.div`
  margin-bottom: 8px;
`

export const Content = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  width: 100%;
`

export const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-width: 0;
`
