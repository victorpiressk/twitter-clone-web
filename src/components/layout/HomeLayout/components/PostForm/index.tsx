import { useState } from 'react'
import Avatar from '../../../../common/Avatar'
import Textarea from '../../../../common/Textarea'
import Button from '../../../../common/Button'
import type { PostFormProps } from './types'
import * as S from './styles'

const PostForm = ({
  userName = 'Usuário',
  userAvatar,
  onSubmit
}: PostFormProps) => {
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content)
      setContent('') // Limpa após enviar
    }
  }

  const isDisabled = !content.trim() || content.length > 280

  return (
    <S.PostFormContainer>
      <Avatar src={userAvatar} alt={userName} size="medium" />
      <S.PostFormContent>
        <Textarea
          value={content}
          onChange={setContent}
          placeholder="O que está acontecendo?"
          maxLength={280}
          rows={1}
        />

        <S.PostFormActions>
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            Postar
          </Button>
        </S.PostFormActions>
      </S.PostFormContent>
    </S.PostFormContainer>
  )
}

export default PostForm
