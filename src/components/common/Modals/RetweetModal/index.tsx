import FormModal from '../FormModal'
import OriginalPostEmbed from '../../Posts/OriginalPostEmbed'
import type { RetweetModalProps } from './types'

const RetweetModal = ({
  isOpen,
  onClose,
  originalPost,
  onSubmit,
  userName,
  userAvatar
}: RetweetModalProps) => {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      userName={userName}
      userAvatar={userAvatar}
      placeholder="Adicionar um comentário"
      submitLabel="Postar"
      successMessage="Retweet enviado com sucesso!"
      errorMessage="Erro ao enviar Retweet. Tente novamente."
      extraContent={
        <OriginalPostEmbed
          id={originalPost.author.id}
          content={originalPost.content}
          author={originalPost.author}
          created_at={originalPost.created_at}
          updated_at={originalPost.updated_at}
          is_published={originalPost.is_published}
          stats={originalPost.stats}
          is_liked={originalPost.is_liked}
          is_retweeted={originalPost.is_retweeted}
          is_bookmarked={originalPost.is_bookmarked}
        />
      }
      onSubmit={onSubmit}
      maxLength={280}
      modalSize="medium"
      mode="retweet"
    />
  )
}

export default RetweetModal
