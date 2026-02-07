import styled from 'styled-components'

type PostFormContainerProps = {
  $isModal?: boolean
}

export const PostFormContainer = styled.div<PostFormContainerProps>`
  display: flex;
  gap: 10px;
  padding: 16px 16px 9px;

  border-bottom: ${(props) =>
    props.$isModal ? 'none' : `2px solid ${props.theme.colors.border.primary}`};
`

export const PostFormContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`
