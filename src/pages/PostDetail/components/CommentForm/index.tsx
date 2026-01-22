import { useState } from 'react'
import Avatar from '../../../../components/common/Avatar'
import Textarea from '../../../../components/common/Textarea'
import Button from '../../../../components/common/Button'
import type { CommentFormProps } from './types'
import * as S from './styles'

const CommentForm = ({ onSubmit, userAvatar }: CommentFormProps) => {
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content)
      setContent('')
    }
  }

  const isDisabled = !content.trim() || content.length > 280

  return (
    <S.CommentFormContainer>
      <Avatar src={userAvatar} alt="Você" size="small" />

      <S.CommentFormContent>
        <Textarea
          value={content}
          onChange={setContent}
          placeholder="Poste sua resposta"
          maxLength={280}
          rows={2}
        />

        <S.CommentFormActions>
          <Button
            type="button"
            variant="primary"
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            Responder
          </Button>
        </S.CommentFormActions>
      </S.CommentFormContent>
    </S.CommentFormContainer>
  )
}

export default CommentForm
