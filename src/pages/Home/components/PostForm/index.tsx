import { useState } from 'react'
import { Image, Smile, BarChart2, MapPin, Calendar } from 'lucide-react'
import Avatar from '../../../../components/common/Avatar'
import Textarea from '../../../../components/common/Textarea'
import Button from '../../../../components/common/Button'
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
      setContent('')
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
          <S.MediaIcons>
            {/* Imagem */}
            <S.IconButton
              type="button"
              onClick={() => console.log('Adicionar imagem')}
              aria-label="Adicionar imagem"
              title="Adicionar imagem"
            >
              <Image size={20} strokeWidth={2} />
            </S.IconButton>

            {/* Emoji */}
            <S.IconButton
              type="button"
              onClick={() => console.log('Adicionar emoji')}
              aria-label="Adicionar emoji"
              title="Adicionar emoji"
            >
              <Smile size={20} strokeWidth={2} />
            </S.IconButton>

            {/* Enquete */}
            <S.IconButton
              type="button"
              onClick={() => console.log('Criar enquete')}
              aria-label="Criar enquete"
              title="Criar enquete"
            >
              <BarChart2 size={20} strokeWidth={2} />
            </S.IconButton>

            {/* Localização */}
            <S.IconButton
              type="button"
              onClick={() => console.log('Adicionar localização')}
              aria-label="Adicionar localização"
              title="Adicionar localização"
            >
              <MapPin size={20} strokeWidth={2} />
            </S.IconButton>

            {/* Agendar */}
            <S.IconButton
              type="button"
              onClick={() => console.log('Agendar post')}
              aria-label="Agendar post"
              title="Agendar post"
            >
              <Calendar size={20} strokeWidth={2} />
            </S.IconButton>
          </S.MediaIcons>

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
