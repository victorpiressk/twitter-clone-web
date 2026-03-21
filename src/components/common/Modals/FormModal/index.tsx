import { useCallback } from 'react'
import { useFormModal } from '../../../../hooks/useFormModal'
import BaseForm from '../../Forms/BaseForm'
import PostFormActions from '../../Forms/FormActions'
import Modal from '../BaseModal'
import * as S from './styles'
import type { FormModalProps } from './types'

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
  const formState = useFormModal({
    type: mode,
    targetPostId: originalPostId
  })

  const handleClose = useCallback(() => {
    formState.handleClose()
    onClose()
  }, [formState, onClose])

  const handleSubmitSuccess = useCallback(async () => {
    await formState.handleSubmit()

    if (!formState.isSubmitting) {
      onClose()
    }
  }, [formState, onClose])

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
