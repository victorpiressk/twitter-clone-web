import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

const Messages = () => {
  return (
    <ContentWrapper>
      <S.MessagesContainer>
        <S.MessagesHeader>
          <S.HeaderTitle>Mensagens</S.HeaderTitle>
        </S.MessagesHeader>

        <S.PlaceholderContent>
          <S.PlaceholderIcon>💬</S.PlaceholderIcon>
          <S.PlaceholderTitle>Mensagens em breve!</S.PlaceholderTitle>
          <S.PlaceholderText>
            Esta funcionalidade será implementada em versões futuras do projeto.
          </S.PlaceholderText>
        </S.PlaceholderContent>
      </S.MessagesContainer>
    </ContentWrapper>
  )
}

export default Messages
