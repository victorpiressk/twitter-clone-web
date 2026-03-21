import { Mail } from 'lucide-react'
import PageHeader from '../../components/Layout/PageHeader'
import { useMobileDrawer } from '../../hooks/useMobileDrawer'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

const Messages = () => {
  const { openDrawer } = useMobileDrawer()

  return (
    <ContentWrapper>
      <S.MessagesContainer>
        <PageHeader variant="messages" onAvatarClick={openDrawer} />

        <S.EmptyState>
          <Mail size={80} strokeWidth={1.5} />
          <S.EmptyStateTitle>Mensagens em breve!</S.EmptyStateTitle>
          <S.EmptyStateText>
            Esta funcionalidade será implementada em versões futuras do projeto.
          </S.EmptyStateText>
        </S.EmptyState>
      </S.MessagesContainer>
    </ContentWrapper>
  )
}

export default Messages
