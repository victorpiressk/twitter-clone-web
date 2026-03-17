import { useCallback } from 'react'
import Modal from '../BaseModal'
import BaseForm from '../../Forms/BaseForm'
import PostFormActions from '../../Forms/FormActions'
import { useFormModal } from '../../../../hooks/useFormModal'
import type { FormModalProps } from './types'
import * as S from './styles'

const FormModal = ({
  isOpen,
  onClose,
  userName,
  userAvatar,
  placeholder = 'O que está acontecendo?',
  submitLabel = 'Postar',
  extraContent,
  mode,
  originalPostId,
  maxLength = 280,
  modalSize = 'medium'
}: FormModalProps) => {
  // Hook centralizado (com Redux integrado)
  const formState = useFormModal({
    type: mode,
    targetPostId: originalPostId
  })

  // Handler de fechamento
  const handleClose = useCallback(() => {
    formState.handleClose()
    onClose()
  }, [formState, onClose])

  // Handler de submit
  const handleSubmitSuccess = useCallback(async () => {
    await formState.handleSubmit()

    // Fecha modal após sucesso
    if (!formState.isSubmitting) {
      onClose()
    }
  }, [formState, onClose])

  // Footer com actions
  const footer = (
    <S.FooterContainer>
      <PostFormActions
        content={formState.content}
        medias={formState.medias}
        poll={formState.poll}
        isDisabled={formState.isDisabled}
        maxLength={maxLength}
        onMediaUpload={formState.handleMediaUpload}
        onSubmit={handleSubmitSuccess}
        loading={formState.isSubmitting}
        submitLabel={submitLabel}
        onEmojiSelect={formState.handleEmojiSelect}
        onLocationSelect={formState.handleLocationSelect}
        onPollCreate={formState.handlePollCreate}
        onSchedule={formState.handleSchedule}
      />
    </S.FooterContainer>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size={modalSize}
      showOverlay
      showCloseButton
      header={<div />}
      footer={footer}
    >
      <S.ModalContent>
        <S.FormContainer>
          <BaseForm
            userName={userName}
            userAvatar={userAvatar}
            content={formState.content}
            medias={formState.medias}
            location={formState.location}
            poll={formState.poll}
            scheduledFor={formState.scheduledFor}
            onContentChange={formState.handleContentChange}
            onMediasChange={formState.handleMediasChange}
            onRemoveMedia={formState.handleRemoveMedia}
            onRemoveLocation={formState.handleRemoveLocation}
            onRemovePoll={formState.handleRemovePoll}
            onRemoveSchedule={formState.handleRemoveSchedule}
            placeholder={placeholder}
            maxLength={maxLength}
            extraContent={extraContent}
            isModal
            disabled={formState.isSubmitting}
            mode={mode}
          />
        </S.FormContainer>
      </S.ModalContent>
    </Modal>
  )
}

export default FormModal
