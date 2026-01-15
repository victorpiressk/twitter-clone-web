import styled from 'styled-components'

export const CommentFormContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`

export const CommentFormContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const CommentFormActions = styled.div`
  display: flex;
  justify-content: flex-end;
`
