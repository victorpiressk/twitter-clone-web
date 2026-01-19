import { useState } from 'react'
import { Image, ImagePlay, Laugh } from 'lucide-react'
import Avatar from '../../../../components/common/Avatar'
import Textarea from '../../../../components/common/Textarea'
import Button from '../../../../components/common/Button'
import type { PostFormProps } from './types'
import * as S from './styles'
import { colors } from '../../../../styles/globalStyles'

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
          <div>
            <Image size={18} strokeWidth={2} color={colors.primary} />
            <ImagePlay size={18} strokeWidth={2} color={colors.primary} />
            <Laugh size={18} strokeWidth={2} color={colors.primary} />
          </div>
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
