import { Mail } from 'lucide-react'
import { useMobileDrawer } from '../../hooks/useMobileDrawer'
import PageHeader from '../../components/Layout/PageHeader'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

const Messages = () => {
  const { openDrawer } = useMobileDrawer()

  return (
    <ContentWrapper>
      <S.MessagesContainer>
        <PageHeader variant="messages" onAvatarClick={openDrawer} />

        <S.PlaceholderContent>
          <S.PlaceholderIcon>
            <Mail size={80} strokeWidth={1.5} />
          </S.PlaceholderIcon>
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
