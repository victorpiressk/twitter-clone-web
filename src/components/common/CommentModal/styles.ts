import styled from 'styled-components'
import { colors, fontSizes, fontWeights } from '../../../styles/globalStyles'
import { ActionsContainer } from '../PostFormActions/styles'

export const ModalContent = styled.div`
  padding: 0;
  max-height: 80vh;
`

export const OriginalPost = styled.div`
  padding: 16px;

  display: flex;
  gap: 12px;
`

export const PostAvatar = styled.div`
  flex-shrink: 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -50px;
    width: 1.5px;
    height: 100%;
    background-color: ${(props) => props.theme.colors.border.secondary};
  }
`

export const PostContent = styled.div`
  flex: 1;
  min-width: 0;
`

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
`

export const AuthorName = styled.span`
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.bold};
  color: ${(props) => props.theme.colors.text.primary};
`

export const Username = styled.span`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const Timestamp = styled.span`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const PostText = styled.p`
  font-size: ${fontSizes.md};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  line-height: 1.4;
`

export const ReplyingTo = styled.div`
  padding: 0 16px 12px 68px;
  font-size: ${fontSizes.sm};
  color: ${(props) => props.theme.colors.text.secondary};

  span {
    color: ${colors.primary};
  }
`

export const FooterContainer = styled.div`
  width: 568px;

  ${ActionsContainer} {
    margin-top: 0;
  }
`
