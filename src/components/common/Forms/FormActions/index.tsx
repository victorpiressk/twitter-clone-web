import { useRef, useState } from 'react'
import Button from '../../Button'
import ImageUpload from '../../ImageUpload'
import PostCharCounter from '../CharCounter'
import EmojiPicker from './components/MediaActions/EmojiPicker'
import GifPicker from './components/MediaActions/GifPicker'
import LocationPicker from './components/MediaActions/LocationPicker'
import PollCreator from './components/MediaActions/PollCreator'
import PostScheduler from './components/MediaActions/PostScheduler'
import type { Location } from './components/MediaActions/LocationPicker/constants/mockLocations'
import type { Poll } from './components/MediaActions/PollCreator/types'
import { MEDIA_BUTTONS } from './constants/mediaButtons'
import type { PostFormActionsProps } from './types'
import * as S from './styles'

const PostFormActions = ({
  content,
  medias,
  poll,
  maxMedias = 4,
  isDisabled,
  onMediaUpload,
  onSubmit,
  maxLength,
  loading,
  submitLabel,
  onEmojiSelect,
  onLocationSelect,
  onPollCreate,
  onSchedule
}: PostFormActionsProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // Refs para cada botão (para BasePopover posicionar corretamente)
  const emojiButtonRef = useRef<HTMLButtonElement>(null)
  const gifButtonRef = useRef<HTMLButtonElement>(null)
  const pollButtonRef = useRef<HTMLButtonElement>(null)
  const locationButtonRef = useRef<HTMLButtonElement>(null)
  const scheduleButtonRef = useRef<HTMLButtonElement>(null)

  const [openPicker, setOpenPicker] = useState<
    'emoji' | 'gif' | 'poll' | 'location' | 'schedule' | null
  >(null)

  const handleMediaClick = (
    action: (typeof MEDIA_BUTTONS)[number]['action']
  ) => {
    switch (action) {
      case 'media':
        inputRef.current?.click()
        break
      case 'gif':
        setOpenPicker(openPicker === 'gif' ? null : 'gif')
        break
      case 'emoji':
        setOpenPicker(openPicker === 'emoji' ? null : 'emoji')
        break
      case 'poll':
        setOpenPicker(openPicker === 'poll' ? null : 'poll')
        break
      case 'location':
        setOpenPicker(openPicker === 'location' ? null : 'location')
        break
      case 'schedule':
        setOpenPicker(openPicker === 'schedule' ? null : 'schedule')
        break
    }
  }

  // Handler de emoji (fecha picker + callback)
  const handleEmojiSelectInternal = (emoji: string) => {
    onEmojiSelect(emoji)
  }

  // Handler de GIF - agora converte para File e usa onMediaUpload
  const handleGifSelect = async (gifUrl: string, gifId: string) => {
    try {
      // Busca o GIF como blob
      const response = await fetch(gifUrl)
      const blob = await response.blob()

      // Converte blob para File
      const file = new File([blob], `${gifId}.gif`, { type: 'image/gif' })

      // Usa o mesmo handler de upload (já com validação)
      onMediaUpload([file])

      // Fecha o picker
      setOpenPicker(null)
    } catch (error) {
      console.error('Erro ao buscar GIF:', error)
      // Opcionalmente: mostrar toast de erro aqui
    }
  }

  // Handler de Location
  const handleLocationSelectInternal = (location: Location) => {
    onLocationSelect(location)
    setOpenPicker(null)
  }

  // Handler de Poll
  const handlePollCreateInternal = (pollData: Poll) => {
    onPollCreate(pollData)
    setOpenPicker(null)
  }

  // Handler de Schedule
  const handleScheduleInternal = (scheduledDate: Date) => {
    onSchedule(scheduledDate)
    setOpenPicker(null)
  }

  // Função helper para pegar a ref correta baseada na action
  const getButtonRef = (action: string) => {
    switch (action) {
      case 'emoji':
        return emojiButtonRef
      case 'gif':
        return gifButtonRef
      case 'poll':
        return pollButtonRef
      case 'location':
        return locationButtonRef
      case 'schedule':
        return scheduleButtonRef
      default:
        return null
    }
  }

  return (
    <S.ActionsContainer>
      <S.MediaIcons>
        {/* ImageUpload (escondido, apenas funcionalidade) */}
        <ImageUpload
          onImagesChange={onMediaUpload}
          maxImages={maxMedias}
          currentImageCount={medias.length}
          inputRef={inputRef}
        />

        {/* Renderiza botões dinamicamente */}
        {MEDIA_BUTTONS.map((button) => {
          const Icon = button.icon
          const isMediaButton = button.action === 'media'
          const isGifButton = button.action === 'gif'
          const isPollButton = button.action === 'poll'
          const isActive = openPicker === button.action
          const buttonRef = getButtonRef(button.action)

          // Lógica de desabilitar ActionButtons
          let isButtonDisabled = false

          if (isMediaButton) {
            // Media desabilita se: 4 medias OU tem Poll
            isButtonDisabled = medias.length >= maxMedias || !!poll
          } else if (isGifButton) {
            // GIF desabilita se: 4 medias OU tem Poll
            isButtonDisabled = medias.length >= maxMedias || !!poll
          } else if (isPollButton) {
            // Poll desabilita se: tem medias
            isButtonDisabled = medias.length > 0
          }

          return (
            <S.IconButtonWrapper key={button.id}>
              <S.IconButton
                ref={buttonRef as React.RefObject<HTMLButtonElement>}
                type="button"
                onClick={() => handleMediaClick(button.action)}
                aria-label={button.label}
                title={button.label}
                disabled={isButtonDisabled}
                $isActive={isActive}
              >
                <Icon size={20} strokeWidth={2} />
              </S.IconButton>

              {/* Renderiza EmojiPicker quando ativo */}
              {button.action === 'emoji' && openPicker === 'emoji' && (
                <EmojiPicker
                  isOpen={openPicker === 'emoji'}
                  onClose={() => setOpenPicker(null)}
                  triggerRef={emojiButtonRef}
                  onEmojiSelect={handleEmojiSelectInternal}
                />
              )}

              {/* Renderiza GifPicker quando ativo */}
              {button.action === 'gif' && openPicker === 'gif' && (
                <GifPicker
                  isOpen={openPicker === 'gif'}
                  onClose={() => setOpenPicker(null)}
                  triggerRef={gifButtonRef}
                  onGifSelect={handleGifSelect}
                />
              )}

              {/* Renderiza LocationPicker quando ativo */}
              {button.action === 'location' && openPicker === 'location' && (
                <LocationPicker
                  isOpen={openPicker === 'location'}
                  onClose={() => setOpenPicker(null)}
                  triggerRef={locationButtonRef}
                  onLocationSelect={handleLocationSelectInternal}
                />
              )}

              {/* Renderiza PollCreator quando ativo */}
              {button.action === 'poll' && openPicker === 'poll' && (
                <PollCreator
                  isOpen={openPicker === 'poll'}
                  onClose={() => setOpenPicker(null)}
                  triggerRef={pollButtonRef}
                  onPollCreate={handlePollCreateInternal}
                />
              )}

              {/* Renderiza PostScheduler quando ativo */}
              {button.action === 'schedule' && openPicker === 'schedule' && (
                <PostScheduler
                  isOpen={openPicker === 'schedule'}
                  onClose={() => setOpenPicker(null)}
                  triggerRef={scheduleButtonRef}
                  onSchedule={handleScheduleInternal}
                />
              )}
            </S.IconButtonWrapper>
          )
        })}
      </S.MediaIcons>

      <S.ActionGroup>
        <PostCharCounter currentLength={content.length} maxLength={maxLength} />

        <Button
          type="button"
          variant="secondary"
          onClick={onSubmit}
          disabled={isDisabled}
          loading={loading}
        >
          {submitLabel}
        </Button>
      </S.ActionGroup>
    </S.ActionsContainer>
  )
}

export default PostFormActions
