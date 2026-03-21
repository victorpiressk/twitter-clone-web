import { useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { useToast } from '../../../../hooks'
import Button from '../../Button'
import ImageUpload from '../../ImageUpload'
import PostCharCounter from '../CharCounter'
import EmojiPicker from './components/MediaActions/EmojiPicker'
import GifPicker from './components/MediaActions/GifPicker'
import LocationPicker from './components/MediaActions/LocationPicker'
import PollCreator from './components/MediaActions/PollCreator'
import PostScheduler from './components/MediaActions/PostScheduler'
import { MEDIA_BUTTONS } from './constants/mediaButtons'
import * as S from './styles'
import type { PostFormActionsProps } from './types'
import type { Poll, Location } from '../../../../types/domain/models'

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
  const { showToast } = useToast()
  const inputRef = useRef<HTMLInputElement>(null)

  // Refs individuais por botão para o BasePopover calcular o posicionamento
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

  const handleEmojiSelectInternal = (emoji: string) => {
    onEmojiSelect(emoji)
  }

  const handleGifSelect = async (gifUrl: string, gifId: string) => {
    try {
      const response = await fetch(gifUrl)
      const blob = await response.blob()
      // GIF é tratado como File para reutilizar o mesmo fluxo de upload de mídia
      const file = new File([blob], `${gifId}.gif`, { type: 'image/gif' })
      onMediaUpload([file])
      setOpenPicker(null)
    } catch {
      showToast('error', 'Erro ao carregar o GIF. Tente novamente.')
    }
  }

  const handleLocationSelectInternal = (location: Location) => {
    onLocationSelect(location)
    setOpenPicker(null)
  }

  const handlePollCreateInternal = (pollData: Poll) => {
    onPollCreate(pollData)
    setOpenPicker(null)
  }

  const handleScheduleInternal = (scheduledDate: Date) => {
    onSchedule(scheduledDate)
    setOpenPicker(null)
  }

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
        {/* Input de arquivo oculto — acionado via ref pelo botão de mídia */}
        <ImageUpload
          onImagesChange={onMediaUpload}
          maxImages={maxMedias}
          currentImageCount={medias.length}
          inputRef={inputRef}
        />

        {MEDIA_BUTTONS.map((button) => {
          const Icon = button.icon
          const isMediaButton = button.action === 'media'
          const isGifButton = button.action === 'gif'
          const isPollButton = button.action === 'poll'
          const isActive = openPicker === button.action
          const buttonRef = getButtonRef(button.action)

          let isButtonDisabled = false

          // Mídia e GIF desabilitam quando há poll ativo ou limite atingido
          if (isMediaButton || isGifButton) {
            isButtonDisabled = medias.length >= maxMedias || !!poll
          } else if (isPollButton) {
            // Poll desabilita quando há mídia anexada
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

              {button.action === 'emoji' && openPicker === 'emoji' && (
                <EmojiPicker
                  isOpen={openPicker === 'emoji'}
                  onClose={() => setOpenPicker(null)}
                  triggerRef={emojiButtonRef}
                  onEmojiSelect={handleEmojiSelectInternal}
                />
              )}

              {button.action === 'gif' && openPicker === 'gif' && (
                <GifPicker
                  isOpen={openPicker === 'gif'}
                  onClose={() => setOpenPicker(null)}
                  triggerRef={gifButtonRef}
                  onGifSelect={handleGifSelect}
                />
              )}

              {button.action === 'location' && openPicker === 'location' && (
                <LocationPicker
                  isOpen={openPicker === 'location'}
                  onClose={() => setOpenPicker(null)}
                  triggerRef={locationButtonRef}
                  onLocationSelect={handleLocationSelectInternal}
                />
              )}

              {button.action === 'poll' && openPicker === 'poll' && (
                <PollCreator
                  isOpen={openPicker === 'poll'}
                  onClose={() => setOpenPicker(null)}
                  triggerRef={pollButtonRef}
                  onPollCreate={handlePollCreateInternal}
                />
              )}

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
          <S.SubmitLabel>{submitLabel}</S.SubmitLabel>
          <S.SubmitIcon>
            <Send size={16} strokeWidth={2} />
          </S.SubmitIcon>
        </Button>
      </S.ActionGroup>
    </S.ActionsContainer>
  )
}

export default PostFormActions
